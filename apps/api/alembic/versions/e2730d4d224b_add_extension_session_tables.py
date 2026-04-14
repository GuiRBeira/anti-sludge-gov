"""add extension session tables

Revision ID: e2730d4d224b
Revises: a1a3a8ab2ab9
Create Date: 2026-04-14 02:56:50.545366

"""

from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "e2730d4d224b"
down_revision: str | None = "a1a3a8ab2ab9"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
	"""Cria as tabelas de sessão da extensão."""
	op.create_table(
		"sessao_extensao",
		sa.Column("id", sa.Integer(), nullable=False),
		sa.Column(
			"uuid",
			sa.UUID(),
			server_default=sa.text("uuid_generate_v4()"),
			nullable=False,
		),
		sa.Column("session_id_extensao", sa.String(length=100), nullable=False),
		sa.Column("processo_id", sa.Integer(), nullable=True),
		sa.Column("jornada_observada_id", sa.Integer(), nullable=True),
		sa.Column("data_inicio", sa.DateTime(), nullable=False),
		sa.Column("data_fim", sa.DateTime(), nullable=True),
		sa.Column("total_tempo_segundos", sa.Integer(), nullable=True),
		sa.Column(
			"total_paginas", sa.Integer(), server_default=sa.text("0"), nullable=False
		),
		sa.Column(
			"total_cliques", sa.Integer(), server_default=sa.text("0"), nullable=False
		),
		sa.Column(
			"created_at",
			sa.DateTime(),
			server_default=sa.text("CURRENT_TIMESTAMP"),
			nullable=False,
		),
		sa.ForeignKeyConstraint(
			["jornada_observada_id"], ["jornada_observada.id"], ondelete="SET NULL"
		),
		sa.ForeignKeyConstraint(["processo_id"], ["processo.id"], ondelete="SET NULL"),
		sa.PrimaryKeyConstraint("id"),
		sa.UniqueConstraint("session_id_extensao"),
		sa.UniqueConstraint("uuid"),
	)
	op.create_index(
		"idx_sessao_extensao_jornada",
		"sessao_extensao",
		["jornada_observada_id"],
		unique=False,
	)
	op.create_index(
		"idx_sessao_extensao_processo", "sessao_extensao", ["processo_id"], unique=False
	)
	op.create_table(
		"pagina_extensao",
		sa.Column("id", sa.Integer(), nullable=False),
		sa.Column("sessao_extensao_id", sa.Integer(), nullable=False),
		sa.Column("url", sa.Text(), nullable=False),
		sa.Column("titulo", sa.String(length=500), nullable=True),
		sa.Column("tempo_inicio_unix", sa.BigInteger(), nullable=False),
		sa.Column("tempo_fim_unix", sa.BigInteger(), nullable=True),
		sa.Column("duracao_segundos", sa.Integer(), nullable=True),
		sa.Column(
			"contagem_cliques",
			sa.Integer(),
			server_default=sa.text("0"),
			nullable=False,
		),
		sa.Column(
			"teve_scroll", sa.Boolean(), server_default=sa.text("false"), nullable=False
		),
		sa.Column("ordem", sa.Integer(), nullable=False),
		sa.Column(
			"created_at",
			sa.DateTime(),
			server_default=sa.text("CURRENT_TIMESTAMP"),
			nullable=False,
		),
		sa.ForeignKeyConstraint(
			["sessao_extensao_id"], ["sessao_extensao.id"], ondelete="CASCADE"
		),
		sa.PrimaryKeyConstraint("id"),
	)
	op.create_index(
		"idx_pagina_extensao_sessao",
		"pagina_extensao",
		["sessao_extensao_id"],
		unique=False,
	)
	op.create_table(
		"interacao_extensao",
		sa.Column("id", sa.Integer(), nullable=False),
		sa.Column("pagina_extensao_id", sa.Integer(), nullable=False),
		sa.Column(
			"tipo",
			sa.Enum("click", "scroll", name="tipo_interacao_enum"),
			server_default=sa.text("'click'"),
			nullable=False,
		),
		sa.Column("pos_x", sa.Integer(), nullable=True),
		sa.Column("pos_y", sa.Integer(), nullable=True),
		sa.Column("pos_x_relativa", sa.Numeric(precision=5, scale=2), nullable=True),
		sa.Column("pos_y_relativa", sa.Numeric(precision=5, scale=2), nullable=True),
		sa.Column("elemento_tag", sa.String(length=50), nullable=True),
		sa.Column("elemento_id", sa.String(length=200), nullable=True),
		sa.Column("elemento_classe", sa.String(length=500), nullable=True),
		sa.Column("elemento_texto", sa.String(length=200), nullable=True),
		sa.Column("timestamp_evento", sa.BigInteger(), nullable=False),
		sa.Column(
			"created_at",
			sa.DateTime(),
			server_default=sa.text("CURRENT_TIMESTAMP"),
			nullable=False,
		),
		sa.ForeignKeyConstraint(
			["pagina_extensao_id"], ["pagina_extensao.id"], ondelete="CASCADE"
		),
		sa.PrimaryKeyConstraint("id"),
	)
	op.create_index(
		"idx_interacao_pagina",
		"interacao_extensao",
		["pagina_extensao_id"],
		unique=False,
	)


def downgrade() -> None:
	"""Remove as tabelas de sessão da extensão."""
	op.drop_index("idx_interacao_pagina", table_name="interacao_extensao")
	op.drop_table("interacao_extensao")
	op.drop_index("idx_pagina_extensao_sessao", table_name="pagina_extensao")
	op.drop_table("pagina_extensao")
	op.drop_index("idx_sessao_extensao_processo", table_name="sessao_extensao")
	op.drop_index("idx_sessao_extensao_jornada", table_name="sessao_extensao")
	op.drop_table("sessao_extensao")
