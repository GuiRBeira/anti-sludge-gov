# 04 — Temas (Claro / Escuro / Sistema)

O produto suporta três modos via `<ThemeProvider>` local
([`web/components/theme-provider.tsx`](../web/components/theme-provider.tsx)):

- `light` — fundo branco
- `dark` — fundo quase-preto
- `system` — segue `prefers-color-scheme` do SO

A preferência é salva em `localStorage` (`theme`). A classe `.dark` é
alternada em `<html>` e o Tailwind aplica utilitários `dark:*` em cima.

## Filosofia da paleta

Tons neutros + acentos semânticos. Sem cor de marca espalhada — o produto
é institucional. A cor só aparece quando carrega significado.

## Variáveis CSS (já definidas em globals.css)

### Light mode

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 96.1%;
  --secondary-foreground: 0 0% 9%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  --accent: 0 0% 96.1%;
  --accent-foreground: 0 0% 9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: 0 0% 3.9%;
  --radius: 0.5rem;
}
```

### Dark mode

```css
.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --card: 0 0% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 0 0% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 0 0% 9%;
  --secondary: 0 0% 14.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  --accent: 0 0% 14.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 14.9%;
  --input: 0 0% 14.9%;
  --ring: 0 0% 83.1%;
}
```

## Acentos semânticos (constantes nos dois temas)

| Função | Light | Dark |
|---|---|---|
| Sucesso/Validado | bg `green-100` / text `green-900` | bg `green-950/40` / text `green-200` |
| Atenção/Pendente | bg `amber-100` / text `amber-900` | bg `amber-950/40` / text `amber-200` |
| Erro | bg `red-50` / text `red-600` border `red-200` | bg `red-950/30` / text `red-600` border `red-900` |
| Em progresso | bg `blue-100` / text `blue-900` | bg `blue-950/40` / text `blue-200` |
| Desvio | bg `orange-100` / text `orange-900` | bg `orange-950/40` / text `orange-200` |
| Repetição | bg `purple-100` / text `purple-900` | bg `purple-950/40` / text `purple-200` |
| Print anexado | bg `blue-50` / text `blue-700` border `blue-300` | bg `blue-950/40` / text `blue-200` border `blue-800` |

## Cores de gráficos (Recharts)

| Série | Cor | Hex |
|---|---|---|
| Barreira | red-500 | `#ef4444` |
| Impacto | blue-500 | `#3b82f6` |
| Tempo | emerald-500 | `#10b981` |

Essas cores são constantes em ambos os temas para evitar reinterpretação
do significado (vermelho ainda significa barreira no dark mode).

## Diretrizes

- **Não use cor para hierarquia** (peso/tamanho da fonte fazem isso).
- **Não invente nova cor** sem mapear para função semântica.
- **Teste contraste em ambos os modos** — alguns tons claros perdem
  legibilidade no dark sem ajuste de opacidade.
- **Foco visível** (`focus-visible:ring-1 focus-visible:ring-ring`) é
  obrigatório em todo interativo.

## FOUT conhecido

Por escolha de não injetar `<script>` inline (CSP mais limpa), há um
pequeno flash de tema na primeira renderização. Aceito como trade-off de
segurança. Se virar dor real, mitigar com `html { color-scheme: dark; }`
default ou inline script controlado.
