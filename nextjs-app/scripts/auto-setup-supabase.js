#!/usr/bin/env node

const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 你的 Supabase 项目信息
const SUPABASE_URL = 'https://qoytiztonbhxfwujvanq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFveXRpenRvbmJoeGZ3dWp2YW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMzQ1OTIsImV4cCI6MjA2NjYxMDU5Mn0.ky-tEIlrgVpQIIrv3ZZiSXBwLucy3p772yHSNjXXTf8';

async function setupSupabaseDatabase() {
  console.log('🚀 自动设置 Supabase 数据库...\n');

  try {
    // 1. 首先尝试使用 Prisma 直接创建表
    console.log('📊 使用 Prisma 创建数据库表...');
    
    // 读取 SQL 文件
    const sqlPath = path.join(__dirname, '..', 'prisma', 'init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // 使用 psql 命令直接执行 SQL（如果可用）
    const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres.qoytiztonbhxfwujvanq:Hexsyh-behpe3-jaqbuf@aws-0-us-east-2.pooler.supabase.com:6543/postgres';
    
    // 创建一个临时脚本来执行 SQL
    const tempScript = `
const { Client } = require('pg');

async function createTables() {
  const client = new Client({
    connectionString: '${databaseUrl}',
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ 已连接到数据库');
    
    // 执行 SQL
    const sql = \`${sql}\`;
    
    // 分割 SQL 语句并逐个执行
    const statements = sql.split(';').filter(s => s.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await client.query(statement);
          console.log('✓ 执行成功:', statement.trim().split('\\n')[0] + '...');
        } catch (err) {
          if (err.code === '42P07') { // 表已存在
            console.log('⚠️  表已存在，跳过:', statement.trim().split('\\n')[0] + '...');
          } else if (err.code === '42710') { // 索引已存在
            console.log('⚠️  索引已存在，跳过:', statement.trim().split('\\n')[0] + '...');
          } else {
            console.error('❌ 执行失败:', err.message);
          }
        }
      }
    }
    
    console.log('\\n✅ 数据库表创建完成！');
    
  } catch (error) {
    console.error('❌ 连接失败:', error.message);
    throw error;
  } finally {
    await client.disconnect();
  }
}

createTables().catch(console.error);
`;

    // 写入临时文件
    const tempFile = path.join(__dirname, 'temp-setup.js');
    fs.writeFileSync(tempFile, tempScript);
    
    // 安装 pg 包（如果还没有）
    console.log('📦 安装必要的依赖...');
    execSync('npm install pg', { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    
    // 执行脚本
    console.log('\n🔧 创建数据库表...');
    execSync(`node ${tempFile}`, { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    
    // 清理临时文件
    fs.unlinkSync(tempFile);
    
    // 生成 Prisma Client
    console.log('\n📦 生成 Prisma Client...');
    execSync('npx prisma generate', { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    
    console.log('\n🎉 设置完成！');
    console.log('\n现在你可以：');
    console.log('1. 运行 `npm run dev` 启动开发服务器');
    console.log('2. 访问 http://localhost:3000');
    console.log('3. 运行 `npx prisma studio` 查看数据库');
    
  } catch (error) {
    console.error('\n❌ 设置失败:', error.message);
    console.log('\n备选方案：');
    console.log('1. 手动登录 Supabase: https://supabase.com/dashboard/project/qoytiztonbhxfwujvanq');
    console.log('2. 进入 SQL Editor');
    console.log('3. 复制 prisma/init.sql 的内容并执行');
  }
}

// 运行设置
setupSupabaseDatabase();