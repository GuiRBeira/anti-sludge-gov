# app/api/v1/endpoints/auth.py
from fastapi import APIRouter
from pydantic import BaseModel

from app.core.auth import verify_google_token, create_access_token

router = APIRouter()


class TokenRequest(BaseModel):
	token: str


class TokenResponse(BaseModel):
	access_token: str
	token_type: str = "bearer"
	user: dict


@router.post("/google", response_model=TokenResponse)
async def google_auth(payload: TokenRequest):
	"""
	Recebe o ID Token do Google, valida e emite um JWT próprio.
	"""
	user_info = verify_google_token(payload.token)

	# Aqui poderíamos buscar o usuário no banco de dados
	# Por enquanto, apenas emitimos o token baseado no email

	access_token = create_access_token(
		data={"sub": user_info["email"], "name": user_info.get("name")}
	)

	return {
		"access_token": access_token,
		"token_type": "bearer",
		"user": {
			"email": user_info["email"],
			"name": user_info.get("name"),
			"picture": user_info.get("picture"),
		},
	}
