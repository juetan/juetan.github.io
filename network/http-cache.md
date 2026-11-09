---
title: HTTP 缓存，从 Expires 到 ETag
date: 2026-11-09 11:36:00
---

当服务器面对海量访问时，压力是非常大的。因此，把部分静态资源(例如 js/css/image)，缓存在客户端，是非常必要的。HTTP 提供了很多缓存字段，方便客户端实现有效的缓存。

## 私有缓存

私有缓存是针对当前用户的个性化缓存，主要指通过 cookie 控制的个性化内容。如果想使用私有缓存，使用如下 HTTP 响应头部：

```http
http/1.1 200 ok
Cache-Control: private
```

以上需要注意：

- 如果只有 cookie 字段不会成为私有缓存，还需要 cache-control 的配合
- 如果请求中包含 authorization 字段，即使响应中包含 cache-control: private 也不会储存在私有缓存中

## 自动缓存

当响应没有明确指示缓存信息，客户端依然会根据某些条件自动缓存，这成为启发式缓存(这里称自动缓存)。例如以下响应：

```http
HTTP/1.1 200 OK
Date: Tue, 22 Feb 2022 22:22:22 GMT
Last-Modified: Tue, 22 Feb 2021 22:22:22 GMT
```

Last-Modifed 是文件上一次的更新，Date 是当前时间，两者相差一年时间。客户端会推断，该资源在比较近的一段时间内不会更新，具体多长时间根据客户端实现有所不同，但规范推荐 10% 的时间。此外，这是 cache-control 被广泛采用前的一种解决方法。

## 强制缓存

所谓强制缓存，指服务端返回资源的同时返回缓存时间，客户端只有强制执行的份。

### Expires

在 HTTP/1.0 中，当服务器希望客户端缓存某个资源时，应在响应中包含 Expires 字段，如下：

```http
http/1.0 200 ok
Expires: Tue, 28 Feb 2022 22:22:22 GMT
```

但很快发现这种方式有问题：

- 时间格式难以解析
- 如果服务端和客户端时钟不一致，会导致缓存提前或延后失效
‘
### Cache-Control

在 HTTP/1.1 中，使用 cache-control 字段修复了 expires 的问题，使用 max-age 属性指定一个相对时间，而非 expires 那样的绝对时间，避免了冲突。如下：

```http
http/1.1 200 ok
Cache-Control: max-age=604800 # 604800秒 = 一周
```

## 协商缓存

在前面提到的强制缓存中，当缓存失效时应当会立即丢弃，这个过程其实是可以优化的。HTTP 补充了另一种机制，当 缓存失效后，询问当前缓存是否还能使用，这便是协商缓存(或者说验证缓存)。

### Last-Modified

当客户端请求资源时，服务端返回资源的同时，会在响应中包含 Last-modified 字段，指示当前资源最近的修改时间，示例如下：

```http
http/1.1 200 ok
Last-Modified: Tue, 22 Feb 2022 22:00:00 GMT
Cache-Control: max-age=3600
```

客户端接收以上响应并缓存，在 3600 秒后缓存失效。客户端再次发起请求，并在请求中包含 if-modified-since 字段，询问修改时间是否更新过，如下：

```http
GET /xxx.js http/1.1
If-Modified-Since: Tue, 22 Feb 2022 22:00:00 GMT
```

服务器收到请求后，确认没有变化后，返回 304 响应和新的缓存时间，如下：

```http
http/1.1 304 Not Modified
Last-Modified: Tue, 22 Feb 2022 22:00:00 GMT
Cache-Control: max-age=3600
```

你可能注意到，Modified 使用的是和 expires 类似的时间格式。这在单台服务器中或许没问题，但在分布式服务器中时间同步是个问题。为了解决这些问题，`ETag` 响应标头被标准化作为替代方案。

### ETag

相比于使用修改时间作为缓存判断，使用文件相关的哈希值作为判断条件更可靠些。于是，HTTP 提供 etag 响应字段，描述文件的修改和更新。

当客户端请求资源时，服务端返回资源的同时，在响应中携带 etag 字段，如下：

```http
http/1.1 200 ok
ETag: "deadbeef"
Cache-Control: max-age=3600
```

客户端接收以上响应并缓存，在 3600 秒后缓存失效。客户端再次发起请求，并在请求中包含 if-none-match 字段，询问资源是否更新过，如下：

```http
GET /xx.js http/1.1
If-None-Match: "deadbeef"
```

服务器收到请求后，确认没有变化后，返回 304 响应和新的缓存时间，如下：

```http
http/1.1 304 Not Modified
Last-Modified: Tue, 22 Feb 2022 22:00:00 GMT
Cache-Control: max-age=3600
```

在缓存重新验证期间，如果 `ETag` 和 `Last-Modified` 都存在，则 `ETag` 优先。但 last-modified 也不是没有必要的，它是个标准的 http 字段，cms/爬虫等工具会用到它。因此，最好同时提供 `ETag` 和 `Last-Modified`。

## 强制验证

前面说的协商缓存，会在缓存失效后再验证。HTTP 还提供了另一种更激进的机制，每次使用前，都先发请求进行验证。

当客户端请求资源时，服务器返回资源的同时，在响应中携带 cache-control: no-cache 字段。no-cache 不是说不缓存，no-store 才是不缓存，no-cache 是指资源缓存，有效性不缓存，因此每次使用前，都先发请求询问是否有效。如下：

```http
http/1.1 200 ok
Last-Modified: Wed, 01 Jan 2025 00:00:00 GMT
ETag: "123456789"
Cache-Control: no-cache
```

客户端收到响应，缓存该资源，但标记该资源有效性未确定。在下次要使用到该资源时，客户端发起请求询问是否更新过，如下：

```http
GET /api/data HTTP/1.1
If-Modified-Since: Wed, 01 Jan 2025 00:00:00 GMT
If-None-Match: "123456789"
```

服务端验证资源未更新后，返回 304 响应。

```http
HTTP/1.1 304 Not Modified
Cache-Control: no-cache
Last-Modified: Wed, 01 Jan 2025 00:00:00 GMT
ETag: "123456789"
```

客户端收到后，确认没有更新，则使用本地缓存的资源。补充：no-cahce 还有另一种替代写法，这是兼容 http/1.1 之前无法处理 no-cache 的写法，如下：

```http
http/1.1 200 ok
Cache-Control: max-age=0, must-revalidate
```

## 禁用缓存

根据前面提到的自动缓存，即使响应中未明确指定缓存信息，客户端依然有可能自动缓存。明确性地指示不缓存，如下：

```http
HTTP/1.1 200 ok
Cache-Control: no-store
```

## 最后

HTTP 提供了多种缓存方式：私有缓存、自动缓存、强制缓存、协商缓存、强制验证和禁用缓存。值得重点关注的是 expires/cache-control 为主的强制缓存，以及 last-modified/etag 为主的协商缓存。