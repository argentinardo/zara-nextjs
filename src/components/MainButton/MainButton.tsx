'use client'

import { MouseEventHandler, ReactNode } from "react"

interface MainButtonProps {
    light?: boolean
    full?: boolean
    action?: MouseEventHandler<HTMLButtonElement> | undefined
    children: ReactNode
    disabled? : boolean
}

const MainButton = ({ light, full, action, children, disabled }: MainButtonProps) => {
    return (
        <button
            disabled= {disabled}
            type="button"
            onClick={action}
            className={
                `main-button${light ? ' main-button--light' : ''}${full ? ' main-button--full' : ''}`
            }
        >
            {children}
        </button>
    )
}
export default MainButton