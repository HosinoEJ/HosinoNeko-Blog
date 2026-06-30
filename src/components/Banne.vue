<script setup>
import { useDeviceType } from '../utils/isMobie';
const { isMobile, isTablet } = useDeviceType();
import { ref, onUnmounted, watch, onMounted } from 'vue';
import MidiPlayer from 'midi-player-js';
import Soundfont from 'soundfont-player';
import { useRoute } from 'vue-router';


const clickCount = ref(0);
const playerState = ref('未播放');
let lastClickTime = 0;

// 音訊與播放器變數
let player = null;
let audioContext = null;


const handleDivClick = () => {
  const currentTime = Date.now();
  //防呆機制：如果兩次點擊間隔超過 1.5 秒，就重置計數（代表不是連續點擊）
  if (currentTime - lastClickTime > 1500) {
    clickCount.value = 0;
  }
  lastClickTime = currentTime;
  clickCount.value++;
  // 點滿 5 下，觸發播放
  if (clickCount.value === 5) {
    clickCount.value = 0; // 重置計數器
    startAndPlayMIDI();
  }
};


// 載入並播放 MIDI
const startAndPlayMIDI = async () => {
  try {
    playerState.value = '正在初始化...';

    // 1. 初始化 AudioContext (必須由這次的 click 事件鏈觸發，瀏覽器才允許發聲)
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const response = await fetch('/114');
    if (!response.ok) throw new Error('找不到 MIDI 檔案，請檢查 public 路徑');
    const arrayBuffer = await response.arrayBuffer();
    // 3. 載入音色庫
    const instrument = await Soundfont.instrument(
      audioContext, 
      'https://raw.githubusercontent.com/gleitz/midi-js-soundfonts/gh-pages/MusyngKite/acoustic_grand_piano-mp3.js'
    );

    // 4. 設定播放器
    player = new MidiPlayer.Player((event) => {
      if (event.name === 'Note on' && event.velocity > 0) {
        instrument.play(event.noteName, audioContext.currentTime, {
          gain: event.velocity / 128,
        });
      }
    });

    // 5. 餵入檔案並播放
    player.loadArrayBuffer(arrayBuffer);
    player.play();
    playerState.value = '播放中';

    // 監聽播放結束事件
    player.on('endOfFile', () => {
      playerState.value = '播放結束';
    });
    console.info('不要告訴別人唷~～(∠・ω< )⌒☆')

  } catch (error) {
    console.error(error);
    playerState.value = 'error';
  }
};

const route = useRoute();
const checkBannerHeight = () => {
  const bannerEl = document.getElementById('banner');
  if (bannerEl) {
    if (route.fullPath !== '/') {
      //bannerEl.style.height = 'calc(50vh - 66px)';
      bannerEl.style.display = 'none';
    } else {
      bannerEl.style.height = 'calc(100vh - 66px)'; // 回歸預設值
    }
  }
};

onMounted(() => {
  checkBannerHeight();
});

// 組件卸載時務必釋放記憶體
onUnmounted(() => {
  if (player) player.stop();
  if (audioContext) audioContext.close();
});



watch(() => route.fullPath, () => {
  checkBannerHeight();
});


</script>
<template>
    <banner id="banner" fadeUp="true">
        <h1>Welcome to Website of HosinoNeko</h1>

        <h2
        class="click-box" 
        @click="handleDivClick"
        :class="{ 'playing': playerState === '播放中' }"
        >點解我眼角長期都帶住淚？因為我一直被困喺一個暗無天日嘅十月入面</h2>
    </banner>
</template>
<style scoped>
banner{
    height: calc(100vh - 66px);
    margin:  0 10%;
    display: flex;

    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.c-g { color: #5bcffa; }
.c-t { color: #f5abb9; }
.c-e { color: white; }
</style>