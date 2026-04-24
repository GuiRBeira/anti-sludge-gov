# app/features/processes/schemas.py
import uuid
from datetime import datetime, timedelta

from app.models.base_model import AbrangenciaEnum, EsferaGovernoEnum
from pydantic import BaseModel, ConfigDict


# =========================
# Etapa
# =========================
class EtapaBase(BaseModel):
	processo_id: int
	categoria_id: int
	tipo_comportamento_id: int
	numero: str | None = None
	comportamento: str
	e_obrigatorio: bool = False
	repeticoes: str | None = None
	tempo_planejado: timedelta | None = None
	tempo_padrao: timedelta | None = None
	ordem: int
	duracao_media_observada: timedelta | None = None


class EtapaCreate(EtapaBase):
	pass


class EtapaUpdate(BaseModel):
	processo_id: int | None = None
	categoria_id: int | None = None
	tipo_comportamento_id: int | None = None
	numero: str | None = None
	comportamento: str | None = None
	e_obrigatorio: bool | None = None
	repeticoes: str | None = None
	tempo_planejado: timedelta | None = None
	tempo_padrao: timedelta | None = None
	ordem: int | None = None
	duracao_media_observada: timedelta | None = None


class EtapaOut(EtapaBase):
	id: int
	created_at: datetime
	model_config = ConfigDict(from_attributes=True)


# =========================
# Processo
# =========================
class ProcessoBase(BaseModel):
	nome: str
	descricao: str | None = None
	objetivo: str | None = None
	esfera_governo: EsferaGovernoEnum | None = None
	abrangencia: AbrangenciaEnum | None = None
	publico_alvo: str | None = None
	usuarios_estimados_ano: int | None = None
	perfil_foco_mapeamento: str | None = None
	jornada_planejada_descricao: str | None = None
	necessidade_usuario: str | None = None
	tempo_medio_estimado: str | None = None
	indicadores_desempenho: str | None = None
	hipoteses_dificuldades: str | None = None
	registros_reclamacao: str | None = None
	registros_satisfacao: str | None = None
	status: str = "Em Andamento"


class ProcessoCreate(ProcessoBase):
	pass


class ProcessoUpdate(ProcessoBase):
	nome: str | None = None


class ProcessoOut(ProcessoBase):
	id: int
	uuid: uuid.UUID
	created_at: datetime
	updated_at: datetime
	model_config = ConfigDict(from_attributes=True)


class ProcessoDetailOut(ProcessoOut):
	etapas: list[EtapaOut] = []
