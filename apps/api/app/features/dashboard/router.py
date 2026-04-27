# app/features/dashboard/router.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc
from app.core.database import get_db
from app.features.processes.models import Processo, Etapa
from app.features.observations.models import JornadaObservada
from app.features.analysis.models import ResultadoAnalise
from app.features.dashboard import schemas
from app.features.analysis.repository import AnalysisRepository
from app.features.processes.repository import ProcessRepository
from app.use_cases.analysis_use_cases import CalculateProcessSludgeUseCase


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

	# 6. Process Ranking (Média de Sludge por Processo)
	res_ranking = await db.execute(
		select(Processo.nome, func.avg(ResultadoAnalise.indice_sludge))
		.join(ResultadoAnalise, ResultadoAnalise.processo_id == Processo.id)
		.group_by(Processo.id, Processo.nome)
		.order_by(desc(func.avg(ResultadoAnalise.indice_sludge)))
		.limit(10)
	)
	ranking = [
		{"nome": row[0], "score": round(float(row[1] or 0), 2)}
		for row in res_ranking.all()
	]

	return schemas.DashboardSummary(
		total_processos=total_processos or 0,
		total_jornadas=total_jornadas or 0,
		media_barreiras=round(float(stats.avg_b or 0), 2),
		media_impactos=round(float(stats.avg_i or 0), 2),
		processos_criticos=stats.criticos or 0,
		processos_por_status=status_counts,
		recent_activity=recent_activity,
		processos_ranking=ranking,
	)


@router.get("/process/{processo_id}", response_model=schemas.ProcessChart)
async def get_process_chart(processo_id: int, db: AsyncSession = Depends(get_db)):
	"""
	Retorna a série temporal (por etapa) do índice de Sludge para um processo.
	Ideal para alimentar gráficos de linha/barra.
	Trigger automático de cálculo para garantir dados reais no demo.
	"""
	# Verificar se processo existe
	processo = await db.get(Processo, processo_id)
	if not processo:
		raise HTTPException(status_code=404, detail="Processo não encontrado")

	# TRIGGER DE CÁLCULO (Heurística + Notas)
	analysis_repo = AnalysisRepository(db)
	process_repo = ProcessRepository(db)
	use_case = CalculateProcessSludgeUseCase(analysis_repo, process_repo)
	await use_case.execute(processo_id)

	# Buscar etapas e seus respectivos resultados calculados
	query = (
		select(Etapa, ResultadoAnalise)
		.outerjoin(ResultadoAnalise, ResultadoAnalise.etapa_id == Etapa.id)
		.where(Etapa.processo_id == processo_id)
		.order_by(Etapa.ordem)
	)

	result = await db.execute(query)
	rows = result.all()

	steps = []
	for et, res in rows:
		steps.append(
			schemas.StepScore(
				etapa_id=et.id,
				nome=et.comportamento,
				ordem=et.ordem,
				indice_sludge=float(res.indice_sludge)
				if res and res.indice_sludge
				else None,
				prioridade=res.prioridade if res else None,
				recomendacao=res.recomendacoes if res else None,
			)
		)

	return schemas.ProcessChart(
		processo_id=processo.id, nome_processo=processo.nome, steps=steps
	)
