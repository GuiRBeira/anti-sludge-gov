# features/auth

Sessão, perfil de usuário (`profile`) e papel global.

## Cobre da metodologia
- Login do analista/gestor/admin/visitante.
- Carregamento do papel global e dos membros de órgão.

## Tabelas principais
- `auth.users` (gerenciado pelo Supabase Auth).
- `profile` (este projeto).

## Notas
- O signup do template oficial (`app/auth/sign-up`) cria o usuário em
  `auth.users`. A tabela `profile` é criada por trigger ou por Server
  Action no primeiro login — definir na Fase 1.
- Helpers de "qual o papel do usuário atual" vivem em
  `web/lib/auth/`, não duplicar aqui.
