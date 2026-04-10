#!/bin/bash

# Repassa todos os argumentos (ex: --dry-run)
ARGS="$@"

# Busca aplicações dinamicamente (não precisa hardcodar nomes)
apps=$(find apps -maxdepth 2 -name ".releaserc*" -o -name "release.config*" | cut -d'/' -f2 | sort -u)

if [ -z "$apps" ]; then
    echo "❌ Nenhuma aplicação com configuração de release encontrada em 'apps/'."
    exit 1
fi

# Verifica se existe pelo menos uma tag no repositório
if ! git describe --tags --abbrev=0 > /dev/null 2>&1; then
    echo "🐣 Nenhuma tag encontrada. Primeira execução detectada."
    echo "🚀 Rodando análise de release para todos os apps: $apps"
else
    echo "🔍 Iniciando orquestração de release para: $apps"
    echo "💡 O Semantic Release analisará todos os commits desde a última tag específica de cada aplicação."
fi

for app in $apps; do
    app_path="apps/$app"
    echo ""
    echo "========================================================"
    echo "🎯 Aplicação: $app"
    echo "========================================================"
    
    if [ -d "$app_path" ]; then
        # Entra na pasta do app
        pushd "$app_path" > /dev/null || exit 1
        
        # Executa o semantic-release repassando os argumentos
        # O plugin 'semantic-release-monorepo' já gerencia se o release é necessário 
        # analisando os commits que afetam esta subpasta desde a última tag da app.
        pnpm exec semantic-release $ARGS
        
        popd > /dev/null || exit 1
    else
        echo "⚠️ Pasta $app_path não encontrada. Pulando."
    fi
done