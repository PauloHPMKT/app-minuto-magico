<script setup lang="ts">
import Content from './Content.vue';
import logo from '../assets/img/logo-mm.png';
</script>

<template>
  <div class="h-screen">
    <header class="flex justify-between items-center bg-blue-500 h-[60px]">
      <div class="w-20">
        <img
          :src="logo"
          alt="Logo Minuto Mágico"
          class="w-full"
        />
      </div>
    </header>
    <main>
      <Content />
    </main>
  </div>
</template>
