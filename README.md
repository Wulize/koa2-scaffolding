<!-- chmod +x scaffold.js -->
# koa2-scaffolding

一个基于 Koa2 的项目脚手架工具，帮助你快速搭建 Koa2 项目。

## 特性

- 快速搭建 Koa2 项目基础结构
- 预配置常用的中间件
- 支持路由管理
- 简单易用的命令行接口

## 安装

```bash
npm install -g koa2-scaffolding
```

## 使用方法

1. 创建新项目
```bash
koa2 new my-project
```

2. 进入项目目录
```bash
cd my-project
```

3. 安装依赖
```bash
npm install
```

4. 启动项目
```bash
npm start
```

## 项目结构

```
my-project/
├── src/              # 源代码目录
│   ├── controllers/  # 控制器
│   ├── middlewares/  # 中间件
│   ├── routes/      # 路由
│   └── app.js       # 应用入口
├── package.json      # 项目配置
├── webpack.config.js # Webpack 配置
└── README.md        # 项目说明
```

## 技术栈

- Koa2
- koa-bodyparser
- koa-router
- Webpack

## 许可证

MIT License

## 作者

wulize <lize.wu@foxmail.com>