from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_current_student
from app.db.database import get_db
from app.db.models import Favorite, Profile, Property
from app.schemas.common import Success
router = APIRouter(prefix="/api/favorites", tags=["Favorites"])
@router.get("")
async def favorites(user: Profile = Depends(get_current_student), db: AsyncSession = Depends(get_db)):
    rows = (await db.scalars(select(Favorite).where(Favorite.student_id == user.id))).all(); return Success(data=[{"id":str(x.id), "property_id":str(x.property_id)} for x in rows])
@router.post("/{property_id}", status_code=201)
async def add(property_id: UUID, user: Profile = Depends(get_current_student), db: AsyncSession = Depends(get_db)):
    if not await db.get(Property, property_id): raise HTTPException(404, "Property not found")
    existing = await db.scalar(select(Favorite).where(Favorite.student_id==user.id, Favorite.property_id==property_id))
    if existing: return Success(data={"property_id":str(property_id)})
    db.add(Favorite(student_id=user.id, property_id=property_id)); await db.commit(); return Success(data={"property_id":str(property_id)})
@router.delete("/{property_id}", status_code=204)
async def remove(property_id: UUID, user: Profile = Depends(get_current_student), db: AsyncSession = Depends(get_db)):
    row = await db.scalar(select(Favorite).where(Favorite.student_id==user.id, Favorite.property_id==property_id))
    if row: await db.delete(row); await db.commit()
