import React from "react";
import { renderToString } from "react-dom/server";
import { hydrateRoot, render as ReactDOMRender } from "react-dom/client";
import ReactDOM from "react-dom";
import App from "./react";
// import { renderToPipeableStream } from 'react-dom/server';

export const destroy = (target) => {
  if (!target) return;
  ReactDOM.unmountComponentAtNode(target);
};

export const serverRender = (req, res, next) => {
  // let didError = false;
  // const stream = renderToPipeableStream(<App />, {
  //   onAllReady() {
  //     res.statusCode = didError ? 500 : 200;
  //     res.write(`<div id="root">`);
  //     stream.pipe(res);
  //     res.write(`</div>`);
  //     res.write(`<script async data-chunk="main" src="http://localhost:3000/static/main.js"></script>`);
  //   },
  //   onShellError() {
  //     res.statusCode = 500;
  //     res.send(`<h1>An error occurred</h1>`)
  //   },
  //   onError(err) {
  //     didError = true;
  //     console.error(err);
  //   }
  // })

  return renderToString(<App />);
};

export const clientRender = (target) => {
  hydrateRoot(target, <App />);
};
