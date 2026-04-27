from sqlalchemy import select
from app.features.processes.models import Processo
from app.domain.sludge_logic import SludgeCalculator
from app.features.analysis.repository import AnalysisRepository
from app.features.processes.repository import ProcessRepository


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
		Usa heurísticas se não houver avaliações manuais.
		"""
		# Carregar processo com etapas e tipos de comportamento
		query = select(Processo).where(Processo.id == processo_id)
		res = await self.process_repo.session.execute(query)
		processo = res.scalar_one_or_none()

		if not processo:
			return []

		etapas = await self.process_repo.get_etapas(processo_id)
		resultados = []

		for etapa in etapas:
			# 1. Tentar coletar notas manuais
			barrier_scores = await self.analysis_repo.get_barrier_scores_by_step(
				etapa.id
			)
			impact_scores = await self.analysis_repo.get_impact_scores_by_step(etapa.id)

			# 2. Se não houver notas, aplicar HEURÍSTICA
			if not barrier_scores:
				# Heurística de Barreira baseada no nome/tipo (simplificada para o demo)
				base_barrier = 2.0
				nome_lower = etapa.comportamento.lower()
				if "anexar" in nome_lower or "organizar" in nome_lower:
					base_barrier = 4.5
				elif "espera" in nome_lower or "aguardar" in nome_lower:
					base_barrier = 5.0
				elif "preencher" in nome_lower:
					base_barrier = 3.5
				elif "login" in nome_lower:
					base_barrier = 3.0
				elif "acessar" in nome_lower:
					base_barrier = 1.5

				if etapa.e_obrigatorio:
					base_barrier += 0.5
				barrier_scores = [min(base_barrier, 5.0)]

			if not impact_scores:
				# Heurística de Impacto baseada no tempo observado (Extensão)
				if etapa.duracao_media_observada:
					# Converte timedelta para segundos
					obs_seconds = etapa.duracao_media_observada.total_seconds()
					real_impact = self.calculator.scale_time_to_score(obs_seconds)
					impact_scores = [real_impact]
				else:
					# Fallback para heurística teórica
					base_impact = 2.5
					if etapa.e_obrigatorio:
						base_impact += 1.0

					# Se tivermos tempo planejado (mock de impacto por tempo)
					if etapa.tempo_planejado:
						base_impact += 0.5

					impact_scores = [min(base_impact, 5.0)]

			# 3. Calcular médias
			avg_barrier = self.calculator.calculate_average(barrier_scores)
			avg_impact = self.calculator.calculate_average(impact_scores)

			# 4. Calcular Índice de Sludge (Barreira x Impacto)
			sludge_index = self.calculator.calculate_sludge_index(
				avg_barrier, avg_impact
			)

			# 5. Determinar metadados
			priority = self.calculator.determine_priority(sludge_index)
			is_sludge = self.calculator.is_sludge(sludge_index)

			# 6. Persistir
			result_data = {
				"processo_id": processo_id,
				"etapa_id": etapa.id,
				"media_barreiras": avg_barrier,
				"media_impactos": avg_impact,
				"indice_sludge": sludge_index,
				"prioridade": priority,
				"e_sludge": is_sludge,
				"recomendacoes": self._generate_recommendation(etapa, sludge_index),
			}

			res_obj = await self.analysis_repo.upsert_result(result_data)
			resultados.append(res_obj)

		await self.analysis_repo.session.commit()
		return resultados

	def _generate_recommendation(self, etapa, index):
		if index > 18:
			return (
				"Redesenho crítico necessário: eliminar etapa ou automatizar via API."
			)
		if index > 12:
			return "Simplificar interface."
		if index > 6:
			return "Otimizar tempo de resposta e melhorar orientações ao usuário."
		return "Etapa saudável, manter monitoramento contínuo."
