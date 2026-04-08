# app/features/analysis_templates/router.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.database import get_db
from app.core.crud import CRUDBase
from app.features.analysis_templates.models import GrupoAnalise, CriterioTemplate, TipoCriterio, EscalaAvaliacao
from app.features.analysis_templates import schemas

router = APIRouter()

# CRUD Managers
crud_grupo_analise = CRUDBase(GrupoAnalise)
crud_criterio_template = CRUDBase(CriterioTemplate)
crud_tipo_criterio = CRUDBase(TipoCriterio)
crud_escala_avaliacao = CRUDBase(EscalaAvaliacao)

# =========================
# GrupoAnalise Endpoints
# =========================
@router.post("/grupos-analise", response_model=schemas.GrupoAnaliseOut)
async def create_grupo_analise(obj_in: schemas.GrupoAnaliseCreate, db: AsyncSession = Depends(get_db)):
    return await crud_grupo_analise.create(db, obj_in=obj_in.model_dump())

@router.get("/grupos-analise", response_model=List[schemas.GrupoAnaliseOut])
async def list_grupos_analise(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    return await crud_grupo_analise.get_multi(db, skip=skip, limit=limit)

# =========================
# CriterioTemplate Endpoints
# =========================
@router.post("/criterios-template", response_model=schemas.CriterioTemplateOut)
async def create_criterio_template(obj_in: schemas.CriterioTemplateCreate, db: AsyncSession = Depends(get_db)):
    return await crud_criterio_template.create(db, obj_in=obj_in.model_dump())

@router.get("/criterios-template", response_model=List[schemas.CriterioTemplateOut])
async def list_criterios_template(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    return await crud_criterio_template.get_multi(db, skip=skip, limit=limit)

# =========================
# TipoCriterio Endpoints
# =========================
@router.post("/tipos-criterio", response_model=schemas.TipoCriterioOut)
async def create_tipo_criterio(obj_in: schemas.TipoCriterioCreate, db: AsyncSession = Depends(get_db)):
    return await crud_tipo_criterio.create(db, obj_in=obj_in.model_dump())

@router.get("/tipos-criterio", response_model=List[schemas.TipoCriterioOut])
async def list_tipos_criterio(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    return await crud_tipo_criterio.get_multi(db, skip=skip, limit=limit)

# =========================
# EscalaAvaliacao Endpoints
# =========================
@router.post("/escalas-avaliacao", response_model=schemas.EscalaAvaliacaoOut)
async def create_escala_avaliacao(obj_in: schemas.EscalaAvaliacaoCreate, db: AsyncSession = Depends(get_db)):
    return await crud_escala_avaliacao.create(db, obj_in=obj_in.model_dump())

@router.get("/escalas-avaliacao", response_model=List[schemas.EscalaAvaliacaoOut])
async def list_escalas_avaliacao(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    return await crud_escala_avaliacao.get_multi(db, skip=skip, limit=limit)
