'use client'

import { useState } from 'react'

const faqs = [
  [
    'What is Yadesh?',
    'Yadesh is Christian micro-learning. It brings you ideas, stories, lives, and lessons from across the history of the Christian faith in short, sourced readings. Think of it as a library that fits in five minutes.',
  ],
  [
    'Is it free?',
    'Yes. Creating an account and saving content is free. You can start reading immediately after registering.',
  ],
  [
    'How is this different from a Bible app?',
    'Bible apps help you read scripture. Yadesh helps you understand the people, books, ideas, and history that surround it. C.S. Lewis, Dietrich Bonhoeffer, Corrie ten Boom, Augustine, church history, revival accounts. The faith is bigger than most of us have been shown.',
  ],
  [
    'Where does the content come from?',
    'Every piece on Yadesh is sourced. We point toward the original books, biographies, public records, and historical accounts so you can go further when something matters. The principle is simple: read, keep, remember.',
  ],
  [
    'Who is Yadesh for?',
    'Anyone who wants to engage seriously with the Christian faith but does not have hours to spare. If you have five minutes and genuine curiosity, Yadesh is built for you.',
  ],
  [
    'Can I save what I learn?',
    'Yes. Create an account and use the save button on any card to build your personal library. Your saved readings are waiting whenever you come back.',
  ],
  [
    'What does Yadesh mean?',
    'Yadesh comes from the Hebrew concept of remembrance and intentional knowing. The name reflects what the product is about: learning things worth holding on to.',
  ],
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="faq-heading">
        <p className="kicker">Questions, answered</p>
        <h2 id="faq-title">Things people<br /><em>want to know.</em></h2>
      </div>
      <div className="faq-list">
        {faqs.map(([question, answer], index) => {
          const isOpen = openIndex === index
          return (
            <article className={`faq-item${isOpen ? ' is-open' : ''}`} key={question}>
              <button
                className="faq-trigger"
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{question}</span>
                <span className="faq-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && <p className="faq-answer">{answer}</p>}
            </article>
          )
        })}
      </div>
    </section>
  )
}
