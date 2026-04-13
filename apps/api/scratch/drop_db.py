# apps/api/scratch/drop_db.py
from app.core.database import engine_sync
from sqlalchemy import text


def drop_everything():
	print("Dropping public schema to clear everything (tables, views, functions)...")
	with engine_sync.connect() as conn:
		# Dropar o schema public cascade remove tudo (tabelas, views, tipos, etc)
		conn.execute(text("DROP SCHEMA public CASCADE;"))
		conn.execute(text("CREATE SCHEMA public;"))
		conn.execute(text("GRANT ALL ON SCHEMA public TO admin;"))
		conn.execute(text("GRANT ALL ON SCHEMA public TO public;"))
		conn.commit()
	print("Database is now clean.")


if __name__ == "__main__":
	drop_everything()
