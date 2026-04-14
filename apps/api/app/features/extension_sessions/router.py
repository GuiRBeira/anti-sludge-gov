# app/features/extension_sessions/router.py
from app.core.database import get_db
from app.features.extension_sessions import schemas
from app.models.extension_model import (
	InteracaoExtensao,
	PaginaExtensao,
	SessaoExtensao,
)
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

router = APIRouter()


# =========================
# SessaoExtensao Endpoints
# =========================


@router.post(
	"/sessoes-extensao", response_model=schemas.SessaoExtensaoOut, status_code=201
)
async def create_sessao_extensao(
	obj_in: schemas.SessaoExtensaoCreate,
	db: AsyncSession = Depends(get_db),
):
	"""Recebe e persiste uma sessão completa da extensão, incluindo páginas e interações."""
	sessao = SessaoExtensao(
		session_id_extensao=obj_in.session_id_extensao,
		processo_id=obj_in.processo_id,
		data_inicio=obj_in.data_inicio,
		data_fim=obj_in.data_fim,
		total_tempo_segundos=obj_in.total_tempo_segundos,
		total_paginas=obj_in.total_paginas,
		total_cliques=obj_in.total_cliques,
	)
	db.add(sessao)
	await db.flush()  # Obter o ID da sessão antes de criar páginas

	for i, pagina_data in enumerate(obj_in.paginas):
		pagina = PaginaExtensao(
			sessao_extensao_id=sessao.id,
			url=pagina_data.url,
			titulo=pagina_data.titulo,
			tempo_inicio_unix=pagina_data.tempo_inicio_unix,
			tempo_fim_unix=pagina_data.tempo_fim_unix,
			duracao_segundos=pagina_data.duracao_segundos,
			contagem_cliques=pagina_data.contagem_cliques,
			teve_scroll=pagina_data.teve_scroll,
			ordem=pagina_data.ordem if pagina_data.ordem is not None else i,
		)
		db.add(pagina)
		await db.flush()

		for interacao_data in pagina_data.interacoes:
			interacao = InteracaoExtensao(
				pagina_extensao_id=pagina.id,
				tipo=interacao_data.tipo,
				pos_x=interacao_data.pos_x,
				pos_y=interacao_data.pos_y,
				pos_x_relativa=interacao_data.pos_x_relativa,
				pos_y_relativa=interacao_data.pos_y_relativa,
				elemento_tag=interacao_data.elemento_tag,
				elemento_id=interacao_data.elemento_id,
				elemento_classe=interacao_data.elemento_classe,
				elemento_texto=interacao_data.elemento_texto,
				timestamp_evento=interacao_data.timestamp_evento,
			)
			db.add(interacao)

	await db.commit()
	await db.refresh(sessao)
	return sessao


@router.get("/sessoes-extensao", response_model=list[schemas.SessaoExtensaoOut])
async def list_sessoes_extensao(
	skip: int = 0,
	limit: int = 100,
	processo_id: int | None = Query(None, description="Filtrar por processo"),
	db: AsyncSession = Depends(get_db),
):
	"""Lista sessões da extensão, com filtro opcional por processo."""
	stmt = select(SessaoExtensao).offset(skip).limit(limit)
	if processo_id is not None:
		stmt = stmt.where(SessaoExtensao.processo_id == processo_id)
	result = await db.execute(stmt)
	return list(result.scalars().all())


@router.get("/sessoes-extensao/{id}", response_model=schemas.SessaoExtensaoDetailOut)
async def get_sessao_extensao(id: int, db: AsyncSession = Depends(get_db)):
	"""Retorna detalhes de uma sessão incluindo as páginas visitadas."""
	stmt = (
		select(SessaoExtensao)
		.where(SessaoExtensao.id == id)
		.options(selectinload(SessaoExtensao.paginas))
	)
	result = await db.execute(stmt)
	sessao = result.scalar_one_or_none()
	if not sessao:
		raise HTTPException(status_code=404, detail="Sessão não encontrada")
	return sessao


@router.patch(
	"/sessoes-extensao/{id}/vincular", response_model=schemas.SessaoExtensaoOut
)
async def vincular_sessao_jornada(
	id: int,
	obj_in: schemas.SessaoExtensaoVincularJornada,
	db: AsyncSession = Depends(get_db),
):
	"""Vincula uma sessão da extensão a uma jornada observada formal."""
	stmt = select(SessaoExtensao).where(SessaoExtensao.id == id)
	result = await db.execute(stmt)
	sessao = result.scalar_one_or_none()
	if not sessao:
		raise HTTPException(status_code=404, detail="Sessão não encontrada")

	sessao.jornada_observada_id = obj_in.jornada_observada_id
	db.add(sessao)
	await db.commit()
	await db.refresh(sessao)
	return sessao
