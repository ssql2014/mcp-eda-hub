#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve));

async function setupDatabase() {
  console.log('🚀 MCP-EDA Hub Database Setup\n');
  
  // Check if .env exists
  const envPath = path.join(__dirname, '..', '.env');
  const envExamplePath = path.join(__dirname, '..', '.env.example');
  
  if (!fs.existsSync(envPath)) {
    console.log('Creating .env file from .env.example...');
    fs.copyFileSync(envExamplePath, envPath);
  }
  
  console.log('\n📝 Please choose your database provider:\n');
  console.log('1. Supabase (Recommended - Free tier available)');
  console.log('2. Neon (Free tier available)');
  console.log('3. Local PostgreSQL');
  console.log('4. Other PostgreSQL provider\n');
  
  const choice = await question('Enter your choice (1-4): ');
  
  let databaseUrl = '';
  
  switch(choice) {
    case '1':
      console.log('\n🔗 Supabase Setup:');
      console.log('1. Go to https://supabase.com and create an account');
      console.log('2. Create a new project');
      console.log('3. Go to Settings → Database');
      console.log('4. Copy the connection string (URI)\n');
      databaseUrl = await question('Paste your Supabase connection string: ');
      break;
      
    case '2':
      console.log('\n🔗 Neon Setup:');
      console.log('1. Go to https://neon.tech and create an account');
      console.log('2. Create a new project');
      console.log('3. Copy the connection string\n');
      databaseUrl = await question('Paste your Neon connection string: ');
      break;
      
    case '3':
      console.log('\n🔗 Local PostgreSQL Setup:');
      const user = await question('PostgreSQL username (default: postgres): ') || 'postgres';
      const password = await question('PostgreSQL password: ');
      const host = await question('PostgreSQL host (default: localhost): ') || 'localhost';
      const port = await question('PostgreSQL port (default: 5432): ') || '5432';
      const database = await question('Database name (default: mcp_eda_hub): ') || 'mcp_eda_hub';
      databaseUrl = `postgresql://${user}:${password}@${host}:${port}/${database}?schema=public`;
      break;
      
    case '4':
      databaseUrl = await question('Enter your PostgreSQL connection string: ');
      break;
      
    default:
      console.log('Invalid choice. Exiting...');
      process.exit(1);
  }
  
  // Update .env file
  console.log('\n📝 Updating .env file...');
  let envContent = fs.readFileSync(envPath, 'utf8');
  envContent = envContent.replace(/DATABASE_URL=.*/, `DATABASE_URL="${databaseUrl}"`);
  
  // Generate NextAuth secret if not present
  if (!envContent.includes('NEXTAUTH_SECRET=') || envContent.includes('your-secret-key-here')) {
    console.log('🔐 Generating NEXTAUTH_SECRET...');
    const secret = require('crypto').randomBytes(32).toString('base64');
    envContent = envContent.replace(/NEXTAUTH_SECRET=.*/, `NEXTAUTH_SECRET="${secret}"`);
  }
  
  fs.writeFileSync(envPath, envContent);
  
  console.log('\n🔧 Running database migrations...');
  try {
    execSync('npx prisma migrate dev --name init', { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    console.log('✅ Database setup complete!');
  } catch (error) {
    console.log('\n⚠️  Migration failed. Trying alternative approach...');
    try {
      execSync('npx prisma db push', { 
        stdio: 'inherit',
        cwd: path.join(__dirname, '..')
      });
      console.log('✅ Database schema pushed successfully!');
    } catch (pushError) {
      console.error('❌ Database setup failed:', pushError.message);
      console.log('\nPlease check your connection string and try again.');
    }
  }
  
  console.log('\n🎉 Setup complete! You can now run:');
  console.log('   npm run dev');
  console.log('\nTo start the development server.');
  
  rl.close();
}

setupDatabase().catch(console.error);