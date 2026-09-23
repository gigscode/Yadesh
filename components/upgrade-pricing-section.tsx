'use client'

import { useState } from 'react'
import { Check, Sparkles, HelpCircle, ChevronDown, ArrowRight, Lock } from 'lucide-react'
import { isPostHogConfigured } from '@/instrumentation-client'
import posthog from 'posthog-js'

interface UpgradePricingSectionProps {
  userEmail?: string
}

export function UpgradePricingSection({ userEmail }: UpgradePricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const isAnnual = billingCycle === 'annual'

  const handlePebbleCheckout = () => {
    if (isPostHogConfigured) posthog.capture('checkout_started', { billing_cycle: billingCycle })
    setIsProcessing(true)
    // In production, integrate Pebble checkout modal / redirect with plan ID
    // Example: window.Pebble?.checkout({ email: userEmail, plan: billingCycle })
    const pebbleCheckoutUrl = isAnnual
      ? 'https://checkout.pebble.io/yadesh-premium-annual'
      : 'https://checkout.pebble.io/yadesh-premium-monthly'
    
    // Fallback notification or redirect
    setTimeout(() => {
      setIsProcessing(false)
      window.location.href = pebbleCheckoutUrl
    }, 400)
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      q: 'What is included in the 21-day guided series?',
      a: 'One reading per day for 21 days around a single theme: Breakthrough, Prayer, or Kingdom Purpose. You can mark days complete, follow your progress, and return to any reading.',
    },
    {
      q: 'When does Premium access begin?',
      a: 'Your Premium features become available after payment is confirmed.',
    },
    {
      q: 'Can I switch between monthly and annual plans later?',
      a: 'Yes. You can upgrade to annual anytime to lock in the 33% discount, or switch between plans right from your settings.',
    },
    {
      q: 'What happens to my bookmarks if I cancel my subscription?',
      a: 'Your library is never deleted. You keep permanent access to your first 5 saved readings. If you saved more during Premium, they remain safely archived in your account until you resubscribe.',
    },
    {
      q: 'Is there a long-term contract or cancellation fee?',
      a: 'None whatsoever. You can cancel with one click at any time. You will continue to have full Premium access through the end of your prepaid billing period.',
    },
  ]

  return (
    <div className="upgrade-experience">
      {/* Billing Switcher */}
      <div className="upgrade-billing-toggle-wrap">
        <div className="upgrade-billing-toggle" role="group" aria-label="Billing cycle selector">
          <button
            type="button"
            className={`upgrade-toggle-btn ${!isAnnual ? 'active' : ''}`}
            onClick={() => setBillingCycle('monthly')}
            aria-pressed={!isAnnual}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`upgrade-toggle-btn ${isAnnual ? 'active' : ''}`}
            onClick={() => setBillingCycle('annual')}
            aria-pressed={isAnnual}
          >
            Annual
            <span className="upgrade-save-badge">Save 33%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="upgrade-plans">

        {/* Free Plan Card - Elevated, warm, structured */}
        <div className="upgrade-plan upgrade-plan-free">
          <div className="upgrade-plan-badge-row">
            <span className="plan-badge plan-badge-free">DAILY HABIT</span>
          </div>

          <div className="upgrade-plan-head">
            <h3 className="upgrade-plan-name">Free plan</h3>
            <p className="upgrade-plan-tagline">
              A simple way to read something thoughtful each day.
            </p>
            <div className="upgrade-plan-price">
              <strong>$0</strong>
              <span className="upgrade-price-sub">no cost</span>
            </div>
          </div>

          <div className="upgrade-features-group">
            <p className="upgrade-feature-group-title">What is included:</p>
            <ul className="upgrade-feature-list" aria-label="Free plan features">
              <li>
                <span className="feature-icon feature-icon-free"><Check size={14} /></span>
                <span>Daily micro-reading</span>
              </li>
              <li>
                <span className="feature-icon feature-icon-free"><Check size={14} /></span>
                <span>Streak tracking and daily reading habits</span>
              </li>
              <li>
                <span className="feature-icon feature-icon-free"><Check size={14} /></span>
                <span>Browse all 4 core pillars (Faith, Life, Books, History)</span>
              </li>
              <li>
                <span className="feature-icon feature-icon-free"><Check size={14} /></span>
                <span>Save up to 5 readings</span>
              </li>
              <li>
                <span className="feature-icon feature-icon-free"><Check size={14} /></span>
                <span>Public search and author exploration</span>
              </li>
            </ul>
          </div>

          <div className="upgrade-plan-footer">
            <div className="upgrade-plan-current-indicator">
              <span className="current-dot" aria-hidden="true" />
              <span>Your current plan</span>
            </div>
          </div>
        </div>

        {/* Premium Plan Card - High conversion, vibrant color accents, ambient glow */}
        <div className="upgrade-plan upgrade-plan-premium">
          <div className="upgrade-plan-badge-row">
            <span className="plan-badge plan-badge-premium">
              <Sparkles size={13} aria-hidden="true" />
              {isAnnual ? 'BEST VALUE · SAVE 33%' : 'MONTHLY PLAN'}
            </span>
          </div>

          <div className="upgrade-plan-head">
            <h3 className="upgrade-plan-name">Yadesh Premium</h3>
            <p className="upgrade-plan-tagline">
              Guided 21-day series and unlimited bookmarks when you want to keep going.
            </p>

            <div className="upgrade-plan-price">
              <strong>{isAnnual ? '$3.33' : '$4.99'}</strong>
              <span className="upgrade-price-sub">/ month</span>
            </div>
            <p className="upgrade-plan-annual-note">
              {isAnnual
                ? '$39.99 billed annually (saves you $20 every year)'
                : 'Billed monthly. Cancel or pause anytime with 1 click.'}
            </p>
          </div>

          <div className="upgrade-features-group">
            <p className="upgrade-feature-group-title upgrade-feature-group-title-premium">
              Everything in Free, plus:
            </p>
            <ul className="upgrade-feature-list upgrade-feature-list-premium" aria-label="Premium plan features">
              <li>
                <span className="feature-icon feature-icon-premium"><Check size={14} /></span>
                <span><strong>21-day guided series</strong> (Breakthrough, Prayer, Purpose)</span>
              </li>
              <li>
                <span className="feature-icon feature-icon-premium"><Check size={14} /></span>
                <span><strong>Unlimited bookmarks</strong> and personalized collections</span>
              </li>
              <li>
                <span className="feature-icon feature-icon-premium"><Check size={14} /></span>
                <span>Progress tracking for each series</span>
              </li>
            </ul>
          </div>

          <div className="upgrade-plan-footer">
            <button
              type="button"
              className="upgrade-cta-btn upgrade-cta-btn-primary"
              onClick={handlePebbleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? 'Opening checkout...' : (
                <>
                  Choose Premium {isAnnual ? 'for $39.99/yr' : 'for $4.99/mo'}
                  <ArrowRight size={16} aria-hidden="true" />
                </>
              )}
            </button>

            <div className="upgrade-pebble-trust">
              <Lock size={13} aria-hidden="true" />
              <span>Secure checkout</span>
            </div>
          </div>
        </div>

      </div>

      {/* FAQ Section */}
      <section className="upgrade-faq-section" aria-labelledby="upgrade-faq-title">
        <div className="upgrade-faq-header">
          <HelpCircle size={24} className="upgrade-faq-icon" aria-hidden="true" />
          <h3 id="upgrade-faq-title">Frequently Asked Questions</h3>
          <p>Clear answers about Yadesh Premium, billing, and cancellation.</p>
        </div>

        <div className="upgrade-faq-accordion">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i
            return (
              <div key={i} className={`upgrade-faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="upgrade-faq-question"
                  onClick={() => toggleFaq(i)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`faq-arrow ${isOpen ? 'rotate' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div className="upgrade-faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
