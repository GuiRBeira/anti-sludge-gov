# Roadmap de Arquitetura Técnica: Rumo ao DDD Real

## Diagnóstico Atual (Abril 2026)
A aplicação possui uma estrutura híbrida que gera confusão cognitiva para o desenvolvedor:
- **Features Magras**: Pastas em `app/features/` contêm apenas schemas e routers, agindo apenas como "passadores de mensagem".
- **Estrutura Obesa**: As pastas `app/use_cases/`, `app/models/` e `app/repositories/` estão centralizando toda a lógica de todas as features do sistema.
- **Acoplamento**: É difícil isolar uma funcionalidade (ex: Análise) sem mexer em arquivos globais que afetam o sistema todo.

---

## Metas de Evolução

### 1. Migração para Domain-Driven Design (DDD) por Módulo
Cada feature deve ser autossuficiente. A lógica de negócio, os modelos de banco de dados e os repositórios específicos devem morar dentro da pasta da feature.
- **Ação**: Mover `CalculateProcessSludgeUseCase` para `app/features/analysis_results/use_cases.py`.
- **Ação**: Mover modelos de Sludge de `app/models/analysis_model.py` para `app/features/analysis_results/models.py`.

### 2. Implementação de Service Layer
Hoje temos use cases que lidam diretamente com repositórios e lógica pura. Para aumentar a testabilidade, devemos introduzir uma camada de serviço que orquestre essas chamadas.

### 3. Frontend: Componentização de Design System
Temos muitos componentes "ad-hoc" no diretório `components/gov`.
- **Ação**: Consolidar um Storybook para documentar os estados dos `GovCard`, `GovButton` e `GovTag`.
- **Ação**: Padronizar as variantes de cor e sombra em um arquivo de configuração centralizado do Tailwind.

### 4. Segurança: Gestão de Identidade (Auth Service)
Atualmente a segurança depende de listas de e-mail estáticas.
- **Ação**: Implementar uma tabela `users` no banco de dados.
- **Ação**: Criar um módulo de convites para que um Admin possa adicionar novos Pesquisadores sem precisar mexer no `.env`.

---

## Débito Técnico Prioritário
1.  **Refatoração do Analysis Engine**: O use case de análise está "gordo" e fazendo queries complexas. Precisa ser decomposto.
2.  **Testes de Integração**: A API de cálculo heurístico precisa de testes automatizados para garantir que os pesos não quebrem em casos de borda.
