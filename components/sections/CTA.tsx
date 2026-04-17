'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

function MagneticBtn({ children, className, ...props }: any) {
  const ref = useRef<HTMLDivElement>(null)
  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    gsap.to(ref.current, { x: (e.clientX - left - width / 2) * 0.3, y: (e.clientY - top - height / 2) * 0.3, duration: 0.2, ease: 'power2.out' })
  }
  const handleLeave = () => {
    if (!ref.current) return
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)' })
  }
  return <div ref={ref} onMouseMove={handleMouse} onMouseLeave={handleLeave} className="inline-block"><div className={className} {...props}>{children}</div></div>
}

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content > *', { scrollTrigger: { trigger: '.cta-content', start: 'top 80%' }, opacity: 0, y: 50, stagger: 0.15, duration: 1, ease: 'power3.out' })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-40 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-[var(--accent)]/5 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="cta-content">
          <p className="text-xs tracking-widest uppercase text-white/30 font-mono mb-6">Ready for what's next?</p>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-none mb-8">Let's build<br /><span className="text-white/20 italic">something great.</span></h2>
          <p className="text-white/40 text-lg mb-12 max-w-md mx-auto">Let's discuss your vision and see if we are the right fit.</p>

          <div className="flex flex-wrap gap-4 justify-center">
            <MagneticBtn>
              <Link href="/contact" className="px-10 py-5 bg-white text-black font-bold text-sm tracking-wide hover:bg-[var(--accent)] hover:text-white transition-all duration-300 block">
                Work With Us
              </Link>
            </MagneticBtn>
            <MagneticBtn>
              <Link href="/about#core-capabilities" className="px-10 py-5 border border-white/20 text-white/70 text-sm tracking-wide hover:border-white/60 hover:text-white transition-all duration-300 block">
                Explore our services
              </Link>
            </MagneticBtn>
          </div>
        </div>
      </div>
    </section>
  )
}