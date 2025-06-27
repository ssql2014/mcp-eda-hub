const { execSync } = require('child_process');
const path = require('path');

async function initDatabase() {
  console.log('🚀 Initializing Supabase database...\n');
  
  try {
    // Generate Prisma Client
    console.log('📦 Generating Prisma Client...');
    execSync('npx prisma generate', { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    
    console.log('\n📊 Pushing schema to database...');
    execSync('npx prisma db push --accept-data-loss', { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    
    console.log('\n✅ Database initialized successfully!');
    console.log('\n📝 Tables created:');
    console.log('   - User (for authentication)');
    console.log('   - Account (for OAuth providers)');
    console.log('   - Session (for user sessions)');
    console.log('   - VerificationToken (for email verification)');
    
    console.log('\n🎉 Your database is ready to use!');
    console.log('\nYou can now:');
    console.log('   1. Run `npm run dev` to start the development server');
    console.log('   2. Run `npx prisma studio` to view your database');
    
  } catch (error) {
    console.error('\n❌ Database initialization failed:', error.message);
    console.log('\nTroubleshooting tips:');
    console.log('1. Check your database password is correct');
    console.log('2. Ensure your Supabase project is active');
    console.log('3. Try running `npx prisma db push` manually');
  }
}

initDatabase();