# react_starter


## How to use it
* Development (view the tool)
    * run
        1. `npm i`
        2. `npm run dev`
        3. browse `localhost:3001`
    * test
        1. `npm i`
        2. `npm run test`

* Production (build and release)
    * build and publish to npm cloud server
        1. `npm i`
        2. `npm run build`
        3. `npm run publish:customized`

## Elements
* react eco
    * react
    * react router

* webpack
    * tree shaking
    * code split

* style
    * styled-components
    * normalize.css

* server
    * express

* code standard
    * eslint
    * prettier (atom)

* testing
    * Jest + react testing library

## Things I should Include
* package
    * [ ] typescript

* api || state management
    * [ ] graphql + apollo

* testing
    * [ ] cypress

* comp development
    * [ ] storybook

* [web vitals](https://github.com/GoogleChrome/web-vitals)
    * https://web.dev/vitals/
    * https://web.dev/vitals-tools/

* file-loader

## Implementation
1. [ ] Server-Side-Rendering
    * [loadable component](https://loadable-components.com/docs/getting-started/)
2. [ ] hot module reload
    * when error occurs
3. [ ] PWA
4. [ ] AMP
5. [ ] code splitting + tree shaking
6. [X] use [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)+ exress to replace webpack-dev-server
    * for consistent future SSR in both dev and prod mode
7. history + react-router

## Note
* you may need [es6 promise](https://github.com/stefanpenner/es6-promise) + [promise-polyfill](https://github.com/taylorhakes/promise-polyfill) for older browser.
    * import() calls use promises internally. If you use import() with older browsers (e.g., IE 11), remember to shim Promise using a polyfill such as es6-promise or promise-polyfill.

## References
* [react official](https://reactjs.org/docs/create-a-new-react-app.html)
