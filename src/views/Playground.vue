<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import Overlay from '../components/Overlay/index.vue';
import MainButton from '../components/MainButton/index.vue';

const child = reactive({
  name: '',
  minutes: '',
});
const minutes = ref<string>('');
const errorMessageForm = ref<string>('');
const isErrorMessageForm = ref(false);
const errorMessageModal = ref<string>('');
const isErrorMessageModal = ref(false);
const isModalActive = ref(false);

watch([child, minutes], ([newChild, newMinutes]) => {
  if (newChild) {
    cleanErrorStatusForm();
  }
  if (newMinutes) {
    cleanErrorStatusModal();
  }
});

function teste() {
  const requiredFields: (keyof typeof child)[] = ['name', 'minutes'];
  for (const field of requiredFields) {
    if (!child[field as keyof typeof child]) {
      errorMessageForm.value = 'Preencha os campos corretamente';
      isErrorMessageForm.value = true;
      return;
    }
  }

  if (parseInt(child.minutes) < 10) {
    errorMessageForm.value = 'A quantidade mínima de minutos é 10 minutos';
    isErrorMessageForm.value = true;
    return;
  }

  alert(JSON.stringify({
    name: child.name,
    minutes: child.minutes,
  }));
}

function increaseMinutes() {
  if (!minutes.value || parseInt(minutes.value) < 10) {
    errorMessageModal.value = 'A quantidade mínima de minutos é 10 minutos';
    isErrorMessageModal.value = true;
    return;
  }
  alert('aumentar minutos' + minutes.value);
  cleanErrorStatusModal();
}

function cleanErrorStatusForm() {
  isErrorMessageForm.value = false;
  errorMessageForm.value = '';
}

function cleanErrorStatusModal() {
  isErrorMessageModal.value = false;
  errorMessageModal.value = '';
}

function toggleModalActions() {
  isModalActive.value = !isModalActive.value;
  cleanErrorStatusModal();
}
</script>

<template>
  <div
    class="max-w-md mx-auto mt-7 bg-white rounded-xl shadow-md md:max-w-2xl h-[85vh]"
  >
    <div class="h-full">
      <div
        class="bg-gray-200 py-6 px-4 overflow-hidden rounded-tl-xl rounded-tr-xl"
      >
        <div class="mb-2 flex gap-2" :class="isErrorMessageForm && 'mb-0'">
          <input
            type="text"
            v-model="child.name"
            class="w-[70%] p-2 border border-gray-300 rounded-md"
            placeholder="Insira o nome da crianca ou responsável"
          />
          <input
            type="text"
            v-model="child.minutes"
            class="w-[30%] p-2 border border-gray-300 rounded-md"
            placeholder="Minutos (10)"
          />
        </div>
        <span v-if="isErrorMessageForm" class="text-red-500">{{ errorMessageForm }}</span>
        <div class="w-full mb-4">
          <MainButton
            @click="teste"
            class="bg-blue-500 text-white"
          >
            Começar a brincadeira
          </MainButton>
        </div>
        <div class="w-full flex items-start justify-start">
          <div class="mt-2">
            <Icon
              icon="tabler:alert-circle"
              class="text-blue-500"
              width="20"
              height="20"
            />
          </div>
          <div class="pl-2">
            <p class="text-gray-500 text-sm">
              * Insira o nome da criança ou responsável e a quantidade de
              mínutos para começar a brincadeira
            </p>
            <p class="text-gray-500 text-sm">
              * A quantidade mínima de minutos permitido é 10 minutos
            </p>
          </div>
        </div>
      </div>
      <div>aqui ficarão algumas ações</div>
      <div class="py-6 overflow-hidden h-[70%] relative">

        <Overlay v-if="isModalActive">
          <div
            class="fixed bg-white py-2 px-4 shadow-md rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[400px]"
          >
            <Icon
              icon="ic:round-close"
              width="24"
              height="24"
              @click="toggleModalActions"
              class="float-right cursor-pointer"
            />
            <div class="my-4">
              <div class="mb-6">
                <h2 class="text-lg font-semibold">Nome da criança selecionada</h2>
                <p class="text-gray-500">adicione mais tempo à brincadeira: </p>
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
        </Overlay>

        <ul class="overflow-y-auto h-[93%]">
          <li>
            <div class="flex items-center border-b-[1px] py-2 px-6">
              <div class="flex items-center gap-2 w-[70%]">
                <div>
                  <h3 class="text-lg font-semibold">Nome da criança</h3>
                  <p class="text-gray-500">Tempo total: 10 minutos</p>
                </div>
              </div>
              <div class="w-[30%] flex gap-2 justify-end">
                <div class="flex items-center">
                  <span class="text-[20px] font-semibold">08:36</span>
                </div>
                <MainButton class="bg-blue-950 w-fit text-white">
                  Encerrar
                </MainButton>
              </div>
            </div>
          </li>
          <li>
            <div class="flex items-center border-b-[1px] py-2 px-6">
              <div class="flex items-center gap-2 w-[50%]">
                <div>
                  <h3 class="text-lg font-semibold">Nome da criança</h3>
                  <p class="text-gray-500">Tempo total: 10 minutos</p>
                </div>
              </div>
              <div class="w-[50%] flex gap-2 justify-end">
                <MainButton class="w-fit bg-blue-500 text-white" @click="toggleModalActions">
                  <div class="flex items-center">
                    <Icon icon="tabler:stopwatch" width="24" height="24" />
                    +
                  </div>
                </MainButton>
                <MainButton class="bg-blue-950 w-fit text-white">
                  Encerrar
                </MainButton>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
