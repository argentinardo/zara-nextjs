export interface Specs {
  screen: string
  resolution: string
  processor: string
  mainCamera: string
  selfieCamera: string
  battery: string
  os: string
  screenRefreshRate: string
}

export interface ColorOption {
  name: string
  hexCode: string
  imageUrl: string
}

export interface StorageOption {
  capacity: string
  price: number
}

export interface PhoneListItem {
  id: string
  brand: string
  name: string
  basePrice: number
  imageUrl: string
}

export type SimilarProduct = PhoneListItem

export interface Phone {
  id: string
  brand: string
  name: string
  description: string
  basePrice: number
  rating: number
  specs: Specs
  colorOptions: ColorOption[]
  storageOptions: StorageOption[]
  similarProducts: SimilarProduct[]
}

export interface CartItem {
  brand: string
  name: string
  price: number
  storage: string
  color: string
  colorUrl: string
  cartItemId: string
}