---
title: NestJS：基于swagger生成路由文档及进阶用法
date: 2023-08-07
---

Swagger 是一个用于生成 RESTful API 接口文档的工具，目前其数据规范已更名为 OPENAPI 并作为一项标准进行推广。很多后端语言都有相应的社区包，在 NestJS 中有官方提供的 @nestjs/swagger 库。

## 工作原理

安装对应依赖后，使用注释/注解/装饰器在路由方法上，标注请求参数(路径参数/查询参数/body 参数)的类型和返回值类型等信息，如下：

```ts
class XxxController {
  @ApiResopnse({ type: XXX })
  @ApiOperation({ description: '分页获取用户' })
  getUsers(@Query() xx: QueryParams) {}
}
```

编译时，会根据这些信息生成一个符合 OPENAPI 格式的 json 对象，结构类似下面这种。其中：paths 存放接口的信息，包括请求路径、请求参数类型和响应数据类型等信息，如果参数或响应类型是对象等复杂类型，会用 #/components/xx 形式指向 components 下定义的具体类型。

```json
{
  "openapi": "3.0.0",
  "paths": {},
  "info": {},
  "tags": [],
  "components": {}
}
```

接着，启动一个 Swagger UI 前端，在这个前端页面加载时再去请求这个 json 对象，渲染出文档页面，用代码表示大概是如下这样：

```html
<div id="swaggerui"></div>
<script>
  window.onload = function () {
    let swaggerOptions = {
      url: 'xxx/openapi.json',
      dom_id: '#swaggerui',
    };
    let ui = SwaggerUIBundle(swaggerOptions);
    window.ui = ui;
  };
</script>
```

## 在 NestJS 中的安装

官方的 @nestjs/swagger 包，比 express-swagger-ui 等库有更好的集成，你可以使用 SwaggerModule 扫描应用内的所有接口，也可以使用 SwaggerPlugin 参与到 typescript 的编译中，并从注释中获取接口信息。

1. 安装依赖

```bash
pnpm i @nestjs/swagger
```

2. 修改 src/app.controller.ts 文件，使用 @nestjs/swagger 提供的装饰对我们的路由方法进行一些标注，具体的装饰器种类和使用可到官方文档中查看。

```ts
// src/app.controller.ts
class AppController {
  @ApiOperation('首页接口')
  home() {
    return 'Home Page';
  }
}
```

2. 修改 src/main.ts 文件，我们需要在 Nest 应用启动后进行扫描，并输出最终的接口文档。

```ts
const docConfig = new DocumentBuilder().setTitle(`接口文档`).setVersion('1.0').build();
const document = SwaggerModule.createDocument(app, docConfig, options);

SwaggerModule.setup('/openapi', app, document, {
  jsonDocumentUrl: `openapi.json`,
  yamlDocumentUrl: `openapi.yaml`,
  customfavIcon: '/favicon.ico',
  customSiteTitle: `OpenApi 接口文档`,
});
```

以上就是基本的设置，其中 DocumentBuilder 定义 OPENAPI 对象中的 info/tags 等基本信息，而 SwaggerModule 扫描应用中的路由，补全 OPENAPI 中的 paths/components 等信息，此时 document 就是一个完整的 OPENAPI 对象。而 setup 方法启动前端页面，并配置一些页面的样式和 URL 之类的信息。

4. 启动应用后，访问 [http://127.0.0.1:3000/openapi](http://127.0.0.1:3000/openapi)， 此时你应该能看到如下效果：

![](./image-swagger1.png)

## 命令行插件

通常来说，你需要在每个接口相关的地方里用 @ApiXxx 装饰器标注信息，这无疑很费时间。于是，@nestjs/swagger 内置有命令行插件，帮助你从自动收集这些信息而不是手动标注，使用方式如下：

1. 修改根目录下的 nest-cli.json 文件，这是 Nest CLI 的配置文件将。 将 @nestjs/swagger 作为插件传入编译选项中，支持传递参数。

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
    ]
  }
}
```

2. 回到 src/app.controller.ts 文件中，把 @ApiResponse 装饰器去掉，改为注释。

```ts
class AppController {
  /**
   * 首页接口(插件)
   */
  home() {
    return 'Home Page';
  }
}
```

3. 等待重新编译，再次访问效果是一样的。

## 包装响应结果

在国内，我们通常会把响应数据包装成 { code, message, data } 的格式再返回。在 NestJS 中，通常通过拦截器进行包装，但 Swagger 并不知道指这点，输出的依旧是原始数据类型。那么，有没有办法给 swagger 中的每个响应都包装一层结构呢？有，记得前面的 document 对象吗，他是一个 OPENAPI 对象，我们可以手动修改而达到目的。

废话不多说直接贴代码，有兴趣的可以自己研究下：

```ts
export function addResponseWrapper(doc: OpenAPIObject) {
  for (const path of Object.keys(doc.paths)) {
    const pathItem = doc.paths[path];
    if (!pathItem) {
      continue;
    }
    for (const method of Object.keys(pathItem)) {
      const responses = doc.paths[path][method].responses;
      if (!responses) {
        continue;
      }
      for (const status of Object.keys(responses)) {
        const json = responses[status].content?.['application/json'];
        if (!json) {
          responses[status].content = {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Response',
              },
            },
          };
          continue;
        }
        const schema = json.schema;
        json.schema = {
          allOf: [
            {
              $ref: '#/components/schemas/Response',
            },
            {
              type: 'object',
              properties: {
                data: schema,
              },
              required: ['data'],
            },
          ],
        };
      }
    }
  }

  doc.components.schemas.Response = {
    type: 'object',
    properties: {
      code: {
        type: 'integer',
        description: '状态码',
        example: 2000,
        format: 'int32',
      },
      message: {
        type: 'string',
        description: '提示信息',
        example: '请求成功',
      },
    },
    required: ['code', 'message'],
  };

  return doc;
}
```

然后，把上面的这行代码：

```ts
const document = SwaggerModule.createDocument(app, docConfig, options);
```

替换为下面这行调用，重启即可看到效果

```ts
const document = addResponseWrapper(SwaggerModule.createDocument(app, docConfig, options));
```

其实写这段代码之前，我在网上找很久都没找到有说这方面内容的，只在官方仓库找到一条 issue ，官方的意思是不打算做，社区有做的可以以包的形式发出来。于是自己参照 OPENAPI 的结构封装了这个函数。

## 结语

以上，介绍个人使用 Swagger 的一些疑问探索和使用体验，如有错误还望指出。近年来，基于 OPENAPI 的生态有不少，写好 API 文档可以围绕着做很多有意思的结合。例如，根据 API 文档自动生成请求结构，生成表格/表单代码等。
