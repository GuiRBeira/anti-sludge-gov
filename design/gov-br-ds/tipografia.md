# Tipografia _Rawline_ [Link para seção Tipografia Rawline](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#tipografia-rawline)

Para a apresentação dos elementos textuais do _Design System_ do Governo Federal, somente uma família de fonte é utilizada: a _Rawline_. Sua escolha foi feita devido à diversidade de pesos da fonte que facilita o uso e a criação de hierarquias entre os textos, bem como a compreensão dos elementos da tela.

A utilização da _Rawline_ tem como objetivo facilitar o reconhecimento, pelos cidadãos, dos produtos do Governo Federal, juntamente com o padrão de cores e elementos gráficos definidos no _Design System_.

A _Rawline_ está disponível em [https://www.cdnfonts.com/rawline.font](https://www.cdnfonts.com/rawline.font)

## Princípios [Link para seção Princípios](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#principios)

### Experiência Única [Link para seção Experiência Única](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#experiencia-unica)

A variedade de estilos da _Rawline_ torna desnecessária a utilização de outra família tipográfica. Sendo assim, junto com os demais elementos do _Design System_ a tipografia cria um reconhecimento mais rápido pelo usuário, na identificação dos produtos do governo.

Para segurança, recomendamos o uso de _fallback_ (caso a fonte não seja carregada por algum motivo) a fonte `"Raleway"` e, de forma mais genéricas, as fontes sem serifas: `sans-serif`.

### Eficiência e Clareza [Link para seção Eficiência e Clareza](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#eficiencia-e-clareza)

A diversidade de pesos da _Rawline_ facilita a definição de níveis de hierarquias entre os elementos da tela. Isso torna a leitura mais agradável, e também fica mais claro para o usuário o papel que esses elementos ocupam na tela.

As escalas tipográficas foram definidas para manter a harmonia e coesão dentro do texto. Dessa forma, nenhuma fonte deve estar fora da escala definida no DS: _Minor Third_. Veja _Escala tipográfica_ para maiores detalhes.

A **Tabela de Estilo Padrão** foi criada para manter a mesma experiência do usuário na maioria dos dispositivos. Caso seja necessário alterar algum valor, deve-se seguir a escala tipográfica. Além disso, os demais itens da tabela de estilo devem ser revistos mantendo a escala proporcional, ou seja, aumentando ou diminuindo conforme a necessidade.

### Acessibilidade [Link para seção Acessibilidade](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#acessibilidade)

As interfaces devem cumprir as diferentes necessidades de acessibilidade. Sendo assim, o tamanho da tipografia e as cores foram aplicadas prevendo-se um nível mínimo de adequação à legibilidade.

Sempre que possível, utilize a tabela de estilo e as cores padrão para texto para manter o conteúdo legível/acessível ao usuário.

Veja [Cores](https://www.gov.br/ds/fundamentos-visuais/cores) para maiores detalhes sobre aplicação de cores nos textos.

A semântica deve ser levada em consideração ao se criar as marcações do texto dentro do HTML para que os dispositivos de leitores de tela consigam distinguir os diferentes elementos do texto.

#### Reutilização e Colaboração [Link para seção Reutilização e Colaboração](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#reutilizacao-e-colaboracao)

Interfaces digitais do governo devem utilizar a família de fonte definida sempre que possível. Havendo, entretanto, a necessidade de acrescentar ou editar a família tipográfica atual, é necessário validar a nova proposta segundo os princípios e pela equipe de _design_ do DS.

* * *

## Estilos da Fonte Rawline [Link para seção Estilos da Fonte Rawline](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#estilos-da-fonte-rawline)

![Lista de estilo.](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/tipografia/imagens/font-styles.png)

_Estilos da fonte Rawline._

| Family | Token |
| --- | --- |
| Rawline | –font-family-base |

### Peso da fonte (Font-Weight) [Link para seção Peso da fonte (Font-Weight)](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#peso-da-fonte-font-weight)

Utilize os valores abaixo para representar os diferentes estilos da fonte _Rawline_ em uma interface _web_.

| Font-Weight | Estilo | Token |
| --- | --- | --- |
| 100 | Thin | `--font-weight-thin` |
| 200 | Extra-Light | `--font-weight-extra-light` |
| 300 | Light | `--font-weight-light` |
| 400 | Regular | `--font-weight-regular` |
| 500 | Medium | `--font-weight-medium` |
| 600 | Semi-Bold | `--font-weight-semi-bold` |
| 700 | Bold | `--font-weight-bold` |
| 800 | Extra-bold | `--font-weight-extra-bold` |
| 900 | Black | `--font-weight-black` |

* * *

## Fonte Base [Link para seção Fonte Base](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#fonte-base)

Em um documento com uma definição de 72 dpi (ou 72 ppi ) dentro de um software gráfico (como _Photoshop_), _pontos = pixels_, mas isso não é verdade em um navegador (veja “Tabela de conversão PX, PT, EM e %”). Para uma boa comunicação, sempre indique os tamanhos em _pixels_ para os desenvolvedores da Web que devem converter para _em_ ou _rem_.

Atualmente, uma prática recomendada é permitir que um dispositivo (como navegador _web_) tome as decisões baseadas no tamanho da fonte base. O padrão é que em uma janela com visualização de 96 dpi tenha a fonte base padrão de 16px, mas dificilmente essa regra se aplique em todos os casos (como um _smart watch_).

No _Design System_ do Governo Federal optamos pela fonte base de 14 pixel por considerarmos que esse tamanho seja aplicável na maioria dos dispositivos e situações, porém essa escolha não é definitiva.

Definir um tamanho de uma fonte base (juntamente com a referência do uso de unidades “em” ou “rem”) facilitará a hierarquia entre os textos, otimizando o efeito cascata (veja escala tipográfica).

* * *

## Escala Tipográfica [Link para seção Escala Tipográfica](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#escala-tipografica)

O estabelecimento de uma escala tipográfica é uma forma de determinar tamanhos tipográficos. A escala é importante porque estabelece a hierarquia e melhora a legibilidade criando harmonia e coesão entre os textos.

Existem muitas escalas diferentes, mas dentro do _Design System_ do Governo Federal foi escolhida a escala _Minor Third_ (1,2) já que permitem números que possuem contraste necessário para enriquecer e flexibilizar a hierarquia de uma interface.

O tamanho _fonte base_ é de 14px (1em) e peso da fonte normal (400). A unidade _em_ é uma medida relativa que permite que o usuário altere o tamanho de exibição do texto na interface. Com exceção da fonte base, utilize a unidade _em_ para todos os outros valores da escala. Assim, caso o valor do tamanho base padrão seja alterado, toda a interface se adapta ao novo valor.

![Escala Tipográfica](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/tipografia/imagens/font-scale.png)

| em | px | Token |
| --- | --- | --- |
| 3.583 | 50.16 | `--font-size-scale-up-07` |
| 2.986 | 41.8 | `--font-size-scale-up-06` |
| 2.488 | 34.84 | `--font-size-scale-up-05` |
| 2.074 | 29.03 | `--font-size-scale-up-04` |
| 1.728 | 24.19 | `--font-size-scale-up-03` |
| 1.44 | 20.16 | `--font-size-scale-up-02` |
| 1.2 | 16.8 | `--font-size-scale-up-01` |
| 1 | 14 | `--font-size-scale-base` |
| 0.833 | 11.67 | `--font-size-scale-down-01` |
| 0.694 | 9.72 | `--font-size-scale-down-02` |
| 0.579 | 8.10 | `--font-size-scale-down-03` |

**Dica:** utilize alguma calculadora [_Type Scale_](https://type-scale.com/) (como o site [_Modular Scale_](https://www.modularscale.com/)) para calcular os tamanhos dentro da escala.

Caso o tamanho não atenda sua interface, utilize um valor diferente para a fonte base, porém, a escala deve se manter a mesma (ou seja, com a mesma proporção entre os estilos).

> **Cuidado**: manter um valor de fonte base muito alto ou muito pequeno, pode atrapalhar na legibilidade do conteúdo. Utilize um valor base diferente do recomendado somente em casos que justifique seu uso.

### Ampliando a Escala Tipográfica [Link para seção Ampliando a Escala Tipográfica](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#ampliando-a-escala-tipografica)

Caso haja necessidade, os valores da escala tipográfica podem ser ampliados, além dos valores demonstrados na tabela acima, crescendo ou reduzindo na mesma proporção _Minor Third (1,2)_. Por exemplo:

- Crescendo: `41,80px`, `50,16px`, `60,19px`, `72,23px`, …
- Reduzindo: `8.10px`, `6,75px`, `5,62px`, `4.68px`, …

Quando reduzir ou ampliar a escala tipográfica, fique atento às questões de legibilidade.

* * *

## _Line-height_ (entrelinha) [Link para seção Line-height (entrelinha)](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#line-height-entrelinha)

Para utilizar corretamente o valor do entrelinhamento é preciso trabalhar com valores em porcentagem ou relativos (como _rem_ ou _em_), pois o valor vai depender do tamanho da fonte que ele está sendo aplicado. Por padrão, utilize entrelinha de 1.45 para valores até a fonte base, após isso, utilize o valor de 1,15.

**OBS:** para trabalhar com softwares que trabalham com unidades em pixel (como Adobe XD), multiplique o valor do tamanho da fonte pelo valor da entrelinha da tabela. _Exemplo:_ No H1 a line-height é 1.15 do valor de 41.8px (size), logo o valor da final será 48,07px.\*

| Line-Height (em) | Token |
| --- | --- |
| 1.15 | `--font-lineheight-low` |
| 1.45 | `--font-lineheight-medium` |
| 1.85 | `--font-lineheight-high` |

* * *

## Tabelas de Estilos [Link para seção Tabelas de Estilos](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#tabelas-de-estilos)

Utilize a tabela de estilo para determinar o visual de cada estilo de tipografia utilizada. Todos os estilos são [elementos nativos do HTML](https://www.w3schools.com/tags/default.asp).

Lembre-se, o valor _line-height_ (entrelinhamento) não se refere ao fonte base, e sim ao valor final da escala do próprio elemento textual. _Exemplo:_ No H1 a line-height 1.15, ou seja, 115% do valor de 2,986em (`--font-size-scale-up-06`).\*

**Atenção:** As informações apresentadas nas tabelas para _Grid de 4 Colunas_ exibem apenas as propriedades que diferem do padrão 12 e 8 colunas.

### Título (H1) [Link para seção Título (H1)](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#titulo-h1)

![Título H1](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/tipografia/imagens/h1.png)

_Exemplo do Estilo H1 com fundo claro e escuro e na Grid de 4 colunas._

| Propriedade | Token / Valor |
| --- | --- |
| Size | `--font-size-scale-up-06` |
| Weight | `--font-weight-light` |
| Line-height | `--font-line-height-low` |
| Color | `--gray-80` |
| Color (dark) | `--pure-0` |
| Margin-bottom | `--spacing-scale-4x` |

#### Título (H1) para _Grid_ de 4 colunas [Link para seção Título (H1) para Grid de 4 colunas](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#titulo-h1-para-grid-de-4-colunas)

| Propriedade | Token / Valor |
| --- | --- |
| Size | `--font-size-scale-up-04` |
| Weight | `--font-weight-medium` |
| Margin-bottom | `--spacing-scale-2xh` |

### Título (H2) [Link para seção Título (H2)](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#titulo-h2)

![Título H2](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/tipografia/imagens/h2.png)

_Exemplo do Estilo H2 com fundo claro e escuro e na Grid de 4 colunas._

| Propriedade | Token / Valor |
| --- | --- |
| Size | `--font-size-scale-up-05` |
| Weight | `--font-weight-regular` |
| Line-height | `--font-line-height-low` |
| Color | `--gray-80` |
| Color (dark) | `--pure-0` |
| Margin-bottom | `--spacing-scale-2xh` |
| Margin-top | `--spacing-scale-3xh` |

#### Título (H2) para _Grid_ de 4 colunas [Link para seção Título (H2) para Grid de 4 colunas](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#titulo-h2-para-grid-de-4-colunas)

| Propriedade | Token / Valor |
| --- | --- |
| Size | `--font-size-scale-up-03` |
| Weight | `--font-weight-semi-bold` |

### Título (H3) [Link para seção Título (H3)](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#titulo-h3)

![Título H3](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/tipografia/imagens/h3.png)

_Exemplo do Estilo H3 com fundo claro e escuro e na Grid de 4 colunas._

| Propriedade | Token / Valor |
| --- | --- |
| Size | `--font-size-scale-up-04` |
| Weight | `--font-weight-medium` |
| Line-height | `--font-line-height-low` |
| Color | `--gray-80` |
| Color (dark) | `--pure-0` |
| Margin-bottom | `--spacing-scale-2xh` |
| Margin-top | `--spacing-scale-3xh` |

#### Título (H3) para _Grid_ de 4 colunas [Link para seção Título (H3) para Grid de 4 colunas](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#titulo-h3-para-grid-de-4-colunas)

| Propriedade | Token / Valor |
| --- | --- |
| Size | `--font-size-scale-up-02` |
| Weight | `--font-weight-bold` |

### Título (H4) [Link para seção Título (H4)](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#titulo-h4)

![Título H4](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/tipografia/imagens/h4.png)

_Exemplo do Estilo H4 com fundo claro e escuro e na Grid de 4 colunas._

| Propriedade | Token / Valor |
| --- | --- |
| Size | `--font-size-scale-up-03` |
| Weight | `--font-weight-semi-bold` |
| Line-height | `--font-line-height-low` |
| Color | `--gray-80` |
| Color (dark) | `--pure-0` |
| Margin-bottom | `--spacing-scale-2xh` |
| Margin-top | `--spacing-scale-3xh` |

#### Título (H4) para _Grid_ de 4 colunas [Link para seção Título (H4) para Grid de 4 colunas](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#titulo-h4-para-grid-de-4-colunas)

| Propriedade | Token / Valor |
| --- | --- |
| Size | `--font-size-scale-up-01` |
| Weight | `--font-weight-bold` |
| Margin-top | `--spacing-scale-2x` |

### Título (H5) [Link para seção Título (H5)](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#titulo-h5)

![Título H5](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/tipografia/imagens/h5.png)

_Exemplo do Estilo H5 com fundo claro e escuro e na Grid de 4 colunas._

| Propriedade | Token / Valor |
| --- | --- |
| Size | `--font-size-scale-up-02` |
| Weight | `--font-weight-bold` |
| Line-height | `--font-line-height-low` |
| Color | `--gray-80` |
| Color (dark) | `--pure-0` |
| Margin-bottom | `--spacing-scale-2x` |
| Margin-top | `--spacing-scale-3xh` |
| Text-transform | `uppercase` |

#### Título (H5) para _Grid_ de 4 colunas [Link para seção Título (H5) para Grid de 4 colunas](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#titulo-h5-para-grid-de-4-colunas)

| Propriedade | Token / Valor |
| --- | --- |
| Size | `--font-size-scale-base` |
| Weight | `--font-weight-extra-bold` |
| Margin-top | `--spacing-scale-2x` |

### Título (H6) [Link para seção Título (H6)](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#titulo-h6)

![Título H6](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/tipografia/imagens/h6.png)

_Exemplo do Estilo H6 com fundo claro e escuro e na Grid de 4 colunas._

| Propriedade | Token / Valor |
| --- | --- |
| Size | `--font-size-scale-up-01` |
| Weight | `--font-weight-extra-bold` |
| Line-height | `--font-line-height-low` |
| Color | `--gray-80` |
| Color (dark) | `--pure-0` |
| Margin-bottom | `--spacing-scale-2x` |
| Margin-top | `--spacing-scale-3xh` |
| Text-transform | `uppercase` |

#### Título (H6) para _Grid_ de 4 colunas [Link para seção Título (H6) para Grid de 4 colunas](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#titulo-h6-para-grid-de-4-colunas)

| Propriedade | Token / Valor |
| --- | --- |
| Size | `--font-size-scale-down-01` |
| Margin-top | `--spacing-scale-2x` |

### Parágrafo (P) [Link para seção Parágrafo (P)](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#paragrafo-p)

![Parágrafo](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/tipografia/imagens/paragraph.png)

_Exemplo do Estilo Parágrafo com fundo claro e escuro e na Grid de 4 colunas._

| Propriedade | Token / Valor |
| --- | --- |
| Size | `--font-size-scale-up-01` |
| Weight | `--font-weight-regular` |
| Line-height | `--font-line-height-medium` |
| Color | `--gray-80` |
| Color (dark) | `--pure-0` |
| Margin-bottom | `--spacing-scale-2x` |

#### Parágrafo (P) para _Grid_ de 4 colunas [Link para seção Parágrafo (P) para Grid de 4 colunas](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#paragrafo-p-para-grid-de-4-colunas)

| Propriedade | Token / Valor |
| --- | --- |
| Size | `--font-size-scale-base` |

### Rótulo (Label) [Link para seção Rótulo (Label)](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#rotulo-label)

![Label](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/tipografia/imagens/label.png)

_Exemplo do Estilo Label com fundo claro e escuro._

| Propriedade | Token / Valor |
| --- | --- |
| Size | `--font-size-scale-base` |
| Weight | `--font-weight-semi-bold` |
| Line-height | `--font-line-height-medium` |
| Color | `--gray-80` |
| Color (dark) | `--pure-0` |
| Margin-bottom | `--spacing-scale-half` |

### Campo de Entrada de Texto (Input) [Link para seção Campo de Entrada de Texto (Input)](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#campo-de-entrada-de-texto-input)

![Input](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/tipografia/imagens/input.png)

_Exemplo do Estilo Input com fundo claro e escuro._

| Propriedade | Token / Valor |
| --- | --- |
| Size | `--font-size-scale-up-01` |
| Weight | `--font-weight-medium` |
| Line-height | `--font-line-height-low` |
| Color | `--gray-80` |
| Color (dark) | `--pure-0` |
| Margin-bottom | `--spacing-scale-half` |

### Descrição em Campo de Texto (Placeholder) [Link para seção Descrição em Campo de Texto (Placeholder)](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#descricao-em-campo-de-texto-placeholder)

![Placeholder](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/tipografia/imagens/placeholder.png)

_Exemplo do Estilo Placeholder com fundo claro e escuro._

| Propriedade | Token / Valor |
| --- | --- |
| Size | `--font-size-scale-base` |
| Weight | `--font-weight-regular` |
| Line-height | `--font-line-height-medium` |
| Font-style | `italic` |
| Color | `--gray-80` |
| Color (dark) | `--pure-0` |
| Margin-bottom | `--spacing-scale-half` |
| Margin-top | `--spacing-scale-half` |

### Legendas (Legend) [Link para seção Legendas (Legend)](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#legendas-legend)

![Legend](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/tipografia/imagens/legend.png)

_Exemplo do Estilo Legend com fundo claro e escuro._

| Propriedade | Token / Valor |
| --- | --- |
| Size | `--font-size-scale-up-01` |
| Weight | `--font-weight-semi-bold` |
| Line-height | `--font-line-height-low` |
| Color | `--gray-80` |
| Color (dark) | `--pure-0` |
| Margin-bottom | `--spacing-scale-2x` |
| Margin-top | `--spacing-scale-2x` |

### Marcação de Texto (Mark) [Link para seção Marcação de Texto (Mark)](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#marcacao-de-texto-mark)

![Mark](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/tipografia/imagens/mark.png)

_Exemplo do Estilo Mark._

| Propriedade | Token / Valor |
| --- | --- |
| Color | `--gray-80` |
| Background | `--red-warm-vivid-10` |

### Bloco de código (Code) [Link para seção Bloco de código (Code)](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#bloco-de-codigo-code)

![Code](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/tipografia/imagens/code.png)

_Exemplo do Estilo Code no formato Inline e Bloco._

| Propriedade | Token / Valor |
| --- | --- |
| Font-family | `monospace` (Utilize uma fonte monoespaçada) |
| Size | `--font-size-scale-base` |
| Weight | `--font-weight-medium` |
| Line-height | `--font-line-height-low` |
| Color | `--gray-80` |
| Background | `--gray-5` |
| Padding (Inline) | `--spacing-scale-half` |
| Padding (Bloco) | `--spacing-scale-2x` |

**OBS:** O valor estipulado em _SIZE_ é considerado _padrão_ nos elementos de `Legend``mark` e `code`. O valor padrão é recomendado sempre que utilizar o estilo, porém, ele pode ser alterado caso queira aplicar algum tipo de _hierarquia_.

> **Exemplo:** Ter vários `Fieldset`+`Legend` aninhados (ordenadas) criando uma estrutura hierárquica em um formulário, pode ser interessante utilizar um SIZE (dentro da escala) diferenciado para cada `Legend`….

### Listas (UL, OL, DL) [Link para seção Listas (UL, OL, DL)](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#listas-ul-ol-dl)

- **Não ordenada (UL):** utilizado para agrupar um conjunto de itens relacionados sem nenhuma ordem particular.

![Lista Não Ordenada](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/tipografia/imagens/list-unordered.png)

_Exemplo de Lista Não Ordenada em fundo claro e escuro_

- **Ordenada (OL):** usada para agrupar um conjunto de itens relacionados a uma ordem específica.

![Lista Ordenada](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/tipografia/imagens/list-orderly.png)

_Exemplo de Lista Ordenada em fundo claro e escuro_

- **Lista com Definições (DL):** usada para exibir termos e explicações dos termos.

![Lista com Definições](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/tipografia/imagens/list-definitions.png)

_Exemplo de Lista com Definições em fundo claro e escuro_

| Propriedade | Token / Valor |
| --- | --- |
| Size | `--font-size-scale-up-01` |
| Weight | `--font-weight-regular` |
| Line-height | `--font-line-height-medium` |
| Color | `--gray-80` |
| Color (dark) | `--pure-0` |
| Margin-bottom (item) | `--spacing-scale-base` |
| Margin-bottom (lista completa) | `--spacing-scale-2x` |

* * *

## Unidades de Espaçamento entre caracteres ( _Letter Spacing_) [Link para seção Unidades de Espaçamento entre caracteres (Letter Spacing)](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#unidades-de-espacamento-entre-caracteres-letter-spacing)

Em alguns softwares (como da Adobe), o espaçamento de um bloco de texto ( _tracking_) e o ajuste de espaço entre caracteres adjacentes ( _Kerning_) são medidos em 1/1.000em, uma unidade de medida que é relativa ao tamanho atual da face de tipos. Em uma fonte de 6 pontos, 1em é igual a 6 pontos; em uma fonte de 10 pontos, 1em é igual a 10 pontos. Ou seja, são estritamente proporcionais ao tamanho da face de tipos utilizado.

Para calcular o valor do espaçamento entre os caracteres utilize o seguinte fórmula:

> _LetterSpacing_(px) = tamanho da fonte(pt ou px) _tracking_ da Adobe / 1000.

* * *

## Tabela de conversão PX, PT, EM e % [Link para seção Tabela de conversão PX, PT, EM e %](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#tabela-de-conversao-px-pt-em-e)

A tabela a seguir, tem como referência resolução de 96dpi com fonte base equivalente a 14px.

Onde 1 pixel = 0,75 pontos e 1 ponto = 1,33333 pixel.

| Ponto | Pixel | Em | Porcentagem |
| --- | --- | --- | --- |
| 6 pt | 8 px | 0.57 em | 57 % |
| 6,75 pt | 9 px | 0.64 em | 64 % |
| 7,5 pt | 10 px | 0.71 em | 71 % |
| 8,25 pt | 11 px | 0.785 em | 78,5 % |
| 9 pt | 12 px | 0.85 em | 85 % |
| 9,75 pt | 13 px | 0.92 em | 92 % |
| 10,5 pt | 14 px | 1 em | 100 % |
| 11,25 pt | 15 px | 1,07 em | 107 % |
| 12 pt | 16 px | 1,14 em | 114 % |
| 12,75 pt | 17 px | 1,21 em | 121 % |
| 13,5 pt | 18 px | 1,28 em | 128 % |
| 14,25 pt | 19 px | 1,35 em | 135 % |
| 15 pt | 20 px | 1,42 em | 142 % |
| 15,75 pt | 21 px | 1,5 em | 150 % |
| 16,5 pt | 22 px | 1,57 em | 157 % |
| 17,25 pt | 23 px | 1,64 em | 164 % |
| 18 pt | 24 px | 1,71 em | 171 % |
| 18,75 pt | 25 px | 1,785 em | 178,5 % |
| 19,5 pt | 26 px | 1,85 em | 185 % |
| 20,25 pt | 27 px | 1,92 em | 192 % |
| 21 pt | 28 px | 2 em | 200 % |
| 21,75 pt | 29 px | 2,07 em | 207 % |
| 22,5 pt | 30 px | 2,14 em | 214 % |
| 23,25 pt | 31 px | 2.21 em | 221 % |
| 24 pt | 32 px | 2,28 em | 228 % |
| 24,75 pt | 33 px | 2,35 em | 235 % |
| 25,5 pt | 34 px | 2,42 em | 242 % |
| 26,25 pt | 35 px | 2,5 em | 250 % |

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

## Utilitários CSS de Tipografia [Link para seção Utilitários CSS de Tipografia](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#utilitarios-css-de-tipografia)

São classes CSS para aplicar o **Fundamento Visual Tipografia**.

### Como usar [Link para seção Como usar](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#como-usar)

Modifique **estilos**, **tamanhos**, **pesos**, **alinhamento** e outras características dos textos.

#### Estilos tipográficos [Link para seção Estilos tipográficos](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#estilos-tipograficos)

Aplique estilos de texto, independente da tag HTML.

Use a classe correspondente ao estilo desejado:

- `h1` → Título H1;
- `h2` → Título H2;
- `h3` → Título H3;
- `h4` → Título H4;
- `h5` → Título H5;
- `h6` → Título H6;
- `label` → Rótulo;
- `input` → Campo de entrada;
- `placeholder` → Descrição em campo;
- `legend` → Legenda;
- `code` → Bloco de código;
- `mark` → Marcação de texto.

**Exemplo:**`<p class="h1">Texto com estilo de H1</p>`

#### Tamanho da fonte [Link para seção Tamanho da fonte](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#tamanho-da-fonte)

Modifique o tamanho da fonte do texto.

Use o prefixo `text-` seguido do tamanho desejado.

**Exemplo:**`text-base`, `text-up-04`, `text-down-01`

> Veja todos os tamanhos disponíveis em [Visão Geral](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral#escala-tipografica).

#### Peso da fonte [Link para seção Peso da fonte](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#peso-da-fonte)

Modifique o peso ( _font-weight_) do texto.

Use o prefixo `text-weight-` seguido do peso desejado.

**Exemplo:**`text-weight-regular`, `text-weight-medium`, `text-weight-bold`

> Veja todos os pesos disponíveis em [Visão Geral](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral#peso-da-fonte-font-weight).

#### Transformação de texto [Link para seção Transformação de texto](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#transformacao-de-texto)

Modifique a capitalização do texto.

Use a classe correspondente à transformação desejada:

- `text-lowercase` → todas as letras minúsculas;
- `text-uppercase` → todas as letras maiúsculas;
- `text-capitalize` → primeira letra de cada palavra em maiúscula.

**Exemplo:**`<p class="text-uppercase">texto em maiúsculas</p>`

#### Alinhamento de texto [Link para seção Alinhamento de texto](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#alinhamento-de-texto)

Modifique o alinhamento horizontal do texto.

Use a classe correspondente ao alinhamento desejado:

- `text-left` → alinha à esquerda;
- `text-center` → centraliza;
- `text-right` → alinha à direita;
- `text-justify` → justifica.

**Exemplo:**`<p class="text-center">Texto centralizado</p>`

> **Atenção!** O elemento precisa ter display “block” ou “inline-block”. Veja os [utilitários de superfície](https://www.gov.br/ds/fundamentos-visuais/superficie?tab=codigos) para modificar o display.

#### Quebra de linha [Link para seção Quebra de linha](https://www.gov.br/ds/fundamentos-visuais/tipografia?tab=visao-geral\#quebra-de-linha)

Controle o comportamento da quebra de linha do texto.

Use a classe correspondente ao comportamento desejado:

- `text-wrap` → quebra linha em espaços ou hífens;
- `text-nowrap` → nunca quebra linha;
- `text-truncate` → oculta excedente e adiciona reticências;
- `text-break` → quebra linha forçadamente.

**Exemplo:**`<p class="text-truncate">Texto longo...</p>`

> **Atenção!** O elemento precisa ter display “block” ou “inline-block”. Veja os [utilitários de superfície](https://www.gov.br/ds/fundamentos-visuais/superficie?tab=codigos) para modificar o display.

* * *

## Exemplos de códigos

### Estilos tipográficos

CodePen

Abrir exemplo no CodePen

Título h1

Lorem ipsum dolor texto usando mark elit. Ipsam distinctio temporibus texto usando code adipisci, mollitia omnis! Porro eligendi, fuga voluptatem nemo, placeat repudiandae adipisci quam corrupti animi quibusdam similique impedit cum?

Configurações (legend)

Opções (label)

Opção 1

Opção 2

Tema (legend)

Cor selecionada (label)

Verde

Azul

CodePen

Abrir exemplo no CodePen

```html

<p class="h1">Título h1</p>
<p>Lorem ipsum dolor <span class="mark">texto usando mark</span> elit. Ipsam distinctio temporibus <span class="code">texto usando code</span> adipisci, mollitia omnis! Porro eligendi, fuga voluptatem nemo, placeat repudiandae adipisci quam corrupti animi quibusdam similique impedit cum?</p>
<p class="legend">Configurações (legend)</p>
<p class="mb-base label">Opções (label)</p>
<div class="br-checkbox">
  <input id="check-1" name="check-1" type="checkbox"/>
  <label for="check-1">Opção 1</label>
</div>
<div class="br-checkbox">
  <input id="check-2" name="check-2" type="checkbox"/>
  <label for="check-2">Opção 2</label>
</div>
<p class="legend">Tema (legend)</p>
<p class="mb-base label">Cor selecionada (label)</p>
<div class="br-radio">
  <input id="radio-1" type="radio" name="radio" value="radio-1"/>
  <label for="radio-1">Verde</label>
</div>
<div class="br-radio">
  <input id="radio-2" type="radio" name="radio" value="radio-2" checked="checked"/>
  <label for="radio-2">Azul</label>
</div>
```

Copiar

Expandir

### Tamanho e peso de fonte

CodePen

Abrir exemplo no CodePen

Simula um h1

Simula um h3

CodePen

Abrir exemplo no CodePen

```html

<p class="text-up-06 text-weight-light">Simula um h1</p>
<p class="text-up-02 text-weight-bold">Simula um h3</p>
```

Copiar

### Transformação no texto

CodePen

Abrir exemplo no CodePen

`text-lowercase`

Força todas as letras minúsculas

`text-uppercase`

Força todas as letras maiúsculas

`text-capitalize`

Primeira letra de cada palavra em maiúsculo

CodePen

Abrir exemplo no CodePen

```html
<code>text-lowercase</code>
<p class="text-lowercase">Força todas as letras minúsculas</p><code>text-uppercase</code>
<p class="text-uppercase">Força todas as letras maiúsculas</p><code>text-capitalize</code>
<p class="text-capitalize">Primeira letra de cada palavra em maiúsculo</p>
```

Copiar

### Alinhamento do texto

CodePen

Abrir exemplo no CodePen

text-left

text-center

text-right

CodePen

Abrir exemplo no CodePen

```html

<p class="border-solid-sm p-base text-left">text-left</p>
<div class="my-3x"></div>
<p class="border-solid-sm p-base text-center">text-center</p>
<div class="my-3x"></div>
<p class="border-solid-sm p-base text-right">text-right</p>
```

Copiar

### Quebra de linha

CodePen

Abrir exemplo no CodePen

Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis architecto minus commodi rem voluptates neque quis aut. Odio tenetur laudantium ipsum voluptatum neque! Alias sunt beatae a unde ad quod!

Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis architecto minus commodi rem voluptates neque quis aut. Odio tenetur laudantium ipsum voluptatum neque! Alias sunt beatae a unde ad quod!

Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis architecto minus commodi rem voluptates neque quis aut. Odio tenetur laudantium ipsum voluptatum neque! Alias sunt beatae a unde ad quod!

CodePen

Abrir exemplo no CodePen

```html

<div class="p-base border-solid-sm">
  <div class="text-wrap">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis architecto minus commodi rem voluptates neque quis aut. Odio tenetur laudantium ipsum voluptatum neque! Alias sunt beatae a unde ad quod!</div>
</div>
<div class="p-base border-solid-sm mt-3x overflow-auto">
  <div class="text-nowrap">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis architecto minus commodi rem voluptates neque quis aut. Odio tenetur laudantium ipsum voluptatum neque! Alias sunt beatae a unde ad quod!</div>
</div>
<div class="p-base border-solid-sm mt-3x">
  <div class="text-truncate">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis architecto minus commodi rem voluptates neque quis aut. Odio tenetur laudantium ipsum voluptatum neque! Alias sunt beatae a unde ad quod!</div>
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
