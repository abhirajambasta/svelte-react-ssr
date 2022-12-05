require("../scss/index.scss");

const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch-commonjs");

const Ground = require("../components/svelte/index.svelte").default;

// static
const pathStaticDir = path.resolve(__dirname, "./static");
const files = fs.readdirSync(pathStaticDir);
const stylesFilename = files.filter((filename) => filename.includes("styles"));
const groundJsFilename = files.filter((filename) => filename.includes("index"));

// init
const fastify = require("fastify")({
  ignoreTrailingSlash: true,
  logger: true,
});

fastify.register(require("fastify-compress"));

fastify.register(require("fastify-static"), {
  root: pathStaticDir,
});

function renderPage(body, jsFilename, data) {
  return `
	<html>
		<head>
			<link rel="stylesheet" href="/${stylesFilename}" />
		</head>
		<body>
      <!-- ideal response body starts -->
      <script>
				const HYDRATION_DATA = ${JSON.stringify(data)}
			</script>
			<div id="page">${body}</div>
			<script src="${jsFilename}" defer></script>
      <!-- ideal response body ends -->
		</body>
	</html>
	`;
}

fastify.route({
  method: "GET",
  url: "/",
  handler: async (req, res) => {
    res.header("Content-Type", "text/html");

    const response = await fetch("https://api.chucknorris.io/jokes/random");
    const body = await response.json();

    const data = {
      ...body,
      dateString: new Date().toString() + " Server-side rendered!",
    };

    const { html } = Ground.render(data);

    res.send(renderPage(html, groundJsFilename, data));
  },
});

fastify.listen("4003", "127.0.0.1", function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
