# app/domain/sludge_logic.py


class SludgeCalculator:
	"""
	Motor de cálculo puro da Metodologia F5.
	Calcula índices e prioridades sem depender de frameworks externos.
	"""

	@staticmethod
	def calculate_sludge_index(barrier_score: float, impact_score: float) -> float:
		"""
		Calcula o Índice de Sludge bruto.
		Fórmula: Barreira x Impacto
		"""
		if barrier_score is None or impact_score is None:
			return 0.0
		return round(float(barrier_score * impact_score), 2)

	@staticmethod
	def calculate_average(scores: list[float]) -> float:
		"""Calcula a média simples de uma lista de notas."""
		valid_scores = [s for s in scores if s is not None]
		if not valid_scores:
			return 0.0
		return round(sum(valid_scores) / len(valid_scores), 2)

	@staticmethod
	def determine_priority(sludge_index: float) -> int:
		"""
		Determina o nível de prioridade (escala 1-4) baseado no índice.
		1: Baixa (Até 6)
		2: Média (6.1 a 12)
		3: Alta (12.1 a 18)
		4: Crítica (> 18)
		"""
		if sludge_index <= 6:
			return 1
		elif sludge_index <= 12:
			return 2
		elif sludge_index <= 18:
			return 3
		else:
			return 4

	@staticmethod
	def is_sludge(sludge_index: float) -> bool:
		"""Identifica se o índice é classificado tecnicamente como Sludge (> 9)"""
		return sludge_index > 9.0

	@staticmethod
	def calculate_efficiency_index(
		planned_seconds: float, realized_seconds: float
	) -> float:
		"""
		Calcula o Índice de Eficiência de Sludge.
		Fórmula: Tempo Realizado / Tempo Planejado.
		Valores > 1 indicam atraso (fricção).
		"""
		if not planned_seconds or planned_seconds == 0:
			return 1.0
		return round(realized_seconds / planned_seconds, 2)

	@staticmethod
	def get_time_deviation(planned_seconds: float, realized_seconds: float) -> float:
		"""Calcula o desvio absoluto em segundos."""
		return realized_seconds - (planned_seconds or 0)
