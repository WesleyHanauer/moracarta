[🇺🇸 English](README.md) | [🇧🇷 Português](README.pt-BR.md)

# Digital Love Letters

## Table of Contents

1. [Description](#description)

2. [Configuration](#configuration)

3. [Deployment](#deployment)

4. [Technologies](#technologies)

5. [Project Structure](#project-structure)

6. [License](#license)

## Demo

![Main page demo](./assets/demo-main-page.png)

![Envelope anim demo](./assets/demo-animation.gif)

## Description

- This is a template for romantic letters that runs entirely without a server. You can host it for free on [Cloudflare Pages](https://pages.cloudflare.com/) or GitHub Pages.
- The idea is to make it easy to create a personalized gift for your partner.
- The app includes optional music for the main page and for each individual letter.

## Configuration

### General Configuration

- Most of the text displayed throughout the app can be customized. You can find the available settings in `/src/config/globalVariables.js`.

- It's recommended to open the website at least once before changing the global variables, so you can get a better idea of what each variable controls.

- You can also check out the demo:
  [https://digital-love-letters.pages.dev](https://digital-love-letters.pages.dev) or [https://wesleyhanauer.github.io/digital-love-letters](https://wesleyhanauer.github.io/digital-love-letters)

### Letters

- Each letter is an object inside `/src/data/letters.js`. I recommend writing your letters separately in Google Docs and then pasting them into the corresponding letter.
- To create a new letter, follow the template provided at the top of the file.
- Music file paths must end with `.mp3`.

### Music

- To enable music, set the `MUSIC` variable in `globalVariables.js` to `true`.
- The music inside `src/media/music` is copyright free and only used as an example on how to setup your own music, feel free to use them though.

#### Main Page

- Set `USE_MAIN_PAGE_MUSIC` in `globalVariables.js` to `true`, then set the path to your chosen song in `MAIN_PAGE_MUSIC_PATH`.

#### Individual Letters

- You can set a different song for each letter. The song will start playing once the user opens the letter and interacts with the page.
- You can also choose the timestamp the song starts playing.

#### Downloading Music

- It's recommended you use [SpotDL](https://github.com/spotDL/spotify-downloader) to download the mp3 music.

## Deployment

- Since this is a static website, there are several free hosting services you can use.
- [Cloudflare Pages](https://pages.cloudflare.com/) is recommended because the contents of the letters will be visible in the repository if you use GitHub Pages, while Cloudflare Pages can deploy from private repositories.
- Check how you can deploy your repository on Cloudflare [here](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/#deploy-with-cloudflare-pages).

## Technologies

1. JavaScript
2. HTML
3. CSS

## Project Structure

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

- `src/config/globalVariables.js` — General site configuration.
- `src/data/letters.js` — Letter content.
- `src/styles/` — General styling and animations.
- `src/script/` — Animation and translation logic.
- `src/views/` — The app's HTML pages.
- `src/media/` — Images and music used in the letters.
- `src/i18n/` — Available languages for translating the app.

## License

This project is available for personal and non-commercial use.
Commercial use requires prior permission from the author.

See the `LICENSE` file for the full terms.