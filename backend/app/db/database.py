from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from app.core.config import get_settings

settings = get_settings()


def async_database_url(url: str) -> str:
    """Use asyncpg for FastAPI; pooler URLs often arrive as plain postgresql://."""
    if url.startswith("postgresql://"):
        return url.replace("postgresql://", "postgresql+asyncpg://", 1)
    if url.startswith("postgres://"):
        return url.replace("postgres://", "postgresql+asyncpg://", 1)
    return url


engine = create_async_engine(async_database_url(settings.db_url), pool_pre_ping=True) if settings.db_url else None
SessionLocal = async_sessionmaker(engine, expire_on_commit=False) if engine else None


async def get_db():
    if SessionLocal is None:
        raise RuntimeError("DATABASE_URL or SUPABASE_DB_URL is not configured")
    async with SessionLocal() as session:
        yield session
