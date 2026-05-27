import fs from 'fs';
import path from 'path';
import { Feed } from 'feed';

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
  favicon: `${BLOG_URL}/favicon.ico`,
  copyright: `All rights reserved ${new Date().getFullYear()}, HosinoNeko`,
});

// 2. 讀取並解析你的 blogData.json
const jsonPath = path.join(process.cwd(), 'public', 'blogData.json');
const outputXmlPath = path.join(process.cwd(), 'public', 'rss.xml');

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
  });
});

// 5. 輸出成 rss.xml 到 public 目錄
let xmlContent = feed.rss2();

// 注入 XSLT 樣式表鏈接（插在 <?xml ... ?> 標籤的後面）
const xsltLine = '\n<?xml-stylesheet href="/rss-style.xsl" type="text/xsl"?>';
xmlContent = xmlContent.replace('?>', '?>' + xsltLine);

fs.writeFileSync(outputXmlPath, xmlContent);
console.log('✨ RSS Feed (rss.xml) 成功更新並注入樣式表！');