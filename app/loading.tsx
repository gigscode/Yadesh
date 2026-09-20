// Prevents bare white flash on initial page load and route transitions
// outside the (product) route group.
export default function Loading() {
  return (
    <div style={{ minHeight: '100svh', background: '#fbfbf8' }} />
  )
}
