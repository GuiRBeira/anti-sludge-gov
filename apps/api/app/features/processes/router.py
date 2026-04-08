# app/features/processes/router.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List

from app.core.database import get_db
from app.core.crud import CRUDBase
from app.features.processes.models import Processo, Etapa
from app.features.processes import schemas

router = APIRouter()

# CRUD Managers
crud_processo = CRUDBase(Processo)
crud_etapa = CRUDBase(Etapa)

# =========================
# Processo Endpoints
# =========================
@router.post("/processos", response_model=schemas.ProcessoOut)
async def create_processo(obj_in: schemas.ProcessoCreate, db: AsyncSession = Depends(get_db)):
    return await crud_processo.create(db, obj_in=obj_in.model_dump())

@router.get("/processos", response_model=List[schemas.ProcessoOut])
async def list_processos(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    return await crud_processo.get_multi(db, skip=skip, limit=limit)

@router.get("/processos/{id}", response_model=schemas.ProcessoDetailOut)
async def get_processo(id: int, db: AsyncSession = Depends(get_db)):
    # Buscamos o processo com as etapas carregadas (Eager Loading)
    stmt = select(Processo).where(Processo.id == id).options(selectinload(Processo.etapas))
    result = await db.execute(stmt)
    db_obj = result.scalar_one_or_none()
    
    if not db_obj:
        raise HTTPException(status_code=404, detail="Processo não encontrado")
    return db_obj

# =========================
# Etapa Endpoints
# =========================
@router.post("/etapas", response_model=schemas.EtapaOut)
async def create_etapa(obj_in: schemas.EtapaCreate, db: AsyncSession = Depends(get_db)):
    return await crud_etapa.create(db, obj_in=obj_in.model_dump())

@router.get("/etapas", response_model=List[schemas.EtapaOut])
async def list_etapas(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    return await crud_etapa.get_multi(db, skip=skip, limit=limit)
