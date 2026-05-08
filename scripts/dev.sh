#!/bin/bash

# Cores para o output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Anti-Sludge Gov QoL Dev Script ===${NC}"

# 1. Verificar/Subir Banco de Dados no Podman
echo -e "\n${YELLOW}1. Verificando Banco de Dados (Podman)...${NC}"
if ! podman ps --filter "name=db" --format "{{.Names}}" | grep -q "db"; then
    echo -e "${YELLOW}Banco não detectado. Tentando subir via podman-compose...${NC}"
    podman compose up -d db
    if [ $? -ne 0 ]; then
        echo -e "${RED}Erro ao subir o banco de dados. Verifique se o Podman está rodando.${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✔ Banco de Dados já está rodando.${NC}"
fi

# 2. Preparar encerramento limpo
cleanup() {
    echo -e "\n${YELLOW}Encerrando processos...${NC}"
    kill $API_PID $WEB_PID 2>/dev/null
    echo -e "${GREEN}Processos encerrados. Até logo!${NC}"
    exit
}

trap cleanup SIGINT SIGTERM

# 3. Iniciar API (Backend)
echo -e "\n${YELLOW}2. Iniciando API (Backend)...${NC}"
cd apps/api
if [ -f ".venv/bin/uvicorn" ]; then
    .venv/bin/uvicorn app.main:app --reload --port 8000 &
    API_PID=$!
    echo -e "${GREEN}✔ API rodando em background (PID: $API_PID)${NC}"
else
    echo -e "${RED}Erro: Ambiente virtual (.venv) não encontrado em apps/api.${NC}"
    exit 1
fi
cd ../..

# 4. Iniciar Web (Frontend)
echo -e "\n${YELLOW}3. Iniciando Web (Frontend)...${NC}"
pnpm dev:web &
WEB_PID=$!
echo -e "${GREEN}✔ Frontend rodando em background (PID: $WEB_PID)${NC}"

echo -e "\n${BLUE}Ambiente pronto! Pressione CTRL+C para parar tudo.${NC}"

# Manter o script rodando
wait
