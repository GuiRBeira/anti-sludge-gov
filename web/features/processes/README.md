# features/processes

Processo (serviço público sob análise), contexto e metadados.

## Estado atual

Implementado.

## Cobre da metodologia

- `1 Compreensão do Contexto`: nome, objetivo, abrangência, público-alvo,
  perfil foco, indicadores e hipóteses.
- Dashboard/lista de processos filtrada por RLS e escopo do usuário.
- Visão geral de completude metodológica do processo.

## Tabelas principais

- `processo`
- `orgao` (via `orgao_id`)

## Server Actions

- `criarProcesso(input)` — admin ou gestor no escopo permitido pelo RLS.
- `salvarContexto(processo_id, input)` — admin/gestor/analista com edição.
- `editarProcessoMeta(processo_id, input)` — admin ou gestor do órgão atual e
  do órgão de destino.
- `arquivarProcesso(processo_id)` — admin ou gestor do órgão.

## Telas

- `/processos`
- `/processos/novo`
- `/processos/[id]`
- `/processos/[id]/editar`
- `/processos/[id]/contexto`

## Observações de permissão

Visitante só lê processos atribuídos. Analista preenche contexto e demais
informações do processo, mas não cria/apaga processos nem edita metadados.
