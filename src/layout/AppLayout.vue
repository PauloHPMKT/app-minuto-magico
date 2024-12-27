<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from "@iconify/vue";
import Content from './Content.vue';
import logo from '../assets/img/logo-mm.png';

const modalAction = ref(false);

function toggleModalActions() {
  modalAction.value = !modalAction.value;
}
</script>

<template>
  <div class="h-screen">
    <header class="flex justify-between items-center bg-blue-500 h-[60px] md:px-8">
      <div class="w-20">
        <img
          :src="logo"
          alt="Logo Minuto Mágico"
          class="w-full"
        />
      </div>
      <div
        @click="toggleModalActions"
        class="pl-4 py-2 cursor-pointer relative">
        <Icon
          icon="tabler:menu-4"
          width="30"
          height="30"
          class="text-white mr-4"
        />
      </div>
      <div
        v-show="modalAction"
        class="w-[250px] fixed z-20 bg-white rounded-md shadow-md top-14 right-0">
        <div class="px-6 py-2">
          <nav class="py-2">
            <ul>
              <li>
                <label for="" class="flex items-center justify-between">
                  <p>Habilitar alertas sonoro</p>
                  <input type="checkbox" />
                </label>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <main>
      <Content />
    </main>
  </div>
</template>
