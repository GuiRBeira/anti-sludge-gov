# apps/api/scripts/seed_supabase.py
import sys
from pathlib import Path
from sqlalchemy import text, select
from sqlalchemy.orm import Session

# Adiciona o diretório app ao path para importar modelos e config
sys.path.append(str(Path(__file__).resolve().parent.parent))

from app.core.config import settings
from app.models import Categoria
import scripts.seed_db as seed_db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# =================================================================
# CONFIGURAÇÃO MANUAL (HARDCODED)
# Se preenchido, o script usará esta URL em vez do arquivo .env
# Exemplo: "postgresql+psycopg://postgres:senha@db.supabase.com:5432/postgres"
# =================================================================
DATABASE_URL_OVERRIDE = "postgresql+psycopg://postgres:Low0lOmevJjl6QTGDq29@db.xrnxscbewxkswxkjgeet.supabase.co:5432/postgres"


def get_session():
	url = DATABASE_URL_OVERRIDE or settings.DATABASE_URL
	print(f"🔗 Conectando em: {url.split('@')[-1]}")  # Mostra o host sem a senha
	engine = create_engine(url)
	return sessionmaker(bind=engine)()


def run_sql_file(db: Session, file_path: Path):
	print(f"📄 Executando {file_path.name}...")
	try:
		with open(file_path, encoding="utf-8") as f:
			sql = f.read()
			# O SQLAlchemy pode ter problemas com múltiplos statements dependendo do driver
			# Mas o psycopg geralmente aceita. Se falhar, tentamos splitar por ';'
			db.execute(text(sql))
			db.commit()
	except Exception as e:
		db.rollback()
		print(f"⚠️ Erro ao executar {file_path.name}: {e}")
		# Se for erro de 'already exists', podemos ignorar para alguns scripts
		if "already exists" in str(e).lower():
			print("ℹ️  Alguns objetos já existem, continuando...")
		else:
			raise e


def main():
	print("🚀 Iniciando população do Supabase...")
	db = get_session()

	try:
		# 1. Verificar se o schema base existe (checar se tabela categoria existe)
		print("🔍 Verificando tabelas...")
		try:
			db.execute(text("SELECT 1 FROM categoria LIMIT 1"))
			schema_exists = True
			print("✅ Schema já existe.")
		except Exception:
			db.rollback()
			schema_exists = False
			print("❌ Schema não encontrado. Criando...")

		if not schema_exists:
			# Executar schema base
			sql_dir = Path(__file__).resolve().parent.parent / "database"
			run_sql_file(db, sql_dir / "01_schema_base.sql")
			run_sql_file(db, sql_dir / "03_views_functions.sql")

		# 2. Verificar dados iniciais (catálogo)
		print("🔍 Verificando dados do catálogo...")
		res = db.execute(select(Categoria)).first()
		if not res:
			print("🌱 Populando catálogo F5...")
			sql_dir = Path(__file__).resolve().parent.parent / "database"
			run_sql_file(db, sql_dir / "02_initial_data.sql")
		else:
			print("✅ Catálogo já populado.")

		# 3. Rodar o seed de dados mockados
		print("🎲 Gerando dados mockados (Processos, Jornadas, Avaliações)...")
		# O script seed_db.py já faz commit internamente
		seed_db.main(db)

		print("\n✨ Sucesso! O banco de dados do Supabase foi populado.")
		print("🔗 Verifique o dashboard na sua aplicação web.")

	except Exception as e:
		print(f"\n💥 Erro crítico: {e}")
		sys.exit(1)
	finally:
		# Garante que a sessão seja fechada se ainda estiver aberta
		try:
			db.close()
		except:
			pass


if __name__ == "__main__":
	main()
