import time
import logging

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.api import router as api_router
from app.core.config import settings
from app.core.exceptions import APIException, ErrorResponse, ErrorDetail

# Configuração básica de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Anti-Sludge Gov API",
    description="API para análise e redução de carga administrativa (Sludge) no governo.",
    version=settings.VERSION,
)

# =========================
# MIDDLEWARES
# =========================

# CORS - Aberto para desenvolvimento, restringir em produção
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging Middleware - Registra tempo de execução e rota
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = (time.time() - start_time) * 1000
    formatted_process_time = f"{process_time:.2f}ms"
    logger.info(f"Method: {request.method} Path: {request.url.path} Status: {response.status_code} Time: {formatted_process_time}")
    response.headers["X-Process-Time"] = formatted_process_time
    return response

# =========================
# EXCEPTION HANDLERS
# =========================
@app.exception_handler(APIException)
async def api_exception_handler(request: Request, exc: APIException):
    return JSONResponse(
        status_code=exc.status_code,
        content=ErrorResponse(
            error=ErrorDetail(
                message=exc.message,
                code=exc.code,
                details=exc.details
            )
        ).model_dump()
    )

# =========================
# ROUTERS
# =========================

app.include_router(api_router, prefix="/api/v1")