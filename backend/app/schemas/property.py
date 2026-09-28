from datetime import date
from decimal import Decimal
from pydantic import BaseModel, ConfigDict, Field
from app.db.models import PropertyType

class PropertyCreate(BaseModel):
    title: str = Field(min_length=3, max_length=220); description: str | None = None; property_type: PropertyType
    address: str; locality: str | None = None; city: str; state: str | None = None; country: str = "India"
    latitude: float | None = None; longitude: float | None = None; monthly_rent: Decimal = Field(gt=0); security_deposit: Decimal | None = Field(default=None, ge=0)
    available_from: date | None = None; gender_preference: str | None = None; furnished_status: str | None = None; bedrooms: int | None = Field(default=None, ge=0); bathrooms: int | None = Field(default=None, ge=0); area_sqft: float | None = Field(default=None, gt=0)
    amenities: list[str] = []

class PropertyUpdate(PropertyCreate):
    title: str | None = None; property_type: PropertyType | None = None; address: str | None = None; city: str | None = None; monthly_rent: Decimal | None = Field(default=None, gt=0)

class PropertyRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str; owner_id: str; title: str; description: str | None; property_type: PropertyType; city: str; locality: str | None; monthly_rent: Decimal; is_verified: bool; is_available: bool
