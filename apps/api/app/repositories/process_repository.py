# app/repositories/process_repository.py
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.process_model import Processo, Etapa
from app.repositories.base_repository import BaseRepository


class ProcessRepository(BaseRepository[Processo]):
	def __init__(self, session: AsyncSession):
		super().__init__(Processo, session)

	async def get_etapas(self, processo_id: int) -> list[Etapa]:
		"""Busca todas as etapas de um processo."""
		query = (
			select(Etapa).where(Etapa.processo_id == processo_id).order_by(Etapa.ordem)
		)
		result = await self.session.execute(query)
		return list(result.scalars().all())
