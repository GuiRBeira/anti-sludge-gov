import networkx as nx
import pickle
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os
import time

from sklearn.cluster import KMeans
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, f1_score

# Imports do TensorFlow / Keras
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam

# --- CONFIGURAÇÃO ---
NOME_ARQUIVO_PKL = 'grafo_com_features_calculadas.pkl' 
CLUSTER_VILAO = 0 # Cluster identificado como Sludge

# Cria pasta para salvar os resultados visuais
if not os.path.exists('resultados_finais'):
    os.makedirs('resultados_finais')

# --- 1. CARREGAMENTO ---
print(f"--- 1. Carregando Grafo ---")
try:
    with open(NOME_ARQUIVO_PKL, 'rb') as f:
        G = pickle.load(f)
    print(f"✅ Grafo carregado: {G.number_of_nodes()} nós.")
except FileNotFoundError:
    print(f"❌ Erro: '{NOME_ARQUIVO_PKL}' não encontrado.")
    exit()

# Extração e Limpeza (Mesma lógica anterior)
node_attributes = dict(G.nodes(data=True))
df = pd.DataFrame.from_dict(node_attributes, orient='index')
df.reset_index(inplace=True)

cols_metricas = ['betweenness_centrality', 'clustering_coefficient', 'degree_centrality', 'pagerank_score']
for col in cols_metricas:
    if col in df.columns:
        df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)

cols_drop = ['index', 'level_0', 'Nó_ID', 'titulo', 'dominio', 'status', 'url', 'data_coleta', 'sludge_score']
X_raw = df.drop(columns=cols_drop, errors='ignore')

if 'community_id' in X_raw.columns:
    X_raw = pd.get_dummies(X_raw, columns=['community_id'], prefix='comm')

X_raw = X_raw.select_dtypes(include=[np.number]).fillna(0)
scaler = MinMaxScaler()
X_processed = pd.DataFrame(scaler.fit_transform(X_raw), columns=X_raw.columns)

# --- 2. RÓTULOS (K-Means) ---
print(f"\n--- 2. Gerando Rótulos (K=4) ---")
kmeans = KMeans(n_clusters=4, init='k-means++', random_state=42, n_init=10)
cluster_labels = kmeans.fit_predict(X_processed)
Y = np.where(cluster_labels == CLUSTER_VILAO, 1, 0)
print(f"Sludges: {np.sum(Y)} | Legítimos: {len(Y) - np.sum(Y)}")

X_train, X_test, y_train, y_test = train_test_split(X_processed, Y, test_size=0.2, random_state=42, stratify=Y)

# --- 3. GERAÇÃO DE ARQUITETURAS (GRID SEARCH) ---
print(f"\n--- 3. Gerando 48 Arquiteturas para Teste ---")

neuron_opts = [32, 64, 128, 256] # Largura
depth_opts = [1, 2, 3]           # Profundidade
dropout_opts = [0.2, 0.4]        # Regularização
lr_opts = [0.001, 0.0001]        # Velocidade de aprendizado

arquiteturas = []
counter = 1

for neurons in neuron_opts:
    for depth in depth_opts:
        for drop in dropout_opts:
            for lr in lr_opts:
                # Lógica de afunilamento (ex: 128 -> 64 -> 32)
                camadas = []
                current_n = neurons
                for _ in range(depth):
                    camadas.append(current_n)
                    current_n = max(16, current_n // 2) # Divide por 2 a cada camada, mínimo 16
                
                config = {
                    'id': counter,
                    'nome': f"#{counter:02d}_L{depth}_N{neurons}_D{drop}_LR{lr}",
                    'camadas': camadas,
                    'dropout': drop,
                    'lr': lr
                }
                arquiteturas.append(config)
                counter += 1

print(f"Total de modelos na fila: {len(arquiteturas)}")

# --- 4. TREINAMENTO MASSIVO ---
print(f"\n--- 4. Iniciando Treinamento Massivo ---")

resultados = []
melhor_f1 = 0
melhor_modelo_nome = ""

log_file = open('resultados_finais/log_massivo.txt', 'w')
log_file.write("ID,Modelo,Acuracia,F1,Tempo\n")

total_modelos = len(arquiteturas)

for idx, config in enumerate(arquiteturas):
    print(f"[{idx+1}/{total_modelos}] Treinando: {config['nome']} (Camadas: {config['camadas']})... ", end="")
    
    # Construção Dinâmica
    model = Sequential()
    
    # Primeira camada (precisa de input_shape)
    model.add(Dense(config['camadas'][0], activation='relu', input_shape=(X_train.shape[1],)))
    model.add(Dropout(config['dropout']))
    
    # Camadas ocultas extras
    for neurons in config['camadas'][1:]:
        model.add(Dense(neurons, activation='relu'))
        model.add(Dropout(config['dropout']))
    
    # Saída
    model.add(Dense(1, activation='sigmoid'))
    
    # Compilação com LR variável
    model.compile(optimizer=Adam(learning_rate=config['lr']), loss='binary_crossentropy', metrics=['accuracy'])
    
    # Treino (Rápido: 10 épocas, sem verbose)
    start_time = time.time()
    history = model.fit(X_train, y_train, epochs=10, batch_size=32, validation_split=0.1, verbose=0)
    tempo_treino = time.time() - start_time
    
    # Avaliação
    y_pred_proba = model.predict(X_test, verbose=0)
    y_pred = (y_pred_proba > 0.5).astype(int)
    
    acc = accuracy_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    
    print(f"F1: {f1:.4f} | Tempo: {tempo_treino:.1f}s")
    
    # Log em arquivo
    log_file.write(f"{config['id']},{config['nome']},{acc:.4f},{f1:.4f},{tempo_treino:.2f}\n")
    log_file.flush() # Garante que escreve no disco mesmo se der crash
    
    resultados.append({
        'Modelo': config['nome'],
        'Camadas': str(config['camadas']),
        'Dropout': config['dropout'],
        'LR': config['lr'],
        'Acurácia': acc,
        'F1-Score': f1,
        'Tempo (s)': tempo_treino
    })
    
    # Salva o campeão
    if f1 > melhor_f1:
        melhor_f1 = f1
        melhor_modelo_nome = config['nome']
        model.save('resultados_finais/melhor_modelo_massivo.h5')

log_file.close()

# --- 5. RELATÓRIO E GRÁFICOS ---
print(f"\n--- 5. Gerando Comparativos Finais ---")

df_res = pd.DataFrame(resultados)
df_res = df_res.sort_values(by='F1-Score', ascending=False)

print("\nTOP 5 MODELOS:")
print(df_res[['Modelo', 'F1-Score', 'Acurácia']].head(5))

df_res.to_csv('resultados_finais/tabela_ranking_massivo.csv', index=False)

# GRÁFICO: Top 10 Modelos
plt.figure(figsize=(12, 8))
top_10 = df_res.head(10)
sns.barplot(data=top_10, y='Modelo', x='F1-Score', palette='viridis')
plt.title(f'Top 10 Arquiteturas (de {total_modelos} testadas)')
plt.xlabel('F1-Score')
plt.xlim(0.8, 1.0) # Zoom na parte interessante
plt.grid(axis='x', linestyle='--', alpha=0.7)
plt.tight_layout()
plt.savefig('resultados_finais/ranking_top10.png')
plt.close()

# GRÁFICO: Impacto da Profundidade
# Extraindo profundidade do nome ou dos dados para análise
df_res['Num_Camadas'] = df_res['Camadas'].apply(lambda x: len(eval(x)))
plt.figure(figsize=(8, 6))
sns.boxplot(data=df_res, x='Num_Camadas', y='F1-Score')
plt.title('Impacto da Profundidade (Camadas) no Desempenho')
plt.savefig('resultados_finais/analise_profundidade.png')
plt.close()

print(f"\n✅ Grid Search Massivo Concluído!")
print(f"O Campeão foi: {melhor_modelo_nome} (Salvo em .h5)")
print("Baixe a pasta 'resultados_finais' para ver o Ranking.")