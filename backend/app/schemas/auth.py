from pydantic import BaseModel, EmailStr, Field
from app.db.models import Role


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class SignUpRequest(LoginRequest):
    full_name: str = Field(min_length=2, max_length=160)
    phone: str | None = Field(default=None, max_length=32)
    role: Role


class PasswordResetRequest(BaseModel):
    email: EmailStr


class PasswordUpdateRequest(BaseModel):
    password: str = Field(min_length=8, max_length=128)
