# app/features/analysis_templates/schemas.py
from datetime import datetime

from pydantic import BaseModel, ConfigDict


# =========================
# GrupoAnalise
# =========================
class GrupoAnaliseBase(BaseModel):
	nome: str
	descricao: str
	criterios_considerados: str | None = None


class GrupoAnaliseCreate(GrupoAnaliseBase):
	pass


class GrupoAnaliseUpdate(GrupoAnaliseBase):
	nome: str | None = None
	descricao: str | None = None


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
	grupo_analise_id: int | None = None


class CriterioTemplateCreate(CriterioTemplateBase):
	pass


class CriterioTemplateUpdate(CriterioTemplateBase):
	nome: str | None = None
	conceito: str | None = None


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
	ordem: int | None = None


class TipoCriterioOut(TipoCriterioBase):
	id: int
	created_at: datetime
	model_config = ConfigDict(from_attributes=True)


# =========================
# EscalaAvaliacao
# =========================
class EscalaAvaliacaoBase(BaseModel):
	criterio_template_id: int | None = None
	tipo_comportamento_id: int | None = None
	pergunta: str
	texto_nota_1: str
	texto_nota_2: str | None = None
	texto_nota_3: str | None = None
	texto_nota_4: str | None = None
	texto_nota_5: str


class EscalaAvaliacaoCreate(EscalaAvaliacaoBase):
	pass


class EscalaAvaliacaoUpdate(EscalaAvaliacaoBase):
	pergunta: str | None = None


class EscalaAvaliacaoOut(EscalaAvaliacaoBase):
	id: int
	created_at: datetime
	model_config = ConfigDict(from_attributes=True)
