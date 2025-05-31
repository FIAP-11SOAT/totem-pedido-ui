<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-800">Informe seu CPF</h1>
        <p class="mt-2 text-gray-600">Para continuar com seu pedido</p>
      </div>
      
      <form @submit.prevent="verificarCPF" class="mt-8 space-y-6">
        <div>
          <label for="cpf" class="block text-sm font-medium text-gray-700">CPF</label>
          <div class="mt-1">
            <input 
              id="cpf" 
              v-model="cpf" 
              type="text" 
              required 
              placeholder="000.000.000-00"
              v-mask="'###.###.###-##'"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>
        
        <div class="flex items-center justify-between space-x-4">
          <NuxtLink to="/" class="flex items-center justify-center w-1/2 px-4 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
            <span class="font-medium">Voltar</span>
          </NuxtLink>
          
          <button 
            type="submit" 
            class="flex items-center justify-center w-1/2 px-4 py-3 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <span class="font-medium">Continuar</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const { $api } = useNuxtApp();

const cpf = ref('');
const router = useRouter();

const removerCaracteres = (cpf) => {
    return cpf.replace(/\D/g, '');
  };

const verificarCPF = () => {
    
};
</script>
