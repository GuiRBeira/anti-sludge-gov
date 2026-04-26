# app/models/process_model.py
from __future__ import annotations

import uuid
from datetime import datetime, timedelta
from typing import TYPE_CHECKING

from app.core.base_model import AbrangenciaEnum, Base, EsferaGovernoEnum
from sqlalchemy import (
	Boolean,
	DateTime,
	ForeignKey,
	Index,
	Integer,
	String,
	Text,
	func,
	text,
)
from sqlalchemy import Enum as SAEnum
from sqlalchemy.dialects.postgresql import INTERVAL, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
	from app.features.analysis.models import (
		CriterioBarreira,
		CriterioImpacto,
		ResultadoAnalise,
	)
	from app.features.catalog.models import Categoria, TipoComportamento
	from app.features.observations.models import JornadaObservada, TempoEtapa


class Processo(Base):
	__tablename__ = "processo"
	__table_args__ = (
		Index("idx_processo_nome", "nome"),
		Index("idx_processo_status", "status"),
	)

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	uuid: Mapped[uuid.UUID] = mapped_column(
		UUID(as_uuid=True),
		unique=True,
		server_default=text("uuid_generate_v4()"),
		nullable=False,
	)
	nome: Mapped[str] = mapped_column(String(255), nullable=False)
	descricao: Mapped[str | None] = mapped_column(Text)
	objetivo: Mapped[str | None] = mapped_column(Text)
	esfera_governo: Mapped[EsferaGovernoEnum | None] = mapped_column(
		SAEnum(
			EsferaGovernoEnum,
			name="esfera_governo_enum",
			values_callable=lambda x: [e.value for e in x],
		),
		nullable=True,
	)
	abrangencia: Mapped[AbrangenciaEnum | None] = mapped_column(
		SAEnum(
			AbrangenciaEnum,
			name="abrangencia_enum",
			values_callable=lambda x: [e.value for e in x],
		),
		nullable=True,
	)
	publico_alvo: Mapped[str | None] = mapped_column(Text)
	usuarios_estimados_ano: Mapped[int | None] = mapped_column(Integer)
	perfil_foco_mapeamento: Mapped[str | None] = mapped_column(Text)
	jornada_planejada_descricao: Mapped[str | None] = mapped_column(Text)
	necessidade_usuario: Mapped[str | None] = mapped_column(Text)
	tempo_medio_estimado: Mapped[str | None] = mapped_column(String(50))
	indicadores_desempenho: Mapped[str | None] = mapped_column(Text)
	hipoteses_dificuldades: Mapped[str | None] = mapped_column(Text)
	registros_reclamacao: Mapped[str | None] = mapped_column(Text)
	registros_satisfacao: Mapped[str | None] = mapped_column(Text)
	status: Mapped[str] = mapped_column(
		String(50), server_default=text("'Em Andamento'"), nullable=False
	)
	created_at: Mapped[datetime] = mapped_column(
		DateTime, server_default=func.current_timestamp(), nullable=False
	)
	updated_at: Mapped[datetime] = mapped_column(
		DateTime,
		server_default=func.current_timestamp(),
		onupdate=func.current_timestamp(),
		nullable=False,
	)

	etapas: Mapped[list[Etapa]] = relationship(
		back_populates="processo",
		cascade="all, delete-orphan",
		passive_deletes=True,
		order_by="Etapa.ordem",
	)
	jornadas_observadas: Mapped[list[JornadaObservada]] = relationship(
		"JornadaObservada", back_populates="processo", passive_deletes=True
	)
	resultados: Mapped[list[ResultadoAnalise]] = relationship(
		"ResultadoAnalise", back_populates="processo", passive_deletes=True
	)


class Etapa(Base):
	__tablename__ = "etapa"
	__table_args__ = (
		Index("idx_etapa_processo", "processo_id"),
		Index("idx_etapa_ordem", "processo_id", "ordem"),
	)

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	processo_id: Mapped[int] = mapped_column(
		ForeignKey("processo.id", ondelete="CASCADE"), nullable=False
	)
	categoria_id: Mapped[int] = mapped_column(
		ForeignKey("categoria.id", ondelete="RESTRICT"), nullable=False
	)
	tipo_comportamento_id: Mapped[int] = mapped_column(
		ForeignKey("tipo_comportamento.id", ondelete="RESTRICT"), nullable=False
	)
	numero: Mapped[str | None] = mapped_column(String(10))
	comportamento: Mapped[str] = mapped_column(String(500), nullable=False)
	e_obrigatorio: Mapped[bool] = mapped_column(
		Boolean, server_default=text("false"), nullable=False
	)
	repeticoes: Mapped[str | None] = mapped_column(String(50))
	tempo_planejado: Mapped[timedelta | None] = mapped_column(INTERVAL)
	tempo_padrao: Mapped[timedelta | None] = mapped_column(INTERVAL)
	ordem: Mapped[int] = mapped_column(Integer, nullable=False)
	duracao_media_observada: Mapped[timedelta | None] = mapped_column(INTERVAL)
	created_at: Mapped[datetime] = mapped_column(
		DateTime, server_default=func.current_timestamp(), nullable=False
	)

	processo: Mapped[Processo] = relationship(back_populates="etapas")
	categoria: Mapped[Categoria] = relationship("Categoria", back_populates="etapas")
	tipo_comportamento: Mapped[TipoComportamento] = relationship(
		"TipoComportamento", back_populates="etapas"
	)

	criterios_barreira: Mapped[list[CriterioBarreira]] = relationship(
		"CriterioBarreira",
		back_populates="etapa",
		cascade="all, delete-orphan",
		passive_deletes=True,
	)
	criterios_impacto: Mapped[list[CriterioImpacto]] = relationship(
		"CriterioImpacto",
		back_populates="etapa",
		cascade="all, delete-orphan",
		passive_deletes=True,
	)
	tempos: Mapped[list[TempoEtapa]] = relationship(
		"TempoEtapa",
		back_populates="etapa",
		cascade="all, delete-orphan",
		passive_deletes=True,
	)
	resultados: Mapped[list[ResultadoAnalise]] = relationship(
		"ResultadoAnalise", back_populates="etapa", passive_deletes=True
	)
