# app/features/analysis_templates/models.py
from __future__ import annotations
from typing import TYPE_CHECKING, Optional, List
from datetime import datetime
from sqlalchemy import String, Text, Integer, DateTime, ForeignKey, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base_model import Base

if TYPE_CHECKING:
    from app.features.catalog.models import TipoComportamento

class GrupoAnalise(Base):
    __tablename__ = "grupo_analise"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nome: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    descricao: Mapped[str] = mapped_column(Text, nullable=False)
    criterios_considerados: Mapped[Optional[str]] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.current_timestamp(), nullable=False)

    criterios_template: Mapped[List["CriterioTemplate"]] = relationship(
        back_populates="grupo_analise",
        passive_deletes=True,
    )

class CriterioTemplate(Base):
    __tablename__ = "criterio_template"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nome: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    conceito: Mapped[str] = mapped_column(Text, nullable=False)

    grupo_analise_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("grupo_analise.id", ondelete="SET NULL"),
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.current_timestamp(), nullable=False)

    grupo_analise: Mapped[Optional["GrupoAnalise"]] = relationship(back_populates="criterios_template")

    mapeamentos_tipos: Mapped[List["TipoCriterio"]] = relationship(
        back_populates="criterio_template",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    escalas: Mapped[List["EscalaAvaliacao"]] = relationship(
        back_populates="criterio_template",
        passive_deletes=True,
    )

class TipoCriterio(Base):
    __tablename__ = "tipo_criterio"
    __table_args__ = (
        UniqueConstraint("tipo_comportamento_id", "criterio_template_id", name="uq_tipo_criterio"),
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
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.current_timestamp(), nullable=False)

    tipo_comportamento: Mapped["TipoComportamento"] = relationship("TipoComportamento", back_populates="mapeamentos_criterios")
    criterio_template: Mapped["CriterioTemplate"] = relationship(back_populates="mapeamentos_tipos")

class EscalaAvaliacao(Base):
    __tablename__ = "escala_avaliacao"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)

    criterio_template_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("criterio_template.id", ondelete="SET NULL"),
        nullable=True,
    )

    tipo_comportamento_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("tipo_comportamento.id", ondelete="SET NULL"),
        nullable=True,
    )

    pergunta: Mapped[str] = mapped_column(Text, nullable=False)
    texto_nota_1: Mapped[str] = mapped_column(Text, nullable=False)
    texto_nota_2: Mapped[Optional[str]] = mapped_column(Text)
    texto_nota_3: Mapped[Optional[str]] = mapped_column(Text)
    texto_nota_4: Mapped[Optional[str]] = mapped_column(Text)
    texto_nota_5: Mapped[str] = mapped_column(Text, nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.current_timestamp(), nullable=False)

    criterio_template: Mapped[Optional["CriterioTemplate"]] = relationship(back_populates="escalas")
    tipo_comportamento: Mapped[Optional["TipoComportamento"]] = relationship("TipoComportamento", back_populates="escalas")
