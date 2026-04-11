# app/features/catalog/schemas.py
from datetime import datetime

from pydantic import BaseModel, ConfigDict


# =========================
# Categoria
# =========================
class CategoriaBase(BaseModel):
    nome: str
    conceito: str | None = None
    exemplos: str | None = None
    descricao: str | None = None
    quantidade_tipos: int = 0

class CategoriaCreate(CategoriaBase):
    pass

class CategoriaUpdate(CategoriaBase):
    nome: str | None = None

class CategoriaOut(CategoriaBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# =========================
# TipoComportamento
# =========================
class TipoComportamentoBase(BaseModel):
    categoria_id: int
    nome: str
    codigo_referencia: str
    conceito: str | None = None
    exemplos: str | None = None
    descricao: str | None = None
    num_criterios: int = 0
    ordem_na_categoria: int = 1

class TipoComportamentoCreate(TipoComportamentoBase):
    pass

class TipoComportamentoUpdate(TipoComportamentoBase):
    categoria_id: int | None = None
    nome: str | None = None
    codigo_referencia: str | None = None

class TipoComportamentoOut(TipoComportamentoBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# =========================
# Glossario
# =========================
class GlossarioBase(BaseModel):
    termo: str
    grupo: str | None = None
    definicao: str

class GlossarioCreate(GlossarioBase):
    pass

class GlossarioUpdate(GlossarioBase):
    termo: str | None = None
    definicao: str | None = None

class GlossarioOut(GlossarioBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
