var HtmlWebpackPlugin = require('html-webpack-plugin'); // 導入 html-webpack-plugin 模塊
const path = require('path'); // 導入 node 的 path 模塊

module.exports = { // 導出對象
  // https://webpack.docschina.org/concepts/#output
  entry: './index.js', // 打包的入口文件，把需要的資源都寫進 index.js
  output: { // 打包後輸出的資料夾與文件名
    path: path.resolve(__dirname, 'dist'), // 當前目錄的 dist 資料夾
    filename: 'bundle.js' // 輸出文件名
  },
  module: { 
    // https://webpack.docschina.org/loaders/style-loader/
    // 通過 'style-loader', 'css-loader' 解析 css 文件，解析順序由下到上
    // 先通過 css-loader 解析 CSS 再通過 style-loader 把 CSS 放到 style 標籤裡
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()], // 會在 output 資料夾產生 index.html 並自動引入 打包好的 JS (bundle.js)
  devServer: { // devServer 可以熱加載文件，可是並不會打包，只會讓你看到你修改的結果，如果要打包還是要在終端機執行一次 webpack
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: true
  }
};

// 熱加載原理
// 通過 node fs.watch() 方法監聽文件
// http://nodejs.cn/api/fs.html#fs_class_fs_fswatcher
// 成功调用 fs.watch() 方法会返回新建的 fs.FSWatcher 对象。
// 每当指定监视的文件被修改时，所有的 fs.FSWatcher 对象都会触发 'change' 事件。

// webpack 熱加載 plugin : webpack-dev-server
// https://webpack.js.org/configuration/dev-server/#root
// https://github.com/webpack/webpack-dev-server
// https://webpack.docschina.org/configuration/dev-server/#root (中文)
// webpack 透過 node 的 fs 模塊 FSWatcher 監聽文件有無被修改，有的話就重新加載
