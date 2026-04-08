# Projeto F5 - Mapeamento Anti-Sludge

## Arquitetura Obrigatória

Este projeto DEVE seguir:

1. **Feature-based**: Uma pasta por tabela do banco dentro de `app/features/`
2. **Camadas mínimas por feature**: models.py, schemas.py, routes.py, service.py
3. **Repository genérico**: `app/core/base_repository.py` com CRUD básico
4. **Proibido**: value_objects, use_cases separados, mappers complexos

## Regras por Tipo de Tabela

| Tipo | O que gerar |
|------|-------------|
| Domínio (categoria, tipo_comportamento, etc.) | CRUD completo, service simples |
| Avaliação (avaliacao_barreira, avaliacao_impacto) | CRUD + placeholders com TODO para cálculos |
| Views (vw_*) | Apenas endpoint GET, sem model |
| Função SQL | Endpoint POST que chama a função |

## Localização do Schema

O banco de dados está definido em: `database/01_f5_schema_base.sql`

Consulte este arquivo para:
- Nomes exatos de tabelas e colunas
- Relacionamentos (FKs)
- Enums e tipos

## O que NÃO fazer

- Não criar models para views
- Não adicionar abstrações desnecessárias
- Não gerar testes automaticamente
- Não usar SQLAlchemy Core (use ORM com FKs)

## Placeholders de Regras

Para tabelas de avaliação, use este padrão de TODO:

```python
# TODO: [regra específica baseada no contexto do domínio]
# Exemplo: "Calcular média das notas por etapa_id, ignorando NULLs"
pass