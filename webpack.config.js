const path = require('path');
const webpack = require('webpack'); // 添加这一行

module.exports = {
  target: 'node', // 指定构建目标为 Node.js
  entry: './scaffold.js', // 入口文件
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.resolve(__dirname, 'dist'), // 输出目录
    clean: true, // 在每次构建前清理旧文件
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 匹配所有 JavaScript 文件
        exclude: /node_modules/, // 排除 node_modules 目录
        use: {
          loader: 'babel-loader', // 使用 Babel 加载器
          options: {
            presets: ['@babel/preset-env'], // 使用 env 预设
          },
        },
      },
    ],
  },
  mode: 'production', // 设置为生产模式
  devtool: 'source-map', // 生成 source map
  plugins: [
    // 添加 BannerPlugin 插件，未添加之前shabang行打包的时候被干掉了，所以使用这个插件给它添加回去
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
      entryOnly: true, // 仅在入口文件中添加
    }),
  ],
};