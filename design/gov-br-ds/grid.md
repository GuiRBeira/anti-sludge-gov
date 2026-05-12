# _Grid_ [Link para seção Grid](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#grid)

_Grid_ (ou malha) é uma estrutura geométrica constituída por eixos desenvolvida para auxiliar o alinhamento de elementos gráficos e textuais em uma composição visual.

Utilize a _grid_ para auxiliar no desenvolvimento de _layouts_ organizados e estruturados.

## Princípios [Link para seção Princípios](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#principios)

### Experiência Única [Link para seção Experiência Única](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#experiencia-unica)

O sistema de _grid_ de 12 colunas possui uma boa flexibilidade para projetos de _layouts_, pois permite uma diagramação de páginas e telas com colunas múltiplas de 12, além de se adequar aos principais _Frameworks_ CSS, facilitando a escolha na tecnologia a ser utilizada. Em _Tablets_ e _Smartphones_ o número de colunas é reduzido ao máximo de 8 e 4 respectivamente, devido à limitação de espaço.

### Eficiência e Clareza [Link para seção Eficiência e Clareza](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#eficiencia-e-clareza)

Seguindo o princípio de espaçamentos e dimensões múltiplas de 8, é possível preservar as proporções em resoluções de telas diferenciadas, visto que a maioria tem suas dimensões divisíveis por 8. Essa característica de _Design_ Multi-Plataforma fornece ao usuário uma sensação de consistência e clareza no projeto de design em diferentes dispositivos.

### Acessibilidade [Link para seção Acessibilidade](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#acessibilidade)

As interfaces devem ser adequadas a diferentes tipos de dispositivos. Tendo em vista esse aspecto, o sistema de _grid_ fornece alguns _breakpoints_ \- pontos de quebra onde o _layout_ será ajustado para atender diferentes resoluções, sendo assim possível desenvolver interfaces adaptáveis a diversos formatos e tamanhos de telas.

### Reutilização e Colaboração [Link para seção Reutilização e Colaboração](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#reutilizacao-e-colaboracao)

Porventura, poderá haver alguma adaptação específica no sistema de _grids_, _breakpoints_ e padrões de proporção, para atender alguma necessidade em projetos de interface. Sendo assim, faz-se necessário que essas evoluções/adaptações sejam testadas e passem por uma prévia aprovação da equipe de _design_ do Design System.

* * *

## _Breakpoints_ [Link para seção Breakpoints](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#breakpoints)

O sistema de _grid_ para o _Design System_ do Governo Federal adequa-se a cinco _breakpoints_ de referência, abrangendo resoluções para _mobile_, _tablet_, _desktop_ e resoluções superiores. São elas:

![Visão Geral dos Breakpoints e Resoluções](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/grid/imagens/breakpoint-statcounter.png)

_Visão geral dos breakpoints e resoluções._

| _Device_ | _Breakpoint Range_ (px) | _Breakpoint_ (px) |
| --- | --- | --- |
| _Smartphone Portrait_ | 0 - 575 | 0 |
| _Smartphone Landscape_ / _Tablet Portrait_ | 576 - 991 | 576 |
| _Tablet Landscape_ | 992 - 1279 | 992 |
| _Desktop_ | 1280 - 1599 | 1280 |
| TV | 1600 - \* | 1600 |

* * *

## Tipos de _Grid_ [Link para seção Tipos de Grid](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#tipos-de-grid)

Existem 3 tipos de _grid_:

- _4 Colunas_;
- _8 Colunas_;
- _12 Colunas_.

Cada uma delas deve ser utilizada em um determinado _breakpoint_.

Pode-se utilizar _qualquer_ comportamento de largura em qualquer tipo de _grid_. Porém, um pode ser mais recomendado que outro dependendo da _grid_.

### 1\. _Grid_ de 4 colunas [Link para seção 1. Grid de 4 colunas](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#1-grid-de-4-colunas)

O conteúdo deve ser reorganizado em _4 colunas_ respeitando a margem de _8px_ nas laterais e medianiz de _16px_.

Recomenda-se o uso do comportamento de _grid_ fluida. Evite o uso do comportamento fixo para esta _grid_.

| _Property_ | _Value_ |
| --- | --- |
| _max-width_ | até 559px |
| _gutter_ | 16px |
| _columns_ | 4 |
| _margin_ | 8px |
| _breakpoint_ | _Smartphone Portrait_ |

- Para comportamento fluido o valor sempre será 100%;
- Margem mínima no comportamento fixo.

![Grid 4 colunas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/grid/imagens/grid-04colunas.png)

_Exemplo de grid de 4 colunas._

### 2\. _Grid_ de 8 colunas [Link para seção 2. Grid de 8 colunas](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#2-grid-de-8-colunas)

O conteúdo é organizado em _8 colunas_ se adequando às variações retrato e paisagem. O espaçamento entre as colunas será de _24px_ e a margem externa ao conteúdo de _40px_.

Essa _grid_ pode ser utilizada em dois _breakpoints_ distintos. Um voltado para _smartphone landscape_ e _tablet portrait_, e outro voltado somente para _tablet landscape_. Desta forma gera maior flexibilidade de uso variando apenas comportamentos de responsividade e de largura em cada resolução.

Recomenda-se o uso do comportamento de _grid_ fluido. Utilize o comportamento fixo com cautela (geralmente em _tablet landscape_).

| _Property_ | _Value_ |
| --- | --- |
| _max-width_ | de 496px até 911px ( _tablet_ e _smartphone landscape_) ou de 912px até 1199px ( _tablet landscape_) |
| _gutter_ | 24px |
| _columns_ | 8 |
| _margin_ | 40px |
| _breakpoint_ | _Smartphone Landscape / Tablet Portrait ou Tablet Landscape_ |

- Para comportamento fluido o valor sempre será 100%;
- Margem mínima no comportamento fixo.

![Grid 8 colunas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/grid/imagens/grid-08colunas.png)

_Exemplo de grid de 8 colunas._

### 3\. Grid de 12 Colunas [Link para seção 3. Grid de 12 Colunas](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#3-grid-de-12-colunas)

Utilizam _12 colunas_ com espaçamentos de _24 pixels_ ou _40 pixels_ entre elas (dependendo do _breakpoint_). Esse sistema permite a organização do conteúdo bastante diversificado.

Quando utilizada a _grid_ fixa, a margem externa ao conteúdo é variável (com tamanho mínimo de _40 pixels_) se adequando às dimensões da tela.

Essa _grid_ pode ser utilizada em dois _breakpoints_ distintos. Um voltado para _desktop_ e outro para TV. Por causa da grande diferença de espaço útil disponível a configuração da _grid_ e os comportamentos recomendados são distintos para cada _breakpoint_.

#### _Desktop_ [Link para seção Desktop](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#desktop)

O espaçamento das colunas é de _24 pixels_.

A recomendação do uso de _grid_ fluida ou fixa é variável pois depende do tipo de conteúdo utilizado:

- **Grid fluida**: é recomendada para sistemas ou situações em que é preciso aproveitar a maior parte do espaço útil da tela do dispositivo.
- **Grid fixa**: recomenda-se para portais ou conteúdos informativos (como _sites_ de notícia) em que o conteúdo não deve sofrer muita distorção, mantendo a leitura consistente.

| _Property_ | _Value_ |
| --- | --- |
| _max-width_ | de 1200px até 1519px |
| _gutter_ | 24px |
| _columns_ | 12 |
| _margin_ | 40px |
| _breakpoint_ | _Desktop_ |

- Para comportamento fluido o valor sempre será 100%;
- Margem mínima no comportamento fixo.

![Grid 12 colunas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/grid/imagens/grid-12colunas.png)

_Exemplo de grid de 12 colunas para desktop._

#### TV [Link para seção TV](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#tv)

O espaçamento das colunas é de _40 pixels_.

Recomenda-se o uso da _grid_ fixa. Por possuir uma área útil extensa pode causar problemas de legibilidade (nos textos) ou problemas de hierarquia da informação.

Utilize o comportamento fluido com cautela.

| _Property_ | _Value_ |
| --- | --- |
| _max-width_ | a partir de 1520px |
| _gutter_ | 40px |
| _columns_ | 12 |
| _margin_ | 40px |
| _breakpoint_ | _TV_ |

- Para comportamento fluido o valor sempre será 100%;
- Margem mínima no comportamento fixo.

![Grid 12 colunas](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/grid/imagens/grid-12colunas.png)

_Exemplo de grid de 12 colunas para TV._

* * *

## Comportamentos [Link para seção Comportamentos](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#comportamentos)

### 1\. Largura [Link para seção 1. Largura](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#1-largura)

Existem dois tipos de largura para as _grids_: _Fixa_ e _Fluida_.

#### Largura Fixa [Link para seção Largura Fixa](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#largura-fixa)

As colunas e as medianizes possuem largura fixa. Porém a largura das _margens são variadas_ de acordo com a resolução da tela, ou seja, o conteúdo se mantém centralizado da tela em uma largura máxima (`max-width`) fixa.

**Atenção:** mesmo com os valores da margem variando, existe um valor mínimo que deve ser respeitado. Essa margem mínima funciona como uma área de segurança para que o conteúdo não fique totalmente “colado” no limite do dispositivo ou do navegador.

![Grid Fixa 01](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/grid/imagens/behavior-fixa01.png)

_Grid Fixa - Exemplo 1_

![Grid Fixa 02](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/grid/imagens/behavior-fixa02.png)

_Grid Fixa - Exemplo 2_

#### Largura Fluida [Link para seção Largura Fluida](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#largura-fluida)

Tanto as margens como as medianizes possuem largura fixa, porém a largura das **colunas variam**, dimensionando também o conteúdo. Neste caso, a _grid_ ocupa todo o espaço disponível da tela (`max-width` de 100%).

![Grid Fluida 01](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/grid/imagens/behavior-fluida01.png)

_Grid Fluida - Exemplo 1_

![Grid Fluida 02](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/grid/imagens/behavior-fluida02.png)

_Grid Fluida - Exemplo 2_

#### _Max-Width_ [Link para seção Max-Width](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#max-width)

`Max-width` mede a distância entre o início da primeira coluna da _grid_ até o final da última coluna. Em outras palavras, é o tamanho da largura da _grid_ sem os elementos de margem.

![Max-Width](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/grid/imagens/maxwidth.png)

_Max-width_ é o local onde está localizado todo o conteúdo principal da interface.\*

### 2\. Sangria na _Grid_ ( _Bleed_) [Link para seção 2. Sangria na Grid (Bleed)](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#2-sangria-na-grid-bleed)

As margens são o espaço de segurança entre o conteúdo e as bordas direita e esquerda de uma tela. Por padrão, os elementos dentro da _grid_ nunca devem ultrapassar as margens. Porém, alguns componentes podem ter elementos que quebram essa regra e ocupam o espaço da margem, é o que chamamos de sangria na _grid_.

Quando a sangria na _grid_ acontece, a largura do _box/container_ do elemento deve ocupar todo o espaço da margem enquanto o conteúdo informativo permanece dentro das colunas.

**Atenção:** somente elementos com funções visuais podem utilizar a sangria (como um _container/background_, por exemplo). **Os conteúdos informativos devem respeitar as margens da grid**.

**Observação:** objetos podem “sangrar” invadindo espaços de outros elementos. Neste caso, veja as regras em _Fundamento > Espaçamento_. As regras de sangria de _grid_ só funcionam em _grids_ e em elementos que estão inseridos nela. Elementos flutuantes, por exemplo, não utilizam a _grid_.

![Com sangria](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/grid/imagens/sangria.png)

_Exemplo de grid contendo elementos com sangria._

![Sem sangria](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/grid/imagens/semsangria.png)

_Exemplo de grid sem elementos com sangria._

### 3\. Responsividade [Link para seção 3. Responsividade](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#3-responsividade)

Responsividade é a forma como se estrutura a interface em diferentes resoluções de tela. O Design System define diferentes _grids_ e _breakpoints_ para facilitar a aplicação deste conceito de forma prática. Porém, posicionar os elementos dentro de um _grid_ não significa que o seu _layout_ esteja responsivo. Entender como os elementos interagem com a _grid_ responsiva é uma etapa muito importante para promover uma experiência adequada ao usuário em diferentes dispositivos ou situações.

Pontos importantes quando tratamos de responsividade:

1. **Breakpoint Vs Dispositivo**: apesar de ser uma correlação, o uso de uma determinada resolução não significa que o usuário esteja com o dispositivo X ou Y. Eventualmente pode ter sido alterado o espaço útil do navegador em um _desktop_ ou apenas o modo paisagem/retrato em um _tablet_ (girando o dispositivo). A interface deve funcionar independentemente do dispositivo; principalmente os elementos interativos (seja por toque ou clique).
2. **Navegação**: a navegação deve ser revista em cada _breakpoint_ utilizado. Baixas resoluções muitas vezes requerem uma área de interação ou textos maiores. Componentes voltados à navegação devem ser sempre validados.
3. **Clique Vs Toque**: em resoluções mais baixas o uso de interação por toque é mais comum e o contrário também é verdade. Trabalhe melhor essa questão quando adaptar o _layout_ a diferentes _grids_. Utilize o ponto forte de cada interação, como uso de “gestos” para criar interfaces voltadas ao toque, por exemplo. Não esqueça que focar em um modo de interação não significa esquecer o outro.
4. **Testar**: a melhor maneira de garantir uma boa experiência é testando a interface na maior quantidade possível de cenários diferentes. Realize uma bateria de testes considerando todos os cenários levantados anteriormente. Valide sua interface a cada _breakpoint_.

#### Entendendo uma _grid_ responsiva [Link para seção Entendendo uma grid responsiva](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#entendendo-uma-grid-responsiva)

Antes de entender os elementos dentro da _grid_, é importante definir o tipo de comportamento utilizado na sua largura: _grid_ fixa ou _grid_ fluida?

Em uma _grid_ fixa é mais simples de trabalhar, pois os elementos não sofrem alterações com a resolução da tela. A única preocupação será com os _breakpoints_.

![Grid Fixa](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/grid/imagens/gridres-fixa.png)

_Não há alteração nos elementos dos exemplos 1 e 2 na mudança de resolução de uma grid fixa._

A _grid_ fluida é mais complexa, pois, além dos _breakpoints_, deve-se entender como os elementos interagem com as colunas da _grid_ (se é _adaptativo_ ou _estável_).

![Grid Fluida](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/grid/imagens/gridres-fluida.png)

_Na grid fluida os elementos tiveram seu posicionamento e dimensões alterados com a mudança de resolução._

**Observação:** na _grid_ fixa ainda existe o conceito adaptativo e estável porém, como a largura das suas colunas são fixas, o controle é muito mais simples.

##### Elemento Adaptativo e Estável [Link para seção Elemento Adaptativo e Estável](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#elemento-adaptativo-e-estavel)

Assim como a _grid_, as dimensões dos elementos seguem um comportamento bem parecido.

_Largura adaptativa (ou fluida)_: a largura do elemento está atrelada às colunas da _grid_. Ou seja, se a coluna mudar de tamanho, os elementos também terão a dimensão alterada.

![Largura Adaptativa](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/grid/imagens/gridres-adaptativa.png)

_Alguns elementos estão atrelados a 4 colunas da grid e outras a 2 colunas._

**Largura estável (ou fixa):** o elemento está apenas alinhado a _grid_. Independentemente do tamanho da coluna, ele não terá sua dimensão alterada. Porém, pode ser que o elemento não consiga se manter na mesma linha e precise “quebrar a linha” (passado para a linha subsequente. Podendo empilhar e empurrar os demais conteúdos abaixo dele).

![Largura Estável](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/grid/imagens/gridres-estavel.png)

_No exemplo, os elementos estão apenas alinhados (à esquerda) dentro de uma área de 4 colunas. Caso haja mudança na resolução a largura dos elementos não sofrerá nenhuma alteração._

As informações acima foram focadas na largura por ser um elemento que pode ser influenciado diretamente pela _grid_ responsiva do Design System. Porém, tanto a largura quanto a altura podem ser influenciadas também pelos elementos internos de um componente (utilizando-se dos mesmos conceitos).

Por isso, sempre que criar um componente, tente responder a seguinte pergunta: “Ela interage com a _grid_ responsiva e/ou com seus elementos internos ou ela é totalmente fixa?”

É importante entender como funcionam todas as dimensões do componente, tanto a largura como a altura, para repassar ao desenvolvedor.

![Elementos adaptativos e estáveis](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/grid/imagens/gridres-adaptativofluido.png)

_Um card pode ter altura adaptativa ao conteúdo interno, mas a largura é adaptativa a grid (exemplo 1). É possível também criar um card com dimensões totalmente estáveis (exemplo 2) que não variam nem com conteúdo interno e nem com a grid (independentemente se ela for fluida ou fixa)._

Pode-se haver componentes que possuem comportamentos distintos dependendo da _grid_ utilizada.

![Comportamentos do elemento botão](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/grid/imagens/gridres-button.png)

_Um botão pode ter altura estável e a largura adaptativa ao conteúdo interno em uma grid de 12 colunas (exemplo 1). Porém em uma grid de 4 colunas ele passa a ter sua largura adaptativa a grid (exemplo 2)._

Tenha em mente que, em uma mesma interface, pode existir grupos de elementos estáveis e grupos de elementos adaptativos.

![Exemplo de interface com comportamentos adaptativos e estáveis](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/grid/imagens/gridres-interface.png)

_Interface com elementos adaptativos e estáveis._

### 4\. Objetos Temporários [Link para seção 4. Objetos Temporários](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#4-objetos-temporarios)

Objetos temporários são elementos ou regiões que surgem temporariamente. Podem ser ocultados ou visualizados ao interagir com um item da interface. Podem ser categorizados em _flutuantes_ ou _persistentes_.

**Observação**: é importante que o elemento temporário esteja localizado próxima da área de conteúdo (`Max-width`) ou no limite do tamanho mínimo da margem da _grid_ principalmente quando utilizadas _grids_ fixas que podem possuir margens muito extensas.

#### Flutuantes [Link para seção Flutuantes](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#flutuantes)

Não influenciam ou são influenciados diretamente pela _grid_ (independente do comportamento, não sofrem alteração). Porém, para cada tipo de _grid_ é importante rever como o elemento flutuante será apresentado na interface.

![Elemento Flutuante](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/grid/imagens/temp-flutuante.png)

_Quando visível, o menu de navegação flutuante não afeta a grid e nem os conteúdos da interface._

#### Persistentes [Link para seção Persistentes](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#persistentes)

São regiões que “empurram” ou “puxam” o conteúdo e/ou a _grid_ quando aparecem ou desaparecem respectivamente.

![Elemento Persistente](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/grid/imagens/temp-persistente.png)

_Quando visível, o menu de navegação persistente comprime a grid (e seu conteúdo)._

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

## Utilitários CSS de Grid [Link para seção Utilitários CSS de Grid](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#utilitarios-css-de-grid)

São classes CSS para aplicar o Fundamento Visual _Grid_.

### Como usar [Link para seção Como usar](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#como-usar)

O _Container_ ajusta o conteúdo conforme a tela. Use _Row_ e _Col_ só quando houver necessidade.

Os utilitários de _Grid_ são dividos em _**Container**_, _**Row**_ e _**Col**_ (coluna):

### _Container_ [Link para seção Container](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#container)

_Container_ ajusta o conteúdo conforme o tamanho da tela, ou seja, aplica a responsividade. Ele pode ser **fixo** ou **flexível**.

> **Atenção!** _Row_ e _Col_ só funcionam quando estão dentro do _Container_.

### _Row_ [Link para seção Row](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#row)

_Row_ é um agrupador de colunas. Dependendo da quantidade de colunas por tamanho de tela, _Row_ pode ocupar várias linhas.

> Embora _Row_ seja feito para dividir em colunas, ele também serve para ajustar um conteúdo à largura de uma coluna.

### _Col_ [Link para seção Col](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#col)

A Grid é dividida em 12 colunas ao total.

A largura da coluna depende do tamanho da tela, ou seja, uma coluna de tamanho 4 terá largura diferente em _Tablet Portrait_ e _Desktop_.

> Veja em [Visão Geral](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral#tipos-de-grid) a quantidade recomendada de colunas para cada tela.

Os tipos de colunas são os seguintes:

- **Proporcional**: a coluna se divide proporcionalmente até o limite de 12 por linha;

- **Predefinido**: são 12 tamanhos calculados de acordo com a fórmula `(tamanho / 12) * 100%`;

- **Automático**: a coluna mantém a largura original do conteúdo.


### Larguras [Link para seção Larguras](https://www.gov.br/ds/fundamentos-visuais/grid?tab=visao-geral\#larguras)

O _container_ fixo ou flexível definirá a largura máxima do conteúdo.

A tabela a seguir mostra os tipos de _Containers_ e seus comportamentos para cada resolução de tela.

| Classe do _Container_ | _Smartphone Portrait_ | _Smartphone Landscape_<br>_Tablet Portrait_ | _Tablet Landscape_ | _Desktop_ | TV |
| --- | --- | --- | --- | --- | --- |
| `.container` | 100% | 536px | 912px | 1200px | 1520px |
| `.container-sm` | 100% | 536px | 912px | 1200px | 1520px |
| `.container-md` | 100% | 100% | 912px | 1200px | 1520px |
| `.container-lg` | 100% | 100% | 100% | 1200px | 1520px |
| `.container-xl` | 100% | 100% | 100% | 100% | 1520px |
| `.container-fluid` | 100% | 100% | 100% | 100% | 100% |

Nas colunas, o tipo proporcional, predefinido ou automático definirá a largura da coluna.

A tabela a seguir mostra os tipos de colunas e seus comportamentos para cada resolução de tela.

| Nome do container | _Smartphone Portrait_ | _Smartphone Landscape_<br>_Tablet Portrait_ | _Tablet Landscape_ | _Desktop_ | TV |
| --- | --- | --- | --- | --- | --- |
| `.col` | Proporcional | Proporcional | Proporcional | Proporcional | Proporcional |
| `.col-1` até `.col-12` | Tamanho predefinido | Tamanho predefinido | Tamanho predefinido | Tamanho predefinido | Tamanho predefinido |
| `.col-sm` | 100% | Proporcional | Proporcional | Proporcional | Proporcional |
| `.col-sm-1` até `.col-sm-12` | 100% | Tamanho predefinido | Tamanho predefinido | Tamanho predefinido | Tamanho predefinido |
| `.col-md` | 100% | 100% | Proporcional | Proporcional | Proporcional |
| `.col-md-1` até `.col-md-12` | 100% | 100% | Tamanho predefinido | Tamanho predefinido | Tamanho predefinido |
| `.col-lg` | 100% | 100% | 100% | Proporcional | Proporcional |
| `.col-lg-1` até `.col-lg-12` | 100% | 100% | 100% | Tamanho predefinido | Tamanho predefinido |
| `.col-xl` | 100% | 100% | 100% | 100% | Proporcional |
| `.col-xl-1` até `.col-xl-12` | 100% | 100% | 100% | 100% | Tamanho predefinido |
| `.col-auto` | Tamanho do conteúdo | Tamanho do conteúdo | Tamanho do conteúdo | Tamanho do conteúdo | Tamanho do conteúdo |
| `.col-auto-sm` | 100% | Tamanho do conteúdo | Tamanho do conteúdo | Tamanho do conteúdo | Tamanho do conteúdo |
| `.col-auto-md` | 100% | 100% | Tamanho do conteúdo | Tamanho do conteúdo | Tamanho do conteúdo |
| `.col-auto-lg` | 100% | 100% | 100% | Tamanho do conteúdo | Tamanho do conteúdo |
| `.col-auto-xl` | 100% | 100% | 100% | 100% | Tamanho do conteúdo |

* * *

## Exemplos de códigos

### Colunas responsivas

CodePen

Abrir exemplo no CodePen

Ver margem e gaps

As colunas abaixo dividem em todas as resoluções

col-6

col-6

As colunas abaixo dividem a partir de 536px

col-sm-4

col-sm-4

col-sm-4

CodePen

Abrir exemplo no CodePen

```html

<div class="br-checkbox pb-3x">
  <input id="toggle" name="toggle" type="checkbox"/>
  <label for="toggle">Ver margem e gaps</label>
</div>
<div class="container-fluid" id="container">
  <div class="bg-pure-0">
    <p class="py-3x m-0">As colunas abaixo dividem em todas as resoluções</p>
    <div class="gap">
      <div class="row">
        <div class="col-6">
          <div class="br-card m-0 bg-pure-0">
            <div class="card-content">col-6</div>
          </div>
        </div>
        <div class="col-6">
          <div class="br-card m-0 bg-pure-0">
            <div class="card-content">col-6</div>
          </div>
        </div>
      </div>
    </div>
    <p class="py-3x m-0">As colunas abaixo dividem a partir de 536px</p>
    <div class="gap">
      <div class="row">
        <div class="col-sm-4">
          <div class="br-card m-0 bg-pure-0">
            <div class="card-content">col-sm-4</div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="br-card m-0 bg-pure-0">
            <div class="card-content">col-sm-4</div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="br-card m-0 bg-pure-0">
            <div class="card-content">col-sm-4</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
  const toggle = document.getElementById('toggle');
  const container = document.getElementById('container');
  toggle.addEventListener('change', () => {
    container.classList.toggle('bg-green-cool-vivid-10', toggle.checked);
    document.querySelectorAll('.gap').forEach(el => {
      el.classList.toggle('bg-blue-cool-vivid-10', toggle.checked);
    });
  });
</script>
```

Copiar

Expandir

### Efeito de sangria

CodePen

Abrir exemplo no CodePen

Neste exemplo, alguns bloco tem o fundo com sangria.

Ver a margem

![Imagem de fundo para fins de demonstração](https://www.gov.br/ds/background-card.98fb75c15858969c.png)

A legenda da imagem fica dentro de um container

Conteúdo sem sangria.

Conteúdo no fundo azul.

Outro conteúdo sem sangria.

Conteúdo no fundo amarelo.

CodePen

Abrir exemplo no CodePen

```html

<p>Neste exemplo, alguns bloco tem o fundo com sangria.</p>
<div class="br-checkbox pb-3x">
  <input id="margem" name="margem" type="checkbox"/>
  <label for="margem">Ver a margem</label>
</div>
<figure class="m-0" style="position: relative;"><img src="https://www.gov.br/ds/background-card.98fb75c15858969c.png" alt="Imagem de fundo para fins de demonstração" style="max-height: 200px; width: 100%;"/>
  <figcaption>
    <div class="container">
      <div class="my-2x" style="position: absolute; bottom: 0;">
        <p>A legenda da imagem fica dentro de um container</p>
      </div>
    </div>
  </figcaption>
</figure>
<div class="container sangria">
  <div class="bg-pure-0 py-6x">
    <p class="m-0">Conteúdo sem sangria.</p>
  </div>
</div>
<div class="py-6x bg-blue-10">
  <div class="container">
    <p class="m-0">Conteúdo no fundo azul.</p>
  </div>
</div>
<div class="container sangria">
  <div class="bg-pure-0 py-6x">
    <p class="m-0">Outro conteúdo sem sangria.</p>
  </div>
</div>
<div class="py-6x bg-yellow-5">
  <div class="container">
    <p class="m-0">Conteúdo no fundo amarelo.</p>
  </div>
</div>
<script>
  const checkbox = document.getElementById('margem');
  checkbox.addEventListener('change', () => {
    document.querySelectorAll('.sangria').forEach(el => {
      el.classList.toggle('bg-green-cool-vivid-10', checkbox.checked);
    });
  });
</script>
```

Copiar

Expandir

### Container responsivo

CodePen

Abrir exemplo no CodePen

Neste exemplo o conteúdo fica sempre dentro do container.

Imagens ou cores de fundo não fazem sangria.

Ver a margem

lorem ipsum dolor sit amet, consectetur adipiscing elit.

Conteúdo com fundo colorido.

![Imagem de fundo para fins de demonstração](https://www.gov.br/ds/background-card.98fb75c15858969c.png)

A legenda da imagem

CodePen

Abrir exemplo no CodePen

```html

<p>Neste exemplo o conteúdo fica sempre dentro do container.</p>
<p>Imagens ou cores de fundo não fazem sangria.</p>
<div class="br-checkbox pb-3x">
  <input id="margem" name="margem" type="checkbox"/>
  <label for="margem">Ver a margem</label>
</div>
<div class="container-fluid" id="container">
  <div class="bg-pure-0">
    <p>lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <div class="py-6x px-2x mb-3x" style="background: linear-gradient(to left, transparent, var(--blue-20));">
      <p class="m-0">Conteúdo com fundo colorido.</p>
    </div>
    <figure class="m-0" style="position: relative;"><img src="https://www.gov.br/ds/background-card.98fb75c15858969c.png" alt="Imagem de fundo para fins de demonstração" style="max-height: 200px; width: 100%;"/>
      <figcaption>
        <div class="m-2x" style="position: absolute; bottom: 0;">
          <p>A legenda da imagem</p>
        </div>
      </figcaption>
    </figure>
  </div>
</div>
<script>
  const checkbox = document.getElementById('margem');
  const container = document.getElementById('container');
  checkbox.addEventListener('change', () => {
    container.classList.toggle('bg-green-cool-vivid-10', checkbox.checked);
  });
</script>
```

Copiar

Expandir

### Conteúdo no tamanho de coluna

CodePen

Abrir exemplo no CodePen

O card abaixo tem o tamanho de uma coluna `col-6`.

lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

CodePen

Abrir exemplo no CodePen

```html

<div class="container-fluid">
  <div class="bg-pure-0">
    <p>O card abaixo tem o tamanho de uma coluna <code>col-6</code>.</p>
    <div class="row">
      <div class="col-6">
        <div class="br-card">
          <div class="card-content">
            <p class="m-0">lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      </div>
    </div>
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
