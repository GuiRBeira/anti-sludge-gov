# 03 — Design System

Tokens e componentes. Implementação em [`web/components/ui/`](../web/components/ui/)
(shadcn/ui customizado) e variáveis CSS em
[`web/app/globals.css`](../web/app/globals.css).

## Tipografia

- **Família**: Geist Sans (já configurada via `next/font/google`).
- **Tamanhos**:
  - `text-2xl` (24px, semibold) — título de página
  - `text-lg`  (18px, medium)   — título de seção
  - `text-base`(16px, regular)  — corpo
  - `text-sm`  (14px, regular)  — corpo secundário, células de tabela
  - `text-xs`  (12px, regular)  — metadados, helper, status
- **Line-height**: 1.5 corpo, 1.25 títulos.
- **Peso**: 400 (regular), 500 (medium), 600 (semibold). Sem bold puro
  (700) em corpo.

## Espaçamento (Tailwind tokens)

| Token | px | Uso |
|---|---|---|
| `gap-1` | 4 | botões agrupados |
| `gap-2` | 8 | itens inline em flex |
| `gap-3` | 12 | grade compacta |
| `gap-4` | 16 | espaçamento padrão de formulário |
| `gap-6` | 24 | seções dentro de uma página |
| `gap-8` | 32 | seções principais (página de resultados) |

Padding interno de containers: `p-3` (compacto), `p-5` (padrão), `p-6/p-8`
(landing).

## Cores semânticas

| Função | Light | Dark | Onde |
|---|---|---|---|
| Background | `0 0% 100%` | `0 0% 3.9%` | `--background` |
| Foreground | `0 0% 3.9%` | `0 0% 98%` | texto principal |
| Muted | `0 0% 96%` | `0 0% 14.9%` | superfícies secundárias |
| Border | `0 0% 89.8%` | `0 0% 14.9%` | dividers, inputs |
| Primary | `0 0% 9%` | `0 0% 98%` | botão principal |
| Sucesso | `green-600` | `green-200/40` bg | jornada validada, salvo |
| Atenção | `amber-600` | `amber-200/40` bg | pendência, "não salvo" |
| Erro | `red-600` | `red-200/40` bg | mensagens de erro |
| Barreira | `red-500` (`#ef4444`) | mesmo | gráficos de barreira |
| Impacto | `blue-500` (`#3b82f6`) | mesmo | gráficos de impacto |
| Tempo | `emerald-500` (`#10b981`) | mesmo | gráficos de tempo |

Paleta completa em [`04-themes.md`](./04-themes.md).

## Componentes base (shadcn/ui já presentes)

- **Button**: variantes `default`, `outline`, `ghost`, `destructive`.
  Tamanhos `sm` (h-8), `default` (h-9), `lg` (h-10), `icon` (h-9 w-9).
- **Input**: h-9, border, focus-ring de 1px.
- **Textarea**: min-h-[80px], mesmo tratamento de border/focus.
- **Select** (Radix): dropdown nativo estilizado, suporte a grupo.
- **Card**: container com border + padding, sem sombra exagerada.
- **Table**: linhas com border-b, hover sutil, sem zebra striping.
- **DropdownMenu**: portal, radio group para seleção (theme switcher).
- **Label**: 14px medium, sempre presente para inputs.
- **Badge**: pill 12px, variantes de cor semânticas.
- **Checkbox** (Radix): com indicador visível.

## Componentes específicos do produto

### EtapaResumo (status item)
- Ícone (◯/◐/✓) + título + descrição + detalhe + chevron.
- Hover: bg muted/40.
- Estado disabled (futuro): opacity 60, cursor not-allowed.

### StatusPill
- Pequena (text-xs px-2 py-0.5 rounded-full).
- Variantes: `pendente` (muted), `em_progresso` (blue-100/950), `concluido`
  (green-100/950), `validada` (green), `consentido` (green), `desvio`
  (orange), `repeticao` (purple).

### PassoScreenshot
- Botão icon 28×28 numa coluna de tabela. Estado vazio = ícone clipe,
  estado preenchido = ícone imagem azul.
- Modal full-overlay (bg-black/60) com área de paste/drop 100% wide.
- Salvamento automático no paste; feedback inline.

### QuestionarioRow
- Pergunta colapsável (`<details>`) com lista de passos por baixo.
- Cada linha: descrição do passo + botões 1-5 (toggle), checkbox N/A,
  textarea inline, indicador de status (✓/salvando…/não salvo).
- Sticky footer com botão Concluir/Reabrir.

### GraficoMediaCriterios
- BarChart horizontal (Recharts), domínio 0-5.
- Cor por dimensão (vermelho/azul).
- Critérios sem dado expostos em `<details>` colapsável abaixo do gráfico.

## Tokens de raio e border

- `rounded-md` (6px) — botões, inputs, cards pequenos
- `rounded-lg` (8px) — containers principais (cards de seção)
- `rounded-full` — pills/badges/avatares
- Border default: 1px sólido `--border`.

## Sombras

Quase ausentes. Apenas `shadow-md` em popovers/dropdowns flutuantes para
desambiguar plano. Sem sombras em cards de conteúdo (a border resolve).

## Iconografia

Lucide React. Tamanho default 16px (`h-4 w-4`), 20px em headers
(`h-5 w-5`). Sem cores próprias — herdam do texto. Apenas StatusIcon
recebe cor por estado.

## Motion

Apenas `transition-colors` no hover (150ms). Sem animação de entrada/saída
em modais (acessibilidade > efeito). Excepção futura: tooltips e popovers
podem ter `fade` curto.
