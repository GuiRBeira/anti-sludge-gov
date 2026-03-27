# app/models/process.py
from __future__ import annotations
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from app.models.catalog_model import Categoria, TipoComportamento
    from app.models.analysis_model import ResultadoAnalise
    from app.models.observation_model import JornadaObservada
    from app.models.analysis_model import CriterioBarreira, CriterioImpacto
    from app.models.observation_model import TempoEtapa

import uuid
from datetime import datetime, timedelta
from typing import Optional, List

from sqlalchemy import (
    String, Text, Integer, Boolean, DateTime, ForeignKey, Index, func, text
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, INTERVAL
from sqlalchemy import Enum as SAEnum

from app.models.base_model import Base, EsferaGovernoEnum, AbrangenciaEnum


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
    descricao: Mapped[Optional[str]] = mapped_column(Text)
    objetivo: Mapped[Optional[str]] = mapped_column(Text)

    esfera_governo: Mapped[Optional[EsferaGovernoEnum]] = mapped_column(
        SAEnum(EsferaGovernoEnum, name="esfera_governo_enum"),
        nullable=True,
    )

    abrangencia: Mapped[Optional[AbrangenciaEnum]] = mapped_column(
        SAEnum(AbrangenciaEnum, name="abrangencia_enum"),
        nullable=True,
    )

    publico_alvo: Mapped[Optional[str]] = mapped_column(Text)
    usuarios_estimados_ano: Mapped[Optional[int]] = mapped_column(Integer)
    perfil_foco_mapeamento: Mapped[Optional[str]] = mapped_column(Text)
    jornada_planejada_descricao: Mapped[Optional[str]] = mapped_column(Text)
    necessidade_usuario: Mapped[Optional[str]] = mapped_column(Text)
    tempo_medio_estimado: Mapped[Optional[str]] = mapped_column(String(50))
    indicadores_desempenho: Mapped[Optional[str]] = mapped_column(Text)
    hipoteses_dificuldades: Mapped[Optional[str]] = mapped_column(Text)
    registros_reclamacao: Mapped[Optional[str]] = mapped_column(Text)
    registros_satisfacao: Mapped[Optional[str]] = mapped_column(Text)

    status: Mapped[str] = mapped_column(
        String(50),
        server_default=text("'Em Andamento'"),
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=False),
        server_default=func.current_timestamp(),
        nullable=False,
    )

    # Atualizado via trigger no banco
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=False),
        server_default=func.current_timestamp(),
        nullable=False,
    )

    etapas: Mapped[List["Etapa"]] = relationship(
        back_populates="processo",
        cascade="all, delete-orphan",
        passive_deletes=True,
        order_by="Etapa.ordem",
    )

    jornadas_observadas: Mapped[List["JornadaObservada"]] = relationship(
        back_populates="processo",
        passive_deletes=True,
    )

    resultados: Mapped[List["ResultadoAnalise"]] = relationship(
        back_populates="processo",
        passive_deletes=True,
    )


class Etapa(Base):
    __tablename__ = "etapa"
    __table_args__ = (
        Index("idx_etapa_processo", "processo_id"),
        Index("idx_etapa_ordem", "processo_id", "ordem"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)

    processo_id: Mapped[int] = mapped_column(
        ForeignKey("processo.id", ondelete="CASCADE"),
        nullable=False,
    )

    categoria_id: Mapped[int] = mapped_column(
        ForeignKey("categoria.id", ondelete="RESTRICT"),
        nullable=False,
    )

    tipo_comportamento_id: Mapped[int] = mapped_column(
        ForeignKey("tipo_comportamento.id", ondelete="RESTRICT"),
        nullable=False,
    )

    numero: Mapped[Optional[str]] = mapped_column(String(10))
    comportamento: Mapped[str] = mapped_column(String(500), nullable=False)

    e_obrigatorio: Mapped[bool] = mapped_column(
        Boolean,
        server_default=text("false"),
        nullable=False,
    )

    repeticoes: Mapped[Optional[str]] = mapped_column(String(50))

    tempo_planejado: Mapped[Optional[timedelta]] = mapped_column(INTERVAL)
    tempo_padrao: Mapped[Optional[timedelta]] = mapped_column(INTERVAL)

    ordem: Mapped[int] = mapped_column(Integer, nullable=False)

    duracao_media_observada: Mapped[Optional[timedelta]] = mapped_column(INTERVAL)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=False),
        server_default=func.current_timestamp(),
        nullable=False,
    )

    processo: Mapped["Processo"] = relationship(back_populates="etapas")
    categoria: Mapped["Categoria"] = relationship(back_populates="etapas")
    tipo_comportamento: Mapped["TipoComportamento"] = relationship(back_populates="etapas")

    criterios_barreira: Mapped[List["CriterioBarreira"]] = relationship(
        back_populates="etapa",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    criterios_impacto: Mapped[List["CriterioImpacto"]] = relationship(
        back_populates="etapa",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    tempos: Mapped[List["TempoEtapa"]] = relationship(
        back_populates="etapa",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    resultados: Mapped[List["ResultadoAnalise"]] = relationship(
        back_populates="etapa",
        passive_deletes=True,
    )
