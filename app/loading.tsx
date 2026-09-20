// Root loading state — shows app background immediately to prevent white flash
export default function Loading() {
  return (
    <div style={{
      minHeight: '100svh',
      background: 'var(--background, #fbfbf8)',
    }} />
  )
}
