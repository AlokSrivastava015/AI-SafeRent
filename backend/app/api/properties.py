from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_current_owner
from app.db.database import get_db
from app.db.models import Property, Profile, PropertyType
from app.schemas.common import Success
from app.schemas.property import PropertyCreate, PropertyUpdate

router = APIRouter(prefix="/api/properties", tags=["Properties"])

def serialize(p: Property):
    return {"id": str(p.id), "owner_id": str(p.owner_id), "title": p.title, "description": p.description, "property_type": p.property_type, "address": p.address, "locality": p.locality, "city": p.city, "state": p.state, "monthly_rent": float(p.monthly_rent), "latitude": p.latitude, "longitude": p.longitude, "is_verified": p.is_verified, "is_available": p.is_available}

@router.get("", summary="List available properties")
async def list_properties(city: str | None = None, property_type: PropertyType | None = None, page: int = Query(1, ge=1), limit: int = Query(12, ge=1, le=50), db: AsyncSession = Depends(get_db)):
    q = select(Property).where(Property.is_available.is_(True))
    if city: q = q.where(Property.city.ilike(f"%{city}%"))
    if property_type: q = q.where(Property.property_type == property_type)
    rows = (await db.scalars(q.offset((page-1)*limit).limit(limit))).all()
    return Success(data={"items": [serialize(p) for p in rows], "page": page, "limit": limit})

@router.get("/search", summary="Search properties with filters")
async def search_properties(location: str | None = None, city: str | None = None, property_type: PropertyType | None = None, min_rent: float | None = None, max_rent: float | None = None, page: int = 1, limit: int = 12, db: AsyncSession = Depends(get_db)):
    q = select(Property).where(Property.is_available.is_(True))
    if location: q = q.where((Property.city.ilike(f"%{location}%")) | (Property.locality.ilike(f"%{location}%")))
    if city: q = q.where(Property.city.ilike(f"%{city}%"))
    if property_type: q = q.where(Property.property_type == property_type)
    if min_rent is not None: q = q.where(Property.monthly_rent >= min_rent)
    if max_rent is not None: q = q.where(Property.monthly_rent <= max_rent)
    rows = (await db.scalars(q.offset((page-1)*limit).limit(min(limit,50)))).all()
    return Success(data={"items": [serialize(p) for p in rows], "page": page, "limit": limit})

@router.get("/{property_id}")
async def get_property(property_id: UUID, db: AsyncSession = Depends(get_db)):
    p = await db.get(Property, property_id)
    if not p or not p.is_available: raise HTTPException(404, "Property not found")
    return Success(data=serialize(p))

@router.post("", status_code=201)
async def create_property(payload: PropertyCreate, owner: Profile = Depends(get_current_owner), db: AsyncSession = Depends(get_db)):
    p = Property(owner_id=owner.id, **payload.model_dump(exclude={"amenities"}))
    db.add(p); await db.commit(); await db.refresh(p)
    return Success(data=serialize(p))

@router.patch("/{property_id}")
async def update_property(property_id: UUID, payload: PropertyUpdate, owner: Profile = Depends(get_current_owner), db: AsyncSession = Depends(get_db)):
    p = await db.get(Property, property_id)
    if not p or p.owner_id != owner.id: raise HTTPException(404, "Property not found")
    for key, value in payload.model_dump(exclude_unset=True, exclude={"amenities"}).items(): setattr(p, key, value)
    await db.commit(); await db.refresh(p); return Success(data=serialize(p))

@router.delete("/{property_id}", status_code=204)
async def delete_property(property_id: UUID, owner: Profile = Depends(get_current_owner), db: AsyncSession = Depends(get_db)):
    p = await db.get(Property, property_id)
    if not p or p.owner_id != owner.id: raise HTTPException(404, "Property not found")
    await db.delete(p); await db.commit()
