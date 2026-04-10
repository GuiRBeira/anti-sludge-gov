#!/bin/bash

# Obtém a lista de pastas modificadas no último commit, limitando aos diretórios de primeiro nível em 'apps'
changed_apps=$(git diff-tree --no-commit-id --name-only -r HEAD | grep '^apps/' | cut -d'/' -f2 | sort -u)

# Se não houver mudanças em nenhum app, encerra
if [ -z "$changed_apps" ]; then
    echo "Nenhuma mudança detectada nas aplicações."
    exit 0
fi

echo "Aplicações modificadas: $changed_apps"

# Itera sobre cada aplicação modificada e executa o semantic-release
for app in $changed_apps; do
    app_path="apps/$app"
    if [ -d "$app_path" ]; then
        echo "🎯 Iniciando release para a aplicação: $app"
        cd "$app_path" || exit 1
        # Executa o semantic-release no modo dry-run para testar
        # pnpm exec semantic-release --dry-run
        # Quando estiver tudo certo, remova o --dry-run
        pnpm exec semantic-release
        cd - > /dev/null || exit 1
    else
        echo "⚠️ Pasta $app_path não encontrada. Pulando."
    fi
done