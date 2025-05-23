<template>
  <header class="bg-white shadow-md p-4 mb-8">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">Listagem de Produtos e Categorias</h1>
      <NuxtLink to="/admin/admin" class="text-emerald-600 hover:text-emerald-700">
        Voltar à Área Administrativa
      </NuxtLink>
    </div>
  </header>
  <div class="flex justify-end space-x-4 mb-6 pr-4">
    <NuxtLink to="/admin/cadastro-categoria"
      class="px-6 py-3 bg-emerald-600 text-white text-sm font-medium rounded hover:bg-emerald-700 transition-colors">
      Cadastrar Categorias
    </NuxtLink>
    <NuxtLink to="/admin/cadastro-produto"
      class="px-6 py-3 bg-emerald-600 text-white text-sm font-medium rounded hover:bg-emerald-700 transition-colors">
      Cadastrar Produtos
    </NuxtLink>
  </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
    <ProductList :products="produtos" @editar-produto="irParaEdicao" />
    <CategoryList :categories="categorias" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const { $api } = useNuxtApp()

import ProductList from '../../components/productList.vue'
import CategoryList from '../../components/categoryList.vue'

const produtos = ref([])
const categorias = ref([])
const router = useRouter()

onMounted(async () => {
  try {
    const [resProdutos, resCategorias] = await Promise.all([
      $api('/products'),
      $api('/categories'),
    ])
    produtos.value = resProdutos
    categorias.value = resCategorias
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
  }
})

function irParaEdicao(productId: number) {
  router.push(`/admin/editar-produto/${productId}`)
}
</script>