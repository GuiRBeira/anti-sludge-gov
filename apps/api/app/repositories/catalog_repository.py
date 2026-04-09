# app/repositories/catalog_repository.py
from typing import List, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.base_repository import BaseRepository
from app.models.catalog_model import Categoria, TipoComportamento

class CatalogRepository(BaseRepository[Categoria]):
    def __init__(self, session: AsyncSession):
        super().__init__(Categoria, session)

    async def get_with_tipos(self, categoria_id: int) -> Optional[Categoria]:
        query = select(Categoria).filter(Categoria.id == categoria_id)
        result = await self.session.execute(query)
        return result.scalars().first()

    async def get_all_categories(self) -> List[Categoria]:
        return await self.get_all()
