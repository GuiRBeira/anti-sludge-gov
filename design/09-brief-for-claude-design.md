# 09 — Brief para Claude Design

Prompt pronto para colar no Claude Design (claude.ai/design) quando quiser
gerar mockups, wireframes ou protótipos do Anti-Sludge Gov.

Cole **junto** os arquivos da pasta `design/` como contexto e use o prompt
abaixo como instrução.

---

## Prompt principal

> Desenhe mockups para o **Anti-Sludge Gov**, uma ferramenta web da equipe
> FCINCO/MGI para aplicar a metodologia F5 Anti-Sludge em serviços
> públicos digitais (mapear jornadas, observar usuários, responder
> questionários estruturados de barreiras e impactos, gerar gráficos
> rastreáveis).
>
> **Persona de design (resumo de `01-persona.md`)**: Senior Product
> Designer com background em ferramentas de pesquisa qualitativa e
> plataformas de governo digital. Mistura Linear (densidade), Notion
> (inline editing) e GOV.UK Design System (clareza e acessibilidade).
>
> **Princípios (resumo de `02-principles.md`)**:
> 1. Conteúdo > cromo
> 2. Densidade respirável
> 3. Status sempre visível
> 4. Hierarquia por tipografia, não por cor
> 5. Acessibilidade WCAG AA é linha de base
> 6. Dado real vs sem dado (sem heurística silenciosa)
> 7. Atalhos para quem fica horas aqui
>
> **Suporte a temas**: claro, escuro e sistema. Paleta neutra +
> acentos semânticos (vermelho = barreira, azul = impacto, verde =
> sucesso, âmbar = pendência). Detalhes em `04-themes.md`.
>
> **Responsivo**: desktop-first (1280px), funcional em tablet, utilizável
> em mobile (cards no lugar de tabelas). Detalhes em `06-responsive.md`.
>
> **Componentes existentes**: shadcn/ui customizado (Button, Input,
> Textarea, Select, Card, Table, Badge, DropdownMenu, Label). Recharts
> para gráficos. Lucide para ícones. Detalhes em `03-design-system.md`.
>
> **Telas a desenhar** (em ordem de prioridade):
>
> 1. `/processos/[id]` — hub do processo com status metodológico das 7
>    etapas F5 (ícone, título, descrição, detalhe, chevron).
> 2. `/processos/[id]/jornada-planejada` — editor de tabela com passos.
> 3. `/processos/[id]/jornadas-individuais/[id]` — editor de jornada real
>    de um participante, com colunas de vínculo planejado/desvio/repetição.
> 4. `/processos/[id]/jornadas/[id]/questionario/[codigo]` — questionário
>    em modo matriz (passos × perguntas) ou modo necessidade (1 por jornada).
> 5. `/processos/[id]/resultados` — gráficos Recharts (médias de barreiras,
>    impactos, necessidade, tempo total por jornada).
>
> Para cada tela, entregue:
> - Versão **light** e **dark** lado a lado.
> - Estado **com dados** e estado **vazio**.
> - Versão **desktop** (1280px+) e **mobile** (375px).
>
> Inventário completo de telas e estados em `05-screen-inventory.md`.
>
> **Voz**: português brasileiro institucional, sóbrio, direto. Use os
> termos exatos da metodologia F5: "jornada planejada", "jornada
> individual", "jornada padrão", "passo", "barreira", "impacto",
> "necessidade", "carga cognitiva", "consequência", "emoção".

---

## Prompts adicionais úteis

### Para o hub do processo

> Refine a tela `/processos/[id]`. Quero a sensação de "central de
> comando" de uma pesquisa em andamento. Cada uma das 7 etapas
> metodológicas precisa mostrar status (pendente / em progresso /
> concluído) e um detalhe rápido (X de Y passos, N participantes, etc).
> Pense em algo entre um issue do Linear e a página de detalhe de um
> recurso no Stripe Dashboard.

### Para o questionário em modo matriz

> Desenhe `/processos/[id]/jornadas/[id]/questionario/Q_BARREIRAS_INDIVIDUAL`
> com 14 critérios × 8 passos. O usuário precisa preencher escala 1-5,
> marcar N/A, e escrever observação por célula. Sem botão "Salvar geral"
> — auto-save no blur. Mostre o estado "salvando…" / "salvo ✓" /
> "não salvo". Considere progresso (XX/YY perguntas respondidas).

### Para resultados / gráficos

> Refine `/processos/[id]/resultados`. 4 seções: barreiras por critério
> (BarChart horizontal vermelho), impactos por critério (azul, agrupado
> por subdimensão: carga cognitiva, emoção, consequência), necessidade
> (lista textual com média), tempo total por jornada (verde). Cada seção
> com subtítulo de N respostas. Itens sem dado **explícitos** ("sem
> dado", não barra zero).

### Para mobile

> Adapte as 5 telas principais para 375px. Sidebar vira drawer. Tabelas
> viram cards stack vertical. Modal de "Anexar print" ocupa tela inteira
> com paste / drop centrado. Touch targets ≥ 44px.

---

## Como anexar o material

No Claude Design (claude.ai/design):

1. Crie um novo design.
2. Em "Start with context", arraste a pasta `design/` inteira (ou os
   arquivos `.md` individuais).
3. Opcionalmente, adicione screenshots de:
   - Linear issue list (referência de densidade)
   - Notion database (referência de inline edit)
   - GOV.UK form long (referência de clareza)
4. Cole o "Prompt principal" acima.
5. Envie.

Para iterar: peça refinamento por tela usando os "Prompts adicionais".
