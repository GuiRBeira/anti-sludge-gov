# app/repositories/catalog_repository.py
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.catalog_model import (
	Categoria,
	TipoComportamento,
	TipoCriterio,
	CriterioTemplate,
	EscalaAvaliacao,
)
from app.repositories.base_repository import BaseRepository


class CatalogRepository(BaseRepository[Categoria]):
	def __init__(self, session: AsyncSession):
		super().__init__(Categoria, session)

	async def get_with_tipos(self, categoria_id: int) -> Categoria | None:
		query = select(Categoria).filter(Categoria.id == categoria_id)
		result = await self.session.execute(query)
		return result.scalars().first()

	async def get_all_categories(self) -> list[Categoria]:
		return await self.get_all()

	async def get_tipos_by_categoria(
		self, categoria_id: int
	) -> list[TipoComportamento]:
		query = (
			select(TipoComportamento)
			.where(TipoComportamento.categoria_id == categoria_id)
			.order_by(TipoComportamento.ordem_na_categoria)
		)
		result = await self.session.execute(query)
		return list(result.scalars().all())

	async def validate_compatibility(self, tipo_id: int, criterio_id: int) -> bool:
		"""Verifica se um critério de barreira é permitido para um tipo de comportamento."""
		query = select(TipoCriterio).where(
			TipoCriterio.tipo_comportamento_id == tipo_id,
			TipoCriterio.criterio_template_id == criterio_id,
		)
		result = await self.session.execute(query)
		return result.scalar_one_or_none() is not None

	async def get_allowed_criteria(self, tipo_id: int) -> list[CriterioTemplate]:
		"""Busca todos os critérios permitidos para um tipo de comportamento."""
		query = (
			select(CriterioTemplate)
			.join(TipoCriterio)
			.where(TipoCriterio.tipo_comportamento_id == tipo_id)
			.order_by(TipoCriterio.ordem)
		)
		result = await self.session.execute(query)
		return list(result.scalars().all())

	async def get_escala(
		self, tipo_id: int, criterio_id: int
	) -> EscalaAvaliacao | None:
		"""Busca a escala específica para o par comportamento-critério."""
		query = select(EscalaAvaliacao).where(
			EscalaAvaliacao.tipo_comportamento_id == tipo_id,
			EscalaAvaliacao.criterio_template_id == criterio_id,
		)
		result = await self.session.execute(query)
		return result.scalar_one_or_none()
