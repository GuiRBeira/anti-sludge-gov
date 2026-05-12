# Estados [Link para seção Estados](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#estados)

Estados são representações visuais para _feedbacks_ interativos ou informacionais relacionados aos elementos na interface. Devem ser consistentes, estabelecendo confiança entre interface e usuário.

Utilize os estados para comunicar visualmente:

- O tipo de interação que pode ser realizada;
- Uma resposta baseada em uma ação realizado pelo usuário;
- Uma categoria de aviso (erro, sucesso, alerta ou informativa).

* * *

## Princípios [Link para seção Princípios](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#principios)

### Experiência única [Link para seção Experiência única](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#experiencia-unica)

Os Estados devem ser consistentes nos componentes e elementos exibidos para aumentar a usabilidade e ser um padrão reconhecível para o usuário. Caso uma interação produza um _feedback_ inconsistente o usuário pode ficar confuso comprometendo a integridade e experiência proposta.

Quando os estilos definidos neste documento não forem suficientes, faça ajustes utilizando como base outros fundamentos encontrados no _Design System_.

_Observação_: cada estado terá pelo menos uma imagem de exemplo. Essa imagem é apenas um modelo de aplicação do estado descrito, servindo apenas como guia. O Estado deve ser aplicado conforme a necessidade e dentro das recomendações descritas neste documento.

### Eficiência e clareza [Link para seção Eficiência e clareza](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#eficiencia-e-clareza)

Os estilos dos Estados podem ser sutis, porém devem transmitir com clareza sua mensagem. Sua utilização deve ser funcional, e não apenas decorativa. Utilizar-se de transições elaboradas, que criam distrações e ruídos visuais, podem tornar a interface desagradável de se usar.

Na maioria dos estilos definidos, outras características foram adicionadas para otimizar a eficiência do estado, não dependendo apenas da cor como parâmetro único de _feedback_.

A herança de um estado deve ser respeitada. Quando vários estados ocorrem ao mesmo tempo, todos os estilos de estado devem ser exibidos, tendo prioridade os estilos herdados por interação direta do usuário.

> _Por exemplo:_ Em um item de Menu os estilos do estado _Hover_ podem prevalecer sobre os estilos de um estado Ativo, já que o _hover_ é um interação direta do usuário com o elemento.

### Acessibilidade [Link para seção Acessibilidade](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#acessibilidade)

Por tratar-se de representações visuais, os estados devem seguir os princípios de acessibilidade encontrados em [Fundamento Cores](https://www.gov.br/ds/fundamentos-visuais/cores). O estado _Desabilitado_ é uma exceção devido à sua função dentro da interface.

Dependendo do fundo aplicado, o estado do componente deve ser revisto para atender a todos os princípios estabelecidos dos estados. Caso as especificações contidas no estado forem insuficientes para promover um bom contraste entre fundo e texto/ícone, inverta as cores do elemento. Se mesmo assim não houver um contraste satisfatório, utilize as informações localizadas do Fundamento Cores como guia para atender suas necessidades.

Em alguns casos pode ser necessário aumentar as dimensões do fundo para melhorar a legibilidade de um texto ou a compreensão de um ícone quando um estado é aplicado. Quando isso acontecer, tome cuidado para não sobrepor outros elementos: um aumento de 4px ou 8px por exemplo, pode ser suficiente para resolver o problema.

Usuários interagem com a interface de diversas maneiras. Ao projetar um componente, considere o uso de diferentes dispositivos de entrada tais como:

- _Mouse_
- Tela sensível ao toque
- teclado
- Voz
- Controle de vídeo game
- Leitores de Tela (como sintetizadores de voz, _Display_ Braille)

### Reutilização e colaboração [Link para seção Reutilização e colaboração](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#reutilizacao-e-colaboracao)

Os estados definidos devem ser utilizados sempre que possível. Caso necessário, é possível acrescentar um novo estado ou regra ao _Design System_, devendo a nova proposta atender todos os princípios estabelecidos nos estados, além de passar por prévia aprovação da equipe de _design_ do DS.

* * *

## Entendendo os estados [Link para seção Entendendo os estados](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#entendendo-os-estados)

Como os Estados são respostas visuais, utilizamos os parâmetros descritos em cada fundamento do _Design System_ para promover essa alteração gráfica para o usuário. Portanto, é necessário ter entendimento de como funciona cada fundamento (principalmente de Tipografia, Cores e Superfície) para compreender a forma correta de aplicar os estados.

Segue algumas definições importantes aplicadas nos estados no _Design System_ do Governo:

### Texto vs objeto [Link para seção Texto vs objeto](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#texto-vs-objeto)

- _Texto_: conjunto de caracteres. É o texto propriamente dito. É comum que as definições de um texto seja também aplicadas ao ícone, desta forma usaremos o termo _Texto/Ícone_.

> Ex: Um texto interativo seria um _hiperlink_.

- _Objeto_: qualquer elemento que não é compreendido como um texto. Geralmente é um _container_ (superfície) que possui outros elementos dentro. Os elementos contidos no objeto, se existir, podem sofrer também alterações visuais para manter a consistência do estado e de acessibilidade.

> Um objeto interativo pode ser um botão ( _button_).

### Fundo vs primeiro plano [Link para seção Fundo vs primeiro plano](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#fundo-vs-primeiro-plano)

- _Fundo_ ( _background_): área que envolve um texto, ou a superfície de um objeto.
- _Primeiro Plano_ ( _foreground_): texto ou todos os elemento que estão contidos na superfície do objeto que sofreu o Estado (textos, ícones, outros componentes…)

O entendimento entre o que é o Fundo e o Primeiro Plano varia de acordo com a referência, ou seja, _qual elemento está sendo aplicado o estado_.

![Fundo VS Primeiro Plano](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/estados/imagens/background-foreground.png)

_Para um card o botão pode ser o primeiro Plano. Mas se a referência for o próprio botão podemos ter uma outra visão…_

### Fundo claro vs fundo escuro [Link para seção Fundo claro vs fundo escuro](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#fundo-claro-vs-fundo-escuro)

A aplicação de um elemento sobre fundo claro ou escuro pode ser utilizada independente do tema escolhido. Alguns Estados precisam de cuidado no contraste, pois variam de acordo com a cor de fundo utilizada.

Uma regra simples que pode ser utilizada para determinar se um fundo é claro ou escuro consiste em visualizar qual a cor de texto prevista para aquela determinada cor:

- _Fundo Claro_: Se a cor do texto prevista for preta (ou variações escuras), então o fundo é claro.

- _Fundo Escuro_: Se a cor de texto previsto for branca (ou variações claras), então o fundo é escuro.


![Fundo Claro VS Fundo Escuro](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/estados/imagens/fundo-claroescuro.png)

_Nos três primeiros exemplos o texto é escuro, portanto, para gerar contraste é usado o fundo claro. Nos dois últimos exemplos acontece o inverso._

**OBS**: veja o Fundamento Cores para saber o contraste adequado para cada cor.

### _Overlay_ [Link para seção Overlay](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#overlay)

Alguns estados utilizam o conceito de _Overlay_. Overlay é uma aplicação de camada semi transparente sobre um elemento. Os detalhes estão no [Fundamento Superfície](https://www.gov.br/ds/fundamentos-visuais/superficie).

Dependendo da cor do elemento, a opacidade do Overlay deve ser revista para que o destaque seja notado pelo usuário: o valor da opacidade é inversamente proporcional ao brilho da superfície do elemento (cor de fundo), ou seja, quanto mais claro a cor de fundo, menor será o valor da opacidade necessária para que o usuário perceba o estado. Desta forma, podem existir diferenças nos valores de opacidade entre um fundo claro e escuro.

### Herança [Link para seção Herança](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#heranca)

Nos Estados, herança é a capacidade de herdar as características visuais (e às vezes até comportamentais) de um outro estado.

Por padrão, a herança deve ser mantida entre os Estados. Caso exista conflito de estilos visuais entre eles, o Estado realizado por último e com a interação direta pelo usuário terá prioridade.

* * *

## Tipos de Estado [Link para seção Tipos de Estado](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#tipos-de-estado)

Segue a lista dos principais Estados encontrados no _Design System_. O detalhamento de cada Estado será descrito adiante.

Existem 2 grupos de estados:

### 1\. Interação [Link para seção 1. Interação](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#1-interacao)

São grupos de Estados voltados a algum tipo de interação por parte do usuário. Alguns deles podem estar aplicados diretamente na interface, mas podem ser alterados de acordo com a interação do usuário seja por _mouse_, toque, voz….

- _Interativo_: comunica que um componente ou elemento é interativo.
- _Desabilitado_: comunica que um componente ou elemento está temporariamente indisponível para interação.
- _Hover_: comunica que o cursor está sobre um componente ou elemento interativo.
- _Pressionado_: comunica que um componente ou elemento interativo está sendo pressionado via teclado, por um clique ou toque.
- _Foco_: comunica quando o usuário destaca um componente ou elemento interativo, utilizando-se de um método de entrada como teclado, _mouse_, toque ou voz.
- _Ativo_: comunica qual elemento está ativo dentro de um conjunto de escolhas, iniciado ou não pelo usuário.
- _Selecionado_: comunica uma escolha do usuário.
- _Arrastando_: comunica quando um usuário move um componente ou elemento.
- _Arrastar_: comunica que um componente ou elemento pode ser arrastado.
- _DropZone_: comunica a área propícia onde um componente ou elemento pode ser movido no Arrastando.
- _Dropzone_ Ativo\*: comunica a área onde um componente ou elemento com estado Arrastando será movido.
- _Visitado_: comunica que um texto interativo ( _hiperlink_) foi acessado pelo usuário.
- _Ligado_: comunica a opção “ligado” na alternância entre o estado Desligado.
- _Desligado_: comunica a opção “desligado” na alternância entre o estado Ligado.

### 2\. Aviso [Link para seção 2. Aviso](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#2-aviso)

São estados caracterizados por uma cor (e suas variações) e um ícone a fim de fornecer uma experiência universal para os usuários quando for necessário transmitir alguma informação importante dentro da interface.

- _Erro_: Informa aos usuários sobre um erro ou falha crítica.
- _Alerta_: Informa aos usuários sobre ações indesejáveis ​​ou da possibilidade de gerar resultados inesperados.
- _Sucesso_: Confirma se uma tarefa foi concluída conforme o esperado.
- _Informativo_: Fornece informações adicionais aos usuários que podem não estar vinculados à sua ação ou tarefa atual.

### Observações [Link para seção Observações](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#observacoes)

- Podem existir Estados, não listados aqui, específicos em um componente. Neste caso, devem ser detalhados na sua respectiva documentação.
- O “Estado Padrão” se trata da ausência de um estado ou de algum _feedback_. Por não existir nenhuma regra especial, não existe um detalhamento sobre este “Estado”.
- A escolha das cores dos estados obedecem a algumas recomendações e boas práticas pré-estabelecidas. Para maiores informações consultar a documentação sobre a criação de Temas.

* * *

## Interativo [Link para seção Interativo](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#interativo)

Para o usuário, deve ser claro quais objetos são interativos ou não. Essa interação será dada pelo usuário por um clique/toque ou em alguns casos, por algum outro dispositivo de entrada.

Após a interação, será executada alguma ação que pode ser determinada pelo elemento que recebeu este estado, seja um texto ou um objeto.

### _Hiperlinks_ [Link para seção Hiperlinks](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#hiperlinks)

Textos Interativos são chamados de _hiperlinks_, ou apenas _links_. A ideia do _hiperlink_ é fazer ligação/referência direta a um determinado conteúdo.

Evite estado Interativo em frases longas, prefira o uso em palavras chaves.

### Referência externa [Link para seção Referência externa](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#referencia-externa)

Quando a ação interativa for relacionada a visitar um determinado conteúdo fora do domínio da aplicação, adicione um ícone para representar esse comportamento próximo ao elemento com estado Interativo. O ícone recomendado é representado por um “ _container_ e uma seta diagonal”:

### Objetos [Link para seção Objetos](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#objetos)

Quando criar um objeto interativo, tenha em mente se vale a pena aplicar a cor sobre o fundo ou primeiro plano. O importante é que, para o usuário, esteja claro o estado Interativo. Tenha cuidado com contraste entre o fundo e o primeiro plano, visite sempre o [Fundamento Cores](https://www.gov.br/ds/fundamentos-visuais/cores) para saber o melhor contraste possível.

### _Underline_ vs legibilidade [Link para seção Underline vs legibilidade](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#underline-vs-legibilidade)

O uso do estilo _underline_ (sublinhado) nos textos pode atrapalhar a legibilidade em algumas situações. Evite o uso quando o texto for aplicado em objetos (como _List_ ou outros componentes) ou em textos longos.

### Especificação para Estado Interativo [Link para seção Especificação para Estado Interativo](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#especificacao-para-estado-interativo)

A cor é utilizada como a principal característica para exibir o estado de Interação (evite o uso desta cor, e suas variações, em outros elementos para não confundir o usuário). Por motivos de legibilidade, a cor aplicada em fundo escuro é diferente. Essa cor pode ser aplicada tanto nos textos como em objetos.

Para que _hiperlinks_ sejam destacados utilize _underline_. Esse recurso pode ser dispensado nos casos em que a legibilidade fique comprometida.

![Estado interativo aplicado à Fundo Claro e Escuro](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/estados/imagens/interativo.png)

_Exemplo do estado interativo sendo aplicado em um texto e um objeto, tanto no fundo claro como no escuro._

| Element | Property | Token/Value |
| --- | --- | --- |
| background/foreground (Sobre um fundo Claro) | color | `--blue-warm-vivid-70` |
| background/foreground (Sobre um fundo Escuro) | color | `--blue-warm-20` |
| text | style | `underline` |

* * *

## Desabilitado [Link para seção Desabilitado](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#desabilitado)

O estado desabilitado comunica que um componente ou elemento está temporariamente indisponível para interação.

Elementos desabilitados não precisam ser rígidos sobre as conformidade de acessibilidade no quesito contraste visual, e características visuais que destaquem o elemento devem ser retiradas ou amenizadas, como é o caso das sombras por exemplo.

Elementos desabilitados não sofre herança com qualquer outro estado (a não ser o Interativo, veja em especificação).

### Evitar Estado Desabilitado [Link para seção Evitar Estado Desabilitado](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#evitar-estado-desabilitado)

Caso o elemento não possa ser “habilitado” por alguma ação do usuário, a recomendação é retirá-lo da interface, ou seja, não exibi-lo.

> _Exemplo_: Em um _site_ de compras, tenho um determinado produto em falta. Neste caso, retire o botão comprar (quando se referir ao produto) ao invés de mantê-lo desativado.

Alguns outros componentes e elementos, por causa do seu comportamento, é preferível não exibi-los na interface:

- Componentes de Navegação (Menu, _Tabs_, etc.)
- Modal
- _Tooltip_
- _Magic Button_

### Especificação para Estado Desabilitado [Link para seção Especificação para Estado Desabilitado](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#especificacao-para-estado-desabilitado)

O estado Desabilitado deve ter baixa ênfase ou ser amenizado dentro de uma interface. Ele é exibido com um valor específico de opacidade, podendo manter a herança com o estado interativo, ou seja, o visual do Estado Interativo. O cursor do _mouse_ deve ser alterado para a símbolo de não permitido: “círculo com traço diagonal”.

![Estado Desabilitado](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/estados/imagens/desabilitado.png)

_Exemplo do estado desabilitado sendo aplicado em um texto e um objeto, tanto no fundo claro como no escuro._

| Element | Property | Token/Value |
| --- | --- | --- |
| background/foreground | opacity | `--surface-opacity-md` |
| cursor | cursor | `not-allowed` |
| background/foreground | shadow | `--surface-shadow-none` |

* * *

## _Hover_ [Link para seção Hover](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#hover)

O Estado _hover_ acontece quando o usuário mantém o cursor do _mouse_ sobre um componente ou elemento interativo. Em alguns casos raros, ele pode ser utilizado para gerar controle de leitura em elementos listáveis, tais como uma lista ou linhas de uma tabela.

### Cuidados para Estado _Hover_ [Link para seção Cuidados para Estado Hover](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#cuidados-para-estado-hover)

- Só pode existir um elemento com _hover_ por vez na tela.
- Se por um evento de _hover_ executar um _dropdown_, o estilo do _hover_ pode se manter no elemento até que o comportamento _dropdown_ seja retirado.
- Elementos desabilitados não podem receber _hover_ .
- O _feedback_ visual deve ser feito no objeto que está em _hover_.

### Especificação para Estado _Hover_ [Link para seção Especificação para Estado Hover](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#especificacao-para-estado-hover)

É importante a possibilidade de herança com outros estados mesmo com _hover_. Desta forma, o recurso de _Overlay_ é utilizado como _feedback_.

A cor do elemento _Overlay_ será sempre a cor do Primeiro Plano do elemento _hover_. O valor da opacidade deve variar de acordo com Fundo (Claro ou Escuro) para gerar percepção (contraste) suficiente do Estado. Além disso, nos elementos Interativos, o cursor do _mouse_ deve ser alterado para a “mão fechada com indicador esticado”.

![Estado Hover](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/estados/imagens/hover.png)

_Exemplo do estado hover sendo aplicado em um texto e um objeto, tanto no fundo claro como no escuro._

| Element | Property | Token/Value |
| --- | --- | --- |
| background | color | `Primeiro Plano` |
| background (Sobre um fundo Claro) | opacity | `--surface-opacity-xs` |
| background (Sobre um fundo Escuro) | opacity | `--surface-opacity-sm` |
| cursor | cursor | `pointer` |

* * *

## Pressionado [Link para seção Pressionado](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#pressionado)

Quando um elemento interativo recebe um toque iniciado pelo usuário, seja ela por cursor, toque, teclado ou método de entrada de voz, recebe o estado de pressionado.

### Cuidados para Estado Pressionado [Link para seção Cuidados para Estado Pressionado](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#cuidados-para-estado-pressionado)

- Só pode existir um elemento com pressionado por vez na tela.
- Se por um evento de pressionado executar um _dropdown_, o estilo do Pressionado pode se manter no elemento até que o comportamento _dropdown_ seja retirado.
- Elementos desabilitados não podem receber Pressionado .
- O _feedback_ visual deve ser feito no objeto que está em estado Pressionado.
- Após o estado Pressionado, o elemento pode também receber o estado Foco (veja detalhes no estado Foco).

### Especificação para Estado Pressionado [Link para seção Especificação para Estado Pressionado](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#especificacao-para-estado-pressionado)

É importante manter heranças de outros Estados mesmo com Pressionado. Desta forma, o recurso de _Overlay_ é utilizado como _feedback_.

A cor do elemento _Overlay_ será sempre a cor do Primeiro Plano do elemento Pressionado. O valor da opacidade deve variar de acordo com Fundo (Claro ou Escuro) para que gera percepção (contraste) suficiente do Estado. Além disso, o cursor do _mouse_ deve ser alterado para a “mão fechada com indicador esticado”.

Características visuais referentes à elevação do componente na tela, como sombra por exemplo, devem ser retiradas ou amenizadas.

![Estado Pressionado](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/estados/imagens/pressionado.png)

_Exemplo do estado pressionado sendo aplicado em um texto e um objeto, tanto no fundo claro como no escuro._

| Element | Property | Token/Value |
| --- | --- | --- |
| background | color | `Primeiro Plano` |
| background (Sobre um fundo Claro) | opacity | `--surface-opacity-md` |
| background (Sobre um fundo Escuro) | opacity | `--surface-opacity-lg` |
| cursor | cursor | `pointer` |
| background/foreground | shadow | `--surface-shadow-none` |

* * *

## Foco [Link para seção Foco](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#foco)

O estado foco surge quando um usuário utiliza-se de um teclado ou algum método de entrada de voz para destacar um componente interativo. Por esse motivo, ele deve ter alta ênfase sobre demais elementos da interface.

Em alguns casos, o foco pode ser redirecionado pela própria interface, como por exemplo, focar automaticamente no campo de busca ao entrar em uma página de pesquisa.

### Foco Tênue [Link para seção Foco Tênue](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#foco-tenue)

Alguns elementos, geralmente quando existe entrada de dados (como um _input_ por exemplo), recebem o estado de Foco após ser clicado (ou “tocado”). Neste caso, o _feedback_ do foco _não precisa ter uma alta ênfase_, pois poderá atrapalhar o reconhecimento de outros estados e/ou chamar mais atenção do que deveria.

Como regra geral, utilize este estilo sempre que:

- Um elemento receber foco de forma _indireta_, ou seja, por reação a algum outro Estado ou comportamento.
- Quando o “foco padrão” tiver uma ênfase muito maior do que deveria, _interferindo negativamente_ na experiência do usuário.

### Cuidados para Foco [Link para seção Cuidados para Foco](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#cuidados-para-foco)

- Só pode existir um elemento com foco por vez na tela.
- Só pode existir 1 tipo de Foco por elemento.
- Elementos desabilitados não podem receber foco.
- Por padrão, o foco “normal” deve ser aplicado. O foco tênue só será utilizado quando especificado na diretriz.
- Por padrão, a ação de “clicar/tocar” em um elemento não deve gerar foco visual. Entretanto, o foco por outras vias (como teclado ou entrada de voz) ainda devem existir. O Foco via “clique/toque” só será utilizado quando especificado na diretriz do elemento.

### Especificação para Foco [Link para seção Especificação para Foco](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#especificacao-para-foco)

A principal propriedade (visual) que demonstra que um elemento está em foco é uma borda (ou contorno). Essa borda deve ser criada em volta do elemento e deve ter um espaçamento de segurança (para que a borda não se confunda com qualquer outra propriedade do elemento “focado”, ou com a herança de outros estados).

Por motivos de legibilidade, a cor aplicada na borda em fundo escuro é diferente. Para maiores informações consultar o [Fundamento Cores](https://www.gov.br/ds/fundamentos-visuais/cores).

![Estado Foco](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/estados/imagens/foco.png)

_Exemplo do estado foco sendo aplicado em um texto e um objeto, tanto no fundo claro como no escuro._

Para _foco tênue_ a borda deve possuir menos ênfase e não há necessidade de um espaçamento de segurança.

| Element | Property | Token/Value |
| --- | --- | --- |
| border (Sobre um fundo Claro) | color | `--gold-vivid-40` |
| border (Sobre um fundo Escuro) | color | `--gold-vivid-20` |

#### Especificação para Estado Foco [Link para seção Especificação para Estado Foco](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#especificacao-para-estado-foco)

| Element | Property | Token/Value |
| --- | --- | --- |
| border | width | `--surface-width-lg` |
| border | style | `dashed` |
| spacing | padding | `--spacing-scale-half` |

#### Especificação para Estado Foco Tênue [Link para seção Especificação para Estado Foco Tênue](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#especificacao-para-estado-foco-tenue)

| Element | Property | Token/Value |
| --- | --- | --- |
| border | width | `--surface-width-md` |
| border | style | `solid` |

* * *

## Ativo [Link para seção Ativo](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#ativo)

O estado ativo indica qual item, _de um conjunto de opções_, está sendo visualizado no momento, sendo iniciado por padrão ou por uma escolha do usuário utilizando-se dos seguintes métodos de entrada: toque, cursor, teclado ou entrada de voz.

### Cuidados para Estado Ativo [Link para seção Cuidados para Estado Ativo](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#cuidados-para-estado-ativo)

- Dentro de um único conjunto de opções, apenas um estado Ativo pode estar presente de cada vez.
- Elementos desabilitados não podem receber Ativo.
- Não utilize em componentes que possam existir vários itens Ativos ao mesmo tempo, como em listagens com expansão.

### Estado ativo vs selecionado [Link para seção Estado ativo vs selecionado](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#estado-ativo-vs-selecionado)

Se a própria definição dos estado não for clara para diferenciar um estado do outro, podemos resumir o embate com o seguinte comportamento:

- _Ativo_: a ação geralmente é executada imediatamente após a escolha (exibir um conteúdo, mudar o tipo de alinhamento de texto…). Apenas um item pode ser ativado por vez.
- _Selecionado_: a ação é executada posteriormente e, geralmente, com auxílio de uma outra ação ou componente (selecionar os itens e depois acionar um botão deletar…). Posso ter a possibilidade de escolher um ou mais itens.

### Especificação para Estado Ativo [Link para seção Especificação para Estado Ativo](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#especificacao-para-estado-ativo)

O estado deve ter uma alta ênfase entre os demais elementos do seu conjunto mas uma média ênfase entre os outros elementos em uma interface.

O Fundamento cor é utilizada como a principal característica para exibir o estado de Ativo. São duas cores que devem ser utilizadas para gerar o máximo de contraste possível entre elas, trabalhando entre o Fundo e o Primeiro Plano.

Para distinguir melhor o Estado, a borda do elemento pode ser trabalhada para não depender somente da cor para gerar o _feedback_ do estado Ativo.

_Observação_: nem todas as bordas do elemento precisam ser estilizadas, na maioria das situações, apenas 1 das bordas será o suficiente!

![Estado Ativo](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/estados/imagens/ativo.png)

_Exemplos do estado ativo sendo aplicado em um texto e um objeto, tanto no fundo claro como no escuro._

| Element | Property | Token/Value |
| --- | --- | --- |
| background/foreground/border | color | `--blue-warm-vivid-80` |
| background/foreground/border | color | `--pure-0` |
| border | width | `--surface-width-lg` |
| border | style | `solid` |

* * *

## Selecionado [Link para seção Selecionado](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#selecionado)

Um estado selecionado indica a seleção de opções pelo usuário usando um dos seguintes métodos de entrada: toque, cursor, teclado ou voz.

### Estado selecionado vs ativo [Link para seção Estado selecionado vs ativo](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#estado-selecionado-vs-ativo)

Se a própria definição dos estado não for clara para diferenciar um estado do outro, podemos resumir o embate com o seguinte comportamento:

- _Ativo_: a ação geralmente é executada imediatamente após a escolha (exibir um conteúdo, mudar o tipo de alinhamento de texto…). Apenas um item pode ser ativado por vez.
- _Selecionado_: a ação é executada posteriormente e, geralmente, com auxílio de uma outra ação ou componente (selecionar os itens e depois acionar um botão deletar…). Posso ter a possibilidade de escolher um ou mais itens.

### Evitar estado selecionado [Link para seção Evitar estado selecionado](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#evitar-estado-selecionado)

O estado Selecionado não pode ser aplicado nos seguintes componentes:

- Componentes de Navegação (Menu, Abas…)
- Modal
- _Tooltip_
- _Button_
- _Message_
- _Divider_

### Especificação para Estado Selecionado [Link para seção Especificação para Estado Selecionado](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#especificacao-para-estado-selecionado)

O estado selecionado deve ser facilmente identificável.

Cor de fundo e um elemento gráfico devem ser utilizados para representar o estado. O elemento gráfico pode ser um ícone que represente seleção/escolha, ou os componentes _checkbox_ ou _radio_.

![Estado Selecionado](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/estados/imagens/selecionado.png)

_Exemplo do estado selecionado sendo aplicado em um texto e um objeto, tanto no fundo claro como no escuro._

| Element | Property | Token/Value |
| --- | --- | --- |
| background/foreground | color | `--blue-warm-vivid-50` |
| icon | class | `fa-check` |

* * *

## Arrastando [Link para seção Arrastando](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#arrastando)

O estado arrastando ocorre quando um usuário move um elemento ou componente, seja via cursor, toque, teclado ou método de entrada de voz.

### Cuidados para Estado Arrastando [Link para seção Cuidados para Estado Arrastando](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#cuidados-para-estado-arrastando)

- Só pode existir um elemento com Arrastando por vez na tela.
- Quando vários elementos precisarem ser arrastados, deve existir uma solução que agrupe (visualmente) todos os elementos em uma única solução.
- Elementos desabilitados não podem receber Arrastando.
- Arrastando não sofre herança do estado Pressionado.

### Estado arrastando vs arrastar [Link para seção Estado arrastando vs arrastar](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#estado-arrastando-vs-arrastar)

É importante que o usuário entenda quais elementos da tela podem ser arrastados. Portanto, enquanto o _Arrastar_ é o _feedback_ que determina quais os elementos que podem ser arrastados (antes da ação), o estado _Arrastando_ é o _feedback_ da ação do usuário sobre o objeto em questão (durante a ação).

### Especificação para Estado Arrastando [Link para seção Especificação para Estado Arrastando](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#especificacao-para-estado-arrastando)

O _feedback_ do objeto “agarrado” deve ser claro, mostrando a diferença entre outros objetos semelhantes na tela. Como se moverá “acima” de outros itens, uma sombra e um contorno deve ser utilizado para garantir a mudança do Estado tanto em um fundo claro como no escuro; a angulação e a opacidade do objeto também deve ser alterada para gerar um efeito “fantasma”.

A cor utilizada (tanto no contorno como na sombra) deve ser a mesma utilizada no Estado Interativo.

O cursor do mouse deve ser alterado para a “mão fechada”.

![Estado Arrastando](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/estados/imagens/arrastando.png)

_Exemplo do estado arrastando sendo aplicado em um texto e um objeto, tanto no fundo claro como no escuro._

| Element | Property | Token/Value |
| --- | --- | --- |
| border | color | `Cor do Estado Interativo` |
| border | width | `--surface-width-md` |
| border | style | `solid` |
| background | shadow-offset-x | `--surface-offset-none` |
| background | shadow-offset-y | `--surface-offset-md` |
| background | shadow-blur | `--surface-blur-lg` |
| background | shadow-color | `Cor do Estado Interativo` |
| background | shadow-opacity | `--surface-opacity-sm` |
| background/foreground | opacity | `--surface-opacity-xl` |
| background/foreground | rotate | `-5°` |
| cursor | cursor | `grabbing` |

* * *

## Arrastar [Link para seção Arrastar](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#arrastar)

Um estado arrastar indica quando um elemento pode ser arrastado, se movimentando na interface.

### Cuidados para Estado Arrastar [Link para seção Cuidados para Estado Arrastar](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#cuidados-para-estado-arrastar)

- O _feedback_ Arrastar é somente para objetos que possam ser movimentados (com o evento de “agarrar”), não incluindo, por exemplo, elementos redimensionáveis (neste caso, outras características de respostas devem ser estudadas).
- Elementos desabilitados não podem receber Arrastar (veja Especificação maiores detalhes).

### Estado arrastar vs arrastando [Link para seção Estado arrastar vs arrastando](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#estado-arrastar-vs-arrastando)

É importante que o usuário entenda quais elementos da tela podem ser arrastados. Portanto, enquanto o _Arrastar_ é o _feedback_ que determina quais os elementos que podem ser arrastados (antes da ação), o estado _Arrastando_ é o _feedback_ da ação do usuário sobre o objeto em questão (durante a ação).

### Especificação para Estado Arrastar [Link para seção Especificação para Estado Arrastar](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#especificacao-para-estado-arrastar)

Podemos utilizar ícone e o cursor para trazer o _feedback_ necessário, mesmo que não exista características tão universais para esse propósito (a falta de consistência na própria internet torna difícil para os usuários reconhecerem o significado).

No _Design System_ escolhemos o ícone de “6 círculos” e o cursor do _mouse_ “mão totalmente aberta” como elementos que simbolizam este estado Arrastar.

Prefira o posicionamento do ícone a esquerda e/ou no topo do elemento. O cursor estilizado deve ser exibido somente quando o mesmo estiver posicionado sobre o elemento. Em elemento desabilitados o cursor não sofre mudança.

![Estado Arrastar](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/estados/imagens/arrastar.png)

_Exemplo do estado arrastar sendo aplicado em um texto e um objeto, tanto no fundo claro como no escuro._

| Element | Property | Token/Value |
| --- | --- | --- |
| icon | class | `grip-vertical` |
| cursor | cursor | `grab` |

* * *

## _Dropzone_ [Link para seção Dropzone](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#dropzone)

O estado _Dropzone_ (ou Área/Zona de Soltura) indica quando uma área está viável para receber um elemento após ser movido ou arrastado.

### Cuidados para _Dropzone_ [Link para seção Cuidados para Dropzone](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#cuidados-para-dropzone)

- A área/zona de “soltura” do elemento pode ser maior, _mas não menor_, do que a área visível/exibida na tela. Utilize o estado _Dropzone_ Ativo (veja adiante) para gerar uma resposta clara para o usuário.
- O Estado pode ser persistente, ou seja, sempre está visível enquanto o comportamento de mover/arrastar estiver presente.

### Especificação para _Dropzone_ [Link para seção Especificação para Dropzone](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#especificacao-para-dropzone)

É importante que outros estados ainda possam ser comunicáveis mesmo com _dropzone_. Desta forma, o recurso de borda com uma cor específica do estado Interativo é o suficiente para o _feedback_.

![Dropzone](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/estados/imagens/dropzone.png)

_Exemplo do estado dropzone sendo aplicado em um texto e um objeto, tanto no fundo claro como no escuro._

| Element | Property | Token/Value |
| --- | --- | --- |
| border | color | `Cor do Estado Interativo` |
| border | width | `--surface-width-sm` |
| border | style | `dashed` |

* * *

## _Dropzone_ ativo [Link para seção Dropzone ativo](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#dropzone-ativo)

O estado _Dropzone_ Ativo (ou Área/Zona de Soltura Ativa) indica a área/zona que receberá o elemento após ser movido ou arrastado.

### Cuidados para _Dropzone_ Ativo [Link para seção Cuidados para Dropzone Ativo](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#cuidados-para-dropzone-ativo)

- Só pode existir um área com _dropzone_ ativo por vez na tela.
- Elementos desabilitados não podem receber _dropzone_ ativo.

### Estado _dropzone_ ativo vs _dropzone_ [Link para seção Estado dropzone ativo vs dropzone](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#estado-dropzone-ativo-vs-dropzone)

Enquanto o _dropzone_ informa as opções disponíveis, o _dropzone_ ativo informa a área/zona que, efetivamente, receberá o elemento após ser movido.

### Estado _dropzone_ ativo e arrastando [Link para seção Estado dropzone ativo e arrastando](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#estado-dropzone-ativo-e-arrastando)

Sempre que estiver Arrastando um objeto sobre uma _dropzone_, o estado _Dropzone_ Ativo deve ser imediatamente exibido!

O cursor do mouse ou o toque do usuário é a referência para entender essa sobreposição de objetos e não o elemento com estado Arrastando. Caso a área do Dropzone seja muito pequena, ela poderá ser _ampliada_ para receber essa entrada do usuário de forma mais precisa.

Essa área ampliada não é visível para o usuário, mas assim que a entrada do usuário fizer contato com ela, o estado _Dropzone_ Ativo deve ser exibido!

#### Especificação para _Dropzone_ Ativo e Arrastando [Link para seção Especificação para Dropzone Ativo e Arrastando](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#especificacao-para-dropzone-ativo-e-arrastando)

No _dropzone_ ativo deve manter as heranças do estado _dropzone_. Desta forma, o recurso de overlay é adicionado como _feedback_.

A cor do elemento overlay será sempre a cor do estado Interativo. O valor da opacidade será fixo.

O cursor do mouse deve ser alterado, adicionando um ícone de “adição” ao cursor.

![Dropzone ativo](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/estados/imagens/dropzone-ativo.png)

_Exemplo do estado dropzone ativo sendo aplicado em um texto e um objeto, tanto no fundo claro como no escuro._

| Element | Property | Token/Value |
| --- | --- | --- |
| background | color | `Cor do Estado Interativo` |
| background | opacity | `--surface-opacity-sm` |
| cursor | cursor | `copy` |

* * *

## Visitado [Link para seção Visitado](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#visitado)

O estado acontece quando o conteúdo acessado, referente ao _hiperlink_, já foi visitado/visualizado pelo usuário. Ele serve para ajudar os usuários a distinguir a diferença entre _hiperlinks_ que visualizados e os não visualizados.

### Cuidados para Estado Visitado [Link para seção Cuidados para Estado Visitado](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#cuidados-para-estado-visitado)

- Utilize o estado com cuidado, pois essa informação pode violar a privacidade do usuário e revelar informações de identificação pessoal em situações sensíveis.
- Só utilize dentro de contexto de _hiperlinks_.

### Especificação para Visitado [Link para seção Especificação para Visitado](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#especificacao-para-visitado)

Além de herdar características básicas de _hiperlinks_, é necessário o uso de uma cor diferenciada para realizar o _feedback_ de forma eficiente.

Por motivos de legibilidade, a cor em fundos Escuros deve ser alterada.

![Estado Visitado](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/estados/imagens/visitado.png)

_Exemplo do estado visitado sendo aplicado em um texto, tanto no fundo claro como no escuro._

| Element | Property | Token/Value |
| --- | --- | --- |
| Text (Sobre um fundo Claro) | color | `--blue-warm-vivid-80` |
| Text (Sobre um fundo Escuro) | color | `--gray-20` |

* * *

## Ligado e Desligado [Link para seção Ligado e Desligado](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#ligado-e-desligado)

Apesar de serem Estados diferentes, o estado ligado e desligado estão unidos na função: comunicam uma alternância entre duas opções: Ligado ou Desligado. Um componente se alterna entre um estado ligado ou desligado conforme a interação do usuário utilizando os seguintes métodos de entrada: toque, cursor, teclado ou voz.

### Especificação para Ligado e Desligado [Link para seção Especificação para Ligado e Desligado](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#especificacao-para-ligado-e-desligado)

O Fundamento cor é utilizado como a principal característica para exibir o estado Ligado e o Desligado. A cor entre os estados deve ser possuir um contraste alto, deixando claro a diferença entre eles.

![Estado Desligado](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/estados/imagens/ligado-desligado.png)

_Exemplo dos estados ligado e desligado sendo aplicado em um texto e um objeto, tanto no fundo claro como no escuro._

| Element | Property | Token/Value |
| --- | --- | --- |
| background/foreground (Ligado) | color | `--blue-warm-vivid-40` |
| background/foreground (Desligado) | color | `--gray-40` |

* * *

## Erro [Link para seção Erro](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#erro)

O estado informa sobre um erro ou falha crítica existente na interface ou por alguma ação realizada pelo usuário.

Importante que o estado persista até até que seja resolvido o erro.

### Especificação para Estado Erro [Link para seção Especificação para Estado Erro](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#especificacao-para-estado-erro)

A cor _vermelha_ e ícone de “X” é o _feedback_ utilizado neste estado.

![Exemplo de erro](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/estados/imagens/erro.png)

_Exemplo do estado erro sendo aplicado em um texto e um objeto, tanto no fundo claro como no escuro._

| Element | Property | Token/Value |
| --- | --- | --- |
| background/foreground | color | `--red-vivid-50` |
| icon | class | `times-circle` |

* * *

## Alerta [Link para seção Alerta](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#alerta)

O estado informa aos usuários sobre ações indesejáveis ​​ou da possibilidade de gerar resultados inesperados.

Pode persistir até que o usuário ignore a notificação.

### Especificação para Estado Alerta [Link para seção Especificação para Estado Alerta](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#especificacao-para-estado-alerta)

A cor _amarela_ e ícone de “exclamação” é o _feedback_ utilizado neste estado.

![Exemplo de alerta](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/estados/imagens/alerta.png)

_Exemplo do estado alerta sendo aplicado em um texto e um objeto, tanto no fundo claro como no escuro._

| Element | Property | Token/Value |
| --- | --- | --- |
| background/foreground | color | `--yellow-vivid-20` |
| icon | class | `exclamation-triangle` |

* * *

## Sucesso [Link para seção Sucesso](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#sucesso)

O estado informa ao usuário se uma tarefa foi concluída conforme o esperado.

Pode persistir de uma maneira não intrusiva, mas normalmente, não requer ações adicionais. Pode ser dispensado automaticamente.

### Especificação para Estado Sucesso [Link para seção Especificação para Estado Sucesso](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#especificacao-para-estado-sucesso)

A cor _verde_ e ícone de “check” é o feedback utilizado neste estado.

![Exemplo de sucesso](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/estados/imagens/sucesso.png)

_Exemplo do estado sucesso sendo aplicado em um texto e um objeto, tanto no fundo claro como no escuro._

| Element | Property | Token/Value |
| --- | --- | --- |
| background/foreground | color | `--green-cool-vivid-50` |
| icon | class | `check-circle` |

* * *

## Informativo [Link para seção Informativo](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#informativo)

O estado fornece informações adicionais aos usuários que podem não estar vinculados à sua ação ou a uma tarefa atual.

Pode persistir, dependendo do conteúdo, mas não requer ações adicionais. Pode ser dispensado automaticamente.

O estado informativo pode ser confundido com algum elemento de ajuda (que pode se representado pela iconografia de uma “interrogação”). De fato, um pode substituir o outro. O importante é manter a consistência visual e sempre que possível, preferir utilizar o estado informativo, com a iconografia e a cor padrão.

### Especificação para Estado Informativo [Link para seção Especificação para Estado Informativo](https://www.gov.br/ds/fundamentos-visuais/estados?tab=visao-geral\#especificacao-para-estado-informativo)

A cor _azul_ e ícone de “letra i” é o feedback utilizado neste estado.

![Exemplo de informação](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/estados/imagens/informativo.png)

_Exemplo do estado informativo sendo aplicado em um texto e um objeto, tanto no fundo claro como no escuro._

| Element | Property | Token/Value |
| --- | --- | --- |
| background/foreground | color | `--blue-warm-vivid-60` |
| icon | class | `info-circle` |

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
