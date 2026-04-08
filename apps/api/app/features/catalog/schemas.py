# app/features/catalog/schemas.py
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict

# =========================
# Categoria
# =========================
class CategoriaBase(BaseModel):
    nome: str
    conceito: Optional[str] = None
    exemplos: Optional[str] = None
    descricao: Optional[str] = None
    quantidade_tipos: int = 0

class CategoriaCreate(CategoriaBase):
    pass

class CategoriaUpdate(CategoriaBase):
    nome: Optional[str] = None

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
    conceito: Optional[str] = None
    exemplos: Optional[str] = None
    descricao: Optional[str] = None
    num_criterios: int = 0
    ordem_na_categoria: int = 1

class TipoComportamentoCreate(TipoComportamentoBase):
    pass

class TipoComportamentoUpdate(TipoComportamentoBase):
    categoria_id: Optional[int] = None
    nome: Optional[str] = None
    codigo_referencia: Optional[str] = None

class TipoComportamentoOut(TipoComportamentoBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# =========================
# Glossario
# =========================
class GlossarioBase(BaseModel):
    termo: str
    grupo: Optional[str] = None
    definicao: str

class GlossarioCreate(GlossarioBase):
    pass

class GlossarioUpdate(GlossarioBase):
    termo: Optional[str] = None
    definicao: Optional[str] = None

class GlossarioOut(GlossarioBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
