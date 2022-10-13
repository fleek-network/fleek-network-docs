# ✏️ Docta

The Psychedelic documentation and guides.


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

Here's an example of a refactor of an hypotetical `address-panel`:

```sh
git checkout main

git checkout -b refactor/address-panel

git commit -m 'fix: font-size used in the address description'

git commit -m 'refactor: simplified markup for the address panel'
```
