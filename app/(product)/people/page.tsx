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
        {people.map((person, index) => {
          const delay = Math.min(index + 1, 6)

          return (
            <Link
              key={person.id}
              href={`/people/${person.id}`}
              className={`learning-card card-type-life anim-fade-up delay-${delay}`}
              style={{ textDecoration: 'none', color: 'var(--foreground)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div className="card-meta">
                  <span className="card-badge">
                    <User size={10} style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'middle' }} />
                    {person.lifespan}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', color: '#16a34a', fontWeight: 800 }}>
                    <ShieldCheck size={12} /> Verified
                  </span>
                </div>

                <h3 style={{ color: '#7c3aaa' }}>{person.name}</h3>

                <p style={{ margin: '0 0 0.75rem', fontSize: '0.82rem', color: 'var(--muted-foreground)', fontWeight: 800 }}>
                  {person.role}
                </p>

                <p style={{ margin: 0, fontSize: '0.86rem', lineHeight: 1.5, color: '#454651' }}>
                  {person.shortBio}
                </p>
              </div>

              <div className="card-actions" style={{ marginTop: '1.5rem' }}>
                <span style={{ color: '#7c3aaa', fontWeight: 900, fontSize: '0.82rem' }}>Explore firsthand account</span>
                <ArrowUpRight size={16} style={{ color: '#7c3aaa' }} />
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
