[🇺🇸 English](README.md) | [🇧🇷 Português](README.pt-BR.md)

# Moracarta

## Índice

1. [Descrição](#descrição)

2. [Configuração](#configuração)

3. [Fazendo deploy](#fazendo-deploy)

4. [Tecnologias](#tecnologias)

5. [Estrutura](#estrutura-do-projeto)

6. [Licença](#licença)

## Demo

![Main page demo](./assets/demo-main-page.png)

![Envelope anim demo](./assets/demo-animation.gif)

## Descrição

- Este site é um template para cartas românticas sem servidor, que você pode hospedar gratuitamente no [Cloudflare Pages](https://pages.cloudflare.com/) ou no GitHub Pages.
- O objetivo é servir como um presente personalizado para o seu parceiro.
- O aplicativo conta com funções opcionais de música na página principal e em cada carta.

## Configuração

### Configuração geral

- O aplicativo conta com uma quantidade considerável de textos personalizáveis. Tudo se encontra dentro do arquivo `/src/config/globalVariables.js`.

- É recomendado que você acesse o site pelo menos uma vez antes de começar a alterar as variáveis globais, para entender a função de cada variável.

- Ou, se preferir, acesse a demonstração em:
  [Moracarta Cloudflare Pages](https://moracarta.pages.dev) ou [Moracarta Github Pages](https://wesleyhanauer.github.io/moracarta)

### Cartas

- Cada carta individual é um objeto dentro de `/src/data/letters.js`. Recomenda-se escrevê-las separadamente no Google Docs e depois colá-las na respectiva carta.
- Para criar novas cartas, siga o template disponibilizado no topo do arquivo.
- O caminho da música deve terminar com `.mp3`.

### Músicas

- Para ativar a função de músicas, altere a variável `MUSIC` dentro de `globalVariables.js` para `true`.
- As músicas incluídas em `src/media/music` são livres de direitos autorais e estão disponíveis apenas como exemplos de como utilizar suas próprias músicas. Seu uso no projeto é permitido.

#### Página principal

- Altere a variável `USE_MAIN_PAGE_MUSIC` dentro de `globalVariables.js` para `true` e configure o caminho da música escolhida em `MAIN_PAGE_MUSIC_PATH`.

#### Dentro de cada carta

- Configure o caminho para a música dentro de cada carta. Você pode selecionar uma música por carta, que será reproduzida assim que o usuário abrir a carta e interagir com a página.
- Você também pode escolher o segundo exato em que a música será iniciada.

#### Baixando as músicas

- Para fazer o download das músicas em MP3, recomenda-se o uso da ferramenta [SpotDL](https://github.com/spotDL/spotify-downloader).

## Fazendo Deploy

- Por ser um site sem servidor, existem diversos serviços de hospedagem gratuitos na internet.
- É recomendado utilizar o [Cloudflare Pages](https://pages.cloudflare.com/), considerando que o conteúdo das cartas ficará visível no repositório caso você opte por utilizar o GitHub Pages e o Cloudflare permite utilizar repositórios privados.
- Veja como fazer deploy do seu repositório no Cloudflare [aqui](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/#deploy-with-cloudflare-pages).

## Tecnologias

1. JavaScript
2. HTML
3. CSS

## Estrutura do Projeto

```text
digital-love-letters/
├── src/
│   ├── config/
│   │   └── globalVariables.js
│   ├── data/
│   │   └── letters.js
│   ├── styles/
│   ├── script/
│   ├── views/
│   ├── media/
│   └── i18n/
├── README.md
├── README.pt-BR.md
└── LICENSE
```

- `src/config/globalVariables.js` — Configuração geral do site.
- `src/data/letters.js` — Conteúdo das cartas.
- `src/styles/` — Estilos gerais e animações.
- `src/script/` — Scripts e lógica das animações e da tradução.
- `src/views/` — Páginas HTML do aplicativo.
- `src/media/` — Imagens e músicas utilizadas nas cartas.
- `src/i18n/` — Idiomas disponíveis para tradução geral do aplicativo.

## Licença

Este projeto está disponível para uso pessoal e não comercial.
O uso comercial requer autorização prévia do autor.

Consulte o arquivo `LICENSE` para os termos completos.