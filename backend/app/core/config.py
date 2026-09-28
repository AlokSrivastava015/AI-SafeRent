from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    supabase_url: str = ""
    supabase_anon_key: str = ""
    supabase_service_role_key: str = ""
    supabase_db_url: str = ""
    database_url: str = ""
    google_maps_api_key: str = ""
    google_places_api_key: str = ""
    frontend_url: str = "http://localhost:5173"

    @property
    def db_url(self) -> str:
        return self.database_url or self.supabase_db_url


@lru_cache
def get_settings() -> Settings:
    return Settings()
