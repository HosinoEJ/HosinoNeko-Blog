<template>
  <div class="container">
    <!-- 背景裝飾 -->
    <div class="bg-glow"></div>

    <headers class="hero">
      <h1 class="title">HosinoNeko Level 18<span>.</span></h1>
      <p class="subtitle">無言，反抗</p>
    </headers>

    <main class="timeline">
      <div v-for="(item, index) in timelineData" :key="index" class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="year">{{ item.year }}</span>
          <h3 class="event-title">{{ item.title }}</h3>
          <p class="description">{{ item.content }}</p>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>愿世上再無扭轉機構</p>
      <p class="date">2026.08</p>
    </footer>
  </div>
</template>

<script setup>
const timelineData = [
  {
    year: "2025-8-8",
    title: "啟程 / Root",
    content: "邁入17，最後的時光"
  },
  {
    year: "2025-9-24",
    title: "HRT day 1",
    content: "女の子、なってる"
  },
  {
    year: "2025-9-30",
    title: "炸櫃",
    content: "大抵什麽事也沒有，父母卻不在在乎每頓飯的成本了..."
  },
  {
    year: "2025-10-3",
    title: "戒網癮學校",
    content: "暗無天日的十月......"
  },
  {
    year: "2026-1-1",
    title: "猴子",
    content: "元旦馬戲團"
  },
  {
    year: "2026-2-11",
    title: "離開戒網癮學校",
    content: "只是放假...對吧？"
  },
  {
    year: "2026-2-14",
    title: "逃げ",
    content: "逃離山東，NEXT STATION:SHANGHAI"
  },
  {
    year: "2026-2-20",
    title: "NO CONVERSION THERAPY PROJECT",
    content: "自己的第一槍"
  },
  {
    year: "2026-4-26",
    title: "國安、流浪",
    content: "被國安約談，從此流浪在外，無家可歸"
  },
  {
    year: "2026-5-?",
    title: "PTSD",
    content: "PTSD、無視できねえね、、、"
  },
  {
    year: "2026-5-8",
    title: "回家？",
    content: "被迫的..."
  },
  {
    year: "2026-8-8",
    title: "Level 18",
    content: "你已解鎖全部DLC..."
  }
];
</script>

<style scoped>
/* 基本樣式重置 */
.container {
  background-color: #0a0a0a;
  color: #e0e0e0;
  font-family: 'Inter', -apple-system, sans-serif;
  min-height: 100vh;
  padding: 4rem 2rem;
  overflow-x: hidden;
  position: relative;
}

/* 霓虹背景效果 */
.bg-glow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0a0a0a 100%);
  z-index: 0;
}

.bg-glow::after {
  content: '';
  position: absolute;
  top: -10%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: rgba(66, 184, 131, 0.1); /* Vue Green */
  filter: blur(100px);
  border-radius: 50%;
}

/* Header */
.hero {
  text-align: center;
  position: relative;
  z-index: 1;
  margin-bottom: 8rem;
}

.title {
  font-size: 5rem;
  font-weight: 900;
  letter-spacing: -2px;
  background: linear-gradient(to right, #fff, #42b883);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title span {
  color: #42b883;
}

.subtitle {
  color: #888;
  font-size: 1.1rem;
  margin-top: 1rem;
}

/* 時間軸主體 */
.timeline {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* 時間軸中間的豎線 */
.timeline::before {
  content: '';
  position: absolute;
  left: 31px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, transparent, #42b883, #35495e, transparent);
}

.timeline-item {
  position: relative;
  padding-left: 80px;
  margin-bottom: 6rem;
  opacity: 0;
  transform: translateY(30px);
  animation: reveal linear forwards;
  animation-timeline: view();
  animation-range: entry 20% cover 40%;
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.timeline-dot {
  position: absolute;
  left: 20px;
  top: 10px;
  width: 24px;
  height: 24px;
  background: #0a0a0a;
  border: 4px solid #42b883;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(66, 184, 131, 0.5);
  z-index: 2;
}

/* 內容卡片 - 玻璃擬態 */
.timeline-content {
  background: rgba(255, 255, 255, 0.03);
  padding: 2rem;
  border-radius: 16px;
  border: 1px border rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.timeline-content:hover {
  transform: scale(1.02);
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(66, 184, 131, 0.4);
}

.year {
  color: #42b883;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

.event-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
}

.description {
  line-height: 1.8;
  color: #aaa;
}

/* Footer */
.footer {
  text-align: center;
  margin-top: 10rem;
  padding-bottom: 4rem;
  position: relative;
  z-index: 1;
  color: #555;
  font-family: monospace;
}

.date {
  margin-top: 1rem;
  font-size: 0.9rem;
}

/* 手機端適配 */
@media (max-width: 600px) {
  .title { font-size: 3.5rem; }
  .timeline-item { padding-left: 50px; }
  .timeline::before { left: 11px; }
  .timeline-dot { left: 0; }
}
</style>