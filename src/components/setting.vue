<template>
    <div class="div settingPage" id="settingPage">
        <button button="1" id="closeBtn" @click="toggleMenu">關閉</button>
        设定功能在开发中，我有点困了
        
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const toggleMenu = () => {
    const isOpen=document.getElementById('settingPage')
    isOpen.style.opacity = isOpen.style.opacity == 1 ? 0 : 1;
}

onMounted(() => {
    // 监听全局自定义事件，不管是 Header 还是谁发出的，都能接收
    window.addEventListener('toggle-setting-menu', toggleMenu)
})

onUnmounted(() => {
    // 组件销毁时移除监听，防止内存泄漏
    window.removeEventListener('toggle-setting-menu', toggleMenu)
})
</script>
<style scoped>
.settingPage{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100000000;

    width: 50%;
    height: 50%;
    opacity: 0;

    transition: all 0.4s ease;
}
#closeBtn{
    position: fixed;
    right: 20px;
    top: 20px;
}
</style>