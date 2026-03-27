# scripts/reset_db.py
from __future__ import annotations

from sqlalchemy import text
from app.core.database import SessionLocal
from app.core.config import settings


TRUNCATE_SQL = """
TRUNCATE
  avaliacao_barreira,
  avaliacao_impacto,
  tempo_etapa,
  jornada_observada,
  resultado_analise,
  criterio_barreira,
  criterio_impacto,
  etapa,
  processo,
  observador
RESTART IDENTITY CASCADE;
"""

CHECK_ENV_SQL = "SELECT current_database() AS db, current_schema() AS schema, current_user AS user;"
COUNTS_SQL = """
SELECT
  (SELECT count(*) FROM observador) AS observador,
  (SELECT count(*) FROM processo) AS processo,
  (SELECT count(*) FROM etapa) AS etapa,
  (SELECT count(*) FROM criterio_barreira) AS criterio_barreira,
  (SELECT count(*) FROM criterio_impacto) AS criterio_impacto,
  (SELECT count(*) FROM jornada_observada) AS jornada_observada,
  (SELECT count(*) FROM avaliacao_barreira) AS avaliacao_barreira,
  (SELECT count(*) FROM avaliacao_impacto) AS avaliacao_impacto,
  (SELECT count(*) FROM tempo_etapa) AS tempo_etapa,
  (SELECT count(*) FROM resultado_analise) AS resultado_analise;
"""


def mask_db_url(url: str) -> str:
    # mascara senha: postgresql://user:pass@host/db
    if "://" not in url or "@" not in url:
        return url
    prefix, rest = url.split("://", 1)
    creds, tail = rest.split("@", 1)
    if ":" in creds:
        user, _pwd = creds.split(":", 1)
        return f"{prefix}://{user}:***@{tail}"
    return f"{prefix}://***@{tail}"


def main() -> None:
    db = SessionLocal()
    try:
        print(f"DB_URL: {mask_db_url(settings.DATABASE_URL)}")

        env = db.execute(text(CHECK_ENV_SQL)).mappings().one()
        print(f"Connected to: db={env['db']} schema={env['schema']} user={env['user']}")

        before = db.execute(text(COUNTS_SQL)).mappings().one()
        print("Counts BEFORE:", dict(before))

        db.execute(text(TRUNCATE_SQL))
        db.commit()

        after = db.execute(text(COUNTS_SQL)).mappings().one()
        print("Counts AFTER: ", dict(after))

        print("✅ Reset concluído com sucesso.")
    except Exception as e:
        db.rollback()
        print("❌ Erro ao resetar o banco. Fiz rollback.")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()
