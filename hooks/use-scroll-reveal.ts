'use client'

import { useEffect, useRef } from 'react'

/**
 * Attach this hook to a container element.
 * Every child with [data-reveal] gets the .is-visible class
 * once it enters the viewport, triggering the CSS transition.
 */
export function useScrollReveal() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.querySelectorAll('[data-reveal]').forEach((node) => {
        node.classList.add('is-visible')
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    el.querySelectorAll('[data-reveal]').forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [])

  return ref
}

