const { PrismaClient } = require('@prisma/client');

async function checkUser() {
  const prisma = new PrismaClient();
  
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: 'test@example.com'
      }
    });
    
    if (user) {
      console.log('✅ 用户注册成功！');
      console.log('用户信息：');
      console.log(`  ID: ${user.id}`);
      console.log(`  姓名: ${user.name}`);
      console.log(`  邮箱: ${user.email}`);
      console.log(`  创建时间: ${user.createdAt}`);
    } else {
      console.log('❌ 未找到用户');
    }
    
    const userCount = await prisma.user.count();
    console.log(`\n📊 数据库中共有 ${userCount} 个用户`);
    
  } catch (error) {
    console.error('错误:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUser();