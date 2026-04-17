'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>()

  useEffect(() => {
    const dot = dotRef.current
    const ringEl = ringRef.current
    if (!dot || !ringEl) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      dot.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`
    }

    const onEnterLink = () => {
      ringEl.style.width = '60px'
      ringEl.style.height = '60px'
      ringEl.style.borderColor = 'rgba(123,97,255,0.6)'
    }

    const onLeaveLink = () => {
      ringEl.style.width = '36px'
      ringEl.style.height = '36px'
      ringEl.style.borderColor = 'rgba(255,255,255,0.4)'
    }

    // Smooth ring follow
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      ringEl.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`
      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)
    document.addEventListener('mousemove', onMove)

    const links = document.querySelectorAll('a, button')
    links.forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor" />
      <div ref={ringRef} className="cursor-follower" />
    </>
  )
}
