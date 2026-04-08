# app/features/analysis_results/schemas.py
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict
from app.models.base_model import CriterioImpactoEnum, TipoEvidenciaEnum

# =========================
# CriterioBarreira
# =========================
class CriterioBarreiraBase(BaseModel):
    etapa_id: int
    criterio_template_id: Optional[int] = None
    nome: str
    pergunta: str
    texto_nota_1: Optional[str] = None
    texto_nota_5: Optional[str] = None
    ordem: int = 1

class CriterioBarreiraCreate(CriterioBarreiraBase):
    pass

class CriterioBarreiraOut(CriterioBarreiraBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# =========================
# CriterioImpacto
# =========================
class CriterioImpactoBase(BaseModel):
    etapa_id: int
    nome: CriterioImpactoEnum
    pergunta: str
    texto_nota_1: Optional[str] = None
    texto_nota_5: Optional[str] = None
    ordem: int = 1

class CriterioImpactoCreate(CriterioImpactoBase):
    pass

class CriterioImpactoOut(CriterioImpactoBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# =========================
# Avaliacao
# =========================
class AvaliacaoBase(BaseModel):
    jornada_observada_id: Optional[int] = None
    nota: Optional[int] = None
    tipo_evidencia: Optional[TipoEvidenciaEnum] = None
    observacao: Optional[str] = None

class AvaliacaoBarreiraCreate(AvaliacaoBase):
    criterio_barreira_id: int

class AvaliacaoImpactoCreate(AvaliacaoBase):
    criterio_impacto_id: int

# =========================
# ResultadoAnalise
# =========================
class ResultadoAnaliseBase(BaseModel):
    processo_id: int
    etapa_id: Optional[int] = None
    media_barreiras: Optional[float] = None
    media_impactos: Optional[float] = None
    indice_sludge: Optional[float] = None
    prioridade: Optional[int] = None
    e_sludge: bool = False
    recomendacoes: Optional[str] = None

class ResultadoAnaliseCreate(ResultadoAnaliseBase):
    pass

class ResultadoAnaliseOut(ResultadoAnaliseBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
