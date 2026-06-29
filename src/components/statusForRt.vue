<template>
    <div class="statusRtDiv" :style="RtDivStyle" fadeUp="true">
        <survivalTime />
        <adult />
        <allLinks />
        <spotify />
    </div>
</template>
<script setup>
import survivalTime from './tools/survivalTime.vue';
import adult from './tools/adult.vue'
import allLinks from './tools/allLinks.vue'
import spotify from './tools/spotify.vue'

import { computed } from 'vue';
import { useDeviceType } from '../utils/isMobie';
const { isMobile, isTablet } = useDeviceType();
console.log(isMobile.value,isTablet.value)
const RtDivStyle = computed(() => ({
    width: (isMobile.value || isTablet.value) ? '100%' : '20%',
    
}));
</script>