module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        filename: './main.js',
    },

    //BABEL 

module: {
    rules: [
        {
         test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
        },
    ],
  },
 };
 