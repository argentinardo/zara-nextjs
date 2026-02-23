import { productsService } from '@/services'
import PhoneSpecs from '@/components/PhoneSpecs/PhoneSpecs'
import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const phone = await productsService.getProductById(id)

  if (!phone) {
    notFound()
  }

  return <PhoneSpecs phone={phone} />
}
