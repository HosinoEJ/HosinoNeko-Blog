<script setup>
import { computed, defineProps } from "vue";

// 1. 改用 props 接收配置，而不是从 vitepress 获取
const props = defineProps({
  timing: {
    type: Object,
    default: () => ({
      enable: true,
      date: '2026-08-08',
      name: 'HosinoNeko',
      event: '成年'
    })
  }
});

// 2. 将逻辑中的 theme.value.aside.timing 替换为 props.timing
const timingDate = computed(() => props.timing?.date);

const parsedDate = computed(() => {
  const ds = timingDate.value;
  return ds ? new Date(ds) : null;
});

const isFuture = computed(() => {
  const d = parsedDate.value;
  return d ? d.getTime() > Date.now() : false;
});

const dayCount = computed(() => {
  const d = parsedDate.value;
  if (!d) return 0;
  const now = Date.now();
  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = now - d.getTime();
  
  // 保持你原有的逻辑
  return diff >= 0
    ? Math.floor(diff / msPerDay)
    : Math.ceil(-diff / msPerDay);
});
</script>

<template>
    <div v-if="props.timing?.enable" class="timing-card s-card div">
        <p v-if="isFuture" class="custom-text">
            ⏳ 距离 <span class="title-name">{{ props.timing.name }}</span>
            <span class="event-name">{{ props.timing.event }}</span> 还有
            <span class="day-number">{{ dayCount }}</span> 天
        </p>
        <p v-else class="custom-text">
            💌 <span class="title-name">{{ props.timing.name }}</span> 
            <span class="event-name">{{ props.timing.event }}</span> 已经
            <span class="day-number">{{ dayCount }}</span> 天
        </p>
    </div>
</template>

<style scoped>
/* 样式保持不变，但记得确保你的项目里有 s-card 或者删掉这个 class */
.timing-card { padding: 1rem; display: flex; justify-content: center; align-items: center; }
.title-name { font-weight: bold; font-size: 1.1rem; }
.event-name { font-size: 1.2rem; font-weight: 800; margin: 0 0.25rem; color: var(--main-color, #3eaf7c); }
.custom-text { font-size: 1rem; text-align: center; line-height: 1.5; }
.day-number { font-size: 1.5em; font-weight: 800; vertical-align: middle; color: var(--main-color, #3eaf7c); }
</style>