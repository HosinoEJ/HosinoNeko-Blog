import './assets/main.css'
import './assets/ctrl.css'

import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'
import Lenis from 'lenis'

//其他頁面
import Home from './routes/home.vue'
import Friends from './routes/friends.vue'
import NotFound from './routes/404.vue'
import license from './routes/license.vue'
import blogs from './routes/blogs.vue'
import blog from './routes/blog.vue'
import nct from './routes/nct.vue'

const app = createApp(App)


// 设定滚动动画的配置
const lenis = new Lenis({
    // 自动使用 requestAnimationFrame 驱动（默认：true）
    autoRaf: true,
    // 在路由导航时停止惯性滚动（默认：false）
    stopInertiaOnNavigate: true,
    // 平滑滚动持续时间（秒），用于仿真惯性（默认：1.2）
    duration: 0.7,
    // 缓动函数（默认示例：立方缓动），保留为函数形式
    easing: (t) => 1 - Math.pow(1 - t, 3),
    // 是否对鼠标滚轮启用平滑（默认：true）
    smoothWheel: true,
    // 鼠标滚轮乘数（默认：1）
    wheelMultiplier: 2,
    // 是否对触摸启用平滑（默认：true）
    smoothTouch: true,
    // 触摸乘数（默认：1）
    touchMultiplier: 1,
    // 是否启用无限滚动（默认：false）
    infinite: false,
    // 插值系数，用于平滑（lerp），值范围 0-1（默认：0.1）
    lerp: 0.5,
    // 滚动方向，通常为 'vertical' 或 'horizontal'（如非确定请注释）
    // direction: 'vertical',
    // 是否规范化滚轮事件（默认：true）
    normalizeWheel: true,
    // Firefox 专用滚轮倍率（默认：1）
    firefoxMultiplier: 2,
    // 指定 wrapper 节点（默认：undefined，Lenis 自动查找）
    // wrapper: undefined,
    // 指定 content 节点（默认：undefined，Lenis 自动查找）
    // content: undefined,
    // 是否显示自定义滚动条（默认：false）
    // scrollbar: false,
    // 触摸手势方向（如需限定，默认一般为 'vertical'）
    // gestureDirection: 'vertical',
});

//听取滚动事件
lenis.on('scroll', (e) => {
    // console.log(e) // 监听滚动事件
    //console.log(e.scroll) // 监听滚动位置
});


// 聲明全局變量，建議使用 $ 前綴以區分普通屬性
app.config.globalProperties.$Title = 'HosinoNeko'
app.config.globalProperties.$HeadImageX64px = 'https://avatars.githubusercontent.com/u/177436503?v=4&size=64'

//路由表
const routes = [
    { path: '/', component: Home },
    { path: '/friends', component: Friends },
    { path: '/license', component: license },
    { path: '/blog', component: blogs },
    { path: '/blog/:title', component: blog },
    { path: '/nct', component: nct },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

app.use(router)//注冊路由
app.mount('#app')

console.info('你試試點擊五下副標題呢喵？')