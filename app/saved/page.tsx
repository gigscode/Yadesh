import Link from 'next/link'
import { ProductShell, LearningCard } from '@/components/product-shell'
import { learningCards } from '@/lib/learning-data'
import { createClient } from '@/lib/supabase/server'

export default async function SavedPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  let savedKeys: string[] = []

  if (user) {
    const { data } = await supabase
      .from('saved_items')
      .select('content_key')
      .eq('user_id', user.id)
      .order('saved_at', { ascending: false })

    savedKeys = data?.map((row) => row.content_key) ?? []
  }

  const savedCards = learningCards.filter((card) => savedKeys.includes(card.id))

  return (
    <ProductShell title="Saved">
      {!user ? (
        <section className="empty-state">
          <p className="eyebrow">YOUR LIBRARY</p>
          <h2>Sign in to see your saved readings.</h2>
          <p>Create an account or log in to start saving ideas, stories, and lessons worth returning to.</p>
          <Link className="hero-link" href="/login">Log in to your account <span aria-hidden="true">↗</span></Link>
        </section>
      ) : savedCards.length === 0 ? (
        <section className="empty-state">
          <p className="eyebrow">YOUR LIBRARY</p>
          <h2>Collect what is worth remembering.</h2>
          <p>Save ideas, people, and books here so your next five minutes always have somewhere useful to begin.</p>
          <Link className="hero-link" href="/explore">Explore learning <span aria-hidden="true">↗</span></Link>
        </section>
      ) : (
        <section className="product-section">
          <div className="section-row">
            <h2>Saved readings</h2>
            <span>{savedCards.length} {savedCards.length === 1 ? 'item' : 'items'}</span>
          </div>
          <div className="learning-grid">
            {savedCards.map((item) => (
              <LearningCard key={item.id} {...item} accent />
            ))}
          </div>
        </section>
      )}
    </ProductShell>
  )
}
