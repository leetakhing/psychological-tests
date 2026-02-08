#!/usr/bin/env node
/**
 * Notion Memory Backup with Child Pages Structure
 * 
 * Backup format:
 * 📁 Memory Backup - YYYY-MM-DD (Parent Page)
 *   ├── 📄 SOUL.md
 *   ├── 📄 USER.md
 *   ├── 📄 AGENTS.md
 *   ├── 📄 TOOLS.md
 *   ├── 📄 IDENTITY.md
 *   ├── 📄 HEARTBEAT.md
 *   ├── 📄 memory/YYYY-MM-DD.md
 *   └── ...
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BACKUP_PARENT_ID = process.env.NOTION_BACKUP_PARENT_ID || '30131fce-0d97-808c-a314-f16d0ed45738';
const MEMORY_PATH = '/home/admin/.openclaw/workspace/memory';
const WORKSPACE_PATH = '/home/admin/.openclaw/workspace';

const CONFIG_FILES = ['SOUL.md', 'USER.md', 'AGENTS.md', 'TOOLS.md', 'IDENTITY.md', 'HEARTBEAT.md'];

function runCmd(cmd) {
  console.log(`$ ${cmd}`);
  return execSync(cmd, { encoding: 'utf-8' });
}

function mdToNotion(filePath, parentId, title) {
  const cmd = `node scripts/md-to-notion.js "${filePath}" "${parentId}" "${title}"`;
  const output = runCmd(cmd);
  console.log(output);
  
  // Extract page ID from output
  const match = output.match(/Page ID: ([a-f0-9-]+)/);
  return match ? match[1] : null;
}

function getTodayDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function backup() {
  const date = getTodayDate();
  const tempDir = `/tmp/notion-backup-${date}`;
  
  console.log(`\n🗓️  Starting Notion Backup: ${date}\n`);
  
  // Create parent page with summary
  const summaryMd = `# Memory Backup - ${date}

## Backup Summary
- **Date:** ${date}
- **Time:** ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}
- **Files backed up:** ${CONFIG_FILES.length + 2} config files + daily memory files

## Config Files
${CONFIG_FILES.map(f => `- ${f}`).join('\n')}

## Daily Memory Files
List of memory/*.md files backed up today.

---
*This page is a summary. See child pages for full content.*`;

  // Create temp directory
  fs.mkdirSync(tempDir, { recursive: true });
  fs.writeFileSync(path.join(tempDir, 'summary.md'), summaryMd, 'utf-8');
  
  // Create parent page with summary as content
  const parentTitle = `📁 Memory Backup - ${date}`;
  const parentPageId = mdToNotion(
    path.join(tempDir, 'summary.md'),
    BACKUP_PARENT_ID,
    parentTitle
  );
  
  if (!parentPageId) {
    console.error('❌ Failed to create parent page');
    process.exit(1);
  }
  
  console.log(`✅ Created parent page: ${parentPageId}\n`);
  
  // Backup config files
  console.log('📄 Backing up config files...\n');
  const configPageIds = {};
  
  for (const file of CONFIG_FILES) {
    const filePath = path.join(WORKSPACE_PATH, file);
    if (fs.existsSync(filePath)) {
      const pageId = mdToNotion(filePath, parentPageId, `📄 ${file}`);
      if (pageId) {
        configPageIds[file] = pageId;
        console.log(`  ✓ ${file}\n`);
      }
    } else {
      console.log(`  ⚠️  ${file} not found, skipping\n`);
    }
  }
  
  // Backup memory files
  console.log('📁 Backing up memory files...\n');
  const memoryFiles = fs.readdirSync(MEMORY_PATH)
    .filter(f => f.endsWith('.md') && f.startsWith('20')) // YYYY-MM-DD format
    .sort()
    .reverse(); // Most recent first
  
  for (const file of memoryFiles) {
    const filePath = path.join(MEMORY_PATH, file);
    const pageTitle = `📁 ${file}`;
    const pageId = mdToNotion(filePath, parentPageId, pageTitle);
    if (pageId) {
      console.log(`  ✓ ${file}\n`);
    }
  }
  
  // Cleanup
  fs.rmSync(tempDir, { recursive: true });
  
  console.log('✅ Backup complete!');
  console.log(`📄 Parent Page: https://notion.so/${parentPageId.replace(/-/g, '')}`);
  console.log(`📊 Total pages: ${Object.keys(configPageIds).length + memoryFiles.length + 1}`);
}

backup().catch(err => {
  console.error('❌ Backup failed:', err);
  process.exit(1);
});
