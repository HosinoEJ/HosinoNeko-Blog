<template>
    <div class="statusRtDiv">
        <survivalTime />
        <adult />
        <allLinks />
    </div>
</template>
<script setup>
import survivalTime from './tools/survivalTime.vue';
import adult from './tools/adult.vue'
import allLinks from './tools/allLinks.vue'

</script>

<style scoped>
.statusRtDiv{
    width: 20%;
}
</style>