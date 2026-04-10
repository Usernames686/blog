# china·陈
https://aiwom.cc.cd
一个自托管的个人博客 / 作品展示站项目，前端使用 React + Vite，后端使用 Express + PostgreSQL，支持文章展示、后台登录和文章管理。

## 项目简介

这个项目最初是一个前端展示站，后续已经改造成前后端一体的博客系统：

- 前台用于展示首页内容和文章列表
- 后台支持管理员登录
- 支持文章新增、编辑、删除
- 支持封面图和内容配图
- 支持部署到自己的服务器并连接 PostgreSQL

当前代码库已经不再是最初的 AI Studio 示例模板，而是一个可以独立部署的博客项目。

## 功能特性

- 个人主页 / 视觉展示首页
- 文章列表加载
- 文章详情查看
- 管理员登录
- 文章发布
- 文章编辑
- 文章删除
- 封面图上传
- 内容图片上传
- 自建后端 API
- PostgreSQL 数据存储

## 技术栈

### 前端

- React 19
- Vite 6
- TypeScript
- Motion
- Lucide React

### 后端

- Express
- PostgreSQL
- pg
- JWT 鉴权
- bcryptjs
- cors

## 项目结构

```text
.
├─ server/                  # Node / Express 后端
├─ src/                     # React 前端源码
├─ index.html               # 前端入口
├─ package.json             # 项目脚本与依赖
├─ .env.example             # 前端环境变量示例
├─ .env.server.example      # 后端环境变量示例
├─ firestore.rules          # 历史 Firebase 规则文件（已非当前主链路）
└─ WEBSITE.md               # 项目补充说明文档
```

## 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 启动前端开发环境

```bash
npm run dev
```

默认会启动在：

```text
http://127.0.0.1:3000
```

### 3. 启动后端服务

```bash
npm run server:dev
```

或生产模式启动：

```bash
npm run server
```

默认后端端口：

```text
8318
```

## 构建项目

```bash
npm run build
```

构建完成后会生成前端 `dist` 目录，后端会直接托管该静态资源。

## 环境变量

### 前端环境变量

可参考：

```text
.env.example
```

前端当前最重要的是：

```env
VITE_API_BASE_URL=http://127.0.0.1:8318
```

### 后端环境变量

可参考：

```text
.env.server.example
```

示例：

```env
PORT=8318
DATABASE_URL=postgresql://your_user:your_password@127.0.0.1:5432/portfolio_db
JWT_SECRET=replace-with-very-long-random-secret
ADMIN_ACCOUNT=admin
ADMIN_EMAIL=admin@system.local
ADMIN_PASSWORD=123456
CORS_ORIGIN=*
VITE_API_BASE_URL=http://127.0.0.1:8318
```

## 后端接口

### 健康检查

```http
GET /api/health
```

### 登录

```http
POST /api/auth/login
```

请求示例：

```json
{
  "account": "admin",
  "password": "123456"
}
```

### 获取当前用户

```http
GET /api/auth/me
```

### 获取文章列表

```http
GET /api/articles
```

### 新增文章

```http
POST /api/articles
```

### 更新文章

```http
PATCH /api/articles/:id
```

### 删除文章

```http
DELETE /api/articles/:id
```

除公开读取接口外，其余接口需要携带：

```http
Authorization: Bearer <token>
```

## 数据库说明

当前项目后端基于 PostgreSQL，核心数据包括：

- `users`
  - 存管理员和用户账号
  - 保存邮箱、密码哈希、角色等信息
- `articles`
  - 保存文章标题、简介、正文、引用、封面图、内容图片、作者等信息

后端启动时会自动尝试初始化管理员账号。

## 默认管理员信息

如果未修改环境变量，默认会读取：

- 账号：`admin`
- 邮箱：`admin@system.local`
- 密码：`123456`

正式环境务必改掉。

## 部署说明

当前项目适合部署在自己的服务器上，典型方式如下：

1. 前端执行 `npm run build`
2. 后端执行 `npm run server`
3. 使用 Nginx / OpenResty 做反向代理
4. PostgreSQL 部署在本机或内网
5. 对外只开放 `80/443`

推荐生产结构：

- 前端构建产物：`dist/`
- Node 服务：`server/index.mjs`
- 数据库：PostgreSQL
- 反向代理：Nginx / OpenResty / 1Panel

## 安全建议

- 不要在生产环境使用默认管理员账号和密码
- 不要把数据库端口直接暴露到公网
- `JWT_SECRET` 必须改成高强度随机字符串
- `CORS_ORIGIN` 不建议长期使用 `*`
- 图片不建议长期以 base64 形式直接存数据库，可逐步迁移到对象存储

## 常用命令

```bash
npm run dev
npm run build
npm run server
npm run server:dev
npm run lint
```

## 当前状态说明

这个仓库已经从最初的示例项目，调整为适合个人博客场景的版本。当前主链路是：

- React 前端
- Express API
- PostgreSQL 存储
- 自建服务器部署

如果你后面还要继续整理项目文档，建议同时维护：

- `README.md`：给仓库访问者看
- `WEBSITE.md`：给自己做项目说明和运维记录

## License

 MIT
