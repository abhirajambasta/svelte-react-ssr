const path = require('path');

const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';
const DEVELOPMENT = !PRODUCTION;

module.exports = {
  name: 'client',
  target: "web",
	entry: WebpackWatchedGlobEntries.getEntries(
		[path.resolve(__dirname, '../client-entry-scripts/*.js')]
	),
	mode: PRODUCTION ? 'production' : 'development',
	output: {
		path: path.join(__dirname, '../dist/static'),
		filename: PRODUCTION ? '[name]-[hash].js' : '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						hydratable: true
					}
				}
			},
      {
        test: /\.(js|mjs)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: DEVELOPMENT,
            },
          },
        ],
      }
		]
	},
	plugins: [
		new WebpackWatchedGlobEntries()
	]
};
