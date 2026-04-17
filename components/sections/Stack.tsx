'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CLOUD = 'di7znsrrr'
function getImg(name: string) {
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${encodeURIComponent(name)}.png`
}

interface StackItem { name: string; color: string }
const stackItems: StackItem[] = [
  { name: 'AWS', color: '#FF9900' }, { name: 'Vercel', color: '#D4D4D4' }, { name: 'Figma', color: '#F24E1E' },
  { name: 'Blender', color: '#EA7600' }, { name: 'After-Effects', color: '#9999FF' }, { name: 'nextjs', color: '#FFFFFF' },
  { name: 'React', color: '#61DAFB' }, { name: 'GSAP', color: '#88CE02' }, { name: 'TypeScript', color: '#3178C6' },
  { name: 'Notion', color: '#FFFFFF' }, { name: 'Adobe_CC', color: '#DA1F26' }, { name: 'Hotjar', color: '#FF3D00' },
]

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stack-item', { scrollTrigger: { trigger: '.stack-grid', start: 'top 80%' }, opacity: 0, scale: 0.8, stagger: 0.05, duration: 0.5, ease: 'back.out(1.7)' })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // --- 3D Tilt Logic ---
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }

  return (
    <section ref={sectionRef} className="py-32 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
        <div>
          <p className="text-xs tracking-widest uppercase text-white/30 font-mono mb-4">The Build Environment</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-none">A proven stack for<br /><span className="text-white/20 italic">speed and scale.</span></h2>
        </div>
        <button className="px-8 py-4 border border-white/20 text-white text-sm hover:bg-white hover:text-black transition-all duration-300">Start a project</button>
      </div>

      <div className="stack-grid grid grid-cols-3 md:grid-cols-6 gap-px bg-white/5">
        {stackItems.map((item) => (
          <div
            key={item.name}
            className="stack-item tilt-card group relative aspect-square flex flex-col items-center justify-center gap-3 bg-[var(--background)] overflow-hidden cursor-pointer transition-[box-shadow] duration-500"
            style={{ '--glow-text': item.color } as React.CSSProperties}
            onMouseMove={handleTilt}
            onMouseLeave={(e) => {
              handleTiltLeave(e)
                ; (e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.boxShadow = `0 0 40px ${item.color}35, inset 0 0 0 1px rgba(255,255,255,0.1)`
            }}
          >
            <div className="absolute inset-0 bg-white/[0.07] backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 50%, ${item.color}20, transparent 60%)` }} />

            <img
              src={getImg(item.name)}
              alt={item.name}
              draggable={false}
              className="h-12 md:h-14 w-auto object-contain relative z-10 opacity-50 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
              style={{ filter: 'drop-shadow(0 0 0px transparent)' }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = `drop-shadow(0 0 12px ${item.color})` }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'drop-shadow(0 0 0px transparent)' }}
            />
            <span className="text-xs text-white/20 group-hover:text-[var(--glow-text)] transition-all duration-300 tracking-wide font-mono text-center relative z-10">{item.name}</span>
            <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out" style={{ backgroundColor: item.color }} />
          </div>
        ))}
      </div>
    </section>
  )
}