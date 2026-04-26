# app/repositories/extension_repository.py
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.features.extension_sessions.models import (
	SessaoExtensao,
	InteracaoExtensao,
	PaginaExtensao,
)
from app.core.base_repository import BaseRepository


class ExtensionRepository(BaseRepository[SessaoExtensao]):
	def __init__(self, session: AsyncSession):
		super().__init__(SessaoExtensao, session)

	async def get_interactions_by_range(
		self, sessao_id: int, start_ts: int, end_ts: int
	) -> list[InteracaoExtensao]:
		"""Busca todas as interações de uma sessão em um intervalo de tempo."""
		query = (
			select(InteracaoExtensao)
			.join(PaginaExtensao)
			.where(PaginaExtensao.sessao_extensao_id == sessao_id)
			.where(InteracaoExtensao.timestamp_evento >= start_ts)
			.where(InteracaoExtensao.timestamp_evento <= end_ts)
			.order_by(InteracaoExtensao.timestamp_evento)
		)
		result = await self.session.execute(query)
		return list(result.scalars().all())

	async def get_session_by_jornada(self, jornada_id: int) -> SessaoExtensao | None:
		"""Busca a sessão da extensão vinculada a uma jornada observada."""
		query = select(SessaoExtensao).where(
			SessaoExtensao.jornada_observada_id == jornada_id
		)
		result = await self.session.execute(query)
		return result.scalar_one_or_none()
