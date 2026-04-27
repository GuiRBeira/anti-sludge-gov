# ADR: Estratégia de Validação e Integridade de Dados

## Contexto
O sistema Anti-Sludge Gov coleta dados brutos de interação via extensão de navegador. Como o sistema será operado por servidores públicos, surge a necessidade de garantir que as jornadas capturadas correspondam de fato aos processos administrativos mapeados, evitando ruído ou dados acidentais.

## Decisões Arquiteturais

### 1. Camada de Verificação Automática (Domain Matching)
Cada `Processo` terá um campo opcional `padrao_url` (regex ou domínio base). 
- **Ação:** O backend comparará as URLs da `SessaoExtensao` com o padrão do processo.
- **Resultado:** Sessões que não coincidirem receberão uma flag `inconsistente`.

### 2. Princípio da Curadoria Humana (Assisted Analysis)
Nenhum dado bruto da extensão impactará o Índice de Sludge global sem que um Pesquisador (Servidor) a valide manualmente através da funcionalidade de "Vincular Etapa".
- **Justificativa:** Mitiga o risco de capturas acidentais e respeita a "Fé Pública" do servidor, que atua como curador do dado científico.

### 3. Rastreabilidade Total
Toda `SessaoExtensao` deve portar o ID do usuário que realizou a captura.
- **Justificativa:** Garantia de auditoria e responsabilidade técnica sobre o mapeamento.

### 4. Score de Confiança (Futuro)
Implementar heurística que avalia a densidade de interações (cliques/teclas) vs tempo de permanência para identificar sessões "mortas" ou inválidas.

## Consequências
- Maior confiabilidade nos dados apresentados em relatórios oficiais.
- Necessidade de atualização do modelo `Processo` para incluir regras de validação por URL.
