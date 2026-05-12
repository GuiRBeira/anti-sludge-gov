# Cores [Link para seção Cores](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#cores)

A aplicação correta da paleta de cores visa trazer consistência ao _Design System_ e contribuir para garantir uma interface unificada e facilmente reconhecível pelos seus usuários. É fundamental que a paleta esteja alinhada aos Princípios do _Design System_ e seja aplicada corretamente na biblioteca de componentes contribuindo para o equilíbrio entre os diversos produtos e sistemas do governo.

## Princípios [Link para seção Princípios](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#principios)

### Experiência Única [Link para seção Experiência Única](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#experiencia-unica)

A paleta do Design System é constituída e organizada por cores e famílias de cores, abrangendo dimensões de matizes, brilhos e saturação. Além disso, são estabelecidas finalidades específicas para algumas dessas famílias: _Cores de Superfície_, _Cores de Leitura_, _Cores Interativas_ e _Cores de Feedback_. Elas tem o objetivo de preservar a identidade visual e manter a mesma experiência em todos os produtos e sistemas do Governo Federal.

> _Exemplo:_ Nesse sistema, a família _Blue Warm Vivid_, que contém a cor _Blue Warm Vivid 70_, foram as cores selecionadas para representar a identidade do Governo Federal.

### Eficiência e Clareza [Link para seção Eficiência e Clareza](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#eficiencia-e-clareza)

A cor deve indicar o estado e hierarquia dos elementos dispostos em uma interface, facilitando o _feedback_ e comunicação entre a interface e o usuário, enquanto se mantêm consistentes ao longo de toda a navegação.

> _Exemplo:_ A cor ajuda a indicar quais elementos são interativos, como eles se relacionam com outros elementos.

### Acessibilidade [Link para seção Acessibilidade](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#acessibilidade)

Um sistema de serviço deve cumprir as diferentes necessidades de acessibilidade. Para tanto, as cores existentes na paleta foram selecionadas para se obter um mínimo de contraste e garantir boa legibilidade nas interfaces digitais.

A [WCAG 2.1](https://www.w3.org/TR/WCAG20/) (Diretrizes de Acessibilidade para o Conteúdo da Web) descreve que existem vários níveis de conformidade (A, AA ou AAA), de forma que, quanto mais itens são atendidos, maior será o nível ou suporte de acessibilidade na interface.

O contraste varia entre 1 a 21 (geralmente descritos 1:1 a 21:1).

O _nível AA_ indica que é necessária uma taxa de contraste de pelo menos _4,5:1_ para que o texto seja considerado normal e tenha boa legibilidade. Para texto grande a taxa de contraste mínimo deve ser de pelo menos _3:1_.

O _nível AAA_ requer uma taxa de contraste de pelo menos _7:1_ para texto normal e _4,5:1_ para texto grande.

É considerado _texto grande_ aquele em que a fonte possui pelo menos 18 pontos (24px, 1,71em, 171% do tamanho padrão da Fonte Base, veja [Tipografia](https://www.gov.br/ds/fundamentos-visuais/tipografia) para maiores detalhes) ou 14 pontos em negrito (19px, 1,325em, 132,5%), um texto com tamanho abaixo desses valores (tal como 14pt regular) é considerado _texto normal_.

Elementos gráficos e componentes da interface (como ícones e bordas) seguem as mesmas regras de texto grande.

O _Design System_ do governo trabalha com nível de conformidade _mínima de AA_ (na taxa de contraste _4,5:1_), pois permite uma flexibilidade maior de variações de cores (em relação à conformidade AAA) e atende aos critérios mínimos de contraste proposto pela WCAG 2.1.

_Observação_: algumas cores foram selecionadas para um uso bastante específico, deste modo, elas funcionam no contraste mínimo de 3:1, ou seja, apenas para uso em elementos gráficos (ou texto grande).

> Para testar a acessibilidade das cores foram utilizadas as seguintes ferramentas online [Contrast Checker](https://contrastchecker.com/) e [Web AIM Contrast Checker](https://webaim.org/resources/contrastchecker)

Para o _Design System_ foi analisado a relação de contraste entre _a cor aplicada aos textos (2 variações que dependendo do brilho do plano de fundo da interface: claro ou escuro) e as cores que compõem a paleta do DS_.

> _Exemplo:_ Para o texto em _fundo claro_ optou-se pelo uso do cinza _#333333_ que possui contraste inferior ao preto, mas suficiente para uma boa leitura na tela. O tom neutro, deixa a composição mais leve, tornando a leitura mais agradável. Para texto em _fundo escuro_ optou-se pela cor branca _#FFFFF_.

### Reutilização e Colaboração [Link para seção Reutilização e Colaboração](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#reutilizacao-e-colaboracao)

Interfaces digitais do governo devem utilizar sempre as cores pré-definidas. Havendo a necessidade de acrescentar uma nova cor à paleta do DS, faz-se necessário que a cor seja testada do ponto de vista de acessibilidade e passe por uma prévia aprovação da equipe de design do DS.

_OBS:_ Consulte a acessibilidade das cores usadas no Design System na [Tabela de Contraste](https://www.gov.br/ds/fundamentos-visuais/cores#contrast-table).

* * *

## Sistema de Cores [Link para seção Sistema de Cores](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#sistema-de-cores)

O sistema de cores utilizado no Design System, assim como o modelo de gradação em luminância e _Famílias de Cores_, foram adaptados do modelo de cores do [U.S. Web Design System (USWDS)](https://designsystem.digital.gov/).

### Cor [Link para seção Cor](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#cor)

É qualquer amostra específica em nossas famílias de cores. Elas são representadas por uma nomenclatura construída com base na família e luminância. Por exemplo: `Red 50`, `Blue Warm Vivid 70`, `Indigo Cool Vivid 5`, etc.

### Família de Cores [Link para seção Família de Cores](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#familia-de-cores)

É um grupo de cores que têm o mesmo matiz em um círculo cromático. Eles contêm várias cores individuais, diferenciadas pelo brilho ou saturação de cada uma delas. Uma família de cores é normalmente representada por um nome que faz referência a sua matiz, como por exemplo: `Red`, `Blue Warm`, `Green Cool`, etc.

As famílias de cores do Design System são escolhidas a partir do modelo _HSL_ _(Hue, Saturation, Lightness)_, sistema de cores que utiliza os parâmetros de matiz, saturação e brilho, sendo dispostas em 360º em um círculo cromático. Desta forma, é possível rotular cada família através de sua posição em graus, neste modelo. As cores são selecionadas seguindo a mesma lógica de gradação de luminância em todas as famílias.

### Família de Cores Alternativas [Link para seção Família de Cores Alternativas](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#familia-de-cores-alternativas)

Refere-se ao mesmo conceito de _Família de Cores_. Fazem parte de um grupo de cores de um mesmo matiz mas pertencentes a um outro círculo cromático (com característica diferente da família “padrão”). Sua nomenclatura tem a mesma base da _Família de Cores_ adicionando um sufixo.

Atualmente temos apenas um círculo cromático alternativo chamado `Vivid`, criando famílias como `Red Vivid`, `Blue Warm Vivid`, `Green Cool Vivid`, etc.

### Círculo Cromático [Link para seção Círculo Cromático](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#circulo-cromatico)

Os círculos cromáticos são uma maneira de exibir as famílias do sistema de cores do Design System, dispostas em 360° no modelo de cores HSL. Cada família de cores está localizada com sua posição (em graus) neste modelo.

Abaixo é possível observar o padrão das famílias de cores do Design System dentro de cada círculo cromático.

![Sistema HSL - Famílias de Cores](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/circle-01.png)

_Círculo cromático (padrão)_

![Sistema HSL - Famílias de Cores Alternativas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/circle-02.png)

_Círculo cromático vivid (alternativo) - cores mais saturadas._

Existem algumas famílias que não estão visíveis dentro dos círculos cromáticos acima mas que podem ser usados como cores neutras:

- Famílias de Cinza: `Gray`, `Gray-Cool` e `Gray-Warm`.
- Família Pura: `Pure`

A lista de todas as cores disponíveis pode ser encontradas na [Paleta do Design System](https://www.gov.br/ds/fundamentos-visuais/cores#paleta-do-govbr-ds).

* * *

## Função das Cores [Link para seção Função das Cores](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#funcao-das-cores)

O Design System estabelece finalidades específicas utilizando as famílias de cores, com o intuito de facilitar a lógica para criação de temas. Em cada função estabelecida, qualquer cor da família especificada poderá ser usada, porém é recomendado utilizar a cor principal ou as alternativas indicadas nas escalas de cores.

**OBS:** Em algumas situações, poderá ser observado o uso 2 de famílias para um determinada função e aplicação de fundo. Isso acontece por causa do uso da _Família Pure_, ela funciona como uma “família de apoio” para as demais. Maiores informações veja Paleta do Design System.

### Cor Principal [Link para seção Cor Principal](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#cor-principal)

É a recomendação de uso principal que poderá ser usada para as finalidades estabelecidas. São representadas pela letra _P_ e indicadas na _Família de Cores_ da seguinte forma:

![Exemplo de Indicação - Cor Principal](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/sample-default.png)

_Exemplo de Indicação - Cor Principal_

### Cor Alternativa [Link para seção Cor Alternativa](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#cor-alternativa)

São alternativas de cores recomendadas que podem ser usadas quando não for possível utilizar a recomendação principal, ou trabalhar com ênfases. São representadas pela letra _A_ e indicadas na _Família de Cores_ da seguinte forma:

![Exemplo de Indicação - Cor Alternativa](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/sample-alternative.png)

_Exemplo de Indicação - Cor Alternativa_

### Fundo Claro Vs Fundo Escuro [Link para seção Fundo Claro Vs Fundo Escuro](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#fundo-claro-vs-fundo-escuro)

Quando se escolhe uma cor para um determinado elemento ou função, geralmente existe uma superfície comum da qual será aplicado aquele elemento. Porém, em algumas situações, a luminância desse fundo pode ser diferente do habitual, gerando contraste insuficiente (entre o fundo e o elemento) para se perceber o elemento.

Sempre que escolher uma cor (seja a principal ou as alternativas), determine o uso dela em diferentes luminâncias. Para facilitar, podemos pensar no uso desses elementos em diferentes superfícies: claro e escuro.

Abaixo estão listadas as principais funções das cores, as recomendações de qual família de cor utilizar, assim como a recomendação da cor principal e das alternativas dentro do tema base.

**OBS:** Cada função está ligada a um ou mais fundamentos. Procure as documentações relacionadas para maiores detalhes.

### 1\. Função _Container_ ( [Superfícies](https://www.gov.br/ds/fundamentos-visuais/superficie)) [Link para seção 1. Função Container (Superfícies)](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#1-funcao-container-superficies)

As _cores de superfície_ são utilizadas como base cromática neutra para composição do tema e compõem harmonicamente com as demais cores. São usadas especificamente em planos de fundo nas telas da interface e superfícies de componentes. Também devem proporcionar contraste com o texto e elementos interativos, assim como qualquer outro elemento de comunicação visual na interface, como imagens, ilustrações, ícones, etc.

#### Especificação [Link para seção Especificação](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#especificacao)

De modo geral, as cores de superfície mais utilizadas são as gradações de cinza, presentes na família `Gray` e branco ou preto na família `Pure`. Também pode se utilizar a família `Blue Warm Vivid` para fundos escuros. Elas são usadas como plano de fundo na tela e praticamente em todos os componentes do Design System.

##### Fundo Claro [Link para seção Fundo Claro](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#fundo-claro)

| Legenda | Recomendação | Hexadecimal | Token |
| :-: | :-: | :-: | :-: |
| _P_ | Cor Principal | `#ffffff` | `--pure-0` |
| _A_ | Cor Alternativa | `#f8f8f8` | `--gray-2` |

![Cor Superfície - Família Pure](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/pure-family.png)

_Cor Superfície - Família `Pure` para Fundos Claros_

![Cor Superfície Alternativa - Escala de Cinza](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/gray-superficie-light.png)

_Cor Superfície Alternativa - Família `Gray` para Fundos Claros_

##### Fundo Escuro [Link para seção Fundo Escuro](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#fundo-escuro)

| Legenda | Recomendação | Hexadecimal | Token |
| :-: | :-: | :-: | :-: |
| _P_ | Cor Principal | `#071D41` | `--blue-warm-vivid-90` |
| _A_ | Cor Alternativa | `#0C326F` | `--blue-warm-vivid-80` |

![Cor Superfície - Família Blue-Warm-Vivid](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/blue-superficie-dark.png)

_Cor Superfície - Família `Blue Warm Vivid` para Fundos Escuros_

### 2\. Função Leitura ( [Tipografia](https://www.gov.br/ds/fundamentos-visuais/tipografia) e [Iconografia](https://www.gov.br/ds/fundamentos-visuais/iconografia)) [Link para seção 2. Função Leitura (Tipografia e Iconografia)](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#2-funcao-leitura-tipografia-e-iconografia)

São as cores usadas nos elementos que necessitam de legibilidade, como textos e ícones, por exemplo. A função principal dessas cores é proporcionar contraste com a _Cor Superfície_ usada na tela ou elementos. Logo, para toda _Cor Superfície_, existe uma _Cor Leitura_ contrastante.

#### Especificação Leitura [Link para seção Especificação Leitura](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#especificacao-leitura)

##### Fundo Claro para Leitura [Link para seção Fundo Claro para Leitura](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#fundo-claro-para-leitura)

| Legenda | Recomendação | Hexadecimal | Token |
| :-: | :-: | :-: | :-: |
| _P_ | Cor Principal | `#333333` | `--gray-80` |

![Cor Leitura - Família Gray](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/gray-reading-light.png)

_Cor Leitura - Família `Gray` para Fundos Claros_

##### Fundo Escuro para Leitura [Link para seção Fundo Escuro para Leitura](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#fundo-escuro-para-leitura)

| Legenda | Recomendação | Hexadecimal | Token |
| :-: | :-: | :-: | :-: |
| _P_ | Cor Principal | `#ffffff` | `--pure-0` |

![Cor Leitura - Família Pure](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/pure-family.png)

_Cor Leitura - Família `Pure` para Fundos Escuros_

### 3\. Função _Feedback_ ( [Estados](https://www.gov.br/ds/fundamentos-visuais/estados)) [Link para seção 3. Função Feedback (Estados)](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#3-funcao-feedback-estados)

São representações visuais para feedbacks interativos ou informacionais relacionadas aos elementos na interface. Podemos subdividir essa função em dois grupos de estados: _interação_ e _avisos_.

#### Função Interação [Link para seção Função Interação](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#funcao-interacao)

São cores que servem para indicar ao usuário a possibilidade de interação sobre qualquer elemento que a utiliza. É necessário que estas cores se destaquem sobre os outros elementos ou informações textuais na interface.

##### Especificação Interação [Link para seção Especificação Interação](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#especificacao-interacao)

Para este tipo de cor, utilizam-se as famílias `Blue Warm` e `Blue Warm Vivid`. Abaixo seguem as referências.

###### Fundo Claro para Interação [Link para seção Fundo Claro para Interação](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#fundo-claro-para-interacao)

| Legenda | Recomendação | Hexadecimal | Token |
| :-: | :-: | :-: | :-: |
| _P_ | Cor Principal | `#1351B4` | `--blue-warm-vivid-70` |

![Cor Interativa - Família Blue Warm Vivid](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/blue-warm-vivid-interactive-light.png)

_Cor Interativa - Família `Blue Warm Vivid` para Fundos Claros_

###### Fundo Escuro para Interação [Link para seção Fundo Escuro para Interação](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#fundo-escuro-para-interacao)

| Legenda | Recomendação | Hexadecimal | Token |
| :-: | :-: | :-: | :-: |
| _P_ | Cor Principal | `#C5D4EB` | `--blue-warm-20` |

![Cor Interativa - Família Blue Warm](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/blue-warm-interactive-dark.png)

_Cor Interativa - Família `Blue Warm` para Fundos Escuros_

#### Função de Avisos [Link para seção Função de Avisos](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#funcao-de-avisos)

As cores de avisos foram escolhidas para serem aplicadas em situações que exijam mais atenção do usuário, como ocorre nas mensagens de _Feedback_ e estados correlacionados.

##### Especificação Avisos [Link para seção Especificação Avisos](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#especificacao-avisos)

São cores fortemente reconhecidas pela boa parte dos usuários e relacionadas a avisos específicos. Consulte o documento [Fundamentos Visuais > Estados](https://www.gov.br/ds/fundamentos-visuais/estados) para maiores informações.

###### Feedback Informação [Link para seção Feedback Informação](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#feedback-informacao)

| Legenda | Recomendação | Hexadecimal | Token |
| :-: | :-: | :-: | :-: |
| _P_ | Cor Principal | `#155BCB` | `--blue-warm-vivid-60` |
| _A_ | Cor Alternativa | `#D4E5FF` | `--blue-warm-vivid-10` |

![Cor Feedback Informação - Família Blue Warm Vivid](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/feedback-blue-warm-vivid.png)

_Cor Feedback Informação - Família `Blue Warm Vivid`_

###### Feedback Sucesso [Link para seção Feedback Sucesso](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#feedback-sucesso)

| Legenda | Recomendação | Hexadecimal | Token |
| :-: | :-: | :-: | :-: |
| _P_ | Cor Principal | `#168821` | `--green-cool-vivid-50` |
| _A_ | Cor Alternativa | `#E3F5E1` | `--green-cool-vivid-5` |

![Cor Feedback Sucesso - Família Green Cool Vivid](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/feedback-green-cool-vivid.png)

_Cor Feedback Sucesso - Família `Green Cool Vivid`_

###### Feedback Alerta [Link para seção Feedback Alerta](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#feedback-alerta)

| Legenda | Recomendação | Hexadecimal | Token |
| :-: | :-: | :-: | :-: |
| _P_ | Cor Principal | `#FFCD07` | `--yellow-vivid-20` |
| _A_ | Cor Alternativa | `#FFF5C2` | `--yellow-vivid-5` |

![Cor Feedback Alerta - Família Yellow Vivid](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/feedback-yellow-vivid.png)

_Cor Feedback Alerta - Família `Yellow Vivid`_

###### Feedback Erro [Link para seção Feedback Erro](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#feedback-erro)

| Legenda | Recomendação | Hexadecimal | Token |
| :-: | :-: | :-: | :-: |
| _P_ | Cor Principal | `#E52207` | `--red-vivid-50` |
| _A_ | Cor Alternativa | `#FDE0DB` | `--red-vivid-10` |

![Cor Feedback Erro - Família Red Vivid](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/feedback-red-vivid.png)

_Cor Feedback Erro - Família `Red Vivid`_

* * *

## Paleta do Design System [Link para seção Paleta do Design System](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#paleta-do-design-system)

Como dito anteriormente, a paleta do Design System foi constituída por grupos de famílias, formadas por grupos de cores dentro do círculo cromático (HSL), com um matiz igual ou muito próximo. As famílias alternativas estão descritas com sufixo `Vivid` junto ao nome da família.

Os nomes das cores são formados pelo nome da família correspondente, adicionando o fator de luminância ao qual ela pertence, dentro daquela família.

Abaixo estão listadas todas as famílias do Design System.

### Red [Link para seção Red](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#red)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/1b1616.png) | `Red 90` | `0.008` | `hsl(0, 10%, 10%)` / `#1b1616` | `--red-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/3e2927.png) | `Red 80` | `0.027` | `hsl(5, 23%, 20%)` / `#3e2927` | `--red-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/6f3331.png) | `Red 70` | `0.059` | `hsl(2, 39%, 31%)` / `#6f3331` | `--red-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/a23737.png) | `Red 60` | `0.106` | `hsl(0, 49%, 43%)` / `#a23737` | `--red-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/d83933.png) | `Red 50` | `0.177` | `hsl(2, 68%, 52%)` / `#d83933` | `--red-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/e9695f.png) | `Red 40` | `0.282` | `hsl(4, 76%, 64%)` / `#e9695f` | `--red-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/f2938c.png) | `Red 30` | `0.416` | `hsl(4, 80%, 75%)` / `#f2938c` | `--red-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F7BBB1.png) | `Red 20` | `0.584` | `hsl(9, 81%, 83%)` / `#F7BBB1` | `--red-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F8E1DE.png) | `Red 10` | `0.790` | `hsl(7, 65%, 92%)` / `#F8E1DE` | `--red-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F9EEEE.png) | `Red 5` | `0.874` | `hsl(0, 48%, 95%)` / `#F9EEEE` | `--red-5` |

### Red Vivid [Link para seção Red Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#red-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/5C1111.png) | `Red Vivid 80` | `0.027` | `hsl(0, 69%, 21%)` / `#5C1111` | `--red-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/8B0A03.png) | `Red Vivid 70` | `0.057` | `hsl(3, 96%, 28%)` / `#8B0A03` | `--red-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/B50909.png) | `Red Vivid 60` | `0.100` | `hsl(0, 91%, 37%)` / `#B50909` | `--red-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E52207.png) | `Red Vivid 50` | `0.178` | `hsl(7, 94%, 46%)` / `#E52207` | `--red-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FB5A47.png) | `Red Vivid 40` | `0.282` | `hsl(6, 96%, 63%)` / `#FB5A47` | `--red-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FF8D7B.png) | `Red Vivid 30` | `0.417` | `hsl(8, 100%, 74%)` / `#FF8D7B` | `--red-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FDB8AE.png) | `Red Vivid 20` | `0.582` | `hsl(8, 95%, 84%)` / `#FDB8AE` | `--red-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FDE0DB.png) | `Red Vivid 10` | `0.793` | `hsl(9, 89%, 93%)` / `#FDE0DB` | `--red-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FFF3F2.png) | `Red Vivid 5` | `0.917` | `hsl(5, 100%, 97%)` / `#FFF3F2` | `--red-vivid-5` |

### Red Cool [Link para seção Red Cool](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#red-cool)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/1E1517.png) | `Red Cool 90` | `0.008` | `hsl(347, 18%, 10%)` / `#1E1517` | `--red-cool-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/40282C.png) | `Red Cool 80` | `0.027` | `hsl(350, 23%, 20%)` / `#40282C` | `--red-cool-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/68363F.png) | `Red Cool 70` | `0.059` | `hsl(349, 32%, 31%)` / `#68363F` | `--red-cool-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/9E394B.png) | `Red Cool 60` | `0.107` | `hsl(349, 47%, 42%)` / `#9E394B` | `--red-cool-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/CD425B.png) | `Red Cool 50` | `0.176` | `hsl(349, 58%, 53%)` / `#CD425B` | `--red-cool-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E16B80.png) | `Red Cool 40` | `0.280` | `hsl(349, 66%, 65%)` / `#E16B80` | `--red-cool-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E09AA6.png) | `Red Cool 30` | `0.417` | `hsl(350, 53%, 74%)` / `#E09AA6` | `--red-cool-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/ECBEC6.png) | `Red Cool 20` | `0.587` | `hsl(350, 55%, 84%)` / `#ECBEC6` | `--red-cool-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F3E1E4.png) | `Red Cool 10` | `0.785` | `hsl(350, 43%, 92%)` / `#F3E1E4` | `--red-cool-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F8EFF1.png) | `Red Cool 5` | `0.880` | `hsl(347, 39%, 95%)` / `#F8EFF1` | `--red-cool-5` |

### Red Cool Vivid [Link para seção Red Cool Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#red-cool-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/4F1C24.png) | `Red Cool Vivid 80` | `0.026` | `hsl(351, 48%, 21%)` / `#4F1C24` | `--red-cool-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/822133.png) | `Red Cool Vivid 70` | `0.060` | `hsl(349, 60%, 32%)` / `#822133` | `--red-cool-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/B21D38.png) | `Red Cool Vivid 60` | `0.106` | `hsl(349, 72%, 41%)` / `#B21D38` | `--red-cool-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E41D3D.png) | `Red Cool Vivid 50` | `0.177` | `hsl(350, 79%, 50%)` / `#E41D3D` | `--red-cool-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F45D79.png) | `Red Cool Vivid 40` | `0.284` | `hsl(349, 87%, 66%)` / `#F45D79` | `--red-cool-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FD8BA0.png) | `Red Cool Vivid 30` | `0.418` | `hsl(349, 97%, 77%)` / `#FD8BA0` | `--red-cool-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F8B9C5.png) | `Red Cool Vivid 20` | `0.586` | `hsl(349, 82%, 85%)` / `#F8B9C5` | `--red-cool-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F8DFE2.png) | `Red Cool Vivid 10` | `0.782` | `hsl(353, 64%, 92%)` / `#F8DFE2` | `--red-cool-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FFF2F5.png) | `Red Cool Vivid 5` | `0.913` | `hsl(346, 100%, 97%)` / `#FFF2F5` | `--red-cool-vivid-5` |

### Red Warm [Link para seção Red Warm](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#red-warm)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/1F1C18.png) | `Red Warm 90` | `0.011` | `hsl(34, 13%, 11%)` / `#1F1C18` | `--red-warm-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/332D29.png) | `Red Warm 80` | `0.027` | `hsl(24, 11%, 18%)` / `#332D29` | `--red-warm-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/524236.png) | `Red Warm 70` | `0.059` | `hsl(26, 21%, 27%)` / `#524236` | `--red-warm-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/805039.png) | `Red Warm 60` | `0.106` | `hsl(19, 38%, 36%)` / `#805039` | `--red-warm-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/C3512C.png) | `Red Warm 50` | `0.176` | `hsl(15, 63%, 47%)` / `#C3512C` | `--red-warm-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/D27A56.png) | `Red Warm 40` | `0.282` | `hsl(17, 58%, 58%)` / `#D27A56` | `--red-warm-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/DCA081.png) | `Red Warm 30` | `0.419` | `hsl(20, 57%, 68%)` / `#DCA081` | `--red-warm-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/ECC0A7.png) | `Red Warm 20` | `0.583` | `hsl(22, 64%, 79%)` / `#ECC0A7` | `--red-warm-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F4E3DB.png) | `Red Warm 10` | `0.792` | `hsl(19, 53%, 91%)` / `#F4E3DB` | `--red-warm-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F6EFEA.png) | `Red Warm 5` | `0.872` | `hsl(25, 40%, 94%)` / `#F6EFEA` | `--red-warm-5` |

### Red Warm Vivid [Link para seção Red Warm Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#red-warm-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/3E2A1E.png) | `Red Warm Vivid 80` | `0.027` | `hsl(23, 35%, 18%)` / `#3E2A1E` | `--red-warm-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/63340F.png) | `Red Warm Vivid 70` | `0.051` | `hsl(26, 74%, 22%)` / `#63340F` | `--red-warm-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/9C3D10.png) | `Red Warm Vivid 60` | `0.104` | `hsl(19, 81%, 34%)` / `#9C3D10` | `--red-warm-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/D54309.png) | `Red Warm Vivid 50` | `0.181` | `hsl(17, 92%, 44%)` / `#D54309` | `--red-warm-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/EF5E25.png) | `Red Warm Vivid 40` | `0.264` | `hsl(17, 86%, 54%)` / `#EF5E25` | `--red-warm-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F39268.png) | `Red Warm Vivid 30` | `0.406` | `hsl(18, 85%, 68%)` / `#F39268` | `--red-warm-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F6BD9C.png) | `Red Warm Vivid 20` | `0.583` | `hsl(22, 83%, 79%)` / `#F6BD9C` | `--red-warm-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FCE1D4.png) | `Red Warm Vivid 10` | `0.792` | `hsl(19, 87%, 91%)` / `#FCE1D4` | `--red-warm-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FFF5EE.png) | `Red Warm Vivid 5` | `0.927` | `hsl(25, 100%, 97%)` / `#FFF5EE` | `--red-warm-vivid-5` |

### Orange [Link para seção Orange](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#orange)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/1B1614.png) | `Orange 90` | `0.008` | `hsl(17, 15%, 9%)` / `#1B1614` | `--orange-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/332D27.png) | `Orange 80` | `0.027` | `hsl(30, 13%, 18%)` / `#332D27` | `--orange-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/524236.png) | `Orange 70` | `0.059` | `hsl(26, 21%, 27%)` / `#524236` | `--orange-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/775540.png) | `Orange 60` | `0.107` | `hsl(23, 30%, 36%)` / `#775540` | `--orange-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/A26739.png) | `Orange 50` | `0.176` | `hsl(26, 48%, 43%)` / `#A26739` | `--orange-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/DD7533.png) | `Orange 40` | `0.283` | `hsl(23, 71%, 53%)` / `#DD7533` | `--orange-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F09860.png) | `Orange 30` | `0.418` | `hsl(23, 83%, 66%)` / `#F09860` | `--orange-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F3BF90.png) | `Orange 20` | `0.583` | `hsl(28, 80%, 76%)` / `#F3BF90` | `--orange-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F2E4D4.png) | `Orange 10` | `0.791` | `hsl(32, 54%, 89%)` / `#F2E4D4` | `--orange-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F6EFE9.png) | `Orange 5` | `0.872` | `hsl(28, 42%, 94%)` / `#F6EFE9` | `--orange-5` |

### Orange Vivid [Link para seção Orange Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#orange-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/352313.png) | `Orange Vivid 80` | `0.020` | `hsl(28, 47%, 14%)` / `#352313` | `--orange-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/5F3617.png) | `Orange Vivid 70` | `0.051` | `hsl(26, 61%, 23%)` / `#5F3617` | `--orange-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/8C471C.png) | `Orange Vivid 60` | `0.101` | `hsl(23, 67%, 33%)` / `#8C471C` | `--orange-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/C05600.png) | `Orange Vivid 50` | `0.178` | `hsl(27, 100%, 38%)` / `#C05600` | `--orange-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E66F0E.png) | `Orange Vivid 40` | `0.282` | `hsl(27, 89%, 48%)` / `#E66F0E` | `--orange-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FF8C00.png) | `Orange Vivid 30` | `0.400` | `hsl(33, 100%, 50%)` / `#FF8C00` | `--orange-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FFBC78.png) | `Orange Vivid 20` | `0.585` | `hsl(30, 100%, 74%)` / `#FFBC78` | `--orange-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FCE2C5.png) | `Orange Vivid 10` | `0.791` | `hsl(32, 90%, 88%)` / `#FCE2C5` | `--orange-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FDF5E6.png) | `Orange Vivid 5` | `0.919` | `hsl(39, 85%, 95%)` / `#FDF5E6` | `--orange-vivid-5` |

### Orange Warm [Link para seção Orange Warm](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#orange-warm)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/1C1615.png) | `Orange Warm 90` | `0.008` | `hsl(9, 14%, 10%)` / `#1C1615` | `--orange-warm-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/3D2925.png) | `Orange Warm 80` | `0.027` | `hsl(10, 24%, 19%)` / `#3D2925` | `--orange-warm-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/633A32.png) | `Orange Warm 70` | `0.059` | `hsl(10, 33%, 29%)` / `#633A32` | `--orange-warm-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/914734.png) | `Orange Warm 60` | `0.107` | `hsl(12, 47%, 39%)` / `#914734` | `--orange-warm-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/BD5727.png) | `Orange Warm 50` | `0.177` | `hsl(19, 66%, 45%)` / `#BD5727` | `--orange-warm-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E17141.png) | `Orange Warm 40` | `0.281` | `hsl(18, 73%, 57%)` / `#E17141` | `--orange-warm-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F3966D.png) | `Orange Warm 30` | `0.419` | `hsl(18, 85%, 69%)` / `#F3966D` | `--orange-warm-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F7BCA2.png) | `Orange Warm 20` | `0.583` | `hsl(18, 84%, 80%)` / `#F7BCA2` | `--orange-warm-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FBE0D0.png) | `Orange Warm 10` | `0.783` | `hsl(22, 84%, 90%)` / `#FBE0D0` | `--orange-warm-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FAEEE5.png) | `Orange Warm 5` | `0.871` | `hsl(26, 68%, 94%)` / `#FAEEE5` | `--orange-warm-5` |

### Orange Warm Vivid [Link para seção Orange Warm Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#orange-warm-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/3D231D.png) | `Orange Warm Vivid 80` | `0.022` | `hsl(11, 36%, 18%)` / `#3D231D` | `--orange-warm-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/782312.png) | `Orange Warm Vivid 70` | `0.052` | `hsl(10, 74%, 27%)` / `#782312` | `--orange-warm-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/A72F10.png) | `Orange Warm Vivid 60` | `0.102` | `hsl(12, 83%, 36%)` / `#A72F10` | `--orange-warm-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/CF4900.png) | `Orange Warm Vivid 50` | `0.180` | `hsl(21, 100%, 41%)` / `#CF4900` | `--orange-warm-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FF580A.png) | `Orange Warm Vivid 40` | `0.282` | `hsl(19, 100%, 52%)` / `#FF580A` | `--orange-warm-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FC906D.png) | `Orange Warm Vivid 30` | `0.417` | `hsl(15, 96%, 71%)` / `#FC906D` | `--orange-warm-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FBBAA7.png) | `Orange Warm Vivid 20` | `0.584` | `hsl(14, 91%, 82%)` / `#FBBAA7` | `--orange-warm-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FFE2D1.png) | `Orange Warm Vivid 10` | `0.802` | `hsl(22, 100%, 91%)` / `#FFE2D1` | `--orange-warm-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FFF3EA.png) | `Orange Warm Vivid 5` | `0.913` | `hsl(26, 100%, 96%)` / `#FFF3EA` | `--orange-warm-vivid-5` |

### Gold [Link para seção Gold](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#gold)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/191714.png) | `Gold 90` | `0.008` | `hsl(36, 11%, 9%)` / `#191714` | `--gold-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/322D26.png) | `Gold 80` | `0.026` | `hsl(35, 14%, 17%)` / `#322D26` | `--gold-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/4D4438.png) | `Gold 70` | `0.059` | `hsl(34, 16%, 26%)` / `#4D4438` | `--gold-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/6B5947.png) | `Gold 60` | `0.107` | `hsl(30, 20%, 35%)` / `#6B5947` | `--gold-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/8E704F.png) | `Gold 50` | `0.179` | `hsl(31, 29%, 43%)` / `#8E704F` | `--gold-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/AD8B65.png) | `Gold 40` | `0.282` | `hsl(32, 31%, 54%)` / `#AD8B65` | `--gold-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/C7A97B.png) | `Gold 30` | `0.419` | `hsl(36, 40%, 63%)` / `#C7A97B` | `--gold-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/DEC69A.png) | `Gold 20` | `0.582` | `hsl(39, 51%, 74%)` / `#DEC69A` | `--gold-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F1E5CD.png) | `Gold 10` | `0.791` | `hsl(40, 56%, 87%)` / `#F1E5CD` | `--gold-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F5F0E6.png) | `Gold 5` | `0.874` | `hsl(40, 43%, 93%)` / `#F5F0E6` | `--gold-5` |

### Gold Vivid [Link para seção Gold Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#gold-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/3B2B15.png) | `Gold Vivid 80` | `0.027` | `hsl(35, 48%, 16%)` / `#3B2B15` | `--gold-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/5C410A.png) | `Gold Vivid 70` | `0.060` | `hsl(40, 80%, 20%)` / `#5C410A` | `--gold-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/7A591A.png) | `Gold Vivid 60` | `0.113` | `hsl(39, 65%, 29%)` / `#7A591A` | `--gold-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/936F38.png) | `Gold Vivid 50` | `0.178` | `hsl(36, 45%, 40%)` / `#936F38` | `--gold-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/C2850C.png) | `Gold Vivid 40` | `0.282` | `hsl(40, 88%, 40%)` / `#C2850C` | `--gold-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E5A000.png) | `Gold Vivid 30` | `0.417` | `hsl(42, 100%, 45%)` / `#E5A000` | `--gold-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FFBE2E.png) | `Gold Vivid 20` | `0.582` | `hsl(41, 100%, 59%)` / `#FFBE2E` | `--gold-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FFE396.png) | `Gold Vivid 10` | `0.784` | `hsl(44, 100%, 79%)` / `#FFE396` | `--gold-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FEF0C8.png) | `Gold Vivid 5` | `0.875` | `hsl(44, 96%, 89%)` / `#FEF0C8` | `--gold-vivid-5` |

### Yellow [Link para seção Yellow](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#yellow)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/1A1614.png) | `Yellow 90` | `0.008` | `hsl(20, 13%, 9%)` / `#1A1614` | `--yellow-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/332D27.png) | `Yellow 80` | `0.027` | `hsl(30, 13%, 18%)` / `#332D27` | `--yellow-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/504332.png) | `Yellow 70` | `0.059` | `hsl(34, 23%, 25%)` / `#504332` | `--yellow-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/6B5A39.png) | `Yellow 60` | `0.107` | `hsl(40, 30%, 32%)` / `#6B5A39` | `--yellow-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/8A7237.png) | `Yellow 50` | `0.177` | `hsl(43, 43%, 38%)` / `#8A7237` | `--yellow-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/A88F48.png) | `Yellow 40` | `0.284` | `hsl(44, 40%, 47%)` / `#A88F48` | `--yellow-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/C9AB48.png) | `Yellow 30` | `0.420` | `hsl(46, 54%, 54%)` / `#C9AB48` | `--yellow-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E6C74C.png) | `Yellow 20` | `0.581` | `hsl(48, 75%, 60%)` / `#E6C74C` | `--yellow-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F5E6AF.png) | `Yellow 10` | `0.791` | `hsl(47, 78%, 82%)` / `#F5E6AF` | `--yellow-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FAF3D1.png) | `Yellow 5` | `0.890` | `hsl(50, 80%, 90%)` / `#FAF3D1` | `--yellow-5` |

### Yellow Vivid [Link para seção Yellow Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#yellow-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/422D19.png) | `Yellow Vivid 80` | `0.031` | `hsl(29, 45%, 18%)` / `#422D19` | `--yellow-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/5C4809.png) | `Yellow Vivid 70` | `0.069` | `hsl(46, 82%, 20%)` / `#5C4809` | `--yellow-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/776017.png) | `Yellow Vivid 60` | `0.123` | `hsl(46, 68%, 28%)` / `#776017` | `--yellow-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/947100.png) | `Yellow Vivid 50` | `0.181` | `hsl(46, 100%, 29%)` / `#947100` | `--yellow-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/B38C00.png) | `Yellow Vivid 40` | `0.283` | `hsl(47, 100%, 35%)` / `#B38C00` | `--yellow-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/DDAA01.png) | `Yellow Vivid 30` | `0.441` | `hsl(46, 99%, 44%)` / `#DDAA01` | `--yellow-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FFCD07.png) | `Yellow Vivid 20` | `0.649` | `hsl(48, 100%, 51%)` / `#FFCD07` | `--yellow-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FEE685.png) | `Yellow Vivid 10` | `0.793` | `hsl(48, 98%, 76%)` / `#FEE685` | `--yellow-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FFF5C2.png) | `Yellow Vivid 5` | `0.904` | `hsl(50, 100%, 88%)` / `#FFF5C2` | `--yellow-vivid-5` |

### Green [Link para seção Green](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#green)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/161814.png) | `Green 90` | `0.008` | `hsl(90, 9%, 9%)` / `#161814` | `--green-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/293021.png) | `Green 80` | `0.026` | `hsl(88, 19%, 16%)` / `#293021` | `--green-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/3C4A29.png) | `Green 70` | `0.060` | `hsl(85, 29%, 23%)` / `#3C4A29` | `--green-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/4C6424.png) | `Green 60` | `0.107` | `hsl(83, 47%, 27%)` / `#4C6424` | `--green-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/607F35.png) | `Green 50` | `0.179` | `hsl(85, 41%, 35%)` / `#607F35` | `--green-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/7D9B4E.png) | `Green 40` | `0.283` | `hsl(83, 33%, 46%)` / `#7D9B4E` | `--green-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/9BB672.png) | `Green 30` | `0.416` | `hsl(84, 32%, 58%)` / `#9BB672` | `--green-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/B8D293.png) | `Green 20` | `0.583` | `hsl(85, 41%, 70%)` / `#B8D293` | `--green-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/DFEACD.png) | `Green 10` | `0.789` | `hsl(83, 41%, 86%)` / `#DFEACD` | `--green-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/EAF4DD.png) | `Green 5` | `0.874` | `hsl(86, 51%, 91%)` / `#EAF4DD` | `--green-5` |

### Green Vivid [Link para seção Green Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#green-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/243413.png) | `Green Vivid 80` | `0.028` | `hsl(89, 46%, 14%)` / `#243413` | `--green-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/2F4A0B.png) | `Green Vivid 70` | `0.055` | `hsl(86, 74%, 17%)` / `#2F4A0B` | `--green-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/466C04.png) | `Green Vivid 60` | `0.120` | `hsl(82, 93%, 22%)` / `#466C04` | `--green-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/538200.png) | `Green Vivid 50` | `0.178` | `hsl(82, 100%, 25%)` / `#538200` | `--green-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/719F2A.png) | `Green Vivid 40` | `0.284` | `hsl(84, 58%, 39%)` / `#719F2A` | `--green-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/7FB135.png) | `Green Vivid 30` | `0.362` | `hsl(84, 54%, 45%)` / `#7FB135` | `--green-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/98D035.png) | `Green Vivid 20` | `0.520` | `hsl(82, 62%, 51%)` / `#98D035` | `--green-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/C5EE93.png) | `Green Vivid 10` | `0.751` | `hsl(87, 73%, 75%)` / `#C5EE93` | `--green-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/DDF9C7.png) | `Green Vivid 5` | `0.872` | `hsl(94, 81%, 88%)` / `#DDF9C7` | `--green-vivid-5` |

### Green Cool [Link para seção Green Cool](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#green-cool)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/1A1F1A.png) | `Green Cool 90` | `0.012` | `hsl(120, 9%, 11%)` / `#1A1F1A` | `--green-cool-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/28312A.png) | `Green Cool 80` | `0.028` | `hsl(133, 10%, 17%)` / `#28312A` | `--green-cool-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/37493B.png) | `Green Cool 70` | `0.058` | `hsl(133, 14%, 25%)` / `#37493B` | `--green-cool-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/446443.png) | `Green Cool 60` | `0.107` | `hsl(118, 20%, 33%)` / `#446443` | `--green-cool-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/4d8055.png) | `Green Cool 50` | `0.176` | `hsl(129, 25%, 40%)` / `#4d8055` | `--green-cool-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/5E9F69.png) | `Green Cool 40` | `0.281` | `hsl(130, 26%, 50%)` / `#5E9F69` | `--green-cool-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/86B98E.png) | `Green Cool 30` | `0.417` | `hsl(129, 27%, 63%)` / `#86B98E` | `--green-cool-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/B4D0B9.png) | `Green Cool 20` | `0.583` | `hsl(131, 23%, 76%)` / `#B4D0B9` | `--green-cool-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/DBEBDE.png) | `Green Cool 10` | `0.797` | `hsl(131, 29%, 89%)` / `#DBEBDE` | `--green-cool-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/ECF3EC.png) | `Green Cool 5` | `0.879` | `hsl(120, 23%, 94%)` / `#ECF3EC` | `--green-cool-5` |

### Green Cool Vivid [Link para seção Green Cool Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#green-cool-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/19311E.png) | `Green Cool Vivid 80` | `0.024` | `hsl(133, 32%, 15%)` / `#19311E` | `--green-cool-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/154C21.png) | `Green Cool Vivid 70` | `0.054` | `hsl(133, 57%, 19%)` / `#154C21` | `--green-cool-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/216E1F.png) | `Green Cool Vivid 60` | `0.115` | `hsl(118, 56%, 28%)` / `#216E1F` | `--green-cool-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/168821.png) | `Green Cool Vivid 50` | `0.178` | `hsl(126, 72%, 31%)` / `#168821` | `--green-cool-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/00A91C.png) | `Green Cool Vivid 40` | `0.284` | `hsl(130, 100%, 33%)` / `#00A91C` | `--green-cool-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/21C834.png) | `Green Cool Vivid 30` | `0.418` | `hsl(127, 72%, 46%)` / `#21C834` | `--green-cool-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/70E17B.png) | `Green Cool Vivid 20` | `0.587` | `hsl(126, 65%, 66%)` / `#70E17B` | `--green-cool-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/B7F5BD.png) | `Green Cool Vivid 10` | `0.790` | `hsl(126, 76%, 84%)` / `#B7F5BD` | `--green-cool-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E3F5E1.png) | `Green Cool Vivid 5` | `0.870` | `hsl(114, 50%, 92%)` / `#E3F5E1` | `--green-cool-vivid-5` |

### Green Warm [Link para seção Green Warm](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#green-warm)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/171712.png) | `Green Warm 90` | `0.008` | `hsl(60, 12%, 8%)` / `#171712` | `--green-warm-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/2D2F21.png) | `Green Warm 80` | `0.027` | `hsl(69, 18%, 16%)` / `#2D2F21` | `--green-warm-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/45472F.png) | `Green Warm 70` | `0.059` | `hsl(65, 20%, 23%)` / `#45472F` | `--green-warm-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/5A5F38.png) | `Green Warm 60` | `0.106` | `hsl(68, 26%, 30%)` / `#5A5F38` | `--green-warm-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/6F7A41.png) | `Green Warm 50` | `0.176` | `hsl(72, 30%, 37%)` / `#6F7A41` | `--green-warm-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/8A984B.png) | `Green Warm 40` | `0.283` | `hsl(71, 34%, 45%)` / `#8A984B` | `--green-warm-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/A6B557.png) | `Green Warm 30` | `0.418` | `hsl(70, 39%, 53%)` / `#A6B557` | `--green-warm-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/CBD17A.png) | `Green Warm 20` | `0.597` | `hsl(64, 49%, 65%)` / `#CBD17A` | `--green-warm-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E7EAB7.png) | `Green Warm 10` | `0.792` | `hsl(64, 55%, 82%)` / `#E7EAB7` | `--green-warm-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F1F4D7.png) | `Green Warm 5` | `0.883` | `hsl(66, 57%, 90%)` / `#F1F4D7` | `--green-warm-5` |

### Green Warm Vivid [Link para seção Green Warm Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#green-warm-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/38380B.png) | `Green Warm Vivid 80` | `0.036` | `hsl(60, 67%, 13%)` / `#38380B` | `--green-warm-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/4B4E10.png) | `Green Warm Vivid 70` | `0.069` | `hsl(63, 66%, 18%)` / `#4B4E10` | `--green-warm-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/5A6613.png) | `Green Warm Vivid 60` | `0.117` | `hsl(69, 69%, 24%)` / `#5A6613` | `--green-warm-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/6A7D00.png) | `Green Warm Vivid 50` | `0.177` | `hsl(69, 100%, 25%)` / `#6A7D00` | `--green-warm-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/7E9C1D.png) | `Green Warm Vivid 40` | `0.283` | `hsl(74, 69%, 36%)` / `#7E9C1D` | `--green-warm-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/A3B72C.png) | `Green Warm Vivid 30` | `0.418` | `hsl(69, 61%, 45%)` / `#A3B72C` | `--green-warm-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/C5D30A.png) | `Green Warm Vivid 20` | `0.584` | `hsl(64, 91%, 43%)` / `#C5D30A` | `--green-warm-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E7F434.png) | `Green Warm Vivid 10` | `0.819` | `hsl(64, 90%, 58%)` / `#E7F434` | `--green-warm-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F5FBC1.png) | `Green Warm Vivid 5` | `0.922` | `hsl(66, 88%, 87%)` / `#F5FBC1` | `--green-warm-vivid-5` |

### Mint [Link para seção Mint](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#mint)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/0D1A12.png) | `Mint 90` | `0.008` | `hsl(143, 33%, 8%)` / `#0D1A12` | `--mint-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/193324.png) | `Mint 80` | `0.027` | `hsl(145, 34%, 15%)` / `#193324` | `--mint-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/204E34.png) | `Mint 70` | `0.060` | `hsl(146, 42%, 22%)` / `#204E34` | `--mint-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/286846.png) | `Mint 60` | `0.107` | `hsl(148, 44%, 28%)` / `#286846` | `--mint-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/2E8367.png) | `Mint 50` | `0.177` | `hsl(160, 48%, 35%)` / `#2E8367` | `--mint-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/34A37E.png) | `Mint 40` | `0.284` | `hsl(160, 52%, 42%)` / `#34A37E` | `--mint-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/5ABF95.png) | `Mint 30` | `0.416` | `hsl(155, 44%, 55%)` / `#5ABF95` | `--mint-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/92D9BB.png) | `Mint 20` | `0.593` | `hsl(155, 48%, 71%)` / `#92D9BB` | `--mint-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/C7EFE2.png) | `Mint 10` | `0.793` | `hsl(161, 56%, 86%)` / `#C7EFE2` | `--mint-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/DBF6ED.png) | `Mint 5` | `0.870` | `hsl(160, 60%, 91%)` / `#DBF6ED` | `--mint-5` |

### Mint Vivid [Link para seção Mint Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#mint-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/0D351E.png) | `Mint Vivid 80` | `0.027` | `hsl(145, 61%, 13%)` / `#0D351E` | `--mint-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/0C4E29.png) | `Mint Vivid 70` | `0.056` | `hsl(146, 73%, 18%)` / `#0C4E29` | `--mint-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/146947.png) | `Mint Vivid 60` | `0.107` | `hsl(156, 68%, 25%)` / `#146947` | `--mint-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/008659.png) | `Mint Vivid 50` | `0.177` | `hsl(160, 100%, 26%)` / `#008659` | `--mint-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/00A871.png) | `Mint Vivid 40` | `0.291` | `hsl(160, 100%, 33%)` / `#00A871` | `--mint-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/04C585.png) | `Mint Vivid 30` | `0.416` | `hsl(160, 96%, 39%)` / `#04C585` | `--mint-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/0CEDA6.png) | `Mint Vivid 20` | `0.633` | `hsl(161, 90%, 49%)` / `#0CEDA6` | `--mint-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/83FCD4.png) | `Mint Vivid 10` | `0.791` | `hsl(160, 95%, 75%)` / `#83FCD4` | `--mint-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/C9FBEB.png) | `Mint Vivid 5` | `0.874` | `hsl(161, 86%, 89%)` / `#C9FBEB` | `--mint-vivid-5` |

### Mint Cool [Link para seção Mint Cool](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#mint-cool)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/111818.png) | `Mint Cool 90` | `0.008` | `hsl(180, 17%, 8%)` / `#111818` | `--mint-cool-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/203131.png) | `Mint Cool 80` | `0.027` | `hsl(180, 21%, 16%)` / `#203131` | `--mint-cool-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/2A4B45.png) | `Mint Cool 70` | `0.059` | `hsl(169, 28%, 23%)` / `#2A4B45` | `--mint-cool-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/376462.png) | `Mint Cool 60` | `0.108` | `hsl(177, 29%, 30%)` / `#376462` | `--mint-cool-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/40807E.png) | `Mint Cool 50` | `0.180` | `hsl(178, 33%, 38%)` / `#40807E` | `--mint-cool-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/4F9E99.png) | `Mint Cool 40` | `0.284` | `hsl(176, 33%, 46%)` / `#4F9E99` | `--mint-cool-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/6FBAB3.png) | `Mint Cool 30` | `0.417` | `hsl(174, 35%, 58%)` / `#6FBAB3` | `--mint-cool-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/9BD4CF.png) | `Mint Cool 20` | `0.585` | `hsl(175, 40%, 72%)` / `#9BD4CF` | `--mint-cool-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/C4EEEB.png) | `Mint Cool 10` | `0.788` | `hsl(176, 55%, 85%)` / `#C4EEEB` | `--mint-cool-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E0F7F6.png) | `Mint Cool 5` | `0.890` | `hsl(177, 59%, 92%)` / `#E0F7F6` | `--mint-cool-5` |

### Mint Cool Vivid [Link para seção Mint Cool Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#mint-cool-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/123131.png) | `Mint Cool Vivid 80` | `0.025` | `hsl(180, 46%, 13%)` / `#123131` | `--mint-cool-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/0B4B3F.png) | `Mint Cool Vivid 70` | `0.054` | `hsl(169, 74%, 17%)` / `#0B4B3F` | `--mint-cool-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/0F6460.png) | `Mint Cool Vivid 60` | `0.100` | `hsl(177, 74%, 23%)` / `#0F6460` | `--mint-cool-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/008480.png) | `Mint Cool Vivid 50` | `0.180` | `hsl(178, 100%, 26%)` / `#008480` | `--mint-cool-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/36A191.png) | `Mint Cool Vivid 40` | `0.283` | `hsl(171, 50%, 42%)` / `#36A191` | `--mint-cool-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/1DC2AE.png) | `Mint Cool Vivid 30` | `0.419` | `hsl(173, 74%, 44%)` / `#1DC2AE` | `--mint-cool-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/40E0D0.png) | `Mint Cool Vivid 20` | `0.589` | `hsl(174, 72%, 56%)` / `#40E0D0` | `--mint-cool-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/7EFBE1.png) | `Mint Cool Vivid 10` | `0.788` | `hsl(168, 94%, 74%)` / `#7EFBE1` | `--mint-cool-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/D5FBF3.png) | `Mint Cool Vivid 5` | `0.896` | `hsl(167, 83%, 91%)` / `#D5FBF3` | `--mint-cool-vivid-5` |

### Cyan [Link para seção Cyan](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#cyan)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/111819.png) | `Cyan 90` | `0.008` | `hsl(188, 19%, 8%)` / `#111819` | `--cyan-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/203133.png) | `Cyan 80` | `0.027` | `hsl(186, 23%, 16%)` / `#203133` | `--cyan-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/2C4A4E.png) | `Cyan 70` | `0.059` | `hsl(187, 28%, 24%)` / `#2C4A4E` | `--cyan-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/2A646D.png) | `Cyan 60` | `0.107` | `hsl(188, 44%, 30%)` / `#2A646D` | `--cyan-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/168092.png) | `Cyan 50` | `0.176` | `hsl(189, 74%, 33%)` / `#168092` | `--cyan-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/449DAC.png) | `Cyan 40` | `0.283` | `hsl(189, 43%, 47%)` / `#449DAC` | `--cyan-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/5DC0D1.png) | `Cyan 30` | `0.446` | `hsl(189, 56%, 59%)` / `#5DC0D1` | `--cyan-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/99DEEA.png) | `Cyan 20` | `0.649` | `hsl(189, 66%, 76%)` / `#99DEEA` | `--cyan-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/CCECF2.png) | `Cyan 10` | `0.792` | `hsl(189, 59%, 87%)` / `#CCECF2` | `--cyan-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E7F6F8.png) | `Cyan 5` | `0.896` | `hsl(187, 55%, 94%)` / `#E7F6F8` | `--cyan-5` |

### Cyan Vivid [Link para seção Cyan Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#cyan-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/093B44.png) | `Cyan Vivid 80` | `0.036` | `hsl(189, 77%, 15%)` / `#093B44` | `--cyan-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/0E4F5C.png) | `Cyan Vivid 70` | `0.064` | `hsl(190, 74%, 21%)` / `#0E4F5C` | `--cyan-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/00687D.png) | `Cyan Vivid 60` | `0.113` | `hsl(190, 100%, 25%)` / `#00687D` | `--cyan-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/0081A1.png) | `Cyan Vivid 50` | `0.182` | `hsl(192, 100%, 32%)` / `#0081A1` | `--cyan-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/009EC1.png) | `Cyan Vivid 40` | `0.283` | `hsl(191, 100%, 38%)` / `#009EC1` | `--cyan-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/00BDE3.png) | `Cyan Vivid 30` | `0.419` | `hsl(190, 100%, 45%)` / `#00BDE3` | `--cyan-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/52DAF2.png) | `Cyan Vivid 20` | `0.583` | `hsl(189, 86%, 64%)` / `#52DAF2` | `--cyan-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/A8F2FF.png) | `Cyan Vivid 10` | `0.790` | `hsl(189, 100%, 83%)` / `#A8F2FF` | `--cyan-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E5FAFF.png) | `Cyan Vivid 5` | `0.922` | `hsl(192, 100%, 95%)` / `#E5FAFF` | `--cyan-vivid-5` |

### Blue [Link para seção Blue](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#blue)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/11181D.png) | `Blue 90` | `0.008` | `hsl(205, 26%, 9%)` / `#11181D` | `--blue-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/1F303E.png) | `Blue 80` | `0.027` | `hsl(207, 33%, 18%)` / `#1F303E` | `--blue-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/274863.png) | `Blue 70` | `0.059` | `hsl(207, 43%, 27%)` / `#274863` | `--blue-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/2C608A.png) | `Blue 60` | `0.107` | `hsl(207, 52%, 36%)` / `#2C608A` | `--blue-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/2378C3.png) | `Blue 50` | `0.177` | `hsl(208, 70%, 45%)` / `#2378C3` | `--blue-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/4F97D1.png) | `Blue 40` | `0.283` | `hsl(207, 59%, 56%)` / `#4F97D1` | `--blue-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/73B3E7.png) | `Blue 30` | `0.416` | `hsl(207, 71%, 68%)` / `#73B3E7` | `--blue-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/AACDEC.png) | `Blue 20` | `0.582` | `hsl(208, 63%, 80%)` / `#AACDEC` | `--blue-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/DBE8FB.png) | `Blue 10` | `0.797` | `hsl(216, 80%, 92%)` / `#DBE8FB` | `--blue-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/EFF6FB.png) | `Blue 5` | `0.912` | `hsl(205, 60%, 96%)` / `#EFF6FB` | `--blue-5` |

### Blue Vivid [Link para seção Blue Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#blue-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/112F4E.png) | `Blue Vivid 80` | `0.027` | `hsl(210, 64%, 19%)` / `#112F4E` | `--blue-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/0B4778.png) | `Blue Vivid 70` | `0.059` | `hsl(207, 83%, 26%)` / `#0B4778` | `--blue-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/005EA2.png) | `Blue Vivid 60` | `0.106` | `hsl(205, 100%, 32%)` / `#005EA2` | `--blue-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/0076D6.png) | `Blue Vivid 50` | `0.178` | `hsl(207, 100%, 42%)` / `#0076D6` | `--blue-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/2491FF.png) | `Blue Vivid 40` | `0.278` | `hsl(210, 100%, 57%)` / `#2491FF` | `--blue-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/58B4FF.png) | `Blue Vivid 30` | `0.419` | `hsl(207, 100%, 67%)` / `#58B4FF` | `--blue-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/A1D3FF.png) | `Blue Vivid 20` | `0.613` | `hsl(208, 100%, 82%)` / `#A1D3FF` | `--blue-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/CFE8FF.png) | `Blue Vivid 10` | `0.781` | `hsl(209, 100%, 91%)` / `#CFE8FF` | `--blue-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E8F5FF.png) | `Blue Vivid 5` | `0.896` | `hsl(206, 100%, 95%)` / `#E8F5FF` | `--blue-vivid-5` |

### Blue Cool [Link para seção Blue Cool](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#blue-cool)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/0F191C.png) | `Blue Cool 90` | `0.008` | `hsl(194, 30%, 8%)` / `#0F191C` | `--blue-cool-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/14333D.png) | `Blue Cool 80` | `0.028` | `hsl(195, 51%, 16%)` / `#14333D` | `--blue-cool-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/224A58.png) | `Blue Cool 70` | `0.059` | `hsl(196, 44%, 24%)` / `#224A58` | `--blue-cool-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/2E6276.png) | `Blue Cool 60` | `0.106` | `hsl(197, 44%, 32%)` / `#2E6276` | `--blue-cool-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/3A7D95.png) | `Blue Cool 50` | `0.177` | `hsl(196, 44%, 41%)` / `#3A7D95` | `--blue-cool-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/6499AF.png) | `Blue Cool 40` | `0.285` | `hsl(198, 32%, 54%)` / `#6499AF` | `--blue-cool-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/82B4C9.png) | `Blue Cool 30` | `0.416` | `hsl(198, 40%, 65%)` / `#82B4C9` | `--blue-cool-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/ADCFDC.png) | `Blue Cool 20` | `0.586` | `hsl(197, 40%, 77%)` / `#ADCFDC` | `--blue-cool-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/DAE9EE.png) | `Blue Cool 10` | `0.793` | `hsl(195, 37%, 89%)` / `#DAE9EE` | `--blue-cool-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E7F2F5.png) | `Blue Cool 5` | `0.870` | `hsl(193, 41%, 93%)` / `#E7F2F5` | `--blue-cool-5` |

### Blue Cool Vivid [Link para seção Blue Cool Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#blue-cool-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/002D3F.png) | `Blue Cool Vivid 80` | `0.022` | `hsl(197, 100%, 12%)` / `#002D3F` | `--blue-cool-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/074B69.png) | `Blue Cool Vivid 70` | `0.060` | `hsl(198, 87%, 22%)` / `#074B69` | `--blue-cool-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/07648D.png) | `Blue Cool Vivid 60` | `0.110` | `hsl(198, 91%, 29%)` / `#07648D` | `--blue-cool-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/0D7EA2.png) | `Blue Cool Vivid 50` | `0.176` | `hsl(194, 85%, 34%)` / `#0D7EA2` | `--blue-cool-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/28A0CB.png) | `Blue Cool Vivid 40` | `0.299` | `hsl(196, 67%, 48%)` / `#28A0CB` | `--blue-cool-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/59B9DE.png) | `Blue Cool Vivid 30` | `0.420` | `hsl(197, 67%, 61%)` / `#59B9DE` | `--blue-cool-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/97D4EA.png) | `Blue Cool Vivid 20` | `0.596` | `hsl(196, 66%, 75%)` / `#97D4EA` | `--blue-cool-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/C3EBFA.png) | `Blue Cool Vivid 10` | `0.779` | `hsl(196, 85%, 87%)` / `#C3EBFA` | `--blue-cool-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E1F3F8.png) | `Blue Cool Vivid 5` | `0.868` | `hsl(193, 62%, 93%)` / `#E1F3F8` | `--blue-cool-vivid-5` |

### Blue Warm [Link para seção Blue Warm](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#blue-warm)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/13171F.png) | `Blue Warm 90` | `0.008` | `hsl(220, 24%, 10%)` / `#13171F` | `--blue-warm-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/252F3E.png) | `Blue Warm 80` | `0.027` | `hsl(216, 25%, 19%)` / `#252F3E` | `--blue-warm-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/2F4668.png) | `Blue Warm 70` | `0.059` | `hsl(216, 38%, 30%)` / `#2F4668` | `--blue-warm-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/345D96.png) | `Blue Warm 60` | `0.107` | `hsl(215, 49%, 40%)` / `#345D96` | `--blue-warm-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/4A77B4.png) | `Blue Warm 50` | `0.179` | `hsl(215, 42%, 50%)` / `#4A77B4` | `--blue-warm-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/7292C7.png) | `Blue Warm 40` | `0.282` | `hsl(217, 43%, 61%)` / `#7292C7` | `--blue-warm-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/98AFD2.png) | `Blue Warm 30` | `0.419` | `hsl(216, 39%, 71%)` / `#98AFD2` | `--blue-warm-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/C5D4EB.png) | `Blue Warm 20` | `0.649` | `hsl(216, 49%, 85%)` / `#C5D4EB` | `--blue-warm-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E1E7F1.png) | `Blue Warm 10` | `0.795` | `hsl(218, 36%, 91%)` / `#E1E7F1` | `--blue-warm-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/ECF1F7.png) | `Blue Warm 5` | `0.874` | `hsl(213, 41%, 95%)` / `#ECF1F7` | `--blue-warm-5` |

### Blue Warm Vivid [Link para seção Blue Warm Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#blue-warm-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/071D41.png) | `Blue Warm Vivid 90` | `0.013` | `hsl(217, 81%, 14%)` / `#071D41` | `--blue-warm-vivid-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/0C326F.png) | `Blue Warm Vivid 80` | `0.035` | `hsl(217, 80%, 24%)` / `#0C326F` | `--blue-warm-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/1351B4.png) | `Blue Warm Vivid 70` | `0.093` | `hsl(217, 81%, 39%)` / `#1351B4` | `--blue-warm-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/155BCB.png) | `Blue Warm Vivid 60` | `0.119` | `hsl(217, 81%, 44%)` / `#155BCB` | `--blue-warm-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/2670E8.png) | `Blue Warm Vivid 50` | `0.178` | `hsl(217, 81%, 53%)` / `#2670E8` | `--blue-warm-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/5992ED.png) | `Blue Warm Vivid 40` | `0.287` | `hsl(217, 80%, 64%)` / `#5992ED` | `--blue-warm-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/81AEFC.png) | `Blue Warm Vivid 30` | `0.419` | `hsl(218, 95%, 75%)` / `#81AEFC` | `--blue-warm-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/ADCDFF.png) | `Blue Warm Vivid 20` | `0.597` | `hsl(217, 100%, 84%)` / `#ADCDFF` | `--blue-warm-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/D4E5FF.png) | `Blue Warm Vivid 10` | `0.772` | `hsl(216, 100%, 92%)` / `#D4E5FF` | `--blue-warm-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/EDF5FF.png) | `Blue Warm Vivid 5` | `0.905` | `hsl(213, 100%, 96%)` / `#EDF5FF` | `--blue-warm-vivid-5` |

### Indigo [Link para seção Indigo](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#indigo)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/16171F.png) | `Indigo 90` | `0.008` | `hsl(233, 17%, 10%)` / `#16171F` | `--indigo-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/2B2C40.png) | `Indigo 80` | `0.026` | `hsl(237, 20%, 21%)` / `#2B2C40` | `--indigo-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/3D4076.png) | `Indigo 70` | `0.059` | `hsl(237, 32%, 35%)` / `#3D4076` | `--indigo-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/4D52AF.png) | `Indigo 60` | `0.107` | `hsl(237, 39%, 49%)` / `#4D52AF` | `--indigo-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/676CC8.png) | `Indigo 50` | `0.177` | `hsl(237, 47%, 59%)` / `#676CC8` | `--indigo-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/8889DB.png) | `Indigo 40` | `0.282` | `hsl(239, 54%, 70%)` / `#8889DB` | `--indigo-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/A5A8EB.png) | `Indigo 30` | `0.420` | `hsl(237, 64%, 78%)` / `#A5A8EB` | `--indigo-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/C5C5F3.png) | `Indigo 20` | `0.582` | `hsl(240, 66%, 86%)` / `#C5C5F3` | `--indigo-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E5E4FA.png) | `Indigo 10` | `0.790` | `hsl(243, 69%, 94%)` / `#E5E4FA` | `--indigo-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/EFEFF8.png) | `Indigo 5` | `0.868` | `hsl(240, 39%, 95%)` / `#EFEFF8` | `--indigo-5` |

### Indigo Vivid [Link para seção Indigo Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#indigo-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/212463.png) | `Indigo Vivid 80` | `0.024` | `hsl(237, 50%, 26%)` / `#212463` | `--indigo-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/3333A3.png) | `Indigo Vivid 70` | `0.057` | `hsl(240, 52%, 42%)` / `#3333A3` | `--indigo-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/4A50C4.png) | `Indigo Vivid 60` | `0.111` | `hsl(237, 51%, 53%)` / `#4A50C4` | `--indigo-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/656BD7.png) | `Indigo Vivid 50` | `0.181` | `hsl(237, 59%, 62%)` / `#656BD7` | `--indigo-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/8289FF.png) | `Indigo Vivid 40` | `0.298` | `hsl(237, 100%, 75%)` / `#8289FF` | `--indigo-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/A3A7FA.png) | `Indigo Vivid 30` | `0.423` | `hsl(237, 90%, 81%)` / `#A3A7FA` | `--indigo-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/CCCEFF.png) | `Indigo Vivid 20` | `0.641` | `hsl(238, 100%, 90%)` / `#CCCEFF` | `--indigo-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E0E0FF.png) | `Indigo Vivid 10` | `0.763` | `hsl(240, 100%, 94%)` / `#E0E0FF` | `--indigo-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F0F0FF.png) | `Indigo Vivid 5` | `0.880` | `hsl(240, 100%, 97%)` / `#F0F0FF` | `--indigo-vivid-5` |

### Indigo Cool [Link para seção Indigo Cool](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#indigo-cool)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/151622.png) | `Indigo Cool 90` | `0.008` | `hsl(235, 24%, 11%)` / `#151622` | `--indigo-cool-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/292D42.png) | `Indigo Cool 80` | `0.027` | `hsl(230, 23%, 21%)` / `#292D42` | `--indigo-cool-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/374274.png) | `Indigo Cool 70` | `0.059` | `hsl(229, 36%, 34%)` / `#374274` | `--indigo-cool-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/3F57A6.png) | `Indigo Cool 60` | `0.106` | `hsl(226, 45%, 45%)` / `#3F57A6` | `--indigo-cool-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/496FD8.png) | `Indigo Cool 50` | `0.177` | `hsl(224, 65%, 57%)` / `#496FD8` | `--indigo-cool-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/6B8EE8.png) | `Indigo Cool 40` | `0.282` | `hsl(223, 73%, 66%)` / `#6B8EE8` | `--indigo-cool-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/96ABEE.png) | `Indigo Cool 30` | `0.417` | `hsl(226, 72%, 76%)` / `#96ABEE` | `--indigo-cool-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/BBC8F5.png) | `Indigo Cool 20` | `0.584` | `hsl(227, 74%, 85%)` / `#BBC8F5` | `--indigo-cool-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E1E6F9.png) | `Indigo Cool 10` | `0.794` | `hsl(227, 67%, 93%)` / `#E1E6F9` | `--indigo-cool-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/EEF0F9.png) | `Indigo Cool 5` | `0.873` | `hsl(229, 48%, 95%)` / `#EEF0F9` | `--indigo-cool-5` |

### Indigo Cool Vivid [Link para seção Indigo Cool Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#indigo-cool-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/1B2B85.png) | `Indigo Cool Vivid 80` | `0.036` | `hsl(231, 66%, 31%)` / `#1B2B85` | `--indigo-cool-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/222FBF.png) | `Indigo Cool Vivid 70` | `0.061` | `hsl(235, 70%, 44%)` / `#222FBF` | `--indigo-cool-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/3E4DED.png) | `Indigo Cool Vivid 60` | `0.124` | `hsl(235, 83%, 59%)` / `#3E4DED` | `--indigo-cool-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/4866FF.png) | `Indigo Cool Vivid 50` | `0.181` | `hsl(230, 100%, 64%)` / `#4866FF` | `--indigo-cool-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/628EF4.png) | `Indigo Cool Vivid 40` | `0.284` | `hsl(222, 87%, 67%)` / `#628EF4` | `--indigo-cool-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/94ADFF.png) | `Indigo Cool Vivid 30` | `0.434` | `hsl(226, 100%, 79%)` / `#94ADFF` | `--indigo-cool-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/B8C8FF.png) | `Indigo Cool Vivid 20` | `0.587` | `hsl(226, 100%, 86%)` / `#B8C8FF` | `--indigo-cool-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/DEE5FF.png) | `Indigo Cool Vivid 10` | `0.787` | `hsl(227, 100%, 94%)` / `#DEE5FF` | `--indigo-cool-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/EDF0FF.png) | `Indigo Cool Vivid 5` | `0.875` | `hsl(230, 100%, 96%)` / `#EDF0FF` | `--indigo-cool-vivid-5` |

### Indigo Warm [Link para seção Indigo Warm](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#indigo-warm)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/18161D.png) | `Indigo Warm 90` | `0.008` | `hsl(257, 14%, 10%)` / `#18161D` | `--indigo-warm-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/2E2C40.png) | `Indigo Warm 80` | `0.027` | `hsl(246, 19%, 21%)` / `#2E2C40` | `--indigo-warm-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/453C7B.png) | `Indigo Warm 70` | `0.059` | `hsl(249, 34%, 36%)` / `#453C7B` | `--indigo-warm-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/5E519E.png) | `Indigo Warm 60` | `0.107` | `hsl(250, 32%, 47%)` / `#5E519E` | `--indigo-warm-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/7665D1.png) | `Indigo Warm 50` | `0.177` | `hsl(249, 54%, 61%)` / `#7665D1` | `--indigo-warm-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/9287D8.png) | `Indigo Warm 40` | `0.283` | `hsl(248, 51%, 69%)` / `#9287D8` | `--indigo-warm-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/AFA5E8.png) | `Indigo Warm 30` | `0.418` | `hsl(249, 59%, 78%)` / `#AFA5E8` | `--indigo-warm-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/CBC4F2.png) | `Indigo Warm 20` | `0.585` | `hsl(249, 64%, 86%)` / `#CBC4F2` | `--indigo-warm-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E7E3FA.png) | `Indigo Warm 10` | `0.788` | `hsl(250, 70%, 94%)` / `#E7E3FA` | `--indigo-warm-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F1EFF7.png) | `Indigo Warm 5` | `0.871` | `hsl(255, 33%, 95%)` / `#F1EFF7` | `--indigo-warm-5` |

### Indigo Warm Vivid [Link para seção Indigo Warm Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#indigo-warm-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/261F5B.png) | `Indigo Warm Vivid 80` | `0.021` | `hsl(247, 49%, 24%)` / `#261F5B` | `--indigo-warm-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/3D2C9D.png) | `Indigo Warm Vivid 70` | `0.052` | `hsl(249, 56%, 39%)` / `#3D2C9D` | `--indigo-warm-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/5942D2.png) | `Indigo Warm Vivid 60` | `0.106` | `hsl(250, 62%, 54%)` / `#5942D2` | `--indigo-warm-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/745FE9.png) | `Indigo Warm Vivid 50` | `0.177` | `hsl(249, 76%, 64%)` / `#745FE9` | `--indigo-warm-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/967EFB.png) | `Indigo Warm Vivid 40` | `0.283` | `hsl(252, 94%, 74%)` / `#967EFB` | `--indigo-warm-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/B69FFF.png) | `Indigo Warm Vivid 30` | `0.419` | `hsl(254, 100%, 81%)` / `#B69FFF` | `--indigo-warm-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/CFC4FD.png) | `Indigo Warm Vivid 20` | `0.598` | `hsl(252, 93%, 88%)` / `#CFC4FD` | `--indigo-warm-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E4DEFF.png) | `Indigo Warm Vivid 10` | `0.759` | `hsl(251, 100%, 94%)` / `#E4DEFF` | `--indigo-warm-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F5F2FF.png) | `Indigo Warm Vivid 5` | `0.901` | `hsl(254, 100%, 97%)` / `#F5F2FF` | `--indigo-warm-vivid-5` |

### Violet [Link para seção Violet](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#violet)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/18161D.png) | `Violet 90` | `0.008` | `hsl(257, 14%, 10%)` / `#18161D` | `--violet-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/312B3F.png) | `Violet 80` | `0.027` | `hsl(258, 19%, 21%)` / `#312B3F` | `--violet-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/4C3D69.png) | `Violet 70` | `0.058` | `hsl(260, 27%, 33%)` / `#4C3D69` | `--violet-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/665190.png) | `Violet 60` | `0.107` | `hsl(260, 28%, 44%)` / `#665190` | `--violet-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/8168B3.png) | `Violet 50` | `0.178` | `hsl(260, 33%, 55%)` / `#8168B3` | `--violet-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/9D84D2.png) | `Violet 40` | `0.283` | `hsl(259, 46%, 67%)` / `#9D84D2` | `--violet-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/B8A2E3.png) | `Violet 30` | `0.415` | `hsl(260, 54%, 76%)` / `#B8A2E3` | `--violet-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/D0C3E9.png) | `Violet 20` | `0.583` | `hsl(261, 46%, 84%)` / `#D0C3E9` | `--violet-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/EBE3F9.png) | `Violet 10` | `0.794` | `hsl(262, 65%, 93%)` / `#EBE3F9` | `--violet-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F4F1F9.png) | `Violet 5` | `0.889` | `hsl(263, 40%, 96%)` / `#F4F1F9` | `--violet-5` |

### Violet Vivid [Link para seção Violet Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#violet-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/39215E.png) | `Violet Vivid 80` | `0.027` | `hsl(264, 48%, 25%)` / `#39215E` | `--violet-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/54278F.png) | `Violet Vivid 70` | `0.053` | `hsl(266, 57%, 36%)` / `#54278F` | `--violet-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/783CB9.png) | `Violet Vivid 60` | `0.107` | `hsl(269, 51%, 48%)` / `#783CB9` | `--violet-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/9355DC.png) | `Violet Vivid 50` | `0.178` | `hsl(268, 66%, 60%)` / `#9355DC` | `--violet-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/AD79E9.png) | `Violet Vivid 40` | `0.284` | `hsl(268, 72%, 69%)` / `#AD79E9` | `--violet-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/C39DEB.png) | `Violet Vivid 30` | `0.417` | `hsl(269, 66%, 77%)` / `#C39DEB` | `--violet-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/D5BFFF.png) | `Violet Vivid 20` | `0.586` | `hsl(261, 100%, 87%)` / `#D5BFFF` | `--violet-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/EDE3FF.png) | `Violet Vivid 10` | `0.801` | `hsl(261, 100%, 95%)` / `#EDE3FF` | `--violet-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F7F2FF.png) | `Violet Vivid 5` | `0.904` | `hsl(263, 100%, 97%)` / `#F7F2FF` | `--violet-vivid-5` |

### Violet Warm [Link para seção Violet Warm](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#violet-warm)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/1B151B.png) | `Violet Warm 90` | `0.008` | `hsl(300, 13%, 9%)` / `#1B151B` | `--violet-warm-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/382936.png) | `Violet Warm 80` | `0.026` | `hsl(308, 15%, 19%)` / `#382936` | `--violet-warm-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/5C395A.png) | `Violet Warm 70` | `0.059` | `hsl(303, 23%, 29%)` / `#5C395A` | `--violet-warm-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/864381.png) | `Violet Warm 60` | `0.106` | `hsl(304, 33%, 39%)` / `#864381` | `--violet-warm-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/B04ABD.png) | `Violet Warm 50` | `0.178` | `hsl(293, 47%, 52%)` / `#B04ABD` | `--violet-warm-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/BF77C8.png) | `Violet Warm 40` | `0.284` | `hsl(293, 42%, 63%)` / `#BF77C8` | `--violet-warm-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/D29AD8.png) | `Violet Warm 30` | `0.417` | `hsl(294, 44%, 73%)` / `#D29AD8` | `--violet-warm-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E2BEE4.png) | `Violet Warm 20` | `0.585` | `hsl(297, 41%, 82%)` / `#E2BEE4` | `--violet-warm-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F6DFF8.png) | `Violet Warm 10` | `0.791` | `hsl(295, 64%, 92%)` / `#F6DFF8` | `--violet-warm-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F8F0F9.png) | `Violet Warm 5` | `0.891` | `hsl(293, 43%, 96%)` / `#F8F0F9` | `--violet-warm-5` |

### Violet Warm Vivid [Link para seção Violet Warm Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#violet-warm-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/481441.png) | `Violet Warm Vivid 80` | `0.022` | `hsl(308, 57%, 18%)` / `#481441` | `--violet-warm-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/711E6C.png) | `Violet Warm Vivid 70` | `0.055` | `hsl(304, 58%, 28%)` / `#711E6C` | `--violet-warm-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/93348C.png) | `Violet Warm Vivid 60` | `0.105` | `hsl(304, 48%, 39%)` / `#93348C` | `--violet-warm-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/BE32D0.png) | `Violet Warm Vivid 50` | `0.177` | `hsl(293, 63%, 51%)` / `#BE32D0` | `--violet-warm-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/D85BEF.png) | `Violet Warm Vivid 40` | `0.283` | `hsl(291, 82%, 65%)` / `#D85BEF` | `--violet-warm-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/EE83FF.png) | `Violet Warm Vivid 30` | `0.416` | `hsl(292, 100%, 76%)` / `#EE83FF` | `--violet-warm-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F4B2FF.png) | `Violet Warm Vivid 20` | `0.582` | `hsl(291, 100%, 85%)` / `#F4B2FF` | `--violet-warm-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FBDCFF.png) | `Violet Warm Vivid 10` | `0.789` | `hsl(293, 100%, 93%)` / `#FBDCFF` | `--violet-warm-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FEF2FF.png) | `Violet Warm Vivid 5` | `0.917` | `hsl(295, 100%, 97%)` / `#FEF2FF` | `--violet-warm-vivid-5` |

### Magenta [Link para seção Magenta](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#magenta)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/1B1617.png) | `Magenta 90` | `0.008` | `hsl(348, 10%, 10%)` / `#1B1617` | `--magenta-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/402731.png) | `Magenta 80` | `0.027` | `hsl(336, 24%, 20%)` / `#402731` | `--magenta-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/66364B.png) | `Magenta 70` | `0.059` | `hsl(334, 31%, 31%)` / `#66364B` | `--magenta-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/8B4566.png) | `Magenta 60` | `0.107` | `hsl(332, 34%, 41%)` / `#8B4566` | `--magenta-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/C84281.png) | `Magenta 50` | `0.177` | `hsl(332, 55%, 52%)` / `#C84281` | `--magenta-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E0699F.png) | `Magenta 40` | `0.284` | `hsl(333, 66%, 65%)` / `#E0699F` | `--magenta-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E895B3.png) | `Magenta 30` | `0.419` | `hsl(338, 64%, 75%)` / `#E895B3` | `--magenta-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F0BBCC.png) | `Magenta 20` | `0.584` | `hsl(341, 64%, 84%)` / `#F0BBCC` | `--magenta-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F6E1E8.png) | `Magenta 10` | `0.792` | `hsl(340, 54%, 92%)` / `#F6E1E8` | `--magenta-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F9F0F2.png) | `Magenta 5` | `0.888` | `hsl(347, 43%, 96%)` / `#F9F0F2` | `--magenta-5` |

### Magenta Vivid [Link para seção Magenta Vivid](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#magenta-vivid)

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/4F172E.png) | `Magenta Vivid 80` | `0.024` | `hsl(335, 55%, 20%)` / `#4F172E` | `--magenta-vivid-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/731F44.png) | `Magenta Vivid 70` | `0.050` | `hsl(334, 58%, 29%)` / `#731F44` | `--magenta-vivid-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/AB2165.png) | `Magenta Vivid 60` | `0.106` | `hsl(330, 68%, 40%)` / `#AB2165` | `--magenta-vivid-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/D72D79.png) | `Magenta Vivid 50` | `0.177` | `hsl(333, 68%, 51%)` / `#D72D79` | `--magenta-vivid-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FD4496.png) | `Magenta Vivid 40` | `0.272` | `hsl(333, 98%, 63%)` / `#FD4496` | `--magenta-vivid-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FF87B2.png) | `Magenta Vivid 30` | `0.418` | `hsl(339, 100%, 76%)` / `#FF87B2` | `--magenta-vivid-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FFB4CF.png) | `Magenta Vivid 20` | `0.584` | `hsl(338, 100%, 85%)` / `#FFB4CF` | `--magenta-vivid-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FFDDEA.png) | `Magenta Vivid 10` | `0.789` | `hsl(337, 100%, 93%)` / `#FFDDEA` | `--magenta-vivid-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FFF2F5.png) | `Magenta Vivid 5` | `0.913` | `hsl(346, 100%, 97%)` / `#FFF2F5` | `--magenta-vivid-5` |

### Gray [Link para seção Gray](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#gray)

A família `Gray` utiliza cores sem saturação entro de um círculo cromático. Representa uma família neutra.

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/1B1B1B.png) | `Gray 90` | `0.010` | `hsl(0, 0%, 11%)` / `#1B1B1B` | `--gray-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/333333.png) | `Gray 80` | `0.033` | `hsl(0, 0%, 20%)` / `#333333` | `--gray-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/555555.png) | `Gray 70` | `0.090` | `hsl(0, 0%, 33%)` / `#555555` | `--gray-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/636363.png) | `Gray 60` | `0.124` | `hsl(0, 0%, 39%)` / `#636363` | `--gray-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/757575.png) | `Gray 50` | `0.177` | `hsl(0, 0%, 46%)` / `#757575` | `--gray-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/888888.png) | `Gray 40` | `0.246` | `hsl(0, 0%, 53%)` / `#888888` | `--gray-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/ADADAD.png) | `Gray 30` | `0.417` | `hsl(0, 0%, 68%)` / `#ADADAD` | `--gray-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/CCCCCC.png) | `Gray 20` | `0.603` | `hsl(0, 0%, 80%)` / `#CCCCCC` | `--gray-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E6E6E6.png) | `Gray 10` | `0.791` | `hsl(0, 0%, 90%)` / `#E6E6E6` | `--gray-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F0F0F0.png) | `Gray 5` | `0.871` | `hsl(0, 0%, 94%)` / `#F0F0F0` | `--gray-5` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F3F3F3.png) | `Gray 4` | `0.896` | `hsl(0, 0%, 95%)` / `#F3F3F3` | `--gray-4` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F6F6F6.png) | `Gray 3` | `0.921` | `hsl(0, 0%, 96%)` / `#F6F6F6` | `--gray-3` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F8F8F8.png) | `Gray 2` | `0.938` | `hsl(0, 0%, 97%)` / `#F8F8F8` | `--gray-2` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FCFCFC.png) | `Gray 1` | `0.973` | `hsl(0, 0%, 99%)` / `#FCFCFC` | `--gray-1` |

### Gray Cool [Link para seção Gray Cool](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#gray-cool)

A família `Gray Cool` utiliza cores com mínima saturação dentro de um círculo cromático. Representa uma família neutra com “tons frios” (azulado).

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/1C1D1F.png) | `Gray Cool 90` | `0.012` | `hsl(220, 5%, 12%)` / `#1C1D1F` | `--gray-cool-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/2D2E2F.png) | `Gray Cool 80` | `0.027` | `hsl(210, 2%, 18%)` / `#2D2E2F` | `--gray-cool-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/3D4551.png) | `Gray Cool 70` | `0.058` | `hsl(216, 14%, 28%)` / `#3D4551` | `--gray-cool-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/565C65.png) | `Gray Cool 60` | `0.105` | `hsl(216, 8%, 37%)` / `#565C65` | `--gray-cool-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/71767A.png) | `Gray Cool 50` | `0.178` | `hsl(207, 4%, 46%)` / `#71767A` | `--gray-cool-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/8D9297.png) | `Gray Cool 40` | `0.284` | `hsl(210, 5%, 57%)` / `#8D9297` | `--gray-cool-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/A9AEB1.png) | `Gray Cool 30` | `0.418` | `hsl(202, 5%, 68%)` / `#A9AEB1` | `--gray-cool-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/C6CACE.png) | `Gray Cool 20` | `0.587` | `hsl(210, 8%, 79%)` / `#C6CACE` | `--gray-cool-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/DFE1E2.png) | `Gray Cool 10` | `0.750` | `hsl(200, 5%, 88%)` / `#DFE1E2` | `--gray-cool-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/EDEFF0.png) | `Gray Cool 5` | `0.860` | `hsl(200, 9%, 94%)` / `#EDEFF0` | `--gray-cool-5` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F1F3F6.png) | `Gray Cool 4` | `0.894` | `hsl(216, 22%, 95%)` / `#F1F3F6` | `--gray-cool-4` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F5F6F7.png) | `Gray Cool 3` | `0.920` | `hsl(210, 11%, 96%)` / `#F5F6F7` | `--gray-cool-3` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F7F9FA.png) | `Gray Cool 2` | `0.944` | `hsl(200, 23%, 97%)` / `#F7F9FA` | `--gray-cool-2` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FBFCFD.png) | `Gray Cool 1` | `0.972` | `hsl(210, 33%, 99%)` / `#FBFCFD` | `--gray-cool-1` |

### Gray Warm [Link para seção Gray Warm](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#gray-warm)

A família `Gray Warm` utiliza cores com mínima saturação dentro de um círculo cromático. Representa uma família neutra com “tons quentes” (amarelados).

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/171716.png) | `Gray Warm 90` | `0.008` | `hsl(60, 2%, 9%)` / `#171716` | `--gray-warm-90` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/2E2E2A.png) | `Gray Warm 80` | `0.027` | `hsl(60, 5%, 17%)` / `#2E2E2A` | `--gray-warm-80` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/454540.png) | `Gray Warm 70` | `0.058` | `hsl(60, 4%, 26%)` / `#454540` | `--gray-warm-70` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/5D5D52.png) | `Gray Warm 60` | `0.107` | `hsl(60, 6%, 34%)` / `#5D5D52` | `--gray-warm-60` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/76766A.png) | `Gray Warm 50` | `0.178` | `hsl(60, 5%, 44%)` / `#76766A` | `--gray-warm-50` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/929285.png) | `Gray Warm 40` | `0.283` | `hsl(60, 6%, 55%)` / `#929285` | `--gray-warm-40` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/AFAEA2.png) | `Gray Warm 30` | `0.419` | `hsl(55, 8%, 66%)` / `#AFAEA2` | `--gray-warm-30` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/CAC9C0.png) | `Gray Warm 20` | `0.581` | `hsl(54, 9%, 77%)` / `#CAC9C0` | `--gray-warm-20` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E6E6E2.png) | `Gray Warm 10` | `0.789` | `hsl(60, 7%, 89%)` / `#E6E6E2` | `--gray-warm-10` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F0F0EC.png) | `Gray Warm 5` | `0.869` | `hsl(60, 12%, 93%)` / `#F0F0EC` | `--gray-warm-5` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F5F5F0.png) | `Gray Warm 4` | `0.910` | `hsl(60, 20%, 95%)` / `#F5F5F0` | `--gray-warm-4` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F6F6F2.png) | `Gray Warm 3` | `0.919` | `hsl(60, 18%, 96%)` / `#F6F6F2` | `--gray-warm-3` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F9F9F7.png) | `Gray Warm 2` | `0.946` | `hsl(60, 14%, 97%)` / `#F9F9F7` | `--gray-warm-2` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FCFCFB.png) | `Gray Warm 1` | `0.972` | `hsl(60, 14%, 99%)` / `#FCFCFB` | `--gray-warm-1` |

### Pure [Link para seção Pure](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#pure)

Esta família possui uma característica especial, que representa os extremos puros da luminância (branco e preto). Na prática, esta família pode estar presente em qualquer outra família da Paleta do Design System quando ampliada ou reduzida a luminância ao seu extremo, independente do matiz ou saturação. Por tanto, sua identificação como uma família de cores independente tem apenas objetivo didático.

| Cor | Nome da Cor | Luminância | HSL / Hexadecimal | Token |
| :-: | :-: | :-: | :-: | :-: |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/000000.png) | `Pure 100` | `0.000` | `hsl(0, 0%, 0%)` / `#000000` | `--pure-100` |
| ![Paletas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FFFFFF.png) | `Pure 0` | `1.000` | `hsl(0, 0%, 100%)` / `#FFFFFF` | `--pure-0` |

* * *

## Tabela de Contraste [Link para seção Tabela de Contraste](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#tabela-de-contraste)

A seguir criamos uma tabela de contrastes com as principais cores das paletas apresentadas acima.

No _eixo horizontal_ temos as principais cores utilizadas para textos e ícones e no _eixo vertical_, as principais cores utilizadas para superfícies.

**Legendas:**

- _AAA:_ passa no nível AAA para texto de qualquer tamanho.
- _AA:_ passa no nível AA para texto de qualquer tamanho e AAA para texto grande (acima de 18pt ou _bold_ acima de 14pt).
- _x:_ Contraste abaixo de 4,5. Não é recomendado no sistema de cores do Design System.
- _(número):_ taxa de contraste segundo a WCAG 2.1.

| Superfície/Texto | ![#FFFFFF](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FFFFFF.png) #FFFFFF | ![#333333](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/333333.png) #333333 | ![#1351B4](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/1351B4.png) #1351B4 | ![#C5D4EB](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/C5D4EB.png) #C5D4EB |
| --- | :-: | :-: | :-: | :-: |
| ![#FFFFFF](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FFFFFF.png) #FFFFFF | — | AAA (12,63) | AAA (7,33) | x |
| ![#F8F8F8](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/F8F8F8.png) #F8F8F8 | x | AAA (11,89) | AA (6,90) | x |
| ![#071D41](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/071D41.png) #071D41 | AAA (16,65) | x | x | AAA (11,09) |
| ![#155BCB](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/155BCB.png) #155BCB | AA (6,19) git | x | x | x |
| ![#D4E5FF](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/D4E5FF.png) #D4E5FF | x | AAA (9,89) | AA (5,74) | x |
| ![#168821](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/168821.png) #168821 | AA (4,58) | x | x | x |
| ![#E3F5E1](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E3F5E1.png) #E3F5E1 | x | AAA (11,07) | AA (6,43) | x |
| ![#FFCD07](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FFCD07.png) #FFCD07 | x | AAA (8,41) | AA (4,88) | x |
| ![#FFF5C2](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FFF5C2.png) #FFF5C2 | x | AAA (11,48) | AA (6,66) | x |
| ![#E52207](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/E52207.png) #E52207 | AA (4,60) | x | x | x |
| ![#FDB8AE](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/cores/imagens/FDB8AE.png) #FDB8AE | x | AAA (7,60) | x | x |

Para checar qualquer combinação de cores não apresentadas na tabela, consulte o _site_ [_Contrast Ratio_](https://contrast-ratio.com/#).

* * *

## Referências [Link para seção Referências](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#referencias)

### Design Systems [Link para seção Design Systems](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#design-systems)

- [U.S. Web Design System (USWDS)](https://designsystem.digital.gov/)
- [Sistema de Cores do Material Design](https://material.io/design/color/the-color-system.html)
- [Carbon Design System](https://www.carbondesignsystem.com/)
- [Spectrum - Adobe Design System](https://spectrum.adobe.com/)

### Ferramentas e Utilitários [Link para seção Ferramentas e Utilitários](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#ferramentas-e-utilitarios)

- [Contrast Ratio](https://contrast-ratio.com/)
- [Color Relative Luminance Calculator](https://www.leserlich.info/werkzeuge/kontrastrechner/index-en.php)
- [Color Kit](https://colorkit.io/shades-tints)
- [Paletton](https://paletton.com/)
- [HSL Color Picker](https://hslpicker.com/)

**Obrigado pelo seu feedback..**

**Seleciona uma opção..**

**Esta informação foi útil?**

* * *

**Gostaria de enviar mais detalhes sobre seu feedback?**

Selecione a opção que melhor descreve sua insatisfação:

Preciso de exemplos mais práticos

Não encontrei a informação que eu desejava

O código apresenta erro ou não funciona como eu esperava

As informações ou exemplos não estão claros.

Enviar

## Utilitários CSS de Cores [Link para seção Utilitários CSS de Cores](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#utilitarios-css-de-cores)

São classes CSS para aplicar o Fundamento Visual Cores.

### Como usar [Link para seção Como usar](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#como-usar)

Modifique a **cor de fundo**, **cor do texto** e **cor da borda** de elementos.

Informe o tipo seguido da cor:

- `bg-*` → Cor de fundo;
- `text-*` → Cor de texto.
- `border-*` → Cor de borda.
- `blue-vivid-50`, `bg-pure-0` → Cores

> **Atenção!** Para criar uma borda, utilize os [utilitários de superfície](https://www.gov.br/ds/fundamentos-visuais/superficie?tab=codigos).

### Nomenclatura das cores [Link para seção Nomenclatura das cores](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#nomenclatura-das-cores)

Use traços para separar partes do nome. Exemplo: “Blue Vivid 50” → `blue-vivid-50`

> Veja todas as cores disponíveis em [Visão Geral](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral#paleta-do-design-system).

### Cores de estado [Link para seção Cores de estado](https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral\#cores-de-estado)

Além das cores da paleta padrão, você pode usar cores de estado:

- `interactive` → cor de interação;
- `danger` → cor de erro/perigo;
- `warning` → cor de alerta;
- `success` → cor de sucesso;
- `info` → cor de informação.

Exemplos: `bg-success`, `text-danger`, `border-warning`

* * *

## Exemplos de códigos

### Cor de fundo

CodePen

Abrir exemplo no CodePen

bg-blue-10

bg-violet-vivid-20

bg-red-cool-20

bg-indigo-warm-10

bg-warning

CodePen

Abrir exemplo no CodePen

```html

<div class="bg-blue-10 p-3">
  <p class="mb-0">bg-blue-10</p>
</div>
<div class="bg-violet-vivid-20 p-3">
  <p class="mb-0">bg-violet-vivid-20</p>
</div>
<div class="bg-red-cool-20 p-3">
  <p class="mb-0">bg-red-cool-20</p>
</div>
<div class="bg-indigo-warm-10 p-3">
  <p class="mb-0">bg-indigo-warm-10</p>
</div>
<div class="bg-warning p-3">
  <p class="mb-0">bg-warning</p>
</div>
```

Copiar

### Cor de texto

CodePen

Abrir exemplo no CodePen

text-blue-50

text-violet-vivid-60

text-red-cool-60

text-indigo-warm-50

text-danger

CodePen

Abrir exemplo no CodePen

```html

<p class="text-blue-50">text-blue-50</p>
<p class="text-violet-vivid-60">text-violet-vivid-60</p>
<p class="text-red-cool-60">text-red-cool-60</p>
<p class="text-indigo-warm-50">text-indigo-warm-50</p>
<p class="text-danger">text-danger</p>
```

Copiar

### Cor de borda

CodePen

Abrir exemplo no CodePen

border-blue-30

border-green-vivid-20

border-red-cool-20

border-indigo-warm-20

CodePen

Abrir exemplo no CodePen

```html

<div class="d-flex flex-column" style="gap: 0.5rem;">
  <div class="border-solid-sm border-blue-30 p-3">
    <p class="mb-0">border-blue-30</p>
  </div>
  <div class="border-solid-md border-green-vivid-20 p-3">
    <p class="mb-0">border-green-vivid-20</p>
  </div>
  <div class="border-solid-lg border-red-cool-20 p-3">
    <p class="mb-0">border-red-cool-20</p>
  </div>
  <div class="border-dashed-lg border-indigo-warm-20 p-3">
    <p class="mb-0">border-indigo-warm-20</p>
  </div>
</div>
```

Copiar

**Obrigado pelo seu feedback..**

**Seleciona uma opção..**

**Esta informação foi útil?**

* * *

**Gostaria de enviar mais detalhes sobre seu feedback?**

Selecione a opção que melhor descreve sua insatisfação:

O documento não atende a minha necessidade.

Há erro ou inconsistência na documentação.

As informações ou exemplos não estão claros.

Não encontrei a informação que procuro.

Enviar
