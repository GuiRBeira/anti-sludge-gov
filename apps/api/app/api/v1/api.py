# app/api/v1/api.py
from fastapi import APIRouter
from app.features.processes.router import router as processes_router
from app.features.catalog.router import router as catalog_router
from app.features.analysis_templates.router import router as analysis_templates_router
from app.features.observations.router import router as observations_router
from app.features.analysis_results.router import router as analysis_results_router

router = APIRouter()

router.include_router(processes_router, tags=["Processes"])
router.include_router(catalog_router, tags=["Catalog"])
router.include_router(analysis_templates_router, tags=["Analysis Templates"])
router.include_router(observations_router, tags=["Observations"])
router.include_router(analysis_results_router, tags=["Analysis Results"])