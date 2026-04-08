# app/features/observations/schemas.py
from datetime import datetime, timedelta
from typing import Optional, List
from pydantic import BaseModel, ConfigDict

# =========================
# JornadaObservada
# =========================
class JornadaObservadaBase(BaseModel):
    processo_id: int
    perfil_usuario: Optional[str] = None
    data_observacao: datetime = datetime.now()
    duracao_total: Optional[timedelta] = None
    observacoes_gerais: Optional[str] = None

class JornadaObservadaCreate(JornadaObservadaBase):
    pass

class JornadaObservadaUpdate(JornadaObservadaBase):
    processo_id: Optional[int] = None

class JornadaObservadaOut(JornadaObservadaBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# =========================
# TempoEtapa
# =========================
class TempoEtapaBase(BaseModel):
    jornada_observada_id: int
    etapa_id: int
    duracao: timedelta
    e_sucesso: bool = True
    observacoes: Optional[str] = None

class TempoEtapaCreate(TempoEtapaBase):
    pass

class TempoEtapaUpdate(TempoEtapaBase):
    duracao: Optional[timedelta] = None

class TempoEtapaOut(TempoEtapaBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
