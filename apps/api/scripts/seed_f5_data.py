# apps/api/scripts/seed_f5_data.py
import asyncio
import random
from datetime import datetime, timedelta
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

# Import models
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.models.process_model import Processo, Etapa, CriterioBarreira, CriterioImpacto
from app.models.observation_model import (
	JornadaObservada,
	AvaliacaoBarreira,
	AvaliacaoImpacto,
	TempoEtapa,
)
from app.models.extension_model import SessaoExtensao, PaginaExtensao, InteracaoExtensao
from app.models.catalog_model import Categoria, TipoComportamento, CriterioTemplate

# Configurações do Banco (Local)
DB_URL = "postgresql+asyncpg://admin:secret@localhost:5432/antisludge"


async def reset_data(session: AsyncSession):
	# Opcional: Limpar dados anteriores para ter um seed limpo
	# await session.execute("TRUNCATE TABLE interacao_extensao, pagina_extensao, sessao_extensao, avaliacao_barreira, avaliacao_impacto, tempo_etapa, jornada_observada, criterio_barreira, criterio_impacto, etapa, processo RESTART IDENTITY CASCADE")
	pass


async def seed():
	engine = create_async_engine(DB_URL)
	async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

	async with async_session() as session:
		print("🌱 Iniciando o abastecimento do banco...")

		# 1. Obter dados do catálogo (assumindo que 02_initial_data já rodou no SQL)
		res_cat = await session.execute(select(Categoria))
		categorias = res_cat.scalars().all()

		res_tipo = await session.execute(select(TipoComportamento))
		tipos = res_tipo.scalars().all()

		res_temp = await session.execute(select(CriterioTemplate))
		templates = res_temp.scalars().all()

		if not categorias or not tipos:
			print("❌ Catálogo vazio! Rode os scripts SQL primeiro.")
			return

		# 2. Criar Processos
		processos_data = [
			{
				"nome": "Solicitação de Passe Livre Estudantil",
				"esfera": "Estadual",
				"status": "Crítico",
			},
			{
				"nome": "Renovação de Carteira de Motorista (CNH)",
				"esfera": "Estadual",
				"status": "Em Andamento",
			},
			{
				"nome": "Pedido de Isenção de IPTU",
				"esfera": "Municipal",
				"status": "Finalizado",
			},
		]

		for p_info in processos_data:
			processo = Processo(
				nome=p_info["nome"],
				descricao=f"Processo de {p_info['nome']} para cidadãos.",
				esfera_governo=p_info["esfera"],
				status=p_info["status"],
			)
			session.add(processo)
			await session.flush()

			# 3. Adicionar Etapas
			etapas_config = [
				("Acessar Portal do Governo", 1, "Bus - Acessar serviço"),
				("Realizar Login gov.br", 2, "Bus - Realizar login"),
				("Preencher Formulário de Cadastro", 3, "Pre - Preencher"),
				("Anexar Comprovante de Residência", 4, "Pre - Organizar e anexar"),
				("Assinar Termo de Compromisso", 5, "Pre - Consentir"),
				("Aguardar Análise", 6, "Esp - Espera passiva"),
			]

			etapa_objs = []
			for i, (nome, ordem, tipo_ref) in enumerate(etapas_config):
				tipo = next(
					(t for t in tipos if t.codigo_referencia == tipo_ref), tipos[0]
				)
				etapa = Etapa(
					processo_id=processo.id,
					categoria_id=tipo.categoria_id,
					tipo_comportamento_id=tipo.id,
					comportamento=nome,
					ordem=ordem,
					e_obrigatorio=True if i < 4 else False,
					tempo_planejado=timedelta(minutes=random.randint(2, 10)),
				)
				session.add(etapa)
				await session.flush()
				etapa_objs.append(etapa)

				# Criar Templates de Barreiras (3 por etapa)
				etapa_templates = [t for t in templates if random.random() > 0.6][:3]
				if not etapa_templates:
					etapa_templates = templates[:2]

				criterios_objs = []
				for t in etapa_templates:
					cb = CriterioBarreira(
						etapa_id=etapa.id,
						criterio_template_id=t.id,
						nome=t.nome,
						pergunta=f"Como você avalia o critério {t.nome} nesta etapa?",
					)
					session.add(cb)
					criterios_objs.append(cb)

				# Impactos
				impactos_objs = []
				for imp in ["Carga Cognitiva", "Emoção", "Consequência"]:
					ci = CriterioImpacto(
						etapa_id=etapa.id,
						nome=imp,
						pergunta=f"Qual o impacto de {imp} enfrentado pelo usuário?",
					)
					session.add(ci)
					impactos_objs.append(ci)

				await session.flush()

				# 4. Criar Jornada Real e Avaliações
				jornada = JornadaObservada(
					processo_id=processo.id,
					protocolo=f"PROT-{random.randint(1000, 9999)}",
					nome_jornada=f"Teste de Usabilidade - {p_info['nome']}",
					data_observacao=datetime.now().date(),
				)
				session.add(jornada)
				await session.flush()

				# Atribuir Notas Aleatórias
				for cb in criterios_objs:
					session.add(
						AvaliacaoBarreira(
							criterio_barreira_id=cb.id,
							jornada_observada_id=jornada.id,
							nota=random.randint(1, 5),
							observacao="Comentário de teste do observador.",
						)
					)

				for ci in impactos_objs:
					session.add(
						AvaliacaoImpacto(
							criterio_impacto_id=ci.id,
							jornada_observada_id=jornada.id,
							nota=random.randint(1, 5),
						)
					)

				# Tempo Realizado
				session.add(
					TempoEtapa(
						jornada_observada_id=jornada.id,
						etapa_id=etapa.id,
						tempo_realizado=timedelta(minutes=random.randint(3, 15)),
					)
				)

			# 5. Criar Sessão da Extensão com Cliques
			sessao_ext = SessaoExtensao(
				session_id_extensao=f"ext-sess-{processo.id}-{random.randint(0, 999)}",
				processo_id=processo.id,
				data_inicio=datetime.now() - timedelta(minutes=60),
				total_cliques=50,
				total_tempo_segundos=1800,
			)
			session.add(sessao_ext)
			await session.flush()

			pag = PaginaExtensao(
				sessao_extensao_id=sessao_ext.id,
				url="https://portal.governo.br/servico",
				titulo="Portal de Serviços",
				tempo_inicio_unix=int(
					(datetime.now() - timedelta(minutes=30)).timestamp()
				),
				ordem=1,
			)
			session.add(pag)
			await session.flush()

			# Criar 20 cliques fake
			base_ts = int(datetime.now().timestamp() * 1000)
			for i in range(20):
				session.add(
					InteracaoExtensao(
						pagina_extensao_id=pag.id,
						tipo="click",
						elemento_tag=random.choice(["button", "a", "input", "div"]),
						elemento_texto=f"Elemento {i}",
						timestamp_evento=base_ts
						+ (i * 5000),  # Clique a cada 5 segundos
					)
				)

		await session.commit()
		print("✅ Banco abastecido com sucesso!")


if __name__ == "__main__":
	asyncio.run(seed())
