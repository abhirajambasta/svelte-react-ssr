# React SSR components within Svelte SSR application using Webpack in addition to the hydration

Features:
* React
* Svelte
* Webpack
* hydration
* Universal rendering
* Global SCSS
* Content compression ability
* Fastify

### Intro

This example deals with the `rendering of an application with Svelte` & `rendering of the composed components with React`.

The idea is to render both the individual components & the application in an isomorphic manner, meaning the same set of components (React + Svelte) along with the parent application (Svelte) rendered on client-side & server-side.

### How to start?

To start the server use: `npm run start`

With minimal efforts using `chokidar` & `nodemon`, the dev script can be added. Feel free to contribute to the same.

### Why not Express?

Fastify in this example can easily be replaced with express or any other package. The attempt is always to keep the code modular so that parts of the app can be replaced with other techs without impacting its complete behaviour.