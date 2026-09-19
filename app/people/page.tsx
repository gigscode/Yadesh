import Link from 'next/link'
import { ProductShell } from '@/components/product-shell'
const people = ['Smith Wigglesworth','John G. Lake','Kathryn Kuhlman','Kenneth E. Hagin','Lester Sumrall','Oral Roberts','A.A. Allen','David Oyedepo']
export default function PeoplePage() { return <ProductShell title="People"><section className="product-intro"><p>Learn from the lives behind the ideas.</p></section><div className="entity-grid">{people.map((person, i) => <Link className={`entity-card entity-${i % 3}`} href="/learn" key={person}><span className="eyebrow">PERSON</span><h2>{person}</h2><p>Ideas, stories, teachings, and historical context.</p><span className="entity-arrow">Explore this person ↗</span></Link>)}</div></ProductShell> }
