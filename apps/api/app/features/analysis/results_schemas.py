# app/features/analysis_results/schemas.py
from datetime import datetime

from app.core.base_model import CriterioImpactoEnum, TipoEvidenciaEnum
from pydantic import BaseModel, ConfigDict


# =========================
# CriterioBarreira
# =========================
class CriterioBarreiraBase(BaseModel):
	etapa_id: int
	criterio_template_id: int | None = None
	nome: str
	pergunta: str
	texto_nota_1: str | None = None
	texto_nota_5: str | None = None
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
	texto_nota_1: str | None = None
	texto_nota_5: str | None = None
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
	jornada_observada_id: int | None = None
	nota: int | None = None
	tipo_evidencia: TipoEvidenciaEnum | None = None
	observacao: str | None = None


class AvaliacaoBarreiraCreate(AvaliacaoBase):
	criterio_barreira_id: int


class AvaliacaoImpactoCreate(AvaliacaoBase):
	criterio_impacto_id: int


# =========================
# ResultadoAnalise
# =========================
class ResultadoAnaliseBase(BaseModel):
	processo_id: int
	etapa_id: int | None = None
	media_barreiras: float | None = None
	media_impactos: float | None = None
	indice_sludge: float | None = None
	prioridade: int | None = None
	e_sludge: bool = False
	recomendacoes: str | None = None


class ResultadoAnaliseCreate(ResultadoAnaliseBase):
	pass


class ResultadoAnaliseOut(ResultadoAnaliseBase):
	id: int
	created_at: datetime
	model_config = ConfigDict(from_attributes=True)
