import Link from 'next/link'
import { ProductShell, TopicChips, LearningCard } from '@/components/product-shell'
import { learningCards } from '@/lib/learning-data'

export default function ExplorePage() { return <ProductShell title="Explore"><section className="product-intro"><p>What are you hungry to learn?</p><TopicChips /></section><section className="product-section"><div className="section-row"><h2>Today&apos;s learning</h2><Link href="/search">View all</Link></div><div className="learning-grid">{learningCards.map(item => <LearningCard key={item.title} {...item} />)}</div></section><section className="depth-ladder"><p className="eyebrow">GO DEEPER</p><h2>One idea. More context.</h2><div className="depth-steps">{['30 sec · Discover','2 min · Understand','5 min · Explore','Source · Read deeper'].map(step => <span key={step}>{step}</span>)}</div></section></ProductShell> }
