const { resolve } = require('path');

module.exports =  {
    entry: "./src/backend.js",
    output: {
        path: resolve(__dirname, 'bin/out'),
        filename: 'out.js'
    },
    resolve: {
        fallback: {
          "path": require.resolve('path-browserify')
        }
    }
}