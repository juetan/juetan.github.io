---
title: Emby：自建验证服务器绕过 Emby Premiere 的校验
date: 2023-12-14 17:25:00
---

[Emby](https://emby.media/index.html) 是一个基于 C/C++ 实现的私有影音管理工具，自带 web 管理面板同时支持在移动端、平板端等平台上连接 Emby Server 进行播放。原本是开源的，后来转了闭源，基于此产生另一开源分支 jellyfin 。

## 会员计划

Emby 有个叫 Emby Premiere 的会员计划，永久版 119 刀，可以在 25 个设备上使用，包含硬解、自动转换和数据同步等功能。刚了解到这个工具，但一上来就付费 800 多人民币体验有点不太值当，于是谷歌一番后，发现有 2 个不错的方案：

- 在某海鲜市场组个车队，大概 150 可以有 5 个设备的名额，但由于共享激活码，设备的使用额全凭自觉，有一定风险。
- 使用开心版(破解版)，网上也有不少教程和上传好的 docker 镜像，很多是配合 nas 进行使用的。

我个人没有 nas 设备，用途也就偶尔看看电影，想体验一些这些功能。搜到第 2 种方法时，发现可以模拟一个验证服务器绕过验证，于是想着试试看。

## 激活原理

激活时 Emby 会向 mb3admin.com 域名发送验证请求，这中间会有如下要求：

- 使用 https 协议
- 允许跨域
- 返回指定格式的数据

首先，我们需要将 mb3admin.com 的ip解析到自建服务器，这点可以通过 hosts 文件进行处理，Https 协议可以使用 mkcert 这个工具进行证书的添加，后端服务就用 go 编写。

## 操作过程

1. 下载 [mkcert](https://github.com/FiloSottile/mkcert#installation) 工具，执行以下命令生成证书：

```bash
./mkcert.exe -key-file key.pem -cert-file cert.pem localhost
```

2. 执行以下命令，注册证书到操作系统中

```bash
./mkcert.exe -install
```

3. 新建 GO 项目，在 main.go 文件中添加以下内容，部分内容请根据情况修改：

```go
package main

import (
	"fmt"
	"net/http"
	"time"
)

var addr = ":443";
var certFile =  "J:\\cert\\cert.pem"
var keyFile =  "J:\\cert\\key.pem"

type ApiEndpoint struct {
	url string;
	content string;
}

var apiEndpoints = [...]ApiEndpoint{
	{
		url: "/admin/service/registration/validateDevice",
		content: `{ "cacheExpirationDays": 365, "message": "Device Valid", "resultCode": "GOOD" }`,
	},
	{
		url: "/admin/service/registration/validate",
		content: `{ "featId":"", "registered":true, "expDate":"2099-01-01", "key":"" }`,
	},
	{
		url: "/admin/service/registration/getStatus",
		content: `{ "deviceStatus":"0", "planType":"Lifetime", "subscriptions": {} }`,
	},
}

var IndexContent =  `
  <pre>
  Emby Premiere 验证服务器

  接口：<a href="https://localhost/admin/service/registration/validateDevice">https://localhost/admin/service/registration/validateDevice</a>
  接口：<a href="https://localhost/admin/service/registration/validate">https://localhost/admin/service/registration/validate</a>
  接口：<a href="https://localhost/admin/service/registration/getStatus">https://localhost/admin/service/registration/getStatus</a>
  </pre>
`

func addCorsHeaders(w http.ResponseWriter) {
	w.Header().Add("Access-Control-Allow-Origin", "*")
  w.Header().Add("Access-Control-Allow-Credentials", "true")
  w.Header().Add("Access-Control-Allow-Headers", "*")
  w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
}

func main() {
	for _, api := range apiEndpoints {
		url, content := api.url, api.content;
		http.HandleFunc(url, func(w http.ResponseWriter, r *http.Request) {
			fmt.Printf("[%s] 访问 %s\n", time.Now().Format("2006-01-02 15:04:05"), r.URL)
			addCorsHeaders(w)
			w.Header().Add("Content-Type", "application/json")
			w.Write([]byte(content))
		})
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "text/html; charset=utf-8")
		w.Write([]byte(IndexContent))
	})

	go func ()  {
		fmt.Println("启动成功，地址：https://localhost")
	}()

	err := http.ListenAndServeTLS(addr, certFile, keyFile, nil)
	if err != nil {
		panic("启动失败")
	}
}
```

4. 启动服务

```bash
go run main.go
```

5. 修改 C:\Windows\System32\drivers\etc\Hosts 文件，添加域名解析

```
localhost mb3admin.com
```

6. 打开 Emby 激活页面，随便输入激活码，然后激活。虽然提示验证码错误，但实际是能看到小金牌的，激活完成。

## 结语

我这里这是尝个鲜，后续可能会到海鲜市场拼个车，如果是真想用的还是建议购买正版。