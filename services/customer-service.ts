import type { NitroFetchRequest, $Fetch } from "nitropack"

export type GetCustomer = {}

type Result<T> = {
    data?: T,
    error?: any
}

export const useCustomerService = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
    async get(taxid: string): Promise<Result<GetCustomer>> {
        try {
            const data = await fetch('/customer', { params: { taxid } }) as GetCustomer; 
            return { data }
        } catch (error) {
            return { error }
        }
    }
})