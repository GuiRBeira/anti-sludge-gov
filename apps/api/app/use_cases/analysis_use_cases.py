# app/use_cases/analysis_use_cases.py
from app.domain.sludge_logic import SludgeCalculator
from app.repositories.analysis_repository import AnalysisRepository
from app.repositories.process_repository import ProcessRepository


class CalculateProcessSludgeUseCase:
	def __init__(
		self, analysis_repo: AnalysisRepository, process_repo: ProcessRepository
	):
		self.analysis_repo = analysis_repo
		self.process_repo = process_repo
		self.calculator = SludgeCalculator()

	async def execute(self, processo_id: int):
		"""
		Calcula e persiste o Índice de Sludge para todas as etapas de um processo.
		"""
		etapas = await self.process_repo.get_etapas(processo_id)
		resultados = []

		for etapa in etapas:
			# 1. Coletar notas
			barrier_scores = await self.analysis_repo.get_barrier_scores_by_step(
				etapa.id
			)
			impact_scores = await self.analysis_repo.get_impact_scores_by_step(etapa.id)

			# 2. Calcular médias
			avg_barrier = self.calculator.calculate_average(barrier_scores)
			avg_impact = self.calculator.calculate_average(impact_scores)

			# 3. Calcular Índice de Sludge
			sludge_index = self.calculator.calculate_sludge_index(
				avg_barrier, avg_impact
			)

			# 4. Determinar metadados
			priority = self.calculator.determine_priority(sludge_index)
			is_sludge = self.calculator.is_sludge(sludge_index)

			# 5. Persistir
			result_data = {
				"processo_id": processo_id,
				"etapa_id": etapa.id,
				"media_barreiras": avg_barrier,
				"media_impactos": avg_impact,
				"indice_sludge": sludge_index,
				"prioridade": priority,
				"e_sludge": is_sludge,
			}

			res = await self.analysis_repo.upsert_result(result_data)
			resultados.append(res)

		await self.analysis_repo.session.commit()
		return resultados
