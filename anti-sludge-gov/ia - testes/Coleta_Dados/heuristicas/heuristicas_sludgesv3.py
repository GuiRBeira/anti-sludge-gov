"""
Heurísticas v3 - Detector de Sludges Digitais
Arquivo: heuristicas_sludge_v3.py
Descrição: Implementação modular das Heurísticas v3 propostas para detectar sludges digitais
Autor: Guilherme Ricardo Beira
Requisitos: beautifulsoup4, requests
Observações:
 - Análise visual e comportamental estática (inspeção de HTML/CSS/JS). Para análise dinâmica, recomenda-se usar Selenium e executar `evaluate_page_with_selenium()`.
 - A heurística prioriza regras explicáveis e fáceis de converter em features para ML.

Uso:
    from heuristicas_sludge_v3 import avaliar_pagina
    resultado = avaliar_pagina(html_string, url="https://exemplo.gov.br")

Retorno: dict com chaves por módulo e score_total.
"""

import re
import json
from bs4 import BeautifulSoup
from collections import Counter
from html import unescape

# ----------------------------- Utilitários -----------------------------

def safe_get_text(soup):
    return soup.get_text(" ", strip=True)


def normalize_spaces(text):
    return re.sub(r"\s+", " ", text).strip()


# Conversão simples de cores (#hex, rgb()) para luminância

def parse_color_value(value):
    """Retorna tupla RGB 0..255 ou None"""
    if not value:
        return None
    v = value.strip()
    # hex
    m = re.match(r"#([0-9a-fA-F]{3,8})", v)
    if m:
        h = m.group(1)
        if len(h) in (3, 4):
            # expande 3->6
            h = ''.join([c*2 for c in h[:3]])
        if len(h) >= 6:
            r = int(h[0:2], 16)
            g = int(h[2:4], 16)
            b = int(h[4:6], 16)
            return (r, g, b)
    # rgb()
    m = re.match(r"rgb\((\d+),\s*(\d+),\s*(\d+)\)", v)
    if m:
        return (int(m.group(1)), int(m.group(2)), int(m.group(3)))
    # rgba()
    m = re.match(r"rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9\.]+)\)", v)
    if m:
        a = float(m.group(4))
        if a < 0.2:
            return None
        return (int(m.group(1)), int(m.group(2)), int(m.group(3)))
    return None


def relative_luminance(rgb):
    # rgb components 0..255
    if rgb is None:
        return None
    def linear(c):
        c = c/255.0
        return c/12.92 if c <= 0.03928 else ((c+0.055)/1.055) ** 2.4
    r, g, b = rgb
    return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)


def contrast_ratio(rgb1, rgb2):
    L1 = relative_luminance(rgb1)
    L2 = relative_luminance(rgb2)
    if L1 is None or L2 is None:
        return None
    lighter = max(L1, L2)
    darker = min(L1, L2)
    return (lighter + 0.05) / (darker + 0.05)


# ----------------------------- Módulo 1: Texto/NLP -----------------------------

TERMS_COERCIVE = [
    r"\b(não poderei desfazer|perder acesso|última chance|tempo limitado|oferta expira)\b",
    r"\b(tem certeza que quer|tem certeza de que)\b",
]

TERMS_JARGON = [
    r"\bindeferido\b", r"\bdeferimento\b", r"\btramitação\b", r"\bsob pena de\b",
    r"\bconsoante\b", r"\bexarado\b", r"\bdiligência\b", r"\bguarnecido\b"
]

NEGATIVE_URGENCY_PATTERNS = [r"\b(últimas vagas|tempo limitado|expira|agora ou nunca)\b"]


def avaliar_texto_nlp(soup, texto_completo):
    score = 0
    detalhes = []
    texto = normalize_spaces(unescape(texto_completo or safe_get_text(soup))).lower()

    # 1. termos coercitivos
    for p in TERMS_COERCIVE:
        matches = re.findall(p, texto, re.IGNORECASE)
        if matches:
            pts = 5 * len(matches)
            score += pts
            detalhes.append(f"Linguagem coercitiva: {matches[:3]} (+{pts})")

    # 2. jargão/burocracia
    for p in TERMS_JARGON:
        matches = re.findall(p, texto, re.IGNORECASE)
        if matches:
            pts = 3 * len(matches)
            score += pts
            detalhes.append(f"Jargão burocrático: {matches[:3]} (+{pts})")

    # 3. legibilidade (Flesch adaptado) - heurística simplificada mas aprimorada
    palavras = [p for p in re.findall(r"\w+", texto) if len(p) > 1]
    frases = [f for f in re.split(r"[.!?]+", texto) if len(f.strip()) > 3]
    if len(palavras) > 50 and len(frases) > 2:
        media_palavras_frase = len(palavras) / len(frases)
        palabras_grandes = [p for p in palavras if len(p) > 9]
        taxa_complex = len(palabras_grandes) / len(palavras)
        if media_palavras_frase > 25:
            score += 15
            detalhes.append(f"Frases muito longas (média {int(media_palavras_frase)} palavras) (+15)")
        if taxa_complex > 0.20:
            score += 15
            detalhes.append(f"Vocabulário complexo ({int(taxa_complex*100)}%) (+15)")

    # 4. urgência / negatividade
    for p in NEGATIVE_URGENCY_PATTERNS:
        matches = re.findall(p, texto, re.IGNORECASE)
        if matches:
            pts = 8 * len(matches)
            score += pts
            detalhes.append(f"Urgência artificial: {matches[:3]} (+{pts})")

    return {"score": score, "detalhes": detalhes}


# ----------------------------- Módulo 2: Links e Navegação -----------------------------

def avaliar_links_navegacao(soup, base_url=None):
    score = 0
    detalhes = []
    links = soup.find_all('a')
    hrefs = [l.get('href') or '' for l in links]

    # Placeholders
    placeholders = [h for h in hrefs if h.strip() in ['#', 'javascript:void(0)', 'javascript:;', '']]
    if placeholders:
        pts = len(placeholders) * 2
        score += pts
        detalhes.append(f"Links placeholders: {len(placeholders)} (+{pts})")

    # Repetição de links
    counter = Counter(hrefs)
    repetidos = sum([count-1 for count in counter.values() if count > 1])
    if repetidos:
        pts = min(repetidos, 50)
        score += pts
        detalhes.append(f"Links repetidos: {repetidos} (+{pts})")

    # Detectar profundidade de ação: heurística estática -> contar caminhos potencialmente longos
    # Ex.: buscar anchor links que apontem para #passo- ou identificar multi-step forms
    anchors = [h for h in hrefs if h.startswith('#')]
    if len(anchors) > 10:
        score += 5
        detalhes.append(f"Muitos anchors na página ({len(anchors)}) - possível navegação fragmentada (+5)")

    return {"score": score, "detalhes": detalhes}


# ----------------------------- Módulo 3: Formulários & Escolha -----------------------------

def avaliar_formularios_controles(soup):
    score = 0
    detalhes = []
    forms = soup.find_all('form')

    for form in forms:
        inputs = form.find_all(['input', 'textarea', 'select'])
        required = [i for i in inputs if i.has_attr('required')]
        if len(required) > 5:
            score += 10
            detalhes.append(f"Campos obrigatórios excessivos: {len(required)} (+10)")

        # selects grandes -> paralisia de escolha
        selects = form.find_all('select')
        for sel in selects:
            opts = sel.find_all('option')
            if len(opts) > 15:
                score += 5
                detalhes.append(f"Select com muitas opções ({len(opts)}) (+5)")

        # inputs sem label
        sem_label = 0
        for i in form.find_all(['input', 'textarea']):
            if i.get('type') in ['hidden', 'submit', 'button']:
                continue
            idv = i.get('id')
            label_ex = bool(idv and form.find('label', {'for': idv}))
            label_parent = bool(i.find_parent('label'))
            if not label_ex and not label_parent:
                sem_label += 1
        if sem_label:
            score += sem_label * 3
            detalhes.append(f"Campos sem label no form: {sem_label} (+{sem_label*3})")

        # pré-seleção manipulativa (checkboxes/radios checked)
        prechecked = form.find_all(['input'], attrs={'checked': True})
        if prechecked:
            pts = len(prechecked) * 10
            score += pts
            detalhes.append(f"Opções pré-selecionadas: {len(prechecked)} (+{pts})")

    # múltiplos CTAs conflitantes
    ctas = soup.find_all(['button', 'a'], text=True)
    if len(ctas) > 7:
        score += 10
        detalhes.append(f"Muitos CTAs na página ({len(ctas)}) - possível confusão (+10)")

    return {"score": score, "detalhes": detalhes}


# ----------------------------- Módulo 4: Acessibilidade Profunda -----------------------------

def avaliar_acessibilidade_profunda(soup):
    score = 0
    detalhes = []

    # Imagens sem alt
    imgs = soup.find_all('img')
    sem_alt = sum(1 for img in imgs if not img.has_attr('alt') or not img.get('alt').strip())
    if sem_alt:
        score += sem_alt * 2
        detalhes.append(f"Imagens sem alt: {sem_alt} (+{sem_alt*2})")

    # Landmarks
    landmarks = ['main', 'nav', 'header', 'footer']
    missing_landmarks = [l for l in landmarks if not soup.find(l)]
    if missing_landmarks:
        pts = len(missing_landmarks) * 2
        score += pts
        detalhes.append(f"Landmarks ausentes: {missing_landmarks} (+{pts})")

    # Inputs sem roles/aria
    inputs = soup.find_all(['input', 'button', 'select', 'textarea'])
    faltam_aria = sum(1 for i in inputs if not (i.has_attr('aria-label') or i.has_attr('role') or i.get('id')))
    if faltam_aria:
        pts = min(faltam_aria * 1, 30)
        score += pts
        detalhes.append(f"Controles sem ARIA/label identificável: {faltam_aria} (+{pts})")

    # font-size muito pequeno (heurística)
    small_txt = 0
    # busca inline styles com font-size
    for el in soup.find_all(style=True):
        s = el.get('style')
        m = re.search(r"font-size\s*:\s*(\d+)px", s)
        if m and int(m.group(1)) < 14:
            small_txt += 1
    if small_txt:
        score += min(small_txt * 2, 20)
        detalhes.append(f"Elementos com font-size < 14px (inline): {small_txt} (+{min(small_txt*2,20)})")

    return {"score": score, "detalhes": detalhes}


# ----------------------------- Módulo 5: Estrutura & Dark Patterns -----------------------------

def avaliar_estrutura_darkpatterns(soup):
    score = 0
    detalhes = []

    # Iframes
    iframes = soup.find_all('iframe')
    if iframes:
        pts = len(iframes) * 5
        score += pts
        detalhes.append(f"Iframes detectados: {len(iframes)} (+{pts})")

    # Popups/modais heurística por classnames
    classes_suspeitas = re.compile(r"modal|popup|overlay|dialog|lightbox", re.IGNORECASE)
    modais = [d for d in soup.find_all(True, class_=classes_suspeitas)]
    if modais:
        pts = min(len(modais) * 5, 25)
        score += pts
        detalhes.append(f"Possiveis modais/popups: {len(modais)} (+{pts})")

    return {"score": score, "detalhes": detalhes}


# ----------------------------- Módulo 6: Visual & UX -----------------------------

def coletar_estilos_inline(soup):
    # Retorna lista de (element, style_str)
    return [(el, el.get('style')) for el in soup.find_all(style=True)]


def extrair_cores_de_style(style):
    # heurística simples: captura color, background-color
    props = {}
    for m in re.finditer(r"([\w-]+)\s*:\s*([^;]+);?", style):
        props[m.group(1).strip()] = m.group(2).strip()
    return props


def avaliar_visual_ux(soup):
    score = 0
    detalhes = []

    # 1. contraste em inline styles (heurística) - procura elementos com color e background-color
    for el, style in coletar_estilos_inline(soup):
        props = extrair_cores_de_style(style or "")
        if 'color' in props and 'background-color' in props:
            rgb_tx = parse_color_value(props['color'])
            rgb_bg = parse_color_value(props['background-color'])
            cr = contrast_ratio(rgb_tx, rgb_bg)
            if cr is not None:
                if cr < 3.0:
                    score += 10
                    detalhes.append(f"Baixo contraste inline ({cr:.2f}) em <{el.name}> (+10)")
                elif cr < 4.5:
                    score += 5
                    detalhes.append(f"Contraste borderline ({cr:.2f}) em <{el.name}> (+5)")

    # 2. botões muito pequenos -> procura por button/input[type=button] com height/width inline
    small_buttons = 0
    for b in soup.find_all(['button', 'input']):
        style = b.get('style') or ''
        m_h = re.search(r"height\s*:\s*(\d+)px", style)
        m_w = re.search(r"width\s*:\s*(\d+)px", style)
        if (m_h and int(m_h.group(1)) < 32) or (m_w and int(m_w.group(1)) < 32):
            small_buttons += 1
    if small_buttons:
        pts = min(small_buttons * 8, 40)
        score += pts
        detalhes.append(f"Botoes pequenos detectados (inline styles): {small_buttons} (+{pts})")

    # 3. inputs invisíveis/fora da tela
    invisiveis = 0
    for el, style in coletar_estilos_inline(soup):
        s = style or ''
        if re.search(r"opacity\s*:\s*0|visibility\s*:\s*hidden|left\s*:\s*-?\d+px;?\s*position\s*:\s*absolute", s):
            invisiveis += 1
    if invisiveis:
        pts = min(invisiveis * 8, 40)
        score += pts
        detalhes.append(f"Elementos visualmente escondidos via style inline: {invisiveis} (+{pts})")

    # 4. botões desbalanceados heurística simples: procura pares "confirm/accept" vs "cancel" na mesma seção
    texto = safe_get_text(soup).lower()
    accepts = len(re.findall(r"\b(confirmar|aceitar|concluir|continuar)\b", texto))
    cancels = len(re.findall(r"\b(cancelar|sair|voltar)\b", texto))
    if accepts > cancels and accepts >= 2:
        diff = accepts - cancels
        pts = min(diff * 10, 30)
        score += pts
        detalhes.append(f"Desbalanceamento de CTAs (accepts {accepts} vs cancels {cancels}) (+{pts})")

    return {"score": score, "detalhes": detalhes}


# ----------------------------- Módulo 7: Comportamental / JS (estático) -----------------------------

def avaliar_js_estatico(soup):
    score = 0
    detalhes = []
    scripts = soup.find_all('script')
    script_texts = [s.get_text('\n') for s in scripts if s.get_text()] 
    all_js = '\n'.join(script_texts).lower()

    # Timers / delays
    if re.search(r"settimeout\s*\(", all_js):
        matches = re.findall(r"settimeout\s*\(", all_js)
        pts = min(len(matches) * 5, 20)
        score += pts
        detalhes.append(f"Uso de setTimeout identificado ({len(matches)}) (+{pts})")

    # Interceptação do botão voltar / onbeforeunload
    if 'onbeforeunload' in all_js or 'history.pushstate' in all_js or 'event.returnvalue' in all_js:
        score += 15
        detalhes.append("Possível interceptacao da navegacao (onbeforeunload/history.pushState) (+15)")

    # Scroll forçado
    if re.search(r"scrollto\s*\(|scrollintoview\s*\(", all_js):
        matches = re.findall(r"scrollto\s*\(|scrollintoview\s*\(", all_js)
        pts = min(len(matches) * 3, 10)
        score += pts
        detalhes.append(f"Scroll forçado identificado ({len(matches)}) (+{pts})")

    # popups não fecháveis heurística
    if re.search(r"close.*popup|close.*modal|remove.*overlay", all_js):
        # se scripts de fechamento existem, provavelmente nao é intrusivo; caso contrário, se ha muitos popups detectados mas sem fechamento -> pontuar
        pass

    return {"score": score, "detalhes": detalhes}


# ----------------------------- Agregador final -----------------------------

def avaliar_pagina(html, url=None):
    soup = BeautifulSoup(html, 'html.parser')

    resultado = {}
    resultado['texto_nlp'] = avaliar_texto_nlp(soup, safe_get_text(soup))
    resultado['links'] = avaliar_links_navegacao(soup, url)
    resultado['formularios'] = avaliar_formularios_controles(soup)
    resultado['acessibilidade'] = avaliar_acessibilidade_profunda(soup)
    resultado['estrutura'] = avaliar_estrutura_darkpatterns(soup)
    resultado['visual'] = avaliar_visual_ux(soup)
    resultado['js_estatico'] = avaliar_js_estatico(soup)

    score_total = sum(v['score'] for v in resultado.values())
    resultado['score_total'] = {'score': score_total, 'detalhes': []}

    return resultado


# ----------------------------- Função auxiliar para execução via URL (opcional) -----------------------------
try:
    import requests
except Exception:
    requests = None


def avaliar_url(url, timeout=12):
    if not requests:
        raise RuntimeError('requests não disponível. Instale requests para usar avaliar_url')
    r = requests.get(url, timeout=timeout)
    r.encoding = r.apparent_encoding
    return avaliar_pagina(r.text, url=url)


# ----------------------------- Exemplo de uso com Selenium (comentado) -----------------------------
# Para análise dinâmica (recomendada para detectar modais reais, estilos computados, tamanhos/bounding boxes):
# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
#
# def avaliar_page_with_selenium(url):
#     opts = Options()
#     opts.add_argument('--headless=new')
#     driver = webdriver.Chrome(options=opts)
#     driver.get(url)
#     html = driver.page_source
#     # Para obter estilos computados e bounding boxes, use driver.find_element and element.size / element.location / driver.execute_script
#     res = avaliar_pagina(html, url=url)
#     driver.quit()
#     return res


# ----------------------------- CLI simples -----------------------------
if __name__ == '__main__':
    import sys
    if len(sys.argv) < 2:
        print('Uso: python heuristicas_sludge_v3.py <arquivo.html ou URL>')
        sys.exit(1)
    target = sys.argv[1]
    try:
        if target.startswith('http') and requests:
            out = avaliar_url(target)
        else:
            with open(target, 'r', encoding='utf-8') as f:
                html = f.read()
            out = avaliar_pagina(html)
        print(json.dumps(out, ensure_ascii=False, indent=2))
    except Exception as e:
        print('Erro:', e)
