import { LearningCard } from '@/components/learning-card'
import { PageHeader } from '@/components/page-header'
import { learningCards } from '@/lib/learning-data'

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = '' } = await searchParams
  const query = q.trim().toLocaleLowerCase()
  const results = query
    ? learningCards.filter((item) =>
        [item.title, item.source, item.body, item.type].some((value) =>
          value.toLocaleLowerCase().includes(query),
        ),
      )
    : learningCards

  return (
    <>
      <PageHeader title="Search" />

      <form className="search-form">
        <input name="q" defaultValue={q} placeholder="Search ideas, people, books..." aria-label="Search Yadesh" />
        <button type="submit">Search</button>
      </form>

      <section className="product-section">
        <div className="section-row">
          <h2>{q ? `Results for "${q}"` : 'Start with a question'}</h2>
          {q && <span>{results.length} {results.length === 1 ? 'result' : 'results'}</span>}
        </div>
        <div className="search-groups" aria-label="Search categories">
          <span>TOPICS</span><span>PEOPLE</span><span>BOOKS</span><span>IDEAS</span><span>STORIES</span>
        </div>
        {results.length > 0 ? (
          <div className="learning-grid">
            {results.map((item, index) => <LearningCard key={item.id} {...item} index={index} />)}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No readings matched that search.</h2>
            <p>Try a person, book, theme, or phrase from the reading library.</p>
          </div>
        )}
      </section>

      <p className="source-note">Read. Keep. Remember. Every source-sensitive item is labelled by its context.</p>
    </>
  )
}
