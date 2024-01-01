<script setup>
import SearchBox from './SearchBox.vue'
</script>

<template>
  <div class="header">
    <div class="header-content">
      <span>MDA-EXPLOER</span>
      <div class="right-align">
        <!-- <SearchBox /> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  @apply bg-blue-500 h-16 w-full top-0 left-0 z-50;
}

.header-content {
  @apply flex justify-between items-center h-full w-full px-4 font-bold text-white text-2xl font-serif;
  box-sizing: border-box;
}

.right-align {
  @apply flex items-center px-4;
}
</style>
