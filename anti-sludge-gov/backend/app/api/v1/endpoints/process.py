# app/api/v1/endpoints/process.py
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.use_cases.get_process_detail import execute as get_process_detail
from app.schemas.process_schema import ProcessDetailOut
from app.schemas.stage import StageListOut

router = APIRouter()

@router.get("/{processo_id}", response_model=ProcessDetailOut)
def get_processo_detail(processo_id: int, db: Session = Depends(get_db)):
    result = get_process_detail(db, processo_id)
    if not result:
        raise HTTPException(status_code=404, detail="Processo não encontrado")

    processo, etapas = result

    # monta DTO final
    dto = ProcessDetailOut.model_validate(processo)
    dto.etapas = [
        StageListOut.model_validate(etapa).model_copy(update={"has_avaliacao": has_avaliacao})
        for etapa, has_avaliacao in etapas
    ]
    return dto
