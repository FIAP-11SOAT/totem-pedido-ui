<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
      <!-- Header com título e botão de deletar -->
      <div class="flex items-center justify-between border-b pb-4 mb-6">
        <h1 class="text-xl font-semibold text-gray-800">Editar Categoria</h1>
        <button @click="deletarProduto" class="text-red-500 hover:text-red-700" title="Excluir Categoria">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a2 2 0 00-2-2H9a2 2 0 00-2 2m0 0H5m14 0h-2" />
          </svg>
        </button>
      </div>

      <!-- Formulário -->
      <form @submit.prevent="salvar" class="space-y-4">
        <div>
          <label for="nome" class="block text-sm font-medium text-gray-700">Nome</label>
          <input
            v-model="categoria.name"
            id="nome"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label for="descricao" class="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            v-model="categoria.description"
            id="descricao"
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div class="flex justify-between items-center pt-4 border-t mt-6">
          <button
            type="button"
            @click="router.back()"
            class="px-6 py-3 text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            Voltar
          </button>
          <button
            type="submit"
            class="px-6 py-3 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Salvar Alterações
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
const categoria = ref({ id: 0, name: '', description: '' })

onMounted(async () => {
  try {
    const id = Number(route.params.id)
    const dados = await $api(`/categories/${id}`)
    categoria.value = dados
  } catch (err) {
    console.error('Erro ao carregar categoria', err)
  }
})

async function salvar() {
  try {
    await $api(`/categories/${categoria.value.id}`, {
      method: 'PUT',
      body: {
        name: categoria.value.name,
        description: categoria.value.description,
      },
    })
    router.push('/admin/listagem') // ajuste se necessário
  } catch (err) {
    console.error('Erro ao salvar categoria', err)
  }
}

async function deletarProduto() {
  const confirmacao = confirm('Tem certeza que deseja excluir este produto? Esta ação é irreversível.')
  if (!confirmacao) return

  try {
    await $api(`/categories/${categoria.value.id}`, {
      method: 'DELETE',
    })
    alert('Categoria excluída com sucesso!')
    router.push('/admin/listagem')
  } catch (error) {
    console.error(error)
    alert('Erro ao excluir categoria.')
  }
}
</script>
