# app/features/observations/router.py

from app.core.crud import CRUDBase
from app.core.database import get_db
from app.features.observations import schemas
from app.models.observation_model import JornadaObservada, TempoEtapa
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

# CRUD Managers
crud_jornada = CRUDBase(JornadaObservada)
crud_tempo = CRUDBase(TempoEtapa)

# =========================
# JornadaObservada Endpoints
# =========================
@router.post("/jornadas", response_model=schemas.JornadaObservadaOut)
async def create_jornada(obj_in: schemas.JornadaObservadaCreate, db: AsyncSession = Depends(get_db)):
    return await crud_jornada.create(db, obj_in=obj_in.model_dump())

@router.get("/jornadas", response_model=list[schemas.JornadaObservadaOut])
async def list_jornadas(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    return await crud_jornada.get_multi(db, skip=skip, limit=limit)

# =========================
# TempoEtapa Endpoints
# =========================
@router.post("/tempos", response_model=schemas.TempoEtapaOut)
async def create_tempo_etapa(obj_in: schemas.TempoEtapaCreate, db: AsyncSession = Depends(get_db)):
    return await crud_tempo.create(db, obj_in=obj_in.model_dump())

@router.get("/tempos", response_model=list[schemas.TempoEtapaOut])
async def list_tempos(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    return await crud_tempo.get_multi(db, skip=skip, limit=limit)
