from pydantic import BaseModel, ConfigDict
from app.db.models import Role
class UserUpdate(BaseModel):
    full_name: str | None = None; phone: str | None = None; avatar_url: str | None = None; city: str | None = None; state: str | None = None; address: str | None = None; college: str | None = None; course: str | None = None; academic_year: str | None = None; bio: str | None = None; business_name: str | None = None; business_type: str | None = None; alternate_phone: str | None = None
class UserRead(UserUpdate):
    model_config = ConfigDict(from_attributes=True)
    id: str; email: str; role: Role
