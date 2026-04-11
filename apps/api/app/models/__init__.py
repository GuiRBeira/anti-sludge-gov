# app/models/__init__.py
from app.models.analysis_model import (
    AvaliacaoBarreira,
    AvaliacaoImpacto,
    CriterioBarreira,
    CriterioImpacto,
    ResultadoAnalise,
)
from app.models.base_model import Base

# Importa modules para registrar os models no metadata
from app.models.catalog_model import (
    Categoria,
    CriterioTemplate,
    EscalaAvaliacao,
    Glossario,
    GrupoAnalise,
    TipoComportamento,
    TipoCriterio,
)
from app.models.observation_model import JornadaObservada, Observador, TempoEtapa
from app.models.process_model import Etapa, Processo
