# 🗄️ Guia de Manutenção do Banco (Alembic)

Este documento descreve como o responsável pelo banco de dados (bolsista) deve gerenciar as alterações de schema no projeto.

## 🛠️ Comandos Essenciais

Todos os comandos devem ser executados dentro da pasta `apps/api` com o ambiente virtual ativo.

### 1. Sincronizar banco local
Sempre que baixar novas versões do código, rode este comando para atualizar o seu Postgres local:
```bash
alembic upgrade head
```

### 2. Criar uma nova migration
Após alterar qualquer arquivo em `app/models/`, gere a migration automática:
```bash
alembic revision --autogenerate -m "descricao curta da mudanca"
```

### 3. Reverter a última alteração (Rollback)
Se algo deu errado e você precisa voltar um passo:
```bash
alembic downgrade -1
```

### 4. Ver o histórico
Para ver a linha do tempo de alterações:
```bash
alembic history --verbose
```

---

## ⚠️ Regras de Ouro
1. **Nunca edite uma migration já commitada**: Se precisar mudar algo, crie uma nova migration.
2. **Revise o arquivo gerado**: O `--autogenerate` é bom, mas não é perfeito. Sempre abra o arquivo em `alembic/versions/` para ver se ele detectou tudo certo.
3. **Suba as migrations com o código**: O arquivo da migration deve ser commitado no Git junto com a alteração nos modelos Python.

## 🐘 Conectividade
As migrações usam as variáveis de ambiente do seu `.env.local`. Tenha certeza de que o container do Postgres está rodando antes de executar os comandos.
