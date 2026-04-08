# app/features/catalog/models.py
from __future__ import annotations
from typing import TYPE_CHECKING, Optional, List
from datetime import datetime
from sqlalchemy import String, Text, Integer, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base_model import Base

if TYPE_CHECKING:
    from app.features.processes.models import Etapa

class Categoria(Base):
    __tablename__ = "categoria"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nome: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    conceito: Mapped[Optional[str]] = mapped_column(Text)
    exemplos: Mapped[Optional[str]] = mapped_column(Text)
    descricao: Mapped[Optional[str]] = mapped_column(Text)
    quantidade_tipos: Mapped[int] = mapped_column(Integer, server_default="0", nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.current_timestamp(), nullable=False)

    tipos_comportamento: Mapped[List["TipoComportamento"]] = relationship(
        back_populates="categoria",
        passive_deletes=True,
    )

    etapas: Mapped[List["Etapa"]] = relationship(
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
    codigo_referencia: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    conceito: Mapped[Optional[str]] = mapped_column(Text)
    exemplos: Mapped[Optional[str]] = mapped_column(Text)
    descricao: Mapped[Optional[str]] = mapped_column(Text)
    num_criterios: Mapped[int] = mapped_column(Integer, server_default="0", nullable=False)
    ordem_na_categoria: Mapped[int] = mapped_column(Integer, server_default="1", nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.current_timestamp(), nullable=False)

    categoria: Mapped["Categoria"] = relationship(back_populates="tipos_comportamento")
    
    # Relacionamentos com analysis_templates serão adicionados quando essa feature for criada
    mapeamentos_criterios: Mapped[List["TipoCriterio"]] = relationship(
        "TipoCriterio",
        back_populates="tipo_comportamento",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    etapas: Mapped[List["Etapa"]] = relationship(
        back_populates="tipo_comportamento",
        passive_deletes=True,
    )

    escalas: Mapped[List["EscalaAvaliacao"]] = relationship(
        "EscalaAvaliacao",
        back_populates="tipo_comportamento",
        passive_deletes=True,
    )

class Glossario(Base):
    __tablename__ = "glossario"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    termo: Mapped[str] = mapped_column(String(150), nullable=False, unique=True)
    grupo: Mapped[Optional[str]] = mapped_column(String(100))
    definicao: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.current_timestamp(), nullable=False)
