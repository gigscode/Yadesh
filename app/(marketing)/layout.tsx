// Persistent layout for all marketing and auth routes:
// /, /login, /register, /forgot-password, /reset-password
//
// Wrapping these in a route group means Next.js keeps this layout
// mounted across navigations between them. The background shell never
// unmounts, so the raw <body> is never exposed between page transitions.
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="marketing-shell">
      {children}
    </div>
  )
}
