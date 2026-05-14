# features/orgs

Órgãos, vínculos de usuários e atribuição de processos a visitantes.

## Estado atual

Implementado.

## Cobre da metodologia

- Esfera/órgão dono de cada processo.
- RBAC por escopo institucional.
- Gestão de papéis globais (`admin`, `gestor`, `analista`, `visitante`).
- Vínculo de gestores/analistas por órgão.
- Atribuição explícita de processos para visitantes.

## Tabelas principais

- `orgao`
- `profile`
- `membro_orgao`
- `processo_permissao`

## Server Actions

- `criarOrgao(input)`
- `atualizarPapelGlobal(formData)`
- `definirMembroOrgao(formData)`
- `removerMembroOrgao(formData)`
- `atribuirProcessoVisitante(formData)`
- `removerPermissaoProcesso(formData)`

## Telas

- `/admin/orgaos` — somente admin.
- `/admin/usuarios` — admin vê gestão completa; gestor vê modo limitado para
  analistas dos órgãos que gerencia.

## Pendências

- Fluxo de convite por e-mail ainda não existe.
- Auditoria visual das alterações de papel ainda depende de futura camada de
  logs operacional.
