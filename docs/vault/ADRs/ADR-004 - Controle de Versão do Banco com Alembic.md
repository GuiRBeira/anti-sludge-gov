# ADR-004: Controle de Versão do Banco com Alembic

**Status**: 🔵 Aceito
**Data**: 2026-04-13
**Decisores**: @GuiRBeira, Antigravity

## Contexto
O projeto iniciou utilizando scripts SQL manuais para a criação do schema (`01_schema_base.sql`). Embora funcional para o início do protótipo, essa abordagem dificulta a evolução incremental do banco de dados, não permite rollback fácil e não registra o histórico de alterações no código. Para um TCC, a falta de versionamento de banco é uma lacuna técnica.

## Opções Consideradas
- **Opção 1**: Manter scripts SQL manuais (Status Quo).
- **Opção 2**: Migrar para **Alembic** (padrão para projetos SQLAlchemy).
- **Opção 3**: Usar Django Migrations (descartado pois usamos FastAPI).

## Decisão Escolhida
**Opção 2: Alembic**

### Justificativa Racional
O Alembic é a ferramenta de migração oficial recomendada para SQLAlchemy. Ele permite detectar mudanças nos modelos Python e gerar o SQL correspondente automaticamente (`--autogenerate`), garantindo que o código e o banco estejam sempre em sincronia. Além disso, traz um rigor profissional ao projeto de TCC.

### Estratégia de Implementação
Foi realizado um "Reset Limpo" do banco para que a primeira migration (`Baseline`) contivesse todo o schema atual, servindo como ponto de partida oficial para qualquer alteração futura.

### Consequências
- **Positivas**: Versionamento total do banco, facilidade em adicionar/remover colunas, suporte a autogenerate.
- **Negativas**: Pequeno overhead de configuração inicial e necessidade de rodar `alembic upgrade head` após mudanças nos modelos.

## Referências
- [Documentação Oficial do Alembic](https://alembic.sqlalchemy.org/)
- Melhores práticas de persistência em APIs Python.
