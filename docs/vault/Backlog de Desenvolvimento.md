# 📋 Backlog de Desenvolvimento

Lista de tarefas, melhorias e débitos técnicos priorizados para o projeto **Anti-Sludge Gov**.

## 🔴 Prioridade Alta (Segurança e Conformidade)

- [ ] **Trilha de Auditoria (Database Triggers)**
    - Criar tabela `audit_logs` para registrar quem mudou o quê e quando.
    - Implementar triggers no PostgreSQL para as tabelas `processos`, `etapas` e `observacoes`.
    - Garantir que o `auth.uid()` do Supabase seja capturado nos logs.
- [ ] **Conformidade LGPD**
    - Adicionar checkbox de consentimento e termos de uso no fluxo de criação de processos.
    - Implementar política de privacidade básica no sistema.
- [ ] **Acessibilidade (WCAG)**
    - Revisar componentes do Shadcn/UI para garantir tags ARIA corretas.
    - Realizar auditoria via Lighthouse em todas as rotas principais.

## 🟡 Prioridade Média (Funcionalidades e UX)

- [ ] **Finalizar Etapa 4 (Análise)**
    - Implementar dashboards de visualização de dados.
    - Criar gráficos de distribuição de tipo de sludge e comportamento.
- [ ] **Geração de Relatórios PDF**
    - Criar funcionalidade para exportar o diagnóstico completo em formato PDF (padrão Gov.br).
- [ ] **Gestão de Roles (RBAC)**
    - Criar interface administrativa para gerenciar permissões de usuários (já que os dados foram movidos para a tabela).

## 🟢 Prioridade Baixa (Melhorias Contínuas)

- [ ] **Documentação de Nova Feature**
    - Criar template de "Boilerplate" para novas fatias verticais (Vertical Slices).
- [ ] **Histórico de Capturas**
    - Refinar a visualização de sessões capturadas pela extensão no frontend.

---
*Este backlog deve ser revisado semanalmente durante os refinamentos.*
