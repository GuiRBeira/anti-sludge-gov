# app/api/v1/api.py
from fastapi import APIRouter

from app.features.system.health_router import router as health_router
from app.features.system.version_router import router as version_router
from app.features.analysis.results_router import router as analysis_results_router
from app.features.analysis.templates_router import router as analysis_templates_router
from app.features.catalog.router import router as catalog_router
from app.features.observations.router import router as observations_router
from app.features.processes.router import router as processes_router
from app.features.dashboard.router import router as dashboard_router
from app.features.extension_sessions.router import router as extension_sessions_router
from app.features.feedback.router import router as feedback_router
from app.features.rbac.router import router as rbac_router
from app.features.auth.router import router as auth_router

router = APIRouter()

# Auth & RBAC
router.include_router(auth_router, prefix="/auth", tags=["Auth"])
router.include_router(rbac_router, prefix="/rbac", tags=["RBAC"])

# System
router.include_router(health_router, tags=["System"])
router.include_router(version_router, tags=["System"])

# Business Features
router.include_router(processes_router, tags=["Processes"])
router.include_router(catalog_router, tags=["Catalog"])
router.include_router(analysis_templates_router, tags=["Analysis Templates"])
router.include_router(observations_router, tags=["Observations"])
router.include_router(analysis_results_router, tags=["Analysis Results"])
router.include_router(dashboard_router, prefix="/dashboard", tags=["Dashboard"])
router.include_router(extension_sessions_router, tags=["Extension Sessions"])
router.include_router(feedback_router, prefix="/feedback", tags=["Feedback"])
