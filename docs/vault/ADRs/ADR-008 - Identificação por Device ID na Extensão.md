# ADR-008: Identificação de Coleta por Device ID na Extensão

**Status**: 🔵 Aceito
**Data**: 2026-04-19
**Decisores**: @GuiRBeira

## Contexto
A extensão deve coletar dados de jornadas de usuários (cobaias) em sites governamentais. Exigir login na extensão criaria um "sludge" (fricção) que prejudicaria a amostragem de dados e a adesão dos voluntários.

## Opções Consideradas
- **Opção 1**: Login obrigatório via Google na extensão.
- **Opção 2**: Envio de dados totalmente anônimo.
- **Opção 3**: Identificação via Device ID (UUID) + API Key Estática.

## Decisão Escolhida
**Opção 3**

### Justificativa Racional
1. **Baixa Fricção**: O usuário instala e a extensão já começa a funcionar, gerando um ID único internamente.
2. **Rastreabilidade**: O Device ID permite agrupar múltiplas jornadas de um mesmo "voluntário" sem identificá-lo pessoalmente (PII), respeitando a privacidade.
3. **Segurança Básica**: A API Key evita que robôs genéricos descubram o endpoint de coleta e enviem lixo.

### Consequências
- **Positivas**: Maior volume de dados coletados; conformidade com privacidade por design.
- **Negativas**: Risco de extração da API Key do código da extensão (mitigável via rate limit).

## Referências
- [Chrome Extension Storage API](https://developer.chrome.com/docs/extensions/reference/storage/)
- [Privacy by Design in Data Collection](https://en.wikipedia.org/wiki/Privacy_by_design)
