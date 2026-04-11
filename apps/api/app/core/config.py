# app/core/config.py
import json
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(".env", ".env.local"),
        env_file_encoding="utf-8",
        extra="ignore"
    )

    # Supabase / Postgres Credentials
    DB_USER: str = "postgres"
    DB_PASS: str = "postgres"
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str = "antisludge"

    @property
    def DATABASE_URL(self) -> str:
        # Forçamos o uso do driver psycopg (v3) para suporte assíncrono
        return f"postgresql+psycopg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}?sslmode=require"

    # Pool Settings
    DATABASE_POOL_SIZE: int = 5
    DATABASE_MAX_OVERFLOW: int = 10

    DEBUG: bool = False

    @property
    def VERSION(self) -> str:
        """Lê a versão do package.json na raiz do projeto."""
        try:
            package_json_path = PROJECT_ROOT / "package.json"
            with open(package_json_path) as f:
                data = json.load(f)
                return data.get("version", "0.0.0")
        except Exception:
            return "0.0.0"

settings = Settings()
