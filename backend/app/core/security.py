from fastapi import HTTPException, status
from supabase import create_client
from app.core.config import get_settings


async def verify_supabase_token(token: str) -> dict:
    """Ask Supabase Auth to validate the bearer token; never trust decoded claims."""
    settings = get_settings()
    if not settings.supabase_url or not settings.supabase_anon_key:
        raise HTTPException(status_code=503, detail="Supabase Auth is not configured")
    client = create_client(settings.supabase_url, settings.supabase_anon_key)
    try:
        response = client.auth.get_user(token)
        if not response.user:
            raise ValueError("User missing")
        return {"id": response.user.id, "email": response.user.email}
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired access token") from exc
