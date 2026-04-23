import './assets/main.css'
import './assets/ctrl.css'

import { createRouter, createWebHashHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'

//其他頁面
import Home from './routes/home.vue'
import Friends from './routes/friends.vue'
import NotFound from './routes/404.vue'
import license from './routes/license.vue'
import blogs from './routes/blogs.vue'
import blog from './routes/blog.vue'

const app = createApp(App)

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
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHashHistory(), // 使用 Hash 模式，對應你原本的邏輯
  routes,
})

app.use(router)//注冊路由
app.mount('#app')
