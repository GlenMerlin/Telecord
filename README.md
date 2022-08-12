<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/GlenMerlin/Telecord">
    <img src="./assets/logo.svg" alt="Logo" width="200px">
  </a>

  <h1 align="center">Telecord bot</h1>

  <p align="center">
    A discord bot to link your Discord Account and Telegram Account so you can easily start up encrypted chat messages with your discord friends!
    <br />
    <br />
    <br />
    ·
    <a href="https://github.com/GlenMerlin/Telecord/issues">Report Bug</a>
    ·
    <a href="https://github.com/GlenMerlin/Telecord/issues">Request Feature</a>
  </p>
  <div align="center">
    <a href="https://github.com/GlenMerlin/Telecord/issues">
      <img src="https://img.shields.io/github/issues/GlenMerlin/Telecord.svg">
    </a>
    <a href="https://github.com/GlenMerlin/Telecord/pulls">
      <img src="https://img.shields.io/github/issues-pr-raw/GlenMerlin/Telecord.svg">
    </a>
  </div>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the project](#running-the-project)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

<!-- ABOUT THE PROJECT -->

## About The Project
<p align="left">
  <a href="./assets/product-screenshots/profile.png">
    <img src="./assets/product-screenshots/profile.png" alt="Screenshot 1 contents: /profile, Hey @GlenMerlin I found https://t.me/glenmerlin in the database">
  </a>


<!-- Here's a blank template to get started:
**To avoid retyping too much info. Do a search and replace with your text editor for the following:**
`ent3r`, `corax-bot-nodejs-rewrite` -->

### Built With

- [node.js](https://nodejs.org)
- [typescript](https://www.typescriptlang.org)
- [yarn](https://yarnpkg.com)
- [discord.js](https://www.npmjs.com/package/discord.js)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [mongoDB](https://mongoDB.com/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

As this project uses yarn, make sure you have yarn installed by running `yarn --version`. It should show a verson < 2.X.X.
This is because this project does not yet support yarn 2. If you don't have yarn installed, install it by running

```bash
npm i -g yarn@latest
```

### Installation

1. Clone the repo

```bash
git clone https://github.com/GlenMerlin/Telecord.git
```

2. Install NPM packages

```bash
yarn
```

3. Set variables in config.json
```bash
cd pathToTelecord/src
cp config.example config.json
```
Simply set the proper values URI and Token for your database and discord bot respectively
### Running the project

Running the project is very simple.

run
```bash
npx tsc
```
to compile the typescript into javascript

run
```bash
yarn dev
```
to start the bot
<!-- USAGE EXAMPLES -->

## Usage
    /register https://telegram.me/yourusernamehere (registers you in the bot's database)
    /profile (with no arguements returns your profile)
    /profile @johndoe#0000 (pulls up another user's profile)
    /edit https://telegram.me/yournewusernamehere
    /delete (removes your account from the database)
    /help (sends the help message)
    /source (sends a link to the github page)
    /invite (sends an invite to add the bot to your own server)
<!-- TODO add screenshots of the bot in action -->
<!-- ROADMAP -->

## Roadmap

See the pinned [issues][issues-link] for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

You are requested to follow the contribution guidelines specified in [CONTRIBUTING.md](./CONTRIBUTING.md) while contributing to the project :smile:.

<!-- Privacy -->

## Privacy

What data we collect:
- Discord account IDs (snowflakes)
- Links you provide

This bot is open source partially because of the privacy aspect, this bot does not read conversations and only stores your userID in association with your telegram link

if you wish to delete your account and wipe all data the bot has collected simply run /delete, if for some reason you are unable to access your discord account and want your data deleted reach out to me at glenmerlin@glenmerlin.me
<!-- LICENSE -->

## License

Distributed under the GNU GPLv3 License. See [`LICENSE`](./LICENSE) for more information.

---

This readme file, along with the contributing and code of conduct files were originally made from [this][original-template] template made by CSIVitu.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[original-template]: https://github.com/csivitu/Template
[issues-link]: https://github.com/GlenMerlin/Telecord/issues
