# ADR-006: Desafios de Containerização e Infraestrutura Monorepo

## Status
Aceito (Implementado)

## Contexto
O projeto foi migrado de um ambiente de desenvolvimento local (node/python direto na máquina) para uma infraestrutura containerizada completa usando `docker-compose` (executado via Podman Rootless). Durante esse processo, diversos desafios técnicos surgiram devido à arquitetura de monorepo e às restrições do ambiente rootless.

## Desafios Encontrados e Soluções

### 1. Restrições de Espaço em Disco (Podman Rootless)
- **Problema**: O build do container Web (Next.js) falhou várias vezes com `no space left on device`. O volume do usuário tinha apenas ~87GB e o build de produção de um monorepo gera gigabytes de camadas temporárias.
- **Solução**: 
    - Limpeza agressiva do sistema (`podman system prune -a`).
    - Remoção de `node_modules` locais, já que o build ocorre dentro do container.
    - Otimização do `.dockerignore` para evitar o envio de pastas como `.next` e `node_modules` locais para o contexto de build.

### 2. Imagens Alpine e Scripts de Bash
- **Problema**: A imagem `node:24-alpine` não contém `bash` por padrão. O projeto utiliza um script de `postinstall` (`scripts/patch-node-prefixes.sh`) que exige `bash`.
- **Solução**: Adição do pacote `bash` via `apk add` na etapa de dependências do `Dockerfile`.

### 3. Contexto de Build em Monorepos
- **Problema**: O `pnpm install` no container falhou porque scripts necessários para o `postinstall` (na raiz do monorepo) não foram copiados na etapa de instalação das dependências (que focava apenas no `package.json` da app).
- **Solução**: Ajuste do `Dockerfile` para copiar a pasta `scripts/` explicitamente antes do `pnpm install`.

### 4. Conflitos de Rede e Porta (Rootless)
- **Problema**: Portas < 1024 não são permitidas por padrão em modo rootless, e processos `rootlessport` zumbis podem travar portas mesmo após o container ser parado.
- **Solução**: 
    - Uso da porta `8080` para o Nginx.
    - Identificação e encerramento manual de processos via `kill -9` quando o Podman não liberava as portas automaticamente.

### 5. Conflito de Baseline do Alembic
- **Problema**: Os scripts de `seed` automáticos do Postgres criavam as tabelas antes do Alembic rodar, gerando erro de `DuplicateTable` ao tentar aplicar a migração de `baseline`.
- **Solução**: Sincronização manual via `alembic stamp head` para alinhar o estado do banco com o histórico de migrações.

## Nota sobre o Tempo de Build
O primeiro build de produção do container Web levou aproximadamente **3 a 4 minutos**. Isso é esperado em monorepos devido a:
1. **Instalação Clean**: O pnpm precisa baixar e resolver centenas de dependências (800+ pacotes).
2. **Compilação de Produção**: O Next.js realiza otimizações pesadas (Tree Shaking, Minificação) durante o `next build`.
3. **Escaneamento de standalone**: A geração do output standalone exige que o Next.js mapeie todas as dependências necessárias para um diretório isolado.

**Builds subsequentes serão 90% mais rápidos** graças ao cache de camadas do Podman.

## Consequências
- A aplicação agora é portável e simulando fielmente o ambiente de produção.
- O desenvolvedor ganhou ferramentas de limpeza e diagnóstico de infraestrutura.
- A documentação de ADR agora reflete as lições aprendidas para futuros colaboradores.
