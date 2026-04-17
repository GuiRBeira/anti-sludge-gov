# app/use_cases/catalog_use_cases.py
from app.repositories.catalog_repository import CatalogRepository
from app.repositories.process_repository import ProcessRepository
from fastapi import HTTPException


class CatalogUseCases:
	def __init__(
		self, repository: CatalogRepository, process_repo: ProcessRepository = None
	):
		self.repository = repository
		self.process_repo = process_repo

	async def get_category(self, id: int):
		return await self.repository.get_by_id(id)

	async def list_categories(self, skip: int = 0, limit: int = 100):
		return await self.repository.get_all(skip=skip, limit=limit)

	async def create_category(self, data: dict):
		return await self.repository.create(data)

	async def get_allowed_criteria_for_step(self, etapa_id: int):
		"""
		Retorna a lista de critérios metodológicos (templates) permitidos para uma etapa,
		baseado no tipo de comportamento associado a ela.
		"""
		if not self.process_repo:
			raise ValueError("ProcessRepository não fornecido")

		etapa = await self.process_repo.get_by_id(etapa_id)
		if not etapa:
			raise HTTPException(status_code=404, detail="Etapa não encontrada")

		if not etapa.tipo_comportamento_id:
			# Se a etapa não tem tipo definido, retorna lista vazia ou erro?
			# Pela metodologia, toda etapa deve ter um tipo para ser avaliada.
			return []

		return await self.repository.get_allowed_criteria(etapa.tipo_comportamento_id)
