<template>
    <div class="statusRtDiv" :style="RtDivStyle" fadeUp="true">
        <survivalTime />
        <adult />
        <allLinks />
    </div>
</template>
<script setup>
import survivalTime from './tools/survivalTime.vue';
import adult from './tools/adult.vue'
import allLinks from './tools/allLinks.vue'

import { computed } from 'vue';
import { useDeviceType } from '../utils/isMobie';
const { isMobile, isTablet } = useDeviceType();

const RtDivStyle = computed(() => ({
    width: (isMobile.value || isTablet.value) ? '80%' : '20%',
}));
</script>