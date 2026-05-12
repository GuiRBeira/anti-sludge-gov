# features/orgs

Órgãos, membros e atribuição de processos a visitantes.

## Cobre da metodologia
- Esfera/órgão dono de cada processo (campo da aba 1 da planilha).
- RBAC por escopo: cada órgão tem seu próprio gestor e analistas.

## Tabelas principais
- `orgao`
- `membro_orgao` (associa profile ↔ orgao com papel)
- `processo_permissao` (atribui processo específico a visitante)

## Telas (futuro)
- `/admin/orgaos` — admin gerencia órgãos.
- `/orgaos/[id]/membros` — gestor gerencia analistas do próprio órgão.
- `/processos/[id]/permissoes` — gestor/admin atribui visitantes.
