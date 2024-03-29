---
title: 浏览器对二进制内容的下载处理机制
date: 2023-07-19 11:05:00
---

当你在浏览器地址栏输入一个地址，有时会在页面中渲染，有时会弹出下载窗口，浏览器是怎么对待不同内容的呢？答案是：浏览器会先识别链接返回的内容是什么类型，如何是支持的类型，则会渲染，否则会下载。

## 内容类型

浏览器识别内容并不是靠后缀，而是通过 HTTP 头部中的 Content-Type 字段来判断。这个字段的值是 MIME 类型，比如：text/html、application/pdf、image/jpeg、application/zip等。来看下面这个例子：

```bash
# 请求地址
https//juetan.cn/index.txt
# 响应头
content-type: image/jpeg
```

以上，文件的类型是 txt 还是 jpeg 呢？答案是 jpeg。

## MIME 类型

MIME 类型，即 Multipurpose Internet Mail Extensions(多用途网络邮件扩展)，最早是在邮件中用来表示附件的类型，如今广泛用于表示网络资源的类型，比如文件类型，网页类型，图片类型等等。MIME 主要分为 2 大类型和若干子类型：

### 单文件类型

表示内容只由一种类型组成，包括：

- text：包括 text/html、text/css等
- image：包括 image/jpeg、image/png等
- audio：包括 audio/mpeg、audio/ogg等
- video：包括 video/mp4、video/ogg等
- application：包括 application/pdf、application/msword等

### 多文件类型

表示内容可有由多种类型组成，包括：

- multipart：包括 multipart/form-data、multipart/mixed等，通过表单上传多个不同类型的文件。

### 浏览器

浏览器对常见类型进行了支持，例如 png、jpg、gif、bmp、webp、svg 等，也有一些不支持的，例如 zip、avi、excel、ppt 等。

## 浏览器支持的类型

对于支持的类型，浏览器默认会渲染，如果我们不想渲染而是想下载呢，这有没有办法呢？例如：

```html
<a href="https://www.abc.com/abc.png" >下载图片</a>
```

以上，点击后会弹出图片，而不是下载。

### 文件链接同源

同源指协议名，主机名和端口三个参数相同，使用 `location.origin` 可查看当前页的同源地址。

此时，可以指定 `<a>` 标签的 `download` 属性，让浏览器下载而不是打开，代码如下：

```html
<a href="https://www.abc.com/abc.png" download="ABC.png" >下载</a>
```
### 文件链接非同源

如果文件链接不同源可以从响应头下手，`Content-Disposition` 响应头可以让浏览器下载而不是打开，响应头如下：
```
Content-Disposition: attachment;filename=xxx.png
```

其中，attchment 意为附件，意思是让浏览器当成附件下载，filename 可以指定保存的文件名，默认为原始文件的名字。

## 使用代码下载

除了让浏览器下载，还可以自己手动写代码生成二进制数据，再模拟一个 `<a>` 标签的行为进行下载。首先，要得到一段二进制数据。方式有很多种，这里简单介绍几个：

### 从服务器获取

利用 `fetch` 或 `xhr` 方法，我们可以获取到请求返回来的二进制数据，例如：

```ts
async function getArrayBuffer() {
  const res = await fetch('https://abc.com/abc.png');
  const buffer = await res.arrayBuffer();
  return buffer;
}
```

上面得到的 ArrayBuffer 就是二进制数据，当然也可以通过 `res.blob()` 得到 Blob 数据，这也是二进制数据。

### 代码生成二进制数据

可以从服务器获取 ArrayBuffer，也可以自己 new 一个，如下：

```ts
const buffer = new ArrayBuffer(16);
const dataview = new Int8Array(buffer);
dataview[0] = 255;
```

上面，16 指数据大小，单位为字节(B)。buffer 不能直接操作，需要使用类型数组进行操作，这里于本文不太相关，可自行查阅。

### 从页面元素获取

假如页面上有一个文件类型的输入框，当如果选择了一个文件时，我们是可以获取到文件数据的，代码如下：

```html
<input type="file" onchange="onChange" />

<script>
function onChange(e) => {
  let data;
  const file = e.target.files[0];
  const reader = new FileReader()
  reader.onLoad = (e) => {
    data = e.result
  }
  reader.readAsBlob(file);
}
</script>
```

读取的数据类型为 Blob 类型。

### 生成链接并下载

ArrayBuffer 不能直接下载，但可以转换成 Blob ：

```ts
const blob = new Blob([buffer]);
```

有了 Blob，就可以生成一个下载链接：

```ts
const link = URL.createObjectURL(blob)
```

有了下载链接，就可以模拟 `<a>` 标签的下载行为：

```ts
function download(blob) {
  const link = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = link;
  a.click();
  URL.revokeObjectURL(link);
}
```
需要注意的是，使用 `URL.createObjectURL` 生成链接并使用完之后，要用 `URL.revoekeObjectURL` 进行撤销，否在该内容会一直留在内存中。

## 结语

以上，介绍了关于浏览器下载的内容。对于浏览器支持的格式，会直接在窗口中打开；对于不支持的格式，会直接弹窗进行下载。如果要下载浏览器支持格式的内容：同源可以指定 `<a>` 标签的 `download` 属性进行下载，不同源可以指定 `Content-Disposition` 响应头进行下载。