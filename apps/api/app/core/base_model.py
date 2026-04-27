# app/models/base.py
from __future__ import annotations

from datetime import datetime
from enum import Enum

from sqlalchemy import DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


# =========================
# SQLAlchemy Declarative Base
# =========================
class Base(DeclarativeBase):
	"""Base declarativa para todos os models SQLAlchemy."""

	pass


# =========================
# Mixins (opcional)
# =========================
class TimestampMixin:
	"""
	Mixin opcional para tabelas que possuem created_at / updated_at.
	Use somente nas tabelas que realmente possuem essas colunas no banco.
	Ex:
		class Processo(TimestampMixin, Base): ...
	"""

	created_at: Mapped[datetime] = mapped_column(
		DateTime(timezone=False),
		server_default=func.current_timestamp(),
		nullable=False,
	)

	# Atenção: no seu SQL, apenas `processo` tem updated_at com trigger.
	# Então só use updated_at nas tabelas que realmente tenham essa coluna.
	updated_at: Mapped[datetime] = mapped_column(
		DateTime(timezone=False),
		server_default=func.current_timestamp(),
		onupdate=func.current_timestamp(),
		nullable=False,
	)


# =========================
# Enums (espelhando o SQL)
# =========================
class EsferaGovernoEnum(str, Enum):
	FEDERAL = "Federal"
	ESTADUAL = "Estadual"
	MUNICIPAL = "Municipal"


class AbrangenciaEnum(str, Enum):
	PUBLICO_GERAL = "Público Geral"
	PUBLICO_ESPECIFICO = "Público Específico"


class CriterioImpactoEnum(str, Enum):
	CARGA_COGNITIVA = "Carga Cognitiva"
	EMOCAO = "Emoção"
	CONSEQUENCIA = "Consequência"


class TipoEvidenciaEnum(str, Enum):
	FALA = "Fala"
	COMPORTAMENTO_NO_SISTEMA = "Comportamento no sistema"
	FALA_E_COMPORTAMENTO_NO_SISTEMA = "Fala e Comportamento no sistema"
