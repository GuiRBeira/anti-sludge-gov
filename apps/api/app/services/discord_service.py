# app/services/discord_service.py
import httpx
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)


async def send_discord_message(
	content: str, title: str = "Feedback do Protótipo", color: int = 3447003
):
	"""
	Envia uma mensagem formatada para o Discord via Webhook.
	Default color is blue.
	"""
	if (
		not settings.DISCORD_WEBHOOK_URL
		or "SUA_URL_AQUI" in settings.DISCORD_WEBHOOK_URL
	):
		logger.warning("DISCORD_WEBHOOK_URL não configurada. Mensagem não enviada.")
		return False

	payload = {
		"embeds": [
			{
				"title": title,
				"description": content,
				"color": color,
			}
		]
	}

	try:
		async with httpx.AsyncClient() as client:
			response = await client.post(settings.DISCORD_WEBHOOK_URL, json=payload)
			response.raise_for_status()
			return True
	except Exception as e:
		logger.error(f"Erro ao enviar mensagem para o Discord: {e}")
		return False
