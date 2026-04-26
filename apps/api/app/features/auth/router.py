# app/api/v1/endpoints/auth.py
from fastapi import APIRouter, Response, Request, Depends
from pydantic import BaseModel

from app.core.auth import (
	verify_google_token,
	create_access_token,
	get_current_user,
	get_user_role,
)
from app.core.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import settings
from app.core.limiter import limiter

router = APIRouter()


class TokenRequest(BaseModel):
	token: str


class TokenResponse(BaseModel):
	access_token: str
	token_type: str = "bearer"
	user: dict


@router.post("/google", response_model=TokenResponse)
@limiter.limit("5/minute")
async def google_auth(
	request: Request,
	payload: TokenRequest,
	response: Response,
	db: AsyncSession = Depends(get_db),
):
	"""
	Recebe o ID Token do Google, valida e emite um JWT próprio via Cookie e Body.
	"""
	user_info = verify_google_token(payload.token)

	# Aqui poderíamos buscar o usuário no banco de dados
	# Por enquanto, apenas emitimos o token baseado no email

	access_token = create_access_token(
		data={"sub": user_info["email"], "name": user_info.get("name")}
	)

	role = await get_user_role(user_info["email"], db)

	# Configurar Cookie HttpOnly
	response.set_cookie(
		key="access_token",
		value=access_token,
		httponly=True,
		max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
		expires=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
		samesite=settings.AUTH_COOKIE_SAMESITE,
		secure=settings.AUTH_COOKIE_SECURE,
	)

	return {
		"access_token": access_token,
		"token_type": "bearer",
		"user": {
			"email": user_info["email"],
			"name": user_info.get("name"),
			"picture": user_info.get("picture"),
			"role": role,
		},
	}


@router.post("/logout")
async def logout(response: Response):
	"""
	Remove o cookie de autenticação.
	"""
	response.delete_cookie(key="access_token")
	return {"message": "Logout realizado com sucesso"}


@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
	"""
	Retorna as informações do usuário logado.
	"""
	return current_user
