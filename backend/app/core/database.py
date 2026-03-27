# app/database.py
from __future__ import annotations

from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from app.core.config import settings

# =========================
# Engine
# =========================
engine = create_engine(
    settings.DATABASE_URL, 
    echo=False, 
    pool_pre_ping=True # Evita conexões quebradas com o banco
)

# =========================
# Session factory
# =========================
SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False, # Evita expiração automática dos objetos após commit
)

# =========================
# Dependency (FastAPI)
# =========================
def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

