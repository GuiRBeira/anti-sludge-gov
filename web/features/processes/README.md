# features/processes

Processo (serviço público sob análise) e seu contexto.

## Cobre da metodologia
- `1 Compreensão do Contexto`: nome, objetivo, abrangência, público-alvo,
  perfil foco, indicadores, hipóteses.

## Tabelas principais
- `processo`

## Server Actions (futuro)
- `criarProcesso(input)` — gestor/admin.
- `salvarContexto(processo_id, input)` — analista/gestor/admin do órgão.
- `arquivarProcesso(processo_id)` — gestor/admin.

## Telas (futuro)
- `/processos` — lista filtrada por escopo do usuário.
- `/processos/novo` — formulário de criação.
- `/processos/[id]` — visão geral + status de completude metodológica.
- `/processos/[id]/contexto` — formulário de contexto.
