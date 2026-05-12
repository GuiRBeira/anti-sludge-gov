# 09 — Brief para Claude Design (FCINCO-aligned)

Briefing pronto para colar no Claude Design (claude.ai/design) com a
direção visual **alinhada à identidade FCINCO real** descoberta nas peças
da pasta `/IMAGENS/` deste repositório.

> **Direção em uma frase:** Anti-Sludge Gov é um **caderno de pesquisa
> digital** que herda a identidade handcrafted da FCINCO — watercolor +
> ink linework + handlettering + paleta verde teal/amarelo
> mostarda/vermelho trilha — sem perder a densidade necessária para
> trabalho longo.

## Como anexar no Claude Design

1. Modal **"Attach codebase"** → arrastar a pasta `ANTISLUDGE-GOV-NEWSTACK/`.
2. **Manter prioritariamente**:
   - `IMAGENS/` inteira (assets reais FCINCO + página HTML salva)
   - `design/` inteira (este e demais briefings)
   - `web/app/`, `web/components/`, `web/features/`, `web/types/database.ts`
   - `web/tailwind.config.ts`, `web/app/globals.css`
   - `docs/02_DOMINIO_F5.md`, `docs/03_MAPA_PLANILHA_SISTEMA.md`
3. **Desmarcar**: `node_modules`, `.next`, `pnpm-lock.yaml`, migrations SQL,
   `.git/`.
4. URL adicional: <https://www.gov.br/gestao/pt-br/assuntos/gestaoeinovacao/inovacao-governamental-carreiras-transversais/inovacao-governamental/cinco/fcinco>

## Prompt principal

```
Você é Senior Product Designer agindo conforme a skill "frontend-design".
Direção bold/intencional, sem AI-slop. Está desenhando o Anti-Sludge Gov:
ferramenta web da equipe FCINCO/MGI para aplicar a metodologia F5
Anti-Sludge em serviços públicos digitais.

LEIA PRIMEIRO:
- /IMAGENS/ — assets visuais reais da FCINCO baixados da página oficial:
  banner verde teal + amarelo, ilustrações watercolor (pessoas com lupa,
  pessoa olhando mapa de trilha "TRILHA COMUM", barreira amarelo/preto
  listrada), títulos handlettering em molduras sketchy, numeração bold
  amarela ("01" "03" "05"), underlines sketch orgânicos, watercolor
  splatters amarelos. A página HTML salva mostra composição completa.
- /design/01-persona.md, 02-principles.md, 05-screen-inventory.md.

PALETA (fonte: /IMAGENS/):
- Verde teal FCINCO #1FB597 (marca, header bands, ações primárias raras).
- Amarelo mostarda saturado #F4B400 (numeração de etapas, ênfase, badges).
- Vermelho watercolor #C8252A (TRILHAS — metáfora central da jornada,
  vindo da peça "TRILHA COMUM").
- Cinza/preto ink #1A1A1A (linework, texto principal, ilustrações).
- Off-white papel #FBFAF6 (background — sensação caderno, não branco puro).
- Acentos F5 secundários: laranja desvio, roxo repetição, azul impacto.
- Dark mode: off-black papel #1A1815 com acentos preservados; watercolors
  dessaturados.

TIPOGRAFIA:
- HANDLETTERING (Patrick Hand / Caveat / Reenie Beanie) para títulos de
  seção GRANDES em moldura sketch frame (replicar "COMO FUNCIONA",
  "RELATÓRIOS", "PERGUNTAS & RESPOSTAS" das IMAGENS/). Parcimônia.
- DISPLAY BOLD CONDENSED (Bebas Neue / Archivo Black) em amarelo
  mostarda para numeração de steps (01..07 etapas, ordem de passos,
  códigos de participante P01).
- SANS LIMPO (Geist Sans, já no app) para corpo, forms, tabelas.
- MONO TABULAR (JetBrains Mono) para tempos, contadores, percentuais.

ELEMENTOS VISUAIS REUTILIZADOS:
- Trilha pontilhada vermelha → JornadaTimeline visual.
- Watercolor splatter amarelo → headers de seção celebratórios.
- Underline scribble orgânico → divider seletivo entre seções.
- Moldura sketch frame → H1 de páginas principais.
- Barreira amarelo/preto listrada → ícone de "barreira" em resultados.

FEATURE PRIORITÁRIA — Timeline como TRILHA (não tabela disfarçada):
JornadaTimeline desenha jornadas (planejada/individual/padrão) como uma
trilha pontilhada vermelha vertical à esquerda, com nós (passos)
contendo número amarelo grande, descrição sans, badges, tempo mono.
Em individual: X vermelho sobre passos que desviaram (replicar X da
peça TRILHA COMUM), loops em repetições, saídas da trilha em passos
extras. Botão "Reproduzir jornada" anima a trilha sendo traçada
(stroke-dasharray SVG), proporcional a tempo_segundos, max 8s.

3 estados a desenhar:
(a) trilha estática completa
(b) trilha em meio do replay (parte traçada vermelha sólida, parte
    ainda pontilhada cinza, passo ativo com ring amarelo)
(c) trilha individual com 1 desvio (X) e 1 repetição (loop)

POLISH GLOBAL:
- Page transitions sutis (fade + slide-up 6px, 320ms, easing
  cubic-bezier(0.22, 1, 0.36, 1)).
- Staggered reveals em listas (40ms gap, 80ms delay).
- Hover refinement em botões/linhas (200ms).
- Watercolor splatter aparece com fade lento (600ms) em momentos
  celebratórios (questionário concluído, jornada validada).
- Biblioteca: motion.dev (sucessor Framer Motion).
- prefers-reduced-motion sempre respeitado.

ENTREGÁVEIS por tela:
- Claro E escuro lado a lado.
- Com dados E vazio.
- Desktop (≥1280px) E mobile (375px).
- Frames-chave de motion onde aplicável.
- Nome de componente novo + props sugeridas.

Telas em ordem:
1. /processos/[id] — 7 etapas como TRILHA vertical numerada (números
   amarelos grandes, conexão pontilhada vermelha entre etapas).
2. /processos/[id]/jornada-planejada — toggle tabela/timeline; timeline
   como trilha pontilhada.
3. /processos/[id]/jornadas-individuais/[jornadaId] — timeline mostrando
   desvios (X), repetições (loop), passos extras.
4. /processos/[id]/jornadas/[jornadaId]/questionario/[codigo] —
   cabeçalho handlettered em moldura sketch.
5. /processos/[id]/resultados — Recharts paleta FCINCO + watercolor
   splatter em header + ícone barreira amarelo/preto nos críticos.

VOZ:
- Português brasileiro institucional, sóbrio com calor humano.
- Termos F5 exatos: jornada planejada/individual/padrão, passo, barreira,
  impacto, necessidade, carga cognitiva, consequência, emoção.
- Imperativo claro estilo gov.br.
- "Sem dado" em itálico — nunca heurística.

ANTI-PADRÕES (vetar):
- Estética genérica Tailwind+shadcn neutra (atual — precisa ELEVAR).
- Inter, Roboto, Arial, Space Grotesk.
- Gradientes roxo→rosa.
- Material Design / Google.
- Watercolor "AI-generated" óbvio (manter coerência com /IMAGENS/).
- Excesso de ilustração em telas densas (questionários, editores).
- Pesquisa institucional virar "site marketing colorido".
```

## Prompts iterativos (um por turno)

### Hub do processo como Trilha
```
Refine /processos/[id]. 7 etapas dispostas como TRILHA vertical
inspirada em "TRILHA COMUM" das IMAGENS/. Cada etapa: número grande
amarelo mostarda Bebas Neue (01..07), descrição sans, status chip
pequeno em mono. Entre etapas: pontilhada vermelha #C8252A conectando.
Concluídas: pontilhada sólida. Pendentes: linha mais clara. Stagger
de entrada.
```

### Timeline planejada (revelada)
```
Refine JornadaTimeline planejada, 6 passos, estado revelado estático.
Trilha pontilhada vermelha vertical à esquerda. Cada nó: círculo
vermelho sólido + número amarelo mostarda dentro + linha curta até
card do passo (descrição sans, pills coloridas categoria/tipo F5,
tempo mono). Hover revela ações. Claro E escuro.
```

### Timeline individual (replay com desvio)
```
JornadaTimeline individual no meio do replay. 8 passos, tocando passo
4. Trilha vermelha sendo "desenhada" (stroke-dasharray SVG animado).
Passos 1-3 conectados linha sólida; passo 4 ring amarelo pulsante;
5-8 linha cinza-clara (não-traçada). Passo 2 com X vermelho sobreposto
= desvio (replicar X da TRILHA COMUM). Passo 6 com loop redondo =
repetição. Controle replay flutuante + timer.
```

### Questionário matriz handlettered
```
Refine questionário barreiras (matriz). Cabeçalho "DIMENSIONAMENTO DE
BARREIRAS" handlettering em moldura sketch frame (estilo "COMO
FUNCIONA" das IMAGENS/). 14 critérios em <details>. Aberto: passos +
botões 1-5 mono + N/A + textarea. Auto-save indicator. Sticky footer
botão Concluir verde teal FCINCO.
```

### Resultados FCINCO
```
Refine /resultados. Header moldura sketch handlettered "RESULTADOS" +
watercolor splatter amarelo atrás. 4 seções Recharts: barreiras em
vermelho #C8252A, impactos azul, tempos verde teal #1FB597. Critérios
com média ≥ 4 ganham ícone barreira amarelo/preto (das IMAGENS/) à
direita. "Sem dado" itálico cinza onde falta.
```

### Empty state celebratório
```
Estado vazio /processos quando user sem processos: ilustração
watercolor pequena pessoa olhando mapa (estilo TRILHA COMUM), título
handlettering "COMECE UMA PESQUISA", parágrafo convidativo curto, CTA
verde teal "Novo processo". Sem ilustração 3D abstrata genérica.
```

### Mobile
```
Adapte para 375px mantendo identidade FCINCO. Tabelas → cards stack.
Sidebar → drawer. Modal "Anexar print" tela inteira. Touch ≥ 44px.
Handlettering e numeração amarela ESCALAM (não somem). Watercolor
splatters reduzem mas permanecem.
```

## Verificação rápida

- [ ] Verde teal #1FB597 institucional aparece (não roxo, não azul Tailwind).
- [ ] Amarelo mostarda #F4B400 em numeração.
- [ ] Vermelho watercolor #C8252A em trilhas (não só botão destructive).
- [ ] Handlettering em ao menos 1 título (Patrick Hand ou similar).
- [ ] Moldura sketch frame em headers.
- [ ] Trilha pontilhada como JornadaTimeline.
- [ ] Estado replay com trilha sendo traçada.
- [ ] Claro E escuro.
- [ ] Mobile.
- [ ] Termos F5 corretos.
- [ ] Zero AI-slop / Inter / gradientes roxos.

Se falhar: prompt corretivo apontando o problema literal.

## Trazendo os mockups para o código

1. Salvar em `design/mockups/`.
2. Validar com Janaina/Wendel (identidade FCINCO é deles).
3. Implementação em branch separada, fatiada:
   - **A** — tokens (Patrick Hand + Bebas Neue + Geist + JetBrains Mono via
     next/font/google) + paleta FCINCO em CSS vars + motion.dev.
   - **B** — `<JornadaTrilha>` (componente principal).
   - **C** — polish global + assets watercolor de IMAGENS/ copiados para
     `web/public/fcinco/`.
   - **D** — process map do hub.

Os PNGs/JPGs de IMAGENS/ são assets públicos do gov.br (conferir licença
antes de usar em produção — costuma ser CC-BY ou Marca do Governo).
