from datetime import date
from pydantic import BaseModel
class BookingCreate(BaseModel):
    property_id: str; start_date: date; end_date: date | None = None
