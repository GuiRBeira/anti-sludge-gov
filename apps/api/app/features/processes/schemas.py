# app/features/processes/schemas.py
import uuid
from datetime import datetime, timedelta
from typing import Optional, List
from pydantic import BaseModel, ConfigDict, Field
from app.models.base_model import EsferaGovernoEnum, AbrangenciaEnum

# =========================
# Etapa
# =========================
class EtapaBase(BaseModel):
    processo_id: int
    categoria_id: int
    tipo_comportamento_id: int
    numero: Optional[str] = None
    comportamento: str
    e_obrigatorio: bool = False
    repeticoes: Optional[str] = None
    tempo_planejado: Optional[timedelta] = None
    tempo_padrao: Optional[timedelta] = None
    ordem: int
    duracao_media_observada: Optional[timedelta] = None

class EtapaCreate(EtapaBase):
    pass

class EtapaUpdate(EtapaBase):
    processo_id: Optional[int] = None
    categoria_id: Optional[int] = None
    tipo_comportamento_id: Optional[int] = None
    ordem: Optional[int] = None

class EtapaOut(EtapaBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# =========================
# Processo
# =========================
class ProcessoBase(BaseModel):
    nome: str
    descricao: Optional[str] = None
    objetivo: Optional[str] = None
    esfera_governo: Optional[EsferaGovernoEnum] = None
    abrangencia: Optional[AbrangenciaEnum] = None
    publico_alvo: Optional[str] = None
    usuarios_estimados_ano: Optional[int] = None
    perfil_foco_mapeamento: Optional[str] = None
    jornada_planejada_descricao: Optional[str] = None
    necessidade_usuario: Optional[str] = None
    tempo_medio_estimado: Optional[str] = None
    indicadores_desempenho: Optional[str] = None
    hipoteses_dificuldades: Optional[str] = None
    registros_reclamacao: Optional[str] = None
    registros_satisfacao: Optional[str] = None
    status: str = "Em Andamento"

class ProcessoCreate(ProcessoBase):
    pass

class ProcessoUpdate(ProcessoBase):
    nome: Optional[str] = None

class ProcessoOut(ProcessoBase):
    id: int
    uuid: uuid.UUID
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)

class ProcessoDetailOut(ProcessoOut):
    etapas: List[EtapaOut] = []
