from __future__ import annotations

from datetime import date, timedelta
from random import randint, choice, random
from faker import Faker

from sqlalchemy import select, func
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.base_model import CriterioImpactoEnum, TipoEvidenciaEnum
from app.models.catalog_model import Categoria, TipoComportamento, CriterioTemplate
from app.models.process_model import Processo, Etapa
from app.models.observation_model import Observador, JornadaObservada, TempoEtapa
from app.models.analysis_model import (
    CriterioBarreira,
    CriterioImpacto,
    AvaliacaoBarreira,
    AvaliacaoImpacto,
    ResultadoAnalise,
)
import os
import logging

def setup_logging():
    level = logging.INFO if os.getenv("DEBUG", "0") == "1" else logging.WARNING
    logging.basicConfig(
        level=level,
        format="%(asctime)s - %(levelname)s - %(message)s",
    )
    logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)
    logging.getLogger("sqlalchemy.pool").setLevel(logging.WARNING)

setup_logging()

fake = Faker("pt_BR")


# -------------------------
# Helpers
# -------------------------
def protocol_unique(db: Session) -> str:
    # garante protocolo único (é UNIQUE no banco)
    while True:
        proto = f"F5-{fake.unique.bothify(text='????-#####')}".upper()
        exists = db.scalar(select(func.count()).select_from(JornadaObservada).where(JornadaObservada.protocolo == proto))
        if not exists:
            return proto


def avg_or_none(values: list[int]) -> float | None:
    if not values:
        return None
    return round(sum(values) / len(values), 2)


# -------------------------
# Seed steps
# -------------------------
def seed_processos(db: Session, n: int) -> list[Processo]:
    processos: list[Processo] = []
    for _ in range(n):
        p = Processo(
            nome=fake.sentence(nb_words=4)[:255],
            descricao=fake.paragraph(),
            objetivo=fake.sentence(),
            status=choice(["Em Andamento", "Concluído", "Rascunho"]),
            publico_alvo=choice(["Cidadão", "Empresa", "Servidor público", None]),
            usuarios_estimados_ano=randint(100, 2_000_000),
            tempo_medio_estimado=choice(["5 min", "10 min", "20 min", "30 min", None]),
        )
        db.add(p)
        processos.append(p)
    db.commit()
    for p in processos:
        db.refresh(p)
    return processos


def seed_etapas(db: Session, processo: Processo, n_etapas: int) -> list[Etapa]:
    categorias = db.scalars(select(Categoria)).all()
    tipos = db.scalars(select(TipoComportamento)).all()
    if not categorias or not tipos:
        raise RuntimeError("Categoria/TipoComportamento vazios. Rode o SQL de dados iniciais primeiro.")

    etapas: list[Etapa] = []
    for ordem in range(1, n_etapas + 1):
        cat = choice(categorias)
        tipos_da_cat = [t for t in tipos if t.categoria_id == cat.id] or tipos
        tc = choice(tipos_da_cat)

        e = Etapa(
            processo_id=processo.id,
            categoria_id=cat.id,
            tipo_comportamento_id=tc.id,
            ordem=ordem,
            numero=str(ordem),
            comportamento=fake.sentence(nb_words=10)[:500],
            e_obrigatorio=choice([True, False]),
            repeticoes=choice([None, "1x", "2x", "3x"]),
            tempo_planejado=choice([None, timedelta(seconds=randint(30, 600))]),
            tempo_padrao=choice([None, timedelta(seconds=randint(30, 600))]),
            duracao_media_observada=choice([None, timedelta(seconds=randint(30, 900))]),
        )
        db.add(e)
        etapas.append(e)

    db.commit()
    for e in etapas:
        db.refresh(e)
    return etapas


def seed_criterios_por_etapa(db: Session, etapa: Etapa):
    templates = db.scalars(select(CriterioTemplate)).all()
    if not templates:
        raise RuntimeError("CriterioTemplate vazio. Rode o SQL de dados iniciais primeiro.")

    # Barreiras: cria 3 a 7 critérios por etapa
    for i in range(randint(3, 7)):
        t = choice(templates)
        cb = CriterioBarreira(
            etapa_id=etapa.id,
            criterio_template_id=t.id,
            nome=t.nome[:100],
            pergunta=fake.sentence(nb_words=12),
            texto_nota_1="Muito ruim",
            texto_nota_5="Excelente",
            ordem=i + 1,
        )
        db.add(cb)

    # Impactos: normalmente 3 fixos (enum)
    impactos = [CriterioImpactoEnum.CARGA_COGNITIVA, CriterioImpactoEnum.EMOCAO, CriterioImpactoEnum.CONSEQUENCIA]
    for i, imp in enumerate(impactos, start=1):
        ci = CriterioImpacto(
            etapa_id=etapa.id,
            nome=CriterioImpactoEnum(imp.value),
            pergunta=f"Como você avalia {imp.value} nesta etapa?",
            texto_nota_1="Muito baixo",
            texto_nota_5="Muito alto",
            ordem=i,
        )
        db.add(ci)

    db.commit()


def seed_observadores(db: Session, n: int) -> list[Observador]:
    obs: list[Observador] = []
    for _ in range(n):
        o = Observador(
            nome=fake.name()[:150],
            email=choice([fake.email()[:255], None]),
            estado=choice(["PR", "SP", "RJ", "MG", "BA", None]),
            escolaridade=choice(["Ensino Médio", "Superior", "Pós", None]),
        )
        db.add(o)
        obs.append(o)

    db.commit()
    for o in obs:
        db.refresh(o)
    return obs


def seed_jornadas(db: Session, processo: Processo, observadores: list[Observador], n: int) -> list[JornadaObservada]:
    jornadas: list[JornadaObservada] = []
    for _ in range(n):
        jo = JornadaObservada(
            processo_id=processo.id,
            observador_id=choice(observadores).id if observadores else None,
            protocolo=protocol_unique(db),
            nome_jornada=choice([fake.word().title(), None]),
            data_observacao=date.today(),
            observacoes_gerais=choice([fake.paragraph(), None]),
        )
        db.add(jo)
        jornadas.append(jo)

    db.commit()
    for jo in jornadas:
        db.refresh(jo)
    return jornadas


def seed_avaliacoes_e_tempos(db: Session, etapas: list[Etapa], jornadas: list[JornadaObservada]):
    # carrega criterios por etapa e gera avaliações aleatórias por jornada
    for jo in jornadas:
        for etapa in etapas:
            # tempo_etapa (UNIQUE jornada+etapa)
            te = TempoEtapa(
                jornada_observada_id=jo.id,
                etapa_id=etapa.id,
                tempo_realizado=timedelta(seconds=randint(10, 1200)),
                observacao=choice([None, fake.sentence()]),
            )
            db.add(te)

            # barreiras
            barreiras = db.scalars(select(CriterioBarreira).where(CriterioBarreira.etapa_id == etapa.id)).all()
            for cb in barreiras:
                if random() < 0.6:  # nem tudo precisa ser avaliado
                    ab = AvaliacaoBarreira(
                        criterio_barreira_id=cb.id,
                        jornada_observada_id=jo.id,
                        nota=randint(1, 5),
                        tipo_evidencia=choice(list(TipoEvidenciaEnum)),
                        observacao=choice([None, fake.sentence()]),
                    )
                    db.add(ab)

            # impactos
            impactos = db.scalars(select(CriterioImpacto).where(CriterioImpacto.etapa_id == etapa.id)).all()
            for ci in impactos:
                if random() < 0.75:
                    ai = AvaliacaoImpacto(
                        criterio_impacto_id=ci.id,
                        jornada_observada_id=jo.id,
                        nota=randint(1, 5),
                        tipo_evidencia=choice(list(TipoEvidenciaEnum)),
                        observacao=choice([None, fake.sentence()]),
                    )
                    db.add(ai)

    db.commit()


def seed_resultados(db: Session, processo: Processo, etapas: list[Etapa]):
    # gera resultado_analise por etapa (bem “mock”), usando médias das avaliações existentes
    for etapa in etapas:
        # média barreiras por etapa
        notas_barreiras = db.scalars(
            select(AvaliacaoBarreira.nota)
            .join(CriterioBarreira, CriterioBarreira.id == AvaliacaoBarreira.criterio_barreira_id)
            .where(CriterioBarreira.etapa_id == etapa.id)
            .where(AvaliacaoBarreira.nota.is_not(None))
        ).all()

        notas_impactos = db.scalars(
            select(AvaliacaoImpacto.nota)
            .join(CriterioImpacto, CriterioImpacto.id == AvaliacaoImpacto.criterio_impacto_id)
            .where(CriterioImpacto.etapa_id == etapa.id)
            .where(AvaliacaoImpacto.nota.is_not(None))
        ).all()

        mb = avg_or_none([int(x) for x in notas_barreiras if x is not None])
        mi = avg_or_none([int(x) for x in notas_impactos if x is not None])

        indice = round((mb or 0) * (mi or 0), 2) if (mb is not None or mi is not None) else None
        e_sludge = bool(indice is not None and indice >= 10)

        ra = ResultadoAnalise(
            processo_id=processo.id,
            etapa_id=etapa.id,
            media_barreiras=mb,
            media_impactos=mi,
            indice_sludge=indice,
            prioridade=randint(1, 5),
            e_sludge=e_sludge,
            recomendacoes=choice([None, fake.paragraph()]),
        )
        db.add(ra)

    db.commit()


def main():
    db = SessionLocal()
    try:
        # parâmetros do “enchimento”
        N_PROCESSOS = 5
        ETAPAS_POR_PROCESSO = (6, 15)   # range
        N_OBSERVADORES = 8
        JORNADAS_POR_PROCESSO = (1, 4)  # range

        observadores = seed_observadores(db, N_OBSERVADORES)
        processos = seed_processos(db, N_PROCESSOS)

        for p in processos:
            etapas = seed_etapas(db, p, randint(*ETAPAS_POR_PROCESSO))

            # criterios por etapa
            for e in etapas:
                seed_criterios_por_etapa(db, e)

            # jornadas por processo
            jornadas = seed_jornadas(db, p, observadores, randint(*JORNADAS_POR_PROCESSO))

            # avaliações + tempos
            seed_avaliacoes_e_tempos(db, etapas, jornadas)

            # resultado_analise (mock)
            seed_resultados(db, p, etapas)

        print("✅ Seed completo: processos/etapas/critérios/jornadas/avaliações/tempos/resultados.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
