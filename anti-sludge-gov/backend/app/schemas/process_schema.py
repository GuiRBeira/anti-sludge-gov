# app/schema/process.py
from __future__ import annotations

from datetime import datetime
from typing import Optional, List
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.models.base_model import EsferaGovernoEnum, AbrangenciaEnum
from app.schemas.stage import StageListOut, StageListOut

# =========================
# Etapa (resumo) - usado no detalhe do processo
# =========================
class StageSummaryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    processo_id: int

    ordem: int
    numero: Optional[str] = None
    comportamento: str
    e_obrigatorio: bool

    categoria_id: int
    tipo_comportamento_id: int

    # Campo útil pro frontend (você calcula no use_case/repository)
    has_avaliacao: bool = False


# =========================
# Processo - OUT (lista)
# =========================
class ProcessListOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    uuid: UUID
    nome: str
    status: str

    esfera_governo: Optional[EsferaGovernoEnum] = None
    abrangencia: Optional[AbrangenciaEnum] = None

    created_at: datetime
    updated_at: datetime


# =========================
# Processo - IN (criação)
# =========================
class ProcessCreateIn(BaseModel):
    nome: str = Field(min_length=2, max_length=255)

    descricao: Optional[str] = None
    objetivo: Optional[str] = None

    esfera_governo: Optional[EsferaGovernoEnum] = None
    abrangencia: Optional[AbrangenciaEnum] = None

    publico_alvo: Optional[str] = None
    usuarios_estimados_ano: Optional[int] = Field(default=None, ge=0)

    perfil_foco_mapeamento: Optional[str] = None
    jornada_planejada_descricao: Optional[str] = None
    necessidade_usuario: Optional[str] = None

    tempo_medio_estimado: Optional[str] = None

    indicadores_desempenho: Optional[str] = None
    hipoteses_dificuldades: Optional[str] = None
    registros_reclamacao: Optional[str] = None
    registros_satisfacao: Optional[str] = None

    status: Optional[str] = Field(default=None, max_length=50)


# =========================
# Processo - IN (update parcial)
# =========================
class ProcessUpdateIn(BaseModel):
    nome: Optional[str] = Field(default=None, min_length=2, max_length=255)

    descricao: Optional[str] = None
    objetivo: Optional[str] = None

    esfera_governo: Optional[EsferaGovernoEnum] = None
    abrangencia: Optional[AbrangenciaEnum] = None

    publico_alvo: Optional[str] = None
    usuarios_estimados_ano: Optional[int] = Field(default=None, ge=0)

    perfil_foco_mapeamento: Optional[str] = None
    jornada_planejada_descricao: Optional[str] = None
    necessidade_usuario: Optional[str] = None

    tempo_medio_estimado: Optional[str] = None

    indicadores_desempenho: Optional[str] = None
    hipoteses_dificuldades: Optional[str] = None
    registros_reclamacao: Optional[str] = None
    registros_satisfacao: Optional[str] = None

    status: Optional[str] = Field(default=None, max_length=50)


# =========================
# Processo - OUT (detalhe)
# =========================
class ProcessDetailOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    uuid: UUID
    nome: str
    status: str

    descricao: Optional[str] = None
    objetivo: Optional[str] = None

    esfera_governo: Optional[EsferaGovernoEnum] = None
    abrangencia: Optional[AbrangenciaEnum] = None

    publico_alvo: Optional[str] = None
    usuarios_estimados_ano: Optional[int] = None

    perfil_foco_mapeamento: Optional[str] = None
    jornada_planejada_descricao: Optional[str] = None
    necessidade_usuario: Optional[str] = None

    tempo_medio_estimado: Optional[str] = None

    indicadores_desempenho: Optional[str] = None
    hipoteses_dificuldades: Optional[str] = None
    registros_reclamacao: Optional[str] = None
    registros_satisfacao: Optional[str] = None

    created_at: datetime
    updated_at: datetime

    # útil pro frontend
    etapas: List[StageListOut] = []
