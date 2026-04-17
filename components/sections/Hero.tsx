'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import Link from 'next/link'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

// --- Magnetic Button Wrapper ---
function MagneticBtn({ children, className, ...props }: any) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) * 0.3
    const y = (e.clientY - top - height / 2) * 0.3
    gsap.to(ref.current, { x, y, duration: 0.2, ease: 'power2.out' })
  }

  const handleLeave = () => {
    if (!ref.current) return
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)' })
  }

  return (
    <div ref={ref} onMouseMove={handleMouse} onMouseLeave={handleLeave} className="inline-block">
      <div className={className} {...props}>{children}</div>
    </div>
  )
}

export default function Hero() {
  const titleRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrambleText, setScrambleText] = useState('Digital')

  useEffect(() => {
    // Text Scramble on Load
    let iteration = 0
    const interval = setInterval(() => {
      setScrambleText('Digital'.split('').map((char, idx) => {
        if (idx < iteration) return 'Digital'[idx]
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join(''))
      if (iteration >= 'Digital'.length) clearInterval(interval)
      iteration += 1 / 2
    }, 30)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })
      tl.from('.hero-badge', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
        .from('.hero-line', { y: '100%', opacity: 0, duration: 1, stagger: 0.15, ease: 'power4.out' }, '-=0.3')
        .from('.hero-sub', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .from('.hero-cta', { opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.5')

      gsap.to('.glow-orb-1', { x: 100, y: -100, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.glow-orb-2', { x: -150, y: 100, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    }, containerRef)

    return () => { ctx.revert(); clearInterval(interval) }
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
      <div className="absolute top-20 right-40 w-96 h-96 glow-orb-1 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(circle, #7B61FF 0%, transparent 70%)', boxShadow: '0 0 60px rgba(123, 97, 255, 0.4)' }} />
      <div className="absolute bottom-32 left-20 w-80 h-80 glow-orb-2 rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(circle, #FF61D6 0%, transparent 70%)', boxShadow: '0 0 60px rgba(255, 97, 214, 0.3)' }} />

      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />

      <div className="max-w-7xl mx-auto px-6 py-20 w-full relative z-10">
        <div className="hero-badge inline-flex items-center gap-3 mb-12 px-4 py-2 rounded-full backdrop-blur-md bg-white/[0.08] border border-white/[0.15] hover:bg-white/[0.12] hover:border-white/[0.25] transition-all duration-300">
          <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
          <span className="text-sm text-white/60 tracking-widest uppercase font-mono">2 more Q2 spots available</span>
        </div>

        <div ref={titleRef} className="mb-8">
          <h1 className="hero-line text-[clamp(3rem,10vw,9rem)] font-black leading-none tracking-tighter text-white drop-shadow-[0_0_40px_rgba(123,97,255,0.5)]">Defining</h1>

          {/* Scramble Text Applied Here */}
          <h1 className="hero-line text-[clamp(3rem,10vw,9rem)] font-black leading-none tracking-tighter italic bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text inline-block"
            style={{ backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', width: '100%', height: '160px', filter: 'drop-shadow(0 0 40px rgba(255,97,214,0.4))' }}>
            {scrambleText}
          </h1>

          <h1 className="hero-line text-[clamp(3rem,10vw,9rem)] font-black leading-none tracking-tighter text-white drop-shadow-[0_0_40px_rgba(97,212,255,0.5)]">Identity</h1>
        </div>

        <p className="hero-sub max-w-xl text-white/50 text-lg leading-relaxed mb-12">
          We merge the precision of code with the power of design, orchestrating a single identity that signals authority everywhere.
        </p>

        <div className="flex flex-wrap gap-4">
          {/* Magnetic Buttons */}
          <MagneticBtn>
            <Link href="/contact" className="hero-cta relative group px-8 py-4 bg-white text-black font-semibold text-sm tracking-wide overflow-hidden rounded-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] block">
              <span className="relative z-10">Work With Us</span>
            </Link>
          </MagneticBtn>

          <MagneticBtn>
            <Link href="/about#core-capabilities" className="hero-cta group relative px-8 py-4 text-white/70 text-sm tracking-wide flex items-center gap-2 backdrop-blur-md bg-white/[0.08] border border-white/[0.15] hover:bg-white/[0.15] hover:border-white/[0.35] hover:text-white rounded-lg transition-all duration-300 overflow-hidden hover:shadow-[0_0_30px_rgba(123,97,255,0.4)] block">
              <span className="relative z-10">Explore our services</span>
              <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </MagneticBtn>
        </div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/20" />
        <span className="text-xs text-white/20 tracking-widest uppercase font-mono">scroll</span>
      </motion.div>
    </section>
  )
}