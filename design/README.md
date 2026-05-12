# Design — Anti-Sludge Gov

Material de design para guiar a evolução visual e de UX do Anti-Sludge Gov.
Inclui persona de design adotada, princípios, sistema de design, inventário
de telas, comportamento responsivo, acessibilidade e referências.

A pasta foi montada com dois propósitos:

1. **Guia interno**: orientar futuras decisões de UI/UX no projeto.
2. **Briefing externo**: ser anexada inteira a uma sessão no Claude Design
   (claude.ai/design) para gerar mockups e protótipos consistentes.

> **Direção estética (2026-05)**: alinhada à **identidade visual real da
> FCINCO** descoberta em [`../IMAGENS/`](../IMAGENS/) — watercolor + ink
> linework + handlettering + paleta verde teal #1FB597 / amarelo mostarda
> #F4B400 / vermelho watercolor #C8252A. A metáfora central da
> JornadaTimeline vem da peça **"TRILHA COMUM"** da FCINCO (mapa com
> trilha pontilhada). Versão anterior (Linear/Notion/GOV.UK editorial)
> foi substituída — ver `01-persona.md`.

## Como ler

Ordem sugerida:

1. [`01-persona.md`](./01-persona.md) — quem está desenhando e por quê.
2. [`02-principles.md`](./02-principles.md) — regras que orientam decisões.
3. [`03-design-system.md`](./03-design-system.md) — tokens e componentes.
4. [`04-themes.md`](./04-themes.md) — paletas claro/escuro.
5. [`05-screen-inventory.md`](./05-screen-inventory.md) — todas as telas e estados.
6. [`06-responsive.md`](./06-responsive.md) — breakpoints e adaptação.
7. [`07-accessibility.md`](./07-accessibility.md) — checklist WCAG.
8. [`08-references.md`](./08-references.md) — produtos de referência.
9. [`09-brief-for-claude-design.md`](./09-brief-for-claude-design.md) — prompt pronto.

## Contexto do produto

Resumo de uma frase: **ferramenta web para a equipe FCINCO/MGI aplicar a
metodologia F5 Anti-Sludge em serviços públicos digitais**, mapeando
jornadas, observando usuários, respondendo questionários estruturados de
barreiras e impactos, e gerando gráficos rastreáveis.

Não é dashboard de consumo. É **ferramenta de trabalho** — densidade
informacional importa mais que efeitos visuais. Pessoas vão passar horas
preenchendo coisas aqui.

Detalhes de produto e arquitetura em [`../docs/`](../docs/) (auditoria,
domínio F5, mapa de cobertura).

Assets visuais da FCINCO em [`../IMAGENS/`](../IMAGENS/) — incluindo a
página HTML oficial salva, banners institucionais, ilustrações watercolor
e tipografia handlettered. **Esses são a fonte da verdade visual.**
