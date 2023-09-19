<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<br />
<div align="center">
  <a href="https://github.com/nandoramos/youtube-gpt/tree/main/youtube-gpt-client">
    <img src="images/logo.png" alt="Logo" width="300" height="120">
  </a>

<h3 align="center">YouTube GPT - Client</h3>

  <p align="center">
    project_description
    <br />
    <a href="https://github.com/nandoramos/youtube-gpt/tree/main/youtube-gpt-client/docs"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="https://github.com/nandoramos/youtube-gpt/issues">Report Bug</a>
    ·
    <a href="https://github.com/nandoramos/youtube-gpt/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#documentation">Useful Documentation</a></li>
  </ol>
</details>

## About The Project

[![YouTubeGPT][product-screenshot]](https://example.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [Next.js][Next-url]
- [React.js][React-url]
- [Chakra UI][Chakra-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

To run this software you need to install the npm:

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nandoramos/youtube-gpt.git
   ```
2. Go to client folder
   ```sh
   cd youtube-gpt-client
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Run the project
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

1. Download the project main branch
2. Create your amazing feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat(AmazingFeature): new feature added'`) we use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## How to setup the translations

In order to use the translation, the **serverSideTranslations HOC** should be added to all pages inside the /pages folder in the getStaticProps function. For example:

```
export const getStaticProps: GetStaticProps = async (context) => {
  let { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en')),
    },
  };
};
```

Using getStaticProps, we can access the locale parameter from the navigation, and we can pass the JSON translations to our page.

## Useful Documentation

- [NextJS](https://nextjs.org/docs)
- [Chakra UI](https://chakra-ui.com/getting-started)
- [Axios Client](https://axios-http.com/docs/intro)
- [react-i18next](https://react.i18next.com/latest/usetranslation-hook)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/nandoramos/youtube-gpt.svg?style=for-the-badge
[contributors-url]: https://github.com/nandoramos/youtube-gpt/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/nandoramos/youtube-gpt.svg?style=for-the-badge
[forks-url]: https://github.com/nandoramos/youtube-gpt/network/members
[stars-shield]: https://img.shields.io/github/stars/nandoramos/youtube-gpt.svg?style=for-the-badge
[stars-url]: https://github.com/nandoramos/youtube-gpt/stargazers
[issues-shield]: https://img.shields.io/github/issues/nandoramos/youtube-gpt.svg?style=for-the-badge
[issues-url]: https://github.com/nandoramos/youtube-gpt/issues
[product-screenshot]: images/screenshot.png
[Next-url]: https://nextjs.org/
[Chakra-url]: https://nextjs.org
[React-url]: https://reactjs.org/
