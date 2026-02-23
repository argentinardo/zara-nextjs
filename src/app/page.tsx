import { productsService } from '@/services'
import PhoneList from '@/components/PhoneList/PhoneList'

export default async function HomePage() {
  const products = await productsService.getProducts()

  return <PhoneList initialProducts={products} />
}
