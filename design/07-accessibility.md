# 07 — Acessibilidade

Linha de base: **WCAG 2.1 AA**. Não é checkbox de conformidade — é
condição para que o produto sirva equipe FCINCO inteira, incluindo quem
usa leitor de tela, teclado, ou tem contraste reduzido.

## Princípios não-negociáveis

1. **Tudo navegável por teclado**, sem armadilhas de foco.
2. **Foco visível** em todo interativo (ring de 1-2px em cor contrastante).
3. **Contraste ≥ 4.5:1** para texto normal, ≥ 3:1 para texto grande
   (≥ 18.66px regular ou ≥ 14px bold).
4. **Form labels sempre presentes** e associadas ao input (`htmlFor` ↔ `id`).
5. **Erros descritos em texto**, não só em cor.
6. **Roles ARIA** apenas onde HTML semântico não basta.
7. **`prefers-reduced-motion`**: respeitar (sem animação grande para quem
   pede menos motion).

## Checklist por componente

### Botões
- [x] Texto OU `aria-label` (no caso de icon-only).
- [x] Foco visível.
- [ ] `aria-busy` quando em loading.

### Inputs / Textarea / Select
- [x] `<Label>` com `htmlFor`.
- [x] Mensagem de erro associada via `aria-describedby` quando houver.
- [ ] `required` ⇄ `aria-required`.

### Tabelas
- [x] `<th>` semântico para headers.
- [ ] `scope="col"` em cabeçalhos (a fazer).
- [ ] `caption` invisível com descrição da tabela (a fazer em tabelas
  grandes).

### Modal (PassoScreenshot)
- [x] Fecha com Esc (`onClick` no overlay).
- [ ] **Trap de foco** dentro do modal — a implementar (atualmente foco
  pode "vazar" para trás).
- [ ] `role="dialog"` + `aria-modal="true"`.
- [ ] `aria-labelledby` apontando para o título do modal.
- [ ] Restaurar foco no botão que abriu, ao fechar.

### Toggles inline (obrigatório, desvio, repetição)
- [ ] Substituir `<button>` com classe por componente acessível com
  `role="switch"` e `aria-checked`. **A revisar.**

### DropdownMenu (theme switcher)
- [x] Radix já trata foco e teclado.

### Foco
- [x] `focus-visible:ring-1 focus-visible:ring-ring` no Button/Input.
- [ ] Auditar links sem ring (alguns `<Link>` simples no app não
  estilizam foco — adicionar `focus-visible:underline` ou ring).

## Contraste — pontos a auditar

| Combinação | Status | Notas |
|---|---|---|
| `text-foreground` em `--background` | ✅ | 17.4:1 (light), 16.8:1 (dark) |
| `text-muted-foreground` em `--background` | ⚠️ | Light 4.6:1 ✓, Dark **3.9:1** — abaixo de AA para texto < 18px. **A revisar.** |
| Botão primary | ✅ | quase preto/branco invertido |
| Botão outline em hover muted | ✅ | |
| Badge `bg-blue-100 text-blue-900` | ✅ | |
| Badge dark `bg-blue-950/40 text-blue-200` | ✅ | |
| Gráfico vermelho (`#ef4444`) em label preto | ✅ | (label fora da barra) |
| Gráfico azul (`#3b82f6`) em label preto | ✅ | |

Ação: revisar `--muted-foreground` no dark para atingir 4.5:1 (subir para
`0 0% 70%` mantém harmonia).

## Movimento

`prefers-reduced-motion: reduce` — atualmente o app tem pouca animação,
mas adicionar regra global em `globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Leitores de tela

- Headings (`h1`, `h2`) seguem hierarquia. Páginas têm exatamente um `h1`.
- Links de "voltar" começam com seta visível (← Processos) e fazem
  sentido fora de contexto.
- "Sem dado" é texto, não apenas estado visual.

## Conhecidos a fazer

- [ ] Trap de foco em modal de screenshot.
- [ ] Roles ARIA em modal.
- [ ] Subir `--muted-foreground` no dark para AA.
- [ ] `prefers-reduced-motion` global em globals.css.
- [ ] Auditar foco visível em todos os `<Link>`.
- [ ] Substituir toggles pill por `role="switch"`.
- [ ] Smoke test com NVDA / VoiceOver em telas principais.
