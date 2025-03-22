#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 创建接口以读取用户输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 询问项目名称、作者姓名、描述、入口文件和许可证
rl.question('请输入项目名称 (默认: my-koa2-project): ', (projectName) => {
  rl.question('请输入作者姓名 (默认: Your Name): ', (authorName) => {
    rl.question('请输入项目描述 (默认: A Koa2 project): ', (description) => {
      rl.question('请输入入口文件 (默认: index.js): ', (main) => {
        rl.question('请输入许可证 (默认: MIT): ', (license) => {
          createProjectStructure(projectName || 'my-koa2-project', authorName || 'Your Name', description || 'A Koa2 project', main || 'index.js', license || 'MIT');
          rl.close();
        });
      });
    });
  });
});

function createProjectStructure(projectName, authorName, description, main, license) {
  const baseDir = path.join(process.cwd(), projectName);

  // 创建项目目录
  fs.mkdirSync(baseDir);
  console.log(`创建项目目录: ${baseDir}`);

  // 创建子目录
  const directories = ['routes', 'controllers', 'middlewares', 'models'];
  directories.forEach(dir => {
    fs.mkdirSync(path.join(baseDir, dir));
    console.log(`创建目录: ${path.join(baseDir, dir)}`);

    // 在每个目录中添加示例文件
    switch (dir) {
      case 'routes':
        fs.writeFileSync(path.join(baseDir, dir, 'index.js'), `
const Router = require('koa-router');
const router = new Router();

// 示例路由
router.get('/', (ctx) => {
  ctx.body = 'Welcome to the Koa2 App!';
});

module.exports = router;
    `.trim());
    console.log(`创建文件: ${path.join(baseDir, dir, 'index.js')}`);
    break;

  case 'controllers':
    fs.writeFileSync(path.join(baseDir, dir, 'userController.js'), `
class UserController {
  static getUser(ctx) {
    ctx.body = { name: 'John Doe' };
  }
}

module.exports = UserController;
    `.trim());
    console.log(`创建文件: ${path.join(baseDir, dir, 'userController.js')}`);
    break;

  case 'middlewares':
    fs.writeFileSync(path.join(baseDir, dir, 'logger.js'), `
module.exports = async (ctx, next) => {
  console.log(\`Request Method: \${ctx.method}, Request URL: \${ctx.url}\`);
  await next();
};
    `.trim());
    console.log(`创建文件: ${path.join(baseDir, dir, 'logger.js')}`);
    break;

  case 'models':
    fs.writeFileSync(path.join(baseDir, dir, 'user.js'), `
class User {
  constructor(name) {
    this.name = name;
  }
}

module.exports = User;
    `.trim());
    console.log(`创建文件: ${path.join(baseDir, dir, 'user.js')}`);
    break;
}
  });

  // 创建 package.json
  const packageJsonContent = {
    name: projectName,
    version: "1.0.0",
    description: description, // 使用用户输入的描述
    main: main, // 使用用户输入的入口文件
    bin: {
      "scaffold": "./scaffold.js"
    },
    scripts: {
      start: "node index.js"
    },
    dependencies: {
      koa: "^2.x.x",
      "koa-router": "^10.x.x",
      "koa-bodyparser": "^4.x.x"
    },
    author: authorName,
    license: license // 使用用户输入的许可证
  };

  fs.writeFileSync(path.join(baseDir, 'package.json'), JSON.stringify(packageJsonContent, null, 2));
  console.log('创建文件: package.json');

  // 创建 index.js
// 创建 index.js
const indexContent = `
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('./middlewares/logger'); // 引入中间件
const userRoutes = require('./routes/index'); // 引入路由

const app = new Koa();

app.use(logger); // 使用日志中间件
app.use(bodyParser()); // 解析请求体

app.use(userRoutes.routes()).use(userRoutes.allowedMethods()); // 使用路由

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server is running on http://localhost:\${PORT}\`);
});
`.trim();
  fs.writeFileSync(path.join(baseDir, 'index.js'), indexContent.trim());
  console.log('创建文件: index.js');

  // 创建 README.md
  const readmeContent = `
# ${projectName}

这是一个从头开始构建的 Koa2 项目。

## 安装依赖

\`\`\`bash
npm install
\`\`\`

## 启动服务器

\`\`\`bash
node index.js
\`\`\`

访问 [http://localhost:3000](http://localhost:3000) 查看结果。
  `;
  fs.writeFileSync(path.join(baseDir, 'README.md'), readmeContent.trim());
  console.log('创建文件: README.md');
}