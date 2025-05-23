<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
      <div class="border-b pb-4 mb-6 flex justify-between items-center">
        <h1 class="text-xl font-semibold text-gray-800">Editar Produto</h1>
        <button @click="deletarProduto" class="text-red-500 hover:text-red-700" title="Excluir Produto">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a2 2 0 00-2-2H9a2 2 0 00-2 2m0 0H5m14 0h-2" />
          </svg>
        </button>

      </div>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="nome" class="block text-sm font-medium text-gray-700">Nome</label>
          <input v-model="produto.name" id="nome" required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
        </div>

        <div>
          <label for="descricao" class="block text-sm font-medium text-gray-700">Descrição</label>
          <input v-model="produto.description" id="descricao"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
        </div>

        <div>
          <label for="preco" class="block text-sm font-medium text-gray-700">Preço</label>
          <input v-model.number="produto.price" id="preco" type="number" step="0.01" required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
        </div>

        <div>
          <label for="categoria" class="block text-sm font-medium text-gray-700">ID da Categoria</label>
          <input v-model.number="produto.category_id" id="categoria" type="number"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
        </div>

        <div>
          <label for="imagem" class="block text-sm font-medium text-gray-700">URL da Imagem</label>
          <input v-model="produto.image_url" id="imagem" type="url" placeholder="https://exemplo.com/imagem.jpg"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
        </div>

        <div class="flex justify-between items-center pt-4 border-t mt-6">
          <button type="button" @click="$router.back()"
            class="px-6 py-3 text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors">
            Voltar
          </button>
          <button type="submit"
            class="px-6 py-3 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors">
            Salvar Produto
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { $api } = useNuxtApp()
const route = useRoute()
const router = useRouter()

const produto = ref({
  name: '',
  description: '',
  price: null,
  category_id: null,
  image_url: '',
})

const id = route.params.id

onMounted(async () => {
  try {
    const data = await $api(`/products/${id}`)
    produto.value = data
  } catch (error) {
    console.error('Erro ao carregar produto:', error)
    alert('Erro ao carregar o produto.')
  }
})

async function submitForm() {
  try {
    await $api(`/products/${id}`, {
      method: 'PUT',
      body: produto.value,
    })
    alert('Produto atualizado com sucesso!')
    router.back()
  } catch (error) {
    console.error(error)
    alert('Erro ao atualizar produto.')
  }
}

async function deletarProduto() {
  const confirmacao = confirm('Tem certeza que deseja excluir este produto? Esta ação é irreversível.')
  if (!confirmacao) return

  try {
    await $api(`/products/${id}`, {
      method: 'DELETE',
    })
    alert('Produto excluído com sucesso!')
    router.push('/admin/listagem')
  } catch (error) {
    console.error(error)
    alert('Erro ao excluir produto.')
  }
}
</script>
