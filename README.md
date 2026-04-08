# anti-sludge-gov

Ferramenta digital anti-sludge para identificação e mensuração de barreiras em serviços públicos digitais. Projeto de extensão (UTFPR + CINCO/MGI) e base tecnológica do TCC, envolvendo análise de interface, ciência comportamental, acessibilidade e modelos de IA para auditoria automatizada de fricção digital.

## 🚀 Visão Geral

O projeto visa combater o "sludge digital" — fricções desnecessárias que dificultam o acesso do cidadão aos serviços públicos online. Através de uma abordagem baseada em ciência comportamental e acessibilidade, identificamos, mensuramos e ajudamos a eliminar barreiras em jornadas digitais governamentais.

### 🎯 Objetivos Principais

- **Identificar barreiras**: Detectar pontos de fricção em serviços públicos digitais
- **Mensurar impacto**: Quantificar o esforço cognitivo e emocional do usuário
- **Auditoria automatizada**: Usar IA para identificar padrões de sludge
- **Suporte à decisão**: Fornecer dados para priorização de melhorias

## 🛠️ Stack Tecnológica

### Backend
- **Framework**: FastAPI (Python)
- **Banco de Dados**: PostgreSQL
- **ORM**: SQLAlchemy
- **Autenticação**: JWT + bcrypt
- **Modelos de IA**: Transformers (Hugging Face)

### Frontend
- **Framework**: React 19
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Gerenciamento de Estado**: TanStack Query
- **UI Components**: DSGov 

### Extensão de Navegador
- **Framework**: Plasmo
- **Tecnologia**: WebExtension API (Chrome/Firefox)
- **Comunicação**: WebSockets

## 📂 Estrutura do Projeto

```
anti-sludge-gov/
├── apps/
│   ├── api/           # Backend API (FastAPI)
│   │   ├── app/
│   │   │   ├── core/      # Configuração, banco de dados, auth
│   │   │   ├── features/  # Módulos por tabela (models, schemas, routes)
│   │   │   └── main.py    # Ponto de entrada da API
│   │   └── database/    # Scripts SQL de schema
│   ├── extension/     # Extensão de navegador (Plasmo)
│   └── web/           # Frontend (React)
├── docs/              # Documentação do projeto
├── scripts/           # Scripts utilitários
└── README.md          # Este arquivo
```

## 🚀 Como Executar

### Pré-requisitos

- Docker e Docker Compose
- Node.js 18+ e npm
- Python 3.10+

### 1. Banco de Dados

```bash
# Iniciar banco de dados
docker-compose up -d db

# Aplicar schema inicial
cd apps/api
psql -U postgres -h localhost -p 5432 -d anti_sludge < database/01_f5_schema_base.sql
```

### 2. Backend

```bash
# Instalar dependências
cd apps/api
pip install -r requirements.txt

# Iniciar servidor
uvicorn app.main:app --reload
```

A API estará disponível em `http://localhost:8000`

### 3. Frontend

```bash
# Instalar dependências
cd apps/web
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:3000`

### 4. Extensão de Navegador

```bash
# Instalar dependências
cd apps/extension
npm install

# Iniciar em modo de desenvolvimento
npm run dev
```

Para testar no Chrome:
1. Abra `chrome://extensions`
2. Habilite "Modo de desenvolvedor"
3. Clique em "Carregar sem compactação"
4. Selecione a pasta `apps/extension/dist`

## 📊 Funcionalidades

### Backend
- CRUD completo para todas as tabelas do schema
- Endpoints para avaliação de barreiras
- Integração com modelos de IA para análise de sludge
- Autenticação JWT

### Frontend
- Dashboard de processos
- Visualização de jornadas digitais
- Formulários de avaliação de barreiras
- Análise de impacto comportamental
- Visualização de resultados de IA

### Extensão
- Captura de eventos do navegador
- Envio de dados para a API
- Interface para avaliação em tempo real
- Feedback visual sobre barreiras encontradas

## 🧪 Testes

### Backend
```bash
cd apps/api
pytest
```

### Frontend
```bash
cd apps/web
npm test
```

## 📄 Documentação

Consulte a documentação completa em:
- [Documentação do Projeto](docs/README.md)
- [API Reference](http://localhost:8000/docs)

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.


---
