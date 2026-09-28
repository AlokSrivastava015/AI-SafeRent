from pathlib import Path
import sys
from alembic import context
from sqlalchemy import engine_from_config, pool

# Alembic executes this module with `backend/alembic` on the import path.
# Add the backend root so imports such as `app.db.models` work on Windows and CI.
BACKEND_ROOT = Path(__file__).resolve().parents[1]
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

from app.core.config import get_settings
from app.db.models import Base

config = context.config
database_url = get_settings().db_url
if not database_url:
    raise RuntimeError("DATABASE_URL or SUPABASE_DB_URL is required. Copy .env.example to .env and set one before running Alembic.")

# Alembic uses a synchronous engine; the app itself continues to use asyncpg.
config.set_main_option("sqlalchemy.url", database_url.replace("postgresql+asyncpg://", "postgresql+psycopg://"))
target_metadata = Base.metadata
def run_migrations_offline():
    context.configure(url=config.get_main_option("sqlalchemy.url"), target_metadata=target_metadata, literal_binds=True)
    with context.begin_transaction(): context.run_migrations()
def run_migrations_online():
    connectable=engine_from_config(config.get_section(config.config_ini_section), prefix="sqlalchemy.", poolclass=pool.NullPool)
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction(): context.run_migrations()
if context.is_offline_mode(): run_migrations_offline()
else: run_migrations_online()
