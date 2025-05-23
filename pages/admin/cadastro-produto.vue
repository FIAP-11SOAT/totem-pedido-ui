<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
      <div class="border-b pb-4 mb-6">
        <h1 class="text-xl font-semibold text-gray-800">Cadastro de Produtos</h1>
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

        <div>
          <label for="imagem" class="block text-sm font-medium text-gray-700">URL da Imagem</label>
          <input
            v-model="produto.image_url"
            id="imagem"
            type="url"
            placeholder="https://exemplo.com/imagem.jpg"
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
            Salvar Produto
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { $api } = useNuxtApp()

const produto = ref({
  name: '',
  description: '',
  price: null,
  category_id: null,
  image_url: '',
})

async function submitForm() {
  try {
    await $api('/products', {
      method: 'POST',
      body: produto.value,
    })
    alert('Produto cadastrado com sucesso!')
    resetForm()
  } catch (error) {
    console.error(error)
    alert('Erro ao cadastrar produto.')
  }
}

function resetForm() {
  produto.value = {
    name: '',
    description: '',
    price: null,
    category_id: null,
    image_url: '',
  }
}
</script>
