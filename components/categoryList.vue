<template>
  <div class="bg-white p-6 rounded-xl shadow">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Categorias</h2>
    <ul class="divide-y divide-gray-200">
      <li v-for="(category, index) in categories" :key="index" class="py-2 text-gray-700">
        {{ index + 1 }} | {{ category.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  categories: Array<{
    name: string;
  }>
}>()
</script>
