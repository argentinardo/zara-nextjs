'use client'

import type { StorageOption } from '@/types/phone'
interface StorageTabsProps {
    storageOptions: StorageOption[]
    selectedStorage: string
    onSelectStorage: (price: number, capacity: string) => void
}

const StorageTabs = ({ storageOptions, selectedStorage, onSelectStorage }: StorageTabsProps) => {
    return (
        <div className="storage">
            <p className="storage__text">
                Storage ¿hOW MUCH SPACE DO YOU NEED?
            </p>
            <div className="storage__tabs">
                {storageOptions.map((item) => (
                    <button
                        key={item.capacity}
                        className={`storage__tabs-btn${item.capacity === selectedStorage ? ' storage__tabs-btn--active' : ''}`}
                        type="button"
                        onClick={() => onSelectStorage(item.price, item.capacity)}
                        aria-label={`Select ${item.capacity} storage`}
                    >
                        {item.capacity}
                    </button>
                ))}
            </div>
        </div>
    )
}
export default StorageTabs
