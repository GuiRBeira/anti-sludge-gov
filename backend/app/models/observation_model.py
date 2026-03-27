# app/models/observation.py
from __future__ import annotations
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from app.models.process_model import Processo, Etapa
    from app.models.analysis_model import AvaliacaoBarreira, AvaliacaoImpacto


from datetime import datetime, date, timedelta
from typing import Optional, List

from sqlalchemy import (
    String, Text, Integer, DateTime, Date, ForeignKey, Index, UniqueConstraint, func
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import INTERVAL

from app.models.base_model import Base


class Observador(Base):
    __tablename__ = "observador"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nome: Mapped[str] = mapped_column(String(150), nullable=False)
    email: Mapped[Optional[str]] = mapped_column(String(255))
    estado: Mapped[Optional[str]] = mapped_column(String(50))
    escolaridade: Mapped[Optional[str]] = mapped_column(String(100))
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.current_timestamp(), nullable=False)

    jornadas: Mapped[List["JornadaObservada"]] = relationship(
        back_populates="observador",
        passive_deletes=True,
    )


class JornadaObservada(Base):
    __tablename__ = "jornada_observada"
    __table_args__ = (
        Index("idx_jornada_processo", "processo_id"),
        Index("idx_jornada_data", "data_observacao"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)

    processo_id: Mapped[int] = mapped_column(
        ForeignKey("processo.id", ondelete="CASCADE"),
        nullable=False,
    )

    observador_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("observador.id", ondelete="SET NULL"),
        nullable=True,
    )

    protocolo: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    nome_jornada: Mapped[Optional[str]] = mapped_column(String(100))
    data_observacao: Mapped[date] = mapped_column(Date, nullable=False)
    observacoes_gerais: Mapped[Optional[str]] = mapped_column(Text)

    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.current_timestamp(), nullable=False)

    processo: Mapped["Processo"] = relationship(back_populates="jornadas_observadas")
    observador: Mapped[Optional["Observador"]] = relationship(back_populates="jornadas")

    avaliacoes_barreira: Mapped[List["AvaliacaoBarreira"]] = relationship(
        back_populates="jornada_observada",
        passive_deletes=True,
    )
    avaliacoes_impacto: Mapped[List["AvaliacaoImpacto"]] = relationship(
        back_populates="jornada_observada",
        passive_deletes=True,
    )

    tempos: Mapped[List["TempoEtapa"]] = relationship(
        back_populates="jornada_observada",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )


class TempoEtapa(Base):
    __tablename__ = "tempo_etapa"
    __table_args__ = (
        UniqueConstraint("jornada_observada_id", "etapa_id", name="uq_tempo_etapa_jornada_etapa"),
        Index("idx_tempo_etapa", "etapa_id"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)

    jornada_observada_id: Mapped[int] = mapped_column(
        ForeignKey("jornada_observada.id", ondelete="CASCADE"),
        nullable=False,
    )

    etapa_id: Mapped[int] = mapped_column(
        ForeignKey("etapa.id", ondelete="CASCADE"),
        nullable=False,
    )

    tempo_realizado: Mapped[timedelta] = mapped_column(INTERVAL, nullable=False)
    observacao: Mapped[Optional[str]] = mapped_column(Text)

    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.current_timestamp(), nullable=False)

    jornada_observada: Mapped["JornadaObservada"] = relationship(back_populates="tempos")
    etapa: Mapped["Etapa"] = relationship(back_populates="tempos")
