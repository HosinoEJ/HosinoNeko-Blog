<template>
  <div class="container">
    <!-- 背景裝飾 -->
    <mtfbg />
    

    <headers class="hero">
      <h1 class="title">
        HosinoNeko
        <br>
        Level 18: Becoming<span>.</span>
      </h1>

      <p class="subtitle">
        無言ではなく、存在するための声
      </p>
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
      <p>
        愿世上再無扭轉機構<br>
        May every trans kid find a way home.
      </p>

      <p class="date">
        2026.08.08
      </p>
    </footer>
  </div>
</template>

<script setup>
import mtfbg from './tools/mtfbg.vue';

const timelineData = [
  {
    year: "2008-08-08",
    title: "Birth / Spawn Point",
    content: "一个新的生命载入世界。没人知道未来的故事会如此漫长。"
  },
  {
    year: "2025-08-08",
    title: "Level 17 → 18",
    content: "最后一年未成年。距离成为成年人，只剩下一条时间线。"
  },
  {
    year: "2025-09-24",
    title: "🏳️‍⚧️ HRT Day 1",
    content: "第一次，身体开始向自己的方向靠近。不是改变自己，而是找回自己。"
  },
  {
    year: "2025-09-30",
    title: "Coming Out / 爆炸",
    content: "世界没有因此停止运转，但有些关系开始出现裂痕。"
  },
  {
    year: "2025-10-03",
    title: "The Dark Chapter",
    content: "被送入所谓的“矫正机构”。十月成为人生中最漫长的一页。"
  },
  {
    year: "2026-01-01",
    title: "The Circus",
    content: "新年的烟花照亮不了牢笼。"
  },
  {
    year: "2026-02-11",
    title: "False Exit",
    content: "离开那里，但故事并没有结束。"
  },
  {
    year: "2026-02-14",
    title: "逃げ / Escape",
    content: "离开山东。下一站：上海。第一次真正为了自己行动。"
  },
  {
    year: "2026-02-20",
    title: "🏳️‍⚧️ NO CONVERSION THERAPY PROJECT",
    content: "如果没人保护后来的人，那就自己建立保护他们的东西。"
  },
  {
    year: "2026-04-26",
    title: "Homeless / Stateless Feeling",
    content: "失去熟悉的地方，也开始重新寻找属于自己的位置。"
  },
  {
    year: "2026-05",
    title: "PTSD Recovery",
    content: "过去不会消失，但我开始学习如何带着它继续前进。"
  },
  {
    year: "2026-05-08",
    title: "Home?",
    content: "回去不代表结束，有些伤痕仍然存在。"
  },
  {
    year: "2026-06-07",
    title: "The Final Exam",
    content: "高中时代最后的章节。"
  },
  {
    year: "2026-08-08",
    title: "🏳️‍⚧️ Level 18: Becoming",
    content: "成年不是获得自由的瞬间，而是开始拥有定义自己的权利。"
  }
];
</script>

<style scoped>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #08090d;
}


/* =========================
   Theme
========================= */

.container {
  isolation:isolate;

  --trans-blue: #5bcefa;
  --trans-pink: #f5a9b8;
  --trans-white: #ffffff;

  --bg:
    radial-gradient(
      circle at top,
      rgba(91,206,250,.12),
      transparent 35%
    ),
    radial-gradient(
      circle at bottom,
      rgba(245,169,184,.12),
      transparent 40%
    ),
    #08090d;


  --text-main:#f3f3f5;
  --text-soft:#ffffff;


  min-height:100vh;

  padding:
    clamp(3rem,8vw,7rem)
    clamp(1rem,5vw,3rem);


  background:var(--bg);

  color:var(--text-main);

  font-family:
    Inter,
    "SF Pro Display",
    "Noto Sans TC",
    system-ui,
    sans-serif;


  overflow:hidden;

  position:relative;
}



/* =========================
 Background FX
========================= */



.container::before {

  content:"";

  position:fixed;

  inset:0;


  background-image:
    linear-gradient(
      rgba(255,255,255,.025) 1px,
      transparent 1px
    );


  background-size:
    100% 4px;


  opacity:.15;

  pointer-events:none;

}



/* =========================
 Header
========================= */


.hero {

  position:relative;

  z-index:1;

  text-align:center;

  margin-bottom:8rem;

}



.title {


  font-size:
    clamp(2.8rem,7vw,5rem);


  font-weight:900;


  letter-spacing:-.04em;


  line-height:1.05;


  background:

    linear-gradient(
      120deg,
      var(--trans-blue),
      white,
      var(--trans-pink)
    );


  background-size:200%;


  -webkit-background-clip:text;

  color:transparent;


  animation:
    gradientMove
    8s
    linear
    infinite;


}



@keyframes gradientMove {

  to {

    background-position:
      200%;

  }

}



.subtitle {


  margin-top:1.5rem;


  color:var(--text-soft);


  letter-spacing:.5em;


  font-size:.9rem;


}



/* =========================
 Timeline
========================= */


.timeline {


  max-width:900px;

  margin:auto;

  position:relative;

  z-index:1;

}



.timeline::before {


  content:"";

  position:absolute;


  left:50%;

  top:0;

  bottom:0;


  width:2px;


  transform:translateX(-50%);


  background:

    linear-gradient(
      to bottom,
      transparent,
      var(--trans-blue),
      var(--trans-pink),
      transparent
    );


}



.timeline-item {


  width:50%;


  position:relative;


  padding:0 3rem;


  margin-bottom:5rem;


  opacity:0;


  animation:

    appear
    .8s
    ease
    forwards;


}



@keyframes appear {

  from{

    opacity:0;

    transform:
      translateY(40px);

  }


  to{

    opacity:1;

    transform:none;

  }

}



.timeline-item:nth-child(odd){

  left:0;

  text-align:right;

}



.timeline-item:nth-child(even){

  left:50%;

}



/* =========================
 Dot
========================= */


.timeline-dot {


  position:absolute;


  top:1.8rem;


  width:16px;

  height:16px;


  border-radius:50%;


  background:#08090d;


  border:3px solid;


  z-index:2;


}



.timeline-item:nth-child(odd)
.timeline-dot {


  right:-8px;


  border-color:
    var(--trans-blue);


}



.timeline-item:nth-child(even)
.timeline-dot {


  left:-8px;


  border-color:
    var(--trans-pink);


}



.timeline-dot::after {


  content:"";


  position:absolute;


  inset:-12px;


  border-radius:50%;


  background:
    inherit;


  opacity:.25;


  filter:blur(8px);


}



/* =========================
 Card
========================= */


.timeline-content {


  position:relative;


  padding:2rem;


  background:

    rgba(255,255,255,.04);


  backdrop-filter:
    blur(18px);



  border:

    1px solid

    rgba(255,255,255,.1);



  border-radius:18px;



  transition:.35s;


}



.timeline-content:hover {


  transform:

    translateY(-6px);



  border-color:

    rgba(245,169,184,.45);



}



/* =========================
 Text
========================= */


.year {


  display:block;


  color:

    var(--trans-pink);


  font-size:.9rem;


  font-family:
    monospace;


  margin-bottom:.8rem;


}



.event-title {


  font-size:

    clamp(1.2rem,3vw,1.7rem);


  margin-bottom:1rem;


}



.description {


  color:var(--text-soft);


  line-height:1.8;


}



/* =========================
 Footer
========================= */


.footer {


  margin-top:10rem;


  text-align:center;


  position:relative;

  z-index:2;

  height:83vh;


  color:var(--text-soft);


}



.date {


  margin-top:1rem;


  font-family:monospace;


  color:

    var(--trans-blue);


}



/* =========================
 Mobile
========================= */


@media(max-width:700px){


.timeline::before{

  left:18px;

}



.timeline-item,


.timeline-item:nth-child(even),


.timeline-item:nth-child(odd){


  width:100%;

  left:0;

  padding-left:55px;

  text-align:left;


}



.timeline-dot,


.timeline-item:nth-child(even)
.timeline-dot,


.timeline-item:nth-child(odd)
.timeline-dot{


  left:10px;

  right:auto;


}


.timeline-content{

  padding:1.5rem;

}



}

</style>