<script setup lang="ts">
import { useRouter, useNuxtApp, ref } from '#imports';

import { toast, type ToastOptions } from 'vue3-toastify'

import { useGlobalStore } from '@/stores/global';
import { isValidCPF, unformatCPF } from '@/shared/utils/cpf-validator.ts';

const defaultToastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  transition: 'slide',
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const Alert = (message: string) => {
  toast.info(message, defaultToastOptions)
}

const router = useRouter();
const { $api } = useNuxtApp();

const globalStore = useGlobalStore();

const cpf = ref('')

async function GetCustomer(cpf: string) {
  try {
    return await $api('/customer', { params: { taxid: cpf } });
  } catch (error) {
    return undefined;
  }
}

async function FindCustomer() {
  const isValid = isValidCPF(cpf.value);
  if (!isValid) {
    Alert('CPF inválido. Por favor, verifique e tente novamente.');
    return;
  }

  const customer = await GetCustomer(unformatCPF(cpf.value));
  if (!customer) {
    Alert('Cadastro não encontrado. Por favor, realize o cadastro.');
    router.push('/cadastro');
    return
  }

  Alert('Bem Vindo(a) ' + customer.Name);
  globalStore.setUser({ user_id: customer.ID, name: customer.Name, email: customer.Email });
  
  await sleep(1500);
  router.push('/produtos');
}

function withoutCustomer() {
  globalStore.setUser(null);
  router.push('/produtos');
}

</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-800">Informe seu CPF</h1>
        <p class="mt-2 text-gray-600">Para continuar com seu pedido</p>
      </div>

      <form @submit.prevent="FindCustomer" class="mt-8 space-y-6">
        <div>
          <label for="cpf" class="block text-sm font-medium text-gray-700">CPF</label>
          <div class="mt-1">
            <input id="cpf" v-model="cpf" type="text" required placeholder="000.000.000-00"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
        </div>

        <div class="flex items-center justify-between space-x-4">
          <buttom type="buttom" @click="withoutCustomer"
            class="flex items-center justify-center w-1/2 px-4 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer">
            <span class="font-medium">Sem Indentificar</span>
          </buttom> 

          <button type="button" @click="FindCustomer"
            class="flex items-center justify-center w-1/2 px-4 py-3 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer">
            <span class="font-medium">Continuar</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>