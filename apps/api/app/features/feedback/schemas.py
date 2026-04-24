# app/features/feedback/schemas.py
from pydantic import BaseModel


class FeedbackCreate(BaseModel):
	user_name: str
	user_email: str | None = None
	page_url: str
	message: str
	type: str = "feedback"  # feedback, bug, suggestion
	metadata: dict | None = None
