# app/repositories/analysis_repository.py
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from app.features.analysis.models import (
	AvaliacaoBarreira,
	AvaliacaoImpacto,
	ResultadoAnalise,
	CriterioBarreira,
	CriterioImpacto,
)
from app.core.base_repository import BaseRepository


class AnalysisRepository(BaseRepository[ResultadoAnalise]):
	def __init__(self, session: AsyncSession):
		super().__init__(ResultadoAnalise, session)

	async def get_barrier_scores_by_step(self, etapa_id: int) -> list[int]:
		"""Busca todas as notas de barreira para uma etapa específica."""
		query = (
			select(AvaliacaoBarreira.nota)
			.join(CriterioBarreira)
			.where(CriterioBarreira.etapa_id == etapa_id)
			.where(AvaliacaoBarreira.nota.is_not(None))
		)
		result = await self.session.execute(query)
		return [row[0] for row in result.all()]

	async def get_impact_scores_by_step(self, etapa_id: int) -> list[int]:
		"""Busca todas as notas de impacto para uma etapa específica."""
		query = (
			select(AvaliacaoImpacto.nota)
			.join(CriterioImpacto)
			.where(CriterioImpacto.etapa_id == etapa_id)
			.where(AvaliacaoImpacto.nota.is_not(None))
		)
		result = await self.session.execute(query)
		return [row[0] for row in result.all()]

	async def upsert_result(self, result_data: dict) -> ResultadoAnalise:
		"""Cria ou atualiza um resultado de análise para uma etapa."""
		processo_id = result_data["processo_id"]
		etapa_id = result_data.get("etapa_id")

		query = select(ResultadoAnalise).where(
			ResultadoAnalise.processo_id == processo_id,
			ResultadoAnalise.etapa_id == etapa_id,
		)
		existing = (await self.session.execute(query)).scalar_one_or_none()

		if existing:
			for key, value in result_data.items():
				setattr(existing, key, value)
			return existing
		else:
			new_result = ResultadoAnalise(**result_data)
			self.session.add(new_result)
			return new_result

	async def delete_by_process(self, processo_id: int):
		"""Remove todos os resultados de um processo."""
		query = delete(ResultadoAnalise).where(
			ResultadoAnalise.processo_id == processo_id
		)
		await self.session.execute(query)
