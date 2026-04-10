# china·陈 网站说明

## 1. 网站定位

这是一个个人博客与作品展示站，当前已经从单纯的前端展示页，演变为一个可自托管的完整网站项目。

它的核心目标有两部分：

- 对外展示个人风格、视觉审美和内容表达
- 提供一个可由管理员直接登录维护的文章发布后台

和传统模板博客不同，这个项目更强调首页视觉效果、交互氛围和内容承载的统一。

## 2. 当前站点信息

当前线上主域名：

- `https://aiwom.cc.cd`

站点当前采用自建服务部署，不再依赖 Firebase 直连作为主业务链路。

## 3. 功能概览

### 3.1 前台功能

- 首页视觉展示
- 文章列表展示
- 文章详情查看
- 鼠标交互联动效果
- 响应式适配
- HTTPS 访问

### 3.2 后台功能

- 管理员登录
- 发布文章
- 编辑文章
- 删除文章
- 上传封面图
- 上传正文配图

### 3.3 文章字段

当前文章支持以下内容字段：

- 标题
- 日期
- 简介
- 正文
- 引用语
- 封面图
- 正文配图列表

## 4. 技术架构

### 4.1 前端

- React 19
- Vite 6
- TypeScript
- Motion
- Lucide React

前端负责：

- 页面展示
- 动效交互
- 管理员操作界面
- 调用后端 API

### 4.2 后端

- Node.js
- Express
- PostgreSQL
- JWT
- bcryptjs
- cors

后端负责：

- 登录鉴权
- 文章 CRUD
- 数据库连接
- 提供 API
- 托管构建后的前端页面

### 4.3 部署层

- Ubuntu 服务器
- 1Panel
- OpenResty
- Cloudflare
- systemd

分工如下：

- Cloudflare：域名解析、代理、HTTPS 接入
- OpenResty：域名转发与反向代理
- Node 服务：业务接口与静态页面
- PostgreSQL：文章与用户数据存储
- systemd：守护 Node 服务

## 5. 项目文件结构

### 5.1 前端核心文件

- `src/App.tsx`
  站点主页面、文章展示、管理员交互和请求逻辑的核心文件。

- `index.html`
  页面 HTML 模板与浏览器标题入口。

### 5.2 后端核心文件

- `server/index.mjs`
  后端主服务文件，包含登录、鉴权、文章接口、数据库连接和静态资源托管。

### 5.3 配置文件

- `package.json`
  项目依赖与脚本命令。

- `.env.server.example`
  后端环境变量示例。

- `vite.config.ts`
  Vite 构建配置。

## 6. 前端说明

### 6.1 首页设计

首页并不是传统博客的列表页优先结构，而是更偏作品站风格：

- 更强调视觉氛围
- 更强调交互记忆点
- 更强调文章与展示的结合

### 6.2 文章详情

点击文章后，当前页面支持展示：

- 标题
- 日期
- 封面图
- 简介
- 正文
- 引用语
- 正文配图

### 6.3 管理员操作

管理员登录后，可进行：

- 发布新文章
- 编辑已有文章
- 删除文章

## 7. 后端接口说明

### 7.1 健康检查

- `GET /api/health`

### 7.2 登录接口

- `POST /api/auth/login`

### 7.3 当前用户接口

- `GET /api/auth/me`

### 7.4 文章列表接口

- `GET /api/articles`

### 7.5 创建文章接口

- `POST /api/articles`

### 7.6 编辑文章接口

- `PATCH /api/articles/:id`

### 7.7 删除文章接口

- `DELETE /api/articles/:id`

## 8. 数据库结构

当前数据库为 PostgreSQL，数据库名为 `portfolio_db`。

### 8.1 users

用于保存后台用户信息，主要字段：

- `id`
- `email`
- `password_hash`
- `role`
- `created_at`
- `updated_at`

### 8.2 articles

用于保存文章内容，主要字段：

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

## 9. 当前部署结构

当前线上请求链路如下：

1. 用户访问 `aiwom.cc.cd`
2. 请求先到 Cloudflare
3. Cloudflare 将请求转发到服务器
4. OpenResty 根据域名匹配站点
5. OpenResty 将请求代理到本机 Node 服务 `127.0.0.1:8318`
6. Node 服务处理页面或 API 请求
7. Node 访问 PostgreSQL 获取文章数据

## 10. 已完成的改造

这个项目已经完成过一轮从示例站点到自建博客系统的重构，主要变化包括：

- 前端不再依赖 Firebase 直连
- 改为请求自建 API
- 管理员登录改为 JWT 鉴权
- 数据改为写入 PostgreSQL
- 后端统一负责文章 CRUD
- 网站已可直接部署到自己的服务器

## 11. 当前注意事项

### 11.1 默认账号安全

正式环境建议尽快处理：

- 修改默认管理员密码
- 修改默认 JWT 密钥
- 收紧 CORS 配置

### 11.2 图片存储方式

当前图片仍以较简单的方式跟文章内容一起传输。如果后续图片量继续增大，建议逐步迁移到：

- 对象存储
- MinIO
- R2

### 11.3 历史 Firebase 文件

仓库内仍保留部分 Firebase 相关配置文件，主要是历史遗留。当前线上主链路已经不是 Firebase 直连模式。

## 12. 常用维护动作

```bash
npm run build
npm run dev
npm run server
npm run server:dev
npm run lint
```

## 13. 后续建议

- 修改默认管理员账号和密码
- 清理不再使用的旧配置
- 优化图片存储方案
- 增加文章草稿、分类、标签等内容管理能力
- 增加日志与错误监控
- 统一项目文档编码，避免再次出现乱码

## 14. 总结

这个网站现在已经具备完整的独立运行能力：

- 有前端展示
- 有后台登录
- 有文章管理
- 有数据库
- 有服务器部署
- 有 Cloudflare 代理
- 有 HTTPS 访问能力

它已经不是单纯的前端页面，而是一个完整的、自托管的个人内容网站。