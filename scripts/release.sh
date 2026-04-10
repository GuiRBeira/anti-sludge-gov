#!/bin/bash

# Repassa todos os argumentos (ex: --dry-run) para o semantic-release
ARGS="$@"

# Busca aplicações que possuem arquivo de configuração do semantic-release
# Isso garante que só tentaremos rodar o release onde ele está configurado
apps=$(find apps -maxdepth 2 -name ".releaserc*" -o -name "release.config*" | cut -d'/' -f2 | sort -u)

if [ -z "$apps" ]; then
    echo "❌ Nenhuma aplicação com configuração de release encontrada em 'apps/'."
    exit 1
fi

echo "🚀 Iniciando processo de release para: $apps"

for app in $apps; do
    app_path="apps/$app"
    echo ""
    echo "========================================================"
    echo "🎯 Aplicação: $app"
    echo "========================================================"
    
    if [ -d "$app_path" ]; then
        # Salva o diretório atual para retornar depois
        pushd "$app_path" > /dev/null || exit 1
        
        # Executa o semantic-release repassando os argumentos do script
        # O plugin 'semantic-release-monorepo' já gerencia se o release é necessário 
        # baseado apenas nos commits que afetam esta subpasta.
        pnpm exec semantic-release $ARGS
        
        popd > /dev/null || exit 1
    else
        echo "⚠️ Pasta $app_path não encontrada. Pulando."
    fi
done