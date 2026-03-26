
---

## 🔗 Regras de Dependência (OBRIGATÓRIAS)

Estas regras **não devem ser quebradas**:

- `api/`  
  - pode importar: `schema/`, `use_cases/`  
  - **não pode importar**: `models/`, `repositories/`

- `use_cases/`  
  - pode importar: `domain/`, `repositories/`  
  - **não pode importar**: `fastapi`, `sqlalchemy`, `pydantic`

- `domain/`  
  - **não pode importar nada** relacionado a:
    - FastAPI
    - SQLAlchemy
    - Pydantic
    - banco de dados
  - contém apenas regras puras de negócio

- `repositories/`  
  - é o único local autorizado a acessar:
    - `models/`
    - `database.py`
  - encapsula consultas e persistência

- `models/`  
  - contém apenas mapeamento ORM
  - **não contém lógica de negócio complexa**

---

## 📌 Onde cada tipo de lógica deve morar

| Tipo de lógica                              | Local correto        |
|--------------------------------------------|----------------------|
| Rotas HTTP / status codes                  | `api/`               |
| Validação de entrada / saída               | `schema/`            |
| Orquestração de fluxo                      | `use_cases/`         |
| Regras de negócio                          | `domain/`            |
| Queries e persistência                     | `repositories/`      |
| Mapeamento do banco                        | `models/`            |
| Configuração / env                         | `core/`              |

---

## 🧪 Núcleo do Sistema (Core Domain)

O **núcleo do sistema** é o processo de **avaliação de etapas de serviços públicos digitais**, incluindo:

- validação de dimensões avaliativas,
- consistência entre notas e escalas,
- definição de status (avaliado / pendente),
- interpretação dos resultados.

Tudo relacionado a isso:
- **deve passar por `use_cases/`**
- **deve usar regras de `domain/`**

CRUDs administrativos (categorias, tipos, templates) podem ser mais simples.

---

## 🚫 Antipadrões (PROIBIDOS)

- ❌ Regra de negócio em `api/`
- ❌ Endpoint chamando ORM diretamente
- ❌ “Service genérico” que faz tudo
- ❌ Repository retornando ORM cru para a API
- ❌ Endpoint que apenas espelha tabela sem motivo
- ❌ Lógica de domínio duplicada em múltiplos lugares

Se um desses aparecer, **é dívida técnica**.

---

## 🧾 Decisões Arquiteturais Registradas

- **Monólito modular**
  - Motivo: equipe pequena, domínio central forte, deploy simples.
- **PostgreSQL como fonte de verdade**
  - Motivo: modelo relacional, consistência e relatórios.
- **MVP usa subconjunto do modelo de dados**
  - Motivo: foco no fluxo mínimo e validação exploratória.
- **Escala via dados, não via serviços**
  - Motivo: crescimento previsto é por volume de avaliações.

---

## 🚀 Evolução Prevista (quando necessário)

Estas evoluções são **planejadas**, mas **não imediatas**:

- Read models / materialized views para relatórios
- Auditoria e versionamento de avaliações
- Exportação de dados (CSV / PDF)
- Autenticação e permissões
- Particionamento de tabelas de avaliação

Nenhuma dessas deve ser antecipada sem necessidade real.

---

## 🧭 Regra Final

> **Se houver dúvida sobre onde colocar um código, priorize preservar o domínio.**  
> Organização vence pressa. Clareza vence “arquitetura bonita”.