---
title: 使用Crawlee实现爬虫功能
date: 2023-07-22 11:00:00
---

在做 [前端驿站](https://juetan.cn/nav) 这个导航网站时，收集到的每个网站都是有图标的，但部分网站由于某墙的原因，直接用源站图标URL会导致加载失败。谷歌一番后，最终用 [Crawlee](https://crawlee.dev/) 将所有图标都爬取回来了，直接打包到项目里，这里记录下这个库的一些基本用法。

今天实现一个小目标，爬取 [豆瓣电影 Top 250](https://movie.douban.com/top250) 的数据，页面如下：

![](./image-douban.png)

最终整理成如下的 JSON 数据，并把图片也下载下来：

```json
[
  {
    "name": "xxx",
    "cover": "./xxx.png"
  }
  ...
]
```

## Crawlee

Crawlee 是是从 Apify 里面独立出来的爬虫模块，支持 Cheerio 、Puppeteer 和 Playwright 的无缝集成。其中，Cheerio 功能类似 JQuery，但可以在非浏览器环境中使用，这也是 Crawlee 内置的一种爬虫类型。Puppeteer 和 Playwright 是一种通过协议操作浏览器的上层库，可以在服务端运行，使用这两个库需要单独安装它们的依赖。

我们的目标比较简单，因此使用 Cheerio 就足够。

## 初始化项目

1. 新建个项目

```bash
npm init -y
```

2. 安装 Crawlee

```bash
npm install crawlee
```

