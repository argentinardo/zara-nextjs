import type { PhoneListItem } from '@/types'
import Link from 'next/link'

interface PhoneItemProps {
  phone: PhoneListItem
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const { id, name, brand, imageUrl, basePrice } = phone
  return (
    <Link className="phone-item" href={`/products/${id}`}>
      <img className="phone-item__img" src={imageUrl} alt={`${brand} ${name}`} />
      <h3 className="phone-item__brand">{brand}</h3>
      <div className="phone-item__footer">
          <span className="phone-item__name">{name}</span>{basePrice} EUR
      </div>
    </Link>
  )
}

export default PhoneItem
