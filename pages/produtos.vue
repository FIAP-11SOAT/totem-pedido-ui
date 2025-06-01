<script setup lang="ts">

import { Icon } from '@iconify/vue'

import { ref, computed, onMounted } from 'vue';
import { useCarrinhoStore } from '~/stores/carrinho';
import { useGlobalStore } from '~/stores/global';

import type { Product as BaseProduct } from '~/services/products-service';
type Product = BaseProduct & { quantidade?: number };

const { $api } = useNuxtApp();
const carrinhoStore = useCarrinhoStore();

const globalStore = useGlobalStore();

const categoriaAtual = ref(1);
const produtos = ref<Product[]>([]);

const carrinho = computed(() => carrinhoStore.carrinho);
const totalCarrinho = computed(() => carrinhoStore.totalCarrinho);

const categories = ref([
  { id: 1, name: 'Todos' },
  { id: 5, name: 'Lanches' },
  { id: 7, name: 'Acompanhamento' },
  { id: 6, name: 'Bebidas' },
  { id: 8, name: 'Sobremesas' },
]);

const choiceCategory = async (name: string) => {
  if (name === 'Todos') {
    const response = await $api<Product[]>('/products');
    produtos.value = response;
    return;
  }
  const response = await $api<Product[]>(`/products?category_name=${name}`);
  produtos.value = response;
};

onMounted(async () => {
  const response = await $api<Product[]>('/products');
  produtos.value = response;
});

const adicionarAoCarrinho = (produto: Product) => {
  carrinhoStore.adicionarAoCarrinho(produto);
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 pb-20">
    <header class="bg-white shadow-md p-4 sticky top-0 z-10">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">Cardápio</h1>
        <span class="">Bem Vindo: {{ globalStore.getUser?.name || "Anonymous" }}</span>
        <NuxtLink to="/carrinho" class="relative">
          <span class="sr-only">Carrinho</span>
          <div class="p-2 bg-emerald-100 rounded-full">
            <Icon icon="lucide:shopping-cart" :inline="true" class="w-6 h-6 text-emerald-600" />
          </div>
          <span v-if="carrinho.length > 0"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {{ carrinho.length }}
          </span>
        </NuxtLink>
      </div>
    </header>

    <div class="container mx-auto p-4">
      <div class="mb-6">
        <div class="flex overflow-x-auto space-x-2 py-4 px-2 -mx-2">
          <button v-for="categoria in categories" :key="categoria.id"
            @click="() => { categoriaAtual = categoria.id; choiceCategory(categoria.name); }" :class="[
              'px-4 py-2 rounded-full whitespace-nowrap transition-colors cursor-pointer',
              categoriaAtual === categoria.id
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            ]">
            {{ categoria.name }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="produto in produtos" :key="produto.id"
          class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="h-48 overflow-hidden">
            <img :src="produto.image_url" :alt="produto.name" class="w-full h-full object-cover" />
          </div>
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-800">{{ produto.name }}</h3>
            <p class="text-gray-600 text-sm mt-1 line-clamp-2">{{ produto.description }}</p>
            <div class="mt-4 flex justify-between items-center">
              <span class="text-lg font-bold text-emerald-700">R$ {{ produto.price.toFixed(2) }}</span>
              <button @click="adicionarAoCarrinho(produto)"
                class="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer">
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div>
          <p class="text-gray-600">
            Total: <span class="font-bold text-gray-800">R$ {{ totalCarrinho.toFixed(2) }}</span>
          </p>
        </div>
        <NuxtLink to="/carrinho" :class="[
          'px-6 py-3 rounded-lg transition-colors',
          carrinho.length > 0
            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        ]" :disabled="carrinho.length === 0">
          Ver Carrinho
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
