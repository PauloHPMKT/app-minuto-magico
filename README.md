# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).


<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div
    class="max-w-md mx-auto bg-white rounded-xl shadow-md md:max-w-2xl h-[90vh]"
  >
    <div class="bg-gray-200 py-6 px-4 overflow-hidden rounded-tl-xl rounded-tr-xl">
      <div class="mb-2 flex gap-2">
        <input
          type="text"
          class="w-[70%] p-2 border border-gray-300 rounded-md"
          placeholder="Insira o nome da crianca ou responsável"
        />
        <input
          type="text"
          class="w-[30%] p-2 border border-gray-300 rounded-md"
          placeholder="Minutos (10)"
        />
      </div>
      <div class="w-full mb-4">
        <button class="bg-blue-500 w-full text-white px-4 py-2 rounded-md">
          Começar a brincadeira
        </button>
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
          <small class="text-gray-500"
            >* Insira o nome da criança ou responsável e a quantidade de mínutos
            para começar a brincadeira</small
          ><br />
          <small class="text-gray-500"
            >* A quantidade mínima de minutos permitido é 10 minutos</small
          >
        </div>
      </div>
    </div>
    <div class="bg-red-200">
      Aqui terá um menu de ações
    </div>
    <div class="py-6 overflow-hidden h-[63%]">
      <div class="overflow-hidden">
        <ul class="overflow-y-auto">
          <li>
            <div class="flex items-center border-b-[1px] py-2 px-6">
              <div class="flex items-center gap-2 w-[70%]">
                <div>
                  <h3 class="text-lg font-semibold">Nome da criança</h3>
                  <p class="text-gray-500">Tempo total: 10 minutos</p>
                </div>
              </div>
              <div class="w-[30%] flex gap-2 justify-end">
                <!--
                aqui existirá uma logica que a principio mostrará o relogio do contador e após o
                encerramento do tempo será mostrado o botão de ações
              -->
                <div class="flex items-center">
                  <span class="text-[20px] font-semibold">08:36</span>
                </div>
                <!-- <button class="bg-blue-500 text-white px-4 py-2 rounded-md">Iniciar</button> -->
                <button class="bg-blue-950 text-white px-4 py-2 rounded-md">
                  Encerrar
                </button>
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
                <!-- <div class="flex items-center">
                <span class="text-[20px] font-semibold">05:43</span>
              </div> -->
              </div>
              <div class="w-[50%] flex gap-2 justify-end">
                <button class="bg-blue-500 text-white px-4 py-2 rounded-md">
                  <div class="flex items-center">
                    <Icon icon="tabler:stopwatch" width="24" height="24" />
                    +
                  </div>
                </button>
                <button class="bg-blue-950 text-white px-4 py-2 rounded-md">
                  Encerrar
                </button>
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
                <!-- <div class="flex items-center">
                <span class="text-[20px] font-semibold">05:43</span>
              </div> -->
              </div>
              <div class="w-[50%] flex gap-2 justify-end">
                <button class="bg-blue-500 text-white px-4 py-2 rounded-md">
                  <div class="flex items-center">
                    <Icon icon="tabler:stopwatch" width="24" height="24" />
                    +
                  </div>
                </button>
                <button class="bg-blue-950 text-white px-4 py-2 rounded-md">
                  Encerrar
                </button>
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
                <!-- <div class="flex items-center">
                <span class="text-[20px] font-semibold">05:43</span>
              </div> -->
              </div>
              <div class="w-[50%] flex gap-2 justify-end">
                <button class="bg-blue-500 text-white px-4 py-2 rounded-md">
                  <div class="flex items-center">
                    <Icon icon="tabler:stopwatch" width="24" height="24" />
                    +
                  </div>
                </button>
                <button class="bg-blue-950 text-white px-4 py-2 rounded-md">
                  Encerrar
                </button>
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
                <!-- <div class="flex items-center">
                <span class="text-[20px] font-semibold">05:43</span>
              </div> -->
              </div>
              <div class="w-[50%] flex gap-2 justify-end">
                <button class="bg-blue-500 text-white px-4 py-2 rounded-md">
                  <div class="flex items-center">
                    <Icon icon="tabler:stopwatch" width="24" height="24" />
                    +
                  </div>
                </button>
                <button class="bg-blue-950 text-white px-4 py-2 rounded-md">
                  Encerrar
                </button>
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
                <!-- <div class="flex items-center">
                <span class="text-[20px] font-semibold">05:43</span>
              </div> -->
              </div>
              <div class="w-[50%] flex gap-2 justify-end">
                <button class="bg-blue-500 text-white px-4 py-2 rounded-md">
                  <div class="flex items-center">
                    <Icon icon="tabler:stopwatch" width="24" height="24" />
                    +
                  </div>
                </button>
                <button class="bg-blue-950 text-white px-4 py-2 rounded-md">
                  Encerrar
                </button>
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
                <!-- <div class="flex items-center">
                <span class="text-[20px] font-semibold">05:43</span>
              </div> -->
              </div>
              <div class="w-[50%] flex gap-2 justify-end">
                <button class="bg-blue-500 text-white px-4 py-2 rounded-md">
                  <div class="flex items-center">
                    <Icon icon="tabler:stopwatch" width="24" height="24" />
                    +
                  </div>
                </button>
                <button class="bg-blue-950 text-white px-4 py-2 rounded-md">
                  Encerrar
                </button>
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
                <!-- <div class="flex items-center">
                <span class="text-[20px] font-semibold">05:43</span>
              </div> -->
              </div>
              <div class="w-[50%] flex gap-2 justify-end">
                <button class="bg-blue-500 text-white px-4 py-2 rounded-md">
                  <div class="flex items-center">
                    <Icon icon="tabler:stopwatch" width="24" height="24" />
                    +
                  </div>
                </button>
                <button class="bg-blue-950 text-white px-4 py-2 rounded-md">
                  Encerrar
                </button>
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
                <!-- <div class="flex items-center">
                <span class="text-[20px] font-semibold">05:43</span>
              </div> -->
              </div>
              <div class="w-[50%] flex gap-2 justify-end">
                <button class="bg-blue-500 text-white px-4 py-2 rounded-md">
                  <div class="flex items-center">
                    <Icon icon="tabler:stopwatch" width="24" height="24" />
                    +
                  </div>
                </button>
                <button class="bg-blue-950 text-white px-4 py-2 rounded-md">
                  Encerrar
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
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
