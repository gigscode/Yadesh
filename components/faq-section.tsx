'use client'

import { useState } from 'react'

type Faq = { question: string; answer: string }

const faqs: Faq[] = [
  {
    question: 'What is Yadesh?',
    answer:
      'Yadesh is a daily reading app for your faith. It takes timeless wisdom from great Christian books, biographies, and church history and turns them into short three to five minute readings you can easily finish and remember.',
  },
  {
    question: 'Is it free?',
    answer:
      'Yes, Yadesh is completely free. You can start reading right away, save your favourite lessons, and explore topics without paying anything.',
  },
  {
    question: 'How is this different from a Bible app?',
    answer:
      'Bible apps are designed for reading scripture. Yadesh helps you discover the rich history, classic books, and remarkable lives that surround the faith (think of C.S. Lewis, Dietrich Bonhoeffer, Corrie ten Boom, and Augustine). It is built to complement your Bible reading, not replace it.',
  },
  {
    question: 'How is this different from social media or quick devotionals?',
    answer:
      'Social media feeds keep you scrolling aimlessly and leave you tired. Quick devotionals often offer just a verse and a brief thought. Yadesh gives you substantive ideas and inspiring stories from real Christian history in five minutes, leaving you encouraged rather than distracted.',
  },
  {
    question: 'Where does the content come from?',
    answer:
      'Every piece on Yadesh is sourced. We point toward the original books, biographies, public records, and historical accounts so you can go further when an idea matters to you.',
  },
  {
    question: 'Who is Yadesh for?',
    answer:
      'Yadesh is for any Christian who wants to grow deeper in their faith but feels pressed for time. Whether you have five minutes on your morning commute or before going to sleep, it gives you something meaningful to carry with you.',
  },
  {
    question: 'Can I save what I learn?',
    answer:
      'Yes. Create a free account and tap the save button on any reading to build your personal library. Your saved readings are waiting whenever you return.',
  },
  {
    question: 'What does Yadesh mean?',
    answer:
      'Yadesh draws from the Hebrew concept of remembrance and intentional knowing. It represents learning that stays in your heart and mind, rather than fleeting content you forget seconds later.',
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
