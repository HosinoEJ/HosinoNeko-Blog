<template>
  <main>
    <h1>{{ route.params.title }}</h1>
    <div class="markdown-body div" v-html="html"></div>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
// 如果你有安裝 github-markdown-css
import 'github-markdown-css/github-markdown.css'

const route = useRoute()
const html = ref('')
const md = new MarkdownIt({
    html: true,
    breaks: true
})

// 定義一個加載 Markdown 的函數
const loadMarkdown = async () => {
    try {
        const title = route.params.title
        // 使用 Vite 的動態匯入功能
        // 注意：路徑必須以 ./ 或 ../ 開頭，且副檔名最好寫死以便 Vite 識別
        const mdModule = await import(`../../Blog/${title}.md?raw`)
        
        // mdModule.default 會包含檔案內容字串 (需配合 vite-plugin-string 或 ?raw 參數)
        html.value = md.render(mdModule.default)
    } catch (error) {
        console.error('找不到該文章:', error)
        html.value = '<p>文章不存在或路徑錯誤</p>'
    }
}

// 初始進入加載
onMounted(loadMarkdown)

// 監聽路由變化（如果從文章 A 跳到文章 B）
watch(() => route.params.title, loadMarkdown)
</script>
<style scoped>
.markdown-body{
    width: 80%;
    margin: 0 auto;
}
h1{
    width: 80%;
    margin: 0 auto;
}
</style>