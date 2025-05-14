<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-gray-50 to-gray-200">
    <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-800">Bem-vindo ao Totem de Pedidos</h1>
        <p class="mt-2 text-gray-600">Faça seu pedido de forma rápida e fácil</p>
      </div>
      
      <div class="mt-8 space-y-4">
        <NuxtLink to="/cpf" class="flex items-center justify-center w-full px-4 py-3 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors">
          <span class="text-lg font-medium">Iniciar Pedido</span>
        </NuxtLink>
        
        <NuxtLink to="/monitor" class="flex items-center justify-center w-full px-4 py-3 text-emerald-700 bg-white border border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors">
          <span class="text-lg font-medium">Acompanhar Pedido</span>
        </NuxtLink>
        
        <NuxtLink to="/admin" class="mt-6 flex items-center justify-center w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
          <span>Área Administrativa</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
