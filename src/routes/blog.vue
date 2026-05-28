<template>
    <div class="blog-layout" @click="handleAnchorClick" :style="layoutStyle">
        <aside class="toc-sidebar div" v-if="tocHtml && !isMobile" fadeUp="true">
            <a href="/blog">←查看其它文章</a>
            <div class="toc-title"><h3>目錄</h3></div>
            <div v-html="tocHtml"></div>
        </aside>

        <main fadeUp="true">
            <h1>{{ route.params.title }}</h1>
            <div class="blog-meta" v-if="post">
                <span class="meta-item">作者：{{ post.author }}，</span>
                <span class="meta-item">發布時間：{{ post.CreationDate }}，</span>
                <span class="meta-item">語言：{{ post.Language }}</span>
            </div>
            <div class="markdown-body" v-html="html"></div>
            <div class="comments-container">
                <Giscus
                    repo="HosinoEJ/HosinoNeko-Blog"
                    repoId="R_kgDOSKjMXg"
                    category="Show and tell"
                    categoryId="DIC_kwDOSKjMXs4C-AfD"
                    mapping="title"
                    strict="1"
                    reactionsEnabled="1"
                    emitMetadata="1"
                    inputPosition="top"
                    theme="preferred_color_scheme"
                    lang="zh-TW"
                    loading="lazy"
                />
            </div>
        </main>
    </div>
</template>

<script setup>
import Giscus from '@giscus/vue';
import { ref, onMounted, watch , computed } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import '../assets/github-markdown-css/github-markdown.css'
import anchor from 'markdown-it-anchor';
import toc from 'markdown-it-toc-done-right';
import { fetchBlogData, getPostByFilename } from '../utils/blogData.js';

import { useDeviceType } from '../utils/isMobie';
const { isMobile, isTablet } = useDeviceType();

const layoutStyle = computed(() => ({
    display: (isMobile.value || isTablet.value) ? 'block' : 'flex',
}));

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

const post = ref(null);

onMounted(async () => {
    const data = await fetchBlogData();
    const filename = route.params.title;
    const foundPost = getPostByFilename(data, filename);
    document.title = filename;
    
    if (foundPost) {
        post.value = foundPost;
        await loadMarkdown(); 
    } else {
        console.error("找不到對應的文章數據");
        await loadMarkdown(); 
    }
});

//onMounted(loadMarkdown);


// 監聽路由變化
watch(() => route.params.title, loadMarkdown)
</script>
<style scoped>
h1{
    margin: 0 auto;
}

.toc-sidebar {
  position: sticky;
  top: 120px;
  width: 250px;
  flex-shrink: 0;  /* 防止目錄被文章擠扁 */
  max-height: calc(100vh - 180px); /* 限制高度，防止超過視窗 */
  overflow-y: auto;
  padding-left: 20px;
}
.blog-layout {
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  /*max-width: 1200px; */
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

.blog-meta {
    color: var(--color-meta);
    font-size: 0.9em;
    margin-bottom: 2em;
}

</style>