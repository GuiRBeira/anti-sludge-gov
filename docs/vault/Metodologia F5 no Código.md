# Mapeamento da Metodologia F5 no Sistema

Este documento descreve como a **Metodologia F5 Anti-Sludge** está implementada tecnicamente no sistema, servindo de ponte entre a teoria de diagnóstico e as funcionalidades do software.

---

## Fluxo Metodológico vs. Implementação

| Etapa F5 | Nome da Etapa | Objetivo | Componente/Feature no Código |
| :--- | :--- | :--- | :--- |
| **Etapa 1** | **Compreensão do Contexto** | Definir o serviço, público-alvo e hipóteses iniciais. | `ProcessContextForm.tsx` / Feature `processes` |
| **Etapa 2** | **Mapeamento da Jornada** | Desenhar o fluxo passo a passo do usuário. | `EtapaModal.tsx` / `EtapasList.tsx` |
| **Etapa 3** | **Diagnóstico de Sludge** | Identificar fricções, comportamentos e tipos de sludge. | `ObservationForm.tsx` / Feature `observations` |
| **Etapa 4** | **Análise de Resultados** | Gerar indicadores e priorização de intervenções. | Feature `analysis` / `Dashboard` |
| **Etapa 5** | **Plano de Ação** | Propor soluções e melhorias para o serviço. | (Em desenvolvimento) |

---

## Detalhamento das Etapas

### 1. Compreensão do Contexto (Etapa 1)
A primeira etapa coleta dados estruturais do processo governamental.
- **Campos Chave:** Esfera do governo, abrangência, público-alvo e indicadores de desempenho.
- **Entidade no Banco:** Tabela `processos`.
- **Regra de Negócio:** Centralizada no `ProcessContextForm`, onde se define o "foco do mapeamento".

### 2. Mapeamento da Jornada (Etapa 2)
Aqui o pesquisador quebra o serviço em passos menores.
- **Funcionalidade:** O usuário adiciona "Etapas" ao processo.
- **Entidade no Banco:** Tabela `etapas` (relacionada a `processos`).
- **Atributos:** Nome da etapa, se é obrigatória, tempo estimado e descrição.

### 3. Diagnóstico de Sludge (Etapa 3)
A etapa mais crítica, onde se aplica a lente comportamental.
- **Funcionalidade:** Dentro de cada etapa, o usuário adiciona "Observações".
- **Identificadores de Sludge:**
    - **Fricção de Aprendizado:** Dificuldade em entender instruções.
    - **Fricção de Conformidade:** Excesso de documentos ou formulários.
    - **Fricção de Espera:** Prazos excessivos.
- **Entidade no Banco:** Tabela `observacoes` (relacionada a `etapas`).

---

## Glossário de Termos no Código

Para manter a consistência entre o time técnico e os especialistas em metodologia:

- **Sludge:** No código, costuma ser referido como `categoria_sludge` ou dentro das `observações`.
- **Fricção:** Termo genérico para os obstáculos mapeados nas `etapas`.
- **Nudge:** Possíveis sugestões de intervenção (Etapa 5).
- **Persona:** Mapeada no campo `perfil_foco_mapeamento`.

---

## Próximos Passos de Implementação
- [ ] Finalizar o módulo de **Etapa 4 (Análise)** para consolidar as observações em gráficos.
- [ ] Implementar a geração de **Relatórios PDF** automáticos baseados no preenchimento das etapas.
