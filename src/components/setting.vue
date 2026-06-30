<template>
    <div class="settingPage div" id="settingPage">
        <button id="closeBtn" button="2" @click="toggleMenu">關閉</button>
        <div class="settingPanel">
            <h2>個人化選項</h2>
            <div class="settingGroup">
                <label>Banner显示高度</label>
                <div class="sizeButtons">
                    <button button="2" @click="setBannerHeight('all')">Full Screen</button>
                    <button button="2" @click="setBannerHeight('half')">Half Screen</button>
                    <button button="2" @click="setBannerHeight('none')">None</button>
                </div>
            </div>







        </div>
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
.settingPanel{
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
}
.settingPanel h2{
    grid-column: 1 / -1;
    margin: 0 0 16px;
}
.settingGroup{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
}
.settingGroup label{
    flex: 0 0 auto;
    min-width: 100px;
    white-space: nowrap;
}
.settingGroup select,
.settingGroup .sizeButtons,
.settingGroup .toggleRow{
    flex: 1 1 0;
    min-width: 180px;
}
.sizeButtons,
.toggleRow{
    display: flex;
    gap: 8px;
}
.sizeButtons button,
.toggleRow button{
    flex: 1 1 auto;
}
#closeBtn{
    position: fixed;
    right: 20px;
    top: 20px;
    z-index: 10001;
}
</style>