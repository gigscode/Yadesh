export default function YouLoading() {
  return (
    <div className="product-shell-skeleton">
      <div className="skeleton-sidebar" />
      <div className="skeleton-main">
        <div className="skeleton-profile-card" />
        <div className="skeleton-block skeleton-title" />
        <div className="skeleton-grid skeleton-grid-1col">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton-card skeleton-card-short" />
          ))}
        </div>
      </div>
    </div>
  )
}
