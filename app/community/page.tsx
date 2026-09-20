'use client'

import { useMemo, useState } from 'react'
import { Heart, MessageCircle, ShieldCheck } from 'lucide-react'
import { ProductShell } from '@/components/product-shell'

type Post = { id: number; type: string; title: string; body: string; author: string; replies: number; encouraged: boolean }

const starterPosts: Post[] = [
  { id: 1, type: 'Prayer', title: 'Please pray for my family this week', body: 'I am carrying a lot at home and would value a quiet moment of prayer from this community.', author: 'Anonymous', replies: 8, encouraged: false },
  { id: 2, type: 'Book request', title: 'Where should I begin with A.W. Tozer?', body: 'Looking for a thoughtful first book that helps me grow in a more consistent prayer life.', author: 'Miriam K.', replies: 5, encouraged: true },
  { id: 3, type: 'Testimony', title: 'A small reminder that stayed with me', body: 'Today’s reading helped me slow down before reacting. Sharing in case someone else needs the same reminder.', author: 'Samuel O.', replies: 3, encouraged: false },
]

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [posts, setPosts] = useState(starterPosts)
  const [composerOpen, setComposerOpen] = useState(false)
  const [newPost, setNewPost] = useState({ type: 'Prayer', title: '', body: '' })
  const filters = ['All', 'Prayer', 'Book requests', 'Counsel', 'Testimonies']
  const visiblePosts = useMemo(() => activeFilter === 'All' ? posts : posts.filter(post => post.type.toLowerCase().startsWith(activeFilter.slice(0, -1).toLowerCase())), [activeFilter, posts])

  function publishPost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!newPost.title.trim() || !newPost.body.trim()) return
    setPosts(current => [{ id: Date.now(), ...newPost, author: 'You · Anonymous', replies: 0, encouraged: false }, ...current])
    setNewPost({ type: 'Prayer', title: '', body: '' })
    setComposerOpen(false)
  }

  return <ProductShell title="Community">
    <section className="community-welcome">
      <div><p className="eyebrow">A QUIET PLACE TO SHARE</p><h2>Carry something together.</h2><p>Ask for prayer, request a book, seek counsel, or share what you are learning.</p></div>
      <button className="community-primary-action" onClick={() => setComposerOpen(true)}>Share something <span aria-hidden="true">→</span></button>
    </section>
    <section className="community-safety"><ShieldCheck aria-hidden="true" /><p><strong>Kind, private, human.</strong> You can post anonymously. Every contribution is here to encourage, not perform.</p></section>
    <div className="community-filters" aria-label="Community categories">{filters.map(filter => <button className={activeFilter === filter ? 'active' : ''} onClick={() => setActiveFilter(filter)} key={filter}>{filter}</button>)}</div>
    <section className="community-feed" aria-live="polite">{visiblePosts.map(post => <article className="community-post" key={post.id}><div className="community-post-meta"><span className="community-type">{post.type}</span><span>{post.author}</span></div><h3>{post.title}</h3><p>{post.body}</p><div className="community-post-actions"><button onClick={() => setPosts(current => current.map(item => item.id === post.id ? { ...item, encouraged: !item.encouraged } : item))} className={post.encouraged ? 'encouraged' : ''}><Heart aria-hidden="true" />Encourage</button><button><MessageCircle aria-hidden="true" />{post.replies} replies</button><button className="community-report" onClick={() => window.alert('Thanks. This post has been flagged for review.')}>Report</button></div></article>)}</section>
    {composerOpen && <div className="community-dialog-backdrop" role="presentation"><form className="community-composer" onSubmit={publishPost}><div className="section-row"><div><p className="eyebrow">SHARE WITH CARE</p><h2>What would you like to bring?</h2></div><button type="button" className="dialog-close" onClick={() => setComposerOpen(false)} aria-label="Close">×</button></div><label>Type<select value={newPost.type} onChange={event => setNewPost({ ...newPost, type: event.target.value })}><option>Prayer</option><option>Book request</option><option>Counsel</option><option>Testimony</option></select></label><label>Title<input value={newPost.title} onChange={event => setNewPost({ ...newPost, title: event.target.value })} placeholder="Give it a clear title" /></label><label>What would you like to say?<textarea value={newPost.body} onChange={event => setNewPost({ ...newPost, body: event.target.value })} placeholder="Share only what feels safe to share." rows={4} /></label><p className="composer-privacy">Posting as Anonymous · You can change this later.</p><button className="community-primary-action" type="submit">Post to community <span aria-hidden="true">→</span></button></form></div>}
  </ProductShell>
}
