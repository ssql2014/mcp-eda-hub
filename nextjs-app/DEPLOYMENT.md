# Deployment Guide for MCP-EDA Hub Next.js App

This guide will help you deploy the MCP-EDA Hub Next.js application with a production database.

## Prerequisites

- GitHub account
- Vercel account (for hosting) or any other Next.js compatible hosting
- Database provider account (Supabase, Neon, or similar)

## Step 1: Set Up Your Database

### Option A: Supabase (Recommended - Free Tier)

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project:
   - Project name: `mcp-eda-hub`
   - Database password: Create a strong password and save it
   - Region: Choose one close to your users
4. Get your connection string:
   - Go to Settings → Database
   - Copy the connection string from the URI section
   - It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxx.supabase.co:5432/postgres`

### Option B: Neon (Alternative - Free Tier)

1. Go to [https://neon.tech](https://neon.tech)
2. Sign up and create a project
3. Copy the connection string provided

### Option C: Railway (Alternative)

1. Go to [https://railway.app](https://railway.app)
2. Create a new PostgreSQL database
3. Copy the connection string

## Step 2: Set Up GitHub Secrets

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Add the following secrets:

   ```
   DATABASE_URL=your_database_connection_string
   NEXTAUTH_URL=https://your-domain.vercel.app (or your custom domain)
   NEXTAUTH_SECRET=generate_with_openssl_rand_-base64_32
   ```

   To generate NEXTAUTH_SECRET, run:
   ```bash
   openssl rand -base64 32
   ```

## Step 3: Deploy to Vercel

### Automatic Deployment

1. Go to [https://vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: `nextjs-app`
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Add environment variables:
   - `DATABASE_URL`: Your database connection string
   - `NEXTAUTH_URL`: `https://[your-project].vercel.app`
   - `NEXTAUTH_SECRET`: Your generated secret
5. Deploy!

### Vercel CLI Deployment

```bash
cd nextjs-app
npm i -g vercel
vercel --prod
```

## Step 4: Run Database Migrations

After setting up your database connection:

```bash
cd nextjs-app
# Make sure DATABASE_URL is in your .env file
npx prisma migrate deploy
```

## Step 5: Configure GitHub Actions (Optional)

If you want automatic deployments:

1. Get Vercel tokens:
   - Go to Vercel Dashboard → Settings → Tokens
   - Create a new token
2. Add to GitHub Secrets:
   - `VERCEL_TOKEN`: Your Vercel token
   - `VERCEL_ORG_ID`: Found in Vercel project settings
   - `VERCEL_PROJECT_ID`: Found in Vercel project settings

## Environment Variables Summary

### Local Development (.env)
```env
DATABASE_URL="your_local_or_dev_database_url"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="development_secret"
```

### Production (Vercel/GitHub Secrets)
```env
DATABASE_URL="your_production_database_url"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="secure_random_secret"
```

## Troubleshooting

### Database Connection Issues
- Ensure your database allows connections from your deployment platform
- For Supabase, check if connection pooling is needed for serverless
- Add `?pgbouncer=true` to your connection string if using Supabase with Vercel

### Build Failures
- Check that all dependencies are in `package.json`
- Ensure `prisma generate` runs during build
- Verify environment variables are set correctly

### Migration Issues
- Run `npx prisma migrate dev` locally first to test
- Use `npx prisma db push` for quick schema updates without migrations
- Check Prisma logs for detailed error messages

## Quick Start Commands

```bash
# Install dependencies
cd nextjs-app
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL

# Run migrations
npx prisma migrate dev

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

## Security Best Practices

1. Never commit `.env` files to version control
2. Use strong, unique passwords for your database
3. Rotate your `NEXTAUTH_SECRET` regularly
4. Enable SSL/TLS for database connections
5. Use environment-specific database credentials
6. Enable Row Level Security (RLS) in Supabase if using it

## Support

If you encounter issues:
1. Check the [Next.js deployment docs](https://nextjs.org/docs/deployment)
2. Review [Prisma deployment guides](https://www.prisma.io/docs/guides/deployment)
3. Consult your database provider's documentation
4. Open an issue in the GitHub repository