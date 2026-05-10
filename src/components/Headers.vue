<script setup>
import { useDeviceType } from '../utils/isMobie';
const { isMobile, isTablet } = useDeviceType();

const openList = () => {
    const menu = document.getElementById('mobileMenu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    menu.style.animation = 'fadeIn 0.3s';
};
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY === 0) {
        header.style.backgroundColor = 'var(--card-bg)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    }
});
</script>
<template>
    <header class="div">
        <a href="/#/" class="icon" fadeUp="true">
            <img :src="$HeadImageX64px"/>
            <span v-if="!isMobile">HosinoNeko | website</span>
            <span v-else>HosinoNeko</span>
        </a>
        <page v-if="!isMobile" fadeUp="true">
            <a href="#/">首頁</a>
            <a href="#/friends">友情鏈接</a>
            <a href="#/about">關於本站</a>
            <a href="#/blog">文章</a>
        </page>
        <div class="rtmod" v-else fadeUp="true">
            <button @click="openList" id="openListBtn" button="2">……</button>
        </div>
    </header>
    <div class="div mobile-menu" id="mobileMenu" v-if="!isTablet">
        <a href="#/">首頁</a>
        <a href="#/friends">友情鏈接</a>
        <a href="#/about">關於本站</a>
        <a href="#/blog">文章</a>
    </div>
</template>
<style scoped>
header{
    padding: 1em 2em;
    font-size: 18px;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 1em;
    transition: background-color 0.5s ease;
}
header > * {
    margin: 0 1em;
}
header img {
    height: 1.5em;
    width: auto;
    margin-right: 0.5em;
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
.mobile-menu {
    display: none;
    flex-direction: column;
}
</style>