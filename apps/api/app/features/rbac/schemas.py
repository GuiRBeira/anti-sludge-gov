# app/features/rbac/schemas.py
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


class RBACEmailBase(BaseModel):
	email: EmailStr
	role: str = Field(..., pattern="^(admin|researcher|supervisor|visitor)$")


class RBACEmailCreate(RBACEmailBase):
	pass


class RBACEmailUpdate(BaseModel):
	role: str = Field(..., pattern="^(admin|researcher|supervisor|visitor)$")


class RBACEmailRead(RBACEmailBase):
	created_at: datetime
	updated_at: datetime

	class Config:
		from_attributes = True
