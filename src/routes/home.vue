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
        <div>
            <h1 class="title_2">Ciallo! I'm HosinoNeko!</h1>
        </div>
        <div class="div">
            <h2>自介</h2>
            <p>真的好高興你可以看到這個網站，我是HosinoNeko，一名中國内地的跨性別者。</p>
            <p>有關我的具體故事請看<a href="/Blog/星野寧子的回憶錄">這篇文章</a></p>
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

        <div class="div">
            <h2>經歷</h2>
            <p>曾經因爲跨性別者身份被送進戒網癮學校</p>
            <p>逃出來之後建立了NO CONVERSION THERAPY網站</p>
            <p>之後在警察威脅下關閉了網站。</p>
        </div>

        <div class="div">
            <h2>推薦文章</h2>(全部文章請看<a href="/#/blog">這裏</a>)
            <p><a href="/blog/星野寧子的回憶錄">星野寧子的回憶錄</a></p>
        </div>

        <div class="div">
            <h2>自保宣言</h2>
            <p>若出现意外情况再次被送进戒網癮學校，知道我具体个人信息的同志请拿此宣言给予公安机关</p>
            我，{真实名称}，18嵗以上，在這裏宣告，我明確反對任何形式的包括但不限於“扭轉”、“矯正”、“戒網癮”等學校或管理措施。任何人，包括我的父母或法定監護人，沒有任何權利，限制我的人身自由、通信自由等。任何移交監護權的做法都不會在我這裏得到認可。其相關協議應當依據民法典予以廢除。任何人，包括我的父母或法定監護人，在對我實行上述行爲后，我和經過我授權的人都有權利通過包括暴力在内的任何手段奪回我的權利。

            本宣告無截止時間，只要是一個法定自然人擁有本宣告，并且在本人簽名上有對應自然人的法定姓名，即可以視爲授權人，擁有出面干涉的權利。
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