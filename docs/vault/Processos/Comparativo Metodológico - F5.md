# 📊 Comparativo Metodológico: Planilha vs. Sistema

Este documento apresenta uma auditoria técnica comparando a **Metodologia F5 (Planilha)** com o estado atual de implementação no **Backend (API)** e no **Frontend (Web)**.

---

## ⚖️ Matriz de Maturidade (Status de Implementação)

| Módulo / Funcionalidade         | Planilha F5 (Requisito)                            | Backend (FastAPI)                                                             | Frontend (Next.js)                                                    |
| :------------------------------ | :------------------------------------------------- | :---------------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| **1. Catálogo de Conhecimento** | 14 Critérios, Comportamentos e Escalas.            | **✅ 100%:** Endpoints de catálogo e validação de domínio prontos.             | **⚠️ 40%:** Exibe opções em formulários, mas não permite gestão.      |
| **2. Sludge Engine (Cálculos)** | Fórmulas de Índice de Sludge (Barreira x Impacto). | **✅ 100%:** Motor heurístico implementado em `sludge_logic.py`.               | **❌ 0%:** Ainda não consome os endpoints de resultados analíticos.    |
| **3. Análise Diferencial**      | Comparativo: Jornada Planejada vs. Jornada Real.   | **✅ 90%:** Engine calcula desvios de tempo e etapas omitidas automaticamente. | **❌ 0%:** Interface de comparação visual inexistente.                 |
| **4. Telemetria Automática**    | Captura de sessões via extensão de navegador.      | **✅ 80%:** Infraestrutura de recepção e persistência de sessões operacional.  | **❌ 10%:** Falta ferramenta de "chunking" (vincular vídeo a etapas).  |
| **5. Dashboard e Matriz**       | Gráficos de coordenadas e Matriz de Priorização.   | **✅ 100%:** API entrega coordenadas (X, Y) prontas para plotagem.             | **⚠️ 20%:** Dashboard genérico, sem plotagem da Matriz de Prioridade. |
| **6. Relatórios (PDF)**         | Exportação de dossiê metodológico completo.        | **❌ 0%:** Gerador de binário PDF não iniciado.                                | **❌ 0%:** UI de solicitação de relatório não iniciada.                |

---

## 🔍 Detalhamento dos Gaps (Lacunas)

### A. Inteligência vs. Visibilidade
O **Backend** já evoluiu de um sistema de cadastro (CRUD) para um sistema de suporte à decisão. Ele já "sabe" onde estão os gargalos do serviço público. O **Frontend** atualmente é o gargalo do projeto, pois age apenas como uma interface de entrada de dados, não exibindo a inteligência calculada pela API.

### B. O diferencial "Planejado vs. Real"
Este é o maior trunfo da metodologia F5. O Backend já possui o `DifferentialEngine` que identifica se um cidadão demorou 10 minutos em uma etapa que deveria durar 2.
*   **Ação Necessária:** Criar no Frontend a visualização da **"Jornada Fantasma"** (etapas extras que o usuário fez e que não estavam no plano original).

### C. Gestão do Conhecimento (Catalog)
A planilha de 02.04 é muito rica em definições. No Backend, isso foi transformado em regras de validação (ex: você não pode atribuir um critério de "Inércia" a um comportamento de "Excesso de Opções").
*   **Ação Necessária:** O Frontend precisa refletir essas restrições para evitar erros de preenchimento pelo pesquisador.

---

## 🎯 Conclusão para Apresentação
O projeto possui uma **fundação técnica robusta** e fiel à metodologia F5. O backend está pronto para sustentar uma aplicação de nível enterprise. O foco imediato do cronograma deve ser a **integração das telas de visualização de dados (Dashboards)** e a **ferramenta de análise diferencial**, que são os itens de maior impacto visual e acadêmico para o TCC.

---
*Documento atualizado em: 2026-05-11*
