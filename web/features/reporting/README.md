# features/reporting

Gráficos finais e exportação de relatório.

## Cobre da metodologia
- `6 Resultados Graficos` — gráficos finais.
- `#TabDinDim` — tabela dinâmica de dimensionamento.
- Exportação do relatório metodológico (PDF/CSV).

## Gráficos (lista mínima — ver `docs/03_MAPA_PLANILHA_SISTEMA.md`)
- Média de barreiras por critério/categoria/comportamento.
- Média de impactos por subdimensão.
- Comparação barreiras × impactos.
- Tempo absoluto / escalonado / diferença.
- Ranking de sludge por etapa.

## Implementação
- Recharts para todos os gráficos.
- Cada gráfico recebe os dados já agregados via Server Component
  (não fazer agregação no cliente).
- Sempre marcar visualmente "sem dado" quando faltam respostas.

## Exportação (futuro)
- PDF com layout do relatório metodológico.
- CSV com respostas brutas para reanálise externa.
- Server Action `exportarRelatorio(processo_id, formato)`.
