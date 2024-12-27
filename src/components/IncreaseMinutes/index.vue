<script setup lang="ts">
import { defineEmits, ref } from 'vue';
import { Icon } from '@iconify/vue'
import MainButton from '../MainButton/index.vue';
import { useTimerStore } from '../../store/timer';

const timerStore = useTimerStore();

const minutes = ref('');
const errorMessageModal = ref('');
const isErrorMessageModal = ref(false);

const props = defineProps({
  selectedId: {
    type: [String, null],
  },
});
const emit = defineEmits(['toggleModal']);

function toggleModalActions() {
  emit('toggleModal');
}

function increaseMinutes() {
  if (!minutes.value || parseInt(minutes.value) < 10) {
    errorMessageModal.value = 'A quantidade mínima de minutos é 10 minutos';
    isErrorMessageModal.value = true;
    return;
  }
  // tem que criar uma logica que capture o id do individuo adicionado para validar o incremento de tempo
  //cleanErrorStatusModal();
}
</script>

<template>
  <div class="bg-white pt-4 pb-6 px-4 shadow-md rounded-lg min-w-[400px]">
    <Icon
      icon="ic:round-close"
      width="24"
      height="24"
      @click="toggleModalActions"
      class="float-right cursor-pointer"
    />
    <div class="my-4">
      <div class="mb-6">
        <p class="text-gray-500">adicione mais tempo à brincadeira de</p>
        <h2 class="text-lg font-semibold">
          {{ timerStore.children.find((child) => child.id === props.selectedId)?.name }}
        </h2>
        <small class="text-gray-500">
          Total acumulado: {{
            timerStore.children.find((child) => child.id === props.selectedId)?.totalMinutes
          }} minutos
        </small>
      </div>
      <div class="flex gap-2 mt-2">
        <input
          type="text"
          v-model="minutes"
          class="w-[70%] p-2 border border-gray-300 rounded-md"
          placeholder="Minutos (10)"
        />
        <MainButton class="bg-blue-500 text-white" @click="increaseMinutes">
          Adicionar
        </MainButton>
      </div>
      <span v-if="isErrorMessageModal" class="text-red-500">{{ errorMessageModal }}</span>
    </div>
  </div>
</template>
