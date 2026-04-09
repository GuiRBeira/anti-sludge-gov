# app/core/exceptions.py
from fastapi import status
from pydantic import BaseModel
from typing import Any, Optional

class ErrorDetail(BaseModel):
    message: str
    code: Optional[str] = None
    details: Optional[Any] = None

class ErrorResponse(BaseModel):
    error: ErrorDetail

class APIException(Exception):
    def __init__(
        self, 
        message: str, 
        status_code: int = status.HTTP_400_BAD_REQUEST,
        code: Optional[str] = None,
        details: Optional[Any] = None
    ):
        self.message = message
        self.status_code = status_code
        self.code = code
        self.details = details
        super().__init__(message)

class ResourceNotFoundException(APIException):
    def __init__(self, resource: str, identifier: Any):
        super().__init__(
            message=f"{resource} com ID {identifier} não encontrado.",
            status_code=status.HTTP_404_NOT_FOUND,
            code="RESOURCE_NOT_FOUND"
        )

class ValidationException(APIException):
    def __init__(self, message: str, details: Optional[Any] = None):
        super().__init__(
            message=message,
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            code="VALIDATION_ERROR",
            details=details
        )

class DatabaseException(APIException):
    def __init__(self, message: str = "Erro interno no banco de dados."):
        super().__init__(
            message=message,
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            code="DATABASE_ERROR"
        )
