# 04 — RBAC e Autorização

## Papéis

| Papel | Onde mora | Escopo |
|---|---|---|
| `admin` | `profile.papel_global` | Tudo, todos os órgãos |
| `gestor` | `membro_orgao.papel_no_orgao` | Tudo dentro do(s) órgão(s) ao qual pertence |
| `analista` | `membro_orgao.papel_no_orgao` | Preenchimento dentro do(s) órgão(s); não cria/apaga processo |
| `visitante` | `profile.papel_global` + `processo_permissao` | Somente os processos atribuídos explicitamente |

Notas:
- Um usuário pode ser `gestor` de um órgão e `analista` de outro
  simultaneamente (linhas separadas em `membro_orgao`).
- `admin` é global; gestores não podem promover ninguém a admin.
- Gestor só gerencia analistas dentro do próprio órgão.
- A partir do MVP v1, visitante é **somente leitura**. A coluna histórica
  `processo_permissao.pode_editar` permanece no schema, mas a migration
  `0009_rbac_visitante_readonly.sql` força `false` e remove edição por essa via.
- A tela `/admin/usuarios` permite ao admin definir papel global, vínculo em
  órgão e atribuição de processos para visitantes.

## Matriz de permissões

| Ação | Admin | Gestor | Analista | Visitante |
|---|:-:|:-:|:-:|:-:|
| Ver todos os órgãos/processos | ✓ | – | – | – |
| Ver processos do próprio órgão | ✓ | ✓ | ✓ | – |
| Ver processos atribuídos | ✓ | ✓ | ✓ | ✓ |
| Criar processo | ✓ | ✓ (no órgão) | – | – |
| Apagar processo | ✓ | ✓ (no órgão) | – | – |
| Editar contexto | ✓ | ✓ | ✓ | – |
| Editar jornadas/questionários | ✓ | ✓ | ✓ | – |
| Gerenciar usuários do órgão | ✓ | ✓ (analistas) | – | – |
| Promover admin | ✓ | – | – | – |
| Exportar dados | ✓ | ✓ (do órgão) | (config.) | – |
| Ver dashboards completos | ✓ | ✓ (do órgão) | ✓ (do órgão) | ✓ (atribuídos) |

## Estratégia RLS

Toda tabela com dados de processo nasce com:

```sql
alter table <tabela> enable row level security;
```

Helper `auth.app_user_can_read_processo(processo_id uuid)` retorna boolean
combinando as três regras: admin global, membro do órgão dono, ou permissão
explícita. Policies de SELECT chamam essa function.

Para INSERT/UPDATE/DELETE existem helpers separados:
- `auth.app_user_can_edit_processo(uuid)` — admin, gestor ou analista do órgão.
  Permissão explícita de visitante **não** concede edição.
- `auth.app_user_can_admin_processo(uuid)` — admin ou gestor do órgão.

Esquema das policies (exemplo `processo`):

```sql
create policy "ler processo no escopo"
  on processo for select
  using (auth.app_user_can_read_processo(id));

create policy "editar processo no escopo"
  on processo for update
  using (auth.app_user_can_edit_processo(id))
  with check (auth.app_user_can_edit_processo(id));

create policy "criar processo (gestor/admin)"
  on processo for insert
  with check (
    -- usuário é admin global OU gestor do órgão alvo
    exists (
      select 1 from profile p
      where p.id = auth.uid() and p.papel_global = 'admin'
    )
    or exists (
      select 1 from membro_orgao m
      where m.profile_id = auth.uid()
        and m.orgao_id = orgao_id
        and m.papel_no_orgao = 'gestor'
    )
  );

create policy "apagar processo (gestor/admin)"
  on processo for delete
  using (auth.app_user_can_admin_processo(id));
```

Tabelas filhas (`etapa`, `jornada`, `passo_jornada`, etc.) chamam o mesmo
helper passando o `processo_id` derivado por join.

## Onde a regra mora

- **Banco**: RLS é a defesa última. Mesmo que o app tenha bug, o banco recusa.
- **Server Actions**: validam Zod + checam permissão de forma legível para
  dar mensagens de erro úteis (em vez do erro cru de RLS).
- **UI**: esconde botões e itens que o usuário não pode usar para reduzir
  fricção. Mas a UI **nunca é a única defesa** — server e RLS sempre
  validam de novo.
