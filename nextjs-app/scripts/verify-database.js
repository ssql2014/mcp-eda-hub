const { Client } = require('pg');
require('dotenv').config();

async function verifyDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ 成功连接到 Supabase 数据库\n');
    
    // 检查所有表
    const tables = ['User', 'Account', 'Session', 'VerificationToken'];
    
    console.log('📊 检查数据库表：');
    for (const table of tables) {
      const result = await client.query(
        `SELECT COUNT(*) FROM information_schema.tables 
         WHERE table_schema = 'public' 
         AND table_name = $1`,
        [table]
      );
      
      if (result.rows[0].count > 0) {
        console.log(`✅ 表 "${table}" 存在`);
        
        // 获取列信息
        const columns = await client.query(
          `SELECT column_name, data_type 
           FROM information_schema.columns 
           WHERE table_name = $1 
           ORDER BY ordinal_position`,
          [table]
        );
        
        console.log(`   列: ${columns.rows.map(r => r.column_name).join(', ')}`);
      } else {
        console.log(`❌ 表 "${table}" 不存在`);
      }
    }
    
    console.log('\n🎉 数据库设置验证完成！');
    console.log('\n下一步：');
    console.log('1. 运行 `npm run dev` 启动开发服务器');
    console.log('2. 访问 http://localhost:3000');
    console.log('3. 注册一个新用户账号进行测试');
    
  } catch (error) {
    console.error('❌ 验证失败:', error.message);
  } finally {
    await client.end();
  }
}

verifyDatabase();