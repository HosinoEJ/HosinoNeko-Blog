<script setup>
</script>

<template>
    <footer>
        <div class="footerLink">
            <a href="https://github.com/HosinoEJ">Github</a>
            <a>E-mail</a>
            <a>Telegram</a>
            <a href="/"><img :src="$HeadImageX64px"/></a>
            <a>BiliBili</a>
            <a>Youtube</a>
            <a href="https://x.com/HosinoEJ">Twitter</a>
        </div>
        <div class="footerMap">
        </div>
        <div class="footerMade">
            <span>Made with:</span><br>
            <a href="https://vuejs.org/">Vue</a> | 
            <a href="https://github.com">Github</a> | 
            <a href="https://cloudflare.com">CloudFlare</a>
        </div>
    </footer>
    <div class="footerData">
        <div class="left">
            @HosinoNeko - 2026
        </div>
        <div class="right">
            <a href="#/license">Apache2.0License</a>
            <a href="https://notbyai.fyi/"><img src="/Not_ByAi/Developed-By-Human-Not-By-AI-Badge-white.png" /></a>
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
    height: 3.5em;
    width: auto;
    vertical-align: middle;
    border-radius: 50%;
}

.footerData{
    background-color: #0000000a;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
}
.right{
    display: flex;
    align-items: center;
}
.right *{
    margin: 0 5px;
}
</style>