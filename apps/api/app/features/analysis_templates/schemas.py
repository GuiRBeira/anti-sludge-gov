# app/features/analysis_templates/schemas.py
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict

# =========================
# GrupoAnalise
# =========================
class GrupoAnaliseBase(BaseModel):
    nome: str
    descricao: str
    criterios_considerados: Optional[str] = None

class GrupoAnaliseCreate(GrupoAnaliseBase):
    pass

class GrupoAnaliseUpdate(GrupoAnaliseBase):
    nome: Optional[str] = None
    descricao: Optional[str] = None

class GrupoAnaliseOut(GrupoAnaliseBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# =========================
# CriterioTemplate
# =========================
class CriterioTemplateBase(BaseModel):
    nome: str
    conceito: str
    grupo_analise_id: Optional[int] = None

class CriterioTemplateCreate(CriterioTemplateBase):
    pass

class CriterioTemplateUpdate(CriterioTemplateBase):
    nome: Optional[str] = None
    conceito: Optional[str] = None

class CriterioTemplateOut(CriterioTemplateBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# =========================
# TipoCriterio
# =========================
class TipoCriterioBase(BaseModel):
    tipo_comportamento_id: int
    criterio_template_id: int
    ordem: int = 1

class TipoCriterioCreate(TipoCriterioBase):
    pass

class TipoCriterioUpdate(TipoCriterioBase):
    ordem: Optional[int] = None

class TipoCriterioOut(TipoCriterioBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# =========================
# EscalaAvaliacao
# =========================
class EscalaAvaliacaoBase(BaseModel):
    criterio_template_id: Optional[int] = None
    tipo_comportamento_id: Optional[int] = None
    pergunta: str
    texto_nota_1: str
    texto_nota_2: Optional[str] = None
    texto_nota_3: Optional[str] = None
    texto_nota_4: Optional[str] = None
    texto_nota_5: str

class EscalaAvaliacaoCreate(EscalaAvaliacaoBase):
    pass

class EscalaAvaliacaoUpdate(EscalaAvaliacaoBase):
    pergunta: Optional[str] = None

class EscalaAvaliacaoOut(EscalaAvaliacaoBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
