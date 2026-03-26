import re
from bs4 import BeautifulSoup

# ============================================================
#  SISTEMA DE HEURÍSTICAS APRIMORADO PARA DETECÇÃO DE SLUDGE
# ============================================================

def avaliar_pagina(html, url=None):
    """
    Função principal: avalia uma página HTML e retorna diagnóstico completo.
    """

    soup = BeautifulSoup(html, "html.parser")

    resultado = {
        "texto": avaliar_textos(soup),
        "links": avaliar_links(soup, url),
        "formularios": avaliar_formularios(soup),
        "acessibilidade": avaliar_acessibilidade(soup),
        "estrutura": avaliar_estrutura(soup),
        "dark_patterns": avaliar_dark_patterns(soup),
    }

    # Score final (pode calibrar futuramente)
    score_total = sum(r["score"] for r in resultado.values())

    resultado["score_total"] = score_total

    return resultado


# ============================================================
#  1. Heurísticas de Texto
# ============================================================

def avaliar_textos(soup):
    score = 0
    detalhes = []

    textos = soup.find_all(text=True)
    textos = [t.strip() for t in textos if t.strip()]

    # Palavras burocráticas pesadas
    palavras_burocraticas = [
        "deferimento", "indeferido", "tramitação", "expediente",
        "providenciar", "município", "certidão", "alvará",
        "comprovação", "averbação", "deliberação"
    ]

    # Palavras coercitivas
    coercitivas = [
        "você tem certeza", "não poderá desfazer", "decisão irreversível",
        "perderá acesso", "multado", "obrigatório prosseguir"
    ]

    # Parágrafo muito longo
    for t in textos:
        palavras = t.split()
        if len(palavras) > 60:
            score += 8
            detalhes.append("Parágrafo muito longo (+8)")

        # Sentenças longas
        sentencas = re.split(r"[.!?]", t)
        for s in sentencas:
            if len(s.split()) > 30:
                score += 5
                detalhes.append("Sentença longa detectada (+5)")

        # Palavras burocráticas
        for p in palavras_burocraticas:
           if re.search(r'\b' + re.escape(p) + r'\b', t, re.IGNORECASE):
                score += 3
                detalhes.append(f"Texto burocrático detectado: '{p}' (+3)")

        # Linguagem coercitiva
        for c in coercitivas:
            if c in t.lower():
                score += 12
                detalhes.append(f"Linguagem coercitiva: '{c}' (+12)")

    return {"score": score, "detalhes": detalhes}


# ============================================================
#  2. Heurísticas de Links
# ============================================================

def avaliar_links(soup, base_url=None):
    score = 0
    detalhes = []

    links = soup.find_all("a")
    hrefs = [l.get("href") for l in links]

    # Links inúteis
    for href in hrefs:
        if href is None:
            score += 3
            detalhes.append("Link sem destino (+3)")
        elif href in ["#", "javascript:void(0);", "javascript:;"]:
            score += 5
            detalhes.append("Link inútil / placeholder (+5)")

    # Adicione verificação para links que abrem em nova aba sem avisar (quebra de fluxo)
    for l in links:
        if l.get("target") == "_blank" and "nova aba" not in l.text.lower():
            score += 2 # Pequeno sludge de usabilidade

    # Links repetidos
    repetidos = len(hrefs) - len(set(hrefs))
    if repetidos > 0:
        score += repetidos * 2
        detalhes.append(f"Links repetidos: {repetidos} (+{repetidos*2})")

    # Links profundos demais (muita navegação)
    for href in hrefs:
        if href and href.count("/") > 6:
            score += 4
            detalhes.append("Link muito profundo (+4)")

    return {"score": score, "detalhes": detalhes}


# ============================================================
#  3. Heurísticas para Formulários
# ============================================================

def avaliar_formularios(soup):
    score = 0
    detalhes = []

    forms = soup.find_all("form")

    for form in forms:

        inputs = form.find_all("input")
        textareas = form.find_all("textarea")
        selects = form.find_all("select")

        total_campos = len(inputs) + len(textareas) + len(selects)

        # Muitos campos obrigatórios
        obrigatorios = [i for i in inputs if i.get("required")]

        if len(obrigatorios) > 5:
            score += 10
            detalhes.append("Formulário com muitos campos obrigatórios (+10)")

        # Campos escondidos demais
        hidden = [i for i in inputs if i.get("type") == "hidden"]
        if len(hidden) > 3:
            score += 8
            detalhes.append("Uso excessivo de campos hidden (+8)")

        # Input genérico
        for i in inputs:
            nome = i.get("name", "")
            if nome.lower() in ["dados", "info", "campo", "valor"]:
                score += 5
                detalhes.append(f"Campo genérico suspeito: '{nome}' (+5)")

        # Falta de label
        for i in inputs:
            if i.get("type") != "hidden":
                id_input = i.get("id")
                tem_label_explicito = id_input and soup.find("label", {"for": id_input})
                tem_label_implicito = i.find_parent("label") # Verifica se o input está dentro de um label

                if not tem_label_explicito and not tem_label_implicito:
                    score += 4
                    detalhes.append("Campo sem label (+4)")

        # Formulário grande e pesado
        if total_campos > 12:
            score += 12
            detalhes.append("Formulário extenso (+12)")

    return {"score": score, "detalhes": detalhes}


# ============================================================
#  4. Acessibilidade
# ============================================================

def avaliar_acessibilidade(soup):
    score = 0
    detalhes = []

    imgs = soup.find_all("img")
    for img in imgs:
        alt = img.get("alt")
        if not alt or alt.strip() == "":
            score += 5
            detalhes.append("Imagem sem texto alternativo (+5)")

    # Botões sem role
    botoes = soup.find_all("button")
    for b in botoes:
        if not b.get("aria-label") and not b.text.strip():
            score += 6
            detalhes.append("Botão sem rótulo nem aria-label (+6)")

    return {"score": score, "detalhes": detalhes}


# ============================================================
#  5. Estrutura
# ============================================================

def avaliar_estrutura(soup):
    score = 0
    detalhes = []

    # Muitos elementos no DOM
    total = len(soup.find_all())
    if total > 2000:
        score += 10
        detalhes.append("DOM muito grande (+10)")

    # CSS inline excessivo
    inline = soup.find_all(style=True)
    if len(inline) > 40:
        score += 8
        detalhes.append("Uso excessivo de CSS inline (+8)")

    # iframes suspeitos
    iframes = soup.find_all("iframe")
    if len(iframes) > 0:
        score += len(iframes) * 5
        detalhes.append(f"Detectou {len(iframes)} iframe(s) (+{len(iframes)*5})")

    return {"score": score, "detalhes": detalhes}


# ============================================================
#  6. Dark Patterns
# ============================================================

def avaliar_dark_patterns(soup):
    score = 0
    detalhes = []

    # Modal detectado
    modais = soup.find_all(class_=re.compile(r"(modal|dialog|popup)"))
    for m in modais:
        score += 10
        detalhes.append("Possível modal intrusivo (+10)")

    # Botões coercitivos
    botoes = soup.find_all("button")
    for b in botoes:
        texto = b.text.strip().lower()
        if "aceitar tudo" in texto:
            score += 10
            detalhes.append("Possível dark pattern: 'aceitar tudo' em destaque (+10)")
        if "continuar mesmo assim" in texto:
            score += 12
            detalhes.append("Botão coercitivo (+12)")

    return {"score": score, "detalhes": detalhes}
