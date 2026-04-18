# app/repositories/observation_repository.py
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.observation_model import JornadaObservada, TempoEtapa
from app.repositories.base_repository import BaseRepository


class ObservationRepository(BaseRepository[JornadaObservada]):
	def __init__(self, session: AsyncSession):
		super().__init__(JornadaObservada, session)

	async def get_with_details(self, jornada_id: int) -> JornadaObservada | None:
		"""Busca uma jornada com todos os seus tempos de etapa carregados."""
		query = (
			select(JornadaObservada)
			.options(
				selectinload(JornadaObservada.tempos_etapas).selectinload(
					TempoEtapa.etapa
				)
			)
			.where(JornadaObservada.id == jornada_id)
		)
		result = await self.session.execute(query)
		return result.scalar_one_or_none()

	async def get_by_process(self, processo_id: int) -> list[JornadaObservada]:
		"""Busca todas as jornadas de um processo."""
		query = select(JornadaObservada).where(
			JornadaObservada.processo_id == processo_id
		)
		result = await self.session.execute(query)
		return list(result.scalars().all())

	async def upsert_tempo(
		self,
		jornada_id: int,
		etapa_id: int,
		duration_seconds: float,
		observacao: str = None,
	) -> TempoEtapa:
		"""Cria ou atualiza o tempo realizado de uma etapa em uma jornada."""
		from datetime import timedelta

		query = select(TempoEtapa).where(
			TempoEtapa.jornada_observada_id == jornada_id,
			TempoEtapa.etapa_id == etapa_id,
		)
		existing = (await self.session.execute(query)).scalar_one_or_none()

		duration = timedelta(seconds=duration_seconds)

		if existing:
			existing.tempo_realizado = duration
			if observacao:
				existing.observacao = (existing.observacao or "") + f" | {observacao}"
			return existing
		else:
			new_tempo = TempoEtapa(
				jornada_observada_id=jornada_id,
				etapa_id=etapa_id,
				tempo_realizado=duration,
				observacao=observacao,
			)
			self.session.add(new_tempo)
			return new_tempo
