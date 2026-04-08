-- ============================================
-- DADOS INICIAIS - F5 MAPEAMENTO ANTI-SLUDGE
-- INSERTs de: grupos_analise, categorias, tipos_comportamento, 
-- criterios_template, glossario
-- ============================================

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