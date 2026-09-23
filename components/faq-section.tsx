'use client'

import { useState } from 'react'

type Faq = { question: string; answer: string }

const faqs: Faq[] = [
  {
    question: 'What is Yadesh?',
    answer:
      'Yadesh is a daily reading app for your faith. It brings ideas from Christian books, biographies, and church history into short three to five minute readings. Premium members also get 21-day series organized around one theme.',
  },
  {
    question: 'Is it free?',
    answer:
      'Yes. The free plan includes the daily learning feed, the full reading library, reading streaks, and up to five saved readings. Premium adds unlimited bookmarks and 21-day series organized around one theme.',
  },
  {
    question: 'What is a 21-day series?',
    answer:
      'A series gives you one reading per day for 21 days around a theme such as prayer, breakthrough, or the Kingdom of God. Premium members can mark days complete, track their progress, and share individual day quotes as graphics.',
  },
  {
    question: 'How is this different from a Bible app?',
    answer:
      'Bible apps are designed for reading scripture. Yadesh points you toward the books, people, and history that have shaped Christian thought, including C.S. Lewis, Dietrich Bonhoeffer, Corrie ten Boom, and Augustine. It complements Bible reading rather than replacing it.',
  },
  {
    question: 'How is this different from social media or quick devotionals?',
    answer:
      'Yadesh gives you more context than a quick verse and less noise than a social feed: one focused reading from Christian books, people, and history.',
  },
  {
    question: 'Where does the content come from?',
    answer:
      'We identify the books, people, and records behind each reading where sources are available. Series content draws from named teachers and writers and is organized for sustained reflection.',
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
      'Yadesh is for Christians who want to keep learning but do not have much time. Start with the few minutes before work, during a break, or before bed.',
  },
  {
    question: 'What does Yadesh mean?',
    answer:
      'Yadesh brings together ideas associated with yada, to know, and darash, to seek. The name reflects a simple conviction: faith and understanding grow through honest attention and continued seeking.',
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
