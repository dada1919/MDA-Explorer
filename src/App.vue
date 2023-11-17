<script setup>
import TopHeader from './components/TopHeader.vue'
import MainDashboard from './views/MainDashboard.vue'
</script>

<template>
  <header class="header">
    <TopHeader />
  </header>
  <main class="main">
    <MainDashboard />
  </main>
</template>

<style scoped>
.main {
  @apply flex-1 overflow-hidden;
}
</style>
