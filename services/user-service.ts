import type { NitroFetchRequest, $Fetch } from "nitropack"

export interface Product {
    id: number
    name: string
    description: string
    price: number
    image_url: string
    preparation_time: number
    created_at: string
    updated_at: string
    category_id: number
}

export const userRepository = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
    async get(): Promise<Product[]> {
        return fetch('/products')
    }
})