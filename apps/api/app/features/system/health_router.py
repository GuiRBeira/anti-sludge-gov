# app/api/v1/endpoints/health.py
from app.core.database import get_db
from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()


@router.get("/health")
async def health_check(db: AsyncSession = Depends(get_db)):
	"""
	Verifica o status da API e a conectividade com o Banco de Dados.
	"""
	try:
		# Tenta uma consulta simples no banco
		await db.execute(text("SELECT 1"))
		db_status = "online"
	except Exception as e:
		db_status = f"offline (erro: {str(e)})"

	return {"status": "online", "database": db_status, "version": "0.1.0"}
