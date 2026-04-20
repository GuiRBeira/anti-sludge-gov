# 🗺️ Mapa de Navegação (Frontend)

Este documento descreve as rotas, o propósito de cada página e as decisões arquiteturais que as impactam.

## Estrutura de Páginas

| Rota | Descrição | Nível de Acesso | ADRs Relacionadas |
| :--- | :--- | :--- | :--- |
| `/login` | Porta de entrada com botão de login social. | Público | [[ADR-007]], [[ADR-010]] |
| `/` | Dashboard principal com métricas consolidadas. | Admin / Analista | [[ADR-007]], [[ADR-009]], [[ADR-010]] |
| `/processos` | Listagem de todos os serviços públicos mapeados. | Admin / Analista | [[ADR-010]] |
| `/processos/[id]` | Detalhes, fluxograma e análise de sludge de um processo. | Admin / Analista | [[ADR-004]], [[ADR-010]] |

---

## Detalhamento das Telas

### 1. Página de Login (`/login`)
- **Propósito**: Autenticar o usuário via Google para garantir a soberania de dados.
- **Impacto ADR**: Implementada conforme a [[ADR-007]] para evitar gestão de senhas no banco local. Utiliza [[ADR-010]] para manter o padrão visual GOV.BR.

### 2. Dashboard Geral (`/`)
- **Propósito**: Exibir o "Índice de Sludge" (Fricção) de forma visual.
- **Impacto ADR**: Utiliza o motor de visualização que consome dados da [[ADR-008]] (telemetria da extensão). A proteção de acesso (quem pode ver) é definida pela [[ADR-009]].

### 3. Detalhes do Processo (`/processos/[id]`)
- **Propósito**: Permitir que o Analista veja onde estão as barreiras de um serviço.
- **Impacto ADR**: O mapeamento das etapas segue a lógica de validação externa da [[ADR-004]].

---

## Componentes Compartilhados
- **Shell**: Componente pai que gerencia a segurança de rota ([[ADR-007]]) e o layout lateral.
- **Gov Components**: Abstrações dinâmicas de UI conforme a [[ADR-010]].
