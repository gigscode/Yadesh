export default function ExploreLoading() {
  return (
    <div className="product-shell-skeleton">
      <div className="skeleton-sidebar" />
      <div className="skeleton-main">
        <div className="skeleton-block skeleton-title" />
        <div className="skeleton-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      </div>
    </div>
  )
}
