# app/use_cases/catalog_use_cases.py
from app.repositories.catalog_repository import CatalogRepository


class CatalogUseCases:
    def __init__(self, repository: CatalogRepository):
        self.repository = repository

    async def get_category(self, id: int):
        return await self.repository.get_by_id(id)

    async def list_categories(self, skip: int = 0, limit: int = 100):
        return await self.repository.get_all(skip=skip, limit=limit)

    async def create_category(self, data: dict):
        return await self.repository.create(data)

    async def update_category(self, id: int, data: dict):
        return await self.repository.update(id, data)

    async def delete_category(self, id: int):
        return await self.repository.delete(id)
