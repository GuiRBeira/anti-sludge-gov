# app/use_cases/observation_use_cases.py
from typing import Any
from app.domain.sludge_logic import SludgeCalculator
from app.repositories.observation_repository import ObservationRepository
from app.repositories.process_repository import ProcessRepository


class CalculateJourneyDifferentialUseCase:
	def __init__(
		self, observation_repo: ObservationRepository, process_repo: ProcessRepository
	):
		self.observation_repo = observation_repo
		self.process_repo = process_repo
		self.calculator = SludgeCalculator()

	async def execute(self, jornada_id: int) -> dict[str, Any]:
		"""
		Calcula o diferencial entre a jornada planejada e a jornada realizada.
		Retorna estatísticas de eficiência e desvios por etapa.
		"""
		jornada = await self.observation_repo.get_with_details(jornada_id)
		if not jornada:
			return {"error": "Jornada não encontrada"}

		etapas_planejadas = await self.process_repo.get_etapas(jornada.processo_id)
		tempos_reais = {te.etapa_id: te for te in jornada.tempos_etapas}

		diff_results = []
		total_planejado = 0.0
		total_real = 0.0

		for et in etapas_planejadas:
			tempo_p = et.tempo_planejado.total_seconds() if et.tempo_planejado else 0.0
			total_planejado += tempo_p

			te_real = tempos_reais.get(et.id)
			if te_real:
				tempo_r = te_real.tempo_realizado.total_seconds()
				total_real += tempo_r

				efficiency = self.calculator.calculate_efficiency_index(
					tempo_p, tempo_r
				)
				deviation = self.calculator.get_time_deviation(tempo_p, tempo_r)

				diff_results.append(
					{
						"etapa_id": et.id,
						"etapa_nome": et.comportamento,
						"ordem": et.ordem,
						"status": "Realizada",
						"tempo_planejado": tempo_p,
						"tempo_real": tempo_r,
						"desvio_segundos": deviation,
						"indice_eficiencia": efficiency,
						"e_obrigatorio": et.e_obrigatorio,
					}
				)
			else:
				diff_results.append(
					{
						"etapa_id": et.id,
						"etapa_nome": et.comportamento,
						"ordem": et.ordem,
						"status": "Omitida" if et.e_obrigatorio else "Não Realizada",
						"tempo_planejado": tempo_p,
						"tempo_real": 0.0,
						"desvio_segundos": -tempo_p,
						"indice_eficiencia": 0.0,
						"e_obrigatorio": et.e_obrigatorio,
					}
				)

		# Adicionar etapas extras (que não estavam no planejamento original, se houver)
		# Notar: No modelo atual, tempo_etapa sempre referencia uma etapa_id existente.
		# Se permitirmos etapas ad-hoc no futuro, aqui trataríamos o "Sludge por excesso".

		global_efficiency = self.calculator.calculate_efficiency_index(
			total_planejado, total_real
		)

		return {
			"jornada_id": jornada_id,
			"protocolo": jornada.protocolo,
			"total_planejado_segundos": total_planejado,
			"total_real_segundos": total_real,
			"indice_eficiencia_global": global_efficiency,
			"detalhe_etapas": diff_results,
		}
