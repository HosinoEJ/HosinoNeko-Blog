<script setup>

//頂部欄和底部欄
import Headers from './components/Headers.vue'
import Foot from './components/Footer.vue'
import statusForRt from './components/statusForRt.vue'
import Banne from './components/Banne.vue';
import age18 from './components/18age.vue';

import { ref, computed, onMounted } from 'vue';
import { useDeviceType } from './utils/isMobie';
const { isMobile, isTablet,isDesktop } = useDeviceType();

const mainStyle = computed(() => ({
    flexDirection: (isMobile.value || isTablet.value) ? 'column' : 'row',
}));


const isAdultDay = ref(false);

const checkDate = () => {
    const targetDate = new Date("2026-08-08T00:00:00+08:00").getTime();
    const now = new Date().getTime();
    
    isAdultDay.value = now >= targetDate;
};
onMounted(() => {
    checkDate();
    console.log('mobile',isMobile.value,'table',isTablet.value,'desktop',isDesktop.value)
});
</script>

<template>
    <div v-if="!isAdultDay">
        <Headers />
        <Banne />
        <main class="content" :style="mainStyle" fadeUp="true">
            <div class="left"><router-view /></div>
            <statusForRt />
        </main>
        <Foot />
    </div>
    <div v-else><age18 /></div>
</template>

<style scoped>
.content {
    /* 自動撐開，佔滿剩餘空間，將 Footer 推到底部 */
    flex: 1;
    display: flex;
    margin: 0 auto;
    width: 90%;
}
.left{
    flex: 1;
    min-width: 0;
}
</style>
