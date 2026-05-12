# 06 — Responsivo

O Anti-Sludge Gov é primariamente **desktop-first** — é ferramenta de
trabalho, equipe FCINCO usa em monitores. Mas precisa funcionar bem em
tablet (10"+) e ser **utilizável** em celular (não primário).

## Breakpoints (Tailwind padrão)

| Token | Min width | Cenário |
|---|---|---|
| (default) | 0 | smartphone retrato |
| `sm:` | 640px | smartphone paisagem / tablet pequeno |
| `md:` | 768px | tablet retrato |
| `lg:` | 1024px | tablet paisagem / laptop pequeno |
| `xl:` | 1280px | desktop padrão |
| `2xl:` | 1536px | monitor grande |

## Diretrizes por tipo de tela

### Sidebar (`app/(app)/layout.tsx`)

- **≥ md**: visível, fixa 256px à esquerda.
- **< md**: **a implementar** — virar drawer aberto por botão hambúrguer
  no topo. Hoje em mobile ela ocupa metade da tela (problema conhecido).

Solução proposta:
```tsx
// pseudocódigo
<aside className="hidden md:flex md:w-64 ...">...</aside>
<MobileTopbar />  // < md: topbar com hambúrguer abrindo drawer
```

### Tabelas (jornadas, participantes, processos)

- **≥ lg**: tabela completa visível.
- **md ↔ lg**: scroll horizontal no container (`overflow-x-auto`, já
  presente).
- **< md**: tabela vira lista de cards stack vertical. Cada linha = um
  card com label/valor empilhados. **A implementar.**

### Formulários

- **≥ md**: até 2 colunas (`grid-cols-1 md:grid-cols-2`).
- **< md**: 1 coluna sempre. Já funciona.

### Editores de jornada

- A linha "ações" tem 3-5 botões pequenos. Em mobile, agrupar em um menu
  ⋯ (dropdown) ao invés de mostrar todos.
- O select de "vinculado a planejado" precisa de espaço — em < md, mover
  para uma linha separada abaixo da descrição.

### Modais (PassoScreenshot)

- **≥ sm**: 640px max-width, centralizado.
- **< sm**: ocupar 100% da tela com padding pequeno. Drop zone com 60vh
  altura.

### Resultados / gráficos

- Recharts já é responsivo via `<ResponsiveContainer>`. Em mobile, o
  rótulo do eixo Y (nomes de critério) precisa de truncamento + tooltip.
- Empilhar seções; nunca side-by-side em mobile.

### Tela do processo (status metodológico)

- Linha de cada etapa em mobile: ícone + título empilhado com detalhe
  abaixo (a coluna `detalhe` à direita some em `< sm`).
- Atualmente: `<div className="hidden sm:block">` já oculta. ✓

## Touch targets

Mínimo 32×32px em desktop, **44×44px** em mobile (Apple HIG / WCAG 2.5.5).

Aplicar em:
- Botões `size="icon"` → atualmente h-9 (36px). Em mobile, aumentar para
  h-11 (44px) via `md:h-9 h-11`.
- Toggle pills (obrigatório, desvio, repetição) → considerar substituir
  por checkboxes em mobile.

## Tipografia responsiva

Manter os mesmos tokens. Somente o título de página pode reduzir:
- `text-2xl md:text-2xl` (24px) — mantém
- Não reduzir abaixo de 14px em corpo.

## Densidade adaptativa

- **Desktop**: `py-2` em células de tabela.
- **Mobile (modo cards)**: `py-3` entre campos do card.

## Print (impressão)

Fora do escopo do MVP, mas planejar:
- Esconder sidebar e botões.
- Tabelas com `print-friendly` styling.
- Gráficos exportados como SVG (Recharts já gera SVG).

## Conhecidos a fazer

- [ ] Mobile topbar + drawer da sidebar (`< md`).
- [ ] Cards no lugar de tabelas em `< md`.
- [ ] Menu ⋯ para ações de linha em mobile.
- [ ] Aumentar touch targets em mobile.
- [ ] Smoke test em 360×640 (Android baseline).
