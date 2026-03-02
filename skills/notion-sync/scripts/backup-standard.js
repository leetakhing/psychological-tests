#!/usr/bin/env node
/**
 * Notion Memory Backup - 标准化格式
 * 
 * 格式：
 * 📁 Memory Backup - YYYY-MM-DD (单一页面，内容全部整合)
 *   包含：核心配置 + 每日记忆
 * 
 * 索引页（固定不删）：
 * 📚 OpenClaw 记忆库
 */

const { execSync } = require('child_process');
const fs = require('fs');

const BACKUP_PARENT_ID = '30131fce-0d97-808c-a314-f16d0ed45738';
const MEMORY_PATH = '/home/admin/.openclaw/workspace/memory';
const WORKSPACE_PATH = '/home/admin/.openclaw/workspace';

// 只需要备份这些核心文件
const CONFIG_FILES = [
  { name: 'SOUL.md', title: '🧠 SOUL.md - AI人格' },
  { name: 'USER.md', title: '👤 USER.md - 用户信息' },
  { name: 'AGENTS.md', title: '📋 AGENTS.md - 工作规范' },
  { name: 'IDENTITY.md', title: '🎭 IDENTITY.md - 身份定义' },
];

function runCmd(cmd) {
  return execSync(cmd, { encoding: 'utf-8' });
}

function mdToNotion(filePath, parentId, title) {
  if (!fs.existsSync(filePath)) return null;
  const cmd = `node scripts/md-to-notion.js "${filePath}" "${parentId}" "${title}"`;
  try {
    const output = runCmd(cmd);
    console.log(output);
    const match = output.match(/Page ID: ([a-f0-9-]+)/);
    return match ? match[1] : null;
  } catch (e) {
    console.error(`Error: ${e.message}`);
    return null;
  }
}

function getTodayDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function backup() {
  const today = getTodayDate();
  console.log(`\n🗓️  Starting Standardized Notion Backup: ${today}\n`);
  
  // 创建今日备份（单一页面，整合所有内容）
  const title = `📁 Memory Backup - ${today}`;
  console.log(`Creating: ${title}`);
  
  // 先生成一个整合的 markdown 文件
  let combinedContent = `# 📁 Memory Backup - ${today}\n\n`;
  combinedContent += `> 自动生成于 ${new Date().toLocaleString('zh-CN')}\n\n---\n\n`;
  
  // 添加配置文件的最新内容
  for (const file of CONFIG_FILES) {
    const filePath = `${WORKSPACE_PATH}/${file.name}`;
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      combinedContent += `## ${file.title}\n\n`;
      combinedContent += content + '\n\n---\n\n';
    }
  }
  
  // 添加今日记忆
  const todayMemoryPath = `${MEMORY_PATH}/${today}.md`;
  if (fs.existsSync(todayMemoryPath)) {
    const content = fs.readFileSync(todayMemoryPath, 'utf-8');
    combinedContent += `## 📅 今日记忆 (${today})\n\n`;
    combinedContent += content + '\n\n';
  }
  
  // 写入临时文件
  const tempFile = `/tmp/notion-backup-${today}.md`;
  fs.writeFileSync(tempFile, combinedContent);
  
  // 上传到 Notion
  const pageId = mdToNotion(tempFile, BACKUP_PARENT_ID, title);
  
  if (pageId) {
    console.log(`\n✅ Backup complete!`);
    console.log(`📄 URL: https://notion.so/${pageId.replace(/-/g, '')}`);
  } else {
    console.log(`\n❌ Backup failed!`);
  }
}

backup().catch(console.error);
