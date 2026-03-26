import pickle
import xml.etree.ElementTree as ET
import networkx as nx
import os
import time

# Caminhos de entrada e saída
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
GRAFO_PKL = os.path.join(BASE_DIR, "Avaliacao", "visualizacoes", "grafo_sludge_20251126_091006.pkl")
SAIDA_XGMML = os.path.join(BASE_DIR, "Avaliacao", "visualizacoes", f"grafo_sludge_{time.strftime('%Y%m%d_%H%M%S')}.xgmml")

def exportar_xgmml(G, caminho):
    """
    Exporta grafo NetworkX para XGMML 100% compatível com Cytoscape.
    """

    root = ET.Element(
        "graph",
        label="sludge graph",
        directed="1",
        xmlns="http://www.cs.rpi.edu/XGMML"
    )

    # ================
    # NÓS
    # ================
    for node, attrs in G.nodes(data=True):
        node_el = ET.SubElement(root, "node", id=node, label=node)

        for k, v in attrs.items():
            if v is None:
                continue
            ET.SubElement(
                node_el, "att",
                name=k,
                value=str(v)
            )

    # ================
    # ARESTAS
    # ================
    for u, v, attrs in G.edges(data=True):
        edge_el = ET.SubElement(
            root, "edge",
            source=u,
            target=v,
            label=f"{u} -> {v}"
        )

        for k, val in attrs.items():
            if val is None:
                continue
            ET.SubElement(
                edge_el, "att",
                name=k,
                value=str(val)
            )

    # Gera XML final
    tree = ET.ElementTree(root)
    tree.write(caminho, encoding="utf-8", xml_declaration=True)

def main():
    print("Carregando grafo...")
    with open(GRAFO_PKL, "rb") as f:
        G = pickle.load(f)

    print(f"Grafo carregado ({G.number_of_nodes()} nós, {G.number_of_edges()} arestas)")

    print("Exportando para XGMML...")
    exportar_xgmml(G, SAIDA_XGMML)

    print(f"✔ Arquivo XGMML gerado:\n{SAIDA_XGMML}")

if __name__ == "__main__":
    main()
