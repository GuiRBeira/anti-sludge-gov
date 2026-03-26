import networkx as nx
import pickle
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import MinMaxScaler

# --- CONFIGURAÇÃO ---
NOME_ARQUIVO_PKL = 'Avaliacao/visualizacoes/grafo_com_features_calculadas.pkl'

# --- 1. CARREGAMENTO DO GRAFO ---
print(f"--- 1. Carregando grafo: {NOME_ARQUIVO_PKL} ---")
try:
    with open(NOME_ARQUIVO_PKL, 'rb') as f:
        G = pickle.load(f)
    print(f"✅ Grafo carregado: {G.number_of_nodes()} nós.")
except FileNotFoundError:
    print("❌ Erro: Arquivo não encontrado. Verifique se o caminho está correto.")
    exit()

# --- 2. PREPARAÇÃO DOS DADOS ---
print("\n--- 2. Preparando Dados ---")

# Extrai Tabela
node_attributes = dict(G.nodes(data=True))
df = pd.DataFrame.from_dict(node_attributes, orient='index')
df.index.name = 'Nó_ID'
df.reset_index(inplace=True)

# --- CORREÇÃO DO ERRO DE TIPO ---
# Removido sludge_score da lista
cols_principais = ['betweenness_centrality', 'clustering_coefficient', 'degree_centrality', 'pagerank_score']

print("Limpando colunas numéricas no DataFrame original...")
for col in cols_principais:
    if col in df.columns:
        # errors='coerce' transforma dicionários/textos em NaN e depois preenchemos com 0
        df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)

# --- PREPARAÇÃO PARA O K-MEANS (MATRIZ X) ---
# Adicionado sludge_score na lista de drop para garantir que não atrapalhe
cols_to_drop = ['Nó_ID', 'titulo', 'dominio', 'status', 'url', 'data_coleta', 'sludge_score']
X = df.drop(columns=cols_to_drop, errors='ignore')

# Preenche vazios com 0 nas colunas restantes
X = X.fillna(0)

# One-Hot Encoding
if 'community_id' in X.columns:
    print("Aplicando OHE em community_id...")
    X = pd.get_dummies(X, columns=['community_id'], prefix='comm')

# Garante apenas números na matriz X
X = X.select_dtypes(include=[np.number])

# Normalização
print("Normalizando dados...")
scaler = MinMaxScaler()
X_processed = pd.DataFrame(scaler.fit_transform(X), columns=X.columns)

# --- 3. APLICAR K-MEANS COM K=4 ---
print("\n--- 3. Aplicando K-Means Definitivo (K=4) ---")
kmeans = KMeans(n_clusters=4, init='k-means++', random_state=42, n_init=10)
cluster_labels = kmeans.fit_predict(X_processed)

# Salva o label no DataFrame original
df['cluster_kmeans'] = cluster_labels

# --- 4. PERFILAMENTO (Estatísticas) ---
print("\n--- PERFIL DOS CLUSTERS (Médias) ---")

# Filtra apenas as colunas que existem e já foram limpas
cols_existentes = [c for c in cols_principais if c in df.columns]

if cols_existentes:
    perfil = df.groupby('cluster_kmeans')[cols_existentes].mean()
    print(perfil)
else:
    print("Colunas principais não encontradas para perfilamento.")

# --- 5. EXPORTAR PARA ANÁLISE HUMANA ---
print("\n--- 5. Gerando arquivo de amostras ---")
try:
    with open("analise_clusters.txt", "w", encoding="utf-8") as f:
        f.write("=== ANÁLISE DE AMOSTRAS DOS CLUSTERS (K=4) ===\n")
        f.write("Objetivo: Identificar qual cluster contém o Sludge.\n\n")
        
        for i in range(4):
            # Conta quantos sites tem neste cluster
            total = len(df[df['cluster_kmeans'] == i])
            f.write(f"--- CLUSTER {i} (Total de sites: {total}) ---\n")
            
            # Médias
            if cols_existentes:
                medias = df[df['cluster_kmeans'] == i][cols_existentes].mean()
                f.write(f"Médias: {medias.to_dict()}\n")
            
            f.write("\nAMOSTRAS:\n")
            
            # Pega 15 exemplos aleatórios
            amostra = df[df['cluster_kmeans'] == i].sample(min(15, total), replace=False)
            
            for idx, row in amostra.iterrows():
                # Tratamento de erro para campos de texto também
                url = str(row.get('url', row.get('Nó_ID', 'N/A')))
                titulo = str(row.get('titulo', 'Sem Título')).strip()
                # sludge_score removido da visualização
                
                f.write(f"Cluster {i} | {titulo} -> {url}\n")
            f.write("\n" + "="*40 + "\n\n")

    print("✅ Arquivo 'analise_clusters.txt' gerado com sucesso!")
    print("👉 ABRA O ARQUIVO 'analise_clusters.txt'.")
    print("👉 Descubra qual Cluster é o Sludge.")

except Exception as e:
    print(f"❌ Erro ao gravar arquivo: {e}")