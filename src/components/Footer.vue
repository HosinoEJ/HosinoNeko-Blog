<script setup>
import { useDeviceType } from '../utils/isMobie';
const { isMobile, isTablet } = useDeviceType();
</script>

<template>
    <footer>
        <div class="footerLink">
            <a href="https://github.com/HosinoEJ"><img src="/icon/github.svg" /></a>
            <a href="mailto:hosinoeiji@gmail.com"><img src="/icon/gmail.svg" /></a>
            <a href="https://t.me/@HosinoNeko_meow"><img src="/icon/telegram.svg" /></a>
            <a href="/rss.xml"><img src="/icon/rss.svg" /></a>
            <a href="/"><img class="my-head" :src="$HeadImageX64px"/></a>
            <a href="https://space.bilibili.com/1140685131"><img src="/icon/bilibili.svg" /></a>
            <a href="https://www.youtube.com/@HosinoNekoMeow"><img src="/icon/youtube.svg" /></a>
            <a href="https://x.com/HosinoEJ"><img src="/icon/x.svg" /></a>
            <a href="https://open.spotify.com/user/312vfhiton5rajg3tydzejrrhptq?si=73762580f5eb4716"><img src="/icon/spotify.svg" /></a>
        </div>
        <div class="footerMap">
        </div>
        <div class="footerMade">
            <span>Powered by:</span><br>
            <a href="https://vuejs.org/"><img src="/icon/vuedotjs.svg"/></a> | 
            <a href="https://github.com"><img src="/icon/github.svg"/></a> | 
            <a href="https://cloudflare.com"><img src="/icon/cloudflare.svg"/></a>
        </div>
    </footer>
    <div class="footerData">
        <div class="left">
            @HosinoNeko - 2026
        </div>
        <div class="right">
            <a href="/license">Apache2.0License</a>
            <a v-if="isTablet" href="https://notbyai.fyi/"><img src="/Not_ByAi/_SVG/Developed-By-Human-Not-By-AI-Badge-white.svg" /></a>
        </div>
    </div>
</template>
<style scoped>
footer{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.footerLink > *{
    margin: 0 10px;
}
.footerLink img{
    width: auto;
    vertical-align: middle;
    margin: 0 5px;
    transform: scale(1);
    transition: transform 0.3s ease-in-out;
}
.footerLink img:hover{
    transform: scale(1.4);
    
}
@media (prefers-color-scheme: dark) {
    img:not(.my-head){
        filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
    }
}
.footerLink img:not(.my-head){
    height: 2em;
}
.my-head{
    border-radius: 50%;
    height: 3.5em;
}

.footerData{
    background-color: #0000000a;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
}
.footerMade{
    text-align: center;
}
.footerMade *{
    margin: 5px;
}
.footerMade img{
    height: 1.5em;
    width: auto;
    vertical-align: middle;
}
.right{
    display: flex;
    align-items: center;
}
.right *{
    margin: 0 5px;
}
</style>