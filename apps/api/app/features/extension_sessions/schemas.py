# app/features/extension_sessions/schemas.py
from datetime import datetime

from app.models.extension_model import TipoInteracaoEnum
from pydantic import BaseModel, ConfigDict, Field


# =========================
# InteracaoExtensao
# =========================
class InteracaoExtensaoCreate(BaseModel):
	tipo: TipoInteracaoEnum = TipoInteracaoEnum.CLICK
	pos_x: int | None = None
	pos_y: int | None = None
	pos_x_relativa: float | None = Field(None, ge=0, le=100)
	pos_y_relativa: float | None = Field(None, ge=0, le=100)
	elemento_tag: str | None = Field(None, max_length=50)
	elemento_id: str | None = Field(None, max_length=200)
	elemento_classe: str | None = Field(None, max_length=500)
	elemento_texto: str | None = Field(None, max_length=200)
	timestamp_evento: int


class InteracaoExtensaoOut(InteracaoExtensaoCreate):
	id: int
	pagina_extensao_id: int
	created_at: datetime
	model_config = ConfigDict(from_attributes=True)


# =========================
# PaginaExtensao
# =========================
class PaginaExtensaoCreate(BaseModel):
	url: str
	titulo: str | None = Field(None, max_length=500)
	tempo_inicio_unix: int
	tempo_fim_unix: int | None = None
	duracao_segundos: int | None = None
	contagem_cliques: int = 0
	teve_scroll: bool = False
	ordem: int
	interacoes: list[InteracaoExtensaoCreate] = []


class PaginaExtensaoOut(BaseModel):
	id: int
	sessao_extensao_id: int
	url: str
	titulo: str | None
	tempo_inicio_unix: int
	tempo_fim_unix: int | None
	duracao_segundos: int | None
	contagem_cliques: int
	teve_scroll: bool
	ordem: int
	created_at: datetime
	interacoes: list[InteracaoExtensaoOut] = []
	model_config = ConfigDict(from_attributes=True)


class PaginaExtensaoSummaryOut(BaseModel):
	id: int
	url: str
	titulo: str | None
	duracao_segundos: int | None
	contagem_cliques: int
	teve_scroll: bool
	ordem: int
	model_config = ConfigDict(from_attributes=True)


# =========================
# SessaoExtensao
# =========================
class SessaoExtensaoCreate(BaseModel):
	session_id_extensao: str = Field(..., max_length=100)
	processo_id: int | None = None
	data_inicio: datetime
	data_fim: datetime | None = None
	total_tempo_segundos: int | None = None
	total_paginas: int = 0
	total_cliques: int = 0
	paginas: list[PaginaExtensaoCreate] = []


class SessaoExtensaoVincularJornada(BaseModel):
	jornada_observada_id: int


class SessaoExtensaoOut(BaseModel):
	id: int
	session_id_extensao: str
	processo_id: int | None
	jornada_observada_id: int | None
	data_inicio: datetime
	data_fim: datetime | None
	total_tempo_segundos: int | None
	total_paginas: int
	total_cliques: int
	created_at: datetime
	model_config = ConfigDict(from_attributes=True)


class SessaoExtensaoDetailOut(SessaoExtensaoOut):
	paginas: list[PaginaExtensaoSummaryOut] = []
	model_config = ConfigDict(from_attributes=True)
