from uuid import UUID
from fastapi import Depends, HTTPException, Header, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.security import verify_supabase_token
from app.db.database import get_db
from app.db.models import Profile, Role

async def get_current_user(authorization: str | None = Header(default=None), db: AsyncSession = Depends(get_db)) -> Profile:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing bearer token")
    identity = await verify_supabase_token(authorization.removeprefix("Bearer "))
    profile = await db.scalar(select(Profile).where(Profile.id == UUID(identity["id"])))
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found; create it after Supabase sign-up")
    return profile

def require_role(role: Role):
    async def dependency(user: Profile = Depends(get_current_user)) -> Profile:
        if user.role != role:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient role")
        return user
    return dependency

get_current_student = require_role(Role.student)
get_current_owner = require_role(Role.owner)
