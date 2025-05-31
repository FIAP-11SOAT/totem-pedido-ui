<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow-md p-4 sticky top-0 z-10">
      <div class="container mx-auto flex items-center">
        <NuxtLink to="/carrinho" class="mr-4">
          <Icon name="lucide:arrow-left" class="w-6 h-6 text-gray-700" />
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-800">Pagamento</h1>
      </div>
    </header>

    <!-- Resumo do Pedido -->
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

      <!-- Forma de Pagamento -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-800">Forma de Pagamento</h2>
        </div>
        <div class="p-4">
          <div class="space-y-4">
            <div
              v-for="metodo in metodosPagamento"
              :key="metodo.id"
              @click="metodoPagamentoSelecionado = metodo.id"
              :class="[
                'p-4 border rounded-lg cursor-pointer transition-colors',
                metodoPagamentoSelecionado === metodo.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:bg-gray-50'
              ]"
            >
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
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center',
                    metodoPagamentoSelecionado === metodo.id
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-gray-300'
                  ]">
                    <Icon v-if="metodoPagamentoSelecionado === metodo.id" name="lucide:check" class="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Botão de Confirmar Pedido -->
    <div class="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
      <div class="container mx-auto">
        <button
          @click="confirmarPedido"
          :disabled="!metodoPagamentoSelecionado"
          :class="[
            'w-full py-3 rounded-lg text-white font-medium transition-colors',
            metodoPagamentoSelecionado
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-gray-300 cursor-not-allowed'
          ]"
        >
          Confirmar Pedido
        </button>
      </div>
    </div>

    <!-- Modal do QR Code -->
    <div v-if="mostrarModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button @click="mostrarModal = false" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
        <h2 class="text-lg font-semibold mb-4 text-center">Escaneie o QR Code para pagar</h2>
        <img :src="qrcodeBase64" alt="QR Code" class="mx-auto mb-4 w-64 h-64" />
        <p class="text-sm break-words text-center bg-gray-100 p-2 rounded">
          {{ qrcodeString }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCarrinhoStore } from '~/stores/carrinho';

const { $api } = useNuxtApp();
const router = useRouter();
const carrinhoStore = useCarrinhoStore();

const carrinho = computed(() => carrinhoStore.carrinho);

const mostrarModal = ref(false);
const qrcodeBase64 = ref('');
const qrcodeString = ref('');

const metodoPagamentoSelecionado = ref<number | null>(null);

const metodosPagamento = [
  { id: 1, nome: 'Pix', descricao: 'Pagamento instantâneo', icone: 'lucide:qr-code' },
];

const totalItens = computed(() =>
  carrinho.value.reduce((total, item) => total + (item.quantidade || 1), 0)
);

const subtotal = computed(() =>
  carrinho.value.reduce((total, item) => total + ((item.price || 0) * (item.quantidade || 1)), 0)
);

const taxaServico = computed(() => subtotal.value * 0.1);
const total = computed(() => subtotal.value + taxaServico.value);

async function confirmarPedido() {
  if (!metodoPagamentoSelecionado.value) {
    alert('Selecione uma forma de pagamento.');
    return;
  }

  try {
    const orderPayload = {
      items: carrinho.value.map(item => ({
        product_id: item.id,
        quantity: item.quantidade > 0 ? item.quantidade : 1,
      })),
    };

    const orderResponse = await $api('/orders', {
      method: 'POST',
      body: orderPayload,
    });

    const orderId = orderResponse?.order_id;
    if (!orderId) throw new Error('Erro ao criar pedido. ID não retornado.');

    const paymentPayload = {
      order_id: Number(orderId),
      amount: Number(total.value.toFixed(2)),
      title: 'Pix',
    };

    const paymentResponse = await $api('/payments', {
      method: 'POST',
      body: paymentPayload,
    });

    if (paymentResponse.qrcode_b64 && paymentResponse.qrcode) {
      qrcodeBase64.value = paymentResponse.qrcode_b64;
      qrcodeString.value = paymentResponse.qrcode;
      mostrarModal.value = true;
    } else {
      throw new Error('QR Code não retornado.');
    }
  } catch (error) {
    console.error('[Erro] Falha ao confirmar pedido:', error);
    alert('Erro ao processar pagamento. Tente novamente.');
  }
}
</script>
