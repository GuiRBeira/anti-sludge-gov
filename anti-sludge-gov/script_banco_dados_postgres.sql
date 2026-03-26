-- ============================================
-- SCRIPT SQL - F5 MAPEAMENTO ANTI-SLUDGE
-- Banco de Dados: PostgreSQL 14+
-- Versão: 2.0 (Atualizado com Glossário, Grupos e Escalas)
-- ============================================

-- Criação do banco de dados (executar como superuser)
-- CREATE DATABASE f5_antisludge WITH ENCODING 'UTF8';
-- \c f5_antisludge

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

COMMENT ON TABLE grupo_analise IS 'Grupos/Lentes de análise que agrupam critérios: Cidadania Digital, Clareza, Linguagem Simples, etc.';

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

-- ============================================
-- DADOS INICIAIS: GRUPOS DE ANÁLISE
-- ============================================

INSERT INTO grupo_analise (nome, descricao, criterios_considerados) VALUES
('Cidadania Digital', 'Refere-se ao processo de democratizar o acesso ao ambiente digital para que as pessoas possam dele participar ativamente para se informar, se expressar e acessar serviços públicos de forma segura, consciente e inclusiva, com respeito às diversidades, direitos e deveres de todos.', 'Acessibilidade das informações, Autonomia, Compatibilidade, Confiança, Consistência, Empatia, Facilidade de entendimento'),
('Clareza', 'Refere-se à capacidade de transmitir uma mensagem de forma suficiente, direta, precisa e sem ambiguidade. O foco está no emissor da mensagem (quem comunica) e na forma como a mensagem é estruturada.', 'Conteúdo, Design, Facilidade de entendimento'),
('Linguagem Simples', 'Refere-se ao uso de linguagem respeitosa, amigável, clara e de fácil compreensão (ex.: uso de elementos não textuais, redução do uso de termos técnicos, jargões, siglas desconhecidas, e comunicações duplicadas e desnecessárias).', 'Consistência, Conteúdo, Design, Eficiência, Facilidade de entendimento'),
('Suporte ao Usuário', 'Refere-se à assistência prestada ao usuário durante e após a execução do processo/serviço.', 'Apoio proativo, Avaliação, Checagem, Empatia'),
('Transparência', 'Refere-se a mostrar o processo, ser honesto sobre intenções, dados e limitações, e permitir que o usuário acompanhe e confie na experiência.', 'Confiança, Conteúdo, Facilidade de entendimento'),
('Usabilidade', 'Refere-se a facilidade de uso de um serviço, ou seja, busca minimizar a necessidade de suporte ao usuário, tornando o serviço intuitivo e fácil de aprender.', 'Acessibilidade das informações, Autonomia, Consistência, Eficiência, Flexibilidade');

-- ============================================
-- DADOS INICIAIS: CATEGORIAS
-- ============================================

INSERT INTO categoria (nome, conceito, exemplos, descricao, quantidade_tipos) VALUES
('Busca e Acesso', 'Envolve o conjunto de comportamentos que a pessoa usuária realiza para localizar, acessar e verificar informações.', 'inserir palavras-chave para encontrar informações específicas; navegar pelos menus principais e secundários do site ou aplicativo; ler e verificar informações apresentadas; realizar login.', 'Envolve o conjunto de comportamentos que a pessoa usuária realiza para localizar, acessar e verificar informações.', 6),
('Preparação e Entrega', 'Envolve o conjunto de comportamentos necessários para elaborar, preencher, encaminhar informações e manifestar concordância.', 'preencher cadastro, anexar documentos, assinar documento, enviar formulário.', 'Envolve o conjunto de comportamentos necessários para elaborar, preencher, encaminhar informações e manifestar concordância.', 4),
('Interação', 'Envolve os comportamentos de interação, simultâneos ou não, para tirar dúvidas, enviar sugestões ou reclamações.', 'chat ao vivo, envio de e-mail, ligação telefônica.', 'Envolve os comportamentos de interação, simultâneos ou não, para tirar dúvidas, enviar sugestões ou reclamações.', 2),
('Escolha', 'Envolve os comportamentos relacionados à análise e seleção de alternativas que sejam relevantes para a continuidade do processo.', 'selecionar tipo de serviço, escolher horário de agendamento.', 'Envolve os comportamentos relacionados à análise e seleção de alternativas que sejam relevantes para a continuidade do processo. Pequenas escolhas, que tenham pouco ou nenhum impacto no andamento do processo, não precisam ser registradas.', 1),
('Espera', 'Envolve o comportamento de aguardar uma ação externa.', 'aguardar resposta de e-mail, aguardar atendimento em fila virtual.', 'Envolve o comportamento de aguardar uma ação externa.', 2),
('Outros', 'Envolve comportamentos relevantes que não estão presentes nas opções pré-definidas ou são específicos do processo que está sendo mapeado.', 'comportamentos exclusivos ou atípicos de determinado processo.', 'Envolve comportamentos relevantes que não estão presentes nas opções pré-definidas ou são específicos do processo que está sendo mapeado.', 1);

-- ============================================
-- DADOS INICIAIS: TIPOS DE COMPORTAMENTO
-- ============================================

INSERT INTO tipo_comportamento (categoria_id, nome, codigo_referencia, conceito, exemplos, num_criterios, ordem_na_categoria) VALUES
-- Busca e Acesso (categoria_id = 1)
(1, 'Procurar site ou aplicativo', 'Bus - Procurar site ou aplicativo', 'É o comportamento da pessoa usuária relacionado a identificar e buscar a plataforma digital mais adequada para se conectar com o serviço.', 'localizar o site do INSS.', 2, 1),
(1, 'Acessar serviço', 'Bus - Acessar serviço', 'É o comportamento da pessoa usuária que envolve estabelecer uma conexão com site ou aplicativo do serviço.', 'entrar na página do INSS.', 3, 2),
(1, 'Verificar elegibilidade', 'Bus - Verificar elegibilidade', 'É o comportamento de buscar identificar se um indivíduo ou instituição cumpre os requisitos necessários para utilizar um serviço ou acessar um benefício.', 'checar requisitos para solicitar desconto da taxa de inscrição de um concurso público.', 3, 3),
(1, 'Realizar login', 'Bus - Realizar login', 'É o comportamento da pessoa usuária de autenticar-se em uma plataforma digital para ter acesso a funcionalidades e recursos restritos.', 'realizar reconhecimento facial ou digital; utilizar autenticação social (via redes sociais).', 2, 4),
(1, 'Navegar', 'Bus - Navegar', 'É o comportamento da pessoa usuária de interagir com as diferentes telas e recursos disponíveis na plataforma digital do órgão ou serviço.', 'clicar em links internos para navegar entre as diferentes páginas de um site.', 2, 5),
(1, 'Acessar conteúdo', 'Bus - Acessar conteúdo', 'É o comportamento da pessoa usuária de interagir com informações apresentadas na plataforma digital, envolvendo atenção e compreensão do texto ou imagens, inclusive por meio de tecnologias acessíveis.', 'fazer leitura de informações sobre renovação de documentos.', 7, 6),
-- Preparação e Entrega (categoria_id = 2)
(2, 'Preencher', 'Pre - Preencher', 'É o comportamento da pessoa usuária de inserir dados específicos, em campos pré-determinados, com o objetivo de registrar ou comunicar informações relevantes para solicitar o serviço fim.', 'preencher formulário de cadastro.', 11, 1),
(2, 'Organizar e anexar', 'Pre - Organizar e anexar', 'É o comportamento da pessoa usuária de coletar, organizar e transferir para o site ou aplicativo informações e arquivos digitais para um determinado fim.', 'anexar foto do documento, upload de comprovante.', 7, 2),
(2, 'Enviar', 'Pre - Enviar', 'É o comportamento da pessoa usuária de transmitir os dados inseridos no formulário para o serviço.', 'enviar informações para solicitação de passaporte.', 2, 3),
(2, 'Consentir', 'Pre - Consentir', 'É o comportamento da pessoa usuária de manifestar concordância formal ou assinar os termos necessários para o serviço.', 'aceitar termos de uso, assinar digitalmente.', 3, 4),
-- Interação (categoria_id = 3)
(3, 'Interagir sincronamente', 'Int - Interagir sincronamente', 'É o comportamento da pessoa usuária de comunicar-se instantaneamente com o suporte do serviço.', 'chat ao vivo, videoconferência.', 12, 1),
(3, 'Interagir assincronamente', 'Int - Interagir assincronamente', 'É o comportamento da pessoa usuária de comunicar-se com o suporte do serviço de maneira não instantânea, com respostas em tempos distintos.', 'enviar e-mail, abrir chamado.', 20, 2),
-- Escolha (categoria_id = 4)
(4, 'Selecionar entre alternativas', 'Esc - Selecionar entre alternativas', 'É o comportamento da pessoa usuária de escolher entre diferentes opções ou atributos de um serviço, a fim de personalizar a experiência do usuário ou atender a necessidades específicas.', 'escolher tipo de atendimento, selecionar data.', 7, 1),
-- Espera (categoria_id = 5)
(5, 'Espera passiva', 'Esp - Espera passiva', 'É o comportamento da pessoa usuária de aguardar a resposta.', 'aguardar e-mail de confirmação.', 4, 1),
(5, 'Espera ativa', 'Esp - Espera ativa', 'É o comportamento da pessoa usuária de aguardar sua vez de ser atendido em um sistema que o posiciona em uma fila virtual.', 'aguardar atendimento em chat online.', 3, 2),
-- Outros (categoria_id = 6)
(6, 'Comportamento novo', 'Out - Comportamento novo', 'Refere-se a um comportamento exclusivo ou atípico de determinado processo.', 'cumprir algum requisito pouco usual em outros processos.', 5, 1);

-- ============================================
-- DADOS INICIAIS: CRITÉRIOS TEMPLATE
-- ============================================

INSERT INTO criterio_template (nome, conceito) VALUES
('Acessibilidade das informações', 'Informações importantes devem ser fáceis de encontrar e compreender.'),
('Apoio proativo', 'Refere-se a iniciativa de prever e solucionar problemas antes mesmo que os usuários os identifiquem.'),
('Autonomia', 'Refere-se à apresentação de interfaces que fazem sentido para a pessoa usuária, proporcionando uma experiência mais fluida e satisfatória.'),
('Avaliação', 'Refere-se à avaliação do usuário frente ao desempenho do suporte solicitado.'),
('Checagem', 'Refere-se à verificação de forma eficaz e intuitiva se o usuário compreendeu a informação apresentada, visando otimizar a experiência do usuário e garantir a efetividade da comunicação.'),
('Compatibilidade', 'Refere-se à capacidade de diferentes tecnologias e sistemas interagirem de forma eficaz, garantindo que as ferramentas digitais estejam ao alcance de todos, independentemente do dispositivo ou sistema operacional utilizado.'),
('Confiança', 'Refere-se à relação de credibilidade estabelecida entre a instituição pública e o cidadão, sustentada pela transparência nas ações e pela disponibilização de informações precisas e oportunas.'),
('Consistência', 'Refere-se à garantia de que elementos visuais, interações e funcionamento do sistema se mantenham coerentes ao longo de toda a jornada da pessoa usuária.'),
('Conteúdo', 'Refere-se às informações que a pessoa usuária encontra no site ou aplicativo do serviço, desde textos e imagens até dados e funcionalidades.'),
('Design', 'Refere-se à estética visual, incluindo a escolha de cores, fontes, layout e elementos gráficos.'),
('Eficiência', 'Refere-se a realização de tarefas de forma rápida, precisa e de forma a prever e minimizar de erros.'),
('Empatia', 'Refere-se ao tratamento que é dado a cada cidadão de forma individualizada, reconhecendo suas particularidades e necessidades específicas.'),
('Facilidade de entendimento', 'Refere-se à experiência do receptor da mensagem na compreensão do conteúdo. O foco está na pessoa usuária, considerando fatores como conhecimento prévio, linguagem simples e contexto cultural.'),
('Flexibilidade', 'Refere-se à capacidade de um site ou aplicativo se adaptar às diferentes necessidades e preferências das pessoas usuárias.');

-- ============================================
-- DADOS INICIAIS: GLOSSÁRIO
-- ============================================

INSERT INTO glossario (termo, grupo, definicao) VALUES
('BARREIRAS', 'Conceitos gerais', 'São obstáculos que prejudicam as interações entre a pessoa usuário e o serviço público, tornando-o mais difícil, custoso e lento.'),
('COMPORTAMENTO', 'Conceitos gerais', 'Refere-se a qualquer ação do usuário que possa ser mensurada e registrada direta (por exemplo, por meio de observações) ou indiretamente (por gravações de tela, telemetria ou outra ferramenta de registro de dados). Além disso, é importante que o comportamento, para ser inserido como um passo na jornada do usuário, tenha como consequência uma mudança significativa na situação do usuário dentro do processo.'),
('IMPACTO', 'Conceitos gerais', 'Refere-se as consequências que as barreiras trazem à pessoa usuária como danos psicológicos, insegurança, desengajamento, perda de tempo e dinheiro e que comprometem a efetividade das políticas públicas, minam a confiança da população nas instituições e provocam a exclusão de grupos vulnerabilizados.'),
('JORNADA INDIVIDUAL', 'Conceitos gerais', 'Trata-se da jornada observada individualmente por cada usuário.'),
('JORNADA PADRÃO', 'Conceitos gerais', 'Trata-se de uma jornada normalizada baseada nas jornadas dos usuários (que normalmente as pessoas fazem).'),
('JORNADA PLANEJADA', 'Conceitos gerais', 'Trata-se da jornada construída a partir do manual do serviço ou a partir das informações disponibilizadas pela equipe do serviço.'),
('METODOLOGIA F5', 'Conceitos gerais', 'Trata-se de um método que tem como objetivo principal reduzir barreiras (sludges) que tornam o acesso dos cidadãos e cidadãs aos serviços públicos digitais no Brasil mais difícil e demorado.'),
('PESSOA USUÁRIA', 'Conceitos gerais', 'Qualquer pessoa que utiliza um sistema digital para acessar serviços públicos.'),
('Carga Cognitiva', 'Critérios de Impacto', 'A carga cognitiva refere-se à quantidade de recursos mentais que a pessoa usuária necessita alocar para ser capaz de desempenhar adequadamente todas as tarefas demandadas no uso da interface digital. Quanto maior a carga cognitiva, maior a chance de abandono do processo ou de erros cometidos pelo usuário.'),
('Emoção', 'Critérios de Impacto', 'A emoção diz respeito ao impacto das características da interface digital nos estados emocionais das pessoas usuárias. Pode ser desencadeada por dificuldades e barreiras enfrentadas durante a jornada da pessoa usuária. A experiência emocional da pessoa, quando negativa, pode comprometer o seu engajamento e prejudica a sua percepção sobre o serviço público.'),
('Consequência', 'Critérios de Impacto', 'O critério consequência refere-se ao impacto das barreiras no processo de interação do usuário com determinado serviço público. Diz respeito à possibilidade de se finalizar a interação com sucesso, à existência de caminhos alternativos à disposição e à quantidade de esforço exigido para que a pessoa usuária siga para a próxima etapa.'),
('Necessidade', 'Critérios de Impacto', 'A necessidade refere-se ao grau de importância atribuido ao objetivo final do processo, especialmente com relação ao seu impacto no cotidiano da pessoa usuária. Quanto maior a necessidade, maior a expectativa de que ele seja rápido, compreensível e eficiente.');

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
    
    RETURN ROUND((v_media_barreiras * v_media_impactos)::numeric, 2);
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGER: Atualizar updated_at em processo
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_processo_updated_at
    BEFORE UPDATE ON processo
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FIM DO SCRIPT
-- ============================================
