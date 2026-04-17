'use client'

import { useState } from 'react'
import Link from 'next/link'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

function ScrambleLink({ href, children }: { href: string; children: string }) {
  const [display, setDisplay] = useState(children)
  const [hovered, setHovered] = useState(false)

  const scramble = () => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplay(
        children
          .split('')
          .map((char, idx) => {
            if (char === ' ') return ' '
            if (idx < iteration) return children[idx]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )
      if (iteration >= children.length) clearInterval(interval)
      iteration += 0.4
    }, 25)
  }

  return (
    <Link
      href={href}
      className="block text-sm font-mono text-white/30 hover:text-white transition-colors tracking-widest uppercase py-1"
      onMouseEnter={() => { setHovered(true); scramble() }}
      onMouseLeave={() => { setHovered(false); setDisplay(children) }}
    >
      {display}
    </Link>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-3xl font-black tracking-tighter text-white mb-4">
              Time<span className="text-[var(--accent)]">Utilize</span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              We merge the precision of code with the power of design,
              orchestrating a single identity that signals authority everywhere.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-mono text-white/30 tracking-widest">
                AVAILABLE FOR PROJECTS
              </span>
            </div>
          </div>

          {/* Website Links */}
          <div>
            <p className="text-xs font-mono text-white/20 tracking-widest uppercase mb-6">Website</p>
            <ScrambleLink href="/">Home</ScrambleLink>
            <ScrambleLink href="/#services">Services</ScrambleLink>
            <ScrambleLink href="/about">About</ScrambleLink>
            <ScrambleLink href="/work">Works</ScrambleLink>
            <ScrambleLink href="/contact">Work With Us</ScrambleLink>
          </div>

          {/* Legal Links */}
          <div>
            <p className="text-xs font-mono text-white/20 tracking-widest uppercase mb-6">Legal</p>
            <ScrambleLink href="/terms-of-service">Terms of Service</ScrambleLink>
            <ScrambleLink href="/privacy-policy">Privacy Policy</ScrambleLink>
            <ScrambleLink href="/cookie-policy">Cookie Policy</ScrambleLink>
          </div>
        </div>

        {/* Big Footer Text */}
        <div className="relative overflow-hidden mb-12">
          <p
            className="text-[clamp(3rem,12vw,10rem)] font-black tracking-tighter leading-none text-white/5 select-none"
            aria-hidden
          >
            TIMEUTILIZE
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 pt-8">
          <p className="text-xs font-mono text-white/20 tracking-wide">
            © {new Date().getFullYear()} TimeUtilize. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Twitter', 'LinkedIn', 'Dribbble'].map((social) => (
              <Link
                key={social}
                href="#"
                className="text-xs font-mono text-white/20 hover:text-white transition-colors tracking-widest uppercase"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
