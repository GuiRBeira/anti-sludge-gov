# ADR-003: Estratégia de Seeding Automatizado

**Status**: 🔵 Aceito
**Data**: 2026-03-25 (Retroativo)
**Decisores**: @GuiRBeira

## Contexto
O projeto Anti-Sludge exige uma base de dados rica em metadados (categorias de comportamento, critérios de impacto, glossário e grupos de análise) para que as funcionalidades de dashboard e mapeamento funcionem corretamente desde o primeiro acesso. Iniciar o projeto com um banco vazio exigiria um esforço manual repetitivo de cadastro a cada novo ambiente de desenvolvimento ou reset de container.

## Opções Consideradas
- **Opção 1**: Cadastro manual via interface administrativa.
- **Opção 2**: Scripts de seeding em Python (SQLAlchemy/Alembic).
- **Opção 3**: **Scripts SQL nativos via Docker Entrypoint**.

## Decisão Escolhida
**Opção 3: Scripts SQL nativos via Docker Entrypoint**

### Justificativa Racional
A escolha de utilizar a funcionalidade nativa do PostgreSQL de executar scripts no diretório `/docker-entrypoint-initdb.d/` foi baseada na simplicidade e confiabilidade:
1. **Ordem de Execução**: Os arquivos são executados em ordem alfabética, permitindo separar claramente o Schema (`01`), os Dados Iniciais (`02`) e as Views/Functions (`03`).
2. **Independência de Código**: O banco de dados é populado independentemente do estado ou da linguagem da aplicação backend, garantindo que mesmo ferramentas externas de BI possam acessar um banco estruturado sem rodar o servidor FastAPI.
3. **Performance**: O seeding via SQL puro no momento da criação do volume é extremamente rápido e não consome recursos do worker da aplicação.

### Estratégia de Implementação
O diretório `apps/api/database/` é montado como um volume *read-only* no container de banco de dados conforme definido no `docker-compose.yml`:
- `01_schema_base.sql`: Define as tabelas e relacionamentos.
- `02_initial_data.sql`: Contém os INSERTs reais de Grupos de Análise (Cidadania Digital, Clareza, etc.), Categorias (Busca e Acesso, etc.) e Tipos de Comportamento.
- `03_views_functions.sql`: Define lógicas de agregação complexas diretamente no banco.

### Consequências
- **Positivas**: "Basta rodar e funciona"; banco de dados sempre pronto para demonstração; consistência total entre ambientes.
- **Negativas**: Mudanças estruturais no schema após a criação do volume exigem o reset do volume do banco (`podman-compose down -v`) ou a aplicação manual de migrações, o que levou à necessidade posterior do ADR-004 (Alembic) para lidar com a evolução do banco.

## Referências
- [PostgreSQL Docker Hub - Initialization Scripts](https://hub.docker.com/_/postgres#:~:text=Initialization%20scripts)
- [Metodologia F5 - Mapeamento Anti-Sludge](file:///home/gui/Documents/Projects/anti-sludge-gov/docs/vault/Requisitos/Metodologia%20F5.md) (Contexto dos dados inseridos).
