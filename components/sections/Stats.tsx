'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '$100M+', label: 'Revenue Supported', desc: 'Systems backing nine-figure revenue. When performance is non-negotiable, we deliver.' },
  { value: '100+', label: 'Assets Deployed', desc: 'Production-ready assets for every channel. Ship campaigns and launches with confidence.' },
  { value: '$2.65B', label: 'Enterprise DNA', desc: 'Applying the architectural standards of a multi-billion dollar valuation to your brand.' },
]

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-item', {
        scrollTrigger: { trigger: '.stats-grid', start: 'top 75%' },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.9,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase text-white/30 font-mono mb-4">Impact at scale</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
            Design is subjective.<br />
            <span className="text-white/20 italic">Performance is not.</span>
          </h2>
        </div>

        <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item bg-[var(--background)] p-10">
              <div className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-sm font-mono text-[var(--accent)] tracking-widest uppercase mb-4">
                {stat.label}
              </div>
              <p className="text-white/40 text-sm leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
