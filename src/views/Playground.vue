<script setup lang="ts">
import { inject, onMounted, reactive, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import Overlay from '../components/Overlay/index.vue';
import MainButton from '../components/MainButton/index.vue';
import IncreaseMinutes from "../components/IncreaseMinutes/index.vue"
import { AddChildService } from "../services/trampoline/data/usecases/add-child/add-child.service";
import { GetChildrenService } from "../services/trampoline/data/usecases/get-children/get-children.service";
import type { Child } from "../types/child";

import { useValidation } from "../composables/useValidation";
import { useTimerStore } from "../store/timer";

const addChildService = inject<AddChildService>('addChildService');
const getChildrenService = inject<GetChildrenService>('getChildrenService');

const { formValidation } = useValidation();
const timerStore = useTimerStore();

const child = reactive<Child.ToCreate>({
  name: '',
  totalMinutes: '',
});
const selectedChildId = ref<string | null>(null);
const errorMessageModal = ref('');
const errorMessageForm = ref('');
const isErrorMessageForm = ref(false);
const isErrorMessageModal = ref(false);
const isModalActive = ref(false);

watch(child, (newChild) => {
  if (newChild) {
    cleanErrorStatusForm();
  }
});

async function addChild() {
  const isEmpty = formValidation(child);
  if (isEmpty) {
    errorMessageForm.value = isEmpty as string;
    isErrorMessageForm.value = true;
    return;
  }

  try {
    const res = await addChildService?.add({
      name: child.name,
      totalMinutes: child.totalMinutes,
    });

    if (res) {
      const newChild = {
        ...(res as Child.Created),
        timer: `${child.totalMinutes}:00`
      };
      timerStore.addChild(newChild)
    }
    await getChildren();
    cleanChild();
  } catch (error) {
    console.error(error);
  }
}

async function getChildren() {
  try {
    const res = await getChildrenService?.get();
    if (Array.isArray(res)) {
      const existingTimers = timerStore.children.reduce((acc, child) => {
        acc[child.id] = child.timer || `${child.totalMinutes}:00`;
        return acc;
      }, {} as Record<string, string>);

      const newChildren = res.map((child) => ({
        ...child,
        timer: existingTimers[child.id] || `${child.totalMinutes}:00`,
      })).sort((a, b) => b.createdAt.localeCompare(a.createdAt));

      timerStore.setChildren(newChildren);
    }
  } catch (error) {
    console.error(error);
  }
}

function finishPlayground(id: string) {
  console.log('finish playground', id);
}

function cleanErrorStatusForm() {
  isErrorMessageForm.value = false;
  errorMessageForm.value = '';
}

function cleanErrorStatusModal() {
  isErrorMessageModal.value = false;
  errorMessageModal.value = '';
}

function cleanChild() {
  child.name = '';
  child.totalMinutes = '';
}

function toggleModalActions(id?: string) {
  selectedChildId.value = id || null;
  isModalActive.value = !isModalActive.value;
  cleanErrorStatusModal();
}

onMounted(async () => {
  await getChildren();
});
</script>

<template>
  <div class="max-w-md mx-auto mt-7 bg-white rounded-xl shadow-md md:max-w-2xl h-[85vh]">
    <div class="h-full">
      <div class="bg-gray-200 py-6 px-4 overflow-hidden rounded-tl-xl rounded-tr-xl">
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
      <div class="py-6 overflow-hidden h-[70%]">
        <ul class="overflow-y-auto h-[93%]">
          <li v-for="child in timerStore.children" :key="child.id" class="relative">
            <Overlay v-if="isModalActive">
              <IncreaseMinutes
                :selectedId="selectedChildId"
                @toggleModal="toggleModalActions"
              />
            </Overlay>
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
                    <Icon
                      icon="heroicons:speaker-wave-16-solid"
                      width="18"
                      height="18"
                      class="ml-1"
                      :class="child.timer !== '0:00' ? 'text-blue-400' : 'text-green-600'"
                    />
                  </div>
                </div>
              </div>
              <div class="w-[30%] flex gap-2 justify-end">
                <div v-if="child.timer !== '0:00'" class="flex items-center">
                  <span class="text-[20px] font-semibold">{{ child.timer }}</span>
                </div>
                <MainButton v-else @click="toggleModalActions(child.id)" class="w-fit bg-blue-500 text-white">
                  <div class="flex items-center">
                    <Icon icon="tabler:stopwatch" width="24" height="24" />
                    +
                  </div>
                </MainButton>
                <MainButton
                  @click="finishPlayground(child.id)"
                  class="bg-blue-950 w-fit text-white"
                >
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
