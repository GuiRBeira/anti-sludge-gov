# app/models/__init__.py
from app.models.base_model import Base

# Importa modules para registrar os models no metadata
from app.models.catalog_model import (
    Categoria,
    TipoComportamento,
    GrupoAnalise,
    CriterioTemplate,
    TipoCriterio,
    Glossario,
    EscalaAvaliacao,
)

from app.models.process_model import Processo, Etapa
from app.models.observation_model import Observador, JornadaObservada, TempoEtapa
from app.models.analysis_model import (
    CriterioBarreira,
    CriterioImpacto,
    AvaliacaoBarreira,
    AvaliacaoImpacto,
    ResultadoAnalise,
)
