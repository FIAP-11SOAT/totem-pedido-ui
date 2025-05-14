<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-md p-4">
      <div class="container mx-auto text-center">
        <h1 class="text-2xl font-bold text-gray-800">Pedido Confirmado!</h1>
      </div>
    </header>
    
    <div class="container mx-auto p-4">
      <div class="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div class="p-6 text-center">
          <div class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="lucide:check" class="w-10 h-10 text-emerald-600" />
          </div>
          
          <h2 class="text-xl font-bold text-gray-800 mb-2">Pedido #{{ numeroPedido }}</h2>
          <p class="text-gray-600 mb-4">Seu pedido foi recebido e está sendo preparado</p>
          
          <div class="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-medium">
            Tempo estimado: {{ tempoEstimado }} minutos
          </div>
        </div>
        
        <div class="p-4 bg-gray-50 border-t border-gray-200">
          <h3 class="font-medium text-gray-800 mb-3">Status do Pedido</h3>
          
          <div class="space-y-4">
            <div class="flex items-center">
              <div class="relative">
                <div class="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <Icon name="lucide:check" class="w-5 h-5 text-white" />
                </div>
                <div class="absolute top-8 left-1/2 transform -translate-x-1/2 h-8 w-0.5 bg-gray-300"></div>
              </div>
              <div class="ml-4">
                <p class="font-medium text-gray-800">Pedido Recebido</p>
                <p class="text-sm text-gray-500">{{ formatarHora(horaRecebido) }}</p>
              </div>
            </div>
            
            <div class="flex items-center">
              <div class="relative">
                <div :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  statusAtual >= 2 ? 'bg-emerald-600' : 'bg-gray-300'
                ]">
                  <Icon 
                    :name="statusAtual >= 2 ? 'lucide:check' : 'lucide:utensils'" 
                    :class="[
                      'w-5 h-5',
                      statusAtual >= 2 ? 'text-white' : 'text-gray-500'
                    ]" 
                  />
                </div>
                <div class="absolute top-8 left-1/2 transform -translate-x-1/2 h-8 w-0.5 bg-gray-300"></div>
              </div>
              <div class="ml-4">
                <p :class="[
                  'font-medium',
                  statusAtual >= 2 ? 'text-gray-800' : 'text-gray-500'
                ]">Em Preparação</p>
                <p class="text-sm text-gray-500">
                  {{ statusAtual >= 2 ? formatarHora(horaPreparacao) : 'Aguardando' }}
                </p>
              </div>
            </div>
            
            <div class="flex items-center">
              <div class="relative">
                <div :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  statusAtual >= 3 ? 'bg-emerald-600' : 'bg-gray-300'
                ]">
                  <Icon 
                    :name="statusAtual >= 3 ? 'lucide:check' : 'lucide:package'" 
                    :class="[
                      'w-5 h-5',
                      statusAtual >= 3 ? 'text-white' : 'text-gray-500'
                    ]" 
                  />
                </div>
                <div class="absolute top-8 left-1/2 transform -translate-x-1/2 h-8 w-0.5 bg-gray-300"></div>
              </div>
              <div class="ml-4">
                <p :class="[
                  'font-medium',
                  statusAtual >= 3 ? 'text-gray-800' : 'text-gray-500'
                ]">Pronto para Retirada</p>
                <p class="text-sm text-gray-500">
                  {{ statusAtual >= 3 ? formatarHora(horaPronto) : 'Aguardando' }}
                </p>
              </div>
            </div>
            
            <div class="flex items-center">
              <div>
                <div :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  statusAtual >= 4 ? 'bg-emerald-600' : 'bg-gray-300'
                ]">
                  <Icon 
                    :name="statusAtual >= 4 ? 'lucide:check' : 'lucide:hand-raised'" 
                    :class="[
                      'w-5 h-5',
                      statusAtual >= 4 ? 'text-white' : 'text-gray-500'
                    ]" 
                  />
                </div>
              </div>
              <div class="ml-4">
                <p :class="[
                  'font-medium',
                  statusAtual >= 4 ? 'text-gray-800' : 'text-gray-500'
                ]">Entregue</p>
                <p class="text-sm text-gray-500">
                  {{ statusAtual >= 4 ? formatarHora(horaEntregue) : 'Aguardando' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="text-center">
        <NuxtLink to="/" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
          Voltar ao Início
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Dados do pedido
const numeroPedido = ref('12345');
const tempoEstimado = ref(15);
const statusAtual = ref(1);

// Horários
const horaRecebido = ref(new Date());
const horaPreparacao = ref(null);
const horaPronto = ref(null);
const horaEntregue = ref(null);

// Formatar hora
const formatarHora = (data) => {
  if (!data) return '';
  return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

// Simulação de atualização do status
onMounted(() => {
  // Simular mudança para "Em Preparação" após 3 segundos
  setTimeout(() => {
    statusAtual.value = 2;
    horaPreparacao.value = new Date();
  }, 3000);
  
  // Simular mudança para "Pronto para Retirada" após 6 segundos
  setTimeout(() => {
    statusAtual.value = 3;
    horaPronto.value = new Date();
  }, 6000);
  
  // Simular mudança para "Entregue" após 9 segundos
  setTimeout(() => {
    statusAtual.value = 4;
    horaEntregue.value = new Date();
  }, 9000);
});
</script>
