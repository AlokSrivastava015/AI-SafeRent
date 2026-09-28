from datetime import date
from pydantic import BaseModel, Field
class VisitCreate(BaseModel):
    property_id: str; requested_date: date; preferred_start_time: str = Field(pattern=r"^\d{2}:\d{2}$"); preferred_end_time: str = Field(pattern=r"^\d{2}:\d{2}$"); message: str | None = Field(default=None, max_length=1000)
class VisitReschedule(BaseModel):
    requested_date: date; preferred_start_time: str; preferred_end_time: str
