<template>
  <header class="bg-white shadow-md p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800"> Listagem de Produtos e Categorias
      </h1>
      <NuxtLink to="/admin/admin" class="text-emerald-600 hover:text-emerald-700">
        Voltar a Area Administrativa
      </NuxtLink>
    </div>
  </header>

  <div class="min-h-screen bg-gray-100 py-12 px-6">
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
    <div class="w-full max-w-6xl bg-white p-6 rounded-xl shadow-lg mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Categorias -->
        <!--><CategoryTable :categories="categorias" />-->

        <!-- Produtos -->
        <!--<ProductTable :products="produtos" />-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const { $api } = useNuxtApp()

const categorias = ref([])
const produtos = ref([])


//RESOLVER ESSE BO
// onMounted(async () => {
//   try {
//     const [resCategorias, resProdutos] = await Promise.all([
//       $api('/categories'),
//       $api('/products'),
//     ])
//     categorias.value = resCategorias
//     produtos.value = resProdutos
//   } catch (err) {
//     console.error('Erro ao buscar dados:', err)
//   }
// })
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export const CategoryTable = defineComponent({
  name: 'CategoryTable',
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  template: `
    <div>
      <h2 class="text-lg font-medium text-gray-700 mb-2">Categorias</h2>
      <el-table :data="categories" style="width: 100%">
        <el-table-column prop="name" label="Nome" />
        <el-table-column prop="description" label="Descrição" />
      </el-table>
    </div>
  `
})

export const ProductTable = defineComponent({
  name: 'ProductTable',
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  template: `
    <div>
      <h2 class="text-lg font-medium text-gray-700 mb-2">Produtos</h2>
      <el-table :data="products" style="width: 100%">
        <el-table-column prop="name" label="Nome" />
        <el-table-column label="Imagem">
          <template #default="scope">
            <img :src="scope.row.image_url" class="w-16 h-16 object-cover rounded-md" />
          </template>
        </el-table-column>

        <el-table-column prop="description" label="Descrição" />
        <el-table-column prop="price" label="Preço" />
        <el-table-column prop="preparation_time" label="Tempo de preparo (min)" />
      </el-table>
    </div>
  `
})
</script>
