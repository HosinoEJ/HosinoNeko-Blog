<script setup>
//import HelloWorld from './components/HelloWorld.vue'
//import TheWelcome from './components/TheWelcome.vue'

//頂部欄和底部欄
import Headers from './components/Headers.vue'
import Foot from './components/Footer.vue'
</script>

<template>
    <Headers />
    <main class="content">
        <router-view />
    </main>
    <Foot />
</template>

<style scoped>
.content {
    /* 自動撐開，佔滿剩餘空間，將 Footer 推到底部 */
    flex: 1;
}
</style>
