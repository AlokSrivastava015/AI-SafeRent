"""Add owner and student profile tables.

Revision ID: 0002_owner_student_profiles
Revises: 0001_initial
Create Date: 2026-09-29
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy import inspect
from sqlalchemy.dialects import postgresql


revision = "0002_owner_student_profiles"
down_revision = "0001_initial"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # 0001 uses metadata.create_all(), so a fresh install may already have
    # these tables. The guard keeps both upgrade paths safe.
    existing_tables = set(inspect(op.get_bind()).get_table_names())

    if "owner_profiles" not in existing_tables:
        op.create_table(
            "owner_profiles",
            sa.Column("user_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("profiles.id", ondelete="CASCADE"), primary_key=True),
            sa.Column("business_name", sa.String(length=180), nullable=True),
            sa.Column("business_type", sa.String(length=80), nullable=True),
            sa.Column("alternate_phone", sa.String(length=32), nullable=True),
            sa.Column("experience_years", sa.Integer(), nullable=True),
            sa.Column("gst_number", sa.String(length=32), nullable=True, unique=True),
            sa.Column("is_business_verified", sa.Boolean(), nullable=False, server_default=sa.false()),
            sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
            sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        )

    if "student_profiles" not in existing_tables:
        op.create_table(
            "student_profiles",
            sa.Column("user_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("profiles.id", ondelete="CASCADE"), primary_key=True),
            sa.Column("college", sa.String(length=180), nullable=True),
            sa.Column("course", sa.String(length=120), nullable=True),
            sa.Column("academic_year", sa.String(length=32), nullable=True),
            sa.Column("preferred_location", sa.String(length=180), nullable=True),
            sa.Column("move_in_date", sa.Date(), nullable=True),
            sa.Column("is_identity_verified", sa.Boolean(), nullable=False, server_default=sa.false()),
            sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
            sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        )

    # Create the matching specialised row for users that already exist.
    op.execute(sa.text("""
        INSERT INTO owner_profiles (user_id)
        SELECT id FROM profiles
        WHERE role = 'owner'
          AND NOT EXISTS (SELECT 1 FROM owner_profiles WHERE owner_profiles.user_id = profiles.id)
    """))
    op.execute(sa.text("""
        INSERT INTO student_profiles (user_id)
        SELECT id FROM profiles
        WHERE role = 'student'
          AND NOT EXISTS (SELECT 1 FROM student_profiles WHERE student_profiles.user_id = profiles.id)
    """))


def downgrade() -> None:
    existing_tables = set(inspect(op.get_bind()).get_table_names())
    if "student_profiles" in existing_tables:
        op.drop_table("student_profiles")
    if "owner_profiles" in existing_tables:
        op.drop_table("owner_profiles")
