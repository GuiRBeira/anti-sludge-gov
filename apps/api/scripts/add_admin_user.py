# scripts/add_admin_user.py
import asyncio
import sys
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

# Import models
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.models.auth_model import RBACEmail
from app.core.config import settings


async def add_admin(email: str):
	engine = create_async_engine(settings.DATABASE_URL)
	async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

	async with async_session() as session:
		print(f"🔍 Verificando se o usuário {email} já existe...")
		result = await session.execute(
			select(RBACEmail).where(RBACEmail.email == email)
		)
		user = result.scalar_one_or_none()

		if user:
			print(f"⚠️ Usuário {email} já existe com o papel: {user.role}")
			if user.role != "admin":
				print("🆙 Atualizando papel para 'admin'...")
				user.role = "admin"
				await session.commit()
				print(f"✅ Usuário {email} atualizado para admin!")
			else:
				print("✨ Nada a fazer.")
		else:
			print(f"🚀 Adicionando {email} como admin...")
			new_user = RBACEmail(email=email, role="admin")
			session.add(new_user)
			await session.commit()
			print(f"✅ Usuário {email} adicionado com sucesso como admin!")


if __name__ == "__main__":
	if len(sys.argv) < 2:
		print("❌ Uso: python scripts/add_admin_user.py <email>")
		sys.exit(1)

	email_arg = sys.argv[1]
	asyncio.run(add_admin(email_arg))
