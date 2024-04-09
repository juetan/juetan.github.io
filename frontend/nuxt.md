---
title: NuxtJS：基于 VueJS 的全栈式框架，简明笔记
date: 2024-01-30 18:00:00
---

[NuxtJS](https://nuxt.com/) 是基于 VueJS 的全栈式框架，不仅支持 CSR/SSR/SSG/SWR/ISR 等渲染模式，还支持文件路由/自动导入/布局管理等额外功能。注意：[NextJS](https://nextjs.org/) 是基于 ReactJS 的全栈式框架，[NestJS](https://nestjs.com/) 是基于 NodeJS 的后端框架，切勿混淆。粗略翻过一遍官方文档，总结一些我比较关注的点。

## 快速上手

Nuxt 提供很多开箱即用的工具，上手还是非常简单的。

### 创建项目

[Nuxi]() 是 Nuxt 提供的命令行工具，用来初始化项目，按如下操作快速上手：

```bash
# 创建目录并拉取模板文件
npx nuxi@latest init <name>

# 进入目录
cd <name>

# 安装依赖
pnpm install

# 启动开发并自动打开浏览器
pnpm dev --open
```

### 项目结构

Nuxt 采用约定式的目录结构，特定目录会自动加载，先来看一眼官方推荐的目录结构：

```bash
.
├── .nuxt
├── .output
├── assets
├── components
├── composables
├── content
├── layouts
├── middleware       # Nuxt中间件
├── modules          # Nuxt模块
├── node_modules
├── pages
├── plugins          # Nuxt插件
├── public
├── server           # 接口服务
├── utils
├── .env
├── .gitignore
├── .nuxtignore
├── app.config.ts
├── app.vue
├── error.vue
├── nuxt.config.ts
├── package.json
└── tsconfig.json
```

当基于 Vite 打包时，Vite 的配置可以在 nuxt.config.ts 进行添加。此外，index.html 在 Nuxt 中不存在，但提供了很多方法添加/修改其中的标签；src 目录存在，采用扁平化的结构。

## 重要概念

Nuxt 聚合的工具很多，说是个缝合怪也不为错，各类工具聚在一起很容易造成概念上的误解，接下来了解一些重要的概念：

###  渲染模式

渲染，主要指 HTML 的渲染，这会影响到 SEO 和首屏加载等指标，Nuxt 支持很多种渲染模式，

| 名字 | 全称 | 描述 |
| --- | --- | --- |
| CSR | Client Side Render(客户端渲染) | HTML 在客户端动态生成，典型的就是 VueJS 单页面应用。|
| SSG |  Server Side Generate(服务端生成) |HTML 在服务端已生成好，加载 JS 后会自动注水(Hydrate)，完成静态到动态的转换，典型的就是 Vitepres 静态应用。
| SSR |  Server Side Render(服务端渲染) | HTML 在服务端动态生成，页面加载 JS 后自动注水，典型的就是官网首页等需要 SEO 的地方。
|SWR |  Stable-Whilte-Revalidate(返回过时内容同时重新生成) | 实际上，这是一种缓存策略：设置一个缓存时间:用户在首次访问页面时，返回新内容用户在缓存期间访问时，返回缓存用户在缓存过期访问时，返回缓存并在后台更新缓存，再下次访问时就可以获取到最新内容。
| ISR |   Incremental Static Regeneration(增量静态重新生成) | 类似于 SWR，但可以配合 CDN 和边缘计算实现不错的缓存效果。目前只有少数云服务商支持，例如 vercel。此外，本地开发时是看不到效果的，需部署到 vercel 等平台才能看到效果。


默认的渲染模式是 SSR，可以在 nuxt.config.ts 通过 srr: false 关闭，此外还可可以手动指定路由使用什么模式，例如：

```ts
export default defineNuxtConfig({
  ssr: false,
  routeRules: {
    '/admin': {
      ssr: false,
    },
    '/xxx': {
      swr: true,
    },
})
```

### 模块

类似于 vite 插件，在构建时使用，不用插件这个名字是因为这个名字另有他用，使用模块有以下 2 种方式：

- 任何在 modules 目录下的文件都会自动加载为模块，多个模块按文件名顺序执行，示例：

```ts
// modules/demo.ts
export default defineNuxtModule({
  setup() {
    // 逻辑代码...
  }
})
```

- 可以在 nuxt.config.ts 中手动配置，适合第三方依赖，例如：

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt'
  ]
})
```

### 插件

类似于 vue 插件，在运行时使用，这其实是对 vueApp 更上层的封装，在这里你可以访问到 vueApp/routerApp 等实例，使用插件也有 2 种方式：

- 任何在 plugins 目录下的文件都会被自动加载，例如：

```ts
// plugins/demo.ts
export default defineNuxtPlugin((nuxtApp) => {
  console.log('nuxtApp', nuxtApp)
  nuxtApp.vueApp.config.globalProperties.$foo = 'bar'
})
```

- 可以在 nuxt.config.ts 中使用 plugins 选项来配置插件

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  plugins: [
    '~/plugins/demo.ts'
  ]
})
```

### 中间件

其实就是 vue-router 的 guard(守卫)，只不过换了个名字并做了一些封装处理，有以下几种形式的路由：

- 在 pages/xx.vue 中定义的中间件，仅适用于该页面
- 在 middleware/xx.ts 中定义的中间件，需要在页面中通过 definePageMeta 中的 middleware 字段来引用
- 在 middleware/xxx.global.ts 中定义的中间，会自动加载为全局中间件

中间件的形式如下：

```ts
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // 逻辑代码
})
```

此外，返回值与守卫有所区别，你可以返回：

- navigateTo(url) 重定向
- abortNavigation() 中断导航

sever 下也有 middleware 目录，不过那是 nitro 的中间件，与这里的中间件没有关系。

## 重要区别

在同样使用 vite 作为构建工具的情况下，Nuxt 要比 Vue 复杂得多，毕竟同时涉及服务端和客户端，下面了解开发模式上的一些区别：

### 目录结构

Nuxt 采用扁平化的目录结构，一些关键的区别如下：

| 内容     | Vue            | Nuxt                                            |
| -------- | -------------- | ----------------------------------------------- |
| 构建工具 | Vite           | Vite                                            |
| 构建配置 | vite.config.ts | nuxt.config.ts + app.config.ts                  |
| 构建命令 | vite build     | nuxt generate(SSG 模式) / nuxt build (SSR 模式) |
| 构建产物 | dist           | .output 静态文件在 .output/public               |
| 首页模板 | index.html     | 无，提供修改途径                                |
| 入口文件 | src/main.ts    | 无，可以通过插件参与                            |
| 根组件   | src/App.vue    | App.vue，位置不一样                             |
| 路由     | vue-router     | 内置 vue-router, 路由守卫移到 middleware 目录下 |
| 后端接口 | 无             | server 目录                                     |

### 状态管理

Nuxt 内置状态管理的功能，但你依然可以使用 pinia 之类的工具，示例：

```ts

```

### 数据请求

Nuxt 内置 $fetch、useFetch 和 useAsyncData 函数，基本上你不用再引入 axios，以下是示例：

```vue
<script setup lang="ts">
const { data } = await useFetch('/api/user')
</script>
```

## 路由区别

Nuxt 内置 [vue-router](https://router.vuejs.org/)，并做了封装和处理，接下来看看有哪些区别。

### 路由生成

Nuxt 内置 [unplugin-vue-router](https://github.com/posva/unplugin-vue-router) 插件，因而会按照 pages 的目录结构自动生成路由，例如

```
.
└── pages/
  ├── users/
  │   ├── index.vue   # /users
  │   └── create.vue  # /users/create
  ├── users.vue       # 作为布局
  └── home.vue        # /home
```

在路由文件文件内，可以通过 definePageMeta 或 route 块定义 route.meta 数据，如下：

```vue
// 方式1 ：definePageMeta 宏
<script setup lang="ts">
definePageMeta({
  title: '用户管理',
  layout: 'users',
});
</script>

// 方式2 ：route 块
<route lang="json">
{
  "title": "用户管理",
  "layout": "users"
}
</route>
```

### 路由守卫

路由守卫在 Nuxt 中换了个说法，称为路由中间件，在根目录下的 middleware 目录中，每个文件都是路由守卫，以 global.ts 结尾作为全局中间件。示例如下：

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  // ....
});
```

中间件会在服务端和客户端都执行，需要注意两者的边界判断，通过 import.meta.client 知道是否在客户端执行。此外，中间件是自动加载的，但非全局中间件不会自动生效，需要在路由文件中手动指定，例如：

```vue
// pages/admin.vue
<script setup lang="ts">
definePageMeta({
  middleware: 'auth', // 中间件的文件名
});
</script>
```

### 路由布局

Nuxt 内置路由布局的功能，在 layouts 目录下每个 .vue 文件都是布局文件，会自动加载但使用时需要指定。例如如下结构：

```
.
├── layouts/
│   ├── admin.vue
│   └── default.vue
└── app.vue
```

在 app.vue 文件中:

```vue
<template>
  <NuxtLayout :name="xxx">
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
```

这样使用 NuxtLayout 的 name 属性或 definePageMeta 中的 layout 属性来指定布局文件。布局实际上是 if/else 逻辑的封装，以上行为用伪代码模拟就是：

```vue
<template>
  <DefualtLayout v-if="!route.meta.layout || route.meta.layout === 'default'">
    <NuxtPage></NuxtPage>
  </DefualtLayout>
  <AdminLayout v-else-if="route.meta.layout === 'admin'">
    <NuxtPage></NuxtPage>
  </AdminLayout>
  <NuxtPage v-else></NuxtPage>
</template>

<script setup lang="ts">
import AdminLayout from '@/layouts/admin';
import DefaultLayout from '@/layouts/default';

const route = useRoute();
</script>
```

## 后端功能

Nuxt 内置 [Nitro](https://nitro.unjs.io/) 作为后端框架，Nitro 是一个类似于 express 并以中间件思想为主的后端框架，更适合 serverless 应用。实际上 Nuxt 应用也是作为中间件挂载到 nitro 上处理的，包括产物也是按 nitro 产物结构生成的。如果你要写后端，那么基本上就是在写 Nitro 应用，Nitro 的加入使得全栈称为可能。

### 目录结构

后端接口的逻辑主要集中在 server 目录下，这是一个典型 nitro 应用的目录结构：

```
.
└── server/
  ├── api/
  │   ├── info.get.ts           # GET /api/info
  │   └── register.post.ts      # POST /api/register
  ├── routes/
  │   ├── apijson.get.ts        # GET /apijson
  │   └── apicode.get.ts        # GET /apicode
  ├── middleware/
  │   ├── auth.ts
  │   └── ratelimit.ts
  ├── utils/
  │   ├── date.ts
  │   └── math.ts
  └── tsconfig.json
```

以上目录结构中：

- api 目录下的每个文件都会成为一个接口，以 method.ts 结尾可以定义方法
- routes 目录下的每个文件都会成为路由，但不会以 /api 开头
- middleware 目录下的每个文件都会成为中间件，类似于 express 的中间件
- utils 目录下的每个文件都会自动按需引入

### 配置文件

Nitro 是有 nitro.config.ts 配置文件的，不过在 Nuxt 中移动到了 nuxt.config.ts 中的 nitro 配置项中。

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    // Nitro options
  }
})
```

### 接口处理

每个接口使用 defineEventHandler 或 eventHandler 函数定义处理函数，其接受 event 参数，并返回值，如下：

```ts
// server/api/hello.ts
export default defineEventHandler(async (event) => {
  // 处理逻辑...
  return xxx;
});
```

其中 event 包含此次请求的上下文，但其提供的属性和方法很少，主要是通过其他辅助函数进行操作，例如获取查询参数如下：

```ts
const page = getQuery(event, 'page');
```

Nitro 会根据返回值的类型自动设置响应头，例如：

- 返回字符串：text/html
- 返回 JSON 对象：application/json
- 返回 Buffer 对象：application/octet-stream
- 返回其他类型：application/octet-stream

### 获取参数

Nitro 使用函数式的思想，获取参数通过一系列的辅助函数进行：

| 参数     | 方法                       |
| -------- | -------------------------- |
| 请求方法 | event.method               |
| 路径参数 | getRouteParam(event, name) |
| 查询参数 | getQuery(event)            |
| 请求体   | getBody(event)             |
| 请求头   | getHeader(event, name)     |
| 请求 IP  | getIP(event)               |
| cookie   | getCookie(event, name)     |

### 数据库

推荐使用 [Prisma](https://www.prisma.io/) 作为 ORM，使用 drizzle 之类的也可以。prisma 支持 mysql、postgres、sqlite、mongodb 数据库，下面以 mysql 为例看下是如何集成的：

1. 安装必要的依赖

```bash
pnpm add prisma @prisma/client -D
```

2. 新增 server/database/schema.prisma 文件，内容如下。备注：VsCode 可以安装 prisma 插件，获得类型提示和自动补全。

```
# 指定数据库信息
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

# user 表
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

# post 表
model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

3. 修改 package.json 文件指定 schema 的路径，默认是 prisma/schema.prisma。

```json
{
  "prisma": {
    "schema": "server/database/schema.prisma"
  }
}
```

4. 修改 .env 文件添加数据库连接信息

```
DATABASE_URL="mysql://user:pass@host:port/database"
```

以上：

- user: 数据库用户名
- pass: 数据库密码
- host: 数据库地址
- port: 数据库端口，默认 3306
- database: 数据库名称

5. 运行 npx prisma migrate dev --name init 生成迁移文件并同步到数据库中，生成的目录结构如下:

```
.
└── server/
  └── database/
    └── migrations/             # 新增的部分
      ├── 20240326112102_init/
      │   └── migration.sql
      └── migration_lock.toml
```

6. 新增 server/database/client.ts 文件创建客户端链接，值得注意的是开发阶段会有一些影响，因而应该像如下编写：

```ts
import { PrismaClient } from '@prisma/client';

// 全局变量，避免开发时频繁热更新导致连接池耗尽
declare global {
  var prismaSingletonInstance: PrismaClient;
}

// 实例
const db = globalThis.prismaSingletonInstance ?? new PrismaClient();

// 开发环境下缓存
if (import.meta.dev) {
  globalThis.prismaSingletonInstance = db;
}

export { db };
```

7. 接下来就可以使用了，会有完善的类型提示，原因在于 prisma 会在 node_modules/.prisma 目录生成文件并在 @prisma/client 中引用。

```ts
import { db } from '@/server/database/db';

db.post.create({ data: {} });
db.post.findMany();
```

8. 此外，prisma 内置一个图形化的数据库管理工具，使用以下命令即可启动。

```bash
npx prisma studio
```

### 中间件

中间件其实也是 EventHandler，只不过放在 middleware 目录下，且函数不能返回值。你不能提前中止或返回结果，本意只是让你附加一些数据在请求或响应上而已。例如附加用户信息，如下：

```ts
// server/middleware/auth.ts
export default defineEventHandler(async (event) => {
  const user = await getUser(event);
  if (user) {
    event.context.user = user;
  }
});
```


## 结语

体验下来，Nuxt 是非常不错的全栈式框架，有很多优秀的改良。特别是打包后的 node_modules 目录，经过 treeshaking 和优化后，只有几 M 大小，令人非常惊喜。此外，发现不少与 serverless 相关的类库，例如 nitro 和 zod 等，不仅构建产物小，还与 vercel 等平台集成非常好。
