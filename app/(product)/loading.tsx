export default function ProductLoading() {
  return (
    <div
      className="product-main-loading"
      style={{
        minHeight: '80svh',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        animation: 'pulse 1.5s ease-in-out infinite',
      }}
      aria-label="Loading content"
      aria-busy="true"
    >
      <div
        style={{
          width: '40%',
          height: '2.5rem',
          borderRadius: '0.75rem',
          background: 'rgba(23, 24, 29, 0.06)',
        }}
      />
      <div
        style={{
          width: '100%',
          height: '14rem',
          borderRadius: '1.25rem',
          background: 'rgba(23, 24, 29, 0.05)',
        }}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              height: '12rem',
              borderRadius: '1rem',
              background: 'rgba(23, 24, 29, 0.04)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

