import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { getAllPeopleProfiles } from '@/lib/content-loader'
import { ArrowUpRight, User, ShieldCheck } from 'lucide-react'

export const metadata = {
  title: 'Christian Leaders & Witnesses · Yadesh',
  description: 'Firsthand accounts, verified testimonies, and spiritual lessons from historical and modern Christian leaders.',
}

export default async function PeoplePage() {
  const people = await getAllPeopleProfiles()

  return (
    <>
      <PageHeader title="People" />

      <section className="product-intro" style={{ marginBottom: '2rem' }}>
        <p style={{ margin: 0, fontSize: '1.05rem', color: 'var(--muted-foreground)' }}>
          Learn from the lives behind the faith. Discover documented, lesser-known accounts and verified miracles drawn directly from their own autobiographical writings.
        </p>
      </section>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
          paddingBottom: '5rem',
        }}
      >
        {people.map((person) => (
          <Link
            key={person.id}
            href={`/people/${person.id}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '1.5rem',
              borderRadius: '1.25rem',
              background: '#fff',
              border: '1px solid var(--border)',
              textDecoration: 'none',
              color: 'var(--foreground)',
              boxShadow: '0 0.35rem 1rem rgba(23, 24, 29, 0.04)',
              transition: 'transform 0.18s ease, box-shadow 0.18s ease',
            }}
            className="learning-card"
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.3rem 0.65rem',
                    borderRadius: '999px',
                    background: '#f4f0ff',
                    color: '#7168ed',
                    fontSize: '0.68rem',
                    fontWeight: 900,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  <User size={11} /> {person.lifespan}
                </span>

                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.72rem', color: '#16a34a', fontWeight: 800 }}>
                  <ShieldCheck size={12} /> Verified Source
                </span>
              </div>

              <h2 style={{ fontSize: '1.35rem', lineHeight: 1.15, margin: '0 0 0.35rem', letterSpacing: '-0.03em' }}>
                {person.name}
              </h2>

              <p style={{ margin: '0 0 0.75rem', fontSize: '0.82rem', color: '#7168ed', fontWeight: 800 }}>
                {person.role}
              </p>

              <p style={{ margin: 0, fontSize: '0.86rem', lineHeight: 1.5, color: 'var(--muted-foreground)' }}>
                {person.shortBio}
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(23, 24, 29, 0.06)',
                fontSize: '0.82rem',
                fontWeight: 900,
                color: '#7168ed',
              }}
            >
              <span>Explore firsthand account</span>
              <ArrowUpRight size={16} />
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
