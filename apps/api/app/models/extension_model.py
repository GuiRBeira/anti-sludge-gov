# app/models/extension_model.py
from __future__ import annotations

import uuid
from datetime import datetime
from enum import Enum
from typing import TYPE_CHECKING

from app.models.base_model import Base
from sqlalchemy import (
	BigInteger,
	Boolean,
	DateTime,
	ForeignKey,
	Index,
	Integer,
	Numeric,
	String,
	Text,
	func,
	text,
)
from sqlalchemy import Enum as SAEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
	from app.models.observation_model import JornadaObservada
	from app.models.process_model import Processo


class TipoInteracaoEnum(str, Enum):
	CLICK = "click"
	SCROLL = "scroll"


class SessaoExtensao(Base):
	__tablename__ = "sessao_extensao"
	__table_args__ = (
		Index("idx_sessao_extensao_processo", "processo_id"),
		Index("idx_sessao_extensao_jornada", "jornada_observada_id"),
	)

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	uuid: Mapped[uuid.UUID] = mapped_column(
		UUID(as_uuid=True),
		unique=True,
		server_default=text("uuid_generate_v4()"),
		nullable=False,
	)
	session_id_extensao: Mapped[str] = mapped_column(
		String(100), unique=True, nullable=False
	)
	processo_id: Mapped[int | None] = mapped_column(
		ForeignKey("processo.id", ondelete="SET NULL"), nullable=True
	)
	jornada_observada_id: Mapped[int | None] = mapped_column(
		ForeignKey("jornada_observada.id", ondelete="SET NULL"), nullable=True
	)
	data_inicio: Mapped[datetime] = mapped_column(DateTime, nullable=False)
	data_fim: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
	total_tempo_segundos: Mapped[int | None] = mapped_column(Integer, nullable=True)
	total_paginas: Mapped[int] = mapped_column(
		Integer, server_default=text("0"), nullable=False
	)
	total_cliques: Mapped[int] = mapped_column(
		Integer, server_default=text("0"), nullable=False
	)
	created_at: Mapped[datetime] = mapped_column(
		DateTime, server_default=func.current_timestamp(), nullable=False
	)

	processo: Mapped[Processo | None] = relationship("Processo")
	jornada_observada: Mapped[JornadaObservada | None] = relationship(
		"JornadaObservada"
	)
	paginas: Mapped[list[PaginaExtensao]] = relationship(
		back_populates="sessao",
		cascade="all, delete-orphan",
		passive_deletes=True,
		order_by="PaginaExtensao.ordem",
	)


class PaginaExtensao(Base):
	__tablename__ = "pagina_extensao"
	__table_args__ = (Index("idx_pagina_extensao_sessao", "sessao_extensao_id"),)

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	sessao_extensao_id: Mapped[int] = mapped_column(
		ForeignKey("sessao_extensao.id", ondelete="CASCADE"), nullable=False
	)
	url: Mapped[str] = mapped_column(Text, nullable=False)
	titulo: Mapped[str | None] = mapped_column(String(500), nullable=True)
	tempo_inicio_unix: Mapped[int] = mapped_column(BigInteger, nullable=False)
	tempo_fim_unix: Mapped[int | None] = mapped_column(BigInteger, nullable=True)
	duracao_segundos: Mapped[int | None] = mapped_column(Integer, nullable=True)
	contagem_cliques: Mapped[int] = mapped_column(
		Integer, server_default=text("0"), nullable=False
	)
	teve_scroll: Mapped[bool] = mapped_column(
		Boolean, server_default=text("false"), nullable=False
	)
	ordem: Mapped[int] = mapped_column(Integer, nullable=False)
	created_at: Mapped[datetime] = mapped_column(
		DateTime, server_default=func.current_timestamp(), nullable=False
	)

	sessao: Mapped[SessaoExtensao] = relationship(back_populates="paginas")
	interacoes: Mapped[list[InteracaoExtensao]] = relationship(
		back_populates="pagina",
		cascade="all, delete-orphan",
		passive_deletes=True,
	)


class InteracaoExtensao(Base):
	__tablename__ = "interacao_extensao"
	__table_args__ = (Index("idx_interacao_pagina", "pagina_extensao_id"),)

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	pagina_extensao_id: Mapped[int] = mapped_column(
		ForeignKey("pagina_extensao.id", ondelete="CASCADE"), nullable=False
	)
	tipo: Mapped[TipoInteracaoEnum] = mapped_column(
		SAEnum(
			TipoInteracaoEnum,
			name="tipo_interacao_enum",
			values_callable=lambda x: [e.value for e in x],
		),
		server_default=text("'click'"),
		nullable=False,
	)
	pos_x: Mapped[int | None] = mapped_column(Integer, nullable=True)
	pos_y: Mapped[int | None] = mapped_column(Integer, nullable=True)
	pos_x_relativa: Mapped[float | None] = mapped_column(Numeric(5, 2), nullable=True)
	pos_y_relativa: Mapped[float | None] = mapped_column(Numeric(5, 2), nullable=True)
	elemento_tag: Mapped[str | None] = mapped_column(String(50), nullable=True)
	elemento_id: Mapped[str | None] = mapped_column(String(200), nullable=True)
	elemento_classe: Mapped[str | None] = mapped_column(String(500), nullable=True)
	elemento_texto: Mapped[str | None] = mapped_column(String(200), nullable=True)
	timestamp_evento: Mapped[int] = mapped_column(BigInteger, nullable=False)
	created_at: Mapped[datetime] = mapped_column(
		DateTime, server_default=func.current_timestamp(), nullable=False
	)

	pagina: Mapped[PaginaExtensao] = relationship(back_populates="interacoes")
