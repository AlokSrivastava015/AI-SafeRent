from datetime import date
from pydantic import BaseModel
class PreferenceUpdate(BaseModel):
    preferred_locations: list[str] = []; budget_min: float | None = None; budget_max: float | None = None; property_types: list[str] = []; gender_preference: str | None = None; furnished_preference: str | None = None; amenities: list[str] = []; move_in_date: date | None = None; stay_duration: str | None = None; priorities: list[str] = []; additional_preferences: str | None = None
