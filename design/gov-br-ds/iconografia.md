# Iconografia [Link para seção Iconografia](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#iconografia)

Os ícones são representações gráficas que podem simbolizar uma ação, comunicar ao usuário possibilidades de mudança de estados entre os elementos de uma interface ou apenas ser uma representação gráfica de uma ação ou informação textual. No caso do _Design System_, foi escolhida a coleção de ícones _“Font Awesome“_ (versão 5.10.2) por possuir uma boa variedade de ícones com _layout_ simples, sintético e amigável.

## Princípios [Link para seção Princípios](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#principios)

### Experiência Única [Link para seção Experiência Única](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#experiencia-unica)

Além da diversidade, foi considerado que o _Font Awesome_ traria uma padronização visual dos ícones bastante importante no processo de reconhecimento e memorização pelos usuários. Optou-se pelo uso dos _estilos solid_ ( _style prefix_: `fas`) e a _brand_ ( _style prefix_: `fab`). Então as características gráficas, como preenchimento, peso visual devem ser preservadas no momento de construção de novos ícones.

Espera-se por tanto, que o padrão gráfico dos ícones por ser utilizado em vários sistemas do governo federal, passe a exercer um papel importante no reconhecimento dos usuários, no que diz respeito a interfaces governamentais.

Sendo assim, é imprescindível que o designer e o desenvolvedor priorizem a utilização dos ícones, como demonstrado na _Tabela de Orientações de Uso_. É fundamental atribuir os significados recomendados na tabela, evitando duplo sentido e facilitando o reconhecimento e memorização por parte do usuário.

### Eficiência e Clareza [Link para seção Eficiência e Clareza](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#eficiencia-e-clareza)

Os ícones do _Font Awesome_ possuem um desenho sintético, porém de fácil compreensão, e devem exercer o papel de auxiliar o usuário na execução de uma ação ou na representação de um serviço. É fundamental que a escolha do ícone para representar uma ideia, ação, ou serviço considere a experiência do usuário e esteja sempre alinhada ao contexto cultural do Brasil, para que seja de fácil reconhecimento público.

Para uma melhor legibilidade é recomendado que quando possível um _label_ ou _hint_ apareça ao lado do ícone reforçando a ideia a que foi atribuído.

Quando utilizado como um elemento de ação (seja um hiperlink, um botão ou qualquer outro elemento interativo) é importante que o ícone represente a ação a ser executada.

### Acessibilidade [Link para seção Acessibilidade](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#acessibilidade)

Os ícones podem transmitir todos os tipos de informações significativas, por isso é importante que eles alcancem a maior quantidade possível de pessoas. Para que isso aconteça, o _Font Awesome_ categoriza seus ícones em dois tipos: _decorativos_ e _semânticos_.

A [acessibilidade](https://fontawesome.com/how-to-use/on-the-web/other-topics/accessibility) para _webfonts_ exige um pouco mais de trabalho, pois o método _Webfont_ com CSS não pode adicionar atributos ou elementos ao seu HTML.

Ao usar ícones em sua interface do usuário, existem técnicas manuais e formas de ajudar a tecnologia assistencial a ignorar ou entender melhor o _Font Awesome_.

#### 1\. Ícones Decorativos [Link para seção 1. Ícones Decorativos](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#1-icones-decorativos)

São usados apenas para reforço visual ou de _branding_. Se forem removidos da página, os usuários ainda entenderiam e poderiam utilizar a página.

Se os ícones são puramente decorativos é necessário adicionar manualmente um atributo `aria-hidden` a cada um deles para que sejam acessíveis.

```html
<i class="fas fa-camera-retro" aria-hidden></i>
```

Copiar

##### SVG com JavaScript - Ícones Decorativos [Link para seção SVG com JavaScript - Ícones Decorativos](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#svg-com-javascript-icones-decorativos)

```html
<i class="fas fa-camera-retro"></i>
```

Copiar

A acessibilidade do _Font Awesome_ adiciona automaticamente `aria-hidden=true` e `role=“img”` aos seus atributos SVG _in-line_, para que seus ícones estejam adequadamente acessíveis.

```html
<svg
  class="svg-inline--fa fa-camera-retro fa-w-16"
  aria-hidden="true"
  data-fa-i2svg=""
  data-prefix="fas"
  data-icon="camera-retro"
  role="img"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 512 512"
>
  <path
    fill="currentColor"
    d="M48 32C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H48zm0 32h106c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H38c-3.3 0-6-2.7-6-6V80c0-8.8 7.2-16 16-16zm426 96H38c-3.3 0-6-2.7-6-6v-36c0-3.3 2.7-6 6-6h138l30.2-45.3c1.1-1.7 3-2.7 5-2.7H464c8.8 0 16 7.2 16 16v74c0 3.3-2.7 6-6 6zM256 424c-66.2 0-120-53.8-120-120s53.8-120 120-120 120 53.8 120 120-53.8 120-120 120zm0-208c-48.5 0-88 39.5-88 88s39.5 88 88 88 88-39.5 88-88-39.5-88-88-88zm-48 104c-8.8 0-16-7.2-16-16 0-35.3 28.7-64 64-64 8.8 0 16 7.2 16 16s-7.2 16-16 16c-17.6 0-32 14.4-32 32 0 8.8-7.2 16-16 16z"
  ></path>
</svg>
```

Copiar

#### 2\. Ícones Semânticos [Link para seção 2. Ícones Semânticos](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#2-icones-semanticos)

São aqueles usados para transmitir um significado, ao invés de apenas servir de decoração. Isso inclui ícones sem texto ao lado deles usando como controle interativo (botões, elementos de formulário, _toggles_…).

Se os ícones tiverem significado semântico, é preciso adicionar manualmente algumas coisas para que ele seja acessado apropriadamente:

- Atributo `aria-hidden`.
- Forneça uma alternativa de texto dentro de um elemento `<span>` (ou similar). Inclua também o CSS apropriado

para ocultar visualmente o elemento, mantendo-o acessível a tecnologias assistivas.
- Atributo `title` no ícone para fornecer uma dica de ferramenta para usuários com visão e que utilizam o mouse.

```html
<i aria-hidden class="fas fa-car" title="Time to destination by car"></i>
<span class="sr-only">Time to destination by car:</span>
<span>4 minutes</span>
```

Copiar

No caso de elementos interativos focalizáveis, existem várias opções para incluir um texto ou rótulo alternativo ao elemento, sem a necessidade de qualquer ocultação visual `<span>` ou semelhante.

Como, por exemplo, adicionando o atributo `aria-label` com uma descrição de texto ao próprio elemento interativo será suficiente para fornecer um nome alternativo acessível.

Se você precisar fornecer uma dica visual ( _tooltip_) em um _mouseover/focus_, recomendamos usar o atributo `title` ou uma solução de _tooltip_ personalizado.

```html
<a href="path/to/shopping/cart" aria-label="View 3 items in your shopping cart">
  <i aria-hidden class="fas fa-shopping-cart"></i>
</a>
```

Copiar

```html
<a aria-label="Skip to main navigation" href="#navigation-main">
  <i aria-hidden class="fas fa-bars"></i>
</a>
```

Copiar

```html
<a aria-label="Delete" class="btn btn-danger" href="path/to/settings">
  <i aria-hidden class="fas fa-trash" title="Delete this item?"></i>
</a>
```

Copiar

##### SVG com JavaScript - Ícones Semânticos [Link para seção SVG com JavaScript - Ícones Semânticos](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#svg-com-javascript-icones-semanticos)

Obter a acessibilidade correta pode ser difícil, por isso, o _Font Awesome_ simplifica o processo com o recurso de acessibilidade automática. Usando um pouco de JS, adicionando elementos e atributos no HTML de suporte para que os ícones fiquem acessíveis ao público mais amplo possível.

Se o ícone possuir significado semântico, coloque um atributo `title=“meaning”`. A acessibilidade automática cuida do resto, adicionando o seguinte:

• Função ARIA adequada ( `role=“img”` )

• Tag `title` com um atributo `id` adequado

• Atributo `aria-labelledby`e conecte-o a uma tag `title`

```html
<i title="Magic is included!" class="fas fa-magic"></i>
```

Copiar

```html
<svg
  title="Magic is included!"
  class="svg-inline--fa fa-magic fa-w-16"
  aria-labelledby="svg-inline--fa-title-1"
  data-fa-i2svg=""
  data-prefix="fas"
  data-icon="magic"
  role="img"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 512 512"
>
  <title id="svg-inline--fa-title-1">Magic is included!</title>
  <path
    fill="currentColor"
    d="M101.1 505L7 410.9c-9.4-9.4-9.4-24.6 0-33.9L377 7c9.4-9.4 24.6-9.4 33.9 0l94.1 94.1c9.4 9.4 9.4 24.6 0 33.9L135 505c-9.3 9.3-24.5 9.3-33.9 0zM304 159.2l48.8 48.8 89.9-89.9-48.8-48.8-89.9 89.9zM138.9 39.3l-11.7 23.8-26.2 3.8c-4.7.7-6.6 6.5-3.2 9.8l19 18.5-4.5 26.1c-.8 4.7 4.1 8.3 8.3 6.1L144 115l23.4 12.3c4.2 2.2 9.1-1.4 8.3-6.1l-4.5-26.1 19-18.5c3.4-3.3 1.5-9.1-3.2-9.8L160.8 63l-11.7-23.8c-2-4.1-8.1-4.1-10.2.1zm97.7-20.7l-7.8 15.8-17.5 2.6c-3.1.5-4.4 4.3-2.1 6.5l12.6 12.3-3 17.4c-.5 3.1 2.8 5.5 5.6 4L240 69l15.6 8.2c2.8 1.5 6.1-.9 5.6-4l-3-17.4 12.6-12.3c2.3-2.2 1-6.1-2.1-6.5l-17.5-2.5-7.8-15.8c-1.4-3-5.4-3-6.8-.1zm-192 0l-7.8 15.8L19.3 37c-3.1.5-4.4 4.3-2.1 6.5l12.6 12.3-3 17.4c-.5 3.1 2.8 5.5 5.6 4L48 69l15.6 8.2c2.8 1.5 6.1-.9 5.6-4l-3-17.4 12.6-12.3c2.3-2.2 1-6.1-2.1-6.5l-17.5-2.5-7.8-15.8c-1.4-3-5.4-3-6.8-.1zm416 223.5l-7.8 15.8-17.5 2.5c-3.1.5-4.4 4.3-2.1 6.5l12.6 12.3-3 17.4c-.5 3.1 2.8 5.5 5.6 4l15.6-8.2 15.6 8.2c2.8 1.5 6.1-.9 5.6-4l-3-17.4 12.6-12.3c2.3-2.2 1-6.1-2.1-6.5l-17.5-2.5-7.8-15.8c-1.4-2.8-5.4-2.8-6.8 0z"
  ></path>
</svg>
```

Copiar

Expandir

### Reutilização e Colaboração [Link para seção Reutilização e Colaboração](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#reutilizacao-e-colaboracao)

Interfaces digitais do governo devem ser reutilizáveis devido à diversidade de serviços disponíveis, sendo assim, o uso do _Font Awesome_ facilita esse reuso, por ser mais fácil de implementar. Caso haja necessidade podem ser incluídos novos ícones, porém é necessário consultar a tabela de orientações de uso, para verificar se a funcionalidade já foi atribuída a algum ícone. É interessante que haja um trabalho em conjunto de criação e validação entre a equipe que vai propor novos ícones e a equipe de _design_ para que sejam preservadas as características do padrão gráfico do _Design System_.

* * *

## Font Awesome [Link para seção Font Awesome](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#font-awesome)

[Font Awesome](https://fontawesome.com/) É um conjunto de ferramentas de fontes e ícones com base em CSS e LESS. Foi criado por _Dave Gandy_ para uso com o _Twitter Bootstrap_ e mais tarde foi incorporado no _BootstrapCDN_.

A versão 5.10.2 possui uma grande variedade de ícones. Foram expostos aqui, apenas alguns, para que seja constatado sua variedade. Caso haja alguma funcionalidade, que não seja facilmente representada pelos que foram aqui apresentados, deve-se primeiro procurar uma opção dentro dos demais disponíveis na família de ícones e caso não haja, pode-se desenhar um novo, desde que, seja mantido o padrão visual já definido e passe posteriormente pela validação da equipe de _Design_.

No final deste documento, foi incluído as _orientações de uso_ de alguns dos ícones e essa tabela deve ser seguida para que haja consistência entre os sistemas do governo.

Atualmente no _Design System_ são utilizados 2 estilos disponíveis: _Solid_ e a _Brand_.

### Estilo _Solid_ [Link para seção Estilo Solid](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#estilo-solid)

Estilo padrão. Pode ser utilizado em todas as situações que necessitam do uso de ícones.

![Exemplo FontAwesome Solid](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/iconografia/imagens/fontawesome.png)

_Alguns ícones da Font Awesome Solid_

### Estilo _Brand_ [Link para seção Estilo Brand](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#estilo-brand)

Estilo muito parecido ao Solid, porém, são limitados, pois, são voltados para representações das marcas atuais no mercado, inclusive das redes-sociais.

![Exemplo FontAwesome Brand](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/iconografia/imagens/fontawesome-brand.png)

_Alguns ícones da Font Awesome Brand_

Caso não encontre o ícone adequado nesta biblioteca (ou nos estilos mencionados acima), utilize as instruções descritas em _Ícones Personalizados_.

* * *

## Ícones Personalizados [Link para seção Ícones Personalizados](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#icones-personalizados)

Em algumas situações, a família _Font Awesome_ pode não suprir todas as necessidades de uma interface. Nestas situações, pode-se criar ícones para representar as ações específicas de uma aplicação. Essa criação poderá ser feita tanto por técnicas de transformação (utilizando os próprios ícones da família) tal como o [Layering](https://fontawesome.com/v5.9.0/how-to-use/on-the-web/styling/layering); como na criação do zero de algum novo ícone. Independente da forma utilizada, deve-se seguir todas as características visuais de construção já padronizadas do _Font Awesome Solid_.

Veja alguns ícones criados abaixo utilizando alguns desses modos:

![Imagem do Ícone de Certificado Digital e do NEOID](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/iconografia/imagens/icones-criados.png)

_Exemplo de ícones personalizados_

* * *

## Anatomia e Comportamento [Link para seção Anatomia e Comportamento](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#anatomia-e-comportamento)

### Grid do Font Awesome [Link para seção Grid do Font Awesome](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#grid-do-font-awesome)

Os ícones do _Font Awesome_ foram determinados em uma grid de 20x16px. Então, caso haja necessidade de criar ícones, deve-se seguir a mesma grid para que sejam conservadas as proporções e características estéticas dos mesmos.

![Grid Font Awesome](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/iconografia/imagens/grid-fontawesome.png)

_Grid utilizado para criação de ícones personalizados baseados no Font Awesome_

### Tamanho Padrão no _Design System_ [Link para seção Tamanho Padrão no Design System](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#tamanho-padrao-no-design-system)

O tamanho base para os ícones possui o valor de corpo _16px_. Seguindo os seguintes _design tokens_ e escala na propriedade `font-size`:

| Token Icon Size | Value |
| --- | --- |
| –icon-size-base | 16px (1em) |
| –icon-size-xs | .5em (8px) |
| –icon-size-sm | .75em (12px) |
| –icon-size-lg | 1.25em (20px) |
| –icon-size-2x | 2em (32px) |
| –icon-size-3x | 3em (48px) |
| –icon-size-4x | 4em (64px) |
| –icon-size-5x | 5em (80px) |
| –icon-size-6x | 6em (96px) |
| –icon-size-7x | 7em (112px) |
| –icon-size-8x | 8em (128px) |
| –icon-size-9x | 9em (144px) |
| –icon-size-10x | 10em (160px) |

Utilizando os _Design Tokens_ nas classes pré-definidas das escalas do Font Awesome, temos as seguintes aplicações:

| Class | Token Icon Size |
| --- | --- |
| fas | –icon-size-base |
| fa-xs | –icon-size-xs |
| fa-sm | –icon-size-sm |
| fa-lg | –icon-size-lg |
| fa-2x | –icon-size-2x |
| fa-3x | –icon-size-3x |
| fa-4x | –icon-size-4x |
| fa-5x | –icon-size-5x |
| fa-6x | –icon-size-6x |
| fa-7x | –icon-size-7x |
| fa-8x | –icon-size-8x |
| fa-9x | –icon-size-9x |
| fa-10x | –icon-size-10x |

### Área Mínima de Interação [Link para seção Área Mínima de Interação](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#area-minima-de-interacao)

Os ícones interativos devem possuir uma área mínima de interação (mesmo nos casos onde o tamanho do ícone seja menor que da área mínima) de modo a facilitar a interação do ícone por parte do usuário.

A área mínima de interação serve também como espaço útil do ícone para contagem de espaçamento entre um elemento e outro. Existem 2 tipos de área mínima de interação: _Área de Clique_ e _Área de Toque_.

#### Área de Clique [Link para seção Área de Clique](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#area-de-clique)

Utilizada em interfaces não tácteis, como, por exemplo, dispositivos que utilizam o mouse. Essa área, deve ser de no mínimo 24x24px.

![Imagem mostrando Tamanho Área Clique: 24 x 24px](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/iconografia/imagens/area-minima-clique.png)

_Especificação de área mínima para cliques_

#### Área de Toque [Link para seção Área de Toque](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#area-de-toque)

A área de toque dos ícones determina que além da área ocupada pelo ícone há um espaço “invisível”, que pode ser facilmente acessado pelo usuário, através do toque na tela.

A área de toque deve ser de 48x48px, garantindo que a experiência do usuário seja satisfatória no momento de acessar as funcionalidades através dos ícones, em dispositivos móveis ou artefatos digitais.

![Imagem mostrando a área de toque dos ícones: 48 x 48px](https://home-docs-ds.estaleiro.serpro.gov.br/govbr-ds/ds/fundamentos-visuais/iconografia/imagens/area-minima-toque.png)

_Especificação de área mínima para toques_

* * *

## Orientações de Uso [Link para seção Orientações de Uso](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#orientacoes-de-uso)

As principais funcionalidades dos sistemas do governo foram mapeadas e atribuídas a cada uma delas um símbolo representativo - os ícones da versão sólida do _FontAwesome_. É fundamental que os desenvolvedores e _designers_ utilizem os ícones abaixo com mesma ação que lhe foi atribuída, isso garante que cada sistema acessado pelo cidadão utilize a mesma linguagem e significado, tornando mais rápida a experiência e o reconhecimento do público ao acessar as funcionalidades dos diversos sistemas do governo federal.

**Observação:** Lembre-se que quando utilizado para representar uma ação, o ícone deve corresponder a ação que será executada ao interagir com o elemento. Quando utilizado junto com um elemento não interativo, ele pode representar outras situações, como por exemplo algum tipo de estado.

| Ícone | Ação | Classe ( _Font Awesome_) |
| --- | --- | :-: |
|  | Pesquisar | `fa-search` |
|  | Visualizar | `fa-eye` |
|  | Não Visualizar | `fa-eye-slash` |
|  | Ir para Tela Inicial | `fa-home` |
|  | Acessar Configurações | `fa-cog` |
|  | Editar | `fa-edit` |
|  | Excluir | `fa-trash-alt` |
|  | Acessar Mensagem | `fa-envelope` |
|  | Acessar Mensagem Lida | `fa-envelope-open` |
|  | Baixar Arquivo/Download | `fa-download` |
|  | Subir Arquivo/Upload | `fa-upload` |
|  | Acessar Alertar/Notificações | `fa-bell` |
|  | Desabilitar Notificações | `fa-bell-slash` |
|  | Limpar | `fa-eraser` |
|  | Marcar Hora | `fa-clock` |
|  | Bloquear | `fa-lock` |
|  | Desbloquear | `fa-unlock` |
|  | Acessar Login | `fa-user` |
|  | Confirmar | `fa-check` |
|  | Fechar | `fa-times` |
|  | Adicionar | `fa-plus` |
|  | Subtrair | `fa-minus` |
|  | Mensagem Sucesso | `fa-check-circle` |
|  | Mensagem Informativa | `fa-info-circle` |
|  | Mensagem Alerta | `fa-exclamation-triangle` |
|  | Mensagem Erro | `fa-times-circle` |
|  | Ajuda | `fa-question` |
|  | Voltar | `fa-chevron-left` |
|  | Avançar | `fa-chevron-right` |
|  | Retrair | `fa-chevron-up` |
|  | Expandir | `fa-chevron-down` |
|  | Atualizar | `fa-sync` |
|  | Anexar | `fa-paperclip` |
|  | Acessar Menu Principal | `fa-bars` |
|  | Acessar Opções | `fa-ellipsis-v` |
|  | Áudio Ativado | `fa-volume-up` |
|  | Áudio Desativado/Mudo | `fa-volume-mute` |
|  | Acessibilidade Ativar Libras | `fa-deaf` |
|  | Acessibilidade Ativar Contraste | `fa-adjust` |
|  | Desativar/Desabilitar | `fa-toggle-off` |
|  | Ativar/Habilitar | `fa-toggle-on` |
|  | Densidade Baixa | `fa-th-large` |
|  | Densidade Alta | `fa-th` |
|  | Selecionar Data | `fa-calendar-alt` |
|  | Imprimir | `fa-print` |
|  | Filtrar | `fa-sliders-h` |
|  | Ordenado Decrescente | `fa-sort-down` |
|  | Ordenado Crescente | `fa-sort-up` |
|  | Ordenado Padrão | `fa-sort` |
|  | Incluir Imagem | `fa-image` |
|  | Copiar | `fa-copy` |
|  | Cortar | `fa-cut` |
|  | Acessar Diretório | `fa-folder` |
|  | Diretório Aberto/Acessado/Atual | `fa-folder-open` |
|  | Exportar/Compartilhar Arquivo/Documento | `fa-share-square` |
|  | Enviar | `fa-share` |
|  | Fiscalizar | `fa-clipboard-list` |
|  | Abrir Dropdown | `fa-caret-down` |
|  | Fechar Dropdown | `fa-caret-up` |
|  | Abrir Dropdown Horizontal | `fa-caret-right` |
|  | Fechar Dropdown Horizontal | `fa-caret-left` |

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

## Utilitários CSS de Iconografia [Link para seção Utilitários CSS de Iconografia](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#utilitarios-css-de-iconografia)

São classes CSS para aplicar o **Fundamento Visual Iconografia**.

### Como usar [Link para seção Como usar](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#como-usar)

Modifique os **tamanhos** dos ícones.

Informe o prefixo `fa-` seguido dos tamanhos:

- `xs` → muito pequeno;
- `sm` → pequeno;
- `lg` → grande;
- `2x` até `10x`.

Exemplos: `fa-xs`, `fa-4x`

Veja a lista de **ícones recomendados** em [Visão Geral](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral#orientacoes-de-uso)

> **Atenção!** Alguns ícones mudam de nome conforme a versão do _Font Awesome_.

### Configurações nativas do _Font Awesome_ [Link para seção Configurações nativas do Font Awesome](https://www.gov.br/ds/fundamentos-visuais/iconografia?tab=visao-geral\#configuracoes-nativas-do-font-awesome)

Algumas configurações com **rotacionar**, **animar** etc são nativas do próprio Font Awesome e podem ser aplicadas.

> Veja a documentação oficial em [Styling with Font Awesome](https://docs.fontawesome.com/web/style).

* * *

## Exemplos de códigos

### Ícones variados

CodePen

Abrir exemplo no CodePen

Tamanhos

Rotação nativa do Font Awesome

Dentro de botão

CodePen

Abrir exemplo no CodePen

```html

<p class="h3 my-3x">Tamanhos</p><i class="fas fa-home" aria-hidden="true"></i><i class="fas fa-home fa-3x" aria-hidden="true"></i><i class="fas fa-home fa-5x" aria-hidden="true"></i>
<p class="h3 my-3x">Rotação nativa do Font Awesome</p><i class="fas fa-cog fa-4x fa-spin" aria-hidden="true"></i>
<p class="h3 my-3x">Dentro de botão</p>
<button class="br-button circle" type="button" id="olho" aria-label="Alterna entre visualizar e não visualizar"><i class="fas fa-eye" aria-hidden="true"></i>
</button>
<script>
  document.getElementById('olho').addEventListener('click', function() {
    // trocar ícone de visualizar para não visualizar
    const icon = this.querySelector('i');
    if (icon.classList.contains('fa-eye')) {
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  });
</script>
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
