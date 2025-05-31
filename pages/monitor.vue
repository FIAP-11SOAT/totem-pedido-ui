<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-md p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">Monitor de Pedidos</h1>
        <NuxtLink to="/" class="text-emerald-600 hover:text-emerald-700">
          Voltar ao Início
        </NuxtLink>
      </div>
    </header>
    
    <div class="container mx-auto p-4">
      <div class="mb-6">
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="p-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-800">Consultar Pedido</h2>
          </div>
          
          <div class="p-4">
            <div class="flex space-x-4">
              <div class="flex-1">
                <input 
                  v-model="numeroPedidoBusca" 
                  type="text" 
                  placeholder="Digite o número do pedido" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="pedido in pedidosEmAndamento" 
          :key="pedido.numero"
          class="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div class="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="font-semibold text-gray-800">Pedido #{{ pedido.numero }}</h3>
            <span 
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                getStatusClass(pedido.status)
              ]"
            >
              {{ getStatusText(pedido.status) }}
            </span>
          </div>
          
          <div class="p-4">
            <div class="mb-4">
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-600">Progresso</span>
                <span class="font-medium">{{ getProgressoTexto(pedido.status) }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  :class="['bg-emerald-600 h-2.5 rounded-full', getProgressoWidth(pedido.status)]"
                ></div>
              </div>
            </div>
            
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Horário do Pedido:</span>
                <span class="font-medium">{{ formatarHora(pedido.horaPedido) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Tempo Estimado:</span>
                <span class="font-medium">{{ pedido.tempoEstimado }} min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="pedidosEmAndamento.length === 0" class="text-center py-12">
        <Icon name="lucide:clipboard-list" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 class="text-xl font-medium text-gray-700">Nenhum pedido em andamento</h2>
        <p class="text-gray-500 mt-2">Os pedidos aparecerão aqui quando forem realizados</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
const { $api } = useNuxtApp()

const numeroPedidoBusca = ref('')
const pedidos = ref([])
const pedidosEmAndamento = ref([])
const carregando = ref(false)

const formatarHora = (dataIso) => {
  const d = new Date(dataIso)
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

const getStatusText = (status) => {
  switch (status) {
    case 1: return 'Recebido'
    case 2: return 'Em Preparação'
    case 3: return 'Pronto'
    case 4: return 'Entregue'
    default: return 'Desconhecido'
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case 1: return 'bg-blue-100 text-blue-800'
    case 2: return 'bg-yellow-100 text-yellow-800'
    case 3: return 'bg-emerald-100 text-emerald-800'
    case 4: return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getProgressoTexto = (status) => {
  switch (status) {
    case 1: return '25%'
    case 2: return '50%'
    case 3: return '75%'
    case 4: return '100%'
    default: return '0%'
  }
}

const getProgressoWidth = (status) => {
  switch (status) {
    case 1: return 'w-1/4'
    case 2: return 'w-1/2'
    case 3: return 'w-3/4'
    case 4: return 'w-full'
    default: return 'w-0'
  }
}

const mapStatusTextoParaCodigo = (texto) => {
  switch (texto?.toLowerCase()) {
    case 'recebido': return 1
    case 'preparando': return 2
    case 'pronto': return 3
    case 'entregue': return 4
    default: return 0
  }
}

// Carrega todos os pedidos inicialmente
onMounted(async () => {
  try {
    carregando.value = true
    const res = await $api('/orders')
    pedidos.value = res

    // Exibe todos os em andamento no início
    pedidosEmAndamento.value = res
      .filter(p => ['recebido', 'preparando', 'pronto'].includes(p.Status))
      .map(p => ({
        numero: p.ID,
        status: mapStatusTextoParaCodigo(p.Status),
        horaPedido: p.OrderDate,
        tempoEstimado: 15,
      }))
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error)
  } finally {
    carregando.value = false
  }
})

// Atualiza automaticamente ao digitar
watch(numeroPedidoBusca, async (value) => {
  const trimmed = value.trim()

  if (!trimmed) {
    // Se campo vazio, mostra todos os pedidos em andamento
    pedidosEmAndamento.value = pedidos.value
      .filter(p => ['recebido', 'preparando', 'pronto'].includes(p.Status))
      .map(p => ({
        numero: p.ID,
        status: mapStatusTextoParaCodigo(p.Status),
        horaPedido: p.OrderDate,
        tempoEstimado: 15,
      }))
    return
  }

  const id = Number(trimmed)
  if (!id || isNaN(id)) {
    pedidosEmAndamento.value = []
    return
  }

  try {
    const res = await $api(`/orders/${id}`)
    const statusCode = mapStatusTextoParaCodigo(res.Status)

    if ([1, 2, 3].includes(statusCode)) {
      pedidosEmAndamento.value = [{
        numero: res.ID,
        status: statusCode,
        horaPedido: res.OrderDate,
        tempoEstimado: 15,
      }]
    } else {
      pedidosEmAndamento.value = []
    }
  } catch (error) {
    pedidosEmAndamento.value = []
  }
})
</script>
