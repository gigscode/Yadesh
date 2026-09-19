'use client'

import { useState } from 'react'

const faqs = [
  ['What is Yadesh?', 'Yadesh is a source-anchored archive for real testimony, hard-won lessons, and useful ideas worth returning to.'],
  ['Why are ideas important?', 'Good ideas change what we notice, what we practice, and how we make decisions when the noise drops away.'],
  ['How can I use Yadesh?', 'Start with the archive, open a record, and follow the original source before saving what genuinely helps you.'],
  ['What makes a record trustworthy?', 'Each record points toward a source so you can read beyond the summary and make your own judgment.'],
  ['Can I contribute a record?', 'Yes. Use the archive as a guide for the kind of clear, useful, source-anchored material Yadesh is built to collect.'],
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
