const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    console.log('Testing database connection...');
    await prisma.$connect();
    console.log('✅ Successfully connected to database!');
    
    // Try to create tables
    console.log('\nCreating database tables...');
    const result = await prisma.$executeRaw`SELECT 1`;
    console.log('✅ Database is accessible!');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();