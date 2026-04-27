# app/features/analysis_results/router.py

from app.core.crud import CRUDBase
from app.core.database import get_db
from app.features.analysis import results_schemas as schemas
from app.features.catalog.schemas import CriterioTemplateOut
from app.features.analysis.models import (
	CriterioBarreira,
	CriterioImpacto,
	ResultadoAnalise,
)
from app.features.analysis.repository import AnalysisRepository
from app.features.catalog.repository import CatalogRepository
from app.features.processes.repository import ProcessRepository
from app.use_cases.analysis_use_cases import CalculateProcessSludgeUseCase
from app.use_cases.catalog_use_cases import CatalogUseCases
from fastapi import APIRouter, Depends, HTTPException
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
	"""
	Cria um critério de barreira para uma etapa, validando se o critério é compatível
	com o tipo de comportamento da etapa segundo a Metodologia F5.
	"""
	if obj_in.criterio_template_id:
		process_repo = ProcessRepository(db)
		catalog_repo = CatalogRepository(db)

		etapa = await process_repo.get_by_id(obj_in.etapa_id)
		if not etapa:
			raise HTTPException(status_code=404, detail="Etapa não encontrada")

		if etapa.tipo_comportamento_id:
			is_compatible = await catalog_repo.validate_compatibility(
				etapa.tipo_comportamento_id, obj_in.criterio_template_id
			)
			if not is_compatible:
				raise HTTPException(
					status_code=400,
					detail="Este critério não é aplicável para o tipo de comportamento desta etapa.",
				)

	return await crud_barreira.create(db, obj_in=obj_in.model_dump())


@router.get("/criterios-barreira", response_model=list[schemas.CriterioBarreiraOut])
async def list_criterios_barreira(
	skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)
):
	return await crud_barreira.get_multi(db, skip=skip, limit=limit)


@router.get(
	"/allowed-criteria/{etapa_id}",
	response_model=list[CriterioTemplateOut],
)
async def get_allowed_criteria(etapa_id: int, db: AsyncSession = Depends(get_db)):
	"""
	Sugere quais critérios de barreira podem ser aplicados a uma etapa específica.
	"""
	catalog_repo = CatalogRepository(db)
	process_repo = ProcessRepository(db)
	use_case = CatalogUseCases(catalog_repo, process_repo)

	return await use_case.get_allowed_criteria_for_step(etapa_id)


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
