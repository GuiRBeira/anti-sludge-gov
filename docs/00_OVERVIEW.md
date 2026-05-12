# 00 — Overview

## O que é o Anti-Sludge Gov

**MVP v1 desenvolvido por plreis.** Ferramenta web para a equipe FCINCO/MGI aplicar a metodologia **F5 Anti-Sludge**
em serviços públicos digitais: mapear jornadas, observar usuários, responder
questionários estruturados de barreiras e impactos, e gerar gráficos rastreáveis
para priorização de melhorias.

## Estado da versão 1

O MVP v1 cobre o fluxo essencial de operação:

- login/cadastro com Supabase Auth;
- papéis e escopos (`admin`, `gestor`, `analista`, `visitante`);
- tela admin de usuários, órgãos e permissões por processo;
- dashboard inicial de processos;
- processo, contexto, jornada planejada, jornadas individuais e jornada padrão;
- questionários e resultados sem heurística silenciosa;
- interface visual FCINCO com modo claro/escuro, animações e onboarding por
  papel conectado ao fluxo metodológico.

## Por que estamos recomeçando

A versão anterior (`../anti-sludge-gov/`) tinha boa stack mas modelo de domínio
incompleto: faltavam questionários, participantes, jornada individual real,
avaliação de Necessidade, jornada padrão, e os gráficos eram heurísticos em vez
de derivar das respostas. Auditoria completa em
`../AUDITORIA_PRODUTO_TECNICA_2026-05-09.md` e cópia versionada na raiz deste
repositório.

## Atores

- **Admin**: acesso global, todos os órgãos e processos.
- **Gestor**: gerencia órgão (cria/apaga processos, gerencia analistas).
- **Analista**: preenche metodologia (não cria/apaga processos).
- **Visitante**: visualiza apenas processos atribuídos.
- **Participante observado**: representado no banco de forma anonimizada,
  não acessa o sistema.

## Critério de aceite

> Nenhuma funcionalidade da planilha F5 pode ficar sem mapeamento explícito
> para tela, entidade, regra de negócio, cálculo ou relatório.

A tabela viva está em [03_MAPA_PLANILHA_SISTEMA.md](./03_MAPA_PLANILHA_SISTEMA.md).
Antes de declarar o MVP pronto, todas as linhas precisam estar em "completo" ou
"validado por Janaina/Wendel".

## Fluxo metodológico que o sistema deve suportar

1. Cadastro do processo/serviço.
2. Compreensão do contexto.
3. Jornada planejada estruturada.
4. Planejamento de observação (protocolo + participantes).
5. Jornadas individuais (uma por participante).
6. Construção da jornada padrão a partir das individuais.
7. Classificação comportamental (categoria + tipo por passo).
8. Questionários de barreiras (escala 1-5 + N/A + observação discursiva).
9. Questionários de impactos (Carga Cognitiva, Emoção, Consequência por etapa;
   Necessidade uma vez por jornada).
10. Validação dos dados.
11. Resultados analíticos e gráficos (rastreáveis às respostas).
12. Exportação/relatório.

## O que está fora do escopo do MVP

- Extensão de navegador (congelada).
- NLP/grafo de auditoria automatizada.
- SSO institucional / gov.br.
- Painel de calibragem de pesos.
