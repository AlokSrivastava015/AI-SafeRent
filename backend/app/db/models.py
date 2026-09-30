import enum
import uuid
from datetime import date, datetime
from sqlalchemy import Boolean, Date, DateTime, Enum, Float, ForeignKey, Integer, Numeric, String, Text, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class Role(str, enum.Enum):
    student = "student"
    owner = "owner"


class PropertyType(str, enum.Enum):
    PG = "PG"
    FLAT = "FLAT"
    ROOM = "ROOM"


class VisitStatus(str, enum.Enum):
    PENDING = "PENDING"; ACCEPTED = "ACCEPTED"; REJECTED = "REJECTED"; RESCHEDULED = "RESCHEDULED"; CANCELLED = "CANCELLED"; COMPLETED = "COMPLETED"


class BookingStatus(str, enum.Enum):
    PENDING = "PENDING"; CONFIRMED = "CONFIRMED"; REJECTED = "REJECTED"; CANCELLED = "CANCELLED"; COMPLETED = "COMPLETED"


class Timestamped:
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class Profile(Base, Timestamped):
    __tablename__ = "profiles"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True)
    full_name: Mapped[str] = mapped_column(String(160))
    role: Mapped[Role] = mapped_column(Enum(Role, name="role"), index=True)
    phone: Mapped[str | None] = mapped_column(String(32)); avatar_url: Mapped[str | None] = mapped_column(Text)
    date_of_birth: Mapped[date | None] = mapped_column(Date); gender: Mapped[str | None] = mapped_column(String(32))
    address: Mapped[str | None] = mapped_column(Text); city: Mapped[str | None] = mapped_column(String(120)); state: Mapped[str | None] = mapped_column(String(120)); country: Mapped[str | None] = mapped_column(String(120))
    college: Mapped[str | None] = mapped_column(String(180)); course: Mapped[str | None] = mapped_column(String(120)); academic_year: Mapped[str | None] = mapped_column(String(32)); bio: Mapped[str | None] = mapped_column(Text)
    business_name: Mapped[str | None] = mapped_column(String(180)); business_type: Mapped[str | None] = mapped_column(String(80)); alternate_phone: Mapped[str | None] = mapped_column(String(32)); experience_years: Mapped[int | None] = mapped_column(Integer)


class OwnerProfile(Base, Timestamped):
    """Business information for a user whose shared profile role is owner."""
    __tablename__ = "owner_profiles"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("profiles.id", ondelete="CASCADE"), primary_key=True
    )
    business_name: Mapped[str | None] = mapped_column(String(180))
    business_type: Mapped[str | None] = mapped_column(String(80))
    alternate_phone: Mapped[str | None] = mapped_column(String(32))
    experience_years: Mapped[int | None] = mapped_column(Integer)
    gst_number: Mapped[str | None] = mapped_column(String(32), unique=True)
    is_business_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)


class StudentProfile(Base, Timestamped):
    """Academic and stay details for a user whose shared profile role is student."""
    __tablename__ = "student_profiles"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("profiles.id", ondelete="CASCADE"), primary_key=True
    )
    college: Mapped[str | None] = mapped_column(String(180))
    course: Mapped[str | None] = mapped_column(String(120))
    academic_year: Mapped[str | None] = mapped_column(String(32))
    preferred_location: Mapped[str | None] = mapped_column(String(180))
    move_in_date: Mapped[date | None] = mapped_column(Date)
    is_identity_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)


class Property(Base, Timestamped):
    __tablename__ = "properties"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    owner_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("profiles.id", ondelete="CASCADE"), index=True)
    title: Mapped[str] = mapped_column(String(220), index=True); description: Mapped[str | None] = mapped_column(Text)
    property_type: Mapped[PropertyType] = mapped_column(Enum(PropertyType, name="property_type"), index=True)
    listing_type: Mapped[str] = mapped_column(String(20), default="RENT")
    address: Mapped[str] = mapped_column(Text); locality: Mapped[str | None] = mapped_column(String(160)); city: Mapped[str] = mapped_column(String(120), index=True); state: Mapped[str | None] = mapped_column(String(120)); country: Mapped[str] = mapped_column(String(120), default="India")
    latitude: Mapped[float | None] = mapped_column(Float); longitude: Mapped[float | None] = mapped_column(Float)
    monthly_rent: Mapped[float] = mapped_column(Numeric(12, 2)); security_deposit: Mapped[float | None] = mapped_column(Numeric(12, 2)); available_from: Mapped[date | None] = mapped_column(Date)
    gender_preference: Mapped[str | None] = mapped_column(String(40)); furnished_status: Mapped[str | None] = mapped_column(String(40)); bedrooms: Mapped[int | None] = mapped_column(Integer); bathrooms: Mapped[int | None] = mapped_column(Integer); area_sqft: Mapped[float | None] = mapped_column(Float)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False); is_available: Mapped[bool] = mapped_column(Boolean, default=True, index=True)


class Amenity(Base):
    __tablename__ = "amenities"
    id: Mapped[int] = mapped_column(primary_key=True); name: Mapped[str] = mapped_column(String(80), unique=True)


class PropertyAmenity(Base):
    __tablename__ = "property_amenities"
    property_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("properties.id", ondelete="CASCADE"), primary_key=True)
    amenity_id: Mapped[int] = mapped_column(ForeignKey("amenities.id", ondelete="CASCADE"), primary_key=True)


class PropertyImage(Base, Timestamped):
    __tablename__ = "property_images"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    property_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("properties.id", ondelete="CASCADE"), index=True)
    storage_path: Mapped[str] = mapped_column(Text, unique=True); public_url: Mapped[str] = mapped_column(Text); is_primary: Mapped[bool] = mapped_column(Boolean, default=False)


class Preference(Base, Timestamped):
    __tablename__ = "preferences"
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("profiles.id", ondelete="CASCADE"), primary_key=True)
    preferred_locations: Mapped[list[str]] = mapped_column(ARRAY(String), default=list); budget_min: Mapped[float | None] = mapped_column(Numeric(12,2)); budget_max: Mapped[float | None] = mapped_column(Numeric(12,2))
    property_types: Mapped[list[str]] = mapped_column(ARRAY(String), default=list); gender_preference: Mapped[str | None] = mapped_column(String(40)); furnished_preference: Mapped[str | None] = mapped_column(String(40)); amenities: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    move_in_date: Mapped[date | None] = mapped_column(Date); stay_duration: Mapped[str | None] = mapped_column(String(80)); priorities: Mapped[list[str]] = mapped_column(ARRAY(String), default=list); additional_preferences: Mapped[str | None] = mapped_column(Text)


class Favorite(Base, Timestamped):
    __tablename__ = "favorites"; __table_args__ = (UniqueConstraint("student_id", "property_id"),)
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("profiles.id", ondelete="CASCADE"), index=True); property_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("properties.id", ondelete="CASCADE"), index=True)


class Visit(Base, Timestamped):
    __tablename__ = "visits"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4); student_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("profiles.id"), index=True); owner_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("profiles.id"), index=True); property_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("properties.id"), index=True)
    requested_date: Mapped[date] = mapped_column(Date); preferred_start_time: Mapped[str] = mapped_column(String(10)); preferred_end_time: Mapped[str] = mapped_column(String(10)); message: Mapped[str | None] = mapped_column(Text); status: Mapped[VisitStatus] = mapped_column(Enum(VisitStatus, name="visit_status"), default=VisitStatus.PENDING)


class Booking(Base, Timestamped):
    __tablename__ = "bookings"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4); student_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("profiles.id"), index=True); owner_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("profiles.id"), index=True); property_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("properties.id"), index=True)
    start_date: Mapped[date] = mapped_column(Date); end_date: Mapped[date | None] = mapped_column(Date); status: Mapped[BookingStatus] = mapped_column(Enum(BookingStatus, name="booking_status"), default=BookingStatus.PENDING)


class Review(Base, Timestamped):
    __tablename__ = "reviews"; __table_args__ = (UniqueConstraint("property_id", "student_id"),)
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4); property_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("properties.id", ondelete="CASCADE"), index=True); student_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("profiles.id"), index=True); rating: Mapped[int] = mapped_column(Integer); comment: Mapped[str | None] = mapped_column(Text)
