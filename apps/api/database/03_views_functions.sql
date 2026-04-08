-- ============================================
-- VIEWS + FUNÇÕES + TRIGGERS - F5 MAPEAMENTO ANTI-SLUDGE
-- ============================================

-- ============================================
-- VIEWS ÚTEIS PARA RELATÓRIOS
-- ============================================

-- View: Resumo de Barreiras por Etapa
CREATE OR REPLACE VIEW vw_resumo_barreiras_etapa AS
SELECT 
    e.id AS etapa_id,
    e.numero,
    e.comportamento,
    c.nome AS categoria,
    tc.nome AS tipo,
    COUNT(ab.id) AS total_avaliacoes,
    ROUND(AVG(ab.nota)::numeric, 2) AS media_barreiras,
    MIN(ab.nota) AS menor_nota,
    MAX(ab.nota) AS maior_nota
FROM etapa e
JOIN categoria c ON e.categoria_id = c.id
JOIN tipo_comportamento tc ON e.tipo_comportamento_id = tc.id
LEFT JOIN criterio_barreira cb ON e.id = cb.etapa_id
LEFT JOIN avaliacao_barreira ab ON cb.id = ab.criterio_barreira_id
GROUP BY e.id, e.numero, e.comportamento, c.nome, tc.nome, e.ordem
ORDER BY e.ordem;

-- View: Resumo de Impactos por Etapa
CREATE OR REPLACE VIEW vw_resumo_impactos_etapa AS
SELECT 
    e.id AS etapa_id,
    e.numero,
    e.comportamento,
    c.nome AS categoria,
    COUNT(ai.id) AS total_avaliacoes,
    ROUND(AVG(ai.nota)::numeric, 2) AS media_impactos,
    MIN(ai.nota) AS menor_nota,
    MAX(ai.nota) AS maior_nota
FROM etapa e
JOIN categoria c ON e.categoria_id = c.id
LEFT JOIN criterio_impacto ci ON e.id = ci.etapa_id
LEFT JOIN avaliacao_impacto ai ON ci.id = ai.criterio_impacto_id
GROUP BY e.id, e.numero, e.comportamento, c.nome, e.ordem
ORDER BY e.ordem;

-- View: Índice de Sludge por Etapa
CREATE OR REPLACE VIEW vw_indice_sludge AS
SELECT 
    e.id AS etapa_id,
    e.numero,
    e.comportamento,
    c.nome AS categoria,
    COALESCE(vb.media_barreiras, 0) AS media_barreiras,
    COALESCE(vi.media_impactos, 0) AS media_impactos,
    ROUND((COALESCE(vb.media_barreiras, 0) * COALESCE(vi.media_impactos, 0))::numeric, 2) AS indice_sludge,
    CASE 
        WHEN (COALESCE(vb.media_barreiras, 0) * COALESCE(vi.media_impactos, 0)) >= 15 THEN 'CRÍTICO'
        WHEN (COALESCE(vb.media_barreiras, 0) * COALESCE(vi.media_impactos, 0)) >= 10 THEN 'ALTO'
        WHEN (COALESCE(vb.media_barreiras, 0) * COALESCE(vi.media_impactos, 0)) >= 5 THEN 'MÉDIO'
        ELSE 'BAIXO'
    END AS nivel_prioridade
FROM etapa e
JOIN categoria c ON e.categoria_id = c.id
LEFT JOIN vw_resumo_barreiras_etapa vb ON e.id = vb.etapa_id
LEFT JOIN vw_resumo_impactos_etapa vi ON e.id = vi.etapa_id
ORDER BY indice_sludge DESC;

-- View: Dashboard Geral do Processo
CREATE OR REPLACE VIEW vw_dashboard_processo AS
SELECT 
    p.id AS processo_id,
    p.nome AS processo,
    COUNT(DISTINCT e.id) AS total_etapas,
    COUNT(DISTINCT jo.id) AS total_jornadas_observadas,
    ROUND(AVG(vb.media_barreiras)::numeric, 2) AS media_geral_barreiras,
    ROUND(AVG(vi.media_impactos)::numeric, 2) AS media_geral_impactos,
    COUNT(CASE WHEN vs.nivel_prioridade = 'CRÍTICO' THEN 1 END) AS etapas_criticas,
    COUNT(CASE WHEN vs.nivel_prioridade = 'ALTO' THEN 1 END) AS etapas_altas
FROM processo p
LEFT JOIN etapa e ON p.id = e.processo_id
LEFT JOIN jornada_observada jo ON p.id = jo.processo_id
LEFT JOIN vw_resumo_barreiras_etapa vb ON e.id = vb.etapa_id
LEFT JOIN vw_resumo_impactos_etapa vi ON e.id = vi.etapa_id
LEFT JOIN vw_indice_sludge vs ON e.id = vs.etapa_id
GROUP BY p.id, p.nome;

-- ============================================
-- FUNÇÃO: Calcular Índice de Sludge
-- ============================================

CREATE OR REPLACE FUNCTION calcular_indice_sludge(p_etapa_id INT)
RETURNS NUMERIC AS $$
DECLARE
    v_media_barreiras NUMERIC;
    v_media_impactos NUMERIC;
BEGIN
    SELECT COALESCE(AVG(ab.nota), 0) INTO v_media_barreiras
    FROM criterio_barreira cb
    JOIN avaliacao_barreira ab ON cb.id = ab.criterio_barreira_id
    WHERE cb.etapa_id = p_etapa_id;
    
    SELECT COALESCE(AVG(ai.nota), 0) INTO v_media_impactos
    FROM criterio_impacto ci
    JOIN avaliacao_impacto ai ON ci.id = ai.criterio_impacto_id
    WHERE ci.etapa_id = p_etapa_id;
    
    RETURN ROUND((v_media_barreiras * v_media_impact