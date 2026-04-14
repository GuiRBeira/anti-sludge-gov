# Banco de Dados — Anti-Sludge Gov

## Visão Geral

- **SGBD:** PostgreSQL 16
- **ORM:** SQLAlchemy 2.x (async com driver `psycopg` v3)
- **Migrations:** Alembic
- **Script SQL de referência:** `database/f5_mapeamento_antisludge.sql`

O banco é gerenciado de duas formas complementares:

| Forma | Quando usar |
|-------|-------------|
| Script SQL (`initdb.d`) | Primeira inicialização do container Docker (banco zerado) |
| Alembic migrations | Evoluções incrementais em banco já existente |

---

## Credenciais

| Parâmetro | Valor (desenvolvimento) |
|-----------|------------------------|
| Host | `localhost` |
| Porta | `5433` (Docker mapeia `5433→5432`) |
| Banco | `antisludge` |
| Usuário | `admin` |
| Senha | `secret` |

Crie o arquivo `apps/api/.env` com essas credenciais:

```ini
DB_USER=admin
DB_PASS=secret
DB_HOST=localhost
DB_PORT=5433
DB_NAME=antisludge
DB_SSLMODE=disable
```

---

## Subindo o Banco (Docker)

```bash
# Da raiz do projeto
docker-compose up -d

# Verificar se está rodando
docker-compose ps

# Verificar logs do banco
docker-compose logs db
```

Na **primeira inicialização**, o Docker executa automaticamente todos os `.sql` do diretório `apps/api/database/` (montado em `/docker-entrypoint-initdb.d`). Isso cria todas as tabelas, enums, views, funções e dados iniciais.

> **Atenção:** O script `initdb.d` só roda quando o volume `postgres_data` está vazio. Se o banco já existir, use Alembic para evoluir o schema.

---

## Alembic — Migrations

### Situação atual das revisões

| Revisão | Descrição |
|---------|-----------|
| `a1a3a8ab2ab9` | Baseline — todas as tabelas originais do projeto |
| `e2730d4d224b` | Tabelas de sessão da extensão do navegador |

### Fluxo padrão (banco já existente)

```bash
cd apps/api

# 1. Ver status atual
alembic current

# 2. Ver histórico de migrations
alembic history --verbose

# 3. Aplicar todas as migrations pendentes
alembic upgrade head
```

### Banco novo (criado fora do Docker / sem initdb)

```bash
cd apps/api

# Aplicar tudo do zero (baseline + migrations)
alembic upgrade head
```

### Banco inicializado pelo Docker (script SQL já executado)

O Docker já cria as tabelas via SQL, mas o Alembic não sabe disso. É preciso "carimbar" o baseline antes de aplicar migrations incrementais:

```bash
cd apps/api

# 1. Registrar o baseline sem executar SQL (banco já tem as tabelas)
alembic stamp a1a3a8ab2ab9

# 2. Aplicar apenas as migrations novas
alembic upgrade head
```

### Criando uma nova migration

```bash
cd apps/api

# Gerar migration automaticamente a partir dos modelos ORM
alembic revision --autogenerate -m "descricao da mudanca"

# Revisar o arquivo gerado em alembic/versions/
# Depois aplicar:
alembic upgrade head
```

> **Importante:** Sempre revise o arquivo gerado antes de aplicar. O `--autogenerate` pode não detectar mudanças em enums nativos do PostgreSQL, constraints `CHECK` complexas ou funções/triggers.

### Desfazer a última migration (rollback)

```bash
# Voltar uma revisão
alembic downgrade -1

# Voltar para uma revisão específica
alembic downgrade a1a3a8ab2ab9

# Voltar tudo (banco vazio)
alembic downgrade base
```

---

## Adicionando novos modelos ao Alembic

Para que o `--autogenerate` detecte novos modelos, eles precisam:

1. **Herdar de `Base`** (de `app/models/base_model.py`)
2. **Estar importados em `app/models/__init__.py`**

Exemplo — ao criar `app/models/meu_model.py`:

```python
# app/models/__init__.py
from app.models.meu_model import MeuModel

__all__ = [..., "MeuModel"]
```

---

## Estrutura do Banco

### Tabelas de Domínio (catálogo / lookup)

| Tabela | Descrição |
|--------|-----------|
| `categoria` | Categorias de comportamento (ex: Busca e Acesso) |
| `tipo_comportamento` | Tipos específicos dentro de cada categoria |
| `criterio_template` | 14 critérios de avaliação de barreiras |
| `grupo_analise` | Lentes de análise (Cidadania Digital, Clareza, etc.) |
| `tipo_criterio` | Relação entre tipo de comportamento e critério |
| `escala_avaliacao` | Escalas de 1–5 por combinação critério+tipo |
| `glossario` | Glossário de termos da Metodologia F5 |

### Tabelas de Processo

| Tabela | Descrição |
|--------|-----------|
| `processo` | Serviço público digital mapeado |
| `etapa` | Passos da jornada do usuário no processo |

### Tabelas de Observação

| Tabela | Descrição |
|--------|-----------|
| `observador` | Metadados do observador/pesquisador |
| `jornada_observada` | Sessão formal de observação de um usuário |
| `tempo_etapa` | Tempo real gasto em cada etapa por jornada |

### Tabelas de Análise

| Tabela | Descrição |
|--------|-----------|
| `criterio_barreira` | Avaliação de barreira por etapa (escala 1–5) |
| `criterio_impacto` | Avaliação de impacto por etapa (Carga Cognitiva, Emoção, Consequência) |
| `avaliacao_barreira` | Notas registradas por jornada para cada critério de barreira |
| `avaliacao_impacto` | Notas registradas por jornada para cada critério de impacto |
| `resultado_analise` | Índice de Sludge agregado por etapa/processo |

### Tabelas da Extensão do Navegador

| Tabela | Descrição |
|--------|-----------|
| `sessao_extensao` | Sessão de gravação capturada pela extensão Plasmo |
| `pagina_extensao` | Páginas visitadas em cada sessão |
| `interacao_extensao` | Cliques individuais com posição do mouse e metadados do elemento HTML |

#### Relacionamentos da extensão

```
sessao_extensao
  ├── processo_id         → processo (FK opcional)
  ├── jornada_observada_id → jornada_observada (FK opcional, vinculado depois)
  └── paginas []
        └── pagina_extensao
              └── interacoes []
                    └── interacao_extensao
                          ├── pos_x, pos_y           (pixels na viewport)
                          ├── pos_x_relativa, pos_y_relativa  (% da tela)
                          ├── elemento_tag, elemento_id, elemento_classe
                          └── elemento_texto
```

### Enums

| Enum | Valores |
|------|---------|
| `esfera_governo_enum` | `Federal`, `Estadual`, `Municipal` |
| `abrangencia_enum` | `Público Geral`, `Público Específico` |
| `criterio_impacto_enum` | `Carga Cognitiva`, `Emoção`, `Consequência` |
| `tipo_evidencia_enum` | `Fala`, `Comportamento no sistema`, `Fala e Comportamento no sistema` |
| `tipo_interacao_enum` | `click`, `scroll` |

### Views

| View | Descrição |
|------|-----------|
| `vw_resumo_barreiras_etapa` | Média de barreiras por etapa |
| `vw_resumo_impactos_etapa` | Média de impactos por etapa |
| `vw_indice_sludge` | Índice de Sludge por etapa (barreira × impacto) com nível de prioridade |
| `vw_dashboard_processo` | Métricas agregadas por processo |

---

## Conexão direta ao banco (psql)

```bash
# Via Docker
docker exec -it $(docker-compose ps -q db) psql -U admin -d antisludge

# Via psql local (porta 5433)
psql -h localhost -p 5433 -U admin -d antisludge
```

Comandos úteis dentro do `psql`:

```sql
-- Listar tabelas
\dt

-- Ver status das migrations do Alembic
SELECT * FROM alembic_version;

-- Ver índice de sludge por etapa
SELECT * FROM vw_indice_sludge;
```

---

## Problemas Comuns

### `relation "X" already exists`
O banco foi criado pelo script SQL do Docker, mas o Alembic tentou aplicar o baseline do zero. Solução:
```bash
alembic stamp a1a3a8ab2ab9
alembic upgrade head
```

### `Target database is not up to date`
Há migrations pendentes. Não é possível gerar uma nova até aplicar as existentes:
```bash
alembic upgrade head
# Depois gerar a nova:
alembic revision --autogenerate -m "minha migration"
```

### `Connection refused` na porta 5432
O Docker mapeia para a porta `5433`. Verifique o `.env`:
```ini
DB_PORT=5433
```

### `password authentication failed`
As credenciais do Docker são `admin`/`secret`, não os defaults do código. Crie o `.env` conforme a seção [Credenciais](#credenciais).
