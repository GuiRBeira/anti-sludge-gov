# 03 — Design System (FCINCO-aligned)

Tokens e componentes. Implementação em [`web/components/ui/`](../web/components/ui/)
(shadcn/ui customizado) + componentes próprios FCINCO + variáveis CSS em
[`web/app/globals.css`](../web/app/globals.css).

A direção visual é descrita em [`04-themes.md`](./04-themes.md) e
ancorada nos assets reais da FCINCO em [`../IMAGENS/`](../IMAGENS/).

## Tipografia

Quatro famílias com papéis estritos. **Não misture**.

| Família | Papel | Onde usa | Tamanhos | Origem |
|---|---|---|---|---|
| Patrick Hand (ou Caveat) | **Handlettering** | H1 de páginas-chave (`Comece uma pesquisa`, `Resultados`), seções principais em moldura sketch frame | 36-56px (titulo de página), 24-32px (seções) | replica "COMO FUNCIONA" das IMAGENS/ |
| Bebas Neue (ou Archivo Black) | **Display bold condensed amarelo** | Números de ordem (01..07 etapas, 01..N passos, P01..N participantes) | 48-72px (etapa do hub), 28-40px (passo da timeline), 18-24px (badge) | replica "01"/"03"/"05" das IMAGENS/ |
| Geist Sans | **UI sans neutro** | Corpo, formulários, tabelas, navegação, descrições | 16 (corpo), 14 (sm), 12 (xs) | já presente |
| JetBrains Mono | **Mono tabular** | Tempo (`12s`), contadores (`5/8`), códigos curtos não-grandes, status mono (`PENDENTE`) | 13-14 com `tabular-nums` | adicionar |

### Hierarquia recomendada por tela

- **H1 de página** (`Comece uma pesquisa`, `Resultados`): Patrick Hand 48px
  dentro de `<SketchFrame>`.
- **H2 de seção** (`Compreensão do contexto`, `Status metodológico`):
  Geist Sans 20px semibold + opcional `<SketchUnderline>` orgânico abaixo.
- **H3 de subseção**: Geist Sans 16px medium.
- **Corpo**: Geist Sans 16.
- **Meta** (timestamps, contagens): JetBrains Mono 13 tabular.
- **Status pill**: JetBrains Mono 10-11 uppercase tracking-wider.

## Espaçamento

| Token | px | Uso |
|---|---|---|
| `gap-1` | 4 | botões agrupados |
| `gap-2` | 8 | itens inline em flex |
| `gap-3` | 12 | grade compacta |
| `gap-4` | 16 | espaçamento padrão de formulário |
| `gap-6` | 24 | seções dentro de uma página |
| `gap-8` | 32 | seções principais (página de resultados) |
| `gap-12` | 48 | entre H1 handlettering e conteúdo |

Padding interno: `p-3` (compacto), `p-5` (padrão), `p-6/p-8` (landing/hero).

## Cores — ver `04-themes.md`

Resumo:
- Verde teal **#1FB597** = marca FCINCO (primary).
- Amarelo mostarda **#F4B400** = numeração e ênfase (accent).
- Vermelho watercolor **#C8252A** = trilhas e barreiras (destructive/trilha).
- Off-white papel **#FBFAF6** / Off-black papel **#1A1815** = backgrounds.
- Ink **#1A1A1A** = linework e texto.

## Componentes shadcn já presentes

Mantidos. Adaptar visualmente com novos tokens, sem trocar API:

- `Button` (variantes `default`, `outline`, `ghost`, `destructive`)
- `Input`, `Textarea`, `Label`
- `Select` (Radix)
- `Card`
- `Table`
- `DropdownMenu`
- `Badge`
- `Checkbox`

## Componentes específicos FCINCO (a criar)

### `<SketchFrame>`
Moldura de cantos sketchy para envolver H1 de páginas-chave. Replica
visual de "COMO FUNCIONA" / "RELATÓRIOS" das IMAGENS/.

- Props: `children`, `as?: 'h1' | 'h2'`, `intensity?: 'light' | 'normal'`.
- Implementação: SVG inline com 4 cantos + bordas com traço orgânico
  (paths irregulares, `stroke-linecap="round"`, `stroke-dasharray`
  variando). Cores via CSS var `--ink`. Pode ter 2-3 variações para evitar
  repetição idêntica em página com várias instâncias.

### `<SketchUnderline>`
Underline orgânico para H2/H3 selecionados.

- Props: `variant?: 'short' | 'long' | 'scribble'`.
- SVG inline ~120-240px de largura.

### `<NumeroEtapa>`
Número grande amarelo mostarda para etapas/ordens.

- Props: `value: number | string`, `size?: 'xl' | 'lg' | 'md'`.
- Bebas Neue (font-display do Tailwind), cor `text-[var(--numero)]`,
  `font-bold`. Padding negativo para "saltar fora" do alinhamento.

### `<TrilhaJornada>` (principal feature)
Renderiza a timeline da jornada como trilha pontilhada vermelha vertical.

- Props: `passos: PassoComTipo[]`, `mode: 'planejada' | 'individual' | 'padrao'`,
  `replayState?: { activeIndex, progressPct }`, `readOnly?: boolean`,
  `passosPlanejados?: { id, ordem, descricao }[]`, callbacks de edição.
- Layout: SVG ou flex column com `<line>`/`<circle>` SVG + cards HTML
  posicionados absolutos. Pontilhada vermelha com
  `stroke-dasharray: 4 6`. Cada nó é círculo vermelho com número amarelo
  por cima. Animação de "traçar" usa `stroke-dashoffset` interpolado.
- Marcações na individual: `<X>` SVG sobreposto = desvio,
  `<Loop>` SVG = repetição, saída lateral = passo extra (não-vinculado).

### `<StatusPill>`
Pill pequena uppercase em mono.

- Props: `tone: 'pendente' | 'em_progresso' | 'concluido' | 'validada' | 'desvio' | 'repeticao'`,
  `children`.
- 10-11px JetBrains Mono uppercase tracking-wider, padding 2px 8px,
  rounded-full, cores da tabela em `04-themes.md`.

### `<WatercolorSplatter>`
Wrapper para colocar splatter PNG amarelo atrás de um header.

- Props: `children`, `intensity?: 'subtle' | 'normal'`, `position?: 'left' | 'center' | 'right'`.
- Imagem das IMAGENS/ servida via `<Image>` Next, `opacity-30`, `mix-blend-multiply`
  (light) / `screen` (dark), absoluto atrás do `children`.

## Componentes específicos do produto (já existentes)

- `<EtapaResumo>` (hub do processo) — refazer com `<NumeroEtapa>` + trilha
  pontilhada conectando.
- `<PassoScreenshot>` (modal de paste) — manter como está.
- `<QuestionarioRow>` — header da página recebe `<SketchFrame>`; corpo
  permanece denso.
- `<GraficoMediaCriterios>` — cores FCINCO no preenchimento das barras.

## Tokens de raio e border

- `rounded-md` (6px) — botões, inputs.
- `rounded-lg` (8px) — cards de seção.
- `rounded-full` — pills, números circulares da trilha.
- Border default: 1px sólido `--border`.

## Sombras

Continuam quase ausentes. Apenas `shadow-md` em popovers/dropdowns
flutuantes. Não usar sombra em headers handlettering — a moldura sketch
já dá a presença visual.

## Iconografia

- **Lucide React** para ícones funcionais (Edit, Trash, Chevron, etc.) —
  16-20px, herdam cor do texto.
- **SVGs FCINCO** para ícones simbólicos (barreira amarelo/preto, mapa,
  lupa) — copiar dos PNGs das IMAGENS/ recortados, ou pedir ao Claude
  Design para gerar SVGs vetorizados consistentes.

## Motion (resumo)

Detalhado em `04-themes.md` na seção de motion. Camada fina:

- Easing padrão: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Durações: hover 200ms, reveal 400ms, page 600ms, replay trilha proporcional
  a `tempo_segundos` (max 8s).
- Biblioteca: `motion.dev` (sucessor Framer Motion) com `LazyMotion`.
- `prefers-reduced-motion` sempre respeitado.

## Anti-padrões — lista FCINCO-específica

- **Não** colocar handlettering em corpo de tabela. Cansa.
- **Não** usar verde teal #1FB597 como cor de botão "padrão" de todo lugar.
  Vira poluição. Reservar para ações primárias raras.
- **Não** colocar watercolor de fundo em página inteira. Distrai do
  trabalho.
- **Não** abandonar a paleta FCINCO em favor de cores "mais bonitas". A
  identidade é deles.
- **Não** misturar trilha pontilhada vermelha em contexto que não seja
  jornada — ela tem semântica.
