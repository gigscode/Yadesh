import { notFound } from 'next/navigation'
import { ProductShell } from '@/components/product-shell'
import { ReadingDetailScreen } from '@/components/reading-detail-screen'
import { learningCards } from '@/lib/learning-data'
import { createClient } from '@/lib/supabase/server'

export default async function ReadingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const card = learningCards.find((item) => item.id === id)

  if (!card) notFound()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  let initialSaved = false

  if (user) {
    const { data } = await supabase
      .from('saved_items')
      .select('id')
      .eq('user_id', user.id)
      .eq('content_key', card.id)
      .maybeSingle()
    initialSaved = Boolean(data)
  }

  return (
    <ProductShell title="Reading">
      <ReadingDetailScreen card={card} initialSaved={initialSaved} />
    </ProductShell>
  )
}
