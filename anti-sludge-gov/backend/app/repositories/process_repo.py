# app/repositories/process_repo.py
from __future__ import annotations

from sqlalchemy import select, exists
from sqlalchemy.orm import Session

from app.models.process_model import Processo, Etapa
from app.models.analysis_model import CriterioBarreira, CriterioImpacto, AvaliacaoBarreira, AvaliacaoImpacto


def get_processo(db: Session, processo_id: int) -> Processo | None:
    return db.get(Processo, processo_id)


def list_etapas_com_flag(db: Session, processo_id: int) -> list[tuple[Etapa, bool]]:
    """
    Retorna lista de (Etapa, has_avaliacao) para um processo.
    Considera 'avaliada' se existir pelo menos 1 avaliação (barreira ou impacto) ligada à etapa
    via criterio_barreira/criterio_impacto.
    """
    # EXISTS para barreira
    has_barreira = (
        select(exists().where(
            (Etapa.id == CriterioBarreira.etapa_id) &
            (CriterioBarreira.id == AvaliacaoBarreira.criterio_barreira_id)
        ))
        .correlate(Etapa)
        .scalar_subquery()
    )

    # EXISTS para impacto
    has_impacto = (
        select(exists().where(
            (Etapa.id == CriterioImpacto.etapa_id) &
            (CriterioImpacto.id == AvaliacaoImpacto.criterio_impacto_id)
        ))
        .correlate(Etapa)
        .scalar_subquery()
    )

    # has_avaliacao = barreira OR impacto
    stmt = (
        select(Etapa, (has_barreira | has_impacto).label("has_avaliacao"))
        .where(Etapa.processo_id == processo_id)
        .order_by(Etapa.ordem)
    )

    rows = db.execute(stmt).all()
    # rows: list[tuple[Etapa, bool]]
    return [(row[0], bool(row[1])) for row in rows]
