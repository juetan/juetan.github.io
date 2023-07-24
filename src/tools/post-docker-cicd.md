---
title: 搭建一套适用于个人的CICD构建流系统
date: 2023-07-21 18:00:00
---

在如今的容器服务中，使用Gitlab、K8S、Jenkins等技术部署服务是非常常见的，但这些需要的服务器内存和数量都不小。例如，部署一个Gitlab都需要至少4G内存，对于个人学习属实不太友好。

## 介绍
基于docker，实现面向个人的CICD集成，包括：
- 基于 docker + swarm + traefik + portainer 的容器平台。
- 基于 mysql + gitea + droneci + docker registry的构建平台。

要求：
- 至少1台安装好 docker 的服务器/虚拟机。备注：最好2台，一台为主服务器，一台为子服务器。
- 至少1个域名。备注：域名解析到国内服务器需备案
- 具备docker基本操作知识

实践项目
- 前后端分离项目(VueJS + NestJS)

准备工作
- 将`*.dev.juetan.cn`解析到主服务器，用于基础设施的访问
- 将`*.app.juetan.cn`解析到主服务器，用于部署应用的访问
- 在主服务器上，新建`/docker`目录

## 准备工作

在开始前，需要做很多准备

### 初始化docker集群

Docker 的 Swarm 模式表示集群， 允许在一台主服务器上，管理多台子服务器的容器和状态。

```bash
# 在主服务器上，初始化docker集群
docker swarm init

# 在主服务器上，查看加入令牌。备注：只有1台服务器跳过该步骤
docker swarm join-token worker

# 在子服务器上，使用令牌加入集群。备注：只有1台服务器跳过该步骤
docker swarm jorin --token xx ip:port
```

### 在主服务器上，创建必要的网络(`network`)。
```bash
# 用于加入到外部访问的公共网络
docker network create -d overlay network_public
```

### 在主服务器上，创建必要的数据卷(`volume`)。
```bash
# 用于portainer的数据卷
docker volume create volume_portainer

# 用于mysql的数据卷
docker volume create volume_myqsl

# 用于gitea的数据卷
docker volume create volume_gitea

# 用于droneci的数据卷
docker volume create volume_drone

# 用于docker registry的数据卷
docker volume create volume_registry
```

### 在主服务器上，创建1个将分配给`droneci`使用的用户，用于远程更新容器
```bash
# 创建用户
useradd droneci -m -s /bin/bash

# 创建密码
passwd droneci

# 加入docker用户组
usermod -a -G docker droneci

# 切换到该用户
su droneci

# 测试是否有docker的执行权限
docker service ls

# 修改ssh的配置
vim /etc/ssh/sshd_config

# 允许使用密码登录
PasswordAuthentication yes

# 重启ssh服务
service ssh restart
```

## 核心服务

### 添加核心容器

修改`/docker/core.toml`文件，添加内容如下
```yaml
version: "3"

services:
  traefik:
    image: traefik:latest
    command:
      - --api=true
      - --api.dashboard=true
      - --api.debug=true
      - --providers.docker
      - --providers.docker.swarmmode
      - --providers.docker.exposedbydefault=false
      - --providers.docker.network=public
      - --entrypoints.web.address=:80
      # - --entrypoints.web.http.redirections.entrypoint.to=websecure
      - --entrypoints.websecure.address=:443
      - --certificatesresolvers.acmeresolver.acme.httpchallenge=true
      - --certificatesresolvers.acmeresolver.acme.httpchallenge.entrypoint=web
      - --certificatesresolvers.acmeresolver.acme.email=contact@juetan.cn
      - --certificatesresolvers.acmeresolver.acme.storage=/letsencrypt/acme.json
    networks:
      - network_public
    ports:
      - 80:80
      - 443:443
    volumes:
      - ./letsencrypt:/letsencrypt
      - /var/run/docker.sock:/var/run/docker.sock
    deploy:
      mode: replicated
      replicas: 1
      placement:
        constraints: [node.role == manager]
      labels:
        - traefik.enable=true
        - traefik.http.routers.dashboard.rule=Host(`router.dev.juetan.cn`)
        - traefik.http.routers.dashboard.entrypoints=websecure
        - traefik.http.routers.dashboard.tls.certresolver=acmeresolver
        - traefik.http.routers.dashboard.service=api@internal
        - traefik.http.services.api@internal.loadbalancer.server.port=8080
        - traefik.http.routers.dashboard.middlewares=traefik-auth
        - "traefik.http.middlewares.traefik-auth.basicauth.users=admin:$$apr1$$8EVjn/nj$$GiLUZqcbueTFeD23SuB6x0"

  agent:
    image: portainer/agent:latest
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /var/lib/docker/volumes:/var/lib/docker/volumes
    networks:
      - network_portainer
    deploy:
      mode: global
      placement:
        constraints: [node.platform.os == linux]

  server:
    image: portainer/portainer-ce:latest
    command: -H tcp://tasks.agent:9001 --tlsskipverify
    volumes:
      - valume_portainer:/data
    networks:
      - network_portainer
      - network_public
    deploy:
      mode: replicated
      replicas: 1
      placement:
        constraints: [node.role == manager]
      labels:
        - traefik.enable=true
        - traefik.http.routers.server.rule=Host(`server.dev.juetan.cn`)
        - traefik.http.routers.server.entrypoints=websecure
        - traefik.http.routers.server.tls.certresolver=acmeresolver
        - traefik.http.services.server-service.loadbalancer.server.port=9000

networks:
  network_portainer:
    driver: overlay
  network_public:
    external: true
volumes:
  valume_portainer:
    external: true
```

02. 运行以下命令启动
```bash
docker stack deploy -c /docker/core.yml core
```

## 开发服务

### 创建开发流所需的容器

01. 在`Portainer`页面中，依次选择`Stacks`- `Add Stack`，填写`name`为`base`，内容如下：
```yaml
version: '3'

services:
  mysql:
    image: mysql:5.7
    command: --default-authentication-plugin=mysql_native_password --character-set-server=utf8mb4 --collation-server=utf8mb4_bin --default-storage-engine=INNODB --max_allowed_packet=256M --innodb_log_file_size=2GB --transaction-isolation=READ-COMMITTED --binlog_format=row
    networks:
      - public
    ports:
      - 13306:3306
    volumes:
      - volume_mysql:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
    security_opt:
      - seccomp:unconfined
    deploy:
      placement:
        constraints:
          - node.role==manager

  gitea:
    image: gitea/gitea:latest
    volumes:
      - volume_gitea:/data
    networks:
      - public
    environment:
      - APP_NAME=代码仓库
      - RUN_MODE=prod
      - DOMAIN=git.dev.juetan.cn
      - ROOT_URL=https://git.dev.juetan.cn
      - DISABLE_SSH=true
      - ENABLE_GZIP=true
      - SSH_PORT=2222
      - DISABLE_REGISTRATION=true
      - REQUIRE_SIGNIN_VIEW=true
      - USER_UID=1000
      - USER_GID=1000
      - DB_TYPE=mysql
      - DB_HOST=mysql:3306
      - DB_NAME=gitea
      - DB_USER=root
      - DB_PASSWD=root
    deploy:
      placement:
        constraints:
          - node.role==manager
      labels:
        - traefik.enable=true
        - traefik.http.routers.gitea.rule=Host(`git.dev.juetan.cn`)
        - traefik.http.routers.gitea.entrypoints=websecure
        - traefik.http.routers.gitea.tls.certresolver=acmeresolver
        - traefik.http.services.gitea-service.loadbalancer.server.port=3000

  registry:
    image: registry:2
    networks:
      - public
    volumes:
      - volume_registry:/var/lib/registry
    deploy:
      mode: replicated
      replicas: 1
      placement:
        constraints:
          - node.role==manager
      labels:
        - traefik.enable=true
        - traefik.http.routers.registry.rule=Host(`registry.dev.juetan.cn`)
        - traefik.http.routers.registry.entrypoints=websecure
        - traefik.http.routers.registry.tls.certresolver=acmeresolver
        - traefik.http.services.registry-service.loadbalancer.server.port=5000

  drone-server:
    image: drone/drone:latest
    environment:
      - DRONE_TLS_AUTOCERT=false
      - DRONE_AGENTS_ENABLED=true
      - DRONE_GITEA_SERVER=https://git.dev.juetan.cn
      - DRONE_GITEA_CLIENT_ID=214e79d8-08bd-4b55-8111-b9fc3ecb564e
      - DRONE_GITEA_CLIENT_SECRET=UCZStx5EULnkzWd26NfK7pJB0NE48zD8Zvo7LTBSHoTA
      - DRONE_RPC_SECRET=1eade7915d5f817ee1a64eeba165c502
      - DRONE_SERVER_HOST=ci.dev.juetan.cn
      - DRONE_SERVER_PROTO=https
      - DRONE_GIT_ALWAYS_AUTH=false
    networks:
      - public
    volumes:
      - volume_drone:/data
    deploy:
      mode: replicated
      replicas: 1
      placement:
        constraints:
          - node.role==manager
      labels:
        - traefik.enable=true
        - traefik.http.routers.drone.rule=Host(`ci.dev.juetan.cn`)
        - traefik.http.routers.drone.entrypoints=websecure
        - traefik.http.routers.drone.tls.certresolver=acmeresolver
        - traefik.http.services.drone-service.loadbalancer.server.port=80

  drone-runner:
    image: drone/drone-runner-docker:latest
    environment:
      - DRONE_RPC_PROTO=https
      - DRONE_RPC_HOST=ci.dev.juetan.cn
      - DRONE_RPC_SECRET=1eade7915d5f817ee1a64eeba165c502
      - DRONE_RUNNER_CAPACITY=2
      - DRONE_RUNNER_NAME=AGENT-CCTOMATO-001
    networks:
      - public
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    deploy:
      placement:
        constraints:
          - node.role==manager

networks:
  public:
    external: true

volumes:
  volume_mysql:
    external: true
  volume_gitea:
    external: true
  volume_registry:
    external: true
  volume_drone:
    external: true
```
02. 点击`Deploy the stack`，等待服务部署完成。
```
可能会比较慢
```
03. 使用`DBeaver`或其他数据库管理软件连接`Mysql`，创建数据库`gitea`。
```
https://dbeaver.io/
```
04. 访问`https://git.dev.juetan.cn`完成创建，点击`设置-应用`创建应用如下：
```
应用名称：DroneCI(可任意名称)
重定向地址：https://ci.dev.juetan.cn/login
```
05. 复制客户端ID和客户端密钥，更新core.yml文件，然后重启服务
```yaml
# core.yml
services:
  drone-server:
    image: drone/drone:latest
    environment:
      - DRONE_GITEA_CLIENT_ID=此处填写间客户端ID
      - DRONE_GITEA_CLIENT_SECRET=此处填写客户端密钥
```

## 项目实践
接下来是项目实践，部署一个前后端分离，前端为VueJS，后端为NestJS的项目。

### 前端配置
01. 在根目录下新建`.drone.yml`文件，添加如下内容：
```yaml
kind: pipeline
name: default
steps:
  - name: build
    image: node:14.16.1
    commands:
      - npm install --registry=https://registry.npm.taobao.org
      - npm run build
  - name: docker
    image: plugins/docker
    settings:
      repo: registry.dev.juetan.cn/web
      registry: registry.dev.juetan.cn
      insecure: true
      force_tag: true
      tags: latest
  - name: deploy
    image: appleboy/drone-ssh
    settings:
      host:
        from_secret: DEPLOY_HOST
      username:
        from_secret: DEPLOY_USER
      password:
        from_secret: DEPLOY_PASSWORD
      port:
        from_secret: DEPLOY_PORT
      script:
        - docker service update --image registry.dev.juetan.cn/web:latest app1_web
```

02. 在根目录下新建`Dockerfile`文件，添加如下内容：
```bash
FROM nginx
COPY ./dist /usr/share/nginx/html
ENTRYPOINT ["nginx","-g","daemon off;"]
```

### 后端配置
01. 在根目录下新建`.drone.yml`文件，添加如下内容：
```yaml
kind: pipeline
name: default
steps:
  - name: build
    image: node:latest
    commands:
      - npm install --registry=https://registry.npm.taobao.org
      - npm run build
  - name: docker
    image: plugins/docker
    settings:
      repo: registry.dev.juetan.cn/server
      registry: registry.dev.juetan.cn
      insecure: true
      force_tag: true
      tags: latest
  - name: deploy
    image: appleboy/drone-ssh
    settings:
      host:
        from_secret: DEPLOY_HOST
      username:
        from_secret: DEPLOY_USER
      password:
        from_secret: DEPLOY_PASSWORD
      port:
        from_secret: DEPLOY_PORT
      script:
        - docker service update --image registry.dev.juetan.cn/server:latest app1_server
```

02. 在根目录下新建`Dockerfile`文件，添加如下内容：
```bash
FROM node:latest
COPY . .
ENTRYPOINT ["npm","run","start"]
```

### 部署配置

01. 在`Portainer`页面中，依次选择`Stacks`- `Add Stack`，填写`name`为`ssv`，内容如下：
```yaml
version: "3"

services:
  server:
    image: registry.dev.juetan.cn/server
    networks:
      - public
    deploy:
      placement:
        constraints:
          - node.role==manager
      labels:
        - traefik.enable=true
        - traefik.http.routers.app1.rule=Host(`web.dev.juetan.cn`) && PathPrefix(`/api/`)
        - traefik.http.routers.app1.entrypoints=websecure
        - traefik.http.routers.app1.tls.certresolver=acmeresolver
        - traefik.http.services.app1-service.loadbalancer.server.port=80
  web:
    image: registry.dev.juetan.cn/web
    networks:
      - public
    deploy:
      placement:
        constraints:
          - node.role==manager
      labels:
        - traefik.enable=true
        - traefik.http.routers.app2.rule=Host(`web.dev.juetan.cn`)
        - traefik.http.routers.app2.entrypoints=websecure
        - traefik.http.routers.app2.tls.certresolver=acmeresolver
        - traefik.http.services.app2-service.loadbalancer.server.port=80

networks:
  public:
    external: true
```

02. 点击`Deploy the stack`按钮，等待服务部署完成，访问如下连接即可：
```
http://web.dev.juetan.cn
```

## 结语

- 仓库地址：https://github.com/juetan/devops-practice