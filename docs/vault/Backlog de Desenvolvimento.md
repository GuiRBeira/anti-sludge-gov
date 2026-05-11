# 📋 Backlog de Desenvolvimento

Lista de funcionalidades e melhorias priorizadas para o projeto **Anti-Sludge Gov**.

## 🔴 Funcionalidades Essenciais (Faltando)

- [ ] **Módulo de Plano de Ação (Etapa 5)** `[ALTA PRIORIDADE]`
    - Interface para sugerir intervenções (Nudges) para cada sludge identificado.
    - Espaço para documentar o "estado futuro" desejado para o serviço.
- [ ] **Painel Consolidado de Diagnóstico (Etapa 4)** `[ALTA PRIORIDADE]`
    - Visualização da **Matriz de Priorização** (Barreira x Impacto).
    - Gráficos de calor identificando em quais etapas o "Sludge" está mais concentrado.
- [ ] **Geração de Relatório de Auditoria (PDF)** `[ALTA PRIORIDADE]`
    - Exportação automática de um dossiê técnico com todo o mapeamento, pronto para ser entregue aos gestores do serviço seguindo o padrão Gov.br.

## 🟡 Funcionalidades de Gestão e UX (Delegáveis)

- [ ] **Módulo de Glossário e Ajuda Integrada** `[DELEGÁVEL]`
    - Tooltips e guias integrados para ajudar o pesquisador a classificar corretamente os tipos durante o diagnóstico.
- [ ] **Comparativo de Serviços (Benchmarking)** `[DELEGÁVEL]`
    - Ferramenta para comparar o nível de sludge entre diferentes órgãos ou esferas do governo.
- [ ] **Gestão de Usuários e Permissões (RBAC)** `[DELEGÁVEL]`
    - Interface para convidar pesquisadores e definir papéis (Admin, Supervisor, Pesquisador).
- [ ] **Acessibilidade (WCAG)** `[DELEGÁVEL]`
    - Revisão completa de tags ARIA e navegação por teclado para garantir conformidade legal.

## 🟢 Melhorias de Qualidade de Uso

- [ ] **Visualização da "Jornada Fantasma"**
    - Interface comparativa visual entre a jornada planejada e a telemetria capturada pela extensão.
- [ ] **Histórico de Evolução (Timeline)**
    - Visualizar como um serviço melhorou (ou piorou) ao longo do tempo após as intervenções aplicadas.
- [ ] **Refinamento de Capturas da Extensão**
    - Melhorar o player de visualização das interações capturadas automaticamente.

---

## 🛠️ Débitos Técnicos (Arquitetura)
*Nota: Itens internos necessários para a sustentabilidade do sistema.*
- Trilha de Auditoria (Database Triggers para log de alterações).
- Refatoração para DDD (Domain-Driven Design) para isolar completamente as features.
- Testes de Integração para a Heurística de Cálculo (SludgeCalculator).
