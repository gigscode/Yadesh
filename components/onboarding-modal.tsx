'use client'

import { useState, useEffect, useMemo } from 'react'
import { Check, Sparkles, ArrowRight, ArrowLeft, Clock, BookOpen, Users, Compass, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { isPostHogConfigured } from '@/instrumentation-client'
import posthog from 'posthog-js'

const TOPICS = [
  { id: 'FAITH', label: 'Faith & Trust', desc: 'Active belief over circumstance' },
  { id: 'PRAYER', label: 'Prayer & Communion', desc: 'Access to the secret place' },
  { id: 'CHARACTER', label: 'Character & Discipline', desc: 'Formation of the interior life' },
  { id: 'HISTORY', label: 'Christian History', desc: 'Councils, reformations, and revivals' },
  { id: 'THEOLOGY', label: 'Biblical Theology', desc: 'Foundations of orthodox truth' },
  { id: 'HEALING', label: 'Miracles & Healing', desc: 'The covenant authority of God' },
  { id: 'PURPOSE', label: 'Calling & Kingdom', desc: 'Deploying your God-given potential' },
]

const AUTHORS = [
  { id: 'cs-lewis', name: 'C.S. Lewis', subtitle: 'Theology & Reason' },
  { id: 'corrie-ten-boom', name: 'Corrie ten Boom', subtitle: 'Endurance & Forgiveness' },
  { id: 'oswald-chambers', name: 'Oswald Chambers', subtitle: 'Devotion & Surrender' },
  { id: 'dietrich-bonhoeffer', name: 'Dietrich Bonhoeffer', subtitle: 'Costly Grace' },
  { id: 'kenneth-e-hagin', name: 'Kenneth E. Hagin', subtitle: 'Faith & Authority' },
  { id: 'derek-prince', name: 'Derek Prince', subtitle: 'Foundations & Warfare' },
  { id: 'smith-wigglesworth', name: 'Smith Wigglesworth', subtitle: 'Living Faith' },
  { id: 'charles-spurgeon', name: 'Charles Spurgeon', subtitle: 'Gospel & Preaching' },
]

const TIME_GOALS = [
  { id: '30s', label: '30 Seconds', title: 'The Spark', desc: '1 memorable quote and core conviction' },
  { id: '2m', label: '2 Minutes', title: 'The Principle', desc: '1 short actionable lesson with biblical grounding' },
  { id: '5m', label: '5 Minutes (Recommended)', title: 'The Complete Rhythm', desc: 'Full daily micro-reading, story, and practical takeaway' },
  { id: '10m', label: '10+ Minutes', title: 'Deep Study', desc: 'Extended biographical accounts and chapter deep dives' },
]

const STORAGE_KEY = 'yadesh_onboarding_v1'

export function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['FAITH', 'PRAYER', 'PURPOSE'])
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(['cs-lewis', 'oswald-chambers', 'derek-prince'])
  const [selectedTime, setSelectedTime] = useState<string>('5m')
  const [isSaving, setIsSaving] = useState(false)

  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    // Check local storage first
    const isCompleted = localStorage.getItem(STORAGE_KEY)
    if (isCompleted) return

    // If uncompleted locally, verify with Supabase profile if logged in
    async function checkStatus() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('onboarding_completed')
            .eq('id', user.id)
            .maybeSingle()
          
          if (profile?.onboarding_completed) {
            localStorage.setItem(STORAGE_KEY, 'true')
            return
          }
        }
      } catch {
        // Fall back to showing onboarding if uncompleted
      }
      setIsOpen(true)
    }

    checkStatus()
  }, [supabase])

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  const toggleAuthor = (id: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  const handleFinish = async () => {
    setIsSaving(true)
    const preferences = {
      topics: selectedTopics,
      authors: selectedAuthors,
      time: selectedTime,
    }

    // Persist locally
    localStorage.setItem(STORAGE_KEY, 'true')
    localStorage.setItem('yadesh_user_preferences', JSON.stringify(preferences))

    // Persist to Supabase if authenticated
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase
          .from('profiles')
          .update({
            onboarding_completed: true,
            preferred_topics: selectedTopics,
            preferred_authors: selectedAuthors,
            preferred_time: selectedTime,
          })
          .eq('id', user.id)
      }
    } catch {
      // Gracefully handled if migration has not been executed yet
    } finally {
      if (isPostHogConfigured) {
        posthog.capture('onboarding_completed', {
          selected_topic_count: selectedTopics.length,
          selected_author_count: selectedAuthors.length,
          reading_time_goal: selectedTime,
        })
      }
      setIsSaving(false)
      setIsOpen(false)
    }
  }

  const handleSkip = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    if (isPostHogConfigured) posthog.capture('onboarding_skipped', { onboarding_step: step })
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="onboarding-backdrop" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
      <div className="onboarding-modal">
        {/* Top Header */}
        <div className="onboarding-head">
          <div className="onboarding-step-indicator">
            <span className={`step-dot ${step >= 1 ? 'active' : ''}`} />
            <span className={`step-dot ${step >= 2 ? 'active' : ''}`} />
            <span className={`step-dot ${step >= 3 ? 'active' : ''}`} />
            <span className="step-label">Step {step} of 3</span>
          </div>

          <button
            type="button"
            className="onboarding-skip-btn"
            onClick={handleSkip}
            aria-label="Skip onboarding"
          >
            Skip for now
          </button>
        </div>

        {/* Step 1: Themes */}
        {step === 1 && (
          <div className="onboarding-step-content">
            <div className="onboarding-title-wrap">
              <span className="onboarding-pill">
                <Compass size={13} aria-hidden="true" />
                PERSONALIZATION
              </span>
              <h2 id="onboarding-title">What do you want to explore?</h2>
              <p>Choose the themes you want prioritized in your daily readings.</p>
            </div>

            <div className="onboarding-grid topics-grid">
              {TOPICS.map((topic) => {
                const isSelected = selectedTopics.includes(topic.id)
                return (
                  <button
                    key={topic.id}
                    type="button"
                    className={`onboarding-choice-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleTopic(topic.id)}
                    aria-pressed={isSelected}
                  >
                    <div className="choice-checkbox">
                      {isSelected ? <Check size={14} /> : null}
                    </div>
                    <div className="choice-text">
                      <strong>{topic.label}</strong>
                      <span>{topic.desc}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="onboarding-actions">
              <button
                type="button"
                className="onboarding-next-btn"
                onClick={() => setStep(2)}
                disabled={selectedTopics.length === 0}
              >
                Continue to Teachers
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Authors */}
        {step === 2 && (
          <div className="onboarding-step-content">
            <div className="onboarding-title-wrap">
              <span className="onboarding-pill">
                <Users size={13} aria-hidden="true" />
                VOICES OF FAITH
              </span>
              <h2 id="onboarding-title">Whose life and work inspires you?</h2>
              <p>Pick theologians, ministers, and authors to feature in your feed.</p>
            </div>

            <div className="onboarding-grid authors-grid">
              {AUTHORS.map((author) => {
                const isSelected = selectedAuthors.includes(author.id)
                return (
                  <button
                    key={author.id}
                    type="button"
                    className={`onboarding-choice-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleAuthor(author.id)}
                    aria-pressed={isSelected}
                  >
                    <div className="choice-checkbox">
                      {isSelected ? <Check size={14} /> : null}
                    </div>
                    <div className="choice-text">
                      <strong>{author.name}</strong>
                      <span>{author.subtitle}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="onboarding-actions split-actions">
              <button
                type="button"
                className="onboarding-back-btn"
                onClick={() => setStep(1)}
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back
              </button>
              <button
                type="button"
                className="onboarding-next-btn"
                onClick={() => setStep(3)}
                disabled={selectedAuthors.length === 0}
              >
                Set Daily Goal
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Daily Rhythm */}
        {step === 3 && (
          <div className="onboarding-step-content">
            <div className="onboarding-title-wrap">
              <span className="onboarding-pill">
                <Clock size={13} aria-hidden="true" />
                DAILY RHYTHM
              </span>
              <h2 id="onboarding-title">How much time do you want to invest?</h2>
              <p>Trade 5 minutes of scrolling for daily spiritual depth. You can change this anytime.</p>
            </div>

            <div className="onboarding-grid time-goals-grid">
              {TIME_GOALS.map((goal) => {
                const isSelected = selectedTime === goal.id
                return (
                  <button
                    key={goal.id}
                    type="button"
                    className={`onboarding-time-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(goal.id)}
                    aria-pressed={isSelected}
                  >
                    <div className="time-card-head">
                      <span className="time-duration">{goal.label}</span>
                      <strong className="time-title">{goal.title}</strong>
                    </div>
                    <p className="time-desc">{goal.desc}</p>
                    <div className="time-radio">
                      {isSelected && <span className="time-radio-dot" />}
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="onboarding-actions split-actions">
              <button
                type="button"
                className="onboarding-back-btn"
                onClick={() => setStep(2)}
                disabled={isSaving}
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back
              </button>
              <button
                type="button"
                className="onboarding-next-btn finish-btn"
                onClick={handleFinish}
                disabled={isSaving}
              >
                {isSaving ? 'Saving preferences...' : (
                  <>
                    Enter Yadesh
                    <Sparkles size={16} aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
