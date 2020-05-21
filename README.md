<div align="center">
  <a href="https://XXX.netlify.app">
    <h1>✨Star Wars💫</h1>
  </a>

  <p>
    <a href="https://app.netlify.com/sites/XXX/deploys">
      <img src="https://api.netlify.com/api/v1/badges/XXX/deploy-status" alt="Netlify Status">
    </a>
  </p>
</div>

## Installation

This project requires: 

  1. [Node.js](https://nodejs.org/en/download/) `^14.0.0`.
  2. [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) `^1.22.4`.

```bash
yarn && yarn start
```

This command will install all required dependencies, start `webpack-dev-server` and automatically open new tab on [http://localhost:8080/](http://localhost:8080/) in your browser.

## Scripts

Name | Description
---|---
`start` | start dev server
`build` | build production bundle
`format:styles` | format styles with Stylelint
`lint:js` | lint JavaScript for code quality issues with ESLint
`format:js` | format JavaScript with Prettier
`precommit` | run all linters and formatters with a single command

## Project requirements

Create React app compiled with Webpack that compares 2 characters' residences and declares if they ever lived/seen together, using the public [Star Wars API](https://swapi.dev/api/).

The criteria is as follows:

* If they have shared a planet, starship or vehicle before.
* If so, state the characters' names and movie(s) where that occurred (i.e. Luke Skywalker and Han Solo were seen together in The Empire Strikes Back).
* The list can go as long as it needs to.
* Use 2 select boxes for the user to pick any character that is available from the API.
* Cool transitions.

## Resources

* [The Star Wars API](https://swapi.dev/) all the Star Wars data you've ever wanted.
* [React](https://reactjs.org/docs/getting-started.html) is a JavaScript library for building user interfaces.
* [Styled Components](https://styled-components.com/docs) is a CSS-in-JS library.
* [Webpack](https://webpack.js.org/concepts) is a static module bundler for modern JavaScript applications.
* [Babel](https://babeljs.io/docs/en/) is a JavaScript compiler.
* [ESLint](https://eslint.org/docs/user-guide/getting-started) is a pluggable and configurable linter tool for identifying and reporting on code quality issues in JavaScript.
* [Prettier](https://prettier.io/docs/en/install.html) is an opinionated code formatter for JavaScript and other languages.
* [Stylelint](https://stylelint.io) is a mighty, modern linter that helps you avoid errors and enforce conventions in your styles.
* [Netlify](https://docs.netlify.com) is a web hosting infrastructure and automation platform.
* [Yarn](https://yarnpkg.com/) is a fast, reliable, and secure dependency management.
* [Renovate](https://github.com/renovatebot/renovate) is an automated dependency updates tool.
* [Browserlist](https://github.com/browserslist/browserslist) is a tool for sharing target browsers between different front-end tools.
* [use-sound](https://github.com/joshwcomeau/use-sound) a React Hook for Sound Effects.
* [react-select](https://github.com/JedWatson/react-select) The Select control for React.