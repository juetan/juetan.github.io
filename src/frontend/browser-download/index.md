---
title: 浏览器对二进制内容的下载处理机制
date: 2023-07-19 11:05:00
---

从服务端下载内容是很常见的操作，例如从服务器下载一个 .exe 文件，一个 .zip 文件或 .png 文件等。但在浏览器进行下载，是有一点门道的，接下来从两个方面聊下如何在浏览器下载内容。

## 利用浏览器进行下载

这里的意思是指，不使用JS操作二进制数据，直接给让浏览器打开一个链接，利用浏览器的内置规则进行下载。例如，使用 `<a>` 标签打开一个 .zip 文件的链接，浏览器会弹出一个下载弹窗，代码如下：

```html
<a href="https://www.abc.com/abc.zip" />
```

上面的代码可以正常工作，但换成 .png 文件的链接，就会直接在浏览器打开而不是下载，这是为啥呢？

### 内容类型

主要在于，对于一个链接是否打开还是下载，取决于浏览器对 `Content-Type` 响应头的识别，有点区别文件后缀的识别方式。当浏览器支持 `Content-Type` 对应的类型时，浏览器会直接打开，反之会弹窗下载让用户自行处理。

如果想让浏览器直接下载而非打开支持的类型，可不可以呢？也是可以的，但这里也分两种情况：

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