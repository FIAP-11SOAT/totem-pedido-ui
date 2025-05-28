import { defineStore } from 'pinia';
import type { Product as BaseProduct } from '~/services/user-service';

type Product = BaseProduct & { quantidade?: number };

export const useCarrinhoStore = defineStore('carrinho', {
  state: () => ({
    carrinho: [] as Product[],
  }),
  getters: {
    totalCarrinho: (state) => {
      return state.carrinho.reduce((total, item) => total + (item.price * (item.quantidade || 1)), 0);
    },
  },
  actions: {
    adicionarAoCarrinho(produto: Product) {
      const itemExistente = this.carrinho.find(item => item.id === produto.id);

      if (itemExistente) {
        itemExistente.quantidade = (itemExistente.quantidade || 1) + 1;
      } else {
        this.carrinho.push({
          ...produto,
          quantidade: 1
        });
      }
    }
  }
});
