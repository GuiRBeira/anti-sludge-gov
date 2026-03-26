# app/schema/stage.py
from __future__ import annotations

from datetime import datetime, timedelta
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


# =========================
# Etapa - OUT (lista)
# =========================
class StageListOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    processo_id: int

    ordem: int
    numero: Optional[str] = None
    comportamento: str
    e_obrigatorio: bool

    categoria_id: int
    tipo_comportamento_id: int

    # campo calculado (não está no banco)
    has_avaliacao: bool = False


# =========================
# Etapa - OUT (detalhe)
# =========================
class StageDetailOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    processo_id: int

    categoria_id: int
    tipo_comportamento_id: int

    numero: Optional[str] = None
    comportamento: str
    e_obrigatorio: bool

    repeticoes: Optional[str] = None

    tempo_planejado: Optional[timedelta] = None
    tempo_padrao: Optional[timedelta] = None
    duracao_media_observada: Optional[timedelta] = None

    ordem: int
    created_at: datetime

    # campo calculado
    has_avaliacao: bool = False


# =========================
# Etapa - IN (criação)
# =========================
class StageCreateIn(BaseModel):
    processo_id: int

    categoria_id: int
    tipo_comportamento_id: int

    ordem: int = Field(ge=1)
    comportamento: str = Field(min_length=2, max_length=500)

    numero: Optional[str] = Field(default=None, max_length=10)
    e_obrigatorio: bool = False

    repeticoes: Optional[str] = Field(default=None, max_length=50)

    # Aqui você pode aceitar string e converter, mas para MVP:
    tempo_planejado: Optional[timedelta] = None
    tempo_padrao: Optional[timedelta] = None
    duracao_media_observada: Optional[timedelta] = None


# =========================
# Etapa - IN (update parcial)
# =========================
class StageUpdateIn(BaseModel):
    categoria_id: Optional[int] = None
    tipo_comportamento_id: Optional[int] = None

    ordem: Optional[int] = Field(default=None, ge=1)
    comportamento: Optional[str] = Field(default=None, min_length=2, max_length=500)

    numero: Optional[str] = Field(default=None, max_length=10)
    e_obrigatorio: Optional[bool] = None

    repeticoes: Optional[str] = Field(default=None, max_length=50)

    tempo_planejado: Optional[timedelta] = None
    tempo_padrao: Optional[timedelta] = None
    duracao_media_observada: Optional[timedelta] = None
