import{_ as s,o as n,c as a,S as l}from"./chunks/framework.doOmauVw.js";const d=JSON.parse('{"title":"搭建一套适用于个人的CICD构建流系统","description":"","frontmatter":{"title":"搭建一套适用于个人的CICD构建流系统","date":"2023-07-21T18:00:00.000Z"},"headers":[],"relativePath":"tools/cicd/index.md","filePath":"tools/cicd/index.md"}'),p={name:"tools/cicd/index.md"},e=l(`<p>在如今的容器服务中，使用Gitlab、K8S、Jenkins等技术部署服务是非常常见的，但这些需要的服务器内存和数量都不小。例如，部署一个Gitlab都需要至少4G内存，对于个人学习属实不太友好。</p><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>基于docker，实现面向个人的CICD集成，包括：</p><ul><li>基于 docker + swarm + traefik + portainer 的容器平台。</li><li>基于 mysql + gitea + droneci + docker registry的构建平台。</li></ul><p>要求：</p><ul><li>至少1台安装好 docker 的服务器/虚拟机。备注：最好2台，一台为主服务器，一台为子服务器。</li><li>至少1个域名。备注：域名解析到国内服务器需备案</li><li>具备docker基本操作知识</li></ul><p>实践项目</p><ul><li>前后端分离项目(VueJS + NestJS)</li></ul><p>准备工作</p><ul><li>将<code>*.dev.juetan.cn</code>解析到主服务器，用于基础设施的访问</li><li>将<code>*.app.juetan.cn</code>解析到主服务器，用于部署应用的访问</li><li>在主服务器上，新建<code>/docker</code>目录</li></ul><h2 id="准备工作" tabindex="-1">准备工作 <a class="header-anchor" href="#准备工作" aria-label="Permalink to &quot;准备工作&quot;">​</a></h2><p>在开始前，需要做很多准备</p><h3 id="创建集群" tabindex="-1">创建集群 <a class="header-anchor" href="#创建集群" aria-label="Permalink to &quot;创建集群&quot;">​</a></h3><p>Docker 的 Swarm 模式表示集群， 允许在一台主服务器上，管理多台子服务器的容器和状态。</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6A737D;"># 在主服务器上，初始化docker集群</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#032F62;"> swarm</span><span style="color:#032F62;"> init</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 在主服务器上，查看加入令牌。备注：只有1台服务器跳过该步骤</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#032F62;"> swarm</span><span style="color:#032F62;"> join-token</span><span style="color:#032F62;"> worker</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 在子服务器上，使用令牌加入集群。备注：只有1台服务器跳过该步骤</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#032F62;"> swarm</span><span style="color:#032F62;"> jorin</span><span style="color:#005CC5;"> --token</span><span style="color:#032F62;"> xx</span><span style="color:#032F62;"> ip:port</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="管理面板" tabindex="-1">管理面板 <a class="header-anchor" href="#管理面板" aria-label="Permalink to &quot;管理面板&quot;">​</a></h3><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;3&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  agent</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">portainer/agent:latest</span></span>
<span class="line"><span style="color:#22863A;">      volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">/var/run/docker.sock:/var/run/docker.sock</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">/var/lib/docker/volumes:/var/lib/docker/volumes</span></span>
<span class="line"><span style="color:#22863A;">      networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">network_portainer</span></span>
<span class="line"><span style="color:#22863A;">      deploy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        mode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">global</span></span>
<span class="line"><span style="color:#22863A;">        placement</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">          constraints</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">node.platform.os == linux</span><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">  server</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">portainer/portainer-ce:latest</span></span>
<span class="line"><span style="color:#22863A;">    command</span><span style="color:#24292E;">: </span><span style="color:#032F62;">-H tcp://tasks.agent:9001 --tlsskipverify</span></span>
<span class="line"><span style="color:#6A737D;">    # [1] 使用裸端口访问</span></span>
<span class="line"><span style="color:#22863A;">    ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;9443:9443&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;9000:9000&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;8000:8000&quot;</span></span>
<span class="line"><span style="color:#22863A;">    volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">valume_portainer:/data</span></span>
<span class="line"><span style="color:#22863A;">    networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">network_portainer</span></span>
<span class="line"><span style="color:#22863A;">    deploy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      mode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">replicated</span></span>
<span class="line"><span style="color:#22863A;">      replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#22863A;">      placement</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        constraints</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">node.role == manager</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#6A737D;">      # [2] 使用Traefik代理访问</span></span>
<span class="line"><span style="color:#22863A;">      labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#6A737D;">        # 是否开启</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.enable=true</span></span>
<span class="line"><span style="color:#6A737D;">        # 路由匹配</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.server.rule=Host(\`server.dev.juetan.cn\`)</span></span>
<span class="line"><span style="color:#6A737D;">        # 路由入口</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.server.entrypoints=web</span></span>
<span class="line"><span style="color:#6A737D;">        # 监听口</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.services.server-service.loadbalancer.server.port=9000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  network_portainer</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    driver</span><span style="color:#24292E;">: </span><span style="color:#032F62;">overlay</span></span>
<span class="line"><span style="color:#22863A;">    attachable</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  valume_portainer</span><span style="color:#24292E;">:</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br></div></div><h3 id="创建用户" tabindex="-1">创建用户 <a class="header-anchor" href="#创建用户" aria-label="Permalink to &quot;创建用户&quot;">​</a></h3><p>在主服务器上，创建1个将分配给<code>droneci</code>使用的用户，用于远程更新容器</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6A737D;"># 创建用户</span></span>
<span class="line"><span style="color:#6F42C1;">useradd</span><span style="color:#032F62;"> droneci</span><span style="color:#005CC5;"> -m</span><span style="color:#005CC5;"> -s</span><span style="color:#032F62;"> /bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建密码</span></span>
<span class="line"><span style="color:#6F42C1;">passwd</span><span style="color:#032F62;"> droneci</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 加入docker用户组</span></span>
<span class="line"><span style="color:#6F42C1;">usermod</span><span style="color:#005CC5;"> -a</span><span style="color:#005CC5;"> -G</span><span style="color:#032F62;"> docker</span><span style="color:#032F62;"> droneci</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 切换到该用户</span></span>
<span class="line"><span style="color:#6F42C1;">su</span><span style="color:#032F62;"> droneci</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 测试是否有docker的执行权限</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#032F62;"> service</span><span style="color:#032F62;"> ls</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 修改ssh的配置</span></span>
<span class="line"><span style="color:#6F42C1;">vim</span><span style="color:#032F62;"> /etc/ssh/sshd_config</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 允许使用密码登录</span></span>
<span class="line"><span style="color:#6F42C1;">PasswordAuthentication</span><span style="color:#032F62;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 重启ssh服务</span></span>
<span class="line"><span style="color:#6F42C1;">service</span><span style="color:#032F62;"> ssh</span><span style="color:#032F62;"> restart</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="核心服务" tabindex="-1">核心服务 <a class="header-anchor" href="#核心服务" aria-label="Permalink to &quot;核心服务&quot;">​</a></h2><h3 id="添加核心容器" tabindex="-1">添加核心容器 <a class="header-anchor" href="#添加核心容器" aria-label="Permalink to &quot;添加核心容器&quot;">​</a></h3><p>修改<code>/docker/core.toml</code>文件，添加内容如下</p><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;3&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  traefik</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">traefik:latest</span></span>
<span class="line"><span style="color:#22863A;">    command</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--api=true</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--api.dashboard=true</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--api.debug=true</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--providers.docker</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--providers.docker.swarmmode</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--providers.docker.exposedbydefault=false</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--providers.docker.network=public</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--entrypoints.web.address=:80</span></span>
<span class="line"><span style="color:#6A737D;">      # - --entrypoints.web.http.redirections.entrypoint.to=websecure</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--entrypoints.websecure.address=:443</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--certificatesresolvers.acmeresolver.acme.httpchallenge=true</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--certificatesresolvers.acmeresolver.acme.httpchallenge.entrypoint=web</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--certificatesresolvers.acmeresolver.acme.email=contact@juetan.cn</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--certificatesresolvers.acmeresolver.acme.storage=/letsencrypt/acme.json</span></span>
<span class="line"><span style="color:#22863A;">    networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">network_public</span></span>
<span class="line"><span style="color:#22863A;">    ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">80:80</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">443:443</span></span>
<span class="line"><span style="color:#22863A;">    volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">./letsencrypt:/letsencrypt</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/var/run/docker.sock:/var/run/docker.sock</span></span>
<span class="line"><span style="color:#22863A;">    deploy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      mode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">replicated</span></span>
<span class="line"><span style="color:#22863A;">      replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#22863A;">      placement</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        constraints</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">node.role == manager</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#22863A;">      labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.enable=true</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.dashboard.rule=Host(\`router.dev.juetan.cn\`)</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.dashboard.entrypoints=websecure</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.dashboard.tls.certresolver=acmeresolver</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.dashboard.service=api@internal</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.services.api@internal.loadbalancer.server.port=8080</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.dashboard.middlewares=traefik-auth</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">&quot;traefik.http.middlewares.traefik-auth.basicauth.users=admin:$$apr1$$8EVjn/nj$$GiLUZqcbueTFeD23SuB6x0&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">  agent</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">portainer/agent:latest</span></span>
<span class="line"><span style="color:#22863A;">    volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/var/run/docker.sock:/var/run/docker.sock</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/var/lib/docker/volumes:/var/lib/docker/volumes</span></span>
<span class="line"><span style="color:#22863A;">    networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">network_portainer</span></span>
<span class="line"><span style="color:#22863A;">    deploy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      mode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">global</span></span>
<span class="line"><span style="color:#22863A;">      placement</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        constraints</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">node.platform.os == linux</span><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">  server</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">portainer/portainer-ce:latest</span></span>
<span class="line"><span style="color:#22863A;">    command</span><span style="color:#24292E;">: </span><span style="color:#032F62;">-H tcp://tasks.agent:9001 --tlsskipverify</span></span>
<span class="line"><span style="color:#22863A;">    volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">valume_portainer:/data</span></span>
<span class="line"><span style="color:#22863A;">    networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">network_portainer</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">network_public</span></span>
<span class="line"><span style="color:#22863A;">    deploy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      mode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">replicated</span></span>
<span class="line"><span style="color:#22863A;">      replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#22863A;">      placement</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        constraints</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">node.role == manager</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#22863A;">      labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.enable=true</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.server.rule=Host(\`server.dev.juetan.cn\`)</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.server.entrypoints=websecure</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.server.tls.certresolver=acmeresolver</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.services.server-service.loadbalancer.server.port=9000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  network_portainer</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    driver</span><span style="color:#24292E;">: </span><span style="color:#032F62;">overlay</span></span>
<span class="line"><span style="color:#22863A;">  network_public</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    external</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  valume_portainer</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    external</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br></div></div><ol start="2"><li>运行以下命令启动</li></ol><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#032F62;"> stack</span><span style="color:#032F62;"> deploy</span><span style="color:#005CC5;"> -c</span><span style="color:#032F62;"> /docker/core.yml</span><span style="color:#032F62;"> core</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="开发服务" tabindex="-1">开发服务 <a class="header-anchor" href="#开发服务" aria-label="Permalink to &quot;开发服务&quot;">​</a></h2><h3 id="创建开发流所需的容器" tabindex="-1">创建开发流所需的容器 <a class="header-anchor" href="#创建开发流所需的容器" aria-label="Permalink to &quot;创建开发流所需的容器&quot;">​</a></h3><ol><li>在<code>Portainer</code>页面中，依次选择<code>Stacks</code>- <code>Add Stack</code>，填写<code>name</code>为<code>base</code>，内容如下：</li></ol><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;3&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  mysql</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mysql:5.7</span></span>
<span class="line"><span style="color:#22863A;">    command</span><span style="color:#24292E;">: </span><span style="color:#032F62;">--default-authentication-plugin=mysql_native_password --character-set-server=utf8mb4 --collation-server=utf8mb4_bin --default-storage-engine=INNODB --max_allowed_packet=256M --innodb_log_file_size=2GB --transaction-isolation=READ-COMMITTED --binlog_format=row</span></span>
<span class="line"><span style="color:#22863A;">    networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">public</span></span>
<span class="line"><span style="color:#22863A;">    ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">13306:3306</span></span>
<span class="line"><span style="color:#22863A;">    volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">volume_mysql:/var/lib/mysql</span></span>
<span class="line"><span style="color:#22863A;">    environment</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      MYSQL_ROOT_PASSWORD</span><span style="color:#24292E;">: </span><span style="color:#032F62;">root</span></span>
<span class="line"><span style="color:#22863A;">    security_opt</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">seccomp:unconfined</span></span>
<span class="line"><span style="color:#22863A;">    deploy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      placement</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        constraints</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          - </span><span style="color:#032F62;">node.role==manager</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">  gitea</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">gitea/gitea:latest</span></span>
<span class="line"><span style="color:#22863A;">    volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">volume_gitea:/data</span></span>
<span class="line"><span style="color:#22863A;">    networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">public</span></span>
<span class="line"><span style="color:#22863A;">    environment</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">APP_NAME=代码仓库</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">RUN_MODE=prod</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DOMAIN=git.dev.juetan.cn</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">ROOT_URL=https://git.dev.juetan.cn</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DISABLE_SSH=true</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">ENABLE_GZIP=true</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">SSH_PORT=2222</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DISABLE_REGISTRATION=true</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">REQUIRE_SIGNIN_VIEW=true</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">USER_UID=1000</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">USER_GID=1000</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DB_TYPE=mysql</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DB_HOST=mysql:3306</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DB_NAME=gitea</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DB_USER=root</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DB_PASSWD=root</span></span>
<span class="line"><span style="color:#22863A;">    deploy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      placement</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        constraints</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          - </span><span style="color:#032F62;">node.role==manager</span></span>
<span class="line"><span style="color:#22863A;">      labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.enable=true</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.gitea.rule=Host(\`git.dev.juetan.cn\`)</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.gitea.entrypoints=websecure</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.gitea.tls.certresolver=acmeresolver</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.services.gitea-service.loadbalancer.server.port=3000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">  registry</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">registry:2</span></span>
<span class="line"><span style="color:#22863A;">    networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">public</span></span>
<span class="line"><span style="color:#22863A;">    volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">volume_registry:/var/lib/registry</span></span>
<span class="line"><span style="color:#22863A;">    deploy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      mode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">replicated</span></span>
<span class="line"><span style="color:#22863A;">      replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#22863A;">      placement</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        constraints</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          - </span><span style="color:#032F62;">node.role==manager</span></span>
<span class="line"><span style="color:#22863A;">      labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.enable=true</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.registry.rule=Host(\`registry.dev.juetan.cn\`)</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.registry.entrypoints=websecure</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.registry.tls.certresolver=acmeresolver</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.services.registry-service.loadbalancer.server.port=5000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">  drone-server</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">drone/drone:latest</span></span>
<span class="line"><span style="color:#22863A;">    environment</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DRONE_TLS_AUTOCERT=false</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DRONE_AGENTS_ENABLED=true</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DRONE_GITEA_SERVER=https://git.dev.juetan.cn</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DRONE_GITEA_CLIENT_ID=214e79d8-08bd-4b55-8111-b9fc3ecb564e</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DRONE_GITEA_CLIENT_SECRET=UCZStx5EULnkzWd26NfK7pJB0NE48zD8Zvo7LTBSHoTA</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DRONE_RPC_SECRET=1eade7915d5f817ee1a64eeba165c502</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DRONE_SERVER_HOST=ci.dev.juetan.cn</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DRONE_SERVER_PROTO=https</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DRONE_GIT_ALWAYS_AUTH=false</span></span>
<span class="line"><span style="color:#22863A;">    networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">public</span></span>
<span class="line"><span style="color:#22863A;">    volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">volume_drone:/data</span></span>
<span class="line"><span style="color:#22863A;">    deploy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      mode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">replicated</span></span>
<span class="line"><span style="color:#22863A;">      replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#22863A;">      placement</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        constraints</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          - </span><span style="color:#032F62;">node.role==manager</span></span>
<span class="line"><span style="color:#22863A;">      labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.enable=true</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.drone.rule=Host(\`ci.dev.juetan.cn\`)</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.drone.entrypoints=websecure</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.drone.tls.certresolver=acmeresolver</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.services.drone-service.loadbalancer.server.port=80</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">  drone-runner</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">drone/drone-runner-docker:latest</span></span>
<span class="line"><span style="color:#22863A;">    environment</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DRONE_RPC_PROTO=https</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DRONE_RPC_HOST=ci.dev.juetan.cn</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DRONE_RPC_SECRET=1eade7915d5f817ee1a64eeba165c502</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DRONE_RUNNER_CAPACITY=2</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DRONE_RUNNER_NAME=AGENT-CCTOMATO-001</span></span>
<span class="line"><span style="color:#22863A;">    networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">public</span></span>
<span class="line"><span style="color:#22863A;">    volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/var/run/docker.sock:/var/run/docker.sock</span></span>
<span class="line"><span style="color:#22863A;">    deploy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      placement</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        constraints</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          - </span><span style="color:#032F62;">node.role==manager</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  public</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    external</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  volume_mysql</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    external</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#22863A;">  volume_gitea</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    external</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#22863A;">  volume_registry</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    external</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#22863A;">  volume_drone</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    external</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br></div></div><ol start="2"><li>点击<code>Deploy the stack</code>，等待服务部署完成。</li></ol><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-light vp-code"><code><span class="line"><span>可能会比较慢</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="3"><li>使用<code>DBeaver</code>或其他数据库管理软件连接<code>Mysql</code>，创建数据库<code>gitea</code>。</li></ol><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-light vp-code"><code><span class="line"><span>https://dbeaver.io/</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="4"><li>访问<code>https://git.dev.juetan.cn</code>完成创建，点击<code>设置-应用</code>创建应用如下：</li></ol><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-light vp-code"><code><span class="line"><span>应用名称：DroneCI(可任意名称)</span></span>
<span class="line"><span>重定向地址：https://ci.dev.juetan.cn/login</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="5"><li>复制客户端ID和客户端密钥，更新core.yml文件，然后重启服务</li></ol><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6A737D;"># core.yml</span></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  drone-server</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">drone/drone:latest</span></span>
<span class="line"><span style="color:#22863A;">    environment</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DRONE_GITEA_CLIENT_ID=此处填写间客户端ID</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DRONE_GITEA_CLIENT_SECRET=此处填写客户端密钥</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="项目实践" tabindex="-1">项目实践 <a class="header-anchor" href="#项目实践" aria-label="Permalink to &quot;项目实践&quot;">​</a></h2><p>接下来是项目实践，部署一个前后端分离，前端为VueJS，后端为NestJS的项目。</p><h3 id="前端配置" tabindex="-1">前端配置 <a class="header-anchor" href="#前端配置" aria-label="Permalink to &quot;前端配置&quot;">​</a></h3><ol><li>在根目录下新建<code>.drone.yml</code>文件，添加如下内容：</li></ol><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">pipeline</span></span>
<span class="line"><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">default</span></span>
<span class="line"><span style="color:#22863A;">steps</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">build</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">node:14.16.1</span></span>
<span class="line"><span style="color:#22863A;">    commands</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">npm install --registry=https://registry.npm.taobao.org</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">npm run build</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">docker</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">plugins/docker</span></span>
<span class="line"><span style="color:#22863A;">    settings</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      repo</span><span style="color:#24292E;">: </span><span style="color:#032F62;">registry.dev.juetan.cn/web</span></span>
<span class="line"><span style="color:#22863A;">      registry</span><span style="color:#24292E;">: </span><span style="color:#032F62;">registry.dev.juetan.cn</span></span>
<span class="line"><span style="color:#22863A;">      insecure</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#22863A;">      force_tag</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#22863A;">      tags</span><span style="color:#24292E;">: </span><span style="color:#032F62;">latest</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">deploy</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">appleboy/drone-ssh</span></span>
<span class="line"><span style="color:#22863A;">    settings</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      host</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        from_secret</span><span style="color:#24292E;">: </span><span style="color:#032F62;">DEPLOY_HOST</span></span>
<span class="line"><span style="color:#22863A;">      username</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        from_secret</span><span style="color:#24292E;">: </span><span style="color:#032F62;">DEPLOY_USER</span></span>
<span class="line"><span style="color:#22863A;">      password</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        from_secret</span><span style="color:#24292E;">: </span><span style="color:#032F62;">DEPLOY_PASSWORD</span></span>
<span class="line"><span style="color:#22863A;">      port</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        from_secret</span><span style="color:#24292E;">: </span><span style="color:#032F62;">DEPLOY_PORT</span></span>
<span class="line"><span style="color:#22863A;">      script</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">docker service update --image registry.dev.juetan.cn/web:latest app1_web</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><ol start="2"><li>在根目录下新建<code>Dockerfile</code>文件，添加如下内容：</li></ol><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">FROM</span><span style="color:#032F62;"> nginx</span></span>
<span class="line"><span style="color:#6F42C1;">COPY</span><span style="color:#032F62;"> ./dist</span><span style="color:#032F62;"> /usr/share/nginx/html</span></span>
<span class="line"><span style="color:#6F42C1;">ENTRYPOINT</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&quot;nginx&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;-g&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;daemon off;&quot;</span><span style="color:#24292E;">]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="后端配置" tabindex="-1">后端配置 <a class="header-anchor" href="#后端配置" aria-label="Permalink to &quot;后端配置&quot;">​</a></h3><ol><li>在根目录下新建<code>.drone.yml</code>文件，添加如下内容：</li></ol><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">pipeline</span></span>
<span class="line"><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">default</span></span>
<span class="line"><span style="color:#22863A;">steps</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">build</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">node:latest</span></span>
<span class="line"><span style="color:#22863A;">    commands</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">npm install --registry=https://registry.npm.taobao.org</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">npm run build</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">docker</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">plugins/docker</span></span>
<span class="line"><span style="color:#22863A;">    settings</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      repo</span><span style="color:#24292E;">: </span><span style="color:#032F62;">registry.dev.juetan.cn/server</span></span>
<span class="line"><span style="color:#22863A;">      registry</span><span style="color:#24292E;">: </span><span style="color:#032F62;">registry.dev.juetan.cn</span></span>
<span class="line"><span style="color:#22863A;">      insecure</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#22863A;">      force_tag</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#22863A;">      tags</span><span style="color:#24292E;">: </span><span style="color:#032F62;">latest</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">deploy</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">appleboy/drone-ssh</span></span>
<span class="line"><span style="color:#22863A;">    settings</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      host</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        from_secret</span><span style="color:#24292E;">: </span><span style="color:#032F62;">DEPLOY_HOST</span></span>
<span class="line"><span style="color:#22863A;">      username</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        from_secret</span><span style="color:#24292E;">: </span><span style="color:#032F62;">DEPLOY_USER</span></span>
<span class="line"><span style="color:#22863A;">      password</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        from_secret</span><span style="color:#24292E;">: </span><span style="color:#032F62;">DEPLOY_PASSWORD</span></span>
<span class="line"><span style="color:#22863A;">      port</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        from_secret</span><span style="color:#24292E;">: </span><span style="color:#032F62;">DEPLOY_PORT</span></span>
<span class="line"><span style="color:#22863A;">      script</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">docker service update --image registry.dev.juetan.cn/server:latest app1_server</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><ol start="2"><li>在根目录下新建<code>Dockerfile</code>文件，添加如下内容：</li></ol><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">FROM</span><span style="color:#032F62;"> node:latest</span></span>
<span class="line"><span style="color:#6F42C1;">COPY</span><span style="color:#032F62;"> .</span><span style="color:#032F62;"> .</span></span>
<span class="line"><span style="color:#6F42C1;">ENTRYPOINT</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&quot;npm&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;run&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;start&quot;</span><span style="color:#24292E;">]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="部署配置" tabindex="-1">部署配置 <a class="header-anchor" href="#部署配置" aria-label="Permalink to &quot;部署配置&quot;">​</a></h3><ol><li>在<code>Portainer</code>页面中，依次选择<code>Stacks</code>- <code>Add Stack</code>，填写<code>name</code>为<code>ssv</code>，内容如下：</li></ol><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;3&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  server</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">registry.dev.juetan.cn/server</span></span>
<span class="line"><span style="color:#22863A;">    networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">public</span></span>
<span class="line"><span style="color:#22863A;">    deploy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      placement</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        constraints</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          - </span><span style="color:#032F62;">node.role==manager</span></span>
<span class="line"><span style="color:#22863A;">      labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.enable=true</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.app1.rule=Host(\`web.dev.juetan.cn\`) &amp;&amp; PathPrefix(\`/api/\`)</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.app1.entrypoints=websecure</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.app1.tls.certresolver=acmeresolver</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.services.app1-service.loadbalancer.server.port=80</span></span>
<span class="line"><span style="color:#22863A;">  web</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">registry.dev.juetan.cn/web</span></span>
<span class="line"><span style="color:#22863A;">    networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">public</span></span>
<span class="line"><span style="color:#22863A;">    deploy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      placement</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        constraints</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          - </span><span style="color:#032F62;">node.role==manager</span></span>
<span class="line"><span style="color:#22863A;">      labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.enable=true</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.app2.rule=Host(\`web.dev.juetan.cn\`)</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.app2.entrypoints=websecure</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.app2.tls.certresolver=acmeresolver</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.services.app2-service.loadbalancer.server.port=80</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  public</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    external</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><ol start="2"><li>点击<code>Deploy the stack</code>按钮，等待服务部署完成，访问如下连接即可：</li></ol><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-light vp-code"><code><span class="line"><span>http://web.dev.juetan.cn</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h2><ul><li>仓库地址：<a href="https://github.com/juetan/devops-practice" target="_blank" rel="noreferrer">https://github.com/juetan/devops-practice</a></li></ul>`,57),r=[e];function o(c,t,i,b,y,u){return n(),a("div",null,r)}const E=s(p,[["render",o]]);export{d as __pageData,E as default};
