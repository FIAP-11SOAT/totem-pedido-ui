export default defineNuxtPlugin({
    name: 'client-api',
    async setup() {
        return {
            provide: {
                api: $fetch.create({
                    baseURL: 'http://localhost:5000',
                })
            }
        }
    }
});