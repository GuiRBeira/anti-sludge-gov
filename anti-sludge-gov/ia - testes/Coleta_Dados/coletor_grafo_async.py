# coleta/coletor_grafo_async.py
import os
import time
import json
import asyncio
import aiohttp
import signal
import sys
from aiohttp import ClientTimeout
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import argparse
import heuristicas.heuristicas_sludgesv3 as heuristicas

GLOBAL_COLETOR_REF = None

def salvar_checkpoint(coletor):
    print("\n=== Salvando checkpoint antes de sair... ===")
    data = {
        "visitados": list(coletor.visitados),
        "servicos_encontrados": coletor.servicos_encontrados,
        "stats": coletor.stats,
    }

    with open("checkpoint_crawler.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print("=== Checkpoint salvo com sucesso! ===\n")

def signal_handler(sig, frame):
    print("\n⚠️ CTRL+C detectado! Encerrando com segurança...")
    if GLOBAL_COLETOR_REF:
        salvar_checkpoint(GLOBAL_COLETOR_REF)
    sys.exit(0)

class ColetorGrafoAsync:
    def __init__(self, max_paginas=150, max_profundidade=4, delay=0.5, dominios_permitidos=None):
        self.max_paginas = max_paginas
        self.max_profundidade = max_profundidade
        self.delay = delay
        self.dominios_permitidos = dominios_permitidos or ['gov.br']

        self.cache_html = {}
        self.visitados = set()
        self.servicos_encontrados = []

        self.stats = {
            'total_paginas': 0,
            'servicos_com_formularios': 0,
            'erros': 0,
            'inicio': time.time()
        }

        # Limite de conexões simultâneas
        self.sem = asyncio.Semaphore(10)

    # ----------------------------------------------------------
    #      Regras de filtragem + heurísticas iguais ao sync
    # ----------------------------------------------------------

    def eh_url_governo(self, url):
        try:
            parsed = urlparse(url)
            netloc = parsed.netloc.lower()
        except Exception:
            return False
        return any(d in netloc for d in self.dominios_permitidos)

    def calcular_score_servico(self, url, texto_link):
        score = 0
        padroes = [
            'serviço', 'servicos', 'serviços', 'consulta', 'solicitação',
            'formulário', 'cadastro', 'inscrição', 'login', 'acesso',
            'sistema', 'portal', 'certificado', 'declaração', 'benefício',
            'auxílio'
        ]

        texto_lower = (texto_link or '').lower()
        url_lower = (url or '').lower()

        for p in padroes:
            if p in texto_lower or p in url_lower:
                score += 2

        if '/servicos/' in url_lower or '/solicitacao' in url_lower:
            score += 3

        return score

    # ----------------------------------------------------------
    #                     FETCH ASSÍNCRONO
    # ----------------------------------------------------------
    async def fetch(self, session, url):
        if url in self.cache_html:
            return self.cache_html[url]

        async with self.sem:
            try:
                async with session.get(url, timeout=ClientTimeout(total=10)) as resp:
                    if resp.status >= 400:
                        raise Exception(f"HTTP {resp.status}")
                    html = await resp.text()
                    self.cache_html[url] = (html, resp)
                    return html, resp
            except Exception as e:
                return None, e

    # ----------------------------------------------------------
    #           EXTRAÇÃO DE LINKS / FORMULÁRIOS / SCORE
    # ----------------------------------------------------------
    def extrair_links_promissores(self, url, soup):
        links = []

        for tag in soup.find_all("a", href=True):
            href = tag["href"].strip()
            texto = tag.get_text(strip=True)

            # 1. Ignorar links sem texto (igual ao seu)
            if not texto:
                continue

            # 2. Ignorar anchors e javascript
            if href.startswith("#") or href.lower().startswith("javascript"):
                continue

            # 3. Tentar montar URL absoluta — protegido contra erros
            try:
                url_final = urljoin(url, href)
            except Exception:
                continue  # evita "Invalid IPv6 URL"

            # 4. Validar esquema e domínio
            parsed = urlparse(url_final)
            if not parsed.scheme or not parsed.netloc:
                continue

            # mailto:, tel:, ftp:, etc.
            if not url_final.startswith(("http://", "https://")):
                continue

            # 5. Mantém só governo
            if not self.eh_url_governo(url_final):
                continue

            # 6. Ignorar arquivos pesados
            if any(url_final.lower().endswith(ext) for ext in [".pdf", ".doc", ".docx", ".zip"]):
                continue

            # 7. Calcular score das heurísticas
            score = self.calcular_score_servico(url_final, texto)
            if score > 0:
                links.append({
                    "url": url_final,
                    "texto": texto,
                    "score": score
                })

        # 8. Retornar top 30
        return sorted(links, key=lambda x: x["score"], reverse=True)[:30]


    def extrair_formularios(self, soup):
        forms = []

        for form in soup.find_all("form"):
            campos = []
            for inp in form.find_all(["input", "select", "textarea"]):
                nome = inp.get("name") or inp.get("id") or ""
                obrig = inp.has_attr("required")
                placeholder = inp.get("placeholder", "")
                campos.append({
                    "tipo": inp.name,
                    "input_type": inp.get("type", ""),
                    "nome": nome,
                    "obrigatorio": obrig,
                    "placeholder": placeholder
                })

            if campos:
                forms.append({
                    "quantidade_campos": len(campos),
                    "campos_obrigatorios": sum(1 for c in campos if c["obrigatorio"]),
                    "campos": campos[:12]
                })

        return forms

    def calcular_sludge_score(self, forms):
        if not forms:
            return {"total": 0, "nivel": "BAIXO"}

        total = sum(f["quantidade_campos"] for f in forms)
        obrig = sum(f["campos_obrigatorios"] for f in forms)
        maior = max(f["quantidade_campos"] for f in forms)

        score = 0
        if maior > 15: score += 3
        elif maior > 8: score += 2

        if obrig > 10: score += 2
        elif obrig > 5: score += 1

        if len(forms) > 2:
            score += 1

        if score >= 5: nivel = "CRÍTICO"
        elif score >= 3: nivel = "ALTO"
        elif score >= 1: nivel = "MODERADO"
        else: nivel = "BAIXO"

        return {"total": score, "nivel": nivel}

    # ----------------------------------------------------------
    #                       COLETA DE PÁGINA
    # ----------------------------------------------------------

    async def coletar_pagina(self, session, url):
        html_and_resp = await self.fetch(session, url)
        if html_and_resp[0] is None:
            self.stats["erros"] += 1
            return {"url": url, "status": "erro", "erro": str(html_and_resp[1])}

        html, resp = html_and_resp
        soup = BeautifulSoup(html, "html.parser")

        forms = self.extrair_formularios(soup)
        score_basico = self.calcular_sludge_score(forms)

        # --- NOVO: heurística completa ----
        resultado_heuristicas = heuristicas.avaliar_pagina(html, url=url)
        score_heuristico = resultado_heuristicas["score_total"]

        self.stats["total_paginas"] += 1
        if forms:
            self.stats["servicos_com_formularios"] += 1

        # extrai título de forma segura (evita AttributeError se não houver tag <title>)
        title_tag = soup.find("title")
        titulo = title_tag.get_text(strip=True) if title_tag and title_tag.get_text() else "Sem título"
        links = self.extrair_links_promissores(url, soup)
        return {
            "url": url,
            "status": "sucesso",
            "titulo": titulo,
            "links_extraidos": links,

            # FORMULÁRIOS (método antigo)
            "formularios_encontrados": len(forms),
            "formularios_detalhados": forms,
            "sludge_score_basico": score_basico,

            # 🔥 HEURÍSTICA COMPLETA (muito mais forte)
            "heuristica_completa_score": score_heuristico,
            "heuristica_detalhes": resultado_heuristicas,

            # METADADOS
            "tempo_resposta": resp.elapsed.total_seconds() if hasattr(resp, "elapsed") else None
        }

    # ----------------------------------------------------------
    #                     BFS ASSÍNCRONO
    # ----------------------------------------------------------

    async def bfs(self, session, url_inicial):
        fila = asyncio.Queue()
        await fila.put((url_inicial, 0))
        self.visitados.add(url_inicial)

        servicos = []

        while not fila.empty() and len(self.visitados) < self.max_paginas:
            url, nivel = await fila.get()
            print(f"[N{nivel}] {url}")

            dados = await self.coletar_pagina(session, url)

            if dados["status"] == "sucesso" and dados["formularios_encontrados"] > 0:
                servicos.append(dados)
                print(f" → {dados['titulo'][:60]} | forms {dados['formularios_encontrados']} | score {dados['sludge_score_basico']}")

            if len(self.visitados) % 200 == 0:
                salvar_checkpoint(self)

            if nivel < self.max_profundidade:
                html, _ = self.cache_html.get(url, (None, None))
                if html:
                    soup = BeautifulSoup(html, "html.parser")
                    links = self.extrair_links_promissores(url, soup)

                    for link in links:
                        u = link["url"]
                        if u not in self.visitados and len(self.visitados) < self.max_paginas:
                            self.visitados.add(u)

                            # BFS inteligente
                            if link["score"] >= 3:
                                await fila.put((u, nivel + 1))
                            else:
                                await fila.put((u, nivel + 1))

            await asyncio.sleep(self.delay)

        return servicos

    # ----------------------------------------------------------
    #                   EXECUÇÃO GLOBAL
    # ----------------------------------------------------------

    async def executar_coleta(self, urls):
        os.makedirs("Coleta_Dados/dados_coletados", exist_ok=True)

        async with aiohttp.ClientSession(headers={"User-Agent": "Mozilla/5.0 (compatible; ColetorGrafoAsync/1.0)"}) as session:
            todos = []
            for i, url in enumerate(urls, 1):
                print(f"\n[{i}/{len(urls)}] {url}")
                resultado = await self.bfs(session, url)
                todos.extend(resultado)
                await asyncio.sleep(1.5)

        # Salvar
        nome = f"Coleta_Dados/dados_coletados/coleta_async_{time.strftime('%Y%m%d_%H%M%S')}.json"
        with open(nome, "w", encoding="utf-8") as f:
            json.dump(todos, f, ensure_ascii=False, indent=2)

        print("Salvo em:", nome)

        return todos


# ----------------------------------------------------------
#                   CLI PRINCIPAL
# ----------------------------------------------------------
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--max-paginas", type=int, default=2000)
    parser.add_argument("--max-profundidade", type=int, default=4)
    parser.add_argument("--delay", type=float, default=0.1)
    args = parser.parse_args()

    URLS_INICIAIS = [
    "https://www.gov.br/pt-br/servicos",
    "https://www.gov.br/inss/pt-br/servicos",
    "https://www.gov.br/receitafederal/pt-br/servicos",
    "https://www.gov.br/trabalho/pt-br/servicos",
    "https://www.gov.br/saude/pt-br/servicos",
    "https://www.gov.br/meioambiente/pt-br/servicos",
    ]
    signal.signal(signal.SIGINT, signal_handler)

    coletor = ColetorGrafoAsync(
        max_paginas=args.max_paginas,
        max_profundidade=args.max_profundidade,
        delay=args.delay
    )

    GLOBAL_COLETOR_REF = coletor

    asyncio.run(coletor.executar_coleta(URLS_INICIAIS))
