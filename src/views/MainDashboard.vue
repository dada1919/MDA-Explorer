<template>
  <div class="dashboard-container">
    <div class="dashboard__item chart prediction-view">
      This is Prediction Space
      <HeatMap style="padding-top: 2%;"></HeatMap>
    </div>
    <div class="dashboard__item result-view">This is Prediction Result</div>
    <div class="dashboard__item chart explanation-view">
      This is Explanation
      <NodeLinkGraph></NodeLinkGraph>
    </div>
    <div class="dashboard__item information-view">This is Relevant Information</div>
  </div>
</template>

<script setup>
import HeatMap from './HeatMap.vue';
import NodeLinkGraph from './NodeLinkGraph.vue';
</script>

<style scoped>
.dashboard-container {
  @apply grid bg-gray-100 h-full w-full;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: repeat(10, 1fr);
  padding: 1rem;
  gap: 1rem;
  box-sizing: border-box;
}

.dashboard__item {
  @apply bg-white border border-solid border-gray-200 rounded-sm shadow-md p-4;
  @apply font-sans;
}

.prediction-view {
  @apply col-span-6 row-span-1;
}

.result-view {
  @apply col-span-4 row-span-1;
}

.explanation-view {
  @apply col-span-4 row-span-1;
}

.information-view {
  @apply col-span-6 row-span-1;
}
</style>
