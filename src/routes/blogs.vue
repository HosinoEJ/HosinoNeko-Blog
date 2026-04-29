<template>
  <div class="blog-container">
    <nav class="tag-filter">
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

    <hr />

    <main class="post-list">
        <router-link v-for="post in filteredPosts" :key="post.filename" :to="`/blog/${post.filename}`" class="post-card">
            <h3>{{ post.title }}</h3>
            <div class="meta">
                <span>作者：{{ post.author }}</span> | 
                <span>日期：{{ post.CreationDate }}</span> |
                <span>語言：{{ post.Language }}</span>
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

const route = useRoute();
const router = useRouter();
const blogData = ref({ TagList: {}, Data: [] });

onMounted(async () => {
    blogData.value = await fetchBlogData();
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
</style>