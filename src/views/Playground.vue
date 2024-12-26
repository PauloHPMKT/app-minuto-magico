<script setup lang="ts">
import { inject, onMounted, reactive, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import Overlay from '../components/Overlay/index.vue';
import MainButton from '../components/MainButton/index.vue';
import { AddChildService } from "../services/trampoline/add-child/add-child.service";
import { GetChildrenService } from "../services/trampoline/get-children/get-children.service";
import type { Child } from "../types/child";

const addChildService = inject<AddChildService>('addChildService');
const getChildrenService = inject<GetChildrenService>('getChildrenService');

const child = reactive<Child.ToCreate>({
  name: '',
  totalMinutes: '',
});
const children = ref<Child.Created[]>([]);
const timerIntervals = ref<Record<string, number>>({});
const errorMessageModal = ref('');
const errorMessageForm = ref('');
const minutes = ref('');
const isErrorMessageForm = ref(false);
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

function counter(childId: string, time: number) {
  let totalSeconds = time * 60;

  timerIntervals.value[childId] = setInterval(() => {
    if (totalSeconds-- <= 0) {
      clearInterval(timerIntervals.value[childId]);
      return;
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    children.value.find(child => child.id === childId)!.timer =
      `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

async function addChild() {
  const requiredFields: (keyof typeof child)[] = ['name', 'totalMinutes'];
  for (const field of requiredFields) {
    if (!child[field as keyof typeof child]) {
      errorMessageForm.value = 'Preencha os campos corretamente';
      isErrorMessageForm.value = true;
      return;
    }
  }

  if (parseInt(child.totalMinutes) < 10) {
    errorMessageForm.value = 'A quantidade mínima de minutos é 10 minutos';
    isErrorMessageForm.value = true;
    return;
  }

  try {
    const res = await addChildService?.add({
      name: child.name,
      totalMinutes: parseInt(child.totalMinutes),
    });

    if (res) {
      const newChild = {
        ...(res as Child.Created),
        timer: `${child.totalMinutes}:00`
      };
      children.value.push(newChild);

      counter(newChild.id, parseInt(child.totalMinutes));
    }
    await getChildren();
  } catch (error) {
    console.error(error);
  }
}

async function getChildren() {
  try {
    const res = await getChildrenService?.get();
    if (Array.isArray(res)) {
      const existingTimers = children.value.reduce((acc, child) => {
        acc[child.id] = child.timer || `${child.totalMinutes}:00`;
        return acc;
      }, {} as Record<string, string>);

      children.value = res.map((child) => ({
        ...child,
        timer: existingTimers[child.id] || `${child.totalMinutes}:00`,
      }));
    }
  } catch (error) {
    console.error(error);
  }
}

async function increaseMinutes() {
  if (!minutes.value || parseInt(minutes.value) < 10) {
    errorMessageModal.value = 'A quantidade mínima de minutos é 10 minutos';
    isErrorMessageModal.value = true;
    return;
  }
  // tem que criar uma logica que capture o id do individuo adicionado para validar o incremento de tempo
  await addChild();
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

onMounted(async () => {
  await getChildren();
});
</script>

<template>
  <div
    class="max-w-md mx-auto mt-7 bg-white rounded-xl shadow-md md:max-w-2xl h-[85vh]"
  >
    <div class="h-full">
      <div
        class="bg-gray-200 py-6 px-4 overflow-hidden rounded-tl-xl rounded-tr-xl"
      >
        <div class="flex gap-2" :class="isErrorMessageForm ? 'mb-0' : 'mb-2'">
          <input
            type="text"
            v-model="child.name"
            class="w-[70%] p-2 border border-gray-300 rounded-md"
            placeholder="Insira o nome da crianca ou responsável"
          />
          <input
            type="text"
            v-model="child.totalMinutes"
            class="w-[30%] p-2 border border-gray-300 rounded-md"
            placeholder="Minutos (10)"
          />
        </div>
        <span v-if="isErrorMessageForm" class="text-red-500">{{ errorMessageForm }}</span>
        <div class="w-full mb-4">
          <MainButton
            @click="addChild"
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
            class="fixed bg-white pt-4 pb-6 px-4 shadow-md rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[400px]"
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
                <p class="text-gray-500">adicione mais tempo à brincadeira de </p>
                <h2 class="text-lg font-semibold">Nome da criança selecionada</h2>
                <small class="text-gray-500">Total acumulado: 20 minutos</small>
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
          <li v-for="child in children" :key="child.id">
            <div class="flex items-center border-b-[1px] py-2 px-6">
              <div class="flex items-center gap-2 w-[70%]">
                <div>
                  <h3 class="text-lg font-semibold">{{ child.name }}</h3>
                  <div class="flex items-center">
                    <p class="text-gray-500 mr-2">Tempo total: {{ child.totalMinutes }} minutos</p>
                    <Icon
                      icon="tabler:stopwatch"
                      width="18"
                      height="18"
                      :class="child.timer !== '0:00' ? 'text-blue-400' : 'text-green-600'"
                    />
                  </div>
                </div>
              </div>
              <div class="w-[30%] flex gap-2 justify-end">
                <div v-if="child.timer !== '0:00'" class="flex items-center">
                  <span class="text-[20px] font-semibold">{{ child.timer }}</span>
                </div>
                <MainButton v-else @click="toggleModalActions" class="w-fit bg-blue-500 text-white">
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
