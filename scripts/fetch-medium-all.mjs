import fs from 'fs/promises';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import TurndownService from 'turndown';
import https from 'https';

puppeteer.use(StealthPlugin());

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

// Remove unnecessary elements from Medium articles
turndownService.addRule('remove_unwanted', {
  filter: ['script', 'noscript', 'style', 'button', 'svg'],
  replacement: () => ''
});

const IMAGES_DIR = path.join(process.cwd(), 'public', 'blog', 'images');
const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

async function ensureDirs() {
  if (!existsSync(IMAGES_DIR)) {
    await fs.mkdir(IMAGES_DIR, { recursive: true });
  }
  if (!existsSync(CONTENT_DIR)) {
    await fs.mkdir(CONTENT_DIR, { recursive: true });
  }
}

async function downloadImage(url, filename) {
  const destPath = path.join(IMAGES_DIR, filename);
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return resolve(url); 
      }
      const file = createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => { 
        file.close(); 
        resolve(`/blog/images/${filename}`); 
      });
      file.on('error', () => { 
        resolve(url); 
      });
    }).on('error', () => { 
        resolve(url); 
    });
  });
}

function cleanSlug(str) {
  let decoded = decodeURIComponent(str);
  // Remove the medium id suffix at the end e.g. -b3719c7aaacd
  decoded = decoded.replace(/-[a-f0-9]{8,12}$/i, '');
  return decoded.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function main() {
  await ensureDirs();

  // Clear existing content/blog directory as requested by the user
  const existingFiles = await fs.readdir(CONTENT_DIR);
  for (const file of existingFiles) {
    if (file.endsWith('.md')) {
      await fs.unlink(path.join(CONTENT_DIR, file));
    }
  }

  const fileContent = await fs.readFile(path.join(process.cwd(), 'docs/mediumLinks.md'), 'utf8');
  const urls = fileContent.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  console.log(`Processing ${urls.length} articles...`);

  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1366, height: 768 });

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`[${i + 1}/${urls.length}] Fetching ${url}`);
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      
      const pageTitle = await page.title();
      if (pageTitle.includes('Just a moment')) {
        console.log('  -> Waiting for Cloudflare...');
        await new Promise(r => setTimeout(r, 7000));
      }

      await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
      await new Promise(r => setTimeout(r, 1000));

      const meta = await page.evaluate(() => {
        const title = document.querySelector('h1')?.innerText || document.querySelector('meta[property="og:title"]')?.content || 'Unknown Title';
        const rawExcerpt = document.querySelector('meta[name="description"]')?.content || '';
        const coverImage = document.querySelector('meta[property="og:image"]')?.content || '';
        const canonical = document.querySelector('link[rel="canonical"]')?.href || '';
        const dateRaw = document.querySelector('meta[property="article:published_time"]')?.content || new Date().toISOString();
        
        const readTimeText = document.body.innerText.match(/\d+\s*min\s*read/i);
        const readTime = readTimeText ? readTimeText[0] : '5 min read';

        // Attempting to just grab the article element, without the author and social toolbars
        // Medium usually surrounds the actual article content in section tags
        let htmlContext = '';
        const sections = Array.from(document.querySelectorAll('article section'));
        if(sections.length > 0) {
            sections.forEach(s => { htmlContext += s.innerHTML; });
        } else {
            htmlContext = document.querySelector('article')?.innerHTML || '';
        }

        return { title, rawExcerpt, coverImage, canonical, dateRaw, readTime, htmlContext };
      });

      if (!meta.htmlContext) {
        console.log(`  -> Failed to find article content! Skipping.`);
        continue;
      }

      // Convert HTML back to markdown
      let markdown = turndownService.turndown(meta.htmlContext);

      // Clean metadata
      const rawSlug = url.split('/').pop().split('?')[0];
      const slug = cleanSlug(rawSlug);
      
      const date = meta.dateRaw.split('T')[0];
      const category = "General"; // Defaulting as discussed
      // Safely escape quotes in title/excerpt
      const safeTitle = meta.title.replace(/"/g, '\\"');
      const safeExcerpt = meta.rawExcerpt.replace(/"/g, '\\"');

      // Setup frontmatter
      const coverImageDest = `${slug}-cover.jpg`;
      const localCoverImageUrl = await downloadImage(meta.coverImage, coverImageDest);

      let frontmatter = `---
title: "${safeTitle}"
category: "${category}"
date: "${date}"
readTime: "${meta.readTime}"
author: "Poyraz Avsever"
slug: "${slug}"
excerpt: "${safeExcerpt}"
coverImage: "${localCoverImageUrl}"
canonicalUrl: "${url}"
---

`;

      // Download content images
      const imgRegex = /!\[(.*?)\]\((https:\/\/(?:miro\.medium\.com|cdn-images-\d+\.medium\.com)[^)]+)\)/g;
      const promises = [];
      const imageMap = {};

      let match;
      let imgId = 1;
      while ((match = imgRegex.exec(markdown)) !== null) {
        const originalUrl = match[2];
        const filename = `${slug}-img-${imgId++}.jpg`;
        promises.push(
          downloadImage(originalUrl, filename).then(localPath => {
            imageMap[originalUrl] = localPath;
          })
        );
      }

      await Promise.all(promises);

      // Replace urls in markdown
      Object.keys(imageMap).forEach(orig => {
        markdown = markdown.split(orig).join(imageMap[orig]);
      });

      // Medium adds a lot of "Follow me on Medium" user-bars in markdown output. We can keep it but remove the generic leading user snippet
      
      // Cleanup UI noise
      markdown = markdown.replace(/\[\s*!\[Poyraz Avsever\].*?\]\(.*?\)\s*\[Poyraz Avsever\].*?\s*\d+ min read\s*·\s*[A-Z][a-z]+\s+\d+,\s+\d+/gs, '');
      markdown = markdown.replace(/\[\s*\]\(\/m\/signin\?.*?\)/gs, '');
      markdown = markdown.replace(/Press enter or click to view image in full size/g, '');
      markdown = markdown.replace(/## Get Poyraz Avsever’s stories in.*?Remember me for faster sign in/gs, '');
      markdown = markdown.replace(/\n{4,}/g, '\n\n\n');

      const finalMd = frontmatter + markdown;
      const mdPath = path.join(CONTENT_DIR, `${slug}.md`);
      
      await fs.writeFile(mdPath, finalMd, 'utf8');
      console.log(`  -> Saved and Cleaned to ${mdPath}`);

    } catch (err) {
      console.error(`  -> Error processing ${url}:`, err.message);
    }
  }

  await browser.close();
  console.log('All articles processed!');
}

main();
