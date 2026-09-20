import { ProductChrome } from '@/components/product-chrome'

// This layout wraps all product pages. Next.js keeps it mounted
// across navigations within the group, so the sidebar, mobile header,
// and bottom nav never unmount eliminating the white flash.
export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <ProductChrome>{children}</ProductChrome>
}
