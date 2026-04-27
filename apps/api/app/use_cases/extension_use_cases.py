# app/use_cases/extension_use_cases.py
from typing import Any
from app.features.extension_sessions.repository import ExtensionRepository
from app.features.observations.repository import ObservationRepository


class LinkExtensionToStepUseCase:
	def __init__(
		self,
		extension_repo: ExtensionRepository,
		observation_repo: ObservationRepository,
	):
		self.extension_repo = extension_repo
		self.observation_repo = observation_repo

	async def execute(
		self, jornada_id: int, etapa_id: int, start_ts: int, end_ts: int
	) -> dict[str, Any]:
		"""
		Vincula um intervalo de interações da extensão a uma etapa da jornada.
		Calcula automaticamente a duração e persiste no banco.
		"""
		# 1. Buscar sessão vinculada à jornada
		sessao = await self.extension_repo.get_session_by_jornada(jornada_id)
		if not sessao:
			return {"error": "Nenhuma sessão da extensão encontrada para esta jornada."}

		# 2. Buscar interações no intervalo
		interacoes = await self.extension_repo.get_interactions_by_range(
			sessao.id, start_ts, end_ts
		)
		if not interacoes:
			return {"error": "Nenhuma interação encontrada no intervalo especificado."}

		# 3. Calcular métricas
		# Assumindo que start_ts e end_ts são Unix timestamps em ms
		duration_ms = end_ts - start_ts
		duration_seconds = duration_ms / 1000.0
		num_cliques = len([i for i in interacoes if i.tipo == "click"])

		# 4. Persistir resultado
		observacao = f"Calculado via Extensão ({num_cliques} cliques detectados)"
		result = await self.observation_repo.upsert_tempo(
			jornada_id=jornada_id,
			etapa_id=etapa_id,
			duration_seconds=duration_seconds,
			observacao=observacao,
		)

		await self.observation_repo.session.commit()

		return {
			"jornada_id": jornada_id,
			"etapa_id": etapa_id,
			"duracao_segundos": duration_seconds,
			"num_cliques": num_cliques,
			"vinculo_id": result.id,
		}
