<template>
  <div class="min-h-screen bg-gray-100 pb-20">
    <header class="bg-white shadow-md p-4 sticky top-0 z-10">
      <div class="container mx-auto flex items-center">
        <NuxtLink to="/produtos" class="mr-4">
          <Icon name="lucide:arrow-left" class="w-6 h-6 text-gray-700" />
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-800">Seu Pedido</h1>
      </div>
    </header>
    
    <div class="container mx-auto p-4">
      <div v-if="carrinho.length === 0" class="text-center py-12">
        <Icon name="lucide:shopping-cart" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
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
              <img :src="item.imagem" :alt="item.nome" class="w-full h-full object-cover" />
            </div>
            
            <div class="flex-1">
              <h3 class="font-medium text-gray-800">{{ item.nome }}</h3>
              <p class="text-sm text-gray-600">R$ {{ item.preco.toFixed(2) }}</p>
            </div>
            
            <div class="flex items-center">
              <button 
                @click="diminuirQuantidade(item)"
                class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                <Icon name="lucide:minus" class="w-4 h-4" />
              </button>
              
              <span class="mx-3 w-6 text-center">{{ item.quantidade }}</span>
              
              <button 
                @click="aumentarQuantidade(item)"
                class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                <Icon name="lucide:plus" class="w-4 h-4" />
              </button>
            </div>
            
            <div class="ml-4 text-right">
              <p class="font-semibold text-gray-800">R$ {{ (item.preco * item.quantidade).toFixed(2) }}</p>
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

<script setup>
import { ref, computed } from 'vue';

// Simulando dados do carrinho
const carrinho = ref([
  { 
    id: 1, 
    nome: 'X-Burger', 
    descricao: 'Hambúrguer, queijo, alface, tomate e maionese', 
    preco: 18.90, 
    imagem: '/placeholder.svg?height=200&width=300', 
    quantidade: 2
  },
  { 
    id: 3, 
    nome: 'Refrigerante', 
    descricao: 'Lata 350ml', 
    preco: 5.90, 
    imagem: '/placeholder.svg?height=200&width=300', 
    quantidade: 2
  },
]);

const router = useRouter();

// Cálculos
const subtotal = computed(() => {
  return carrinho.value.reduce((total, item) => total + (item.preco * item.quantidade), 0);
});

const taxaServico = computed(() => {
  return subtotal.value * 0.1; // 10% de taxa de serviço
});

const total = computed(() => {
  return subtotal.value + taxaServico.value;
});

// Métodos
const aumentarQuantidade = (item) => {
  item.quantidade += 1;
};

const diminuirQuantidade = (item) => {
  if (item.quantidade > 1) {
    item.quantidade -= 1;
  } else {
    // Remover item do carrinho
    carrinho.value = carrinho.value.filter(i => i.id !== item.id);
  }
};

const finalizarPedido = () => {
  router.push('/pagamento');
};
</script>
