// ProductShell has been replaced by the persistent route group layout at
// app/(product)/layout.tsx + components/product-chrome.tsx.
// These re-exports remain for any existing imports.

export { LearningCard } from '@/components/learning-card'

import Link from 'next/link'

export function TopicChips() {
  const topics = [
    'Faith', 'Prayer', 'Healing', 'Leadership', 'Revival',
    'Holy Spirit', 'Calling', 'Discipline', 'Christian Living', 'Ministry',
  ]
  return (
    <div className="product-topic-chips">
      {topics.map((topic) => (
        <Link key={topic} href={`/search?q=${encodeURIComponent(topic)}`}>
          {topic}
        </Link>
      ))}
    </div>
  )
}

// Legacy export — no longer used as a layout wrapper.
// Kept to avoid import errors during transition.
export function ProductShell({
  children,
  title: _title,
}: {
  children: React.ReactNode
  title?: string
}) {
  return <>{children}</>
}
