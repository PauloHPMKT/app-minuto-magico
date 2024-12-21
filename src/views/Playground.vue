<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <div class="max-w-md mx-auto my-4 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl h-screen">
    <div class="bg-gray-200 py-6 px-4">
      <div class="mb-2 flex gap-2">
        <input
          type="text"
          class="w-[70%] p-2 border border-gray-300 rounded-md"
          placeholder="Insira o nome da crianca ou responsável"
        />
        <input
          type="text"
          class="w-[30%] p-2 border border-gray-300 rounded-md"
          placeholder="Minutos, Ex... 10"
        />
      </div>
      <div class="w-full mb-4">
        <button class="bg-blue-500 w-full text-white px-4 py-2 rounded-md">Começar a brincadeira</button>
      </div>
      <div class="w-full flex items-start justify-start">
        <div class="mt-2">
          <Icon icon="tabler:alert-circle" class="text-blue-500" width="20" height="20" />
        </div>
        <div class="pl-2">
          <small class="text-gray-500">* Insira o nome da criança ou responsável e a quantidade de mínutos para começar brincadeira</small><br>
          <small class="text-gray-500">* A quantidade mínima de minutos permitido é 10 minutos</small>
        </div>
      </div>
    </div>
    <div class="py-6">
      lista de menino pulando!!
    </div>
  </div>
  <!-- <div class="max-w-md mx-auto my-4 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl h-screen">
    <div class="md:flex">
      <div class="md:shrink-0">
        <img class="h-48 w-full object-cover md:h-full md:w-48" src="https://via.placeholder.com/150" alt="Modern building architecture">
      </div>
      <div class="p-8">
        <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div>
        <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible accommodation for your team</a>
        <p class="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.</p>
      </div>
    </div>
  </div> -->
</template>
