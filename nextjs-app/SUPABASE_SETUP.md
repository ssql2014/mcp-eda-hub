# Supabase Database Setup Instructions

Your database connection is configured! Now you need to create the tables.

## Option 1: Using Supabase SQL Editor (Recommended)

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/qoytiztonbhxfwujvanq

2. Click on **SQL Editor** in the left sidebar

3. Click **New query**

4. Copy and paste the entire contents of `prisma/init.sql` file

5. Click **Run** to execute the SQL

6. You should see "Success. No rows returned" message

## Option 2: Using Prisma (Alternative)

If the SQL editor method doesn't work, try running in your terminal:

```bash
cd nextjs-app
# Use the direct URL for migrations
DATABASE_URL="postgresql://postgres:Hexsyh-behpe3-jaqbuf@db.qoytiztonbhxfwujvanq.supabase.co:5432/postgres" npx prisma db push
```

## Verify Tables Were Created

1. In Supabase dashboard, go to **Table Editor**
2. You should see these tables:
   - User
   - Account
   - Session
   - VerificationToken

## Next Steps

Once the tables are created:

1. **Start Development Server:**
   ```bash
   cd nextjs-app
   npm run dev
   ```
   Visit http://localhost:3000

2. **View Database (optional):**
   ```bash
   npx prisma studio
   ```
   This opens a GUI to view your database at http://localhost:5555

## Deployment

For deployment to Vercel or other platforms, add these environment variables:

- `DATABASE_URL`: Your pooler connection string (already in .env)
- `NEXTAUTH_URL`: Your production URL (e.g., https://your-app.vercel.app)
- `NEXTAUTH_SECRET`: The secret we generated (already in .env)

## Connection Strings

- **For Application (with pooler):**
  ```
  postgresql://postgres.qoytiztonbhxfwujvanq:Hexsyh-behpe3-jaqbuf@aws-0-us-east-2.pooler.supabase.com:6543/postgres?pgbouncer=true
  ```

- **For Migrations (direct):**
  ```
  postgresql://postgres:Hexsyh-behpe3-jaqbuf@db.qoytiztonbhxfwujvanq.supabase.co:5432/postgres
  ```

## Troubleshooting

If you encounter issues:
1. Make sure your Supabase project is active (not paused)
2. Check that the password is correct
3. Try using the direct connection URL for migrations
4. Check Supabase dashboard for any connection limits