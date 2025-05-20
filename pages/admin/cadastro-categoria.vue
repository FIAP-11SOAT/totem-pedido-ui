<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
      <div class="border-b pb-4 mb-6">
        <h1 class="text-xl font-semibold text-gray-800">Cadastro de Categorias</h1>
      </div>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="nome" class="block text-sm font-medium text-gray-700">Nome</label>
          <input
            v-model="categoria.name"
            id="nome"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label for="descricao" class="block text-sm font-medium text-gray-700">Descrição</label>
          <input
            v-model="categoria.description"
            id="descricao"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div class="flex justify-between items-center pt-4 border-t mt-6">
          <button
            type="button"
            @click="$router.back()"
            class="px-6 py-3 text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            Voltar
          </button>
          <button
            type="submit"
            class="px-6 py-3 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Salvar Categoria
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { $api } = useNuxtApp()

const categoria = ref({
  name: '',
  description: '',
})

async function submitForm() {
  try {
    await $api('/categories', {
      method: 'POST',
      body: categoria.value,
    })
    alert('Categoria cadastrada com sucesso!')
    resetForm()
  } catch (error) {
    console.error(error)
    alert('Erro ao cadastrar categoria.')
  }
}

function resetForm() {
  categoria.value = {
    name: '',
    description: '',
  }
}
</script>
