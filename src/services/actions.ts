'use server'

import { productsService } from './products'
import type { PhoneListItem } from '@/types'

export async function searchProducts(search?: string): Promise<PhoneListItem[]> {
  return productsService.getProducts(search)
}
