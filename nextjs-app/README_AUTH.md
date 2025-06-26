# MCP EDA Hub with Authentication

This is the Next.js version of MCP EDA Hub with user authentication.

## Features

- User registration and login
- Session management with NextAuth.js
- PostgreSQL database with Prisma ORM
- Full content visible without login
- Modern UI with Tailwind CSS

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Database Setup**:
   
   Option A: Use Prisma's local development database (easiest):
   ```bash
   npx prisma migrate dev --name init
   ```
   
   Option B: Use your own PostgreSQL:
   - Update the DATABASE_URL in `.env` file
   - Run migrations: `npx prisma migrate dev`

3. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   - Open http://localhost:3000
   - Register a new account at http://localhost:3000/register
   - Login at http://localhost:3000/login

## Environment Variables

Update the `.env` file with your settings:

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Your application URL
- `NEXTAUTH_SECRET`: Secret key for NextAuth (generate a secure one for production)

## Project Structure

- `/src/app` - Next.js App Router pages
- `/src/components` - React components
- `/src/lib` - Utilities and configurations
- `/prisma` - Database schema and migrations

## Authentication Flow

1. Users can browse the site without logging in
2. Registration creates a new user account
3. Login authenticates users with email/password
4. Session is maintained across page refreshes
5. Users can logout from the header menu