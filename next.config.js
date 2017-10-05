module.exports = {
  webpack: (config, { buildId, dev }) => {
    config.module.rules.push({
      test: /\.elm$/,
      exclude: [/elm-stuff/, /node_modules/],
      use: {
        loader: "elm-webpack-loader",
        options: {}
      }
    });
    config.module.noParse = /\.elm$/;
    return config;
  }
};
