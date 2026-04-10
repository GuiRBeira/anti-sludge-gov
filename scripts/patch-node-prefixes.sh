#!/bin/bash

# ==============================================================================
# AntiSludge - Dependency Patcher
# Resolves Tailwind v4 'node:' prefix issues in Plasmo/Parcel environments
# ==============================================================================

if [ ! -d "node_modules" ]; then
  exit 0
fi

echo "🚀 Patching node_modules for Tailwind v4 compatibility..."

# Handle require("node:...")
find node_modules/.pnpm -name "*.js" -o -name "*.cjs" | xargs sed -i "s/require(['\"]node:\([^'\"]*\)['\"])/require('\1')/g" 2>/dev/null

# Handle from "node:..."
find node_modules/.pnpm -name "*.js" -o -name "*.cjs" | xargs sed -i "s/from ['\"]node:\([^'\"]*\)['\"]/from '\1'/g" 2>/dev/null

# Handle import("node:...")
find node_modules/.pnpm -name "*.js" -o -name "*.cjs" | xargs sed -i "s/import(['\"]node:\([^'\"]*\)['\"])/import('\1')/g" 2>/dev/null

echo "✅ Patch applied successfully."
