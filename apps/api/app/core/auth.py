# app/core/auth.py
from datetime import datetime, timedelta, UTC

from google.oauth2 import id_token
from google.auth.transport import requests
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.core.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/google")


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
		)


def get_current_user(token: str = Depends(oauth2_scheme)):
	credentials_exception = HTTPException(
		status_code=status.HTTP_401_UNAUTHORIZED,
		detail="Não foi possível validar as credenciais",
		headers={"WWW-Authenticate": "Bearer"},
	)
	try:
		payload = jwt.decode(
			token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
		)
		email: str = payload.get("sub")
		if email is None:
			raise credentials_exception

		# Validação de lista de emails e atribuição de ROLES
		admins = [e.strip() for e in settings.ADMIN_EMAILS.split(",") if e.strip()]
		analysts = [e.strip() for e in settings.ANALYST_EMAILS.split(",") if e.strip()]

		role = "visitor"
		if email in admins:
			role = "admin"
		elif email in analysts:
			role = "analyst"

		return {"email": email, "role": role}
	except JWTError:
		raise credentials_exception


def check_extension_key(api_key: str):
	if api_key != settings.EXTENSION_API_KEY:
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="Chave da extensão inválida",
		)
	return True
