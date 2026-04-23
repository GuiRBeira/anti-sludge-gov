# app/features/feedback/router.py
from fastapi import APIRouter
from app.features.feedback import schemas
from app.services.discord_service import send_discord_message

router = APIRouter()


@router.post("/")
async def create_feedback(feedback: schemas.FeedbackCreate):
	"""
	Recebe um feedback e envia para o Discord.
	"""
	color_map = {
		"bug": 15158332,  # Vermelho
		"suggestion": 3066993,  # Verde
		"feedback": 3447003,  # Azul
	}

	color = color_map.get(feedback.type, 3447003)

	content = (
		f"**Tipo:** {feedback.type.upper()}\n"
		f"**Usuário:** {feedback.user_name} ({feedback.user_email or 'N/A'})\n"
		f"**Página:** {feedback.page_url}\n\n"
		f"**Mensagem:**\n{feedback.message}"
	)

	if feedback.metadata:
		content += f"\n\n**Metadata:**\n`{feedback.metadata}`"

	success = await send_discord_message(
		content=content,
		title=f"Novo {feedback.type.capitalize()} Recebido",
		color=color,
	)

	if not success:
		# Não falhamos o request se o Discord falhar, mas avisamos no log
		# Em um protótipo, talvez queiramos saber.
		return {
			"status": "partial_success",
			"message": "Feedback received but failed to notify via Discord",
		}

	return {"status": "success", "message": "Feedback sent to Discord"}
