# features/reporting

Gráficos finais e exportação de relatório.

## Estado atual

Parcial. Os gráficos principais, a tabela dinâmica, o ranking e a exportação
CSV já existem, mas ficam em rotas/componentes de `app/processos/[id]` e
consomem queries de `features/analysis`. Esta pasta ainda não tem código
próprio.

## Cobre da metodologia

- `6 Resultados Graficos` — parcialmente.
- `#TabDinDim` — implementada na página de resultados e no CSV.
- Exportação do relatório metodológico — CSV implementado; PDF pendente.

## Gráficos implementados

- Média de barreiras por critério.
- Média de impactos por critério.
- Necessidade por jornada.
- Tempo total por jornada.
- Lista de barreiras críticas (`media >= 4`).
- Ranking de sludge por etapa.
- Tabela dinâmica de dimensionamento.

## Implementação atual

- Componentes:
  - `web/app/(app)/processos/[id]/resultados/grafico-criterios.tsx`
  - `web/app/(app)/processos/[id]/resultados/grafico-tempos.tsx`
- Dados:
  - `features/analysis/queries.ts`

## Pendências

- PDF com layout do relatório metodológico.
- Exportação em outros formatos além de CSV.
- Mover componentes de relatório para esta feature se a área crescer.
