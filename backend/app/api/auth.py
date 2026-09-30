from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from supabase import create_client
from supabase_auth.errors import AuthApiError
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import get_settings
from app.core.security import verify_supabase_token
from app.db.database import get_db
from app.db.models import OwnerProfile, Profile, Role, StudentProfile
from app.schemas.common import Success
from app.schemas.auth import LoginRequest, PasswordResetRequest, SignUpRequest
router=APIRouter(prefix="/api/auth", tags=["Authentication"])
bearer = HTTPBearer(description="Supabase access token")

def auth_client():
    settings = get_settings()
    if not settings.supabase_url or not settings.supabase_anon_key:
        raise HTTPException(status_code=503, detail="Supabase Auth is not configured")
    return create_client(settings.supabase_url, settings.supabase_anon_key)

def session_data(session):
    if not session:
        return None
    return {"access_token": session.access_token, "refresh_token": session.refresh_token, "expires_at": session.expires_at, "token_type": session.token_type}


def raise_auth_error(error: AuthApiError) -> None:
    """Translate Supabase errors without exposing credentials or stack traces."""
    code = getattr(error, "status", None) or getattr(error, "status_code", None)
    message = str(error)
    if code == 429 or "only request this after" in message.lower():
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail="Too many requests. Please wait a minute before trying again.") from error
    if code in (400, 401, 422):
        raise HTTPException(status_code=code, detail=message) from error
    raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Authentication provider is temporarily unavailable. Please try again.") from error

@router.post("/signup", status_code=status.HTTP_201_CREATED, summary="Create a Supabase account and role profile")
async def signup(payload: SignUpRequest, db: AsyncSession = Depends(get_db)):
    try:
        response = auth_client().auth.sign_up({"email": str(payload.email), "password": payload.password, "options": {"data": {"full_name": payload.full_name, "requested_role": payload.role.value}}})
    except AuthApiError as error:
        raise_auth_error(error)
    if not response.user:
        raise HTTPException(status_code=400, detail="Unable to create account")

    user_id = UUID(str(response.user.id))
    profile = await db.get(Profile, user_id)
    if profile is None:
        profile = Profile(
            id=user_id,
            email=str(response.user.email or payload.email),
            full_name=payload.full_name,
            role=payload.role,
        )
        db.add(profile)

    if payload.role == Role.owner:
        if await db.get(OwnerProfile, user_id) is None:
            db.add(OwnerProfile(user_id=user_id))
    elif payload.role == Role.student:
        if await db.get(StudentProfile, user_id) is None:
            db.add(StudentProfile(user_id=user_id))

    try:
        await db.commit()
    except Exception as error:
        await db.rollback()
        raise HTTPException(status_code=503, detail="Account was created, but the profile could not be saved. Please try logging in again.") from error

    return Success(data={"user_id": response.user.id, "email": response.user.email, "confirmation_required": response.session is None, "session": session_data(response.session)})

@router.post("/login", summary="Sign in using Supabase Auth")
async def login(payload: LoginRequest):
    try:
        response = auth_client().auth.sign_in_with_password({"email": str(payload.email), "password": payload.password})
        if not response.user or not response.session:
            raise ValueError("Missing session")
        return Success(data={"user_id": response.user.id, "email": response.user.email, "session": session_data(response.session)})
    except AuthApiError as exc:
        raise_auth_error(exc)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password") from exc

@router.post("/forgot-password", summary="Send a Supabase password reset email")
async def forgot_password(payload: PasswordResetRequest):
    settings = get_settings()
    try:
        auth_client().auth.reset_password_email(str(payload.email), {"redirect_to": settings.frontend_url})
    except AuthApiError as error:
        raise_auth_error(error)
    # Deliberately do not reveal whether the email exists.
    return Success(data={"message": "If an account exists, a reset email has been sent."})

@router.get("/me", summary="Validate current Supabase session")
async def me(credentials: HTTPAuthorizationCredentials = Depends(bearer)):
    return Success(data=await verify_supabase_token(credentials.credentials))
@router.post("/logout", summary="Client signs out via Supabase Auth")
async def logout(): return Success(data={"message":"Clear the Supabase client session"})
