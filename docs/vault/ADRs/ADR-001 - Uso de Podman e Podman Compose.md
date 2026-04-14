# ADR-001: Uso de Podman e Podman Compose

**Status**: 🔵 Aceito
**Data**: 2026-03-15 (Retroativo)
**Decisores**: @GuiRBeira

## Contexto
No início do projeto, era necessário definir uma tecnologia para o gerenciamento do banco de dados e outros serviços de infraestrutura local. O objetivo era garantir um ambiente de desenvolvimento isolado, reprodutível e fácil de configurar para qualquer colaborador, evitando a instalação manual de dependências como PostgreSQL diretamente no sistema operacional.

## Opções Consideradas
- **Opção 1**: Instalação nativa do PostgreSQL.
- **Opção 2**: Docker e Docker Compose.
- **Opção 3**: **Podman e Podman Compose**.

## Decisão Escolhida
**Opção 3: Podman e Podman Compose**

### Justificativa Racional
O Podman foi escolhido por ser uma alternativa *daemonless* e *rootless* ao Docker, o que oferece maior segurança e facilidade de uso em ambientes Linux modernos (como Fedora/RHEL/Ubuntu). Ele é compatível com o formato de imagens OCI e permite o uso do `docker-compose.yml` através do `podman-compose`, garantindo que o fluxo de trabalho seja idêntico ao padrão da indústria, mas com uma base tecnológica mais leve e segura.

### Estratégia de Implementação
Foi criado um arquivo `docker-compose.yml` na raiz do projeto que orquestra:
- Uma instância do **PostgreSQL 16**.
- Volumes persistentes para dados.
- Mapeamento de porta `5433:5432` para evitar conflitos com instâncias locais pré-existentes.
- Inicialização automática do schema via diretório de bind mount.

### Consequências
- **Positivas**: Setup do projeto em um único comando (`podman-compose up`), isolamento total dos dados, facilidade de reset do banco.
- **Negativas**: Pequena curva de aprendizado para quem nunca utilizou ferramentas de container; necessidade de configurar o socket do Podman para compatibilidade total com algumas ferramentas.

## Referências
- [Podman Official Site](https://podman.io/)
- [PostgreSQL 16 Docker Image](https://hub.docker.com/_/postgres)
- [Podman Compose Documentation](https://github.com/containers/podman-compose)
