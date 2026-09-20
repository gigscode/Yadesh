'use client'

import { useState } from 'react'

type Faq = { question: string; answer: string }

const faqs: Faq[] = [
  {
    question: 'What is Yadesh?',
    answer: 'Yadesh is Christian micro-learning. It brings you ideas, stories, lives, and lessons from across the history of the Christian faith in short, sourced readings. Think of it as a library that fits in five minutes.',
  },
  {
    question: 'Is it free?',
    answer: 'Yes. Creating an account and saving content is free. You can start reading immediately after registering.',
  },
  {
    question: 'How is this different from a Bible app?',
    answer: 'Bible apps help you read scripture. Yadesh helps you understand the people, books, ideas, and history that surround it. C.S. Lewis, Dietrich Bonhoeffer, Corrie ten Boom, Augustine, church history, revival accounts. The faith is bigger than most of us have been shown.',
  },
  {
    question: 'Where does the content come from?',
    answer: 'Every piece on Yadesh is sourced. We point toward the original books, biographies, public records, and historical accounts so you can go further when something matters. The principle is simple: read, keep, remember.',
  },
  {
    question: 'Who is Yadesh for?',
    answer: 'Anyone who wants to engage seriously with the Christian faith but does not have hours to spare. If you have five minutes and genuine curiosity, Yadesh is built for you.',
  },
  {
    question: 'Can I save what I learn?',
    answer: 'Yes. Create an account and use the save button on any card to build your personal library. Your saved readings are waiting whenever you come back.',
  },
  {
    question: 'What does Yadesh mean?',
    answer: 'Yadesh comes from the Hebrew concept of remembrance and intentional knowing. The name reflects what the product is about: learning things worth holding on to.',
  },
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
        {faqs.map(({ question, answer }, index) => {
          const isOpen = openIndex === index
          const answerId = `faq-answer-${index}`
          return (
            <article className={`faq-item${isOpen ? ' is-open' : ''}`} key={question}>
              <button
                className="faq-trigger"
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{question}</span>
                <span className="faq-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <p id={answerId} className="faq-answer">
                  {answer}
                </p>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
