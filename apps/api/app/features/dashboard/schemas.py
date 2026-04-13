# app/features/dashboard/schemas.py
from pydantic import BaseModel


class StatusCount(BaseModel):
	status: str
	count: int


class DashboardSummary(BaseModel):
	total_processos: int
	total_jornadas: int
	media_barreiras: float
	media_impactos: float
	processos_criticos: int
	processos_por_status: list[StatusCount]
	recent_activity: list[dict] = []
