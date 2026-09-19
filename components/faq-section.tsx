'use client'

import { useState } from 'react'

const faqs = [
  ['What is Yadesh?', 'Yadesh is Christian micro-learning: short, useful ideas from books, people, teachings, testimonies, and the history of the faith.'],
  ['Why micro-learning?', 'A few focused minutes can help you discover a meaningful idea without adding another endless feed to your day.'],
  ['How can I use Yadesh?', 'Choose a topic, learn from a short piece, then go deeper into the source when an idea stays with you.'],
  ['Where does the learning come from?', 'Yadesh points toward original books, public records, teachings, biographies, and other sources so you can learn beyond the summary.'],
  ['Can I save what I learn?', 'Yes. Create an account to save ideas, stories, and lessons worth returning to as you build your personal learning space.'],
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="faq-heading"><p className="kicker">Questions, answered</p><h2 id="faq-title">What. The.<br /><em>FAQ?</em></h2></div>
      <div className="faq-list">
        {faqs.map(([question, answer], index) => {
          const isOpen = openIndex === index
          return <article className={`faq-item${isOpen ? ' is-open' : ''}`} key={question}>
            <button className="faq-trigger" type="button" aria-expanded={isOpen} onClick={() => setOpenIndex(isOpen ? null : index)}>
              <span>{question}</span><span className="faq-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && <p className="faq-answer">{answer}</p>}
          </article>
        })}
      </div>
    </section>
  )
}
