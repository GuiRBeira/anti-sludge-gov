# app/use_cases/get_process_detail.py
from __future__ import annotations

from sqlalchemy.orm import Session
from app.repositories import process_repo


def execute(db: Session, processo_id: int):
    processo = process_repo.get_processo(db, processo_id)
    if not processo:
        return None

    etapas = process_repo.list_etapas_com_flag(db, processo_id)
    return processo, etapas
