'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

function useScramble(text: string, trigger: boolean) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (!trigger) return
    let iteration = 0
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, idx) => {
            if (char === ' ') return ' '
            if (idx < iteration) return text[idx]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )
      if (iteration >= text.length) clearInterval(interval)
      iteration += 0.5
    }, 30)
    return () => clearInterval(interval)
  }, [trigger, text])

  return display
}

function NavLink({ href, children }: { href: string; children: string }) {
  const [hover, setHover] = useState(false)
  const scrambled = useScramble(children, hover)

  return (
    <Link
      href={href}
      className="text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors font-mono"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {scrambled}
    </Link>
  )
}

export default function Navbar() {
  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 100], ['rgba(10,10,10,0)', 'rgba(10,10,10,0.9)'])

  return (
    <motion.header
      style={{ backgroundColor: bg }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-lg tracking-tight">
          <span className="text-white">Time</span>
          <span className="text-[var(--accent)]">Utilize</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/work">Works</NavLink>
        </nav>

        <Link
          href="/contact"
          className="text-sm px-5 py-2 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 tracking-wide"
        >
          Work With Us
        </Link>
      </div>
    </motion.header>
  )
}
