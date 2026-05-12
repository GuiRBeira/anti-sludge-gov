# Espaçamento [Link para seção Espaçamento](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#espacamento)

Espaçamento é a distância entre um elemento a outro, representado por alguma unidade métrica. O espaçamento é um fundamento do design visual que frequentemente cria uma lacuna entre os designers e os desenvolvedores ao projetar uma interface. Para evitar essa situação, o Design System cria e detalha termos em um sistema flexível, possibilitando layouts funcionais e consistentes.

## Princípios [Link para seção Princípios](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#principios)

### Experiência Única [Link para seção Experiência Única](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#experiencia-unica)

Existem 2 escalas de espaçamento no Design System que devem ser respeitadas. Utilizando-se dessas escalas é possível criar layouts flexíveis e, ao mesmo tempo, manter a consistência visual entre diferentes serviços e produtos.

### Eficiência e Clareza [Link para seção Eficiência e Clareza](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#eficiencia-e-clareza)

Todo elemento em uma _interface_ pode possuir 2 tipos de espaçamento: interno ( _padding_) e externo ( _margin_). É necessário detalhar cada um desses espaços para que o elemento se comporte corretamente em uma grid.

Os métodos de espaços usados no elemento devem ser claros.

### Acessibilidade [Link para seção Acessibilidade](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#acessibilidade)

Utilizar espaços entre os elementos é a melhor forma de proporcionar uma boa legibilidade e organização do conteúdo. No design existe um termo chamado de espaço em branco que ajudam neste contexto.

Os espaços em branco ( _white space_ ou _negative space_) são recursos visuais que ajudam a tornar um _layout_ mais agradável. Criam hierarquias informacionais (dando foco no que for mais importante) e criam relacionamento entre os elementos. Aplicando distância entre os não semelhantes e a proximidade entre os semelhantes.

Os espaços em branco também são importantes para leitura, pois criam áreas de respiro no _layout_, isto é, espaços onde o olhar do leitor pode descansar, e por fim manter o fluxo de leitura.

### Reutilização e Colaboração [Link para seção Reutilização e Colaboração](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#reutilizacao-e-colaboracao)

Interfaces digitais do governo devem utilizar as escalas de espaçamentos existentes, além de todas as informações contidas neste documento, sempre que possível. Havendo, entretanto, a necessidade de acrescentar ou editar o documento atual, é necessário validar a nova proposta pela equipe de _design_ do Design System.

* * *

## Tipos de Espaçamento [Link para seção Tipos de Espaçamento](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#tipos-de-espacamento)

Quando um objeto é renderizado, ou seja, exibido em uma tela, o navegador ou o aplicativo que está renderizando-o, interpreta todos eles como uma caixa retangular. Essa caixa é chamada de _Box Model_.

A anatomia desta caixa é feita pelas seguintes propriedades: conteúdo, _padding_, _border_ e _margin_.

![Box-Model](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/espacamento/imagens/boxmodel.png)

_Propriedades básicas do Box-model_

Mesmo possuindo comportamentos variados, todos os elementos devem respeitar essas propriedades. Entender seu funcionamento é importante para determinar as dimensões, o espaçamento e a interação do objeto de modo geral.

No Design System, o comportamento das dimensões de um objeto é determinada pela regra: `box-sizing: border-box`, ou seja, as propriedades de largura (width) e de altura (height) incluem o tamanho do padding e do border, mas não incluem a margin.

![Box-Model no Design System](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/espacamento/imagens/boxmodel-govbrds.png)

_Comportamento das dimensões do Box-Model utilizado no Design System_

Observando somente as propriedades de espaçamento, podemos então categorizá-los em _Interno_ e _Externo_.

![Tipos de Espaçamentos](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/espacamento/imagens/interno-externo.png)

_Tipos de Espaçamento: Interno e Externo_

### Espaçamento Interno [Link para seção Espaçamento Interno](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#espacamento-interno)

É frequentemente usado para criar espaços de respiro, facilitando a legibilidade de uma informação, além da endentação de textos e qualquer elemento contido em outro.

A propriedade `padding` define a área de espaçamento interno nos quatro lados do elemento. Podendo também ser descrito de forma separada: `padding-top` (cima), `padding-right` (direita), `padding-bottom` (baixo), e `padding-left` (esquerda).

![Espaçamento Interno](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/espacamento/imagens/interno.png)

_Exemplo do Espaçamento Interno em um componente_

### Espaçamento Externo [Link para seção Espaçamento Externo](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#espacamento-externo)

Utilizado para criar os _espaços em branco_, criando hierarquia entre os elementos de uma tela e agrupando elementos relacionados.

Espaçamento externo são utilizados para criar as _Áreas de Segurança_ ou _Área de Proteção_. Área de segurança é basicamente um _espaço em branco_ voltado para um componente específico, criado para garantir que as funcionalidade e características hierárquicas descritas na diretriz, sejam executadas sem falhas e sem interferências de outros elementos.

A propriedade `margin` define a área de espaçamento externo nos quatro lados do elemento. Podendo também ser descrito de forma separada: `margin-top` (cima), `margin-right` (direita), `margin-bottom` (baixo), e `margin-left` (esquerda).

![Espaçamento Externo](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/espacamento/imagens/externo.png)

_Exemplo do Espaçamento Externo em um componente_

### Sangria [Link para seção Sangria](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#sangria)

Da mesma forma como acontece nas definições da Grid, nos elementos também podem acontecer a sangria: quando um elemento invade os _espaçamento interno_ de outros, como um separador no interior de um _card_, por exemplo.

Por padrão, os espaços devem ser respeitados, a não ser que seja detalhado o contrário na documentação do componente.

Ao criar um componente, deve ser especificado se existe o comportamento de “sangria” (para os espaços internos de outros componentes, por exemplo) e deve-se verifique também, se o componente pai permite esse comportamento.

![Sangria](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/espacamento/imagens/sangria.png)

_Elementos “sangrando” dentro de um componente_

### Espaçamento VS Borda (Ferramentas de _Design_) [Link para seção Espaçamento VS Borda (Ferramentas de Design)](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#espacamento-vs-borda-ferramentas-de-design)

Como visto no _Box Model_, o _border_ (borda) é uma propriedade que também ocupa espaço. Infelizmente, a maioria das ferramentas de _design_ desconsideram essa propriedade quando medem distância entre elementos. Fato que, ao ser desenvolvido para _web_, o _layout_ acaba com comportamentos inesperados.

![Problemas com ferramentas de design](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/espacamento/imagens/tools-spacing.png)

_Ferramenta desconsiderando a borda para o espaçamento_

Para representar a regra do `box-sizing: border-box` o designer pode configurar sua ferramenta para utilizar traçado interno (border inline), porém, a borda ainda não contará como espaço nas ferramentas.

![Problemas com ferramentas de design](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/espacamento/imagens/adobexd.png)

_Configurando comportamento da borda nas ferramentas de design_

O designer deve entender esse comportamento e a limitação da sua ferramenta para prever problemas relacionados a espaçamento na criação da sua interface.

* * *

## Métodos de Espaçamento [Link para seção Métodos de Espaçamento](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#metodos-de-espacamento)

Os métodos de espaçamento são um conjunto de regras sobre como posicionar elementos em um template ou em um componente.

Existem 3 tipos de métodos: _Dimensão_, _Alinhamento_ e _Escala_. Enquanto as duas primeiras influenciam indiretamente, esta última influencia diretamente nos tipos de espaçamento.

Dificilmente é encontrado um único método isolado no elemento. O mais comum é seu uso de forma colaborativa, em conjunto, mesclando diversos métodos em um único elemento, componente ou template.

### Dimensão [Link para seção Dimensão](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#dimensao)

As dimensões referem-se à largura e altura dos elementos. Os componentes descrevem a sua altura ou largura (seja por valores absolutos ou relativos), ou às vezes apenas estão atrelados as colunas de uma grid.

Neste método, o espaçamento interno do elemento pode variar fazendo com que métodos fixos (como de escala) não façam muito sentido.

Ao especificar as dimensões de um elemento, deve-se utilizar as boas práticas descritas abaixo:

- Evitar fixar valores absolutos nas dimensões dos componentes quando ele for constituído por vários elementos internos. É preferível adicionar regras aos elementos filhos para controlar as dimensões do pai.
- Quando fixar valores absolutos nas dimensões pode ser importante detalhar a largura e altura máxima/mínima para evitar comportamentos indesejados na _interface_.
- Ao especificar valores absolutos, deve-se utilizar o incremento _Escala Layout_ como base.
- Caso o elemento utilize a grid como referência na dimensão, é necessário especificar quantas colunas o componente deve utilizar. É importante não esquecer de definir essa especificação em cada _breakpoint_.
- Nos textos, deve-se trabalhar o conceito de entrelinhamento para controlar melhor os espaços que serão ocupados na interface. Para maiores detalhes veja [Fundamento Tipografia](https://www.gov.br/ds/fundamentos-visuais/tipografia).

![Exemplo de Dimensão](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/espacamento/imagens/dimensao-exemplo.png)

_Objetos com dimensões fixas._

### Alinhamento [Link para seção Alinhamento](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#alinhamento)

Alinhamento é o posicionamento de elementos (conteúdo) dentro de um componente. Este método trabalha a referência de um elemento pai a fim de alinhar os elementos filhos.

São 2 tipos de alinhamento, cada um com 3 propriedades possíveis e que, em conjunto, geram 9 pontos distintos dentro de uma área específica que podem ser utilizadas para o alinhamento dos objetos.

![Método Alinhamento](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/espacamento/imagens/alinhamento.png)

_Pontos de alinhamento dentro de um objeto_

![Exemplo de Alinhamento](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/espacamento/imagens/alinhamento-exemplo.png)

_Exemplo de Alinhamento ao centro_

#### Alinhamento Vertical [Link para seção Alinhamento Vertical](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#alinhamento-vertical)

| Spacing Vertical Token | Propriedade |
| --- | --- |
| `--spacing-vertical-top` | Top |
| `--spacing-vertical-center` | Center |
| `--spacing-vertical-bottom` | Bottom |

#### Alinhamento horizontal [Link para seção Alinhamento horizontal](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#alinhamento-horizontal)

| Spacing Horizontal Token | Propriedade |
| --- | --- |
| `--spacing-horizontal-left` | Left |
| `--spacing-horizontal-center` | Center |
| `--spacing-horizontal-right` | Right |

Por padrão, as os alinhamentos são `--spacing-vertical-top` e `--spacing-horizontal-left`.

### Escala [Link para seção Escala](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#escala)

A escala de espaçamento refere-se aos tipos de espaçamento (interno e externo) existentes nos elementos de uma interface. Ela fornece valores mais absolutos que os outros métodos.

![Exemplo Escala](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/espacamento/imagens/escala-exemplo.png)

_Exemplo de Escala_

É um método medido em incrementos de 8px ou 4px, criando dois tipos de escala: o de _Layout_ e de _Ajuste_.

_Importante_: por padrão, os espaçamentos de qualquer elemento do Design System é de 0px, ou seja, não utiliza nenhum tipo de escala.

| Spacing Scale Token | Value |
| --- | --- |
| `--spacing-scale-default` | 0px (0em) |

#### Layout [Link para seção Layout](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#layout)

Escala base para os componentes e templates. Possui o incremento base de 8px.

É utilizada para posicionar e hierarquizar componentes em uma interface, criar áreas de respiro e de proteção, entre outros. Ela é escala mais utilizada pela sua flexibilidade, pois permite o uso em _qualquer tipo de elemento_, além de criar posicionamentos mais perceptíveis.

![Escala Layout](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/espacamento/imagens/escala-layout.png)

_Escala Layout_

| Spacing Scale Token | Value |
| --- | --- |
| `--spacing-scale-base` | 8px (1em) |
| `--spacing-scale-2x` | 16px (2em) |
| `--spacing-scale-3x` | 24px (3em) |
| `--spacing-scale-4x` | 32px (4em) |
| `--spacing-scale-5x` | 40px (5em) |
| `--spacing-scale-6x` | 48px (6em) |
| `--spacing-scale-7x` | 56px (7em) |
| `--spacing-scale-8x` | 64px (8em) |
| `--spacing-scale-9x` | 72px (9em) |
| `--spacing-scale-10x` | 80px (10em) |

#### Ajuste [Link para seção Ajuste](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#ajuste)

Escala utilizada para realizar pequenos ajustes de espaçamento em elementos de tipografia e de iconografia. Por possuir incremento de 4px, ela é totalmente compatível com a escala layout.

Utilize a escala Ajuste quando necessitar de espaçamentos finos de um texto ou ícone, onde uma densidade alta possa fazer sentido na hierarquia dos elementos (como o espaço entre um rótulo e uma entrada de texto).

_Atenção_: apenas textos e ícones podem utilizar a escala Ajuste.

![Escala Ajuste](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/espacamento/imagens/escala-ajuste.png)

_Escala Ajuste_

| Spacing Scale Token | Value |
| --- | --- |
| `--spacing-scale-half` | 4px (.5em) |
| `--spacing-scale-baseh` | 12px (1.5em) |
| `--spacing-scale-2xh` | 20px (2.5em) |
| `--spacing-scale-3xh` | 28px (3.5em) |
| `--spacing-scale-4xh` | 36px (4.5em) |
| `--spacing-scale-5xh` | 44px (5.5em) |

* * *

## Melhores Práticas [Link para seção Melhores Práticas](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#melhores-praticas)

### Otimização de Espaços [Link para seção Otimização de Espaços](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#otimizacao-de-espacos)

Quando houver dois ou mais elementos posicionados horizontalmente ou verticalmente em sequência, evite somar as margens mínimas de segurança destes elementos. Neste caso, quando as margens forem do mesmo valor, prevalece apenas uma delas. Ou se possuírem valores diferentes, a margem maior deve prevalecer. Observe abaixo:

_A_ \- Em elementos com margens iguais, deve prevalecer apenas uma das margens.

_B_ \- Em elementos com margens diferentes, deve prevalecer a margem de maior valor.

![Otimização de Espaçamento - Margens Iguais](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/espacamento/imagens/otimizacao-espaco-01.png)

_Margens Iguais - Prevalece apenas uma das margens_

![Otimização de Espaçamento - Margens Diferentes](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/espacamento/imagens/otimizacao-espaco-02.png)

_Margens Diferentes - Prevalece a margem com valor maior_

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

## Utilitários CSS de Espaçamento [Link para seção Utilitários CSS de Espaçamento](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#utilitarios-css-de-espacamento)

São classes CSS para aplicar o Fundamento Visual Espaçamento.

### Como usar [Link para seção Como usar](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#como-usar)

Modifique _**margin**_ e _**padding**_.

Informe o espaçamento seguido do tamanho.

- `m-*` → margin;
- `p-*` → padding.
- `base`, `half`, `2x`, `3x` → tamanhos.

Exemplos: `m-base`, `p-3x`, `m-half`

> Veja todos os tamanhos disponíveis em [Visão Geral](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral#layout).

### Direções [Link para seção Direções](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#direcoes)

Inclua a **sigla** da direção após o prefixo e antes do tamanho.

- `t` = top (superior) → `mt-3x`
- `b` = bottom (inferior) → `pb-base`
- `l` = left (esquerda) → `ml-half`
- `r` = right (direita) → `pr-2x`
- `x` = horizontal (esq + dir) → `px-2x`
- `y` = vertical (top + bottom) → `my-half`

### _Breakpoints_ [Link para seção Breakpoints](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#breakpoints)

Informe o _breakpoint_ após o prefixo e antes do tamanho.

- `m-*` / `p-*` → funcionam em todos os dispositivos;
- `m-sm-*` / `p-sm-*` → a partir de **_smartphone_ em modo paisagem** e **_tablet_ em modo retrato**;
- `m-md-*` / `p-md-*` → a partir de **_tablet_ em modo paisagem**;
- `m-lg-*` / `p-lg-*` → a partir de _**desktop**_;
- `m-xl-*` / `p-xl-*` → apenas em **TVs**.

### Dicas [Link para seção Dicas](https://www.gov.br/ds/fundamentos-visuais/espacamento?tab=visao-geral\#dicas)

- Use `m-*` e `p-*` para espaçamentos globais.
- Combine direções (`mt`, `px`, `my`) para ajustes finos.
- Adapte com _breakpoints_ (`sm`, `md`, `lg`, `xl`) para responsividade.

* * *

## Exemplos de códigos

### Todos os lados

CodePen

Abrir exemplo no CodePen

Margin

m-base

m-2x

m-3x

m-4x

m-5x

Padding

p-base

p-2x

p-3x

p-4x

p-5x

CodePen

Abrir exemplo no CodePen

```html

<p class="h3">Margin</p>
<div class="d-flex align-items-center flex-wrap" style="gap: 1rem;">
  <div class="bg-magenta-20">
    <div class="border-dashed-lg bg-pure-0 p-3x m-base">
      <p class="mb-0 text-nowrap">m-base</p>
    </div>
  </div>
  <div class="bg-magenta-20">
    <div class="border-dashed-lg bg-pure-0 p-3x m-2x">
      <p class="mb-0 text-nowrap">m-2x</p>
    </div>
  </div>
  <div class="bg-magenta-20">
    <div class="border-dashed-lg bg-pure-0 p-3x m-3x">
      <p class="mb-0 text-nowrap">m-3x</p>
    </div>
  </div>
  <div class="bg-magenta-20">
    <div class="border-dashed-lg bg-pure-0 p-3x m-4x">
      <p class="mb-0 text-nowrap">m-4x</p>
    </div>
  </div>
  <div class="bg-magenta-20">
    <div class="border-dashed-lg bg-pure-0 p-3x m-5x">
      <p class="mb-0 text-nowrap">m-5x</p>
    </div>
  </div>
</div>
<p class="h3">Padding</p>
<div class="d-flex align-items-center flex-wrap" style="gap: 1rem;">
  <div class="border-dashed-lg p-base bg-magenta-20">
    <div class="bg-pure-0 p-3x">
      <p class="mb-0 text-nowrap">p-base</p>
    </div>
  </div>
  <div class="border-dashed-lg p-2x bg-magenta-20">
    <div class="bg-pure-0 p-3x">
      <p class="mb-0 text-nowrap">p-2x</p>
    </div>
  </div>
  <div class="border-dashed-lg p-3x bg-magenta-20">
    <div class="bg-pure-0 p-3x">
      <p class="mb-0 text-nowrap">p-3x</p>
    </div>
  </div>
  <div class="border-dashed-lg p-4x bg-magenta-20">
    <div class="bg-pure-0 p-3x">
      <p class="mb-0 text-nowrap">p-4x</p>
    </div>
  </div>
  <div class="border-dashed-lg p-5x bg-magenta-20">
    <div class="bg-pure-0 p-3x">
      <p class="mb-0 text-nowrap">p-5x</p>
    </div>
  </div>
</div>
```

Copiar

Expandir

### Lado específico

CodePen

Abrir exemplo no CodePen

Margin

mt-3x

mr-3x

mb-3x

ml-3x

Padding

pt-3x

pr-3x

pb-3x

pl-3x

CodePen

Abrir exemplo no CodePen

```html

<p class="h3">Margin</p>
<div class="d-flex align-items-center" style="gap: 1rem;">
  <div class="bg-magenta-20">
    <div class="border-dashed-lg bg-pure-0 p-3x mt-3x">
      <p class="mb-0">mt-3x</p>
    </div>
  </div>
  <div class="bg-magenta-20">
    <div class="border-dashed-lg bg-pure-0 p-3x mr-3x">
      <p class="mb-0">mr-3x</p>
    </div>
  </div>
  <div class="bg-magenta-20">
    <div class="border-dashed-lg bg-pure-0 p-3x mb-3x">
      <p class="mb-0">mb-3x</p>
    </div>
  </div>
  <div class="bg-magenta-20">
    <div class="border-dashed-lg bg-pure-0 p-3x ml-3x">
      <p class="mb-0">ml-3x</p>
    </div>
  </div>
</div>
<p class="h3">Padding</p>
<div class="d-flex align-items-center" style="gap: 1rem;">
  <div class="border-dashed-lg pt-3x bg-magenta-20">
    <div class="bg-pure-0 p-3x">
      <p class="mb-0">pt-3x</p>
    </div>
  </div>
  <div class="border-dashed-lg pr-3x bg-magenta-20">
    <div class="bg-pure-0 p-3x">
      <p class="mb-0">pr-3x</p>
    </div>
  </div>
  <div class="border-dashed-lg pb-3x bg-magenta-20">
    <div class="bg-pure-0 p-3x">
      <p class="mb-0">pb-3x</p>
    </div>
  </div>
  <div class="border-dashed-lg pl-3x bg-magenta-20">
    <div class="bg-pure-0 p-3x">
      <p class="mb-0">pl-3x</p>
    </div>
  </div>
</div>
```

Copiar

Expandir

### Sentido específico

CodePen

Abrir exemplo no CodePen

Margin

mx-3x

my-3x

Padding

px-3x

py-3x

CodePen

Abrir exemplo no CodePen

```html

<p class="h3">Margin</p>
<div class="d-flex align-items-center" style="gap: 1rem;">
  <div class="bg-magenta-20">
    <div class="border-dashed-lg bg-pure-0 p-3x mx-3x">
      <p class="mb-0">mx-3x</p>
    </div>
  </div>
  <div class="bg-magenta-20">
    <div class="border-dashed-lg bg-pure-0 p-3x my-3x">
      <p class="mb-0">my-3x</p>
    </div>
  </div>
</div>
<p class="h3">Padding</p>
<div class="d-flex align-items-center" style="gap: 1rem;">
  <div class="border-dashed-lg px-3x bg-magenta-20">
    <div class="bg-pure-0 p-3x">
      <p class="mb-0">px-3x</p>
    </div>
  </div>
  <div class="border-dashed-lg py-3x bg-magenta-20">
    <div class="bg-pure-0 p-3x">
      <p class="mb-0">py-3x</p>
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
