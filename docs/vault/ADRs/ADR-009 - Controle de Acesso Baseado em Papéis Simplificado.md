# ADR-009: Controle de Acesso Baseado em Papéis (RBAC) Simplificado

**Status**: 🔵 Aceito
**Data**: 2026-04-19
**Decisores**: @GuiRBeira

## Contexto
Com a implementação da autenticação Google, surgiu a necessidade de restringir o acesso ao Dashboard e diferenciar as permissões entre administradores (desenvolvedores/professores) e analistas. Além disso, é necessário garantir que usuários não autorizados (visitantes) não acessem dados sensíveis do projeto.

## Opções Consideradas
- **Opção 1**: Gestão de usuários e permissões em tabelas de banco de dados (RBAC completo).
- **Opção 2**: Uso de um serviço externo de gestão de identidade (Clerk/Auth0).
- **Opção 3**: Listas de controle de acesso (ACL) baseadas em variáveis de ambiente (`.env`).

## Decisão Escolhida
**Opção 3**

### Justificativa Racional
1. **Agilidade de MVP**: Permite configurar permissões em segundos sem necessidade de criar telas de gestão de usuários ou migrações de banco.
2. **Custo Zero de Manutenção**: Não exige infraestrutura adicional de persistência ou serviços pagos para a fase de TCC.
3. **Segurança por Obscuridade e Bloqueio**: Usuários não listados nas variáveis de ambiente são automaticamente tratados como `visitor` e redirecionados para fora da aplicação pelo Frontend.

### Consequências
- **Positivas**: Implementação extremamente leve e fácil de auditar via arquivos de configuração.
- **Negativas**: Requer reinicialização do servidor para atualização da lista de usuários e torna-se difícil de gerenciar caso o número de usuários autorizados cresça significativamente.

## Evoluções Futuras
- Migração para uma tabela `User` no PostgreSQL para permitir gestão dinâmica via interface administrativa.
- Integração com escopos de grupos do provedor OIDC (ex: grupos do Google Workspace).
