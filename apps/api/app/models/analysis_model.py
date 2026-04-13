# app/models/analysis_model.py
from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING

from app.models.base_model import Base, CriterioImpactoEnum, TipoEvidenciaEnum
from sqlalchemy import (
	Boolean,
	CheckConstraint,
	DateTime,
	ForeignKey,
	Index,
	Integer,
	Numeric,
	SmallInteger,
	String,
	Text,
	func,
)
from sqlalchemy import Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
	from app.models.catalog_model import CriterioTemplate
	from app.models.observation_model import JornadaObservada
	from app.models.process_model import Etapa, Processo


class CriterioBarreira(Base):
	__tablename__ = "criterio_barreira"
	__table_args__ = (Index("idx_criterio_barreira_etapa", "etapa_id"),)

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	etapa_id: Mapped[int] = mapped_column(
		ForeignKey("etapa.id", ondelete="CASCADE"), nullable=False
	)
	criterio_template_id: Mapped[int | None] = mapped_column(
		ForeignKey("criterio_template.id", ondelete="SET NULL"), nullable=True
	)

	nome: Mapped[str] = mapped_column(String(100), nullable=False)
	pergunta: Mapped[str] = mapped_column(Text, nullable=False)
	texto_nota_1: Mapped[str | None] = mapped_column(Text)
	texto_nota_5: Mapped[str | None] = mapped_column(Text)
	ordem: Mapped[int] = mapped_column(Integer, server_default="1", nullable=False)
	created_at: Mapped[datetime] = mapped_column(
		DateTime, server_default=func.current_timestamp(), nullable=False
	)

	etapa: Mapped[Etapa] = relationship("Etapa", back_populates="criterios_barreira")
	criterio_template: Mapped[CriterioTemplate | None] = relationship(
		"CriterioTemplate"
	)
	avaliacoes: Mapped[list[AvaliacaoBarreira]] = relationship(
		back_populates="criterio_barreira",
		cascade="all, delete-orphan",
		passive_deletes=True,
	)


class CriterioImpacto(Base):
	__tablename__ = "criterio_impacto"
	__table_args__ = (Index("idx_criterio_impacto_etapa", "etapa_id"),)

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	etapa_id: Mapped[int] = mapped_column(
		ForeignKey("etapa.id", ondelete="CASCADE"), nullable=False
	)
	nome: Mapped[CriterioImpactoEnum] = mapped_column(
		SAEnum(
			CriterioImpactoEnum,
			name="criterio_impacto_enum",
			values_callable=lambda x: [e.value for e in x],
		),
		nullable=False,
	)
	pergunta: Mapped[str] = mapped_column(Text, nullable=False)
	texto_nota_1: Mapped[str | None] = mapped_column(Text)
	texto_nota_5: Mapped[str | None] = mapped_column(Text)
	ordem: Mapped[int] = mapped_column(Integer, server_default="1", nullable=False)
	created_at: Mapped[datetime] = mapped_column(
		DateTime, server_default=func.current_timestamp(), nullable=False
	)

	etapa: Mapped[Etapa] = relationship("Etapa", back_populates="criterios_impacto")
	avaliacoes: Mapped[list[AvaliacaoImpacto]] = relationship(
		back_populates="criterio_impacto",
		cascade="all, delete-orphan",
		passive_deletes=True,
	)


class AvaliacaoBarreira(Base):
	__tablename__ = "avaliacao_barreira"
	__table_args__ = (
		Index("idx_avaliacao_barreira_criterio", "criterio_barreira_id"),
		Index("idx_avaliacao_barreira_jornada", "jornada_observada_id"),
		CheckConstraint(
			"nota IS NULL OR (nota >= 1 AND nota <= 5)", name="ck_av_barreira_nota_1_5"
		),
	)

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	criterio_barreira_id: Mapped[int] = mapped_column(
		ForeignKey("criterio_barreira.id", ondelete="CASCADE"), nullable=False
	)
	jornada_observada_id: Mapped[int | None] = mapped_column(
		ForeignKey("jornada_observada.id", ondelete="SET NULL"), nullable=True
	)
	nota: Mapped[int | None] = mapped_column(SmallInteger)
	tipo_evidencia: Mapped[TipoEvidenciaEnum | None] = mapped_column(
		SAEnum(
			TipoEvidenciaEnum,
			name="tipo_evidencia_enum",
			values_callable=lambda x: [e.value for e in x],
		),
		nullable=True,
	)
	observacao: Mapped[str | None] = mapped_column(Text)
	data_avaliacao: Mapped[datetime] = mapped_column(
		DateTime, server_default=func.current_timestamp(), nullable=False
	)

	criterio_barreira: Mapped[CriterioBarreira] = relationship(
		back_populates="avaliacoes"
	)
	jornada: Mapped[JornadaObservada | None] = relationship(
		"JornadaObservada", back_populates="avaliacoes_barreiras"
	)


class AvaliacaoImpacto(Base):
	__tablename__ = "avaliacao_impacto"
	__table_args__ = (
		Index("idx_avaliacao_impacto_criterio", "criterio_impacto_id"),
		Index("idx_avaliacao_impacto_jornada", "jornada_observada_id"),
		CheckConstraint(
			"nota IS NULL OR (nota >= 1 AND nota <= 5)", name="ck_av_impacto_nota_1_5"
		),
	)

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	criterio_impacto_id: Mapped[int] = mapped_column(
		ForeignKey("criterio_impacto.id", ondelete="CASCADE"), nullable=False
	)
	jornada_observada_id: Mapped[int | None] = mapped_column(
		ForeignKey("jornada_observada.id", ondelete="SET NULL"), nullable=True
	)
	nota: Mapped[int | None] = mapped_column(SmallInteger)
	tipo_evidencia: Mapped[TipoEvidenciaEnum | None] = mapped_column(
		SAEnum(
			TipoEvidenciaEnum,
			name="tipo_evidencia_enum",
			values_callable=lambda x: [e.value for e in x],
		),
		nullable=True,
	)
	observacao: Mapped[str | None] = mapped_column(Text)
	data_avaliacao: Mapped[datetime] = mapped_column(
		DateTime, server_default=func.current_timestamp(), nullable=False
	)

	criterio_impacto: Mapped[CriterioImpacto] = relationship(
		back_populates="avaliacoes"
	)
	jornada: Mapped[JornadaObservada | None] = relationship(
		"JornadaObservada", back_populates="avaliacoes_impactos"
	)


class ResultadoAnalise(Base):
	__tablename__ = "resultado_analise"
	__table_args__ = (Index("idx_resultado_processo", "processo_id"),)

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	processo_id: Mapped[int] = mapped_column(
		ForeignKey("processo.id", ondelete="CASCADE"), nullable=False
	)
	etapa_id: Mapped[int | None] = mapped_column(
		ForeignKey("etapa.id", ondelete="SET NULL"), nullable=True
	)
	media_barreiras: Mapped[float | None] = mapped_column(Numeric(3, 2))
	media_impactos: Mapped[float | None] = mapped_column(Numeric(3, 2))
	indice_sludge: Mapped[float | None] = mapped_column(Numeric(5, 2))
	prioridade: Mapped[int | None] = mapped_column(Integer)
	e_sludge: Mapped[bool] = mapped_column(
		Boolean, server_default="false", nullable=False
	)
	recomendacoes: Mapped[str | None] = mapped_column(Text)
	created_at: Mapped[datetime] = mapped_column(
		DateTime, server_default=func.current_timestamp(), nullable=False
	)

	processo: Mapped[Processo] = relationship("Processo", back_populates="resultados")
	etapa: Mapped[Etapa | None] = relationship("Etapa", back_populates="resultados")
