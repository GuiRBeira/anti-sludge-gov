# apps/api/scratch/apply_sql.py
from app.core.database import engine_sync
from sqlalchemy import text
import sys


def apply_sql(filename):
	print(f"Applying {filename}...")
	with open(filename) as f:
		sql = f.read()

	with engine_sync.connect() as conn:
		# Usando a conexão nativa para lidar melhor com scripts complexos se necessário
		# Mas o SQLAlchemy text() costuma aguentar se passarmos o bloco inteiro
		conn.execute(text(sql))
		conn.commit()
	print("Success.")


if __name__ == "__main__":
	apply_sql(sys.argv[1])
