import re
from bs4 import BeautifulSoup

# ============================================================
#  SISTEMA DE HEURÍSTICAS v2 - BASEADO EM CIÊNCIA COMPORTAMENTAL
# ============================================================

def avaliar_pagina(html, url=None):
    soup = BeautifulSoup(html, "html.parser")

    # Extrai texto limpo para análise
    texto_bruto = soup.get_text(" ", strip=True)

    resultado = {
        "texto": avaliar_textos_avancado(soup, texto_bruto),
        "links": avaliar_links(soup, url),
        "formularios": avaliar_formularios(soup),
        "acessibilidade": avaliar_acessibilidade(soup),
        "estrutura": avaliar_estrutura(soup),
        "dark_patterns": avaliar_dark_patterns(soup),
    }

    # Score final (Soma simples das penalidades)
    score_total = sum(r["score"] for r in resultado.values())
    # Mantém consistência de tipo: todos os valores em 'resultado' são dicts com 'score' e 'detalhes'
    resultado["score_total"] = {"score": score_total, "detalhes": []}

    return resultado

# ============================================================
#  1. Análise Textual e Cognitiva (Flesch Index)
# ============================================================
def avaliar_textos_avancado(soup, texto_completo):
    score = 0
    detalhes = []

    # --- A. Palavras de Atrito (Baseado na planilha da Profa. Janaina) ---
    # Termos que indicam burocracia, erro técnico ou coerção
    termos_sludge = [
        # Burocracia / Juridiquês
        r"\bindeferido\b", r"\bdeferimento\b", r"\btramitação\b", r"\bsob pena de\b",
        r"\bônus da prova\b", r"\bcaráter irrevogável\b", r"\bconsoante\b",
        # Frustração Técnica (Mencionado nos resultados qualitativos)
        r"\btente novamente\b", r"\bsessão expirou\b", r"\berro inesperado\b",
        r"\bsistema indisponível\b", r"\bfalha na comunicação\b",
        # Coerção
        r"\bnão poderei desfazer\b", r"\bperder acesso\b", r"\bcancelar conta\b"
    ]

    for termo in termos_sludge:
        # Busca ignorando maiúsculas/minúsculas
        matches = re.findall(termo, texto_completo, re.IGNORECASE)
        if matches:
            pts = len(matches) * 3
            score += pts
            detalhes.append(f"Termo de atrito: '{matches[0]}' (x{len(matches)}) (+{pts})")

    # --- B. Índice de Leiturabilidade (Flesch Reading Ease - Adaptado PT) ---
    # Fórmula Martins: IL = 206.8 - (1.015 * (Total Palavras / Total Frases)) - (84.6 * (Total Sílabas / Total Palavras))
    # Simplificação para Heurística: Usamos vogais como proxy de sílabas e tamanho médio de palavras.
    
    palavras = [p for p in texto_completo.split() if len(p) > 1] # Ignora "e", "a", "o"
    frases = re.split(r'[.!?]+', texto_completo)
    frases = [f for f in frases if len(f.strip()) > 10] # Ignora frases muito curtas (ex: menus)

    if len(palavras) > 50 and len(frases) > 2:
        media_palavras_frase = len(palavras) / len(frases)
        
        # Em PT, palavras longas (>3 sílabas ou >7 letras) aumentam carga cognitiva
        palavras_complexas = [p for p in palavras if len(p) > 9] # Palavras grandes
        taxa_complexidade = len(palavras_complexas) / len(palavras)

        # Penalidade por Leiturabilidade
        if media_palavras_frase > 25: # Frases muito longas
            score += 15
            detalhes.append(f"Carga Cognitiva Alta: Frases muito longas (média {int(media_palavras_frase)} palavras) (+15)")
        
        if taxa_complexidade > 0.20: # Mais de 20% de palavras grandes
            score += 15
            detalhes.append("Carga Cognitiva Alta: Vocabulário muito complexo (+15)")

    return {"score": score, "detalhes": detalhes}

# ============================================================
#  2. Heurísticas de Links (Mantido similar)
# ============================================================
def avaliar_links(soup, base_url=None):
    score = 0
    detalhes = []
    links = soup.find_all("a")
    hrefs = [l.get("href") for l in links if l.get("href")]

    # Links quebrados/inúteis (Placeholders)
    placeholders = [h for h in hrefs if h.strip() in ["#", "javascript:void(0)", "javascript:;", ""]]
    if len(placeholders) > 0:
        pts = len(placeholders) * 2
        score += pts
        detalhes.append(f"Links inúteis/placeholders: {len(placeholders)} (+{pts})")

    # Sobrecarga de Navegação (Cluster 0)
    # Se tiver MUITOS links repetidos, é um labirinto
    unicos = len(set(hrefs))
    total = len(hrefs)
    repetidos = total - unicos
    
    # Teto máximo para não distorcer demais o score (Ajuste Fino)
    if repetidos > 0:
        pts_repetidos = min(repetidos, 50) # Max 50 pontos de penalidade
        score += pts_repetidos
        detalhes.append(f"Navegação repetitiva: {repetidos} links duplicados (+{pts_repetidos})")

    return {"score": score, "detalhes": detalhes}

# ============================================================
#  3. Heurísticas de Formulários (Com "Escolha")
# ============================================================
def avaliar_formularios(soup):
    score = 0
    detalhes = []
    forms = soup.find_all("form")

    for form in forms:
        inputs = form.find_all(["input", "textarea"])
        selects = form.find_all("select")
        
        # --- Paralisia de Escolha (Categoria da Planilha) ---
        for sel in selects:
            options = sel.find_all("option")
            if len(options) > 15:
                score += 5
                detalhes.append(f"Paralisia de Escolha: Menu com {len(options)} opções (+5)")

        # --- Esforço de Preenchimento ---
        obrigatorios = [i for i in inputs if i.get("required")]
        if len(obrigatorios) > 5:
            score += 10
            detalhes.append("Fadiga: Muitos campos obrigatórios (+10)")

        # --- Labels Ausentes (Acessibilidade/Cognitivo) ---
        sem_label = 0
        for i in inputs:
            if i.get("type") not in ["hidden", "submit", "button"]:
                id_input = i.get("id")
                tem_label_explicito = id_input and soup.find("label", {"for": id_input})
                tem_label_implicito = i.find_parent("label")
                if not tem_label_explicito and not tem_label_implicito:
                    sem_label += 1
        
        if sem_label > 0:
            score += sem_label * 3
            detalhes.append(f"Campos sem rótulo claro: {sem_label} (+{sem_label*3})")

    return {"score": score, "detalhes": detalhes}

# ============================================================
#  4. Acessibilidade (Mantido)
# ============================================================
def avaliar_acessibilidade(soup):
    score = 0
    detalhes = []
    imgs = soup.find_all("img")
    
    sem_alt = 0
    for img in imgs:
        if not img.has_attr("alt"): # Só pune se não tiver o atributo
            sem_alt += 1
            
    if sem_alt > 0:
        score += sem_alt * 2
        detalhes.append(f"Imagens sem descrição (alt): {sem_alt} (+{sem_alt*2})")

    return {"score": score, "detalhes": detalhes}

# ============================================================
#  5. Estrutura e Dark Patterns
# ============================================================
def avaliar_estrutura(soup):
    score = 0
    detalhes = []
    
    # Iframes (Conteúdo oculto/externo)
    iframes = soup.find_all("iframe")
    if iframes:
        score += len(iframes) * 5
        detalhes.append(f"Uso de iframes ({len(iframes)}) (+{len(iframes)*5})")

    return {"score": score, "detalhes": detalhes}

def avaliar_dark_patterns(soup):
    score = 0
    detalhes = []
    
    # Modais / Popups Intrusivos
    # Procura por classes comuns de modal
    classes_suspeitas = re.compile(r"modal|popup|overlay|dialog", re.IGNORECASE)
    modais = soup.find_all("div", class_=classes_suspeitas)
    
    # Filtra falsos positivos (ex: 'modal-content' dentro de 'modal')
    if len(modais) > 0:
        # Heurística: se tem muitos modais, provavelmente é intrusivo
        pts = min(len(modais) * 5, 20)
        score += pts
        detalhes.append(f"Possíveis popups/modais intrusivos: {len(modais)} (+{pts})")

    return {"score": score, "detalhes": detalhes}