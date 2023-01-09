<div align="center" style="padding-bottom: 20px;">
  <img src="./static/img/logo+named.svg?202301091309" width="360px" height="auto"/>
</div>

# Fleek Network docs
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org)

The Fleek Network documentation and guides source.

### 🤖 Installation

```
yarn
```

### 🏠 Local Development

```
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### 👷 Build

```
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### 🚀 Deployment

WIP

### 🕸 Web Crawl

The web crawler or spider is used to search and automatically index website content. The process can run periodically by docsearch but if you much prefer you can run it manually.

You can run a crawl from the packaged Docker image to crawl your website.

You'll need to have installed:
- jq (command-line JSON processor)
- Docker

Then you need to start the crawl according to your configuration.

```
yarn crawl:docker
```

### 📖 Version

WIP

## 🙏 Contribution guideline

Create branches from the `main` branch and name it in accordance to **conventional commits** [here](https://www.conventionalcommits.org/en/v1.0.0/), or follow the examples bellow:

```txt
test: 💍 Adding missing tests
feat: 🎸 A new feature
fix: 🐛 A bug fix
chore: 🤖 Build process or auxiliary tool changes
docs: ✏️ Documentation only changes
refactor: 💡 A code change that neither fixes a bug or adds a feature
style: 💄 Markup, white-space, formatting, missing semi-colons...
```

Find more about contributing [here](docs/open-source/contributing.md), please!
