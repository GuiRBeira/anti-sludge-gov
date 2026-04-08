# app/features/observations/models.py
from __future__ import annotations
from datetime import datetime, timedelta
from typing import Optional, List, TYPE_CHECKING
from sqlalchemy import String, Text, Integer, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import INTERVAL
from app.models.base_model import Base

if TYPE_CHECKING:
    from app.features.processes.models import Processo, Etapa
    from app.features.analysis_results.models import ResultadoAnalise, AvaliacaoBarreira, AvaliacaoImpacto

class JornadaObservada(Base):
    __tablename__ = "jornada_observada"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    processo_id: Mapped[int] = mapped_column(
        ForeignKey("processo.id", ondelete="CASCADE"),
        nullable=False,
    )

    perfil_usuario: Mapped[Optional[str]] = mapped_column(String(255))
    data_observacao: Mapped[datetime] = mapped_column(DateTime, server_default=func.current_timestamp(), nullable=False)
    duracao_total: Mapped[Optional[timedelta]] = mapped_column(INTERVAL)
    observacoes_gerais: Mapped[Optional[str]] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.current_timestamp(), nullable=False)

    processo: Mapped["Processo"] = relationship("Processo", back_populates="jornadas_observadas")
    tempos: Mapped[List["TempoEtapa"]] = relationship(
        back_populates="jornada_observada",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
    avaliacoes_barreira: Mapped[List["AvaliacaoBarreira"]] = relationship(
        "AvaliacaoBarreira",
        back_populates="jornada_observada",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
    avaliacoes_impacto: Mapped[List["AvaliacaoImpacto"]] = relationship(
        "AvaliacaoImpacto",
        back_populates="jornada_observada",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

class TempoEtapa(Base):
    __tablename__ = "tempo_etapa"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    jornada_observada_id: Mapped[int] = mapped_column(
        ForeignKey("jornada_observada.id", ondelete="CASCADE"),
        nullable=False,
    )
    etapa_id: Mapped[int] = mapped_column(
        ForeignKey("etapa.id", ondelete="CASCADE"),
        nullable=False,
    )

    duracao: Mapped[timedelta] = mapped_column(INTERVAL, nullable=False)
    e_sucesso: Mapped[bool] = mapped_column(Integer, server_default="1", nullable=False) # Simplificado para booleano ou int no original
    observacoes: Mapped[Optional[str]] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.current_timestamp(), nullable=False)

    jornada_observada: Mapped["JornadaObservada"] = relationship(back_populates="tempos")
    etapa: Mapped["Etapa"] = relationship("Etapa", back_populates="tempos")
    
    # Relacionamento com resultados
    resultados: Mapped[List["ResultadoAnalise"]] = relationship(
        "ResultadoAnalise",
        back_populates="tempo_etapa",
        passive_deletes=True,
    )
