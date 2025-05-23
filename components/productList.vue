<template>
  <div class="bg-white p-6 rounded-xl shadow">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Produtos</h2>
    <ul class="divide-y divide-gray-200">
      <li
        v-for="(product, index) in products"
        :key="index"
        @click="$emit('editar-produto', product.id)"
        class="flex items-start space-x-4 py-4 cursor-pointer hover:bg-gray-100 transition rounded-lg"
      >
        <img
          :src="product.image_url"
          alt="Imagem do produto"
          class="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p class="font-medium text-gray-900">
            {{ product.name }}
            <span class="text-gray-500">| {{ product.category?.name }}</span>
            <span class="text-gray-500">| {{ product.price.toFixed(2) }}</span>
          </p>
          <p class="text-sm text-gray-600 truncate">{{ product.description }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  products: Array<{
    id: number;
    name: string;
    price: number;
    description: string;
    image_url: string;
    category?: { name: string };
  }>;
}>()

defineEmits(['editar-produto'])
</script>
