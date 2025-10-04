<template>
  <div>
    <TheHeader />
  </div>
  <main>
    <RouterView />
  </main>
  <ToastContainer />
</template>

<script setup>
import TheHeader from './components/TheHeader.vue'
import ToastContainer from './components/ToastContainer.vue'
</script>

<style scoped></style>
