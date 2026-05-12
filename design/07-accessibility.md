# 07 — Acessibilidade (WCAG 2.1 AA · gov.br DS)

Conformidade alvo: **WCAG 2.1 nível AA**, conforme exigido pelo
[Padrão Mínimo gov.br DS](./gov-br-ds/padrao-minimo.md).

## Estado atual

Auditoria de código feita em 2026-05-12 após Fatias 1–5 do alinhamento
gov.br. Resultados abaixo, com origem e ação tomada.

### Implementado

| Item | Onde | Origem WCAG |
|---|---|---|
| `lang="pt-BR"` no `<html>` | [layout.tsx](../web/app/layout.tsx) | 3.1.1 |
| Skip-to-content visível ao foco | [(app)/layout.tsx](../web/app/(app)/layout.tsx) | 2.4.1 |
| Heading hierarchy semântica (um h1 por página, h2/h3 dentro) | Páginas de processo/jornada/contexto | 1.3.1 · 2.4.6 |
| `<header>` / `<main>` / `<footer>` landmarks | `GovBrHeader`, `(app)/layout.tsx`, `GovBrFooter` | 1.3.1 |
| Focus ring de 2px com offset (contraste 3:1) | [button.tsx](../web/components/ui/button.tsx), [input.tsx](../web/components/ui/input.tsx), [textarea.tsx](../web/components/ui/textarea.tsx) | 2.4.7 · 1.4.11 |
| Read-only distinto de disabled | Inputs com `aria-readonly`/`readOnly` ganham borda tracejada e fundo muted, sem opacidade reduzida | 4.1.2 |
| `aria-label` em botões só com ícone | Trash2 em participantes, theme switcher | 4.1.2 |
| `role="alert"` em mensagens de erro de form | participantes/client.tsx | 4.1.3 |
| `prefers-reduced-motion` respeitado globalmente | [globals.css](../web/app/globals.css) | 2.3.3 |
| Texto "sem dado" em itálico, sem heurística | contexto, participantes, resultados | regra de ouro F5 |
| Contraste primário Blue Warm Vivid 70 / branco | Botões primários | 1.4.3 (AA 4.5:1) |
| Textos `--foreground` (#333333) sobre `--background` (#FFFFFF) | Corpo padrão | 1.4.3 (12.6:1 → AAA) |

### Conhecido / vigiar

| Item | Status | Ação prevista |
|---|---|---|
| Contraste de bordas `--border` (#dadada) sobre fundo branco | Marginal | Aceitável para bordas (3:1 não é exigência hard); revisitar se cobrir-se de feedback |
| ProductTour overlay sobre conteúdo | Não auditado para foco preso | Próxima execução: verificar trap de Tab dentro do tour |
| Tabelas extensas (participantes, jornada) sem `<caption>` | Cabeçalhos semânticos via `<th>` cobrem, mas `<caption className="sr-only">` é melhoria fácil | Pendente |
| Mensagens "Carregando…" sem `aria-live` | Botões com loading mostram texto, mas anúncio para leitor de tela poderia ser melhor | Pendente |

### Pendente (próxima passada)

- [ ] Auditoria automatizada com `axe-core` em CI
- [ ] Revisar contraste das `StatusPill` em ambos os temas (cores `hsl(167 60% 90%)` sobre fundos podem cair abaixo de 4.5:1 dependendo do estado)
- [ ] `lang` por bloco de citação se houver texto em inglês (WCAG 3.1.2)
- [ ] Verificar `<details>`/`<summary>` no questionário ganham foco visível
- [ ] Testar com leitor de tela (NVDA/VoiceOver) os fluxos principais
- [ ] Adicionar `aria-label="Anti-Sludge Gov · página inicial"` quando o logo "F5" virar link

## Padrão Mínimo gov.br — checklist (do `padrao-minimo.md`)

- [x] Cabeçalho gov.br institucional ([GovBrHeader](../web/components/govbr/header.tsx))
- [x] Logo gov.br
- [x] Rodapé gov.br ([GovBrFooter](../web/components/govbr/footer.tsx))
- [x] Tipografia Rawline ([globals.css](../web/app/globals.css))
- [x] Paleta funcional baseada em função (Superfície/Leitura/Interativa/Feedback)
- [x] Botões padronizados com hierarquia (button.tsx variants)
- [x] Iconografia semântica (Lucide React já segue padrão gov.br)
- [x] Boas práticas de formulário (label associada, hints, validação clara)
- [ ] Sign-In gov.br oficial — pendente. Hoje usamos Supabase Auth nativo.

## Notas para revisões futuras

- Quando alguma cor da paleta semântica F5 (`--barreira`, `--desvio`, etc.)
  for usada como **fundo de pill**, garantir que o texto sobre ela passe AA
  com o `_foreground` derivado. Auditar `<StatusPill tone="desvio" dark>` em
  particular.
- Estados de Hover/Focus do DS gov.br exigem **mais de um sinal visual além
  da cor** — borda + cor + opacidade. Hoje os Buttons cobrem (sombra + bg);
  conferir em links inline e abas.
- Toda nova rota deve ter:
  1. Um (e apenas um) `<h1>`
  2. `<main id="conteudo-principal" tabIndex={-1}>` herdado do layout
  3. Mensagens de erro com `role="alert"`
  4. Forms com `<label htmlFor=…>` para todo input
