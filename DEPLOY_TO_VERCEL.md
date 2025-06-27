# 部署 MCP-EDA Hub 到 Vercel

## 快速部署步骤

### 1. 部署到 Vercel

1. 访问 [Vercel](https://vercel.com) 并使用 GitHub 账号登录
2. 点击 "Import Project"
3. 选择你的 GitHub 仓库：`ssql2014/mcp-eda-hub`
4. 配置项目：
   - **Framework Preset**: Next.js
   - **Root Directory**: `nextjs-app`
   - **Node.js Version**: 18.x

### 2. 配置环境变量

在 Vercel 项目设置中添加以下环境变量：

```
DATABASE_URL=postgresql://postgres.qoytiztonbhxfwujvanq:Hexsyh-behpe3-jaqbuf@aws-0-us-east-2.pooler.supabase.com:6543/postgres?pgbouncer=true
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=RDYwr/hcphNVAUc4VxUgJjxQ7u7yOUrQj6HppaqGbcI=
```

**注意**：将 `your-app-name` 替换为你的 Vercel 应用名称。

### 3. 部署应用

点击 "Deploy" 按钮，Vercel 会自动：
- 安装依赖
- 生成 Prisma Client
- 构建 Next.js 应用
- 部署到全球 CDN

### 4. 获取部署 URL

部署完成后，你会获得一个 URL，例如：
- `https://mcp-eda-hub.vercel.app`

### 5. 更新 NEXTAUTH_URL

1. 在 Vercel 项目设置中更新 `NEXTAUTH_URL` 为你的实际部署 URL
2. 重新部署应用

## 集成到主网站

### 选项 1：子域名（推荐）

1. 在你的域名管理面板添加 CNAME 记录：
   ```
   auth.mcp4eda.cn -> cname.vercel-dns.com
   ```

2. 在 Vercel 项目设置中添加自定义域名：`auth.mcp4eda.cn`

3. 在主网站添加链接：
   ```html
   <a href="https://auth.mcp4eda.cn/register">注册</a>
   <a href="https://auth.mcp4eda.cn/login">登录</a>
   ```

### 选项 2：使用 iframe

在主网站中嵌入登录/注册功能：

```html
<iframe 
  src="https://your-app-name.vercel.app/login" 
  width="100%" 
  height="600"
  frameborder="0">
</iframe>
```

### 选项 3：API 集成

使用 Next.js 应用作为后端 API：

```javascript
// 在静态网站中调用 API
fetch('https://your-app-name.vercel.app/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password, name })
})
```

## GitHub Actions 自动部署

### 1. 获取 Vercel Token

1. 访问 [Vercel Tokens](https://vercel.com/account/tokens)
2. 创建新 token
3. 复制 token

### 2. 获取项目 ID

在 Vercel 项目设置中找到：
- **Org ID**: 在账户设置中
- **Project ID**: 在项目设置中

### 3. 添加 GitHub Secrets

在 GitHub 仓库设置中添加：

```
VERCEL_TOKEN=你的_vercel_token
VERCEL_ORG_ID=你的_org_id
VERCEL_PROJECT_ID=你的_project_id
DATABASE_URL=你的数据库连接字符串
NEXTAUTH_URL=https://你的域名
NEXTAUTH_SECRET=你的密钥
```

## 测试部署

1. 访问 `https://your-app-name.vercel.app/register`
2. 注册新账号
3. 登录测试
4. 检查 Supabase 数据库确认数据已保存

## 故障排除

### 数据库连接错误
- 确保使用 pooler 连接字符串
- 添加 `?pgbouncer=true` 参数

### 认证错误
- 检查 `NEXTAUTH_URL` 是否正确
- 确保 `NEXTAUTH_SECRET` 设置正确

### 构建错误
- 检查 Node.js 版本是否为 18.x
- 确保所有依赖都在 package.json 中

## 完成！

现在你的认证系统已经部署在 Vercel 上，可以：
- 通过子域名访问：`auth.mcp4eda.cn`
- 或直接访问 Vercel URL
- 与主网站集成使用