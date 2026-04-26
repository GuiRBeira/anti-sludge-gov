# app/models/auth_model.py
from datetime import datetime

from app.core.base_model import Base
from sqlalchemy import DateTime, String, func
from sqlalchemy.orm import Mapped, mapped_column


class RBACEmail(Base):
	"""
	Tabela isolada para controle de acesso via Role-Based Access Control (RBAC).
	Armazena os emails autorizados e seus respectivos papéis.
	"""

	__tablename__ = "rbac_emails"

	email: Mapped[str] = mapped_column(String(255), primary_key=True)
	role: Mapped[str] = mapped_column(String(50), nullable=False)
	created_at: Mapped[datetime] = mapped_column(
		DateTime, server_default=func.current_timestamp(), nullable=False
	)
	updated_at: Mapped[datetime] = mapped_column(
		DateTime,
		server_default=func.current_timestamp(),
		onupdate=func.current_timestamp(),
		nullable=False,
	)
