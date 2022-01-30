const path = require('path');

module.exports = {
  mode: 'production',
  "output": {
    "filename": "[name].pack.js"
  },
  "module": {
    "rules": [
      {
        "use": {
          "loader": "babel-loader",
          "options": {
            "presets": [
              "babel-preset-env",
              "babel-preset-react"
            ],
          }
        },
        "exclude": /node_modules/,
        "test": /\.js$/
      }
    ]
  },
  "entry": {
    "index": "./index"
  },
  devServer: {
    allowedHosts: 'all',
    static: {
      directory: path.join(__dirname),
      publicPath: path.join(__dirname, 'dist'),
    },

    compress: true,
    port: 9000,
  },
};