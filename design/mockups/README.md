# design/mockups/ — Saída do Claude Design

Cole aqui o código exportado do Claude Design (claude.ai/design).

## Estrutura sugerida

Crie um arquivo por artboard/screen + um arquivo para os primitives compartilhados:

```
design/mockups/
├── README.md                    (este arquivo)
├── theme.css                    Tokens CSS (cores, fonts, motion) extraídos
├── primitives.tsx               Todos os primitives reutilizáveis:
│                                <SketchFrame>, <SketchUnderline>,
│                                <NumeroEtapa>, <TrilhaJornada>,
│                                <StatusPill>, <BarreiraIcon>,
│                                <DesvioX>, <LoopRepeticao>,
│                                <WatercolorSplatter>
├── 01-hub.tsx                   Screen 1 — Hub /processos/[id]
├── 02-jornada-planejada.tsx     Screen 2 — Timeline planejada
├── 03-jornada-individual.tsx    Screen 3 — Replay com desvio + repetição
├── 04-questionario.tsx          Screen 4 — Matriz handlettered
├── 05-resultados.tsx            Screen 5 — Recharts paleta FCINCO
└── 06-empty.tsx                 Empty state celebratório
```

Pode salvar como `.tsx` mesmo que tenha JSX bruto sem imports — o que
importa é preservar a estrutura para eu adaptar para o app.

## Como exportar do Claude Design

1. Abra o documento no claude.ai/design (você já tem a sessão F5-ANTISLUDGE).
2. No canto superior direito, clique em **"Edit"** — abre o painel de código
   do artboard atualmente selecionado.
3. Copie o **JSX completo** + **CSS** + **theme tokens** desse artboard.
4. Cole no arquivo correspondente acima.
5. Repita para cada artboard.

Alternativa via "Share":
- Botão **"Share"** → ver se há opção de export/download.
- Se não houver, copiar manualmente um por vez é o caminho.

## Screenshots adicionais

Se quiser, salve também os PNGs de cada artboard em
`design/mockups/screenshots/` para referência visual quando eu adaptar
(útil quando o JSX tem SVGs longos e fica difícil "ver" o resultado).

## O que eu vou fazer depois

Quando você confirmar que está tudo aqui, eu:

1. Crio `web/components/fcinco/` com os primitives adaptados (props
   tipadas, integração com tema, motion.dev).
2. Adiciono fontes (Patrick Hand + Bebas Neue + JetBrains Mono) via
   `next/font/google` em `web/app/layout.tsx`.
3. Atualizo `web/app/globals.css` com os tokens FCINCO (já documentados em
   `design/04-themes.md`).
4. Atualizo `web/tailwind.config.ts` com fontFamily display/sans/mono.
5. Instalo `motion` (motion.dev).
6. Refaço uma tela por vez, mantendo o editor antigo (tabela) acessível
   via toggle de visualização para não quebrar fluxo de quem já está
   usando.
7. Testo `pnpm build` a cada fatia.
8. Commit + push.

Validamos a aparência depois, e iteramos via prompt no Claude Design se
faltar refinamento.
