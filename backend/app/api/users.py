from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.db.models import Profile
from app.schemas.common import Success
from app.schemas.user import UserUpdate

router = APIRouter(prefix="/api/users", tags=["Users"])
def serialize(user: Profile): return {"id": str(user.id), "email": user.email, "full_name": user.full_name, "role": user.role, "phone": user.phone, "avatar_url": user.avatar_url, "city": user.city, "college": user.college, "bio": user.bio, "business_name": user.business_name}
@router.get("/me")
async def me(user: Profile = Depends(get_current_user)): return Success(data=serialize(user))
@router.patch("/me")
async def update_me(payload: UserUpdate, user: Profile = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    for key, value in payload.model_dump(exclude_unset=True).items(): setattr(user, key, value)
    await db.commit(); await db.refresh(user); return Success(data=serialize(user))
