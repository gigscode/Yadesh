'use client'

import { useState } from 'react'

type Faq = { question: string; answer: string }

const faqs: Faq[] = [
  {
    question: 'What is Yadesh?',
    answer:
      'Yadesh is a daily reading app for your faith. It takes timeless wisdom from great Christian books, biographies, and church history and turns them into short three to five minute readings you can easily finish and remember. Premium members also get access to 21-day guided series for a deeper, structured journey.',
  },
  {
    question: 'Is it free?',
    answer:
      'Yes. The free tier gives you full access to the daily learning feed, the entire content library, bookmarking, and your reading streak. Premium unlocks the 21-day guided series, which are longer structured journeys designed to go deeper on a single theme over three weeks.',
  },
  {
    question: 'What is a 21-day series?',
    answer:
      'A guided series is a curated, day-by-day journey through a spiritual theme such as prayer, breakthrough, or the Kingdom of God. Each day builds on the last. Premium members can mark days complete, track their progress, and share individual day quotes as graphics for Instagram, WhatsApp, and X.',
  },
  {
    question: 'How is this different from a Bible app?',
    answer:
      'Bible apps are designed for reading scripture. Yadesh helps you discover the rich history, classic books, and remarkable lives that surround the faith (think C.S. Lewis, Dietrich Bonhoeffer, Corrie ten Boom, and Augustine). It is built to complement your Bible reading, not replace it.',
  },
  {
    question: 'How is this different from social media or quick devotionals?',
    answer:
      'Social media feeds keep you scrolling aimlessly and leave you tired. Quick devotionals often offer just a verse and a brief thought. Yadesh gives you substantive ideas and inspiring stories from real Christian history in five minutes, leaving you encouraged rather than distracted.',
  },
  {
    question: 'Where does the content come from?',
    answer:
      'Every piece on Yadesh is sourced. We point toward the original books, biographies, public records, and historical accounts so you can go further when an idea matters to you. Series content draws from respected teachers and is built for sustained reflection, not quick inspiration.',
  },
  {
    question: 'Can I share what I learn?',
    answer:
      'Yes. Any reading or series day has a Share Quote button that opens a graphic builder. You can choose between a Square (1:1) card for Instagram and X or a Story (9:16) card for Instagram Stories and WhatsApp Status. Pick a theme, then tap Share or Download. Everything is generated on your device with no data upload.',
  },
  {
    question: 'Can I save what I learn?',
    answer:
      'Yes. Create a free account and tap the save button on any reading to build your personal library. Your saved readings are waiting whenever you return. Each reading also has a Mark as read button that updates your daily streak.',
  },
  {
    question: 'Can I install it on my phone?',
    answer:
      'Yes. Yadesh is a Progressive Web App (PWA). On Android, tap Add to Home Screen when prompted. On iOS Safari, tap the Share icon and choose Add to Home Screen. Once installed it opens like a native app with no browser chrome, and works offline for content you have already loaded.',
  },
  {
    question: 'Who is Yadesh for?',
    answer:
      'Yadesh is for any Christian who wants to grow deeper in their faith but feels pressed for time. Whether you have five minutes on your morning commute or before going to sleep, it gives you something meaningful to carry with you.',
  },
  {
    question: 'What does Yadesh mean?',
    answer:
      'Yadesh draws from two Hebrew words placed together: yada (to know intimately) and darash (to seek diligently). Together they mean to know through seeking. The conviction behind it is that real faith is not inherited passively but pursued honestly, and what you find is not just information but encounter.',
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
