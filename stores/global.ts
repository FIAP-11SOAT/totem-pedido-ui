import { get } from 'http';
import { defineStore } from 'pinia';

type User = {
    user_id: number;
    name: string;
    email: string;
}

type Order = {
    order_id: number;
    user_id: number;
    payment_id: number;
}

export const useGlobalStore = defineStore('global', {
    state: () => ({
        user: {} as User,
        order: {}
    }),
    getters: {
        getUser: (state) => {
            return state.user;
        },
        getOrder: (state) => {
            return state.order;
        }
    },
    actions: {
        setUser(user: User) {
            this.user = user;
        },
        clearUser() {
            this.user = {} as User;
        },
        setOrder(order: Order) {
            this.order = order;
        },
        clearOrder() {
            this.order = {} as Order;
        }
    },
});