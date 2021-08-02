<div align="center">
  <a href="https://tridiamond.tech" target="_blank" rel="noopener noreferrer">
    <img width="80" alt="image" src="https://res.cloudinary.com/tridiamond/image/upload/v1627134299/github%20images/logo512_rcfide.png">
  </a>
  <br/>
  <h1><b>Face AI</b></h1>
  <strong>Detects faces with AI.</strong>
</div>

<br/>

<p align="center">
  <img src="https://img.shields.io/github/stars/TriDiamond/face-ai">
  <img src="https://img.shields.io/github/forks/TriDiamond/face-ai">
  <img src="https://img.shields.io/github/issues/TriDiamond/face-ai">
  <img src="https://img.shields.io/github/last-commit/TriDiamond/face-ai/main">
  <img src="https://img.shields.io/circleci/build/github/TriDiamond/face-ai/main">
</p>

![screenshot-1](https://res.cloudinary.com/tridiamond/image/upload/v1627134984/github%20images/screenshot-1_bnm51h.png)

## Intro

This application is developed base on the [smart-brain](https://github.com/aneagoie/smart-brain) application by `@Andrei Neagoie` on "[The Complete Junior to Senior Web Developer Roadmap](https://www.udemy.com/share/1013iu2@PkdKbFhaSVYNe0JAOGJOfg==/)" course. I have customized a lot of features in this application. Including the following:

- Added `notification`
- Whole application is written in `TypeScript`
- The `UI` is designed by TriDiamond with pure `TailwindCSS`
- Refactored project structure into `application feature-based split`, more info see [here](https://www.pluralsight.com/guides/how-to-organize-your-react-+-redux-codebase).
- Refactored API to use [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)

## Packages Used

- typescript
- tailwindcss
- redux + @reduxjs/toolkit
- axios
- classnames
- react
- particles-js + tsparticles
- react-router-dom

## Backend

The backend of this application is in another repo [face-ai-api](https://github.com/TriDiamond/face-ai-api).

## Development

Clone the repo onto your local machine, then install all the dependencies:

```shell
npm install

# or

yarn install
```

To run the application run:

```shell
npm run start

# or

yarn start
```

> **Note**: For this application to work, you will need to also setup the [face-ai-api](https://github.com/TriDiamond/face-ai-api) backend.

Last but not least, add a `.env` file in the root folder with the following content:

```shell
REACT_APP_API_URL=http://localhost:3030 # change this is your backend setup to a different port.
REACT_APP_STORAGE_KEY=_faiu_eislfijsl # just a random string.
```
