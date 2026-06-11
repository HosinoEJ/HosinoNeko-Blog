import fs from 'fs';
import path from 'path';
import { Feed } from 'feed';
import { marked } from 'marked';

// 1. 基礎配置（請替換為你的真實域名）
const BLOG_URL = 'https://hosinoneko.me'; 
const BLOG_TITLE = 'HOSINONEKO BLOG';
const BLOG_DESC = 'HosinoNeko Blog';

const feed = new Feed({
  title: BLOG_TITLE,
  description: BLOG_DESC,
  id: BLOG_URL,
  link: BLOG_URL,
  language: 'zh-TW', // 正體中文
  favicon: `https://avatars.githubusercontent.com/u/177436503?v=4&size=64`,
  copyright: `All rights reserved ${new Date().getFullYear()}, HosinoNeko`,
});

// 2. 讀取並解析你的 blogData.json
const jsonPath = path.join(process.cwd(), 'public', 'blogData.json');
const outputXmlPath = path.join(process.cwd(), 'public', 'rss.xml');


const POSTS_DIR = path.join(process.cwd(), 'Blog');

if (!fs.existsSync(jsonPath)) {
  console.error('❌ 未找到 blogData.json 文件，請檢查路徑！');
  process.exit(1);
}

const blogData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
const posts = blogData.Data || [];
const tagList = blogData.TagList || {};

// 3. 解析日期並排序
// 由於你的日期格式是 "2026年5月5日"，我們需要將其轉換為 JS 能識別的 Date 對象
function parseChineseDate(dateStr) {
  const match = dateStr.match(/(\d+)年(\d+)月(\d+)日/);
  if (match) {
    return new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]));
  }
  return new Date();
}

const formattedPosts = posts.map(post => ({
  ...post,
  parsedDate: parseChineseDate(post.CreationDate)
}));

// 按時間倒序排列（最新的文章排在最前面）
formattedPosts.sort((a, b) => b.parsedDate - a.parsedDate);

// 4. 將文章循環加入 RSS Feed
formattedPosts.forEach((post) => {
  // 根據你的 Vue 路由設計拼接文章 URL。此處以 /posts/filename 為例
  const postUrl = `${BLOG_URL}/#/blog/${encodeURIComponent(post.filename)}`;
  
  // 獲取標籤名稱
  const categories = (post.tagid || []).map(id => tagList[id]).filter(Boolean);

  let htmlContent = '';
  try {
    // 根據你的實際文件後綴調整，這裡假設是 .md 文件
    // 如果你的 filename 已經自帶後綴，就改成 `${post.filename}`
    const articlePath = path.join(POSTS_DIR, `${post.filename}.md`); 
    
    if (fs.existsSync(articlePath)) {
      const rawMarkdown = fs.readFileSync(articlePath, 'utf-8');
      
      // 1. 如果你的 Markdown 頂部有 Front Matter（---包裹的元數據），需要去掉它
      const cleanMarkdown = rawMarkdown.replace(/^---[\s\S]*?---\n/, '');
      
      // 2. 將 Markdown 轉換為 HTML 字符串
      htmlContent = marked.parse(cleanMarkdown);
    }
  } catch (err) {
    console.warn(`⚠️ 無法讀取文章正文: ${post.filename}`, err);
  }

  feed.addItem({
    title: post.title,
    id: postUrl,
    link: postUrl,
    author: [
      {
        name: post.author,
      }
    ],
    date: post.parsedDate,
    category: categories.map(name => ({ name })),
    // 由於 JSON 中沒有正文，這裡可以留空，或者放標籤作為導讀
    description: `分類：${categories.join(', ')} | 語言：${post.Language}`,
    content: htmlContent || `分類：${categories.join(', ')}（暫無正文預覽，請點擊鏈接閱讀）`,
  });
});

// 5. 輸出成 rss.xml 到 public 目錄
let xmlContent = feed.rss2();

// 注入 XSLT 樣式表鏈接（插在 <?xml ... ?> 標籤的後面）
const xsltLine = '\n<?xml-stylesheet href="/rss-style.xsl" type="text/xsl"?>';
xmlContent = xmlContent.replace('?>', '?>' + xsltLine);

fs.writeFileSync(outputXmlPath, xmlContent);
console.log('✨ RSS Feed (rss.xml) 成功更新並注入樣式表！');