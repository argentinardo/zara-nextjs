'use client'

import {ColorOption} from '@/types/phone'

interface ColorSelectorProps {
    colorOption : ColorOption[],
    action: (imageUrl: string, name: string) => void,
    selectedColor: string,
}

const ColorSelector = ({colorOption, action, selectedColor=""} : ColorSelectorProps) => {
  return (
    <div className="color-selector">
        <p className="color-selector__text">color. pick your favourite.</p>
        <ul role="list" className="color-selector__tabs">
            {colorOption.map((item) => (
            <li className={`color-selector__tabs-tab${item.name === selectedColor ? ' color-selector__tabs-tab--active' : ''}`}
            key={item.name}>
                <button
                className="color-selector__tabs-btn"
                style={{ backgroundColor: item.hexCode }}
                onClick={() => action(item.imageUrl, item.name)}
                aria-label={`Select color ${item.name}`}
                >
                </button>
            </li>
            ))}
        </ul>
        <p className="color-selector__name">{selectedColor}</p>
    </div>
  )
}
export default ColorSelector