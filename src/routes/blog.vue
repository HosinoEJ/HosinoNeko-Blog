<template>
    <div class="blog-layout" @click="handleAnchorClick">
        <aside class="toc-sidebar div" v-if="tocHtml">
        <div class="toc-title"><h3>目錄</h3></div>
        <div v-html="tocHtml"></div>
        </aside>

        <main>
        <h1>{{ route.params.title }}</h1>
        <div class="blog-meta">這是meda</div>
        <div class="markdown-body" v-html="html"></div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import '../assets/github-markdown-css/github-markdown.css'
import anchor from 'markdown-it-anchor';
import toc from 'markdown-it-toc-done-right';


const route = useRoute()
const html = ref('')
const tocHtml = ref('');
const md = new MarkdownIt({
    html: true,
    breaks: true
})
.use(anchor, {
    // 這裡的 slugify 確保中文標題能生成正確的 ID
    slugify: (s) => String(s).trim().toLowerCase().replace(/\s+/g, '-')
})
.use(toc, {
    containerClass: 'toc-done-right',
    listType: 'ul',
    slugify: (s) => String(s).trim().toLowerCase().replace(/\s+/g, '-'),
    callback: (htmlString) => {
        tocHtml.value = htmlString;
    }
});

const handleAnchorClick = (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    
    if (href && href.startsWith('#')) {
        e.preventDefault(); 

        const targetId = decodeURIComponent(href.substring(1));
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            const currentFullHash = window.location.hash; 
            
            // 2. 找到路由路徑部分（去掉舊錨點的部分）
            const basePath = currentFullHash.split('#')[1] || ''; // 拿到 "/blog/xxx"
            const routePath = basePath.split('#')[0]; // 確保拿到純路徑部分
            
            const newHash = `#${routePath}#${encodeURIComponent(targetId)}`;
            
            window.history.replaceState(null, '', `${window.location.pathname}${newHash}`);
        }
    }
};

// 定義加載 Markdown 的函數
const loadMarkdown = async () => {
    try {
        const title = route.params.title
        const mdModule = await import(`../../Blog/${title}.md?raw`)
        html.value = md.render(mdModule.default)
    } catch (error) {
        console.error('找不到該文章:', error)
        html.value = '<p>文章不存在或路徑錯誤</p>'
    }
}

// 初始進入加載
onMounted(loadMarkdown)

// 監聽路由變化
watch(() => route.params.title, loadMarkdown)
</script>
<style scoped>
h1{
    width: 80%;
    margin: 0 auto;
}

/* 2. 修改側邊欄：從 fixed 改為 sticky */
.toc-sidebar {
  position: sticky; /* 關鍵：黏性定位 */
  top: 40px;       /* 捲到距離視窗頂部 40px 的時候停住 */
  width: 250px;    /* 適度加寬，避免文字太擠 */
  flex-shrink: 0;  /* 防止目錄被文章擠扁 */
  max-height: calc(100vh - 80px); /* 限制高度，防止超過視窗 */
  overflow-y: auto;
  padding-left: 20px;
  border-left: 1px solid #eee; /* 加一條細線區隔，質感更好 */
}
.blog-layout {
  display: flex;
  flex-direction: row; /* 讓內容橫向排列 */
  justify-content: center; /* 居中顯示 */
  align-items: flex-start; /* 頂部對齊，這是 sticky 生效的關鍵 */
  gap: 40px; /* 文章和目錄之間的間距 */
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

:deep(.toc-done-right) ul {
  list-style-type: none;
  padding-left: 10px; /* 控制縮進量 */
  margin: 0;
}
:deep(.toc-done-right) > ul {
  padding-left: 0; /* 第一層不縮進 */
}

:deep(.toc-done-right) a {
  text-decoration: none;
  color: #666;
  font-size: 0.9rem;
}

:deep(.toc-done-right) a:hover {
  color: #42b983; /* Vue 綠 */
}

.blog-meta {
    color: var(--color-meta);
    font-size: 0.9em;
    margin-bottom: 2em;
}

</style>