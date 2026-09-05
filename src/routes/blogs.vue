<template>
  <div class="blog-container" fadeUp="true">
    <div style="margin: 50px 0 20px 0;">
        <span class="" style="font-size: 2em; font-weight: bold;">
            推荐阅读
        </span>
    </div>
    <div class="recommend-box">
        <router-link v-for="post in recommendList" :key="post.title" :to="`/blog/${post.title}`">
            <div class="parent div">
                <div class="post-card recommend-card">
                    <h2>{{ post.title }}</h2>
                    <img 
                    class="recommand-cardImg" 
                    :src="post.illustration
                         || 'https://free.picui.cn/free/19498/2026/09/05/6a9c00a188c9f.jpg'" 
                    alt="Recommendation Image" />
                </div>
            </div>
        </router-link>
    </div>
    <hr>
    <div style="margin: 50px 0 50px 0;">
        <span class="" style="font-size: 2em; font-weight: bold;">
            全部文章
        </span>
    </div>
    <nav class="tag-filter div">
        <button
            @click="filterByTag(null)" 
            :button="currentTag == id ? '2' : '1'"
          >全部
        </button>
        
        <button
            v-for="(tagName, id) in allTags" 
            :key="id"
            @click="filterByTag(id)"
            :button="currentTag == id ? '2' : '1'"
        >
            {{ tagName }}
        </button>
    </nav>

    <main class="post-list">
        <router-link v-for="post in filteredPosts" :key="post.filename" :to="`/blog/${post.filename}`" class="link-card post-card div">
            <h3>{{ post.title }}</h3>
            <div class="meta">
                <span>作者：{{ post.author }}</span> | 
                <span>日期：{{ post.CreationDate }}</span> |
                <span>語言：{{ post.Language }}</span><br>
            </div>
            
            <div class="tags">
                <span v-for="tid in post.tagid" :key="tid" class="tag-badge">
                    #{{ allTags[tid] }}
                </span>
            </div>
        </router-link>

        <p v-if="filteredPosts.length === 0">暫無相關內容。</p>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchBlogData, getFilteredPosts } from '../utils/blogData.js';
import recommendList from '@/data/recommend.json';

const route = useRoute();
const router = useRouter();
const blogData = ref({ TagList: {}, Data: [] });

onMounted(async () => {
    blogData.value = await fetchBlogData();
    document.title = '全部文章'
});

// 使用 computed 自動處理篩選，對應原本的 QTag 邏輯
const filteredPosts = computed(() => {
    const qTag = route.query.tag;
    return getFilteredPosts(blogData.value, qTag);
});

const currentTag = computed(() => route.query.tag || null);

const filterByTag = (tagId) => {
    router.push({
        query: tagId ? { tag: tagId } : {}
    });
};

const allTags = computed(() => blogData.value.TagList);
</script>

<style scoped>
.post-card {
    display: block;
    padding: 15px;
    position: relative; /* 确保内容层级高于图片背景 */
    z-index: 1;
}
.post-card h2{
    pointer-events: none;
}

.parent {
    position: relative; /* 1. 为绝对定位的子元素建立参考系 */
    overflow: hidden;   /* 2. 让父元素充当裁剪遮罩（如圆角、超出隐藏） */
}

.recommand-cardImg {
    position: absolute; /* 脱离文档流，不影响其他元素的布局位置 */
    transform: scale(1.3);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;  /* 保持图片比例填满父元素 */
    z-index: -99;         /* 确保在底层 */
    transition: all 0.3s ease; /* 平滑过渡效果 */
    opacity: 0; /* 初始透明度 */

        -webkit-mask-image: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    mask-image: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
}
.recommand-cardImg:hover {
    transform: scale(1.4);
    opacity: 1; /* 鼠标悬停时显示图片 */
}

.post-list {
    display: flex;
    flex-direction: column-reverse;
}

.recommend-box {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
}
.recommend-card {
    margin-right: 0;
}
</style>