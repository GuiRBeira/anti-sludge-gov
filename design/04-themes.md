# 04 — Temas (Claro / Escuro / Sistema) — FCINCO

O produto suporta três modos via `<ThemeProvider>` local
([`web/components/theme-provider.tsx`](../web/components/theme-provider.tsx)):

- `light` — papel off-white (#FBFAF6), sensação de caderno de pesquisa
- `dark` — off-black papel (#1A1815)
- `system` — segue `prefers-color-scheme` do SO

A preferência é salva em `localStorage` (`theme`). A classe `.dark` é
alternada em `<html>` e o Tailwind aplica utilitários `dark:*`.

## Filosofia da paleta — FCINCO

Cor não é decoração — é **identidade institucional + significado
metodológico**. As cores não-neutras vêm da identidade FCINCO existente
em `/IMAGENS/`:

- Verde teal **(#1FB597)**: a cor de marca da FCINCO (banner principal).
  Usar em: header bands, botões primários raros, links destacados, status
  "validada"/"concluído".
- Amarelo mostarda **(#F4B400)**: numeração display grande das etapas
  ("01"..."07" do hub do processo). Usar em: números de ordem, badges
  de progresso, ênfase em métricas-chave.
- Vermelho watercolor **(#C8252A)**: a **trilha da jornada** — vinda da
  peça "TRILHA COMUM". Usar em: linha conectora vertical da
  JornadaTimeline, X de desvio, ícones de barreira.
- Off-white papel **(#FBFAF6)**: background principal. Não branco puro
  — quente, com sensação de papel.
- Ink preto **(#1A1A1A)**: linework de ilustrações, texto principal.

## Variáveis CSS (a aplicar em globals.css)

### Light mode (papel)

```css
:root {
  /* Base — papel caderno */
  --background: 48 30% 97%;          /* #FBFAF6 off-white quente */
  --foreground: 0 0% 10%;            /* #1A1A1A ink */
  --card: 0 0% 100%;                 /* branco puro p/ contraste */
  --card-foreground: 0 0% 10%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 10%;

  /* Marca FCINCO */
  --primary: 167 71% 41%;            /* #1FB597 verde teal */
  --primary-foreground: 0 0% 100%;
  --accent: 45 96% 48%;              /* #F4B400 amarelo mostarda */
  --accent-foreground: 0 0% 10%;

  /* Secundário e muted */
  --secondary: 48 20% 92%;           /* papel mais escuro */
  --secondary-foreground: 0 0% 10%;
  --muted: 48 15% 90%;
  --muted-foreground: 0 0% 35%;

  /* Estados */
  --destructive: 358 67% 47%;        /* #C8252A vermelho watercolor */
  --destructive-foreground: 0 0% 100%;

  /* Linhas */
  --border: 48 10% 85%;
  --input: 48 10% 85%;
  --ring: 167 71% 41%;               /* foco em verde teal */

  --radius: 0.5rem;

  /* Tokens FCINCO específicos */
  --trilha: 358 67% 47%;             /* vermelho da trilha #C8252A */
  --trilha-muted: 358 30% 75%;       /* vermelho dessaturado (não-traçado) */
  --numero: 45 96% 48%;              /* amarelo dos números */
  --papel: 48 30% 97%;
  --ink: 0 0% 10%;
}
```

### Dark mode (papel queimado)

```css
.dark {
  --background: 40 8% 9%;            /* #1A1815 off-black quente */
  --foreground: 48 30% 95%;
  --card: 40 6% 12%;
  --card-foreground: 48 30% 95%;
  --popover: 40 6% 12%;
  --popover-foreground: 48 30% 95%;

  /* Marca preservada */
  --primary: 167 71% 50%;            /* teal um pouco mais saturado */
  --primary-foreground: 40 8% 9%;
  --accent: 45 96% 55%;              /* amarelo mantém saturação */
  --accent-foreground: 40 8% 9%;

  --secondary: 40 5% 16%;
  --secondary-foreground: 48 30% 95%;
  --muted: 40 5% 16%;
  --muted-foreground: 48 10% 65%;

  --destructive: 358 67% 55%;
  --destructive-foreground: 0 0% 100%;

  --border: 40 5% 20%;
  --input: 40 5% 20%;
  --ring: 167 71% 50%;

  --trilha: 358 67% 55%;
  --trilha-muted: 358 20% 35%;
  --numero: 45 96% 55%;
  --papel: 40 8% 9%;
  --ink: 48 30% 95%;
}
```

## Acentos semânticos F5 (constantes nos dois modos)

| Função | Light | Dark | Origem |
|---|---|---|---|
| Validada / Concluído | bg `green-100` text `green-900` ou verde teal FCINCO | bg `green-950/40` text `green-200` | metodologia + FCINCO |
| Pendente / Atenção | bg `amber-100` text `amber-900` | bg `amber-950/40` text `amber-200` | amarelo mostarda família |
| Erro / Trilha | usar `--destructive` (vermelho FCINCO) | mesmo | FCINCO |
| Em progresso | bg `teal-100` text `teal-900` | bg `teal-950/40` text `teal-200` | verde teal família |
| Desvio | bg `orange-100` text `orange-900` | bg `orange-950/40` text `orange-200` | F5 — distinguir de barreira |
| Repetição | bg `purple-100` text `purple-900` | bg `purple-950/40` text `purple-200` | F5 |
| Print anexado | bg `teal-50` text `teal-700` border `teal-300` | bg `teal-950/40` text `teal-200` border `teal-800` | reuso teal FCINCO |

## Cores de gráficos (Recharts)

| Série | Cor | Origem |
|---|---|---|
| Barreira | `#C8252A` vermelho watercolor | FCINCO trilha |
| Impacto | `#3b82f6` blue-500 | F5 metodologia |
| Tempo | `#1FB597` verde teal | FCINCO marca |
| Necessidade | `#F4B400` amarelo mostarda | FCINCO ênfase |

Constantes em ambos os temas para preservar significado.

## Tokens visuais específicos FCINCO

Além das CSS vars de cor, alguns tokens descrevem **elementos visuais
da identidade** que serão implementados como componentes ou assets:

- `--sketch-border`: imagem de moldura sketchy (4 cantos + lados) usada
  em headers H1 de seção (replica "COMO FUNCIONA"). Implementar como
  `<SketchFrame>` componente que aceita `children`.
- `--sketch-underline`: imagem de underline sketchy orgânico para usar
  abaixo de títulos H2. Pequenas variações para evitar repetição óbvia.
- `--watercolor-yellow-splatter`: PNG transparente para background de
  headers celebratórios.
- `--trilha-stroke-dasharray`: `4 6` (4px traço, 6px gap) — padrão da
  pontilhada vermelha de jornadas.

## Diretrizes

- **Verde teal #1FB597 é a marca** — usar com parcimônia, como o gov.br
  usa o azul: header principal, status "validada", ações primárias raras.
- **Amarelo mostarda #F4B400 é para números** — não usar como botão
  primário (vira poluição visual).
- **Vermelho watercolor #C8252A é para trilhas e barreiras** — não usar
  como mensagem de erro genérica (use `--destructive` que aponta para o
  mesmo valor mas semanticamente é "perigo metodológico", não "erro de
  sistema"). Para erros de sistema (form validation), usar cinza-vermelho
  mais neutro.
- **Watercolors são tempero** — só em headers de página/seção e empty
  states celebratórios. Nunca em corpo de tabela.
- **Testar contraste em ambos os modos** — o papel off-white #FBFAF6
  com ink #1A1A1A dá ratio ~17:1, ótimo. O off-black com off-white
  invertido também.

## FOUT conhecido

Permanece. Mitigação opcional: `html { color-scheme: dark; }` quando dark
for default. Aceitar trade-off por enquanto.
