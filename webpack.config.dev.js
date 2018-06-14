const config = {
    entry: './demo/index.js',
    devtool: 'inline-source-map',
    output: {
      filename: './js/bundle.js',
      path: __dirname + '/public'
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'stage-2']
                }
            }
        ]
    }
  };
  
  module.exports = config;