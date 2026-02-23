'use client'

import { usePhoneDetail } from '@/hooks/usePhoneDetail'
import type { Phone } from '@/types'
import MainButton from '../MainButton'
import Storage from '../Storage'
import ColorSelector from '../ColorSelector'
import SimilarItems from '../SimilarItems'

interface PhoneSpecsProps {
  phone: Phone
}

const PhoneSpecs = ({ phone }: PhoneSpecsProps) => {
  const {
    displayedImageUrl,
    selectedColor,
    selectedStorage,
    storagePrice,
    canAddToCart,
    handleColor,
    handleStorage,
    handleAddToCart,
  } = usePhoneDetail(phone)

  const {
    name,
    brand,
    description,
    basePrice,
    specs: {
      screen,
      resolution,
      processor,
      mainCamera,
      selfieCamera,
      battery,
      os,
      screenRefreshRate,
    },
    colorOptions,
    storageOptions,
    similarProducts,
  } = phone

  return (
    <>
    <article className="phone-specs">
      <section className="phone-specs__hero">
        <img className="phone-specs__hero-img" src={displayedImageUrl} alt={name} />
        <div className="phone-specs__hero-panel">
          <h1 className="phone-specs__hero-title">{name}</h1>
          <p className="phone-specs__hero-subtitle">
            {storagePrice ? storagePrice : `From ${basePrice}`} EUR
          </p>
          <Storage
            storageOptions={storageOptions}
            selectedStorage={selectedStorage}
            onSelectStorage={handleStorage}
          />
          <ColorSelector
            action={handleColor}
            colorOption={colorOptions}
            selectedColor={selectedColor}
          />
          <MainButton 
            disabled={!canAddToCart}
            full
            action={handleAddToCart}
          >Añadir</MainButton>
        </div>
      </section>
      <section className="phone-specs__details">
        <h2 className="phone-specs__details-title">SPECIFICATIONS</h2>
        <dl className="phone-specs__details-list">
          <div className="phone-specs__details-list-item">
            <dt className="phone-specs__details-list-first">BRAND</dt>
            <dd>{brand}</dd>
          </div>
          <div className="phone-specs__details-list-item">
            <dt className="phone-specs__details-list-first">NAME</dt>
            <dd>{name}</dd>
          </div>
          <div className="phone-specs__details-list-item">
            <dt className="phone-specs__details-list-first">DESCRIPTION</dt>
            <dd>{description}</dd>
          </div>
          <div className="phone-specs__details-list-item">
            <dt className="phone-specs__details-list-first">SCREEN</dt>
            <dd>{screen}</dd>
          </div>
          <div className="phone-specs__details-list-item">
            <dt className="phone-specs__details-list-first">RESOLUTION</dt>
            <dd>{resolution}</dd>
          </div>
          <div className="phone-specs__details-list-item">
            <dt className="phone-specs__details-list-first">PROCESSOR</dt>
            <dd>{processor}</dd>
          </div>
          <div className="phone-specs__details-list-item">
            <dt className="phone-specs__details-list-first">MAIN CAMERA</dt>
            <dd>{mainCamera}</dd>
          </div>
          <div className="phone-specs__details-list-item">
            <dt className="phone-specs__details-list-first">SELFIE CAMERA</dt>
            <dd>{selfieCamera}</dd>
          </div>
          <div className="phone-specs__details-list-item">
            <dt className="phone-specs__details-list-first">BATTERY</dt>
            <dd>{battery}</dd>
          </div>
          <div className="phone-specs__details-list-item">
            <dt className="phone-specs__details-list-first">OS</dt>
            <dd>{os}</dd>
          </div>
          <div className="phone-specs__details-list-item">
            <dt className="phone-specs__details-list-first">SCREEN REFRESH RATE</dt>
            <dd>{screenRefreshRate}</dd>
          </div>
        </dl>
      </section>
    </article>
    <SimilarItems similarProducts={similarProducts} />
  </>
  )
}

export default PhoneSpecs
