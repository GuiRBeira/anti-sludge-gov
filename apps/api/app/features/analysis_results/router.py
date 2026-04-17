# app/features/analysis_results/router.py

from app.core.crud import CRUDBase
from app.core.database import get_db
from app.features.analysis_results import schemas
from app.models.analysis_model import (
	CriterioBarreira,
	CriterioImpacto,
	ResultadoAnalise,
)
from app.repositories.analysis_repository import AnalysisRepository
from app.repositories.process_repository import ProcessRepository
from app.use_cases.analysis_use_cases import CalculateProcessSludgeUseCase
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

# CRUD Managers
crud_barreira = CRUDBase(CriterioBarreira)
crud_impacto = CRUDBase(CriterioImpacto)
crud_resultado = CRUDBase(ResultadoAnalise)


# =========================
# CriterioBarreira Endpoints
# =========================
@router.post("/criterios-barreira", response_model=schemas.CriterioBarreiraOut)
async def create_criterio_barreira(
	obj_in: schemas.CriterioBarreiraCreate, db: AsyncSession = Depends(get_db)
):
	return await crud_barreira.create(db, obj_in=obj_in.model_dump())


@router.get("/criterios-barreira", response_model=list[schemas.CriterioBarreiraOut])
async def list_criterios_barreira(
	skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)
):
	return await crud_barreira.get_multi(db, skip=skip, limit=limit)


# =========================
# CriterioImpacto Endpoints
# =========================
@router.post("/criterios-impacto", response_model=schemas.CriterioImpactoOut)
async def create_criterio_impacto(
	obj_in: schemas.CriterioImpactoCreate, db: AsyncSession = Depends(get_db)
):
	return await crud_impacto.create(db, obj_in=obj_in.model_dump())


@router.get("/criterios-impacto", response_model=list[schemas.CriterioImpactoOut])
async def list_criterios_impacto(
	skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)
):
	return await crud_impacto.get_multi(db, skip=skip, limit=limit)


# =========================
# ResultadoAnalise Endpoints
# =========================
@router.post("/resultados", response_model=schemas.ResultadoAnaliseOut)
async def create_resultado(
	obj_in: schemas.ResultadoAnaliseCreate, db: AsyncSession = Depends(get_db)
):
	return await crud_resultado.create(db, obj_in=obj_in.model_dump())


@router.get("/resultados", response_model=list[schemas.ResultadoAnaliseOut])
async def list_resultados(
	skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)
):
	return await crud_resultado.get_multi(db, skip=skip, limit=limit)


@router.post(
	"/calculate/{processo_id}", response_model=list[schemas.ResultadoAnaliseOut]
)
async def calculate_sludge(processo_id: int, db: AsyncSession = Depends(get_db)):
	"""
	Aciona o motor de cálculo da Metodologia F5 para todas as etapas do processo.
	"""
	analysis_repo = AnalysisRepository(db)
	process_repo = ProcessRepository(db)
	use_case = CalculateProcessSludgeUseCase(analysis_repo, process_repo)

	return await use_case.execute(processo_id)
