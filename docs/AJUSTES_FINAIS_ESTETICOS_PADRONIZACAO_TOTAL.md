# Ajustes finais estéticos · Padronização total do app · Todas as telas

> **Tipo**: prompt de execução autônoma para o Codex.
> **Origem**: feedback da Profª Janaina Piana durante teste do MVP +
> reclamação do Pedro sobre "2 headers" no desktop full HD.
> **Skill orientadora**: [`web/.claude/skills/frontend-design/SKILL.md`](../web/.claude/skills/frontend-design/SKILL.md)
> **Referência canônica**: [`TODAS_INFOS/govbr-ds-wbc/packages/webcomponents/src/components/{header,footer,menu,breadcrumb}/`](../../TODAS_INFOS/govbr-ds-wbc/)
> **Estado base**: branch `main` após implementação do
> [`docs/07_BUG_PERGUNTAS_POR_TIPO.md`](./07_BUG_PERGUNTAS_POR_TIPO.md).

---

## Como usar este arquivo

Cole o conteúdo abaixo (a partir de `# Briefing Codex`) numa sessão do
Codex CLI/IDE com `/home/plreis/Documentos/PROJ-EXT-GOV/ANTISLUDGE-GOV-NEWSTACK/`
como diretório de trabalho. O briefing é auto-contido e contém:

1. Diagnóstico do problema visual com arquivos e linhas exatas
2. Plano de consolidação em fatias commitáveis
3. Inventário de **todas as telas** com o tratamento padrão que cada uma
   deve receber
4. Critérios de aceitação por fatia
5. Anti-padrões a evitar (com base na skill `frontend-design`)

---

# Briefing Codex

## Contexto

Você está continuando o desenvolvimento do **Anti-Sludge Gov**, uma
aplicação Next.js 16 (App Router) + Supabase usada pela equipe
FCINCO/MGI para aplicar a metodologia F5 Anti-Sludge em serviços
públicos digitais brasileiros.

A aplicação **já aderiu ao Padrão Mínimo gov.br DS** (Rawline, paleta
Blue Warm Vivid, header/footer institucionais). Já existem primitives
FCINCO (`web/components/fcinco/*`) para a camada de marca da equipe
(handlettering Patrick Hand, watercolor, trilha pontilhada vermelha,
numeração display Bebas Neue mostarda). O trabalho metodológico está
correto.

**Sua tarefa**: corrigir uma duplicação visual no header e padronizar
TODAS as telas para usar o mesmo esqueleto estético.

---

## 1. Problema crítico — "dois headers" no desktop

### Sintoma

No viewport ≥ `md` (768px+), o usuário vê:

```
┌─────────────────────────────────────────────────────┐
│ gov.br · GOVERNO FEDERAL · BRASIL  [Acessibilidade] │  ← faixa fina
├─────────────────────────────────────────────────────┤
│ [gov.br] MGI/Ministério...   │ Anti-Sludge Gov   PE │  ← faixa principal
├──────────────┬──────────────────────────────────────┤
│ [F5] Anti-   │                                      │  ← ISSO PARECE
│     Sludge   │   conteúdo da página                 │     UM 2º HEADER
│ FCINCO MGI   │                                      │
│ ─────────────│                                      │
│ Processos    │                                      │
│ Catálogo F5  │                                      │
└──────────────┴──────────────────────────────────────┘
```

A faixa "F5 Anti-Sludge / FCINCO METODOLOGIA F5" no topo da sidebar
**repete** a identidade que o `GovBrHeader` já estabeleceu na faixa
principal. No mobile a sidebar é `hidden md:flex`, então o problema só
aparece em telas largas.

### Arquivos envolvidos

- [`web/app/(app)/layout.tsx`](../web/app/(app)/layout.tsx) linhas 55–73 — bloco da sidebar com `F5 Anti-Sludge` + handlettering
- [`web/components/govbr/header.tsx`](../web/components/govbr/header.tsx) linhas 72–86 — "Anti-Sludge Gov" repetido aqui

### Solução de princípio

O `<br-header>` oficial do gov.br DS
([`TODAS_INFOS/govbr-ds-wbc/packages/webcomponents/src/pages/components/header/default.html`](../../TODAS_INFOS/govbr-ds-wbc/packages/webcomponents/src/pages/components/header/default.html))
é **um único componente consolidado** com slots:

- `logo` + `signature` (identidade institucional do órgão)
- `caption` + `subcaption` (identidade do produto)
- `links` / `functions` / `search` / `access` / `menu-trigger`

Não existem "duas marcas". A identidade do **produto** vive dentro do
header, não num cartão flutuante separado. A sidebar é apenas
**navegação**.

**Aplicar isso ao Anti-Sludge:**

- `GovBrHeader` permanece como faixa fina + faixa principal, mas
  consolida **toda** a identidade visual:
  - À esquerda: logo gov.br + MGI/FCINCO (signature) — como já está.
  - Centro/direita: nome do produto **Anti-Sludge Gov** com o accent
    verde teal FCINCO antes (já está) — manter.
  - À direita: avatar do usuário + theme switcher + logout (já está
    via slot `right`).
- A sidebar **PERDE** o cartão "F5 Anti-Sludge / FCINCO METODOLOGIA F5"
  e a borda inferior associada. Passa a começar **direto na navegação**
  (`<AppNav>`), com no máximo um respiro (`p-3`) acima.
- O usuário/role chip que hoje vive no topo da sidebar **migra** para
  o slot `right` do `GovBrHeader` (já está lá no layout — só remover
  do sidebar pra não duplicar tampouco).

---

## 2. Padrão de tela — "esqueleto único"

Toda página da pasta `web/app/(app)/processos/...` (e por extensão
`/catalogo`, `/admin/*`) deve seguir o esqueleto abaixo. Existe uma
referência canônica já implementada em
[`web/app/(app)/processos/[id]/contexto/page.tsx`](../web/app/(app)/processos/[id]/contexto/page.tsx)
após o redesign FCINCO. Use ela como template visual.

```tsx
<div className="flex flex-col gap-6">
  {/* HEADER DA PÁGINA — sempre dentro de um card com paper-grain */}
  <header className="relative overflow-hidden rounded-lg border bg-card p-6">
    <WatercolorSplatter
      className="absolute -right-20 -top-24"
      size={240}
      opacity={0.30}                {/* nunca > 0.35 */}
      seed={<NÚMERO ESTÁVEL>}        {/* cada tela tem seu seed */}
      color="hsl(var(--accent))"    {/* mostarda para etapas neutras */}
                                    {/* hsl(var(--fcinco-teal)) p/ identidade FCINCO */}
                                    {/* hsl(var(--destructive)) p/ resultados/críticas */}
    />
    <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        {/* breadcrumb mínimo */}
        <Link href={voltarHref} className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground">
          ← {processo.nome}
        </Link>

        {/* etapa metodológica */}
        <div className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          etapa NN de 07
        </div>

        {/* H1 — handlettering Patrick Hand SEM frame extra
              (frame só na primeira tela de cada fluxo, p/ não cansar) */}
        <h1 className="mt-1 font-hand text-4xl leading-tight">
          Título humanizado
        </h1>

        {/* underline orgânico */}
        <SketchUnderline width={200} variant="long" color="hsl(var(--accent))" />

        {/* descrição factual com referência à planilha F5 */}
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Equivalente à aba <strong>X.Y Nome da Aba</strong> da planilha F5.
          Frase humana descrevendo o que se faz aqui.
        </p>
      </div>

      {/* stats / pills à direita */}
      <div className="flex flex-wrap gap-2 lg:justify-end">
        <StatusPill tone="em_progresso">N itens</StatusPill>
        <StatusPill tone="validada">N validados</StatusPill>
        {!canEdit && <StatusPill tone="pendente">somente leitura</StatusPill>}
      </div>
    </div>
  </header>

  {/* CORPO — múltiplas <section> com borda quando precisar agrupar */}
  <section>...</section>
</div>
```

### Regras de uso por elemento

| Elemento | Onde usar | Onde NÃO usar |
|---|---|---|
| `<SketchFrame>` (handlettering em moldura) | H1 de páginas de "entrada" (Hub do processo, Questionário, Resultados) | Em listas, dashboards admin, formulários secundários |
| `<SketchUnderline>` | Logo abaixo de qualquer H1 ou H2 com texto-chave | Em corpo de tabela, em paths de breadcrumb |
| `<WatercolorSplatter>` | Header de página com `opacity ≤ 0.35`. Cor varia: `--accent` (default), `--fcinco-teal` (telas FCINCO-de-identidade como participantes), `--destructive` (resultados críticos) | Em corpo de tabela, em sidebar, em modal |
| `<NumeroEtapa>` (Bebas Neue mostarda) | Marcadores de ordem (etapa 01..07, código P01..P12 dos participantes, número de passo da jornada) | Como número de leitura técnica (use `font-mono` para esses) |
| `font-hand` Patrick Hand | H1 de página (40-48px). H1 dentro de SketchFrame só nas 3 telas-chave (Hub, Questionário Barreiras, Resultados) | Em corpo, em tabela, em formulário |
| `font-display` Bebas Neue | NumeroEtapa, números de stats no header, código de participante na tabela | Em corpo de texto |
| `font-mono` JetBrains | Tempos (`12s`), porcentagens, breadcrumbs uppercase, pills de status, contadores `X/Y` | Em corpo de leitura |
| `font-sans` Rawline | Tudo mais (corpo, forms, navegação, headings H2/H3) | Lugar nenhum (é o padrão) |

### Regras de status visual

`<StatusPill>` é a fonte única de verdade para estados. **Nunca**
inventar pill no JSX com classes ad-hoc. Tons disponíveis:

- `pendente` — neutro cinza-amarelado
- `em_progresso` — verde teal claro
- `concluido` — verde teal médio
- `validada` — verde teal sólido (CTA-like)
- `desvio` — laranja (laranja queimado)
- `repeticao` — roxo
- `barreira` — vermelho watercolor
- `print` — teal claro (badge de evidência anexada)

Se faltar um tom para um caso de uso, adicionar em
[`web/components/fcinco/status-pill.tsx`](../web/components/fcinco/status-pill.tsx) — não fazer pill inline.

---

## 3. Inventário das telas + plano de execução

Cada tela abaixo é uma fatia commitável. Após cada fatia, **rodar `pnpm
build` no diretório `web/`** e garantir build verde antes da próxima.

### Fatia 1 — Layout shell único (resolve o "2 headers")

**Arquivos:**
- [`web/app/(app)/layout.tsx`](../web/app/(app)/layout.tsx)
- [`web/components/govbr/header.tsx`](../web/components/govbr/header.tsx)
- [`web/components/app-nav.tsx`](../web/components/app-nav.tsx) (provavelmente sem mudança)

**Mudanças:**
1. Remover do `(app)/layout.tsx` o bloco "F5 Anti-Sludge / FCINCO METODOLOGIA F5" no topo da sidebar (linhas ~55-73). A sidebar começa com a `<AppNav>` direto, precedida apenas por um `<div className="p-3">` para respiro.
2. Remover do `(app)/layout.tsx` o "user chip" do rodapé da sidebar — ele é DUPLICADO do que já está no slot `right` do `GovBrHeader`.
3. No mobile sub-header (`md:hidden`), remover também o cartão F5 verde — manter só o link `Processos` + nav inline.
4. No `GovBrHeader.tsx`, na faixa principal, **adicionar um caption/subcaption** abaixo de "Anti-Sludge Gov" quando houver espaço (sm+), para reforçar a identidade do produto:
   ```tsx
   <div className="ml-auto flex flex-col items-end leading-tight sm:ml-0">
     <span className="text-[15px] font-semibold text-foreground">Anti-Sludge Gov</span>
     <span className="hidden font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:inline">metodologia F5 · FCINCO</span>
   </div>
   ```
5. Garantir que `paper-grain` continua sendo aplicado no container que envolve sidebar+main, NUNCA no `body` — paper-grain em tudo polui.

**Critério de aceitação:**
- Em 1920×1080, há apenas UMA região visível identificada como "header" antes do conteúdo: a do `GovBrHeader`. A sidebar começa direto com "Processos".
- Em 375×667, layout idêntico ao atual exceto pelo cartão F5 no mobile sub-header (removido).
- Logout, theme switcher, identidade do usuário continuam funcionais e visíveis no header.

### Fatia 2 — Telas de "entrada" (Hub + Tela de listagem `/processos`)

**Arquivos:**
- [`web/app/(app)/processos/[id]/page.tsx`](../web/app/(app)/processos/[id]/page.tsx) — Hub
- [`web/app/(app)/processos/page.tsx`](../web/app/(app)/processos/page.tsx) — Listagem

**Mudanças:**
1. Garantir que ambas usam o esqueleto único (§2).
2. Hub: pode manter `<SketchFrame>` no nome do processo (é tela de identidade do processo).
3. Listagem `/processos`: usar `<SketchFrame>` em "Processos Anti-Sludge" (já existe).
4. Botões secundários no rodapé do Hub devem ter o mesmo padrão de altura (`size="sm"`) e ícone Lucide consistente.

### Fatia 3 — Editores de jornada (planejada + individual)

**Arquivos:**
- [`web/app/(app)/processos/[id]/jornada-planejada/page.tsx`](../web/app/(app)/processos/[id]/jornada-planejada/page.tsx)
- [`web/app/(app)/processos/[id]/jornada-planejada/editor.tsx`](../web/app/(app)/processos/[id]/jornada-planejada/editor.tsx)
- [`web/app/(app)/processos/[id]/jornadas-individuais/page.tsx`](../web/app/(app)/processos/[id]/jornadas-individuais/page.tsx)
- [`web/app/(app)/processos/[id]/jornadas-individuais/[jornadaId]/page.tsx`](../web/app/(app)/processos/[id]/jornadas-individuais/[jornadaId]/page.tsx)
- [`web/app/(app)/processos/[id]/jornadas-individuais/[jornadaId]/editor.tsx`](../web/app/(app)/processos/[id]/jornadas-individuais/[jornadaId]/editor.tsx)
- [`web/app/(app)/processos/[id]/jornada-padrao/page.tsx`](../web/app/(app)/processos/[id]/jornada-padrao/page.tsx)

**Mudanças:**
1. Padronizar headers de página seguindo §2 (já parcialmente OK).
2. **Forms de adicionar passo** (`<form>` no rodapé do editor): adotar o mesmo padrão visual do form de contexto — `<NumeroEtapa value={passos.length + 1}>` ao lado de "Adicionar passo", inputs com `input-paper` no lugar do shadcn `<Input>` quando se quiser o feel de caderno; ou manter shadcn `<Input>` com border tracejada no `aria-readonly`.
3. Garantir que botão `Salvar`/`Adicionar` é `variant="default"` (azul gov.br) e cancelar/voltar é `variant="outline"`.

### Fatia 4 — Páginas de questionário

**Arquivo:**
- [`web/app/(app)/processos/[id]/jornadas/[jornadaId]/questionario/[codigo]/page.tsx`](../web/app/(app)/processos/[id]/jornadas/[jornadaId]/questionario/[codigo]/page.tsx)
- [`web/app/(app)/processos/[id]/jornadas/[jornadaId]/questionario/[codigo]/form.tsx`](../web/app/(app)/processos/[id]/jornadas/[jornadaId]/questionario/[codigo]/form.tsx)

**Mudanças:**
1. Header já segue o padrão (§2) — confirmar.
2. **`<details>` por passo**: garantir que o estado aberto/fechado tenha foco visível e que o `<summary>` tenha `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`.
3. Banner amarelo de "passos sem classificação" deve usar o mesmo padrão de cor de qualquer alerta amarelo do app — extrair para componente `<Alert tone="warning">` em `web/components/fcinco/alert.tsx` se ainda não existir, e usar em todos os lugares que hoje têm `bg-amber-50 border-amber-500/40`.

### Fatia 5 — Resultados + Catálogo + Admin

**Arquivos:**
- [`web/app/(app)/processos/[id]/resultados/*`](../web/app/(app)/processos/[id]/resultados/)
- [`web/app/(app)/catalogo/page.tsx`](../web/app/(app)/catalogo/page.tsx)
- [`web/app/(app)/admin/orgaos/*`](../web/app/(app)/admin/orgaos/)
- [`web/app/(app)/admin/usuarios/*`](../web/app/(app)/admin/usuarios/)

**Mudanças:**
1. Aplicar esqueleto §2 em todas as headers.
2. **Resultados**: WatercolorSplatter com cor `--destructive` quando houver pelo menos uma barreira crítica (média ≥ 4); cor `--fcinco-teal` quando tudo ok; cor `--accent` quando "sem dado".
3. **Admin**: estética mais sóbria — pode usar `font-sans` no H1 (não `font-hand`) e dispensar `SketchFrame`. É tela operacional, não tela de pesquisa. Manter etapa-mono breadcrumb e `<SketchUnderline>` curto pra coerência.
4. **Catálogo**: agrupar critérios por dimensão (barreira/impacto) usando `<SelectGroup>`/`<SelectLabel>` se houver dropdown, ou cards agrupados com header de categoria em font-mono uppercase.

### Fatia 6 — Estados vazios + erros + telas auth

**Arquivos:**
- [`web/app/auth/login/page.tsx`](../web/app/auth/login/page.tsx) e demais auth/*
- Empty states dentro dos editores

**Mudanças:**
1. **Login / Sign-up**: aplicar `<SketchFrame>` em "Entrar" / "Cadastrar" (handlettering 32-36px). Watercolor splatter pequeno (size=180, opacity=0.3) atrás do card.
2. **Empty state global**: criar `<EmptyState>` em `web/components/fcinco/empty-state.tsx` com props `title`, `description`, `cta?`, `illustration?` — usar a ilustração de pessoa olhando trilha (referência: peça "TRILHA COMUM" das `IMAGENS/`). Aplicar em `/processos` quando lista vazia, em participantes quando vazio, em jornadas-individuais quando vazio.

---

## 4. Anti-padrões a evitar (skill `frontend-design`)

- **NÃO** usar `Inter`, `Roboto`, `Arial`, `Space Grotesk`. A fonte sans é **Rawline** (gov.br DS); o resto está definido em `web/app/globals.css`.
- **NÃO** adicionar gradientes roxo→rosa, glassmorphism sem propósito, sombras dramáticas decorativas. O app é uma **ferramenta de pesquisa institucional**, não SaaS de produtividade.
- **NÃO** usar emojis em UI (caixas de seleção, badges, ações). Use ícones Lucide React ou SVGs FCINCO. Emoji só onde a Janaina explicitamente pediu (em copy informal de empty state, se ela aprovar).
- **NÃO** dispersar pills de status com classes inline (`bg-blue-100 text-blue-900` etc) — use `<StatusPill>`.
- **NÃO** colocar handlettering em corpo de tabela ou em formulário extenso. Cansa.
- **NÃO** colocar `WatercolorSplatter` em cada seção; é tempero, não pão.
- **NÃO** usar verde teal #1FB597 como cor de botão "padrão" — primary é azul gov.br #1351B4 (Blue Warm Vivid 70). Verde teal só em pills "validada" e na faixa lateral pequena de identidade do produto no header.
- **NÃO** introduzir libs novas para resolver UI (motion já está instalado; shadcn já configurado; lucide já configurado). Trabalhe com o que tem.

## 5. Critérios globais de aceitação

Após executar todas as fatias:

- [ ] `pnpm build` no diretório `web/` passa sem warnings de TypeScript ou Next.js.
- [ ] Em 1920×1080, login → home (`/processos`) → abrir processo → ir em cada uma das 7 etapas, todas têm header de página seguindo §2 (etapa NN de 07 + h1 handlettering + sketch underline + descrição).
- [ ] Não existe mais o "cartão F5 Anti-Sludge" no topo da sidebar nem no mobile sub-header. A identidade do produto vive APENAS no `GovBrHeader`.
- [ ] Em modo dark, todas as cores hsl() têm contraste WCAG AA (4.5:1 para texto normal; 3:1 para texto grande/ícone).
- [ ] Theme switcher funciona em todas as rotas (incluindo `auth/*`).
- [ ] Visitante (papel `visitante`) entra num processo via link compartilhado e vê:
  - Sem botão "Editar metadata"
  - Sem ícone de lápis no título
  - Forms em modo somente-leitura (texto formatado, não inputs)
  - Pill "SOMENTE LEITURA" no header de página
- [ ] No dropdown de "Tipo de Comportamento" em qualquer editor de jornada, os items vêm agrupados por categoria (Busca e Acesso, Preparação e Entrega, Interação, Escolha, Espera, Outros) com header `SelectLabel` mono uppercase entre eles.
- [ ] No questionário de barreiras, passo classificado como `Realizar login` mostra perguntas diferentes do passo classificado como `Preencher`. Passo sem classificação mostra banner amarelo "passo sem classificação".
- [ ] Rodapé gov.br aparece em TODA rota autenticada e em todas as rotas `auth/*`. Mensagem "Aderente ao Padrão Mínimo do gov.br Design System" preservada na linha inferior.

---

## 6. Recursos

- **Skill de design**: [`web/.claude/skills/frontend-design/SKILL.md`](../web/.claude/skills/frontend-design/SKILL.md) — princípios de typography, color, motion, spatial composition, anti-padrões de "AI slop".
- **Referência canônica gov.br**: [`TODAS_INFOS/govbr-ds-wbc/`](../../TODAS_INFOS/govbr-ds-wbc/) — repositório oficial. Componentes relevantes:
  - Header: [`packages/webcomponents/src/components/header/header.tsx`](../../TODAS_INFOS/govbr-ds-wbc/packages/webcomponents/src/components/header/header.tsx) + [`header.scss`](../../TODAS_INFOS/govbr-ds-wbc/packages/webcomponents/src/components/header/header.scss)
  - Header demo HTML: [`packages/webcomponents/src/pages/components/header/default.html`](../../TODAS_INFOS/govbr-ds-wbc/packages/webcomponents/src/pages/components/header/default.html)
  - Footer demo: [`packages/webcomponents/src/pages/components/footer/default.html`](../../TODAS_INFOS/govbr-ds-wbc/packages/webcomponents/src/pages/components/footer/default.html)
  - Menu (lateral) demo: [`packages/webcomponents/src/pages/components/menu/`](../../TODAS_INFOS/govbr-ds-wbc/packages/webcomponents/src/pages/components/menu/)
  - Breadcrumb: [`packages/webcomponents/src/components/breadcrumb/`](../../TODAS_INFOS/govbr-ds-wbc/packages/webcomponents/src/components/breadcrumb/)
- **Documentação oficial salva**: [`design/gov-br-ds/`](../design/gov-br-ds/) com 9 markdowns (cores, tipografia, espacamento, estados, iconografia, grid, principios, padrão-mínimo, síntese).
- **Implementação canônica de referência neste repo**: tela de contexto
  [`web/app/(app)/processos/[id]/contexto/page.tsx`](../web/app/(app)/processos/[id]/contexto/page.tsx) + [`form.tsx`](../web/app/(app)/processos/[id]/contexto/form.tsx).

---

## 7. Ordem de execução sugerida (Codex)

1. **Ler** `web/app/(app)/layout.tsx`, `web/components/govbr/header.tsx`, `web/app/(app)/processos/[id]/contexto/page.tsx` (template canônico).
2. **Executar Fatia 1** (consolidar headers).
3. `pnpm build` → fix → commit `"Fatia 1: consolida cabeçalho, elimina duplicação visual"`.
4. **Executar Fatia 2** (telas de entrada).
5. `pnpm build` → commit.
6. … (continuar pelas Fatias 3–6 na ordem)
7. Após todas as fatias: rodar checklist do §5 manualmente abrindo cada rota em light e dark.
8. Commit final agrupador opcional se quiser squash.

**Não inventar features novas.** Não criar componentes que não estejam
mencionados aqui. Não trocar lib. Não mexer no Supabase. Não mexer em
`docs/`. Não tocar em `design/gov-br-ds/` (é fonte de verdade externa).
Não tocar em `TODAS_INFOS/` (é referência somente leitura).

Se encontrar ambiguidade num critério de aceitação, **pare e pergunte
ao usuário** antes de assumir.
