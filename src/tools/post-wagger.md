---
title: NestJS系列：使用swagger生成路由文档及进阶用法
date: 2023-08-07
---

在 NestJS 中用上 Swagger 是比较简单的，但搜了一圈下来讲进阶用法的好像没多少，最近在用这个时发现了一些好玩的功能，在这里记录下。

## 安装

NestJS 提供有 swagger 模块，按官方文档安装就行。

1. 安装依赖

```bash
pnpm i @nestjs/swagger
```

2. 新增 `src/common/swagger/index.ts` 文件(个人习惯，直接在 `src/main.ts` 文件中使用也行)

```ts
export const initSwagger = (app: INestApplication) => {
  const docConfig = new DocumentBuilder()
    .setTitle(`接口文档`)
    .setVersion('1.0')
    .setDescription('Openapi 3.0文档')
    .setExternalDoc('JSON数据', `openapi.json`)
    .addTag('user', '用户管理')
    .addTag('auth', '认证管理')
    .addTag('role', '角色管理')
    .addTag('permission', '权限管理')
    .addTag('post', '文章管理')
    .addTag('upload', '文件上传')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, docConfig, options);
  SwaggerModule.setup(config.apiDocPrefix, app, document, {
    jsonDocumentUrl: `openapi.json`,
    yamlDocumentUrl: `openapi.yaml`,
    customfavIcon: '/favicon.ico',
    customSiteTitle: `OpenApi 接口文档`,
  });
};
```
上面包含两个部分，其中 `new DocumentBuilder` 是构建 OpenApi 文档对象的基本参数，上面设置的参数对应如下：

![](./image-swagger.png)

在 `SwaggerModule.setup` 函数中，我们传入了一些自定义参数，主要是定义页面的路径，图标和标题等内容：

- jsonDocumentUrl: 默认访问json格式数据的路径是 openapi-json, 这里修改为 openapi.json 更易于理解些
- yamlDocumentUrl: 访问 YAML 格式数据的路径，同上
- customfavIcon: 站点图标
- customSiteTitle: 站点标题

3. 在 `src/main.ts` 中引用即可

```ts

const app = NestFactory.create();

initSwagger(app);
```

3. 在 `src/app.controller.ts` 中，使用装饰器试下

```ts
class UserController {
  @ApiOperation("首页接口")
  home() {
    return 'Home Page'
  }
}
```

4. 等待重启后，访问 [http://127.0.0.1:3000](http://127.0.0.1:3000) 应该能看到如下效果：

![](./image-swagger1.png)

## 命令行插件

以上就是基本用法，但一个接口通常包含很多很多内容，例如路径参数，查询参数，body参数、请求头和响应数据等类型定义，在控制器方法周围写满 `@ApiXxx` 等装饰器是比较麻烦的。另外，我们已经用 Typescript 定义类型，却还要用装饰器再写一遍，例如：

```ts
class AppController {
  @ApiResponse({ type: String })
  home(): string {
    return 'hello, world'
  }
}
```

`home` 方法已经用 Typescript 标注返回的是 string，我们还要用 `@ApiResponse` 再标注一遍，显然有点重复。基于以上，官方提供了一个脚手架插件，能在 typescript 编译为 JavaScript 时，根据 TypeScript 的元数据反射系统帮助我们收集这些类型数据，从而转为 swagger 文档的数据。话不多说，先来看下效果：

1. 编辑根目录下的 `nest-cli.json` 文件，将 `@nestjs/swagger` 作为插件传入编译选项中。

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "@nestjs/swagger",
        "options": {
          "dtoFileNameSuffix": [".vo.ts", ".dto.ts", ".entity.ts"],
          "introspectComments": true
        }
      }
    ],
  },
}

```

2. 回到 `src/app.controller.ts` 文件中，把 `@ApiResponse` 装饰器去掉。

```
xxx
```

3. 等待重新编译，再次访问效果是一样的。