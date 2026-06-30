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
    const isHidden = isOpen.style.opacity == 0;

    // 如果当前是隐藏的，就显示并开启交互；否则隐藏并禁用交互
    isOpen.style.opacity = isHidden ? 1 : 0;
    isOpen.style.pointerEvents = isHidden ? 'auto' : 'none';
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
    pointer-events: none;

    transition: all 0.4s ease;
}
#closeBtn{
    position: fixed;
    right: 20px;
    top: 20px;
}
</style>