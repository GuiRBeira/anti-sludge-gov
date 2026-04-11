# app/features/observations/schemas.py
from datetime import datetime, timedelta

from pydantic import BaseModel, ConfigDict


# =========================
# JornadaObservada
# =========================
class JornadaObservadaBase(BaseModel):
    processo_id: int
    perfil_usuario: str | None = None
    data_observacao: datetime = datetime.now()
    duracao_total: timedelta | None = None
    observacoes_gerais: str | None = None

class JornadaObservadaCreate(JornadaObservadaBase):
    pass

class JornadaObservadaUpdate(JornadaObservadaBase):
    processo_id: int | None = None

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
    observacoes: str | None = None

class TempoEtapaCreate(TempoEtapaBase):
    pass

class TempoEtapaUpdate(TempoEtapaBase):
    duracao: timedelta | None = None

class TempoEtapaOut(TempoEtapaBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
