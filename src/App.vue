<script setup>
//import HelloWorld from './components/HelloWorld.vue'
//import TheWelcome from './components/TheWelcome.vue'

//頂部欄和底部欄
import Headers from './components/Headers.vue'
import Foot from './components/Footer.vue'
import statusForRt from './components/statusForRt.vue'
import Banne from './components/Banne.vue';
</script>

<template>
    <Headers />
    <Banne />
    <main class="content">
        <div class="left div"><router-view /></div>
        <statusForRt />
    </main>
    <Foot />
</template>

<style scoped>
.content {
    /* 自動撐開，佔滿剩餘空間，將 Footer 推到底部 */
    flex: 1;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    width: 80%;
}
.left{
    width: 80%;
}
</style>
