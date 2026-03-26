import os
import json
import networkx as nx
import pickle
import time
from urllib.parse import urlparse
import matplotlib.pyplot as plt

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
PASTA_JSON = os.path.join(BASE_DIR, "Coleta_Dados", "dados_coletados")

SAIDA_GPKL = os.path.join(BASE_DIR, "Avaliacao", "visualizacoes", f"grafo_sludge_{time.strftime('%Y%m%d_%H%M%S')}.pkl")

def carregar_jsons():
    """
    Lê todos os arquivos JSON em dados_coletados.
    """
    dados = []

    for nome in os.listdir(PASTA_JSON):
        if not nome.endswith(".json"):
            continue

        caminho = os.path.join(PASTA_JSON, nome)

        try:
            with open(caminho, "r", encoding="utf-8") as f:
                conteudo = json.load(f)

                if isinstance(conteudo, list):
                    dados.extend(conteudo)
                elif isinstance(conteudo, dict):
                    dados.append(conteudo)
                else:
                    print(f"[WARN] Formato inesperado em {nome}")

        except Exception as e:
            print(f"[ERRO] Falha ao carregar {nome}: {e}")

    return dados


def extrair_dominio(url):
    try:
        return urlparse(url).netloc
    except:
        return "desconhecido"


def construir_grafo(lista_paginas):
    """
    Constrói um grafo dirigido a partir dos JSONs coletados.
    """
    G = nx.DiGraph()

    for pagina in lista_paginas:
        url = pagina.get("url")
        if not url:
            continue

        G.add_node(
            url,
            titulo=pagina.get("titulo", "Sem título"),
            dominio=extrair_dominio(url),
            sludge_score=pagina.get("heuristica_completa_score", 0),
            status=pagina.get("status", "desconhecido")
        )

        links = pagina.get("links_extraidos", [])
        for item in links:
            url_destino = item.get("url")
            if not url_destino:
                continue

            peso = item.get("score", 1)
            G.add_edge(url, url_destino, peso=peso)

    return G

def salvar_pickle(G, caminho):
    """
    Salva o grafo como Pickle (compatível com NetworkX 3.x).
    """
    with open(caminho, "wb") as f:
        pickle.dump(G, f, protocol=pickle.HIGHEST_PROTOCOL)


def plot_preview(G):
    plt.figure(figsize=(12, 10))
    pos = nx.spring_layout(G, k=0.3, iterations=20)
    nx.draw_networkx_nodes(G, pos, node_size=50)
    nx.draw_networkx_edges(G, pos, alpha=0.2)
    plt.title("Preview do Grafo de Navegação")
    plt.axis("off")
    plt.show()


def main():
    print("[1/3] Carregando JSONs...")
    lista_paginas = carregar_jsons()
    print(f" → {len(lista_paginas)} páginas carregadas.")

    print("[2/3] Construindo grafo...")
    G = construir_grafo(lista_paginas)
    print(f" → Grafo com {G.number_of_nodes()} nós e {G.number_of_edges()} arestas.")

    print("[3/3] Salvando arquivos...")

    salvar_pickle(G, SAIDA_GPKL)

    print(f" → Grafo salvo em:\n   {SAIDA_GPKL}")
    print("✔ Finalizado!")


if __name__ == "__main__":
    main()
