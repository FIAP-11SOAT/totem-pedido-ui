<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
      <div class="flex justify-between items-center border-b pb-4 mb-4">
        <h2 class="text-xl font-semibold text-gray-800">Cadastro de Produto</h2>
        <button @click="handleClose" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">
          &times;
        </button>
      </div>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="nome" class="block text-sm font-medium text-gray-700">Nome</label>
          <input
            v-model="produto.name"
            id="nome"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label for="descricao" class="block text-sm font-medium text-gray-700">Descrição</label>
          <input
            v-model="produto.description"
            id="descricao"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label for="preco" class="block text-sm font-medium text-gray-700">Preço</label>
          <input
            v-model.number="produto.price"
            id="preco"
            type="number"
            step="0.01"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label for="categoria" class="block text-sm font-medium text-gray-700">ID da Categoria</label>
          <input
            v-model.number="produto.category_id"
            id="categoria"
            type="number"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div class="flex justify-end space-x-4 pt-4 border-t mt-6">
          <button type="button" @click="handleClose" class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors">
            Salvar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(['close']);
const props = defineProps<{ show: boolean }>();

const { $api } = useNuxtApp();

const produto = ref({
  name: '',
  description: '',
  price: null,
  category_id: null,
});

function resetForm() {
  produto.value = {
    name: '',
    description: '',
    price: null,
    category_id: null,
  };
}

function handleClose() {
  emit('close');
  resetForm();
}

async function submitForm() {
  try {
    await $api('/products', {
      method: 'POST',
      body: produto.value,
    });
    alert('Produto cadastrado com sucesso!');
    handleClose();
  } catch (error) {
    console.error(error);
    alert('Erro ao cadastrar produto.');
  }
}

watch(() => props.show, (val) => {
  if (val) resetForm();
});
</script>
