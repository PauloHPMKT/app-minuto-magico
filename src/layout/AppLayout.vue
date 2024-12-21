<script setup lang="ts">
import Content from './Content.vue';
</script>

<template>
  <div class="container mx-auto p-4">
    <header class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Vue 3 + Vite</h1>
      <nav>
        <router-link to="/" class="mr-4">Home</router-link>
        <router-link to="/about">About</router-link>
      </nav>
    </header>
    <main>
      <Content />
    </main>
  </div>
</template>
