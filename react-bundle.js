const path = require('path');

   module.exports = {
       entry: './App.js',
       output: {
           filename: 'react-bundle.js',
           path: path.resolve(__dirname, 'dist')
       },
       module: {
           rules: [
               {
                   test: /\.js$/,
                   exclude: /node_modules/,
                   use: {
                       loader: 'babel-loader',
                       options: {
                           presets: ['@babel/preset-env', '@babel/preset-react']
                       }
                   }
               }
           ]
       }
   };
