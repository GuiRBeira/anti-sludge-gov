-- ============================================
-- SCRIPT SQL - F5 MAPEAMENTO ANTI-SLUDGE
-- SCHEMA BASE (TABELAS + ENUMS)
-- Banco de Dados: PostgreSQL 14+
-- ============================================

-- ============================================
-- EXTENSÕES
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TIPOS ENUMERADOS
-- ============================================

CREATE TYPE esfera_governo_enum AS ENUM ('Federal', 'Estadual', 'Municipal');
CREATE TYPE abrangencia_enum AS ENUM ('Público Geral', 'Público Específico');
CREATE TYPE criterio_impacto_enum AS ENUM ('Carga Cognitiva', 'Emoção', 'Consequência');
CREATE TYPE tipo_evidencia_enum AS ENUM ('Fala', 'Comportamento no sistema', 'Fala e Comportamento no sistema');

-- ============================================
-- TABELAS DE DOMÍNIO (LOOKUP)
-- ============================================

-- Categorias de Comportamento
CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    conceito TEXT,
    exemplos TEXT,
    descricao TEXT,
    quantidade_tipos INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE categoria IS 'Categorias de comportamentos do usuário na jornada digital';
COMMENT ON COLUMN categoria.conceito IS 'Definição conceitual da categoria';
COMMENT ON COLUMN categoria.exemplos IS 'Exemplos práticos de comportamentos';

-- Tipos de Comportamento
CREATE TABLE tipo_comportamento (
    id SERIAL PRIMARY KEY,
    categoria_id INT NOT NULL REFERENCES categoria(id) ON DELETE RESTRICT,
    nome VARCHAR(100) NOT NULL UNIQUE,
    codigo_referencia VARCHAR(50) NOT NULL UNIQUE,
    conceito TEXT,
    exemplos TEXT,
    descricao TEXT,
    num_criterios INT DEFAULT 0,
    ordem_na_categoria INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE tipo_comportamento IS 'Tipos específicos de comportamento dentro de cada categoria';
COMMENT ON COLUMN tipo_comportamento.codigo_referencia IS 'Código abreviado ex: Bus - Procurar site ou aplicativo';

-- Critérios de Avaliação de Barreiras (Template)
CREATE TABLE criterio_template (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    conceito TEXT NOT NULL,
    grupo_analise_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE criterio_template IS 'Template dos 14 critérios de avaliação de barreiras';

-- Grupos de Análise das Barreiras (Lentes)
CREATE TABLE grupo_analise (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT NOT NULL,
    criterios_considerados TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE grupo_analise IS 'Grupos/Lentes de análise que agrupam critérios';

-- Relacionamento: Quais critérios se aplicam a cada tipo de comportamento
CREATE TABLE tipo_criterio (
    id SERIAL PRIMARY KEY,
    tipo_comportamento_id INT NOT NULL REFERENCES tipo_comportamento(id) ON DELETE CASCADE,
    criterio_template_id INT NOT NULL REFERENCES criterio_template(id) ON DELETE CASCADE,
    ordem INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tipo_comportamento_id, criterio_template_id)
);

COMMENT ON TABLE tipo_criterio IS 'Mapeamento de quais critérios se aplicam a cada tipo de comportamento';

-- Glossário de Termos
CREATE TABLE glossario (
    id SERIAL PRIMARY KEY,
    termo VARCHAR(150) NOT NULL UNIQUE,
    grupo VARCHAR(100),
    definicao TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE glossario IS 'Glossário completo de termos da metodologia F5';

-- Escalas de Avaliação
CREATE TABLE escala_avaliacao (
    id SERIAL PRIMARY KEY,
    criterio_template_id INT REFERENCES criterio_template(id) ON DELETE SET NULL,
    tipo_comportamento_id INT REFERENCES tipo_comportamento(id) ON DELETE SET NULL,
    pergunta TEXT NOT NULL,
    texto_nota_1 TEXT NOT NULL,
    texto_nota_2 TEXT,
    texto_nota_3 TEXT,
    texto_nota_4 TEXT,
    texto_nota_5 TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE escala_avaliacao IS 'Escalas detalhadas de 1 a 5 para cada combinação critério+tipo';

-- ============================================
-- TABELA PRINCIPAL: PROCESSO/SERVIÇO
-- ============================================

CREATE TABLE processo (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    objetivo TEXT,
    esfera_governo esfera_governo_enum,
    abrangencia abrangencia_enum,
    publico_alvo TEXT,
    usuarios_estimados_ano INT,
    perfil_foco_mapeamento TEXT,
    jornada_planejada_descricao TEXT,
    necessidade_usuario TEXT,
    tempo_medio_estimado VARCHAR(50),
    indicadores_desempenho TEXT,
    hipoteses_dificuldades TEXT,
    registros_reclamacao TEXT,
    registros_satisfacao TEXT,
    status VARCHAR(50) DEFAULT 'Em Andamento',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_processo_nome ON processo(nome);
CREATE INDEX idx_processo_status ON processo(status);

-- ============================================
-- TABELA: ETAPA (Passos da Jornada)
-- ============================================

CREATE TABLE etapa (
    id SERIAL PRIMARY KEY,
    processo_id INT NOT NULL REFERENCES processo(id) ON DELETE CASCADE,
    categoria_id INT NOT NULL REFERENCES categoria(id) ON DELETE RESTRICT,
    tipo_comportamento_id INT NOT NULL REFERENCES tipo_comportamento(id) ON DELETE RESTRICT,
    numero VARCHAR(10),
    comportamento VARCHAR(500) NOT NULL,
    e_obrigatorio BOOLEAN DEFAULT FALSE,
    repeticoes VARCHAR(50),
    tempo_planejado INTERVAL,
    tempo_padrao INTERVAL,
    ordem INT NOT NULL,
    duracao_media_observada INTERVAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_etapa_processo ON etapa(processo_id);
CREATE INDEX idx_etapa_ordem ON etapa(processo_id, ordem);

COMMENT ON TABLE etapa IS 'Etapas/passos da jornada do usuário no processo';
COMMENT ON COLUMN etapa.comportamento IS 'Descrição da ação do usuário nesta etapa';

-- ============================================
-- TABELA: CRITÉRIO DE BARREIRA (por Etapa)
-- ============================================

CREATE TABLE criterio_barreira (
    id SERIAL PRIMARY KEY,
    etapa_id INT NOT NULL REFERENCES etapa(id) ON DELETE CASCADE,
    criterio_template_id INT REFERENCES criterio_template(id) ON DELETE SET NULL,
    nome VARCHAR(100) NOT NULL,
    pergunta TEXT NOT NULL,
    texto_nota_1 TEXT,
    texto_nota_5 TEXT,
    ordem INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_criterio_barreira_etapa ON criterio_barreira(etapa_id);

-- ============================================
-- TABELA: CRITÉRIO DE IMPACTO (por Etapa)
-- ============================================

CREATE TABLE criterio_impacto (
    id SERIAL PRIMARY KEY,
    etapa_id INT NOT NULL REFERENCES etapa(id) ON DELETE CASCADE,
    nome criterio_impacto_enum NOT NULL,
    pergunta TEXT NOT NULL,
    texto_nota_1 TEXT,
    texto_nota_5 TEXT,
    ordem INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_criterio_impacto_etapa ON criterio_impacto(etapa_id);

-- ============================================
-- TABELA: OBSERVADOR
-- ============================================

CREATE TABLE observador (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(255),
    estado VARCHAR(50),
    escolaridade VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABELA: JORNADA OBSERVADA (Sessão de Teste)
-- ============================================

CREATE TABLE jornada_observada (
    id SERIAL PRIMARY KEY,
    processo_id INT NOT NULL REFERENCES processo(id) ON DELETE CASCADE,
    observador_id INT REFERENCES observador(id) ON DELETE SET NULL,
    protocolo VARCHAR(50) NOT NULL UNIQUE,
    nome_jornada VARCHAR(100),
    data_observacao DATE NOT NULL,
    observacoes_gerais TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_jornada_processo ON jornada_observada(processo_id);
CREATE INDEX idx_jornada_data ON jornada_observada(data_observacao);

-- ============================================
-- TABELA: AVALIAÇÃO DE BARREIRA
-- ============================================

CREATE TABLE avaliacao_barreira (
    id SERIAL PRIMARY KEY,
    criterio_barreira_id INT NOT NULL REFERENCES criterio_barreira(id) ON DELETE CASCADE,
    jornada_observada_id INT REFERENCES jornada_observada(id) ON DELETE SET NULL,
    nota SMALLINT CHECK (nota IS NULL OR (nota >= 1 AND nota <= 5)),
    tipo_evidencia tipo_evidencia_enum,
    observacao TEXT,
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_avaliacao_barreira_criterio ON avaliacao_barreira(criterio_barreira_id);
CREATE INDEX idx_avaliacao_barreira_jornada ON avaliacao_barreira(jornada_observada_id);

-- ============================================
-- TABELA: AVALIAÇÃO DE IMPACTO
-- ============================================

CREATE TABLE avaliacao_impacto (
    id SERIAL PRIMARY KEY,
    criterio_impacto_id INT NOT NULL REFERENCES criterio_impacto(id) ON DELETE CASCADE,
    jornada_observada_id INT REFERENCES jornada_observada(id) ON DELETE SET NULL,
    nota SMALLINT CHECK (nota IS NULL OR (nota >= 1 AND nota <= 5)),
    tipo_evidencia tipo_evidencia_enum,
    observacao TEXT,
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_avaliacao_impacto_criterio ON avaliacao_impacto(criterio_impacto_id);
CREATE INDEX idx_avaliacao_impacto_jornada ON avaliacao_impacto(jornada_observada_id);

-- ============================================
-- TABELA: TEMPO POR ETAPA
-- ============================================

CREATE TABLE tempo_etapa (
    id SERIAL PRIMARY KEY,
    jornada_observada_id INT NOT NULL REFERENCES jornada_observada(id) ON DELETE CASCADE,
    etapa_id INT NOT NULL REFERENCES etapa(id) ON DELETE CASCADE,
    tempo_realizado INTERVAL NOT NULL,
    observacao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(jornada_observada_id, etapa_id)
);

CREATE INDEX idx_tempo_etapa ON tempo_etapa(etapa_id);

-- ============================================
-- TABELA: RESULTADO ANÁLISE (Validação/Sludge)
-- ============================================

CREATE TABLE resultado_analise (
    id SERIAL PRIMARY KEY,
    processo_id INT NOT NULL REFERENCES processo(id) ON DELETE CASCADE,
    etapa_id INT REFERENCES etapa(id) ON DELETE SET NULL,
    media_barreiras NUMERIC(3,2),
    media_impactos NUMERIC(3,2),
    indice_sludge NUMERIC(5,2),
    prioridade INT,
    e_sludge BOOLEAN DEFAULT FALSE,
    recomendacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_resultado_processo ON resultado_analise(processo_id);