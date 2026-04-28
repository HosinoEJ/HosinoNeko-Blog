<script setup>
</script>
<template>
    <header class="div">
        <a href="/" class="icon">
            <img :src="$HeadImageX64px"/>
            HosinoNeko | website
        </a>
        <page>
            <a href="#/">首頁</a>
            <a href="#/friends">友情鏈接</a>
            <a href="#/about">關於本站</a>
            <a href="#/blog">文章</a>
        </page>
        <div class="rtmod">
            <button onclick="settingDivOpen()" id="settingBtn" button="2">settings</button>
        </div>
    </header>
</template>
<style scoped>
header{
    background-color: rgb(242, 250, 255);
    padding: 1em 2em;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
}
header > * {
    margin: 0 1em;
}
header img {
    height: 1.5em;
    width: auto;
    vertical-align: middle;
    border-radius: 50%;
}
header .icon {
    margin-right: auto;
    text-decoration: none;
}
header .rtmod{
    margin-left: auto;
}
header > :not(.icon,.rtmod){
    position:absolute
}
header page a{
    margin: 0 20px;
}
</style>