<template>
  <div class="friends-page">
    <main class="main">
      <div class="container">
        <div class="header">
          <h1>友情鏈接</h1>
          <p>歡迎所有星野醬的好朋友喵（後宮）</p>
        </div>

        <div class="links-grid">
          <a 
            v-for="friend in friendsData.friends" 
            :key="friend.url" 
            :href="friend.url" 
            target="_blank" 
            class="link-card DivStyle-Glass"
          >
            <img 
              :src="friend.avatar" 
              :style="{ borderColor: friend.color || '#3388bb' }"
              class="friend-avatar"
              alt="avatar"
            >
            
            <div class="info">
              <h3 :style="{ color: friend.color || '#111827' }">
                {{ friend.name }}
              </h3>
              
              <p v-if="friend.desc" class="desc">
                {{ friend.desc }}
              </p>
            </div>
          </a>
        </div>

        <div class="apply-section div">
            <h2>申請交換友鏈</h2>
            <p><strong>如果你也想交換鏈接。請在你的網站添加本站後，通過<a href="mailto:hosinoeiji@gmail.com">郵件</a>告訴我：</strong></p>
            <ul>
                <li><strong>名稱：</strong> 我的網站名稱</li>
                <li><strong>網址：</strong> https://yourdomain.com</li>
                <li><strong>描述：</strong> 一句話介紹你的網站</li>
                <li><strong>頭像：</strong> 公網可訪問的圖片鏈接</li>
                <li>
                    <strong>大頭照顏色</strong> 可以是顏色英文名，或者十六進制顏色代碼。例：#3388bb<br>
                    <img src="https://avatars.githubusercontent.com/u/177436503?v=4" style="width: 60px; height: 60px; border-radius: 50%; margin-right: 15px; border: 2px solid #3388bb;">
                </li>
            </ul>

            <p><strong>如果想將本站加到您的網站友鏈的話，請將下面資訊加入您的友鏈頁面：</strong></p>
            <ul>
                <li><strong>名稱：</strong> 星野小站</li>
                <li><strong>網址：</strong> 正式網址<a href="hosinoneko.me">hosinoneko.me</a>，但是有可能會變，所以我準備了備用網址，那種死都不會改的網址：<a href="https://hosino-neko-redirect-site.vercel.app/"></a></li>
                <li><strong>描述：</strong> 一隻可愛的小藥娘的網站</li>
                <li><strong>頭像：</strong> <a src="https://avatars.githubusercontent.com/u/177436503?v=4">https://avatars.githubusercontent.com/u/177436503?v=4</a><br>
                <img src="https://avatars.githubusercontent.com/u/177436503?v=4" width="50px" style="border-radius: 50%;"/></li>
            </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 1. 定義響應式資料，初始結構與你的 JSON 一致
const friendsData = ref({ friends: [] });

// 2. 獲取資料
const loadFriends = async () => {
  try {
    // 假設你把 json 放在 public/data/friends.json
    const response = await fetch('/friends.json');
    friendsData.value = await response.json();
  } catch (err) {
    console.error("無法讀取友鏈資料：", err);
  }
};

onMounted(() => {
  loadFriends();
});
</script>

<style scoped>
/* 佈局樣式 */
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

/* 網格系統 */
.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

/* 卡片基礎樣式 */
.link-card {
  display: flex;
  align-items: center;
  padding: 16px;
  text-decoration: none;
  border-radius: 16px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
}

/* 頭像樣式 */
.friend-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
  border-width: 2px;
  border-style: solid;
  object-fit: cover;
}

.info h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.desc {
  margin: 4px 0 0;
  font-size: 0.85rem;
  color: #6b7280;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 最多顯示兩行描述 */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.apply-section {
  margin-top: 60px;
  padding: 30px;
  border-radius: 20px;
}
</style>