<template>
  <div class="min-h-screen bg-gray-100 relative">
    <!-- Cabeçalho -->
    <header class="bg-white shadow-md p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">Painel Administrativo</h1>
        <NuxtLink to="/" class="text-emerald-600 hover:text-emerald-700">
          Voltar ao Início
        </NuxtLink>
      </div>
    </header>

    <!-- Conteúdo -->
    <div class="container mx-auto p-4">
      <div class="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div class="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-800">Pedidos em Andamento</h2>
          <NuxtLink to="/admin/listagem"
            class="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded hover:bg-emerald-700 transition-colors">
            Listagem de Produtos e Categorias
          </NuxtLink>
        </div>

        <!-- Tabela -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pedido</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horário</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="pedido in pedidos" :key="pedido.ID">
                <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">#{{ pedido.ID }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Cliente #{{ pedido.CustomerID }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatarHora(pedido.OrderDate) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R$ {{ pedido.TotalAmount.toFixed(2) }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[ 'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full', getStatusClass(pedido.Status) ]">
                    {{ getStatusText(pedido.Status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button @click="avancarStatus(pedido)" :disabled="pedido.Status === 'completed'" :class="[ pedido.Status !== 'completed' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed', 'px-3 py-1 rounded text-xs font-medium' ]">
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
    </div>

    <!-- Popup flutuante de Detalhes do Pedido -->
    <div v-if="mostrarModal" class="absolute top-6 right-6 z-30 w-full max-w-sm">
      <div class="bg-white border border-gray-200 rounded-lg shadow-xl p-6 relative">
        <button @click="mostrarModal = false" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          ✕
        </button>
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Detalhes do Pedido</h3>
        <div class="text-sm text-gray-700 space-y-2">
          <p><strong>Cliente ID:</strong> {{ pedidoSelecionado.CustomerID }}</p>
          <p><strong>Status:</strong> {{ getStatusText(pedidoSelecionado.Status) }}</p>
          <p><strong>Total:</strong> R$ {{ pedidoSelecionado.TotalAmount?.toFixed(2) }}</p>
          <p><strong>Data do Pedido:</strong> {{ new Date(pedidoSelecionado.OrderDate).toLocaleString('pt-BR') }}</p>
          <p><strong>Criado em:</strong> {{ new Date(pedidoSelecionado.CreatedAt).toLocaleString('pt-BR') }}</p>

          <div v-if="pedidoSelecionado.Items?.length">
            <p class="mt-4 font-medium">Itens:</p>
            <ul class="list-disc list-inside ml-2">
              <li v-for="item in pedidoSelecionado.Items" :key="item.ID">
                Produto #{{ item.ProductID }} — Qtd: {{ item.Quantity }} — R$ {{ item.Price.toFixed(2) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const { $api } = useNuxtApp()

// Reativas
const pedidos = ref([])
const pedidoSelecionado = ref(null)
const mostrarModal = ref(false)
const carregando = ref(false)

onMounted(async () => {
  try {
    carregando.value = true
    const res = await $api('/orders')
    pedidos.value = res
    console.log('Pedidos carregados:', pedidos.value)
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error)
  } finally {
    carregando.value = false
  }
})

const formatarHora = (dataIso) => {
  const d = new Date(dataIso)
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

// Texto legível para status
const getStatusText = (status) => {
  switch (status) {
    case 'pendente': return 'Pagamento Pendente'
    case 'recebido': return 'Recebido'
    case 'preparando': return 'Em Preparação'
    case 'pronto': return 'Pronto'
    case 'entregue': return 'Entregue'
    default: return 'Desconhecido'
  }
}

// Classes de cor para status
const getStatusClass = (status) => {
  switch (status) {
    case 'pendente': return 'bg-orange-100 text-orange-800'
    case 'recebido': return 'bg-blue-100 text-blue-800'
    case 'preparando': return 'bg-yellow-100 text-yellow-800'
    case 'pronto': return 'bg-emerald-100 text-emerald-800'
    case 'entregue': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

// Avança o status do pedido
const avancarStatus = async (pedido) => {
  const statusOrder = ['pendente', 'recebido', 'preparando', 'pronto', 'entregue']
  const currentIndex = statusOrder.indexOf(pedido.Status)

  if (currentIndex !== -1 && currentIndex < statusOrder.length - 1) {
    const novoStatus = statusOrder[currentIndex + 1]

    try {
      await $api(`/orders/${pedido.ID}`, {
        method: 'PUT',
        body: { status: novoStatus }
      })

      pedido.Status = novoStatus
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error)
    }
  }
}

// Busca detalhes do pedido e abre modal
const verDetalhes = async (pedido) => {
  try {
    const res = await $api(`/orders/${pedido.ID}`)
    pedidoSelecionado.value = res
    mostrarModal.value = true
  } catch (error) {
    console.error('Erro ao buscar detalhes do pedido:', error)
  }
}
</script>
