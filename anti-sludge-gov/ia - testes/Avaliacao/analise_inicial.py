# analise_rapida.py - Vamos ver o que foi coletado
import json
import pandas as pd

def analisar_coleta(arquivo_json):
    """Analisa rapidamente os dados coletados"""
    
    with open(arquivo_json, 'r', encoding='utf-8') as f:
        dados = json.load(f)
    
    print("📈 ANÁLISE DETALHADA DOS DADOS COLETADOS")
    print("=" * 60)
    
    # Filtrar apenas sucessos
    sucessos = [d for d in dados if d.get('status') == 'sucesso']
    
    print(f"📊 Total de serviços analisados: {len(sucessos)}")
    
    for i, servico in enumerate(sucessos, 1):
        print(f"\n--- Serviço {i}: {servico['titulo'][:50]}... ---")
        print(f"📍 URL: {servico['url']}")
        print(f"📋 Formulários: {servico['metricas_sludge']['quantidade_formularios']}")
        print(f"🎯 Campos totais: {servico['metricas_sludge']['total_campos']}")
        print(f"⚠️  Campos obrigatórios: {servico['metricas_sludge']['campos_obrigatorios']}")
        print(f"🚨 Score Sludge: {servico['metricas_sludge']['score_sludge']}")
        print(f"🔍 Critérios ativados: {servico['metricas_sludge']['criterios_ativados']}")
        
        # Mostrar complexidade da linguagem
        taxa_complex = servico['linguagem']['taxa_complexidade']
        print(f"📝 Complexidade linguística: {taxa_complex:.3f}")
        
        # Mostrar navegação
        print(f"🔗 Links totais: {servico['navegacao']['total_links']}")

# Execute a análise
if __name__ == "__main__":
    # Use o nome do arquivo que foi gerado para você
    analisar_coleta('coleta_sludge_20251122_164911.json')