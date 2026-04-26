# app/features/rbac/router.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.auth import check_admin
from app.features.rbac.models import RBACEmail
from app.features.rbac.schemas import RBACEmailCreate, RBACEmailRead, RBACEmailUpdate

router = APIRouter()


@router.get(
	"/", response_model=list[RBACEmailRead], dependencies=[Depends(check_admin)]
)
async def list_rbac_emails(db: AsyncSession = Depends(get_db)):
	"""
	Lista todos os e-mails e papéis configurados no RBAC.
	Apenas administradores podem acessar.
	"""
	result = await db.execute(select(RBACEmail).order_by(RBACEmail.email))
	return result.scalars().all()


@router.post(
	"/",
	response_model=RBACEmailRead,
	status_code=status.HTTP_201_CREATED,
	dependencies=[Depends(check_admin)],
)
async def create_rbac_email(
	payload: RBACEmailCreate, db: AsyncSession = Depends(get_db)
):
	"""
	Adiciona um novo e-mail ao controle de acesso.
	"""
	# Verificar se já existe
	result = await db.execute(select(RBACEmail).where(RBACEmail.email == payload.email))
	if result.scalar_one_or_none():
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="Este e-mail já está cadastrado no controle de acesso.",
		)

	new_entry = RBACEmail(**payload.model_dump())
	db.add(new_entry)
	await db.commit()
	await db.refresh(new_entry)
	return new_entry


@router.patch(
	"/{email}", response_model=RBACEmailRead, dependencies=[Depends(check_admin)]
)
async def update_rbac_email(
	email: str, payload: RBACEmailUpdate, db: AsyncSession = Depends(get_db)
):
	"""
	Atualiza o papel (role) de um e-mail existente.
	"""
	result = await db.execute(select(RBACEmail).where(RBACEmail.email == email))
	entry = result.scalar_one_or_none()

	if not entry:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND, detail="E-mail não encontrado."
		)

	entry.role = payload.role
	await db.commit()
	await db.refresh(entry)
	return entry


@router.delete(
	"/{email}",
	status_code=status.HTTP_204_NO_CONTENT,
	dependencies=[Depends(check_admin)],
)
async def delete_rbac_email(email: str, db: AsyncSession = Depends(get_db)):
	"""
	Remove um e-mail do controle de acesso.
	"""
	result = await db.execute(select(RBACEmail).where(RBACEmail.email == email))
	entry = result.scalar_one_or_none()

	if not entry:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND, detail="E-mail não encontrado."
		)

	await db.delete(entry)
	await db.commit()
	return None
