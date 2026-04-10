import fs from 'fs/promises';
import path from 'path';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import TurndownService from 'turndown';

puppeteer.use(StealthPlugin());

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

async function main() {
  const fileContent = await fs.readFile(path.join(process.cwd(), 'docs/mediumLinks.md'), 'utf8');
  const urls = fileContent.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  if (urls.length === 0) {
    console.log('No URLs found in mediumLinks.md');
    return;
  }
  
  console.log(`Starting to process ${urls.length} articles...`);
  
  const browser = await puppeteer.launch({ 
    headless: 'new', // new headless modes sometimes pass CD clearer
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled']
  });
  
  const page = await browser.newPage();
  
  // Set a realistic user agent
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1366, height: 768 });
  
  const testUrl = urls[0];
  console.log(`Testing first URL: ${testUrl}`);
  
  try {
    const response = await page.goto(testUrl, { waitUntil: 'load', timeout: 60000 });
    
    // Check if we hit Cloudflare
    const pageTitle = await page.title();
    console.log('Page Title:', pageTitle);
    
    if (pageTitle.includes('Just a moment')) {
      console.log('Got caught by Cloudflare still. Let\'s wait 5 seconds...');
      await new Promise(r => setTimeout(r, 5000));
    }
    
    // Extract metadata
    const meta = await page.evaluate(() => {
      const title = document.querySelector('h1')?.innerText || document.querySelector('meta[property="og:title"]')?.content || 'Unknown Title';
      const excerpt = document.querySelector('meta[name="description"]')?.content || '';
      const coverImage = document.querySelector('meta[property="og:image"]')?.content || '';
      const canonical = document.querySelector('link[rel="canonical"]')?.href || '';
      const date = document.querySelector('meta[property="article:published_time"]')?.content || new Date().toISOString();
      const readTimeText = document.body.innerText.match(/\d+\s*min\s*read/i);
      const readTime = readTimeText ? readTimeText[0] : '5 min read';
      
      // Get the main article content (excluding headers/footers)
      let html = '';
      const sections = document.querySelectorAll('article section');
      if (sections && sections.length > 0) {
        sections.forEach(s => { html += s.innerHTML; });
      } else {
        html = document.querySelector('article')?.innerHTML || document.body.innerHTML;
      }
      
      return { title, excerpt, coverImage, canonical, date, readTime, html };
    });
    
    console.log('Extracted Metadata:', {
      title: meta.title,
      date: meta.date
    });
    
    let markdown = turndownService.turndown(meta.html);
    markdown = markdown.substring(0, 300) + '...\n[SUCCESSFULLY BYPASSED]';
    console.log(markdown);
    
  } catch (err) {
    console.error('Error fetching article:', err);
  } finally {
    await browser.close();
  }
}

main();
