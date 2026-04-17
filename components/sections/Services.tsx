'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Service { number: string; title: string; desc: string; color: string }
const services: Service[] = [
  { number: '01', title: 'Web Development', desc: 'Transform concepts into high-performance experiences. Engineering story-driven websites and premium digital products.', color: '#7B61FF' },
  { number: '02', title: 'Software / AI', desc: 'We replace manual processes with intelligent software tailored to your specific operations.', color: '#61D4FF' },
  { number: '03', title: 'Branding', desc: 'We build strategic identities designed to secure a premium market position.', color: '#FF61D6' },
  { number: '04', title: '3D Animation', desc: 'We build cinematic 3D assets designed to give your brand a premium feel.', color: '#FFD661' },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-header', { scrollTrigger: { trigger: '.service-header', start: 'top 80%' }, opacity: 0, y: 40, duration: 1, ease: 'power3.out' })
      gsap.from('.service-card', { scrollTrigger: { trigger: '.services-grid', start: 'top 75%' }, opacity: 0, y: 60, duration: 0.8, stagger: 0.15, ease: 'power3.out' })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // 3D Tilt Logic
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left; const y = e.clientY - rect.top
    const centerX = rect.width / 2; const centerY = rect.height / 2
    el.style.transform = `perspective(1000px) rotateX(${(y - centerY) / 20}deg) rotateY(${(centerX - x) / 20}deg) scale3d(1.01, 1.01, 1.01)`
  }
  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }

  return (
    <section ref={sectionRef} className="py-32 max-w-7xl mx-auto px-6 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse opacity-30"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse opacity-20" style={{ animationDelay: '1s' }}></div>

      <div className="service-header flex flex-col md:flex-row justify-between items-start mb-20 gap-8 relative z-10">
        <div>
          <p className="text-xs tracking-widest uppercase text-white/40 font-mono mb-4 backdrop-blur-sm">Core Capabilities</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none">The full spectrum<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 italic">of core capabilities</span></h2>
        </div>
        <p className="max-w-sm text-white/50 text-base leading-relaxed backdrop-blur-sm">We replace the need for multiple vendors. From brand identity to custom software, we build the entire ecosystem your business runs on.</p>
      </div>

      <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
        {services.map((s, index) => (
          <div key={s.number} className="service-card group relative" onMouseEnter={() => setHoveredCard(index)} onMouseLeave={() => setHoveredCard(null)}>
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 30% 30%, ${s.color}20, transparent 50%)` }}></div>

            {/* tilt-card class added here */}
            <div className="relative tilt-card backdrop-blur-xl bg-white/[0.08] border border-white/[0.15] rounded-2xl p-8 md:p-10 hover:bg-white/[0.12] hover:border-white/[0.25] transition-[box-shadow] duration-500 cursor-pointer"
              style={{ boxShadow: hoveredCard === index ? `0 0 40px ${s.color}40, 0 0 80px ${s.color}20` : '0 10px 30px rgba(0,0,0,0.3)' }}
              onMouseMove={handleTilt}
              onMouseLeave={(e) => { handleTiltLeave(e); setHoveredCard(null) }}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(135deg, ${s.color}40, transparent)`, borderRadius: 'inherit' }}></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <span className="text-xs font-mono text-white/40 tracking-widest group-hover:text-white/60 transition-colors duration-300">{s.number}</span>
                  <span className="text-white/30 group-hover:text-white group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300 text-xl" style={{ color: hoveredCard === index ? s.color : 'inherit' }}>↗</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300" style={{ backgroundImage: hoveredCard === index ? `linear-gradient(135deg, ${s.color}, ${s.color}99)` : 'none' }}>{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">{s.desc}</p>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full rounded-full transition-all duration-500" style={{ backgroundColor: s.color }}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}