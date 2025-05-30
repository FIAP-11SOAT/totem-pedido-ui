<template>
  <div class="bg-white p-6 rounded-xl shadow">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Categorias</h2>
    <ul class="divide-y divide-gray-200">
      <li
        v-for="(category, index) in categories"
        :key="category.id"
        class="py-2 text-gray-700 hover:bg-gray-50 px-2 rounded cursor-pointer transition-colors"
        @click="$emit('editar-categoria', category.id)"
      >
        {{ index + 1 }} | {{ category.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  categories: Array<{
    id: number;
    name: string;
  }>
}>()

defineEmits(['editar-categoria'])
</script>
