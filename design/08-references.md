# 08 — Referências

Produtos cuja UI/UX inspira (ou contrasta) o desenho do Anti-Sludge Gov.

## Referências primárias

### Linear (linear.app)
**O que pegar:**
- Densidade informacional sem cansar.
- Hierarquia disciplinada de tipografia.
- Atalhos de teclado em toda interação repetida.
- Dark mode refinado, com tons quase-pretos (não #000 puro).
- Transições rápidas (150ms), nunca rejeitando uma decisão de UX por
  causa de animação.

**O que não pegar:**
- Marca forte (cores próprias) — Anti-Sludge é institucional.
- Comando central (Cmd+K) com tudo — overkill para o escopo atual.

### Notion (notion.so)
**O que pegar:**
- Inline editing em tabelas. Click → edita → blur salva.
- Painéis laterais (drawer) ao invés de modais bloqueantes para detalhes.
- Hierarquia de página → seção → bloco bem clara.
- Estados vazios curtos, com CTA direto.

**O que não pegar:**
- Excesso de opções em cada bloco (drag handle, ⋯, comentar, etc).
  Em ferramenta de pesquisa, menos opções = menos hesitação.

### GOV.UK / NHS Design System
**O que pegar:**
- Acessibilidade WCAG AA como linha de base.
- Linguagem clara, frases curtas em rótulos e mensagens.
- Foco visível agressivo (amarelo no GOV.UK; manter algo equivalente).
- Componentes simples e robustos (botão, input, banner de erro).
- Estados de erro descritivos: "Selecione um órgão antes de salvar".

**O que não pegar:**
- Estética muito utilitária / "anos 2010". Anti-Sludge pode ser mais
  refinado visualmente sem perder clareza.

### Airtable
**O que pegar:**
- Tabelas como cidadão de primeira classe.
- Cabeçalhos com ordenação, larguras controláveis.
- Modos de visualização (tabela / kanban / form) — futuro.

**O que não pegar:**
- Toolbar superior muito carregada. Em pesquisa, ações por contexto
  (na linha) > ações globais.

## Referências secundárias

### Stripe Dashboard
- Layout de detalhe (header → seções → ações) é uma boa estrutura para a
  página `/processos/[id]`.
- Tooltips informativos sem invadir a tela.

### Figma comments / Loom comments
- Para o futuro de "observações por passo": annotations leves, com avatar
  do autor, timestamp, threads curtos.

### Material Design (Google)
- Apenas inspiração para elevação. Nosso produto usa pouca sombra — sem
  imitar 1:1.

## Anti-referências (NÃO inspirar-se)

- **Dashboards de marketing** (HubSpot, Mailchimp): cards gigantes, muito
  espaço em branco, cores chamativas. Inadequado.
- **Apps de tarefas pessoais** (Todoist, TickTick): foco em motivação,
  emoji, gamificação. Inadequado para pesquisa institucional.
- **Wireframes "low-fi" puros**: ferramenta de uso prolongado precisa
  visual finalizado, não cinza-em-cinza.

## Inspiração específica por superfície

| Superfície do Anti-Sludge | Referência mais próxima |
|---|---|
| Tela `/processos` (lista) | Linear: views > tabela de issues |
| Tela `/processos/[id]` (hub) | Stripe: detail page com seções |
| Editor de jornada planejada | Notion: tabela de banco de dados |
| Editor de jornada individual | Airtable: row com células densas |
| Questionário (matriz) | GOV.UK: forms longos com agrupamento por seção |
| Resultados / gráficos | Stripe Sigma: dashboards de leitura |
| Modal de screenshot | Linear: modal de attachment, simples |
| Sidebar | Linear: workspace navigation |
| Theme switcher | shadcn/ui (default) |

## Pesquisa para Claude Design

Ao usar o Claude Design para gerar mockups, vale **anexar screenshots
reais** (não só descrições) de:

- Issue list do Linear (densidade + hierarquia)
- Database table do Notion (inline edit + colunas)
- Formulário longo do GOV.UK (estrutura + linguagem)
- Modal de attachment do Linear (proporção e ação)
