<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
    <NavBar />
    
    <main class="flex-grow">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>