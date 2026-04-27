# app/features/catalog/router.py

from app.core.database import get_db
from app.features.catalog import schemas
from app.features.catalog.repository import CatalogRepository
from app.use_cases.catalog_use_cases import CatalogUseCases
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()


async def get_catalog_use_cases(db: AsyncSession = Depends(get_db)) -> CatalogUseCases:
	repo = CatalogRepository(db)
	return CatalogUseCases(repo)


# =========================
# Categoria Endpoints
# =========================
@router.post("/categorias", response_model=schemas.CategoriaOut)
async def create_categoria(
	obj_in: schemas.CategoriaCreate,
	use_cases: CatalogUseCases = Depends(get_catalog_use_cases),
):
	return await use_cases.create_category(obj_in.model_dump())


@router.get("/categorias", response_model=list[schemas.CategoriaOut])
async def list_categorias(
	skip: int = 0,
	limit: int = 100,
	use_cases: CatalogUseCases = Depends(get_catalog_use_cases),
):
	return await use_cases.list_categories(skip=skip, limit=limit)


@router.get("/categorias/{id}", response_model=schemas.CategoriaOut)
async def get_categoria(
	id: int, use_cases: CatalogUseCases = Depends(get_catalog_use_cases)
):
	db_obj = await use_cases.get_category(id)
	if not db_obj:
		raise HTTPException(status_code=404, detail="Categoria não encontrada")
	return db_obj


@router.put("/categorias/{id}", response_model=schemas.CategoriaOut)
async def update_categoria(
	id: int,
	obj_in: schemas.CategoriaUpdate,
	use_cases: CatalogUseCases = Depends(get_catalog_use_cases),
):
	db_obj = await use_cases.update_category(id, obj_in.model_dump(exclude_unset=True))
	if not db_obj:
		raise HTTPException(status_code=404, detail="Categoria não encontrada")
	return db_obj


@router.delete("/categorias/{id}")
async def delete_categoria(
	id: int, use_cases: CatalogUseCases = Depends(get_catalog_use_cases)
):
	success = await use_cases.delete_category(id)
	if not success:
		raise HTTPException(status_code=404, detail="Categoria não encontrada")
	return {"message": "Categoria deletada"}


@router.get("/tipos-comportamento", response_model=list[schemas.TipoComportamentoOut])
async def list_tipos(use_cases: CatalogUseCases = Depends(get_catalog_use_cases)):
	return await use_cases.list_tipos()
