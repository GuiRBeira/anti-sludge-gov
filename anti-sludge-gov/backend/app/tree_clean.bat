@echo off
REM Lista a árvore de arquivos mostrando só arquivos relevantes (*.py, *.md, *.sql, etc)
REM Ignora __pycache__ e outros arquivos temporários
REM /f → mostra arquivos
REM /a → usa caracteres ASCII (mais legível)

for /f "tokens=*" %%i in ('tree /f /a') do (
    echo %%i | findstr /v /i "__pycache__" ^
                   | findstr /v /i ".pyc" ^
                   | findstr /i "\.py \.md \.sql \.txt \.json \.yaml \.yml"
)