<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { Icon } from '@iconify/vue'

import { useCarrinhoStore } from '~/stores/carrinho';

const router = useRouter();
const carrinhoStore = useCarrinhoStore();

const carrinho = computed(() => carrinhoStore.carrinho);

const subtotal = computed(() =>
  carrinho.value.reduce((total: number, item: any) => total + (item.price * (item.quantidade || 1)), 0)
);

const taxaServico = computed(() => subtotal.value * 0.1);
const total = computed(() => subtotal.value + taxaServico.value);

const aumentarQuantidade = (item: any) => {
  item.quantidade = (item.quantidade || 1) + 1;
};

const diminuirQuantidade = (item: any) => {
  if ((item.quantidade || 1) > 1) {
    item.quantidade = (item.quantidade || 1) - 1;
  } else {
    carrinhoStore.carrinho = carrinhoStore.carrinho.filter((i: any) => i.id !== item.id);
  }
};

const finalizarPedido = () => {
  router.push('/pagamento');
};

</script>

<template>
  <div class="min-h-screen bg-gray-100 pb-20">
    <header class="bg-white shadow-md p-4 sticky top-0 z-10">
      <div class="container mx-auto flex items-center">
        <NuxtLink to="/produtos" class="mr-4">
          <Icon icon="lucide:arrow-left" class="w-6 h-6 text-gray-700" />
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-800">Seu Pedido</h1>
      </div>
    </header>

    <div class="container mx-auto p-4">
      <div v-if="carrinho.length === 0" class="text-center py-12">
        <Icon icon="lucide:shopping-cart" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 class="text-xl font-medium text-gray-700">Seu carrinho está vazio</h2>
        <p class="text-gray-500 mt-2">Adicione itens ao seu pedido</p>
        <NuxtLink to="/produtos" class="mt-6 inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
          Ver Cardápio
        </NuxtLink>
      </div>

      <div v-else class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-800">Itens do Pedido</h2>
        </div>

        <div class="divide-y divide-gray-200">
          <div 
            v-for="item in carrinho" 
            :key="item.id"
            class="p-4 flex items-center"
          >
            <div class="w-16 h-16 rounded-lg overflow-hidden mr-4">
              <img :src="item.image_url" :alt="item.name" class="w-full h-full object-cover" />
            </div>

            <div class="flex-1">
              <h3 class="font-medium text-gray-800">{{ item.name }}</h3>
              <p class="text-sm text-gray-600">R$ {{ item.price.toFixed(2) }}</p>
            </div>

            <div class="flex items-center">
              <button 
                @click="diminuirQuantidade(item)"
                class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                <Icon icon="lucide:minus" class="w-4 h-4" />
              </button>

              <span class="mx-3 w-6 text-center">{{ item.quantidade }}</span>

              <button 
                @click="aumentarQuantidade(item)"
                class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                <Icon icon="lucide:plus" class="w-4 h-4" />
              </button>
            </div>

            <div class="ml-4 text-right">
              <p class="font-semibold text-gray-800">R$ {{ (item.price * item.quantidade).toFixed(2) }}</p>
            </div>
          </div>
        </div>

        <div class="p-4 bg-gray-50">
          <div class="flex justify-between py-2">
            <span class="text-gray-600">Subtotal</span>
            <span class="font-medium">R$ {{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between py-2">
            <span class="text-gray-600">Taxa de serviço</span>
            <span class="font-medium">R$ {{ taxaServico.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between py-2 text-lg font-bold">
            <span>Total</span>
            <span>R$ {{ total.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
      <div class="container mx-auto">
        <button 
          @click="finalizarPedido"
          :disabled="carrinho.length === 0"
          :class="[
            'w-full py-3 rounded-lg text-white font-medium transition-colors',
            carrinho.length > 0 
              ? 'bg-emerald-600 hover:bg-emerald-700' 
              : 'bg-gray-300 cursor-not-allowed'
          ]"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  </div>
</template>
