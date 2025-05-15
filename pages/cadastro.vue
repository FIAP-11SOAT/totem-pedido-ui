<script setup lang="ts">
</script>
<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-800">Cadastro de Cliente</h1>
        <p class="mt-2 text-gray-600">Preencha seus dados para continuar</p>
      </div>
      
      <form @submit.prevent="cadastrarUsuario" class="mt-8 space-y-6">
        <div>
          <label for="nome" class="block text-sm font-medium text-gray-700">Nome Completo</label>
          <div class="mt-1">
            <input 
              id="nome" 
              v-model="nome" 
              type="text" 
              required 
              placeholder="Digite seu nome completo"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
          <div class="mt-1">
            <input 
              id="email" 
              v-model="email" 
              type="email" 
              required 
              placeholder="seu@email.com"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>
        
        <div class="flex items-center justify-between space-x-4">
          <NuxtLink to="/cpf" class="flex items-center justify-center w-1/2 px-4 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
            <span class="font-medium">Voltar</span>
          </NuxtLink>
          
          <button 
            type="submit" 
            class="flex items-center justify-center w-1/2 px-4 py-3 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <span class="font-medium">Cadastrar</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const nome = ref('');
const email = ref('');
const router = useRouter();

const cadastrarUsuario = () => {
  // Aqui você implementaria a lógica para salvar o usuário no banco de dados
  // Após o cadastro, redireciona para a página de produtos
  
  console.log('Usuário cadastrado:', { nome: nome.value, email: email.value });
  router.push('/produtos');
};
</script>
