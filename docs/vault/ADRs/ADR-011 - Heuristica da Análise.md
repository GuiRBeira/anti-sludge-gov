# ADR 002: Motor de Análise Heurística Fallback

## Status
Aceito (Abril 2026)

## Contexto
O cálculo do Índice de Sludge depende de avaliações manuais (Barreiras e Impactos) feitas por pesquisadores. Em ambientes de demonstração ou no início de um mapeamento, a ausência desses dados resultava em gráficos vazios, o que diminuía a percepção de valor da ferramenta.

## Decisão
Implementamos um "Motor Heurístico" dentro do `CalculateProcessSludgeUseCase` que gera pontuações automáticas baseadas nos metadados da etapa quando não há avaliação humana.

### Lógica da Heurística:
- **Barreira**: Baseada no `tipo_comportamento` ou palavras-chave no nome da etapa (ex: "Anexar" = 4.5, "Espera" = 5.0).
- **Impacto**: Baseado na obrigatoriedade (`e_obrigatorio`) e na existência de tempo planejado.
- **Trigger**: O cálculo é disparado automaticamente no `GET /dashboard/process/{id}`, garantindo que o gráfico nunca esteja defasado.

## Consequências
- **Positivas**: Valor funcional imediato, dashboards sempre preenchidos e "inteligência" demonstrável.
- **Negativas**: Pode mascarar a necessidade de avaliações humanas reais se o usuário confiar apenas na heurística.
