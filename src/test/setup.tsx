import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ children, href, className, ...props }: { children: React.ReactNode; href: string; className?: string; [key: string]: unknown }) => {
    return <a href={href} className={className} {...props}>{children}</a>
  },
}))

let mockPathname = '/'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => mockPathname,
  useSearchParams: () => new URLSearchParams(),
}))

export function setMockPathname(pathname: string) {
  mockPathname = pathname
}
