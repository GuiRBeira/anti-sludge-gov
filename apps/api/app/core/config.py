# app/core/config.py
import json
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
	model_config = SettingsConfigDict(
		env_file=(".env.local",), env_file_encoding="utf-8", extra="ignore"
	)

	# Supabase / Postgres Credentials
	DB_USER: str = "postgres"
	DB_PASS: str = "postgres"
	DB_HOST: str = "localhost"
	DB_PORT: int = 5432
	DB_NAME: str = "antisludge"
	DB_SSLMODE: str = "disable"

	@property
	def DATABASE_URL(self) -> str:
		# Forçamos o uso do driver psycopg (v3) para suporte assíncrono
		return f"postgresql+psycopg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}?sslmode={self.DB_SSLMODE}"

	# Pool Settings
	DATABASE_POOL_SIZE: int = 5
	DATABASE_MAX_OVERFLOW: int = 10

	DEBUG: bool = False

	# Auth Settings
	GOOGLE_CLIENT_ID: str = ""
	GOOGLE_CLIENT_SECRET: str = ""
	SECRET_KEY: str = "super-secret-key-change-it-in-prod"
	ALGORITHM: str = "HS256"
	ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day

	# Extension Auth
	EXTENSION_API_KEY: str = "dev-api-key"

	# RBAC - Role Based Access Control
	ADMIN_EMAILS: str = ""  # Comma separated (Owner/Admin)
	RESEARCHER_EMAILS: str = ""  # Comma separated (Researchers)
	SUPERVISOR_EMAILS: str = ""  # Comma separated (Supervisors)

	# Security Settings
	ALLOWED_ORIGINS: str = (
		"http://localhost:3000,http://127.0.0.1:3000,http://0.0.0.0:3000"
	)
	RATE_LIMIT_DEFAULT: str = "60/minute"
	AUTH_COOKIE_SECURE: bool = False  # True em prod
	AUTH_COOKIE_SAMESITE: str = "lax"
	DISCORD_WEBHOOK_URL: str | None = None

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
