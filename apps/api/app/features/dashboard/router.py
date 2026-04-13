# app/features/dashboard/router.py
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc
from app.core.database import get_db
from app.models.process_model import Processo
from app.models.observation_model import JornadaObservada
from app.models.analysis_model import ResultadoAnalise
from app.features.dashboard import schemas

router = APIRouter()


@router.get("/summary", response_model=schemas.DashboardSummary)
async def get_dashboard_summary(db: AsyncSession = Depends(get_db)):
	# 1. Total Processos
	total_processos = await db.scalar(select(func.count(Processo.id)))

	# 2. Total Jornadas
	total_jornadas = await db.scalar(select(func.count(JornadaObservada.id)))

	# 3. Médias Globais (Simulando a partir dos resultados)
	res_stats = await db.execute(
		select(
			func.avg(ResultadoAnalise.media_barreiras).label("avg_b"),
			func.avg(ResultadoAnalise.media_impactos).label("avg_i"),
			func.count(ResultadoAnalise.id)
			.filter(ResultadoAnalise.e_sludge)
			.label("criticos"),
		)
	)
	stats = res_stats.first()

	# 4. Status Breakdown
	res_status = await db.execute(
		select(Processo.status, func.count(Processo.id)).group_by(Processo.status)
	)
	status_counts = [
		schemas.StatusCount(status=row[0], count=row[1]) for row in res_status.all()
	]

	# 5. Recent Activity (Últimas jornadas)
	res_recent = await db.execute(
		select(JornadaObservada, Processo.nome)
		.join(Processo, Processo.id == JornadaObservada.processo_id)
		.order_by(desc(JornadaObservada.created_at))
		.limit(5)
	)
	recent_activity = [
		{
			"id": row[0].id,
			"protocolo": row[0].protocolo,
			"processo": row[1],
			"data": row[0].created_at.isoformat(),
		}
		for row in res_recent.all()
	]

	return schemas.DashboardSummary(
		total_processos=total_processos or 0,
		total_jornadas=total_jornadas or 0,
		media_barreiras=round(float(stats.avg_b or 0), 2),
		media_impactos=round(float(stats.avg_i or 0), 2),
		processos_criticos=stats.criticos or 0,
		processos_por_status=status_counts,
		recent_activity=recent_activity,
	)
