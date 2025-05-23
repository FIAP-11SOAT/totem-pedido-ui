<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-md p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">Painel Administrativo</h1>
        <NuxtLink to="/" class="text-emerald-600 hover:text-emerald-700">
          Voltar ao Início
        </NuxtLink>
      </div>
    </header>

    <div class="container mx-auto p-4">
      <div class="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div class="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-800">Pedidos em Andamento</h2>
          <NuxtLink to="/admin/listagem"
            class="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded hover:bg-emerald-700 transition-colors">
            Listagem de Produtos e Categorias
          </NuxtLink>
        </div>


        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pedido
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horário
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Itens
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="pedido in pedidos" :key="pedido.numero">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium text-gray-900">#{{ pedido.numero }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ pedido.cliente }}</div>
                  <div class="text-sm text-gray-500">{{ pedido.cpf }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatarHora(pedido.horaPedido) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ pedido.quantidadeItens }} itens</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">R$ {{ pedido.total.toFixed(2) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                    getStatusClass(pedido.status)
                  ]">
                    {{ getStatusText(pedido.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button @click="avancarStatus(pedido)" :disabled="pedido.status === 4" :class="[
                      'px-3 py-1 rounded text-xs font-medium',
                      pedido.status < 4
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    ]">
                      Avançar Status
                    </button>
                    <button @click="verDetalhes(pedido)"
                      class="px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium hover:bg-blue-200">
                      Detalhes
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="pedidos.length === 0" class="text-center py-8">
          <p class="text-gray-500">Nenhum pedido em andamento</p>
        </div>
      </div>

      <!-- Modal de Detalhes do Pedido -->
      <div v-if="pedidoSelecionado" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div class="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-800">Detalhes do Pedido #{{ pedidoSelecionado.numero }}</h3>
            <button @click="pedidoSelecionado = null" class="text-gray-500 hover:text-gray-700">
              <Icon name="lucide:x" class="w-5 h-5" />
            </button>
          </div>

          <div class="p-4">
            <div class="mb-4">
              <h4 class="font-medium text-gray-800 mb-2">Informações do Cliente</h4>
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="text-gray-600">Nome:</div>
                <div>{{ pedidoSelecionado.cliente }}</div>
                <div class="text-gray-600">CPF:</div>
                <div>{{ pedidoSelecionado.cpf }}</div>
              </div>
            </div>

            <div class="mb-4">
              <h4 class="font-medium text-gray-800 mb-2">Itens do Pedido</h4>
              <div class="space-y-2">
                <div v-for="(item, index) in pedidoSelecionado.itens" :key="index"
                  class="flex justify-between py-2 border-b border-gray-100">
                  <div>
                    <span class="font-medium">{{ item.quantidade }}x</span> {{ item.nome }}
                  </div>
                  <div class="font-medium">R$ {{ (item.preco * item.quantidade).toFixed(2) }}</div>
                </div>
              </div>
            </div>

            <div class="mb-4">
              <h4 class="font-medium text-gray-800 mb-2">Resumo</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Subtotal:</span>
                  <span>R$ {{ pedidoSelecionado.subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Taxa de Serviço:</span>
                  <span>R$ {{ pedidoSelecionado.taxaServico.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>R$ {{ pedidoSelecionado.total.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <div class="mb-4">
              <h4 class="font-medium text-gray-800 mb-2">Pagamento</h4>
              <div class="text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Método:</span>
                  <span>{{ pedidoSelecionado.metodoPagamento }}</span>
                </div>
              </div>
            </div>

            <div class="flex justify-end space-x-2 mt-6">
              <button @click="pedidoSelecionado = null"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                Fechar
              </button>
              <button @click="avancarStatus(pedidoSelecionado); pedidoSelecionado = null"
                :disabled="pedidoSelecionado.status === 4" :class="[
                  'px-4 py-2 rounded',
                  pedidoSelecionado.status < 4
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                ]">
                Avançar Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Dados simulados de pedidos
const pedidos = ref([
  {
    numero: '12345',
    cliente: 'João Silva',
    cpf: '123.456.789-00',
    horaPedido: new Date(new Date().getTime() - 15 * 60000), // 15 minutos atrás
    quantidadeItens: 3,
    subtotal: 43.70,
    taxaServico: 4.37,
    total: 48.07,
    status: 1, // 1: Recebido, 2: Em Preparação, 3: Pronto, 4: Entregue
    metodoPagamento: 'Cartão de Crédito',
    itens: [
      { nome: 'X-Burger', quantidade: 2, preco: 18.90 },
      { nome: 'Refrigerante', quantidade: 1, preco: 5.90 }
    ]
  },
  {
    numero: '12346',
    cliente: 'Maria Oliveira',
    cpf: '987.654.321-00',
    horaPedido: new Date(new Date().getTime() - 10 * 60000), // 10 minutos atrás
    quantidadeItens: 2,
    subtotal: 24.80,
    taxaServico: 2.48,
    total: 27.28,
    status: 2,
    metodoPagamento: 'Pix',
    itens: [
      { nome: 'X-Salada', quantidade: 1, preco: 20.90 },
      { nome: 'Água', quantidade: 1, preco: 3.90 }
    ]
  },
  {
    numero: '12347',
    cliente: 'Pedro Santos',
    cpf: '456.789.123-00',
    horaPedido: new Date(new Date().getTime() - 20 * 60000), // 20 minutos atrás
    quantidadeItens: 4,
    subtotal: 89.90,
    taxaServico: 8.99,
    total: 98.89,
    status: 3,
    metodoPagamento: 'Dinheiro',
    itens: [
      { nome: 'Combo Família', quantidade: 1, preco: 89.90 }
    ]
  }
]);

const pedidoSelecionado = ref(null);

// Métodos
const formatarHora = (data) => {
  return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

const getStatusText = (status) => {
  switch (status) {
    case 1: return 'Recebido';
    case 2: return 'Em Preparação';
    case 3: return 'Pronto';
    case 4: return 'Entregue';
    default: return 'Desconhecido';
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case 1: return 'bg-blue-100 text-blue-800';
    case 2: return 'bg-yellow-100 text-yellow-800';
    case 3: return 'bg-emerald-100 text-emerald-800';
    case 4: return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const avancarStatus = (pedido) => {
  if (pedido.status < 4) {
    pedido.status += 1;
  }
};

const verDetalhes = (pedido) => {
  pedidoSelecionado.value = { ...pedido };
};
</script>