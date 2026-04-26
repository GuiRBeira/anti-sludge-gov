# app/models/catalog_model.py
from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING

from app.core.base_model import Base
from sqlalchemy import (
	DateTime,
	ForeignKey,
	Integer,
	String,
	Text,
	UniqueConstraint,
	func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
	from app.features.processes.models import Etapa


class Categoria(Base):
	__tablename__ = "categoria"

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	nome: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
	conceito: Mapped[str | None] = mapped_column(Text)
	exemplos: Mapped[str | None] = mapped_column(Text)
	descricao: Mapped[str | None] = mapped_column(Text)
	quantidade_tipos: Mapped[int] = mapped_column(
		Integer, server_default="0", nullable=False
	)
	created_at: Mapped[datetime] = mapped_column(
		DateTime, server_default=func.current_timestamp(), nullable=False
	)

	tipos_comportamento: Mapped[list[TipoComportamento]] = relationship(
		back_populates="categoria",
		passive_deletes=True,
	)

	etapas: Mapped[list[Etapa]] = relationship(
		"Etapa",
		back_populates="categoria",
		passive_deletes=True,
	)


class TipoComportamento(Base):
	__tablename__ = "tipo_comportamento"

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	categoria_id: Mapped[int] = mapped_column(
		ForeignKey("categoria.id", ondelete="RESTRICT"),
		nullable=False,
	)

	nome: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
	codigo_referencia: Mapped[str] = mapped_column(
		String(50), nullable=False, unique=True
	)
	conceito: Mapped[str | None] = mapped_column(Text)
	exemplos: Mapped[str | None] = mapped_column(Text)
	descricao: Mapped[str | None] = mapped_column(Text)
	num_criterios: Mapped[int] = mapped_column(
		Integer, server_default="0", nullable=False
	)
	ordem_na_categoria: Mapped[int] = mapped_column(
		Integer, server_default="1", nullable=False
	)
	created_at: Mapped[datetime] = mapped_column(
		DateTime, server_default=func.current_timestamp(), nullable=False
	)

	categoria: Mapped[Categoria] = relationship(back_populates="tipos_comportamento")

	mapeamentos_criterios: Mapped[list[TipoCriterio]] = relationship(
		"TipoCriterio",
		back_populates="tipo_comportamento",
		cascade="all, delete-orphan",
		passive_deletes=True,
	)

	etapas: Mapped[list[Etapa]] = relationship(
		"Etapa",
		back_populates="tipo_comportamento",
		passive_deletes=True,
	)

	escalas: Mapped[list[EscalaAvaliacao]] = relationship(
		"EscalaAvaliacao",
		back_populates="tipo_comportamento",
		passive_deletes=True,
	)


class GrupoAnalise(Base):
	__tablename__ = "grupo_analise"

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	nome: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
	descricao: Mapped[str] = mapped_column(Text, nullable=False)
	criterios_considerados: Mapped[str | None] = mapped_column(Text)
	created_at: Mapped[datetime] = mapped_column(
		DateTime, server_default=func.current_timestamp(), nullable=False
	)

	criterios_template: Mapped[list[CriterioTemplate]] = relationship(
		back_populates="grupo_analise",
		passive_deletes=True,
	)


class CriterioTemplate(Base):
	__tablename__ = "criterio_template"

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	nome: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
	conceito: Mapped[str] = mapped_column(Text, nullable=False)

	grupo_analise_id: Mapped[int | None] = mapped_column(
		ForeignKey("grupo_analise.id", ondelete="SET NULL"),
		nullable=True,
	)

	created_at: Mapped[datetime] = mapped_column(
		DateTime, server_default=func.current_timestamp(), nullable=False
	)

	grupo_analise: Mapped[GrupoAnalise | None] = relationship(
		back_populates="criterios_template"
	)

	mapeamentos_tipos: Mapped[list[TipoCriterio]] = relationship(
		"TipoCriterio",
		back_populates="criterio_template",
		cascade="all, delete-orphan",
		passive_deletes=True,
	)

	escalas: Mapped[list[EscalaAvaliacao]] = relationship(
		"EscalaAvaliacao",
		back_populates="criterio_template",
		passive_deletes=True,
	)


class TipoCriterio(Base):
	__tablename__ = "tipo_criterio"
	__table_args__ = (
		UniqueConstraint(
			"tipo_comportamento_id", "criterio_template_id", name="uq_tipo_criterio"
		),
	)

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	tipo_comportamento_id: Mapped[int] = mapped_column(
		ForeignKey("tipo_comportamento.id", ondelete="CASCADE"),
		nullable=False,
	)
	criterio_template_id: Mapped[int] = mapped_column(
		ForeignKey("criterio_template.id", ondelete="CASCADE"),
		nullable=False,
	)

	ordem: Mapped[int] = mapped_column(Integer, server_default="1", nullable=False)
	created_at: Mapped[datetime] = mapped_column(
		DateTime, server_default=func.current_timestamp(), nullable=False
	)

	tipo_comportamento: Mapped[TipoComportamento] = relationship(
		"TipoComportamento", back_populates="mapeamentos_criterios"
	)
	criterio_template: Mapped[CriterioTemplate] = relationship(
		back_populates="mapeamentos_tipos"
	)


class EscalaAvaliacao(Base):
	__tablename__ = "escala_avaliacao"

	id: Mapped[int] = mapped_column(Integer, primary_key=True)

	criterio_template_id: Mapped[int | None] = mapped_column(
		ForeignKey("criterio_template.id", ondelete="SET NULL"),
		nullable=True,
	)

	tipo_comportamento_id: Mapped[int | None] = mapped_column(
		ForeignKey("tipo_comportamento.id", ondelete="SET NULL"),
		nullable=True,
	)

	pergunta: Mapped[str] = mapped_column(Text, nullable=False)
	texto_nota_1: Mapped[str] = mapped_column(Text, nullable=False)
	texto_nota_2: Mapped[str | None] = mapped_column(Text)
	texto_nota_3: Mapped[str | None] = mapped_column(Text)
	texto_nota_4: Mapped[str | None] = mapped_column(Text)
	texto_nota_5: Mapped[str] = mapped_column(Text, nullable=False)

	created_at: Mapped[datetime] = mapped_column(
		DateTime, server_default=func.current_timestamp(), nullable=False
	)

	criterio_template: Mapped[CriterioTemplate | None] = relationship(
		back_populates="escalas"
	)
	tipo_comportamento: Mapped[TipoComportamento | None] = relationship(
		"TipoComportamento", back_populates="escalas"
	)


class Glossario(Base):
	__tablename__ = "glossario"

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	termo: Mapped[str] = mapped_column(String(150), nullable=False, unique=True)
	grupo: Mapped[str | None] = mapped_column(String(100))
	definicao: Mapped[str] = mapped_column(Text, nullable=False)
	created_at: Mapped[datetime] = mapped_column(
		DateTime, server_default=func.current_timestamp(), nullable=False
	)
