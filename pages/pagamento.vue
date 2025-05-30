<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-md p-4 sticky top-0 z-10">
      <div class="container mx-auto flex items-center">
        <NuxtLink to="/carrinho" class="mr-4">
          <Icon name="lucide:arrow-left" class="w-6 h-6 text-gray-700" />
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-800">Pagamento</h1>
      </div>
    </header>

    <div class="container mx-auto p-4">
      <div class="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-800">Resumo do Pedido</h2>
        </div>

        <div class="p-4">
          <div class="flex justify-between py-2">
            <span class="text-gray-600">{{ totalItens }} itens</span>
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

      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-800">Forma de Pagamento</h2>
        </div>

        <div class="p-4">
          <div class="space-y-4">
            <div v-for="metodo in metodosPagamento" :key="metodo.id" @click="metodoPagamentoSelecionado = metodo.id"
              :class="[
                'p-4 border rounded-lg cursor-pointer transition-colors',
                metodoPagamentoSelecionado === metodo.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:bg-gray-50'
              ]">
              <div class="flex items-center">
                <div class="mr-3">
                  <Icon :name="metodo.icone" class="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-800">{{ metodo.nome }}</h3>
                  <p class="text-sm text-gray-600">{{ metodo.descricao }}</p>
                </div>
                <div class="ml-auto">
                  <div :class="[
                    'w-6 h-6 rounded-full border-2',
                    metodoPagamentoSelecionado === metodo.id
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-gray-300'
                  ]">
                    <Icon v-if="metodoPagamentoSelecionado === metodo.id" name="lucide:check"
                      class="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
      <div class="container mx-auto">
        <button @click="confirmarPedido" :disabled="!metodoPagamentoSelecionado" :class="[
          'w-full py-3 rounded-lg text-white font-medium transition-colors',
          metodoPagamentoSelecionado
            ? 'bg-emerald-600 hover:bg-emerald-700'
            : 'bg-gray-300 cursor-not-allowed'
        ]">
          Confirmar Pedido
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCarrinhoStore } from '~/stores/carrinho';

const router = useRouter();
const carrinhoStore = useCarrinhoStore();
const carrinho = computed(() => carrinhoStore.carrinho);

const metodosPagamento = ref([
  { id: 1, nome: 'Cartão de Crédito', descricao: 'Visa, Mastercard, Elo, etc.', icone: 'lucide:credit-card' },
  { id: 2, nome: 'Cartão de Débito', descricao: 'Visa, Mastercard, Elo, etc.', icone: 'lucide:credit-card' },
  { id: 3, nome: 'Dinheiro', descricao: 'Pague na retirada', icone: 'lucide:banknote' },
  { id: 4, nome: 'Pix', descricao: 'Pagamento instantâneo', icone: 'lucide:qr-code' },
]);

const metodoPagamentoSelecionado = ref<number | null>(null);

const totalItens = computed(() => {
  return carrinho.value.reduce((total, item) => total + (item.quantidade || 1), 0);
});

const subtotal = computed(() => {
  return carrinho.value.reduce((total, item) => total + (item.price * (item.quantidade || 1)), 0);
});

const taxaServico = computed(() => subtotal.value * 0.1);
const total = computed(() => subtotal.value + taxaServico.value);

const confirmarPedido = () => {
  // Aqui você pode salvar o pedido, enviar pro backend ou armazenar localmente
  router.push('/confirmacao');
};
</script>
