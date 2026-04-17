'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonial() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-content', {
        scrollTrigger: { trigger: '.testimonial-content', start: 'top 80%' },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="testimonial-content">
          <div className="text-6xl text-white/10 font-serif mb-8">"</div>
          <blockquote className="text-2xl md:text-3xl text-white/70 leading-relaxed font-light tracking-tight mb-12">
            YourBrand has been instrumental in reducing our overhead in more than one area of our business.
            We are excited to continue to work with them to identify areas where AI can be leveraged to
            streamline processes.
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">
              SO
            </div>
            <div>
              <p className="text-white font-semibold">Shaun Olson</p>
              <p className="text-white/40 text-sm">Cobe Construction Inc.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
