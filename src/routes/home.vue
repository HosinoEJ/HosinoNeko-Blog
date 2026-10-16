<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useTextAnime } from '@/utils/textAnime'

const {
    setup,
    animateChars,
    animateWords,
    animateLines,
    destroy
} = useTextAnime('.title_2')
onMounted(() => {
    setup()
})

onMounted(() => {
    document.title = 'HosinoNeko Blog'
})
</script>
<template>
    <div fadeUp="true">
        <div class="div">
            <h2>距离第二年续费还差62.2$</h2>
            <p>对跨性别者这么重要的一个域名，竟然只需要<b style="font-size: 1.2em;">62.2美元</b>！台下观众一片欢呼，<b>62.2$！62.2$！</b></p>
            <p>但是！<br>这么点破钱，站长竟然彻夜未眠！</p>
            <p>所以各位，如果不想让这个域名落到跨圈神人那里，就求求阁下们给我点钱吧（大哭）</p>
        </div>

        <div class="div">
            <h2>訂閲</h2>
            <p>點擊可以訂閲我的文章，當我有新的文章時會通知你</p>
            <a href="https://forms.gle/v3Q9DCPZLApLHkFn8" button="2">訂閲</a>
            <p>如果你沒有Google帳號，可以通過以下方式訂閲：</p>
            <a href="https://forms.cloud.microsoft/r/uDGJST7hLt" button="1">訂閲</a> <a href="/rss.xml">RSS訂閲</a>
        </div>



        <div class="div">
            <h2>PROJECTS</h2>
            <p>NO COVNERSION THERAPY</p>
            <a href="https://victimsunion.org">官方網站</a> | <a href="/nct">地圖</a>
        </div>
    </div>
</template>
<style scoped>
.title_2 {
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 2rem;
}
</style>