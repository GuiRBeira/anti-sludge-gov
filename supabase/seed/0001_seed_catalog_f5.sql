-- 0001_seed_catalog_f5.sql
-- Seed do catálogo F5 derivado direto da planilha
-- F5 - Mapeamento Anti-Sludge_02.04 (1).xlsx
-- Idempotente: pode rodar várias vezes.

-- ============================================================
-- categoria
-- ============================================================
insert into public.categoria (codigo, nome, conceito, descricao, ordem) values
  ('BUSCA_E_ACESSO', 'Busca e Acesso', 'Envolve o conjunto de comportamentos que a pessoa usuária realiza para localizar, acessar e verificar informações.', 'Envolve o conjunto de comportamentos que a pessoa usuária realiza para localizar, acessar e verificar informações. 
ex: - inserir palavras-chave para encontrar informações específicas; 
       - navegar pelos menus principais e secundários do site ou aplicativo; 
       - ler e verificar informações apresentadas; 
       - realizar login.', 1)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

insert into public.categoria (codigo, nome, conceito, descricao, ordem) values
  ('PREPARACAO_E_ENTREGA', 'Preparação e Entrega', 'Envolve o conjunto de comportamentos necessários para elaborar, preencher, encaminhar informações e manifestar concordância.', 'Envolve o conjunto de comportamentos necessários para elaborar, preencher, encaminhar informações e manifestar concordância.
ex: - preencher informações de cadastro; 
       - solicitar agendamento;  
       - anexar certificados de cursos realizados; 
       - assinar documento;
       - confirmar leitura ou recebimento de mensagem; 
       - enviar documentos para a chefia imediata.', 2)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

insert into public.categoria (codigo, nome, conceito, descricao, ordem) values
  ('INTERACAO', 'Interação', 'Envolve os comportamentos de interação, simultâneos ou não, para  tirar dúvidas, enviar sugestões ou reclamações.', 'Envolve os comportamentos de interação, simultâneos ou não, para  tirar dúvidas, enviar sugestões ou reclamações.
ex: - entrar em contato com o suporte para tirar dúvida; 
      - entrar em contato com a Ouvidoria para registrar uma reclamação.', 3)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

insert into public.categoria (codigo, nome, conceito, descricao, ordem) values
  ('ESCOLHA', 'Escolha', 'Envolve os comportamentos relacionados à análise e seleção de alternativas que sejam relevantes para a continuidade do processo. Pequenas escolhas, que tenham pouco ou nenhum impacto no andamento do processo, não precisam ser registradas.', 'Envolve os comportamentos relacionados à análise e seleção de alternativas que sejam relevantes para a continuidade do processo. Pequenas escolhas, que tenham pouco ou nenhum impacto no andamento do processo, não precisam ser registradas.
ex: - escolher entre as opções de pagamento disponíveis (boleto, débito, PIX); 
      - indicar o tipo de declaração do imposto de renda (simplificada ou completa).', 4)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

insert into public.categoria (codigo, nome, conceito, descricao, ordem) values
  ('ESPERA', 'Espera', 'Envolve o comportamento de aguardar uma ação externa.', 'Envolve o comportamento de aguardar uma ação externa.
ex: - aguardar a resposta de um e-mail;
      - aguardar seu atendimento em fila de espera virtual.', 5)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

insert into public.categoria (codigo, nome, conceito, descricao, ordem) values
  ('OUTROS', 'Outros', 'Envolve comportamentos relevantes que não estão presentes nas opções pré-definidas ou são específicos do processo que está sendo mapeado.', 'Envolve comportamentos relevantes que não estão presentes nas opções pré-definidas ou são específicos do processo que está sendo mapeado.
ex: - comprovar requisito específico do processo; 
      - entrar em contato com agente externo ao serviço para tirar dúvidas (como familiar ou colega de trabalho).', 6)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

-- ============================================================
-- tipo_comportamento
-- ============================================================
insert into public.tipo_comportamento (categoria_id, codigo, nome, conceito, descricao, ordem) values
  ((select id from public.categoria where codigo='BUSCA_E_ACESSO'), 'BUSCA_E_ACESSO__PROCURAR_SITE_OU_APLICATIVO', 'Procurar site ou aplicativo', 'É o comportamento da pessoa usuária relacionado a identificar e buscar a plataforma digital mais adequada para se conectar com o serviço.', 'É o comportamento da pessoa usuária relacionado a identificar e buscar a plataforma digital mais adequada para se conectar com o serviço. 
ex: localizar o site do INSS.', 1)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

insert into public.tipo_comportamento (categoria_id, codigo, nome, conceito, descricao, ordem) values
  ((select id from public.categoria where codigo='BUSCA_E_ACESSO'), 'BUSCA_E_ACESSO__ACESSAR_SERVICO', 'Acessar serviço', 'É o comportamento da pessoa usuária que envolve estabelecer uma conexão com site ou aplicativo do serviço.', 'É o comportamento da pessoa usuária que envolve estabelecer uma conexão com site ou aplicativo do serviço. 
ex: entrar na página do INSS.', 2)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

insert into public.tipo_comportamento (categoria_id, codigo, nome, conceito, descricao, ordem) values
  ((select id from public.categoria where codigo='BUSCA_E_ACESSO'), 'BUSCA_E_ACESSO__VERIFICAR_ELEGIBILIDADE', 'Verificar elegibilidade', 'É o comportamento de buscar identificar se um indivíduo ou instituição cumpre os requisitos necessários para utilizar um serviço ou acessar um benefício.', 'É o comportamento de buscar identificar se um indivíduo ou instituição cumpre os requisitos necessários para utilizar um serviço ou acessar um benefício.
ex: checar requisitos para solicitar desconto da taxa de inscrição de um concurso público.', 3)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

insert into public.tipo_comportamento (categoria_id, codigo, nome, conceito, descricao, ordem) values
  ((select id from public.categoria where codigo='BUSCA_E_ACESSO'), 'BUSCA_E_ACESSO__REALIZAR_LOGIN', 'Realizar login', 'É o comportamento da pessoa usuária de autenticar-se em uma plataforma digital para ter acesso a funcionalidades e recursos restritos.', 'É o comportamento da pessoa usuária de autenticar-se em uma plataforma digital para ter acesso a funcionalidades e recursos restritos. 
ex: - realizar reconhecimento facial ou digital;
       - utilizar autenticação social (via redes sociais).', 4)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

insert into public.tipo_comportamento (categoria_id, codigo, nome, conceito, descricao, ordem) values
  ((select id from public.categoria where codigo='BUSCA_E_ACESSO'), 'BUSCA_E_ACESSO__NAVEGAR', 'Navegar', 'É o comportamento da pessoa usuária de interagir com as diferentes telas e recursos disponíveis na plataforma digital do orgão ou serviço.', 'É o comportamento da pessoa usuária de interagir com as diferentes telas e recursos disponíveis na plataforma digital do orgão ou serviço. 
ex: clicar em links internos para navegar entre as diferentes páginas de um site.', 5)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

insert into public.tipo_comportamento (categoria_id, codigo, nome, conceito, descricao, ordem) values
  ((select id from public.categoria where codigo='BUSCA_E_ACESSO'), 'BUSCA_E_ACESSO__ACESSAR_CONTEUDO', 'Acessar conteúdo', 'É o comportamento da pessoa usuária de interagir com informações apresentadas na plataforma digital, envolvendo atenção e compreensão do texto ou imagens, inclusive por meio de tecnologias acessíveis.', 'É o comportamento da pessoa usuária de interagir com informações apresentadas na plataforma digital, envolvendo atenção e compreensão do texto ou imagens, inclusive por meio de tecnologias acessíveis.
ex: fazer leitura de informações sobre renovação de documentos.', 6)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

insert into public.tipo_comportamento (categoria_id, codigo, nome, conceito, descricao, ordem) values
  ((select id from public.categoria where codigo='PREPARACAO_E_ENTREGA'), 'PREPARACAO_E_ENTREGA__PREENCHER', 'Preencher', 'É o comportamento da pessoa usuária de inserir dados específicos, em campos pré-determinados, com o objetivo de registrar ou comunicar informações relevantes para solicitar o serviço fim.', 'É o comportamento da pessoa usuária de inserir dados específicos, em campos pré-determinados, com o objetivo de registrar ou comunicar informações relevantes para solicitar o serviço fim.
ex: preencher um formulário para informar as atividades profissionais realizadas em determinado mês.', 1)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

insert into public.tipo_comportamento (categoria_id, codigo, nome, conceito, descricao, ordem) values
  ((select id from public.categoria where codigo='PREPARACAO_E_ENTREGA'), 'PREPARACAO_E_ENTREGA__ORGANIZAR_E_ANEXAR', 'Organizar e anexar', 'É o comportamento da pessoa usuária de coletar, organizar e transferir para o site ou aplicativo informações e arquivos digitais para um determinado fim.', 'É o comportamento da pessoa usuária de coletar, organizar e transferir para o site ou aplicativo informações e arquivos digitais para um determinado fim. 
ex: reunir todos os documentos necessários para comprovar o desenvolvimento de um projeto (planilhas, cronogramas, relatórios).', 2)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

insert into public.tipo_comportamento (categoria_id, codigo, nome, conceito, descricao, ordem) values
  ((select id from public.categoria where codigo='PREPARACAO_E_ENTREGA'), 'PREPARACAO_E_ENTREGA__ENVIAR', 'Enviar', 'É o comportamento da pessoa usuária de transmitir os dados inseridos no formulário para o serviço.', 'É o comportamento da pessoa usuária de transmitir os dados inseridos no formulário para o serviço.
ex: enviar informações para solicitação de passaporte.', 3)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

insert into public.tipo_comportamento (categoria_id, codigo, nome, conceito, descricao, ordem) values
  ((select id from public.categoria where codigo='PREPARACAO_E_ENTREGA'), 'PREPARACAO_E_ENTREGA__CONSENTIR', 'Consentir', 'É o comportamento da pessoa usuária de manifestar concordância formal ou assinar os termos necessários para o serviço.', 'É o comportamento da pessoa usuária de manifestar concordância formal ou assinar os termos necessários para o serviço. 
ex: assinar os termos para confirmar leitura e compreensão das condições de um contrato específico.', 4)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

insert into public.tipo_comportamento (categoria_id, codigo, nome, conceito, descricao, ordem) values
  ((select id from public.categoria where codigo='INTERACAO'), 'INTERACAO__INTERAGIR_SINCRONAMENTE', 'Interagir sincronamente', 'É o comportamento da pessoa usuária de comunicar-se instantaneamente com o suporte do serviço.', 'É o comportamento da pessoa usuária de comunicar-se instantaneamente com o suporte do serviço. 
ex: iniciar uma conversa com atendente por meio de uma janela de chat integrada ao site do serviço.', 1)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

insert into public.tipo_comportamento (categoria_id, codigo, nome, conceito, descricao, ordem) values
  ((select id from public.categoria where codigo='INTERACAO'), 'INTERACAO__INTERAGIR_ASSINCRONAMENTE', 'Interagir assincronamente', 'É o comportamento da pessoa usuária de comunicar-se com o suporte do serviço de maneira não instantânea, com respostas em tempos distintos.', 'É o comportamento da pessoa usuária de comunicar-se com o suporte do serviço de maneira não instantânea, com respostas em tempos distintos.
ex: enviar um e-mail para o suporte do serviço, expondo determinada questão.', 2)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

insert into public.tipo_comportamento (categoria_id, codigo, nome, conceito, descricao, ordem) values
  ((select id from public.categoria where codigo='ESCOLHA'), 'ESCOLHA__SELECIONAR_ENTRE_ALTERNATIVAS', 'Selecionar entre alternativas', 'É o comportamento da pessoa usuária de escolher entre diferentes opções ou atributos de um serviço, a fim de personalizar a experiência do usuário ou atender a necessidades específicas.', 'É o comportamento da pessoa usuária de escolher entre diferentes opções ou atributos de um serviço, a fim de personalizar a experiência do usuário ou atender a necessidades específicas. 
ex: escolher entre as opções disponíveis para entrar em contato com o suporte ao enfrentar dificuldades de acesso.', 1)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

insert into public.tipo_comportamento (categoria_id, codigo, nome, conceito, descricao, ordem) values
  ((select id from public.categoria where codigo='ESPERA'), 'ESPERA__ESPERA_PASSIVA', 'Espera passiva', 'É o comportamento da pessoa usuária de aguardar a resposta.', 'É o comportamento da pessoa usuária de aguardar a resposta.
ex: aguardar a resposta de um e-mail.', 1)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

insert into public.tipo_comportamento (categoria_id, codigo, nome, conceito, descricao, ordem) values
  ((select id from public.categoria where codigo='ESPERA'), 'ESPERA__ESPERA_ATIVA', 'Espera ativa', 'É o comportamento da pessoa usuária de aguardar sua vez de ser atendido em um sistema que o posiciona em uma fila virtual.', 'É o comportamento da pessoa usuária de aguardar sua vez de ser atendido em um sistema que o posiciona em uma fila virtual.
ex: aguardar sua vez de ser atendido(a) em chat online.', 2)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

insert into public.tipo_comportamento (categoria_id, codigo, nome, conceito, descricao, ordem) values
  ((select id from public.categoria where codigo='OUTROS'), 'OUTROS__COMPORTAMENTO_NOVO', 'Comportamento novo', 'Refere-se a um comportamento exclusivo ou atípico de determinado processo.', 'Refere-se a um comportamento exclusivo ou atípico de determinado processo. 
ex: - cumprir algum requisito ou ação pouco usual em outros processos; 
      - entrar em contato com agente externo ao serviço para tirar dúvidas (como familiar ou colega de trabalho).', 1)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, descricao=excluded.descricao, ordem=excluded.ordem;

-- ============================================================
-- criterio_template (barreiras)
-- ============================================================
insert into public.criterio_template (codigo, nome, dimensao, subdimensao_impacto, conceito, pergunta_padrao, texto_nota_1, texto_nota_5, ordem) values
  ('B__ACESSIBILIDADE_DAS_INFORMACOES', 'Acessibilidade das informações', 'barreira', NULL, 'Informações importantes devem ser fáceis de encontrar e compreender.', 'É fácil encontrar o link para o processo ou serviço?', 'O link é extremamente fácil de encontrar.', 'O link é extremamente difícil de encontrar, mesmo com uma busca exaustiva.', 1)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, pergunta_padrao=excluded.pergunta_padrao, texto_nota_1=excluded.texto_nota_1, texto_nota_5=excluded.texto_nota_5, ordem=excluded.ordem;

insert into public.criterio_template (codigo, nome, dimensao, subdimensao_impacto, conceito, pergunta_padrao, texto_nota_1, texto_nota_5, ordem) values
  ('B__AUTONOMIA', 'Autonomia', 'barreira', NULL, 'Refere-se à apresentação de interfaces que ''fazem sentido'' para a pessoa usuária, proporcionando uma experiência mais fluida e satisfatória.', 'A pessoa usuária consegue acessar o serviço de maneira independente?', 'A pessoa usuária consegue localizar o serviço de forma totalmente independente, sem qualquer dificuldade', 'A pessoa usuária não consegue localizar o serviço de forma alguma, necessitando de ajuda do suporte do serviço ou de terceiros.', 2)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, pergunta_padrao=excluded.pergunta_padrao, texto_nota_1=excluded.texto_nota_1, texto_nota_5=excluded.texto_nota_5, ordem=excluded.ordem;

insert into public.criterio_template (codigo, nome, dimensao, subdimensao_impacto, conceito, pergunta_padrao, texto_nota_1, texto_nota_5, ordem) values
  ('B__CONTEUDO', 'Conteúdo', 'barreira', NULL, 'Refere-se às informações que a pessoa usuária encontra no site ou aplicativo do serviço, desde textos e imagens até dados e funcionalidades. Um bom conteúdo é relevante, preciso, atualizado e organizado de forma lógica, facilitando a busca e a compreensão das informações.', 'Há informações claras e suficientes no site ou no aplicativo para a pessoa usuária tomar uma decisão informada e/ou saber o que fazer a seguir?', 'As informações são abundantes, relevantes, bem organizadas e fáceis de encontrar. A pessoa usuária se sente segura e confiante para tomar uma decisão.', 'Não há informações relevantes ou elas são incompletas, imprecisas e confusas, impossibilitando qualquer decisão posterior.', 3)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, pergunta_padrao=excluded.pergunta_padrao, texto_nota_1=excluded.texto_nota_1, texto_nota_5=excluded.texto_nota_5, ordem=excluded.ordem;

insert into public.criterio_template (codigo, nome, dimensao, subdimensao_impacto, conceito, pergunta_padrao, texto_nota_1, texto_nota_5, ordem) values
  ('B__COMPATIBILIDADE', 'Compatibilidade', 'barreira', NULL, 'Refere-se à capacidade de diferentes tecnologias e sistemas interagirem de forma eficaz, garantindo que as ferramentas digitais estejam ao alcance de todos, independentemente do dispositivo ou sistema operacional utilizado.', 'O acesso ao serviço depende que a pessoa usuária disponha de recursos tecnológicos muito específicos?', 'Qualquer pessoa usuária, com recursos tecnológicos básicos, podem acessar o serviço.', 'Somente pessoas usuárias com recursos tecnológicos específicos conseguem acessá-lo.', 4)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, pergunta_padrao=excluded.pergunta_padrao, texto_nota_1=excluded.texto_nota_1, texto_nota_5=excluded.texto_nota_5, ordem=excluded.ordem;

insert into public.criterio_template (codigo, nome, dimensao, subdimensao_impacto, conceito, pergunta_padrao, texto_nota_1, texto_nota_5, ordem) values
  ('B__APOIO_PROATIVO', 'Apoio proativo', 'barreira', NULL, 'Refere-se a iniciativa de prever e solucionar problemas antes mesmo que os usuários os identifiquem.', 'Recursos automáticos são disponibilizados para a pessoa usuária verificar ou tirar dúvida sobre sua elegibilidade, como chat, perguntas e respostas, etc?', 'Há recursos interativos e instantâneos, como verificador de elegibilidade online, chatbots inteligentes e assistentes virtuais que ajudam a pessoa usuária a verificar sua elegibilidade de forma transparente.', 'Não há nenhum nenhum recurso interativo e instantâneo disponível para a pessoa usuária verificar ou tirar dúvida sobre sua elegibilidade.', 5)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, pergunta_padrao=excluded.pergunta_padrao, texto_nota_1=excluded.texto_nota_1, texto_nota_5=excluded.texto_nota_5, ordem=excluded.ordem;

insert into public.criterio_template (codigo, nome, dimensao, subdimensao_impacto, conceito, pergunta_padrao, texto_nota_1, texto_nota_5, ordem) values
  ('B__EFICIENCIA', 'Eficiência', 'barreira', NULL, 'Refere-se a realização de tarefas de forma rápida, precisa e de forma a prever e minimizar de erros.', 'É fácil redefinir senhas esquecidas?', 'O processo para redefinir a senha é muito fácil (ex. digitar o endereço de e-mail ou nome e receber link para configurar nova senha). É muito raro alguma pessoa usuária entrar em contato com a equipe para obter suporte na redefinição de senha.', 'O processo para redefinir a senha é difícil e leva muito tempo devido a requisitos confusos, erros ou demora. A maioria das pessoas usuárias entra em contato com a equipe para obter suporte na redefinição de senha.', 6)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, pergunta_padrao=excluded.pergunta_padrao, texto_nota_1=excluded.texto_nota_1, texto_nota_5=excluded.texto_nota_5, ordem=excluded.ordem;

insert into public.criterio_template (codigo, nome, dimensao, subdimensao_impacto, conceito, pergunta_padrao, texto_nota_1, texto_nota_5, ordem) values
  ('B__DESIGN', 'Design', 'barreira', NULL, 'Refere-se à estética visual, incluindo a escolha de cores, fontes, layout e elementos gráficos.', 'Há recursos visuais (ícones, negritos, etc) para ajudar a pessoa usuária a identificar e entender informações-chave?', 'A coloração e o negrito das palavras facilitam a identificação e compreensão rápida das informações chave.
Ícones/imagens claros e envolventes são usados para ajudar a pessoa usuária a encontrar e entender informações-chave rapidamente (ex. ícones relevantes combinados com texto ou estatísticas, um processo visualizado como um infográfico passo-a-passo).', 'Não há uso de coloração nem negrito, dificultando a identificação das informações chave pela pessoa usuária.
Não há ícones ou imagens no texto, tornando-o pouco envolvente e difícil para a pessoa usuária encontrar e entender rapidamente informações-chave.', 7)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, pergunta_padrao=excluded.pergunta_padrao, texto_nota_1=excluded.texto_nota_1, texto_nota_5=excluded.texto_nota_5, ordem=excluded.ordem;

insert into public.criterio_template (codigo, nome, dimensao, subdimensao_impacto, conceito, pergunta_padrao, texto_nota_1, texto_nota_5, ordem) values
  ('B__CONFIANCA', 'Confiança', 'barreira', NULL, 'Refere-se à relação de credibilidade estabelecida entre a instituição pública e o cidadão, sustentada pela transparência nas ações e pela disponibilização de informações precisas e oportunas. É o sentimento de que a outra parte agirá de forma justa, honesta e confiável.', 'A fonte da informação é reconhecida?', 'O conteúdo é assinado por mensageiro(a) muito confiável e facilmente reconhecível, ou em nome dele/dela.', 'O conteúdo é assinado por mensageiro(a), ou em nome dele(a), que provavelmente terá um impacto negativo na pessoa usuária, fazendo -a se sentir ansiosa ou insegura.', 8)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, pergunta_padrao=excluded.pergunta_padrao, texto_nota_1=excluded.texto_nota_1, texto_nota_5=excluded.texto_nota_5, ordem=excluded.ordem;

insert into public.criterio_template (codigo, nome, dimensao, subdimensao_impacto, conceito, pergunta_padrao, texto_nota_1, texto_nota_5, ordem) values
  ('B__FACILIDADE_DE_ENTENDIMENTO', 'Facilidade de entendimento', 'barreira', NULL, 'Refere-se à experiência do receptor da mensagem na compreensão do conteúdo. O foco está na pessoa usuária, considerando fatores como conhecimento prévio, linguagem simples e contexto cultural.', 'O conteúdo é fácil de entender?', 'O conteúdo disponível é escrito de forma simples, com voz ativa, linguagem consistente e frases curtas, com uso de pronomes pessoais para envolver e direcionar para a ação. Todos os termos técnicos são explicados claramente, tornando fácil para todos os perfis de pessoas usuárias compreendem as informações rapidamente e sem qualquer dificuldade.', 'O conteúdo é totalmente incompreensível, com linguagem extremamente técnica, jargões complexos, uso de voz passiva, frases longas e estrutura confusa. A pessoa usuária não consegue entender o significado das informações.', 9)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, pergunta_padrao=excluded.pergunta_padrao, texto_nota_1=excluded.texto_nota_1, texto_nota_5=excluded.texto_nota_5, ordem=excluded.ordem;

insert into public.criterio_template (codigo, nome, dimensao, subdimensao_impacto, conceito, pergunta_padrao, texto_nota_1, texto_nota_5, ordem) values
  ('B__EMPATIA', 'Empatia', 'barreira', NULL, 'Refere-se ao tratamento que é dado a cada cidadão de forma individualizada, reconhecendo suas particularidades e necessidades específicas.', 'As consequências desfavoráveis ou inesperadas são comunicadas de forma clara, transparente e empática?', 'As consequências desfavoráveis (ex. rejeições) são explicadas claramente com transparência e empatia, demonstrando grande cuidado com os sentimentos das pessoas envolvidas.', 'As consequências são pouco claras e entregues sem explicação nem empatia.', 10)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, pergunta_padrao=excluded.pergunta_padrao, texto_nota_1=excluded.texto_nota_1, texto_nota_5=excluded.texto_nota_5, ordem=excluded.ordem;

insert into public.criterio_template (codigo, nome, dimensao, subdimensao_impacto, conceito, pergunta_padrao, texto_nota_1, texto_nota_5, ordem) values
  ('B__FLEXIBILIDADE', 'Flexibilidade', 'barreira', NULL, 'Refere-se à capacidade de um site ou aplicativo se adaptar às diferentes necessidades e preferências das pessoas usuárias.', 'A pessoa usuária pode verificar as informações de diferentes maneiras e fornecer arquivos em diferentes formatos?', 'Quando a pessoa usuária precisa fornecer documentos para verificar informações, várias opções são ofertadas para isso e nos formatos de arquivo mais comuns. Todas as opções são listadas claramente.', 'Quando a pessoa usuária precisa fornecer documentos para verificar informações, oferta-se apenas 1 ou até 2 opções, e não é possível apresentar documentos em diferentes formatos de arquivo.', 11)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, pergunta_padrao=excluded.pergunta_padrao, texto_nota_1=excluded.texto_nota_1, texto_nota_5=excluded.texto_nota_5, ordem=excluded.ordem;

insert into public.criterio_template (codigo, nome, dimensao, subdimensao_impacto, conceito, pergunta_padrao, texto_nota_1, texto_nota_5, ordem) values
  ('B__CHECAGEM', 'Checagem', 'barreira', NULL, 'Refere-se à verificação de forma eficaz e intuitiva se o usuário compreendeu a informação apresentada, visando otimizar a experiência do usuário e garantir a efetividade da comunicação.', 'A compreensão da pessoa usuária sobre as informações recebidas é verificada?', 'A pessoa usuária é perguntada sobre o entendimento do conteúdo e tem muitas oportunidades de tirar dúvidas. Para verificar o entendimento e demonstrar escuta ativa, a equipe do serviço repete e reformula claramente os principais pontos.', 'A pessoa usuária não tem oportunidades de esclarecer o entendimento. A equipe do serviço não dedica tempo para verificar o seu entendimento e a interrompe, em vez de ouvi-la ativamente.', 12)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, pergunta_padrao=excluded.pergunta_padrao, texto_nota_1=excluded.texto_nota_1, texto_nota_5=excluded.texto_nota_5, ordem=excluded.ordem;

insert into public.criterio_template (codigo, nome, dimensao, subdimensao_impacto, conceito, pergunta_padrao, texto_nota_1, texto_nota_5, ordem) values
  ('B__AVALIACAO', 'Avaliação', 'barreira', NULL, 'Refere-se à avaliação do usuário frente ao desempenho do suporte solicitado.', 'A pessoa usuária pode avaliar o suporte para tirar dúvidas, enviar sugestões ou reclamações?', 'A pessoa usuária é sempre incentivada a avaliar o suporte.', 'A pessoa usuária nunca é incentivada a avaliar o suporte.', 13)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, pergunta_padrao=excluded.pergunta_padrao, texto_nota_1=excluded.texto_nota_1, texto_nota_5=excluded.texto_nota_5, ordem=excluded.ordem;

insert into public.criterio_template (codigo, nome, dimensao, subdimensao_impacto, conceito, pergunta_padrao, texto_nota_1, texto_nota_5, ordem) values
  ('B__CONSISTENCIA', 'Consistência', 'barreira', NULL, 'Refere-se à garantia de que elementos visuais, interações e funcionamento do sistema se mantenham coerentes ao longo de toda a jornada da pessoa usuária.', 'Procedimentos padronizados são usados para atendimento da pessoa usuária?', 'Procedimentos-padrão estão claramente definidos e são integrados à prática diária de toda a equipe do serviço. A equipe tem um processo sistemático para atualizar regularmente uma base de conhecimento compartilhada (ex. notas sobre problemas comuns e como resolvê-los).', 'Não há procedimentos-padrão em vigor. Não há processo em vigor para a equipe atualizar a sua própria base de conhecimento pessoal, nem uma base de conhecimento compartilhada (ex. notas sobre problemas comuns e como resolvê-los).', 14)
on conflict (codigo) do update set nome=excluded.nome, conceito=excluded.conceito, pergunta_padrao=excluded.pergunta_padrao, texto_nota_1=excluded.texto_nota_1, texto_nota_5=excluded.texto_nota_5, ordem=excluded.ordem;

-- ============================================================
-- criterio_template (impactos)
-- ============================================================
insert into public.criterio_template (codigo, nome, dimensao, subdimensao_impacto, conceito, pergunta_padrao, texto_nota_1, texto_nota_5, ordem) values
  ('I__NECESSIDADE', 'Necessidade', 'impacto', 'necessidade', 'A necessidade refere-se ao grau de importância atribuido ao objetivo final do processo, especialmente com relação ao seu impacto no cotidiano da pessoa usuária. 

Quanto maior a necessidade, maior a expectativa de que ele seja rápido, compreensível e eficiente. A percepção de necessidade influencia diretamente a tolerância da pessoa usuária com relação a dificuldades e erros no processo.', 'A pessoa usuária se encontra em situação de alta necessidade pelo resultado desse processo? 

O quão essencial é esse processo para a pessoa?

Não conseguir atingir os objetivos esperados com o processo traz impactos negativos para ele ou ela?', 'O produto/serviço demandado não afeta, de forma significativa, o cotidiano da pessoa usuária. A impossibilidade de concluir sua demanda ainda permitirá que suas necessidades sejam supridas nas principais esferas de sua vida, e a pessoa usuária poderá tentar novamente em outra ocasião caso seja de seu interesse.', 'A não obtenção do produto ou serviço demandado trará consequências significativas para o cotidiano da pessoa usuária, impossibilitando que este atenda a necessidades básicas de sua vida. A sua qualidade de vida certamente será comprometida caso a pessoa usuária não tenha sua demanda atendida.', 1)
on conflict (codigo) do update set nome=excluded.nome, subdimensao_impacto=excluded.subdimensao_impacto, conceito=excluded.conceito, pergunta_padrao=excluded.pergunta_padrao, texto_nota_1=excluded.texto_nota_1, texto_nota_5=excluded.texto_nota_5, ordem=excluded.ordem;

insert into public.criterio_template (codigo, nome, dimensao, subdimensao_impacto, conceito, pergunta_padrao, texto_nota_1, texto_nota_5, ordem) values
  ('I__CARGA_COGNITIVA', 'Carga Cognitiva', 'impacto', 'carga_cognitiva', 'A carga cognitiva refere-se à quantidade de recursos mentais que a pessoa usuária necessita alocar para ser capaz de desempenhar adequadamente todas as tarefas demandadas no uso da interface digital.

Quanto maior a carga cognitiva, maior a chance de abandono do processo ou de erros cometidos pelo usuário. Envolve exigências, por exemplo, de processos de atenção, memória e resolução de problemas. É resultado da clareza, complexidade e desenho da tarefa demandada ao usuário.', 'A interface utilizada para esse comportamento gera para a pessoa usuária uma demanda excessiva do ponto de vista de atenção, memória ou outros processos cognitivos?', 'A pessoa usuária não apresenta dificuldades em compreender o que é necessário nesta etapa do processo. Navega de forma confortável, sem erros aparentes ou relatos de que não sabe o que fazer. Não há relatos da necessidade de informações das quais não se lembra, nem há distratores na interface que dificultem a ação do usuário.', 'A pessoa usuária tem muita dificuldade para continuar esta etapa do processo. Comete repetidos erros na navegação e relata não saber o que fazer (sente-se perdido). A interface exige dos usuários diversas informações das quais não se lembram. Apresenta uma arquitetura confusa e complexa, com frequência tirando sua atenção com relação à ação correta a executar.', 2)
on conflict (codigo) do update set nome=excluded.nome, subdimensao_impacto=excluded.subdimensao_impacto, conceito=excluded.conceito, pergunta_padrao=excluded.pergunta_padrao, texto_nota_1=excluded.texto_nota_1, texto_nota_5=excluded.texto_nota_5, ordem=excluded.ordem;

insert into public.criterio_template (codigo, nome, dimensao, subdimensao_impacto, conceito, pergunta_padrao, texto_nota_1, texto_nota_5, ordem) values
  ('I__EMOCAO', 'Emoção', 'impacto', 'emocao', 'A emoção diz respeito ao impacto das características da interface digital nos estados emocionais das pessoas usuárias. Pode ser desencadeada por dificuldades e barreiras enfrentadas durante a jornada da pessoa usuária. 
A experiência emocional da pessoa, quando negativa, pode comprometer o seu engajamento e prejudica a sua percepção sobre o serviço público.', 'A interface utilizada para esse comportamento gera respostas emocionais negativas na pessoa usuária?', 'Durante a execução dessa etapa, a pessoa usuária não relata estados negativos na utilização da interface digital.  A pessoa usuária parece estar tranquila, demonstra calma e desenvoltura em suas falas e comportamentos. Ao final, indica que está relaxado e relata estados satisfatórios resultantes da interação.', 'O usuário apresenta relatos associados a aumento de estresse, irritação ou tristeza. Ao final desta etapa, o usuário relata insatisfação no processo de interação com o serviço demandando, inclusive indicando desinteresse em continuar em sua tentativa de obter o produto ou serviço pretendido.', 3)
on conflict (codigo) do update set nome=excluded.nome, subdimensao_impacto=excluded.subdimensao_impacto, conceito=excluded.conceito, pergunta_padrao=excluded.pergunta_padrao, texto_nota_1=excluded.texto_nota_1, texto_nota_5=excluded.texto_nota_5, ordem=excluded.ordem;

insert into public.criterio_template (codigo, nome, dimensao, subdimensao_impacto, conceito, pergunta_padrao, texto_nota_1, texto_nota_5, ordem) values
  ('I__CONSEQUENCIA', 'Consequência', 'impacto', 'consequencia', 'O critério consequência refere-se ao impacto das barreiras no processo de interação do usuário com determinado serviço público. Diz respeito à possibilidade de se finalizar a interação com sucesso, à existência de caminhos alternativos à disposição e à quantidade de esforço exigido para que a pessoa usuária siga para a próxima etapa.', 'A existência de barreiras ao realizar este comportamento traz consequências imediatas para a pessoa usuária?', 'As barreiras encontradas nesta etapa trazem impacto mínimo para a chance de sucesso do usuário para a obtenção do serviço ou produto pretendido. O usuário demonstra que necessitou de poucos recursos (temporais, financeiros, etc) e é capaz de prosseguir sem dificuldades para as etapas seguintes da jornada.', 'As barreiras encontradas nesta etapa trazem impacto significativo para a chance de sucesso do usuário, exigindo que ele faça uso demasiado de seus recursos (temporais, financeiros, etc...). Além disso, podem impedir que ele seja capaz de prosseguir no processo.', 4)
on conflict (codigo) do update set nome=excluded.nome, subdimensao_impacto=excluded.subdimensao_impacto, conceito=excluded.conceito, pergunta_padrao=excluded.pergunta_padrao, texto_nota_1=excluded.texto_nota_1, texto_nota_5=excluded.texto_nota_5, ordem=excluded.ordem;

-- ============================================================
-- tipo_criterio (matriz #CritériosPorTipo)
-- ============================================================
delete from public.tipo_criterio;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 1 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='BUSCA_E_ACESSO__PROCURAR_SITE_OU_APLICATIVO' and ct.codigo='B__ACESSIBILIDADE_DAS_INFORMACOES'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 2 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='BUSCA_E_ACESSO__PROCURAR_SITE_OU_APLICATIVO' and ct.codigo='B__AUTONOMIA'
  on conflict do nothing;

insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 1 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='BUSCA_E_ACESSO__ACESSAR_SERVICO' and ct.codigo='B__AUTONOMIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 2 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='BUSCA_E_ACESSO__ACESSAR_SERVICO' and ct.codigo='B__CONTEUDO'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 3 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='BUSCA_E_ACESSO__ACESSAR_SERVICO' and ct.codigo='B__COMPATIBILIDADE'
  on conflict do nothing;

insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 1 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='BUSCA_E_ACESSO__VERIFICAR_ELEGIBILIDADE' and ct.codigo='B__AUTONOMIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 2 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='BUSCA_E_ACESSO__VERIFICAR_ELEGIBILIDADE' and ct.codigo='B__CONTEUDO'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 3 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='BUSCA_E_ACESSO__VERIFICAR_ELEGIBILIDADE' and ct.codigo='B__APOIO_PROATIVO'
  on conflict do nothing;

insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 1 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='BUSCA_E_ACESSO__REALIZAR_LOGIN' and ct.codigo='B__EFICIENCIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 2 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='BUSCA_E_ACESSO__REALIZAR_LOGIN' and ct.codigo='B__CONTEUDO'
  on conflict do nothing;

insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 1 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='BUSCA_E_ACESSO__NAVEGAR' and ct.codigo='B__COMPATIBILIDADE'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 2 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='BUSCA_E_ACESSO__NAVEGAR' and ct.codigo='B__CONTEUDO'
  on conflict do nothing;

insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 1 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='BUSCA_E_ACESSO__ACESSAR_CONTEUDO' and ct.codigo='B__CONTEUDO'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 2 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='BUSCA_E_ACESSO__ACESSAR_CONTEUDO' and ct.codigo='B__CONTEUDO'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 3 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='BUSCA_E_ACESSO__ACESSAR_CONTEUDO' and ct.codigo='B__DESIGN'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 4 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='BUSCA_E_ACESSO__ACESSAR_CONTEUDO' and ct.codigo='B__CONTEUDO'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 5 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='BUSCA_E_ACESSO__ACESSAR_CONTEUDO' and ct.codigo='B__CONFIANCA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 6 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='BUSCA_E_ACESSO__ACESSAR_CONTEUDO' and ct.codigo='B__FACILIDADE_DE_ENTENDIMENTO'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 7 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='BUSCA_E_ACESSO__ACESSAR_CONTEUDO' and ct.codigo='B__EMPATIA'
  on conflict do nothing;

insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 1 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__PREENCHER' and ct.codigo='B__DESIGN'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 2 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__PREENCHER' and ct.codigo='B__AUTONOMIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 3 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__PREENCHER' and ct.codigo='B__EFICIENCIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 4 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__PREENCHER' and ct.codigo='B__CONFIANCA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 5 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__PREENCHER' and ct.codigo='B__AUTONOMIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 6 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__PREENCHER' and ct.codigo='B__CONTEUDO'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 7 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__PREENCHER' and ct.codigo='B__AUTONOMIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 8 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__PREENCHER' and ct.codigo='B__AUTONOMIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 9 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__PREENCHER' and ct.codigo='B__EFICIENCIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 10 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__PREENCHER' and ct.codigo='B__DESIGN'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 11 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__PREENCHER' and ct.codigo='B__APOIO_PROATIVO'
  on conflict do nothing;

insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 1 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__ORGANIZAR_E_ANEXAR' and ct.codigo='B__APOIO_PROATIVO'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 2 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__ORGANIZAR_E_ANEXAR' and ct.codigo='B__FLEXIBILIDADE'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 3 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__ORGANIZAR_E_ANEXAR' and ct.codigo='B__CONTEUDO'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 4 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__ORGANIZAR_E_ANEXAR' and ct.codigo='B__CONFIANCA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 5 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__ORGANIZAR_E_ANEXAR' and ct.codigo='B__EFICIENCIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 6 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__ORGANIZAR_E_ANEXAR' and ct.codigo='B__EFICIENCIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 7 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__ORGANIZAR_E_ANEXAR' and ct.codigo='B__EFICIENCIA'
  on conflict do nothing;

insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 1 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__ENVIAR' and ct.codigo='B__CONFIANCA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 2 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__ENVIAR' and ct.codigo='B__EFICIENCIA'
  on conflict do nothing;

insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 1 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__CONSENTIR' and ct.codigo='B__CONFIANCA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 2 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__CONSENTIR' and ct.codigo='B__DESIGN'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 3 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='PREPARACAO_E_ENTREGA__CONSENTIR' and ct.codigo='B__FACILIDADE_DE_ENTENDIMENTO'
  on conflict do nothing;

insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 1 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_SINCRONAMENTE' and ct.codigo='B__CONTEUDO'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 2 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_SINCRONAMENTE' and ct.codigo='B__CHECAGEM'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 3 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_SINCRONAMENTE' and ct.codigo='B__EFICIENCIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 4 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_SINCRONAMENTE' and ct.codigo='B__EFICIENCIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 5 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_SINCRONAMENTE' and ct.codigo='B__EMPATIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 6 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_SINCRONAMENTE' and ct.codigo='B__COMPATIBILIDADE'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 7 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_SINCRONAMENTE' and ct.codigo='B__AVALIACAO'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 8 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_SINCRONAMENTE' and ct.codigo='B__FLEXIBILIDADE'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 9 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_SINCRONAMENTE' and ct.codigo='B__CONSISTENCIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 10 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_SINCRONAMENTE' and ct.codigo='B__CONFIANCA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 11 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_SINCRONAMENTE' and ct.codigo='B__CONFIANCA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 12 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_SINCRONAMENTE' and ct.codigo='B__CONFIANCA'
  on conflict do nothing;

insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 1 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_ASSINCRONAMENTE' and ct.codigo='B__CONTEUDO'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 2 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_ASSINCRONAMENTE' and ct.codigo='B__CHECAGEM'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 3 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_ASSINCRONAMENTE' and ct.codigo='B__EFICIENCIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 4 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_ASSINCRONAMENTE' and ct.codigo='B__EFICIENCIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 5 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_ASSINCRONAMENTE' and ct.codigo='B__EMPATIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 6 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_ASSINCRONAMENTE' and ct.codigo='B__COMPATIBILIDADE'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 7 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_ASSINCRONAMENTE' and ct.codigo='B__AVALIACAO'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 8 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_ASSINCRONAMENTE' and ct.codigo='B__FLEXIBILIDADE'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 9 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_ASSINCRONAMENTE' and ct.codigo='B__CONSISTENCIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 10 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_ASSINCRONAMENTE' and ct.codigo='B__CONFIANCA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 11 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_ASSINCRONAMENTE' and ct.codigo='B__CONFIANCA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 12 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_ASSINCRONAMENTE' and ct.codigo='B__CONFIANCA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 13 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_ASSINCRONAMENTE' and ct.codigo='B__DESIGN'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 14 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_ASSINCRONAMENTE' and ct.codigo='B__EFICIENCIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 15 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_ASSINCRONAMENTE' and ct.codigo='B__FACILIDADE_DE_ENTENDIMENTO'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 16 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_ASSINCRONAMENTE' and ct.codigo='B__CONTEUDO'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 17 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_ASSINCRONAMENTE' and ct.codigo='B__AUTONOMIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 18 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_ASSINCRONAMENTE' and ct.codigo='B__AUTONOMIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 19 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_ASSINCRONAMENTE' and ct.codigo='B__EFICIENCIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 20 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='INTERACAO__INTERAGIR_ASSINCRONAMENTE' and ct.codigo='B__DESIGN'
  on conflict do nothing;

insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 1 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='ESCOLHA__SELECIONAR_ENTRE_ALTERNATIVAS' and ct.codigo='B__CONTEUDO'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 2 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='ESCOLHA__SELECIONAR_ENTRE_ALTERNATIVAS' and ct.codigo='B__EFICIENCIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 3 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='ESCOLHA__SELECIONAR_ENTRE_ALTERNATIVAS' and ct.codigo='B__FLEXIBILIDADE'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 4 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='ESCOLHA__SELECIONAR_ENTRE_ALTERNATIVAS' and ct.codigo='B__FACILIDADE_DE_ENTENDIMENTO'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 5 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='ESCOLHA__SELECIONAR_ENTRE_ALTERNATIVAS' and ct.codigo='B__CONFIANCA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 6 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='ESCOLHA__SELECIONAR_ENTRE_ALTERNATIVAS' and ct.codigo='B__APOIO_PROATIVO'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 7 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='ESCOLHA__SELECIONAR_ENTRE_ALTERNATIVAS' and ct.codigo='B__DESIGN'
  on conflict do nothing;

insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 1 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='ESPERA__ESPERA_PASSIVA' and ct.codigo='B__CONFIANCA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 2 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='ESPERA__ESPERA_PASSIVA' and ct.codigo='B__CONFIANCA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 3 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='ESPERA__ESPERA_PASSIVA' and ct.codigo='B__CONFIANCA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 4 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='ESPERA__ESPERA_PASSIVA' and ct.codigo='B__APOIO_PROATIVO'
  on conflict do nothing;

insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 1 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='ESPERA__ESPERA_ATIVA' and ct.codigo='B__CONTEUDO'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 2 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='ESPERA__ESPERA_ATIVA' and ct.codigo='B__CONFIANCA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 3 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='ESPERA__ESPERA_ATIVA' and ct.codigo='B__CONFIANCA'
  on conflict do nothing;

insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 1 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='OUTROS__COMPORTAMENTO_NOVO' and ct.codigo='B__EFICIENCIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 2 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='OUTROS__COMPORTAMENTO_NOVO' and ct.codigo='B__CONTEUDO'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 3 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='OUTROS__COMPORTAMENTO_NOVO' and ct.codigo='B__CONFIANCA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 4 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='OUTROS__COMPORTAMENTO_NOVO' and ct.codigo='B__EFICIENCIA'
  on conflict do nothing;
insert into public.tipo_criterio (tipo_comportamento_id, criterio_template_id, ordem)
  select tc.id, ct.id, 5 from public.tipo_comportamento tc, public.criterio_template ct
  where tc.codigo='OUTROS__COMPORTAMENTO_NOVO' and ct.codigo='B__CONFIANCA'
  on conflict do nothing;

-- ============================================================
-- glossario
-- ============================================================
insert into public.glossario (termo, definicao, aba_origem) values ('Acessar serviço', 'É o comportamento da pessoa usuária que envolve estabelecer uma conexão com site ou aplicativo do serviço.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Acessibilidade das informações', 'Informações importantes devem ser fáceis de encontrar e compreender.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Apoio proativo', 'Refere-se a iniciativa de prever e solucionar problemas antes mesmo que os usuários os identifiquem.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Autonomia', 'Refere-se à apresentação de interfaces que ''fazem sentido'' para a pessoa usuária, proporcionando uma experiência mais fluida e satisfatória.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Avaliação', 'Refere-se à avaliação do usuário frente ao desempenho do suporte solicitado.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Busca e acesso', 'Envolve o conjunto de comportamentos que a pessoa usuária realiza para localizar, acessar e verificar informações.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Categoria', 'Envolvem um conjunto de comportamentos com características comuns.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Checagem', 'Refere-se à verificação de forma eficaz e intuitiva se o usuário compreendeu a informação apresentada, visando otimizar a experiência do usuário e garantir a efetividade da comunicação.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Compatibilidade', 'Refere-se à capacidade de diferentes tecnologias e sistemas interagirem de forma eficaz, garantindo que as ferramentas digitais estejam ao alcance de todos, independentemente do dispositivo ou sistema operacional utilizado.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Comportamento', 'Refere-se a qualquer ação do usuário que possa ser mensurada e registrada direta (por exemplo, por meio de observações) ou indiretamente (por gravações de tela, telemetria ou outra ferramenta de registro de dados). Além disso, é importante que o comportamento, para ser inserido como um passo na jornada do usuário, tenha como consequência uma mudança significativa na situação do usuário dentro do processo.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Comportamento novo', 'Refere-se a um comportamento exclusivo ou atípico de determinado processo.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Confiança', 'Refere-se à relação de credibilidade estabelecida entre a instituição pública e o cidadão, sustentada pela transparência nas ações e pela disponibilização de informações precisas e oportunas. É o sentimento de que a outra parte agirá de forma justa, honesta e confiável.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Consentir', 'É o comportamento da pessoa usuária de manifestar concordância formal ou assinar os termos necessários para o serviço.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Consistência', 'Refere-se à garantia de que elementos visuais, interações e funcionamento do sistema se mantenham coerentes ao longo de toda a jornada da pessoa usuária.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Conteúdo', 'Refere-se às informações que a pessoa usuária encontra no site ou aplicativo do serviço, desde textos e imagens até dados e funcionalidades. Um bom conteúdo é relevante, preciso, atualizado e organizado de forma lógica, facilitando a busca e a compreensão das informações.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Critérios', 'Consistem nas características particulares que se busca avaliar em um determinado comportamento.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Design', 'Refere-se à estética visual, incluindo a escolha de cores, fontes, layout e elementos gráficos.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Eficiência', 'Refere-se a realização de tarefas de forma rápida, precisa e de forma a prever e minimizar de erros.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Empatia', 'Refere-se ao tratamento que é dado a cada cidadão de forma individualizada, reconhecendo suas particularidades e necessidades específicas.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Enviar', 'É o comportamento da pessoa usuária de transmitir os dados inseridos no formulário para o serviço.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Escolha', 'Envolve os comportamentos relacionados à análise e seleção de alternativas que sejam relevantes para a continuidade do processo. Pequenas escolhas, que tenham pouco ou nenhum impacto no andamento do processo, não precisam ser registradas.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Espera ativa', 'É o comportamento da pessoa usuária de aguardar sua vez de ser atendido em um sistema que o posiciona em uma fila virtual.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Espera passiva', 'É o comportamento da pessoa usuária de aguardar a resposta.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Espera', 'Envolve o comportamento de aguardar uma ação externa.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Facilidade de entendimento', 'Refere-se à experiência do receptor da mensagem na compreensão do conteúdo. O foco está na pessoa usuária, considerando fatores como conhecimento prévio, linguagem simples e contexto cultural.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Flexibilidade', 'Refere-se à capacidade de um site ou aplicativo se adaptar às diferentes necessidades e preferências das pessoas usuárias.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Impacto', 'Refere-se as consequências que as barreiras trazem à pessoa usuária como danos psicológicos, insegurança, desengajamento, perda de tempo e dinheiro e que comprometem a efetividade das políticas públicas, minam a confiança da população nas instituições e provocam a exclusão de grupos vulnerabilizados.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Interação', 'Envolve os comportamentos de interação, simultâneos ou não, para tirar dúvidas, enviar sugestões ou reclamações.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Interagir assincronamente', 'É o comportamento da pessoa usuária de comunicar-se com o suporte do serviço de maneira não instantânea, com respostas em tempos distintos.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Interagir sincronamente', 'É o comportamento da pessoa usuária de comunicar-se instantaneamente com o suporte do serviço.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Jornada individual', 'Trata-se da jornada observada individualmente por cada usuário.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Jornada padrão', 'Trata-se de uma jornada “normalizada” baseada nas jornadas dos usuários (que normalmente as pessoas fazem).', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Jornada planejada', 'Trata-se da jornada construída a partir do manual do serviço ou a partir das informações disponibilizadas pela equipe do serviço.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Metodologia F5', 'Trata-se de um método que tem como objetivo principal reduzir barreiras (sludges) que tornam o acesso dos cidadãos e cidadãs aos serviços públicos digitais no Brasil mais difícil e demorado.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Navegar', 'É o comportamento da pessoa usuária de interagir com as diferentes telas e recursos disponíveis na plataforma digital do orgão ou serviço.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Organizar e anexar', 'É o comportamento da pessoa usuária de coletar, organizar e transferir para o site ou aplicativo informações e arquivos digitais para um determinado fim.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Outros comportamentos', 'Envolve comportamentos relevantes que não estão presentes nas opções pré-definidas ou são específicas do processo que está sendo mapeado.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Pessoa usuária', 'Qualquer pessoa que utiliza um sistema digital para acessar serviços públicos.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Preencher', 'É o comportamento da pessoa usuária de inserir dados específicos, em campos pré-determinados, com o objetivo de registrar ou comunicar informações relevantes para solicitar o serviço fim.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Preparação e entrega', 'Envolve o conjunto de comportamentos necessários para elaborar, preencher, encaminhar informações e manifestar concordância.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Procurar site ou aplicativo', 'É o comportamento da pessoa usuária relacionado a identificar e buscar a plataforma digital mais adequada para se conectar com o serviço.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Realizar login', 'É o comportamento da pessoa usuária de autenticar-se em uma plataforma digital para ter acesso a funcionalidades e recursos restritos.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Selecionar entre alternativas', 'É o comportamento da pessoa usuária de escolher entre diferentes opções ou atributos de um serviço, a fim de personalizar a experiência do usuário ou atender a necessidades específicas.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;
insert into public.glossario (termo, definicao, aba_origem) values ('Verificar elegibilidade', 'É o comportamento de buscar identificar se um indivíduo ou instituição cumpre os requisitos necessários para utilizar um serviço ou acessar um benefício.', '#Glossário')
on conflict (termo) do update set definicao=excluded.definicao;

-- ============================================================
-- grupo_analise
-- ============================================================
insert into public.grupo_analise (codigo, nome, descricao, ordem) values
  ('CIDADANIA_DIGITAL', 'Cidadania Digital', 'Refere-se ao processo de democratizar o acesso ao ambiente digital para que as pessoas possam dele participar ativamente para se informar, se expressar e acessar serviços públicos de forma segura, consciente e inclusiva, com respeito às diversidades, direitos e deveres de todos.', 1)
on conflict (codigo) do update set nome=excluded.nome, descricao=excluded.descricao;
insert into public.grupo_analise (codigo, nome, descricao, ordem) values
  ('CLAREZA', 'Clareza', 'Refere-se à capacidade de transmitir uma mensagem de forma suficiente, direta, precisa e sem ambiguidade. O foco está no emissor da mensagem (quem comunica) e na forma como a mensagem é estruturada.', 2)
on conflict (codigo) do update set nome=excluded.nome, descricao=excluded.descricao;
insert into public.grupo_analise (codigo, nome, descricao, ordem) values
  ('LINGUAGEM_SIMPLES', 'Linguagem Simples', 'Refere-se ao uso de linguagem respeitosa, amigável, clara e de fácil compreensão (ex.: uso de elementos não textuais, redução do uso de termos técnicos, jargões, siglas desconhecidas, e comunicações duplicadas e desnecessárias).', 3)
on conflict (codigo) do update set nome=excluded.nome, descricao=excluded.descricao;
insert into public.grupo_analise (codigo, nome, descricao, ordem) values
  ('SUPORTE_AO_USUARIO', 'Suporte ao usuário', 'Refere-se à assistência prestada ao usuário durante e após a execução do processo/serviço.', 4)
on conflict (codigo) do update set nome=excluded.nome, descricao=excluded.descricao;
insert into public.grupo_analise (codigo, nome, descricao, ordem) values
  ('TRANSPARENCIA', 'Transparência', 'Refere-se a mostrar o processo, ser honesto sobre intenções, dados e limitações, e permitir que o usuário acompanhe e confie na experiência.', 5)
on conflict (codigo) do update set nome=excluded.nome, descricao=excluded.descricao;
insert into public.grupo_analise (codigo, nome, descricao, ordem) values
  ('USABILIDADE', 'Usabilidade', 'Refere-se a facilidade de uso de um serviço, ou seja, busca minimizar a necessidade de suporte ao usuário, tornando o serviço intuitivo e fácil de aprender.', 6)
on conflict (codigo) do update set nome=excluded.nome, descricao=excluded.descricao;
