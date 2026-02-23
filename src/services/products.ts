import { httpClient } from '@/services/http'
import type { Phone, PhoneListItem } from '@/types'

const PRODUCTS_ENDPOINT = '/products'

export const productsService = {
  async getProducts(search?: string): Promise<PhoneListItem[]> {
    const query = search?.trim()
    const url = query
      ? `${PRODUCTS_ENDPOINT}?search=${encodeURIComponent(query)}`
      : PRODUCTS_ENDPOINT
    return httpClient.get<PhoneListItem[]>(url)
  },

  async getProductById(id: string): Promise<Phone | null> {
    try {
      return await httpClient.get<Phone>(`${PRODUCTS_ENDPOINT}/${id}`)
    } catch {
      return null
    }
  },
}
