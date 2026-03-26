import os
import pickle
from pyvis.network import Network
import networkx as nx

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
GRAFO_PKL = os.path.join(BASE_DIR, "Avaliacao", "visualizacoes", "grafo_sludge.pkl")
SAIDA_HTML = os.path.join(BASE_DIR, "Avaliacao", "visualizacoes", "grafo_sludge_interativo.html")


def carregar_grafo():
    with open(GRAFO_PKL, "rb") as f:
        return pickle.load(f)


def gerar_visualizacao(G):
    print("[1/2] Convertendo grafo para PyVis...")

    net = Network(
        height="850px",
        width="100%",
        bgcolor="#1e1e1e",
        font_color="#ffffff",
        directed=True
    )

    # melhora a física (mais estável)
    net.barnes_hut(
        gravity=-30000,
        central_gravity=0.3,
        spring_length=120,
        spring_strength=0.002,
        damping=0.9
    )

    # Agrupa domínios para cores
    dominios = sorted({G.nodes[n].get("dominio", "") for n in G.nodes()})
    mapa_cor = {dom: idx for idx, dom in enumerate(dominios)}

    print(" → Adicionando nós...")

    for url, attrs in G.nodes(data=True):
        dominio = attrs.get("dominio", "")
        raw_score = attrs.get("sludge_score", 0)

        if isinstance(raw_score, dict):
            score = raw_score.get("score_total", 0)
        else:
            score = raw_score

        # Evitar quebrar se score for lixo
        try:
            score = float(score)
        except:
            score = 0

        tamanho = 10 + (score * 2)  # aumenta com o score
        cor = mapa_cor.get(dominio, 0)

        titulo_tooltip = (
            f"<b>{attrs.get('titulo', 'Sem título')}</b><br>"
            f"<i>{url}</i><br>"
            f"Domínio: {dominio}<br>"
            f"Sludge Score: {score}"
        )

        net.add_node(
            url,
            label=attrs.get("titulo", "Sem título")[:40],
            title=titulo_tooltip,
            value=tamanho,
            color=f"hsl({(cor*40)%360}, 80%, 50%)"
        )

    print(" → Adicionando arestas...")

    for u, v, attrs in G.edges(data=True):
        peso = attrs.get("peso", 1)
        net.add_edge(u, v, value=peso)

    print("[2/2] Gerando HTML...")
    net.write_html(SAIDA_HTML)
    print(f"✔ Arquivo gerado em:\n{SAIDA_HTML}")


def main():
    print("Carregando grafo...")
    G = carregar_grafo()

    print("Grafo carregado!")
    gerar_visualizacao(G)


if __name__ == "__main__":
    main()
