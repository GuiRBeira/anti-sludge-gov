# Síntese — GOV.BR Design System aplicada ao Anti-Sludge Gov

Material extraído via Firecrawl em 2026-05-12 das páginas oficiais
`https://www.gov.br/ds/` (introdução, padrão mínimo, fundamentos visuais).
Cada item linka para a página fonte completa salva em `./*.md`.

> **Princípio orientador**: o Padrão Mínimo gov.br é um **piso**, não um teto.
> Produtos institucionais devem cumpri-lo, podendo ainda ter uma "camada de
> marca" por cima — exatamente como a FCINCO mantém o banner watercolor +
> handlettering acima do header padrão gov.br no site oficial deles.

---

## 1. Padrão Mínimo — itens obrigatórios

Da página [`padrao-minimo.md`](./padrao-minimo.md). Estes são os pontos de
aderência **mínima** para qualquer aplicação web do Governo Federal:

| Item | O que exige | Status atual no app |
|---|---|---|
| **Cabeçalho gov.br** | Barra superior com logo gov.br + identificação do órgão | ❌ falta |
| **Rodapé gov.br** | Rodapé padrão com info do órgão e links institucionais | ❌ falta |
| **Tipografia Rawline** | "somente uma família é utilizada: a Rawline" | ❌ usamos Geist + Patrick Hand + Bebas Neue + JetBrains Mono |
| **Paleta funcional** | Cores por função: Superfície, Leitura, Interativa, Feedback | ⚠️ paleta existe mas centrada em FCINCO (verde teal) |
| **Botões padronizados** | Hierarquia visual primário/secundário/terciário | ⚠️ shadcn padrão, sem o desenho gov.br |
| **Sign-In gov.br** | Padronização da autenticação | ❌ usamos email/senha Supabase |
| **Boas práticas de formulário** | Semântica eficiente, botões ordenados, campos organizados | ✅ mas precisa polish |
| **Iconografia semântica** | Lápis=editar, lupa=pesquisar, lixeira=excluir, X=fechar, etc. | ✅ Lucide cobre |
| **Acessibilidade WCAG 2.1 AA** | Contraste 4.5:1 normal / 3:1 grande | ✅ provavelmente — falta auditar |

---

## 2. Fundamentos visuais — valores concretos

### Cores ([cores.md](./cores.md))

A paleta usa **HSL** e nomeia cores por família + luminância (`Blue Warm Vivid 70`).

**Cor principal do gov.br (marca):**
- `Blue Warm Vivid 70` = `#1351B4` = `hsl(217, 81%, 39%)` — botão primário, links
- `Blue Warm Vivid 90` = `#071D41` = `hsl(217, 81%, 14%)` — fundo escuro institucional
- `Blue Warm Vivid 50` = `#2670E8` — hover
- `Blue Warm Vivid 40` = `#5992ED` — alternativa clara

**Famílias de cor por função:**
- **Superfície**: backgrounds — branco `#FFFFFF`, cinza claro etc.
- **Leitura**: textos/ícones — cinza `#333333` no fundo claro, branco `#FFFFFF` no escuro
- **Interativa**: botões/links — `Blue Warm Vivid 70`
- **Feedback**: estados (sucesso/erro/aviso/info) — verdes, vermelhos, amarelos, azuis específicos

**Contraste mínimo**: WCAG AA — 4.5:1 texto normal, 3:1 texto grande/ícone.

### Tipografia ([tipografia.md](./tipografia.md))

- **Família única**: `Rawline` (https://www.cdnfonts.com/rawline.font)
- **Fonte base**: `14px` (1em), peso 400
- **Escala**: cresce em incrementos relativos (`em`): 14 → 18 → 21 → 25 → 30 → 36…
- Usa pesos múltiplos da própria Rawline (300/400/500/600/700) para hierarquia,
  em vez de mudar de família.

### Espaçamento ([espacamento.md](./espacamento.md))

Duas escalas, ambas em múltiplos de 4px ou 8px:

| Token | Valor | Uso |
|---|---|---|
| `--spacing-scale-default` | 0px | padrão de qualquer elemento |
| `--spacing-scale-half` | 4px (0.5em) | escala de ajuste |
| `--spacing-scale-base` | 8px (1em) | base de layout |
| `--spacing-scale-2x` | 16px | gaps padrão |
| `--spacing-scale-3x` | 24px | separação entre seções |
| `--spacing-scale-4x` | 32px | seções principais |
| `--spacing-scale-5x` | 40px | hero/landing |
| `--spacing-scale-6x` | 48px | … |

Box model: `box-sizing: border-box` em tudo.

### Estados ([estados.md](./estados.md))

Estados padronizados para qualquer componente interativo:

- **Default** — repouso
- **Hover** — cursor sobre o elemento, fundo ganha overlay translúcido
- **Focus** — ring de foco com contraste alto (3:1+)
- **Active** / **Pressed** — clique
- **Selected** — item selecionado em lista/menu
- **Disabled** — opacidade reduzida, sem interação
- **Loading** — spinner ou skeleton
- **Read-only** — visualmente distinto de Disabled (sem opacidade reduzida; mostra que existe valor, só não edita)

**Importante**: estados devem usar **mais de um sinal visual** (cor + borda + ícone), não só cor — exigência de acessibilidade.

### Grid ([grid.md](./grid.md))

Sistema 12 colunas com breakpoints. Gutter padrão alinhado à escala de espaçamento.

### Iconografia ([iconografia.md](./iconografia.md))

Significados padronizados (vale checar nosso uso atual):

| Ação | Ícone |
|---|---|
| Editar | Lápis sobre documento |
| Pesquisar | Lupa |
| Excluir | Lixeira |
| Bloquear | Cadeado |
| Cortar | Tesoura |
| Limpar | Borracha |
| Fechar | "X" |
| Imprimir | Impressora |
| Atualizar | Setas em sentido horário |
| Visualizar | Olho |
| Ir para tela inicial | Casa |

Lucide React já segue esses significados — sem ação necessária, só conferir
nos usos pontuais.

---

## 3. Tensão FCINCO ↔ gov.br DS — proposta de resolução

A FCINCO em si **tem** identidade visual própria (watercolor + handlettering)
que é a identidade da equipe metodológica, não da plataforma. No site oficial
gov.br/cinco/fcinco essa identidade aparece como **conteúdo dentro** do shell
gov.br padrão — header gov.br no topo, conteúdo FCINCO no meio, rodapé gov.br
no fim.

A proposta correta para o Anti-Sludge Gov segue esse precedente:

**Camada A — Shell gov.br institucional (obrigatório)**
- Cabeçalho gov.br (logo + identificação MGI/FCINCO)
- Rodapé gov.br
- Tipografia: **Rawline** como sans-serif padrão (corpo, formulários, tabelas, navegação)
- Cor primária de ação: **#1351B4** Blue Warm Vivid 70 (botão "Salvar", links)
- Escala de espaçamento 8/16/24/32/40
- Estados Default/Hover/Focus/Active/Disabled/Read-only de acordo com o DS

**Camada B — Marca FCINCO (skin sobre o shell)**
- Verde teal **#1FB597**: cor da **equipe FCINCO** — usado no banner do
  cabeçalho de processo (faixa institucional), pills de status "validada",
  marca interna. **Não** como primary de botão genérico.
- Amarelo mostarda **#F4B400**: numeração de etapas (Bebas Neue display) —
  vive em paralelo a Rawline, é display não texto, não fere o "somente Rawline"
  pois não é tipografia de texto.
- Vermelho watercolor **#C8252A**: trilha pontilhada (`<TrilhaJornada>`),
  X de desvio, ícones de barreira. Recurso semântico da metáfora, não cor de UI.
- Patrick Hand: limitado a **headers H1 de página principais e empty states
  celebratórios**, dentro de `<SketchFrame>`. Não corpo, não tabelas, não
  formulários (esses ficam Rawline).
- Watercolor splatter: decorativo em headers chave, com `opacity ≤ 0.4`,
  nunca em corpo de tabela ou form.

**Resultado**: usuário familiar com gov.br reconhece o shell em 1 segundo;
quem trabalha com a FCINCO reconhece a "voz" da equipe nas peças com identidade.
Acessibilidade preservada pela base Rawline + cores AA.

---

## 4. Plano de implementação (fatias)

Cada fatia é commitável independente e mantém o app funcional.

### Fatia 1 — Tipografia + paleta funcional ✅ (próxima execução)
- [ ] Adicionar **Rawline** via `@font-face` (CDN cdnfonts.com) ou self-host
- [ ] Trocar `--font-sans` de Geist para Rawline em [layout.tsx](web/app/layout.tsx)
- [ ] Manter Bebas Neue (`--font-display`), JetBrains Mono (`--font-mono`)
- [ ] Patrick Hand passa a ser opt-in via classe `font-hand` (já é, ok)
- [ ] Atualizar [globals.css](web/app/globals.css):
  - `--primary` → `217 81% 39%` (Blue Warm Vivid 70)
  - Criar `--fcinco-teal: 167 71% 41%` (verde teal preservado para marca)
  - Documentar uso em comentários

### Fatia 2 — Cabeçalho + rodapé gov.br
- [ ] Novo componente `<GovBrHeader>` em `web/components/govbr/header.tsx`
  - Logo gov.br à esquerda
  - "Ministério da Gestão e da Inovação em Serviços Públicos · FCINCO" à direita
  - Faixa fina azul `#071D41` no topo (padrão gov.br)
- [ ] `<GovBrFooter>` em `web/components/govbr/footer.tsx`
  - Links institucionais (Acessibilidade, Mapa do Site, Privacidade)
  - "Desenvolvido por FCINCO/MGI"
- [ ] Adotar em [app/(app)/layout.tsx](web/app/(app)/layout.tsx) e [app/auth/*](web/app/auth/)

### Fatia 3 — Componentes shadcn com estados gov.br
- [ ] Auditar `<Button>` para hierarquia primário/secundário/terciário gov.br
- [ ] Garantir `:focus-visible` com ring `3:1` em todos os interativos
- [ ] Estado read-only distinto de disabled em `<input>`/`<textarea>`/`<select>`
- [ ] Documentar em `design/03-design-system.md`

### Fatia 4 — Restantes formulários FCINCO-skinned
- [ ] Aplicar mesmo padrão de [`/processos/[id]/contexto`](web/app/(app)/processos/[id]/contexto/) (feito) em:
  - `/processos/[id]/jornada-planejada/editor`
  - `/processos/[id]/participantes`
  - `/processos/[id]/jornadas-individuais/[id]/editor`
  - `/processos/[id]/jornadas/[id]/questionario/[codigo]`

### Fatia 5 — Auditoria de acessibilidade
- [ ] Rodar Lighthouse / axe em cada rota
- [ ] Verificar contraste AA em ambos os temas
- [ ] Verificar navegação por teclado completa
- [ ] Atualizar `design/07-accessibility.md`

---

## 5. O que NÃO precisa mudar

- ✅ Iconografia (Lucide já segue significados gov.br)
- ✅ Espaçamento (Tailwind default já alinha com a escala 8/16/24/32/40)
- ✅ Componentes shadcn como base estrutural
- ✅ Next.js como stack (Next ≥ 14 com App Router atende todos os requisitos)
- ✅ Toda a metáfora da trilha vermelha pontilhada — é recurso semântico do
  produto, não fere DS
- ✅ Watercolor + handlettering em headers de página específicos — segue o
  precedente do site oficial FCINCO
