# app/features/processes/router.py

from app.core.crud import CRUDBase
from app.core.database import get_db
from app.features.processes import schemas
from app.features.processes.models import Etapa, Processo
from app.core.auth import get_current_user, check_extension_key
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

router = APIRouter()

# CRUD Managers
crud_processo = CRUDBase(Processo)
crud_etapa = CRUDBase(Etapa)


# =========================
# Processo Endpoints
# =========================
@router.post("/processos", response_model=schemas.ProcessoOut)
async def create_processo(
	obj_in: schemas.ProcessoCreate,
	db: AsyncSession = Depends(get_db),
	current_user: dict = Depends(get_current_user),
):
	return await crud_processo.create(db, obj_in=obj_in.model_dump())


@router.get("/processos", response_model=list[schemas.ProcessoOut])
async def list_processos(
	skip: int = 0,
	limit: int = 100,
	db: AsyncSession = Depends(get_db),
	x_api_key: str | None = Header(None),
	current_user: dict | None = Depends(get_current_user),
):
	if not current_user and not (x_api_key and check_extension_key(x_api_key)):
		raise HTTPException(status_code=401, detail="Acesso não autorizado")
	return await crud_processo.get_multi(db, skip=skip, limit=limit)


@router.get("/processos/{id}", response_model=schemas.ProcessoDetailOut)
async def get_processo(
	id: int,
	db: AsyncSession = Depends(get_db),
	current_user: dict = Depends(get_current_user),
):
	# Buscamos o processo com as etapas carregadas (Eager Loading)
	stmt = (
		select(Processo).where(Processo.id == id).options(selectinload(Processo.etapas))
	)
	result = await db.execute(stmt)
	db_obj = result.scalar_one_or_none()

	if not db_obj:
		raise HTTPException(status_code=404, detail="Processo não encontrado")
	return db_obj


@router.put("/processos/{id}", response_model=schemas.ProcessoOut)
async def update_processo(
	id: int,
	obj_in: schemas.ProcessoUpdate,
	db: AsyncSession = Depends(get_db),
	current_user: dict = Depends(get_current_user),
):
	db_obj = await crud_processo.get(db, id=id)
	if not db_obj:
		raise HTTPException(status_code=404, detail="Processo não encontrado")
	return await crud_processo.update(
		db, db_obj=db_obj, obj_in=obj_in.model_dump(exclude_unset=True)
	)


@router.delete("/processos/{id}", response_model=schemas.ProcessoOut)
async def delete_processo(
	id: int,
	db: AsyncSession = Depends(get_db),
	current_user: dict = Depends(get_current_user),
):
	db_obj = await crud_processo.get(db, id=id)
	if not db_obj:
		raise HTTPException(status_code=404, detail="Processo não encontrado")
	return await crud_processo.remove(db, id=id)


# =========================
# Etapa Endpoints
# =========================
@router.post("/etapas", response_model=schemas.EtapaOut)
async def create_etapa(obj_in: schemas.EtapaCreate, db: AsyncSession = Depends(get_db)):
	return await crud_etapa.create(db, obj_in=obj_in.model_dump())


@router.get("/etapas", response_model=list[schemas.EtapaOut])
async def list_etapas(
	skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)
):
	return await crud_etapa.get_multi(db, skip=skip, limit=limit)


@router.put("/etapas/{id}", response_model=schemas.EtapaOut)
async def update_etapa(
	id: int, obj_in: schemas.EtapaUpdate, db: AsyncSession = Depends(get_db)
):
	db_obj = await crud_etapa.get(db, id=id)
	if not db_obj:
		raise HTTPException(status_code=404, detail="Etapa não encontrada")
	return await crud_etapa.update(
		db, db_obj=db_obj, obj_in=obj_in.model_dump(exclude_unset=True)
	)


@router.delete("/etapas/{id}", response_model=schemas.EtapaOut)
async def delete_etapa(id: int, db: AsyncSession = Depends(get_db)):
	db_obj = await crud_etapa.get(db, id=id)
	if not db_obj:
		raise HTTPException(status_code=404, detail="Etapa não encontrada")
	return await crud_etapa.remove(db, id=id)
