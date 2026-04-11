from fastapi import APIRouter
from app.core.config import settings

router = APIRouter()

@router.get("/version")
async def version_check():
    """Verifica a versão da API."""
    return {
        "version": settings.VERSION
    }
