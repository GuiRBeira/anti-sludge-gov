# app/core/auth.py
from datetime import datetime, timedelta, UTC

from google.oauth2 import id_token
from google.auth.transport import requests
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer

from app.core.config import settings
from app.core.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.features.rbac.models import RBACEmail

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/google", auto_error=False)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
	to_encode = data.copy()
	if expires_delta:
		expire = datetime.now(UTC) + expires_delta
	else:
		expire = datetime.now(UTC) + timedelta(
			minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
		)

	to_encode.update({"exp": expire})
	encoded_jwt = jwt.encode(
		to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM
	)
	return encoded_jwt


def verify_google_token(token: str) -> dict:
	"""
	Valida o ID Token do Google.
	Retorna as informações do usuário se válido.
	"""
	try:
		# ID_TOKEN validation
		idinfo = id_token.verify_oauth2_token(
			token, requests.Request(), settings.GOOGLE_CLIENT_ID
		)

		# ID Token validation - audience
		if idinfo["iss"] not in ["accounts.google.com", "https://accounts.google.com"]:
			raise ValueError("Wrong issuer.")

		return idinfo
	except Exception as e:
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail=f"Token do Google inválido: {str(e)}",
		) from e


async def get_user_role(email: str, db: AsyncSession) -> str:
	"""
	Determina o papel (role) do usuário buscando na tabela rbac_emails
	e usando as variáveis de ambiente como fallback.
	"""
	# 1. Tenta buscar no Banco de Dados (Prioridade)
	result = await db.execute(select(RBACEmail).where(RBACEmail.email == email))
	rbac_entry = result.scalar_one_or_none()

	if rbac_entry:
		return rbac_entry.role

	# 2. Fallback para variáveis de ambiente (Bootstrapping / Legado)
	admins = [e.strip() for e in settings.ADMIN_EMAILS.split(",") if e.strip()]
	researchers = [
		e.strip() for e in settings.RESEARCHER_EMAILS.split(",") if e.strip()
	]
	supervisors = [
		e.strip() for e in settings.SUPERVISOR_EMAILS.split(",") if e.strip()
	]

	if email in admins:
		return "admin"
	if email in researchers:
		return "researcher"
	if email in supervisors:
		return "supervisor"

	return "visitor"


async def get_current_user(
	request: Request,
	token: str | None = Depends(oauth2_scheme),
	db: AsyncSession = Depends(get_db),
):
	credentials_exception = HTTPException(
		status_code=status.HTTP_401_UNAUTHORIZED,
		detail="Não foi possível validar as credenciais",
		headers={"WWW-Authenticate": "Bearer"},
	)

	# Se o token não veio no header, tenta buscar no cookie
	if not token:
		token = request.cookies.get("access_token")

	if not token:
		raise credentials_exception

	try:
		payload = jwt.decode(
			token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
		)
		email: str = payload.get("sub")
		if email is None:
			raise credentials_exception

		role = await get_user_role(email, db)

		return {"email": email, "name": payload.get("name"), "role": role}
	except JWTError:
		raise credentials_exception from None


async def get_current_user_optional(
	request: Request,
	db: AsyncSession = Depends(get_db),
	token: str | None = Depends(oauth2_scheme),
) -> dict | None:
	"""
	Versão opcional do get_current_user que retorna None em vez de disparar 401.
	"""
	# Tenta pegar do cookie se não veio no header
	if not token:
		token = request.cookies.get("access_token")

	if not token:
		return None

	try:
		payload = jwt.decode(
			token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
		)
		email: str = payload.get("sub")
		if email is None:
			return None

		role = await get_user_role(email, db)
		return {"email": email, "name": payload.get("name"), "role": role}
	except JWTError:
		return None


def check_admin(current_user: dict = Depends(get_current_user)):
	"""
	Dependência que verifica se o usuário logado tem papel de admin.
	"""
	if current_user.get("role") != "admin":
		raise HTTPException(
			status_code=status.HTTP_403_FORBIDDEN,
			detail="Acesso negado: Requer privilégios de administrador",
		)
	return current_user


def check_at_least_researcher(current_user: dict = Depends(get_current_user)):
	"""
	Dependência que verifica se o usuário logado é ao menos pesquisador ou admin.
	"""
	if current_user.get("role") not in ["admin", "researcher", "supervisor"]:
		raise HTTPException(
			status_code=status.HTTP_403_FORBIDDEN,
			detail="Acesso negado: Requer privilégios de pesquisador ou superior",
		)
	return current_user


def check_extension_key(api_key: str):
	if api_key != settings.EXTENSION_API_KEY:
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="Chave da extensão inválida",
		)
	return True
