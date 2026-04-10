import fs from 'fs/promises';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

async function cleanup() {
  const files = await fs.readdir(CONTENT_DIR);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  console.log(`Cleaning up ${mdFiles.length} files...`);

  for (const file of mdFiles) {
    const filePath = path.join(CONTENT_DIR, file);
    let content = await fs.readFile(filePath, 'utf8');

    // 1. Remove Author/Byline block (usually at the start after Title)
    // Matches: [ ![Name](img) ](/@link) [Name](/@link) X min read · Date
    content = content.replace(/\[\s*!\[Poyraz Avsever\].*?\]\(.*?\)\s*\[Poyraz Avsever\].*?\s*\d+ min read\s*·\s*[A-Z][a-z]+\s+\d+,\s+\d+/gs, '');

    // 2. Remove SignIn / Vote / Bookmark links
    content = content.replace(/\[\s*\]\(\/m\/signin\?.*?\)/gs, '');
    
    // 3. Remove "Press enter or click to view image in full size"
    content = content.replace(/Press enter or click to view image in full size/g, '');

    // 4. Remove "Get Poyraz Avsever’s stories in your inbox" section
    content = content.replace(/## Get Poyraz Avsever’s stories in.*?Remember me for faster sign in/gs, '');

    // 5. Clean up multiple consecutive newlines that might have been left behind
    content = content.replace(/\n{4,}/g, '\n\n\n');

    await fs.writeFile(filePath, content, 'utf8');
    console.log(`  -> Cleaned: ${file}`);
  }

  console.log('Cleanup complete!');
}

cleanup();
