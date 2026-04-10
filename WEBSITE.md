# china·陈 网站文档

## 1. 网站简介

这是一个个人作品展示与文章发布网站，当前站点名称为 `china·陈`。

网站的核心目标有两个：

- 对外展示个人风格、视觉审美和内容表达
- 提供一个可由管理员直接登录维护的文章发布后台

它不是传统的博客模板站，而是一个更偏视觉展示型的个人站。首页重点在交互体验和氛围，文章系统负责承载后续内容更新。

当前线上域名为：

- `https://aiwom.cc.cd`

## 2. 网站功能

### 2.1 前台功能

- 3D 立方体视觉首页
- 文章列表展示
- 鼠标悬停联动效果
- 文章详情弹窗
- 移动端与桌面端响应式展示
- HTTPS 访问

### 2.2 后台功能

- 管理员登录
- 发布文章
- 编辑文章
- 删除文章
- 上传头图
- 上传正文配图

### 2.3 内容结构

每篇文章目前支持以下字段：

- 标题
- 日期
- 引言
- 正文
- 金句引用
- 头图
- 正文插图

## 3. 技术栈

### 3.1 前端

- React 19
- Vite
- Tailwind CSS 4
- Motion

前端主要负责页面展示、交互动效、管理员操作界面和文章内容呈现。

### 3.2 后端

- Node.js
- Express
- JWT
- bcryptjs
- PostgreSQL

后端主要负责：

- 登录鉴权
- 文章增删改查
- 对接数据库
- 向前端提供 API
- 托管构建后的静态页面

### 3.3 部署与运维

- Ubuntu 服务器
- 1Panel
- OpenResty
- Cloudflare
- systemd

这套结构的职责分工如下：

- Cloudflare 负责 DNS、代理和 HTTPS 流量接入
- OpenResty 负责域名转发
- Node 服务负责网站页面和 API
- PostgreSQL 负责数据存储
- systemd 负责守护 Node 服务

## 4. 项目文件结构

### 4.1 前端核心文件

- [src/App.tsx](C:/Users/chenwankang/Desktop/新建文件夹%20(15)/corentin-bernadou-portfolio-clone/src/App.tsx)
  站点主要页面逻辑、文章展示、管理员操作弹窗都在这里

- [src/main.tsx](C:/Users/chenwankang/Desktop/新建文件夹%20(15)/corentin-bernadou-portfolio-clone/src/main.tsx)
  React 入口文件

- [src/index.css](C:/Users/chenwankang/Desktop/新建文件夹%20(15)/corentin-bernadou-portfolio-clone/src/index.css)
  全局样式与 Tailwind 主题设置

- [index.html](C:/Users/chenwankang/Desktop/新建文件夹%20(15)/corentin-bernadou-portfolio-clone/index.html)
  页面 HTML 模板与浏览器标签标题

### 4.2 后端核心文件

- [server/index.mjs](C:/Users/chenwankang/Desktop/新建文件夹%20(15)/corentin-bernadou-portfolio-clone/server/index.mjs)
  后端主服务文件，包含：
  - API 路由
  - 登录逻辑
  - JWT 校验
  - 文章 CRUD
  - PostgreSQL 连接
  - 静态文件托管

### 4.3 配置文件

- [package.json](C:/Users/chenwankang/Desktop/新建文件夹%20(15)/corentin-bernadou-portfolio-clone/package.json)
  项目依赖和脚本命令

- [.env.server.example](C:/Users/chenwankang/Desktop/新建文件夹%20(15)/corentin-bernadou-portfolio-clone/.env.server.example)
  服务端环境变量模板

- [vite.config.ts](C:/Users/chenwankang/Desktop/新建文件夹%20(15)/corentin-bernadou-portfolio-clone/vite.config.ts)
  Vite 构建配置

## 5. 前端说明

### 5.1 首页视觉

首页采用黑色背景、橙红强调色和 3D 立方体作为主要视觉核心。

页面中的文章标题与中间立方体之间有联动关系：

- 鼠标悬停文章时，对应图片区域会高亮
- 右侧文章列表会有位移、透明度和缩放变化
- 中间立方体会根据鼠标位置轻微旋转

整体设计目标是：

- 更偏作品站而不是传统博客
- 更强调氛围感和视觉记忆点
- 保持简洁但不单调

### 5.2 文章详情

点击右侧文章后，会打开详情弹窗。

详情弹窗中可展示：

- 标题
- 日期
- 头图
- 引言
- 正文
- 引用金句
- 正文配图

### 5.3 管理端交互

管理员登录后，页面右上角会出现后台操作入口。

可执行动作包括：

- 发布新文章
- 编辑当前文章
- 删除当前文章

## 6. 后端接口说明

### 6.1 健康检查

- `GET /api/health`

作用：

- 检查后端服务是否正常在线

### 6.2 登录接口

- `POST /api/auth/login`

作用：

- 管理员登录
- 登录成功后返回 JWT token 和用户信息

### 6.3 当前用户接口

- `GET /api/auth/me`

作用：

- 前端通过 token 获取当前登录用户信息

### 6.4 文章列表接口

- `GET /api/articles`

作用：

- 获取全部文章
- 按创建时间倒序返回

### 6.5 创建文章接口

- `POST /api/articles`

作用：

- 新建文章
- 需要管理员 token

### 6.6 编辑文章接口

- `PATCH /api/articles/:id`

作用：

- 修改指定文章
- 需要管理员 token

### 6.7 删除文章接口

- `DELETE /api/articles/:id`

作用：

- 删除指定文章
- 需要管理员 token

## 7. 数据库结构

当前数据库为 PostgreSQL。

数据库名：

- `portfolio_db`

主要数据表如下。

### 7.1 users 表

作用：

- 保存后台用户信息

主要字段：

- `id`
- `email`
- `password_hash`
- `role`
- `created_at`
- `updated_at`

### 7.2 articles 表

作用：

- 保存文章内容

主要字段：

- `id`
- `title`
- `date`
- `intro`
- `content`
- `quote`
- `cover_image`
- `content_images`
- `author_id`
- `created_at`
- `updated_at`

其中：

- `cover_image` 用于保存文章头图
- `content_images` 用于保存正文插图列表
- `author_id` 关联作者信息

## 8. 当前部署结构

当前线上运行链路如下：

1. 用户访问 `aiwom.cc.cd`
2. 请求先到 Cloudflare
3. Cloudflare 将请求转发到服务器
4. 服务器上的 OpenResty 根据域名匹配站点
5. OpenResty 将请求代理到本机 Node 服务 `127.0.0.1:8318`
6. Node 服务处理页面或 API 请求
7. 涉及文章数据时，Node 会访问 PostgreSQL

可以理解为：

- Cloudflare 是入口
- OpenResty 是反向代理层
- Node 是业务层
- PostgreSQL 是数据层

## 9. 当前服务器状态

### 9.1 Node 服务

Node 服务通过 `systemd` 管理，主要作用：

- 运行 Express 后端
- 返回 `/api/*` 接口
- 托管打包后的前端页面

### 9.2 OpenResty

OpenResty 由 1Panel 管理，目前负责：

- 接收 `80/443` 端口流量
- 根据域名匹配站点
- 把请求转发给 Node

### 9.3 Cloudflare

Cloudflare 当前负责：

- DNS 解析
- 代理访问
- HTTPS 接入

## 10. 已完成的改造

这个项目已经做过一次重要重构，从原来的 Firebase 直连模式改成了自建后端模式。

已经完成的内容包括：

- 前端不再依赖 Firebase 直接读写
- 改为请求自建 API
- 管理员登录改为 JWT 鉴权
- 数据改为存入 PostgreSQL
- 后端统一负责文章 CRUD
- 网站可直接部署在自己的服务器上

## 11. 当前已知注意事项

### 11.1 域名切换

之前使用过旧域名，当前已经切换到：

- `aiwom.cc.cd`

后续如果再切域名，需要同步修改以下位置：

- Cloudflare DNS
- 1Panel/OpenResty 站点域名
- 证书绑定

### 11.2 管理员安全

当前建议尽快处理以下安全项：

- 修改默认管理员密码
- 修改默认 JWT 密钥
- 如果源站证书私钥曾泄露，需要重新签发

### 11.3 图片存储

当前文章图片仍然直接跟随文章内容走接口，后续如果图片越来越多，建议改成：

- 对象存储
- MinIO
- R2

这样会更适合长期使用。

## 12. 常用维护动作

### 12.1 前端重新构建

```bash
cd /opt/portfolio-site
npm run build
```

### 12.2 重启 Node 服务

```bash
systemctl restart portfolio-site
```

### 12.3 查看 Node 服务状态

```bash
systemctl status portfolio-site
```

### 12.4 查看网站端口监听

```bash
ss -lntp | egrep ':80|:443|:8318'
```

### 12.5 重载 OpenResty

```bash
docker exec 1Panel-openresty-tfwN sh -lc "nginx -s reload"
```

### 12.6 测试 OpenResty 配置

```bash
docker exec 1Panel-openresty-tfwN sh -lc "nginx -t"
```

## 13. 后续建议

建议下一步逐步做这些优化：

- 修改管理员默认账号密码
- 清理旧域名配置
- 重新签发并绑定新的源站证书
- 给图片接入对象存储
- 增加文章草稿、分类、标签等内容管理能力
- 增加日志与错误监控

## 14. 总结

这个网站目前已经具备完整的独立运行能力：

- 有前端展示
- 有后台登录
- 有文章管理
- 有数据库
- 有服务器部署
- 有 Cloudflare 代理
- 有 HTTPS 访问能力

整体上，它已经不是单纯的前端页面，而是一个完整的、自托管的个人内容网站。
