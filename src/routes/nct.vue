<style scoped>
#map { height: 80vh; width: 100%; border-radius: 8px; }
.custom-popup b { color: #e63946; }
</style>

<template>
    <h1 class="div">机构综合地图</h1>
    <div id="map" ref="mapContainer" style="border-radius: 20px; box-shadow: 0 10px 25px rgb(0 0 0 / 24%);"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const mapContainer = ref(null);

onMounted(() => {
    document.title = 'NCT'
  // 1. 初始化地图
  const map = L.map(mapContainer.value).setView([36.06, 120.38], 6);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
  }).addTo(map);

  const api = 'https://nct.hosinoeiji.workers.dev/api/map-data';

  // 2. 获取数据
  fetch(api)
    .then(res => res.json())
    .then(response => {
        const data = response.data || [];
        
        data.forEach(item => {
            // 防止经纬度缺失导致报错
            if (!item.lat || !item.lng) return;

            const marker = L.marker([item.lat, item.lng]).addTo(map);

            // Tooltip: 悬停简洁提示
            marker.bindTooltip(`<strong>${item.name}</strong>`, { 
            sticky: true, 
            direction: 'top' 
            });

            // Popup: 点击详细内容 (加入一些简单的排版优化)
            const popupContent = `
            <div class="custom-popup">
                <b style="font-size: 1.1rem;">${item.name}</b><br>
                <span style="color: #666; font-size: 0.8rem;">${item.prov} | ${item.addr}</span>
                <hr style="margin: 8px 0; border: 0; border-top: 1px solid #eee;">
                <div class="content-body">
                <p><strong>负责人:</strong> ${item.HMaster || '未知'}</p>
                <p><strong>经历:</strong> ${item.experience || '无'}</p>
                ${item.scandal ? `<p style="color: #d62828;"><strong>风险提示:</strong> ${item.scandal}</p>` : ''}
                <p style="font-size: 0.85rem; color: #555;">${item.else || ''}</p>
                </div>
            </div>
            `;
            marker.bindPopup(popupContent, { maxWidth: 300 });
        });
    })
    .catch(err => console.error('地图数据加载失败:', err));
});
</script>