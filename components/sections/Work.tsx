'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const works = [
  {
    id: '01',
    name: 'PROJECT AETHER',
    category: 'VISUAL ENGINEERING',
    desc: 'Zero-latency WebGL rendering for immersive luxury commerce.',
    color: '#1a1a2e',
  },
  {
    id: '02',
    name: 'PROJECT SENTINEL',
    category: 'SYSTEM ARCHITECTURE',
    desc: 'Trustless biometric authentication protocols with fluid user experience.',
    color: '#0d1117',
  },
  {
    id: '03',
    name: 'PROJECT CORTEX',
    category: 'INTELLIGENT INTERFACES',
    desc: 'Adaptive dashboard logic designed to visualize complex AI outputs.',
    color: '#12121f',
  },
  {
    id: '04',
    name: 'PROJECT FLUX',
    category: 'IDENTITY SYSTEMS',
    desc: 'A molecular design system engineered for infinite digital scale.',
    color: '#0f1923',
  },
]

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-header', {
        scrollTrigger: { trigger: '.work-header', start: 'top 80%' },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.from('.work-item', {
        scrollTrigger: { trigger: '.work-list', start: 'top 75%' },
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 max-w-7xl mx-auto px-6">
      <div className="work-header mb-20">
        <p className="text-xs tracking-widest uppercase text-white/30 font-mono mb-4">
          Selected Work
        </p>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none">
          Redefining the standard.
        </h2>
        <p className="mt-4 text-white/40 max-w-md">
          We sharpen clarity, elevate design, and build digital identities that perform at the highest level.
        </p>
      </div>

      <div className="work-list divide-y divide-white/5">
        {works.map((work, i) => (
          <div
            key={work.id}
            className="work-item group flex items-center justify-between py-8 cursor-pointer hover:px-6 transition-all duration-300"
            style={{ backgroundColor: activeIndex === i ? work.color : 'transparent' }}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className="flex items-center gap-8">
              <span className="text-xs font-mono text-white/20">{work.id}</span>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{work.name}</h3>
                <p className="text-xs tracking-widest text-white/30 mt-1 font-mono">{work.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <p className="hidden md:block text-white/40 text-sm max-w-xs text-right">{work.desc}</p>
              <span className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 text-xl">
                ↗
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
