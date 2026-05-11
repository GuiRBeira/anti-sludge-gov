# 📋 Backlog de Desenvolvimento

Lista de funcionalidades e melhorias priorizadas para o projeto **Anti-Sludge Gov**.

## 🔴 Funcionalidades Essenciais (Faltando)

- [ ] **Módulo de Plano de Ação (Etapa 5)**
    - Interface para sugerir intervenções (Nudges) para cada sludge identificado.
    - Espaço para documentar o "estado futuro" desejado para o serviço.
- [ ] **Painel Consolidado de Diagnóstico (Etapa 4)**
    - Visualização de indicadores de carga administrativa (tempo total, esforço cognitivo).
    - Gráficos de calor identificando em quais etapas o "Sludge" está mais concentrado.
- [ ] **Geração de Relatório de Auditoria (PDF)**
    - Exportação automática de um dossiê técnico com todo o mapeamento, pronto para ser entregue aos gestores do serviço seguindo o padrão Gov.br.
- [ ] **Sistema de Sugestão de Melhorias (Recomendação)**
    - Motor que sugere soluções baseadas no tipo de fricção detectada (ex: se for erro de preenchimento, sugerir simplificação de formulário).

## 🟡 Funcionalidades de Gestão e UX

- [ ] **Comparativo de Serviços (Benchmarking)**
    - Ferramenta para comparar o nível de sludge entre diferentes órgãos ou esferas do governo.
- [ ] **Gestão de Usuários e Permissões (RBAC)**
    - Interface para convidar pesquisadores e definir quem pode editar quais diagnósticos.
- [ ] **Módulo de Notificações e Alertas**
    - Avisos automáticos quando um serviço atinge níveis críticos de carga administrativa.
- [ ] **Acessibilidade (WCAG)**
    - Revisão completa de tags ARIA e navegação por teclado para garantir conformidade legal.

## 🟢 Melhorias de Qualidade de Uso

- [ ] **Histórico de Evolução (Timeline)**
    - Visualizar como um serviço melhorou (ou piorou) ao longo do tempo após as intervenções aplicadas.
- [ ] **Central de Ajuda e Glossário F5**
    - Tooltips e guias integrados para ajudar o pesquisador a classificar corretamente os tipos de sludge durante o diagnóstico.
- [ ] **Histórico de Capturas da Extensão**
    - Refinar a interface de visualização das sessões capturadas automaticamente para análise.

---

## 🛠️ Débitos Técnicos (Arquitetura)
*Nota: Itens internos necessários para a sustentabilidade do sistema.*
- Trilha de Auditoria (Database Triggers).
- Refatoração para DDD (Domain-Driven Design).
- Testes de Integração para a Heurística de Cálculo.
