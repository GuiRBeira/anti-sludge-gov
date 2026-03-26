import networkx as nx
import pickle
import time
import pandas as pd
from networkx.algorithms.community import louvain_communities

# --- Defina o nome do seu arquivo aqui ---
NOME_ARQUIVO_PKL = 'Avaliacao\\visualizacoes\\grafo_sludge_20251126_091006.pkl' # <-- SUBSTITUA PELO NOME REAL DO SEU ARQUIVO

# --- 1. CARREGAMENTO DO GRAFO ---
try:
    print(f"Iniciando o carregamento do grafo do arquivo {NOME_ARQUIVO_PKL}...")
    start_time = time.time()
    
    # Abre o arquivo em modo binário de leitura ('rb')
    with open(NOME_ARQUIVO_PKL, 'rb') as f:
        G = pickle.load(f) # Carrega o objeto NetworkX
    
    load_time = time.time() - start_time
    print(f"✅ Grafo carregado com sucesso em {load_time:.2f} segundos.")
    print(f"Estatísticas: Nós={G.number_of_nodes()}, Arestas={G.number_of_edges()}")

except FileNotFoundError:
    print(f"❌ ERRO: O arquivo '{NOME_ARQUIVO_PKL}' não foi encontrado. Verifique o caminho.")
    exit()
except Exception as e:
    print(f"❌ ERRO ao carregar o arquivo .pkl: {e}")
    exit()

# --- 1. CÁLCULO DE BETWEENNESS (A mais demorada) ---
print("\nIniciando cálculo de Betweenness Centrality...")
start_time = time.time()
# Certifique-se de que o cálculo finalizou antes de prosseguir!
betweenness = nx.betweenness_centrality(G, normalized=True)
print(f"✅ Betweenness calculada em {time.time() - start_time:.2f} segundos.")

# --- 2. CÁLCULO DE CLUSTERING (Mais rápido) ---
print("\nIniciando cálculo de Clustering Coefficient...")
start_time = time.time()
clustering = nx.clustering(G)
print(f"✅ Clustering calculado em {time.time() - start_time:.2f} segundos.")

# --- 3. CÁLCULO DE DEGREE (Mais rápido) ---
num_nodes = G.number_of_nodes()
degree = {node: float(G.degree(node) / (num_nodes - 1)) for node in G.nodes()}

# --- 4. CÁLCULO DE PAGERANK ---
print("\nIniciando cálculo de PageRank...")
start_time = time.time()
# PageRank padrão para grafos não direcionados.
pagerank = nx.pagerank(G) 
print(f"✅ PageRank calculado em {time.time() - start_time:.2f} segundos.")

# --- 5. DETECÇÃO DE COMUNIDADES COM LOUVAIN ---
print("\nIniciando detecção de comunidades com Louvain...")
start_time = time.time()
try:
    # Retorna uma lista de conjuntos de nós, cada conjunto representa uma comunidade
    partitions = louvain_communities(G, seed=42) # Usando seed para reprodutibilidade

    # Cria um dicionário mapeando cada nó ao ID da sua comunidade (0, 1, 2, ...)
    community_id_map = {node: idx for idx, community in enumerate(partitions) for node in community}
    
    print(f"✅ Detecção de comunidades concluída em {time.time() - start_time:.2f} segundos.")
except Exception as e:
    print(f"❌ ERRO ao calcular Louvain Communities: {e}")
    # Cria um mapa de ID 0 para todos os nós em caso de falha, para evitar quebra do código
    community_id_map = {node: 0 for node in G.nodes()}

# --- 6. ARMAZENAMENTO E CONSOLIDAÇÃO (BLOCO CRÍTICO) ---
print("\nArmazenando TODAS as features de rede nos nós do grafo...")

# 1. Armazena as métricas nos nós
nx.set_node_attributes(G, betweenness, 'betweenness_centrality')
nx.set_node_attributes(G, clustering, 'clustering_coefficient')
nx.set_node_attributes(G, degree, 'degree_centrality')
nx.set_node_attributes(G, pagerank, 'pagerank_score')
nx.set_node_attributes(G, community_id_map, 'community_id') # Feature categórica
print("✅ Features de rede armazenadas com sucesso no objeto G.")

# 2. Salva o grafo atualizado (com todas as 5 features)
with open('grafo_com_features_calculadas.pkl', 'wb') as f:
    pickle.dump(G, f)

# 3. Extrai TUDO para o DataFrame Final
node_attributes = dict(G.nodes(data=True))
df_final = pd.DataFrame.from_dict(node_attributes, orient='index')

df_final.index.name = 'Nó_ID'
df_final.reset_index(inplace=True)

print("\nDataFrame de Treinamento Finalizado!")
print(f"Linhas (Nós): {df_final.shape[0]}, Colunas (Features + Rótulo): {df_final.shape[1]}")
print(f"Número de Comunidades Encontradas: {len(partitions) if 'partitions' in locals() else 'N/A'}")
print("\nFeatures Disponíveis (Exemplo):")
print(df_final.columns)