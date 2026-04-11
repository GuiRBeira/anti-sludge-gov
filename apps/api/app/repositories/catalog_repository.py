# app/repositories/catalog_repository.py

from app.models.catalog_model import Categoria
from app.repositories.base_repository import BaseRepository
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


class CatalogRepository(BaseRepository[Categoria]):
    def __init__(self, session: AsyncSession):
        super().__init__(Categoria, session)

    async def get_with_tipos(self, categoria_id: int) -> Categoria | None:
        query = select(Categoria).filter(Categoria.id == categoria_id)
        result = await self.session.execute(query)
        return result.scalars().first()

    async def get_all_categories(self) -> list[Categoria]:
        return await self.get_all()
