# app/features/extension_sessions/schemas.py
from datetime import datetime

from app.features.extension_sessions.models import TipoInteracaoEnum
from pydantic import BaseModel, ConfigDict, Field


# =========================
# InteracaoExtensao
# =========================
class InteracaoExtensaoCreate(BaseModel):
	tipo: TipoInteracaoEnum = TipoInteracaoEnum.CLICK
	pos_x: int | None = Field(None, alias="posX")
	pos_y: int | None = Field(None, alias="posY")
	pos_x_relativa: float | None = Field(None, ge=0, le=100, alias="posXRelativa")
	pos_y_relativa: float | None = Field(None, ge=0, le=100, alias="posYRelativa")
	elemento_tag: str | None = Field(None, max_length=100, alias="elementoTag")
	elemento_id: str | None = Field(None, max_length=255, alias="elementoId")
	elemento_classe: str | None = Field(None, max_length=1000, alias="elementoClasse")
	elemento_texto: str | None = Field(None, max_length=1000, alias="elementoTexto")
	timestamp_evento: int = Field(..., alias="timestampEvento")
	model_config = ConfigDict(populate_by_name=True)


class InteracaoExtensaoOut(InteracaoExtensaoCreate):
	id: int
	pagina_extensao_id: int
	created_at: datetime
	model_config = ConfigDict(from_attributes=True, populate_by_name=True)


# =========================
# PaginaExtensao
# =========================
class PaginaExtensaoCreate(BaseModel):
	url: str
	titulo: str | None = Field(None, max_length=1000, alias="title")
	tempo_inicio_unix: int = Field(..., alias="startTime")
	tempo_fim_unix: int | None = Field(None, alias="endTime")
	duracao_segundos: int | None = Field(None, alias="time")
	contagem_cliques: int = Field(0, alias="clicks")
	teve_scroll: bool = Field(False, alias="scrolled")
	ordem: int = 0
	interacoes: list[InteracaoExtensaoCreate] = Field(default=[], alias="interactions")
	model_config = ConfigDict(populate_by_name=True)


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
	model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class PaginaExtensaoSummaryOut(BaseModel):
	id: int
	url: str
	titulo: str | None
	duracao_segundos: int | None
	contagem_cliques: int
	teve_scroll: bool
	ordem: int
	model_config = ConfigDict(from_attributes=True, populate_by_name=True)


# =========================
# SessaoExtensao
# =========================
class SessaoExtensaoCreate(BaseModel):
	session_id_extensao: str = Field(..., max_length=100, alias="id")
	processo_id: int | None = Field(None, alias="processoId")
	data_inicio: datetime = Field(..., alias="startTime")
	data_fim: datetime | None = Field(None, alias="endTime")
	total_tempo_segundos: int | None = Field(None, alias="totalTime")
	total_paginas: int = 0
	total_cliques: int = 0
	paginas: list[PaginaExtensaoCreate] = Field(default=[], alias="pages")
	model_config = ConfigDict(populate_by_name=True)


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


class VinculoEtapaExtensao(BaseModel):
	jornada_id: int
	etapa_id: int
	start_ts: int
	end_ts: int
