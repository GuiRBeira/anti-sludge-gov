# app/features/catalog/router.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.database import get_db
from app.core.crud import CRUDBase
from app.features.catalog.models import Categoria, TipoComportamento, Glossario
from app.features.catalog import schemas

router = APIRouter()

# CRUD Managers
crud_categoria = CRUDBase(Categoria)
crud_tipo_comportamento = CRUDBase(TipoComportamento)
crud_glossario = CRUDBase(Glossario)

# =========================
# Categoria Endpoints
# =========================
@router.post("/categorias", response_model=schemas.CategoriaOut)
async def create_categoria(obj_in: schemas.CategoriaCreate, db: AsyncSession = Depends(get_db)):
    return await crud_categoria.create(db, obj_in=obj_in.model_dump())

@router.get("/categorias", response_model=List[schemas.CategoriaOut])
async def list_categorias(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    return await crud_categoria.get_multi(db, skip=skip, limit=limit)

@router.get("/categorias/{id}", response_model=schemas.CategoriaOut)
async def get_categoria(id: int, db: AsyncSession = Depends(get_db)):
    db_obj = await crud_categoria.get(db, id=id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")
    return db_obj

@router.put("/categorias/{id}", response_model=schemas.CategoriaOut)
async def update_categoria(id: int, obj_in: schemas.CategoriaUpdate, db: AsyncSession = Depends(get_db)):
    db_obj = await crud_categoria.get(db, id=id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")
    return await crud_categoria.update(db, db_obj=db_obj, obj_in=obj_in.model_dump(exclude_unset=True))

@router.delete("/categorias/{id}")
async def delete_categoria(id: int, db: AsyncSession = Depends(get_db)):
    db_obj = await crud_categoria.remove(db, id=id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")
    return {"message": "Categoria deletada"}

# =========================
# TipoComportamento Endpoints
# =========================
@router.post("/tipos-comportamento", response_model=schemas.TipoComportamentoOut)
async def create_tipo_comportamento(obj_in: schemas.TipoComportamentoCreate, db: AsyncSession = Depends(get_db)):
    return await crud_tipo_comportamento.create(db, obj_in=obj_in.model_dump())

@router.get("/tipos-comportamento", response_model=List[schemas.TipoComportamentoOut])
async def list_tipos_comportamento(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    return await crud_tipo_comportamento.get_multi(db, skip=skip, limit=limit)

# =========================
# Glossario Endpoints
# =========================
@router.post("/glossario", response_model=schemas.GlossarioOut)
async def create_glossario(obj_in: schemas.GlossarioCreate, db: AsyncSession = Depends(get_db)):
    return await crud_glossario.create(db, obj_in=obj_in.model_dump())

@router.get("/glossario", response_model=List[schemas.GlossarioOut])
async def list_glossario(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    return await crud_glossario.get_multi(db, skip=skip, limit=limit)
