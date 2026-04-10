#!/bin/bash
# apps/api/scripts/update_python_version.sh

# O primeiro argumento é a nova versão (ex: 1.2.3)
NEW_VERSION="$1"

# Caminho para o arquivo main.py
MAIN_PY_PATH="app/main.py"

# Verifica se o arquivo existe
if [ ! -f "$MAIN_PY_PATH" ]; then
  echo "Erro: Arquivo $MAIN_PY_PATH não encontrado!"
  exit 1
fi

# Comando sed para atualizar a versão dentro do FastAPI()
# Ele procura por 'version="X.X.X"' e substitui pela nova versão
sed -i "s/version=\"[0-9]*\.[0-9]*\.[0-9]*\"/version=\"$NEW_VERSION\"/" "$MAIN_PY_PATH"

echo "Versão do FastAPI atualizada para $NEW_VERSION em $MAIN_PY_PATH"