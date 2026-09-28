"""initial AI SafeRent tables

Revision ID: 0001_initial
Revises:
Create Date: 2026-09-27
"""
from alembic import op
from app.db.models import Base

revision="0001_initial"; down_revision=None; branch_labels=None; depends_on=None
def upgrade():
    bind=op.get_bind()
    Base.metadata.create_all(bind)
def downgrade():
    bind=op.get_bind()
    Base.metadata.drop_all(bind)
