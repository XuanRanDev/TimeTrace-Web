import { useEffect, useRef } from 'react'

export default function MouseGlow() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })

  useEffect(() => {
    let rafId = 0

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12
      pos.current.y += (target.current.y - pos.current.y) * 0.12

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${pos.current.x - 150}px, ${pos.current.y - 150}px)`
      }
      if (innerRef.current) {
        const ix = pos.current.x + (target.current.x - pos.current.x) * 0.25
        const iy = pos.current.y + (target.current.y - pos.current.y) * 0.25
        innerRef.current.style.transform = `translate(${ix - 20}px, ${iy - 20}px)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x - 4}px, ${target.current.y - 4}px)`
      }
      rafId = requestAnimationFrame(animate)
    }

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div
        ref={outerRef}
        className="pointer-events-none z-[9999]"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, rgba(6,182,212,0.05) 40%, transparent 70%)',
          filter: 'blur(2px)',
          willChange: 'transform',
        }}
      />
      <div
        ref={innerRef}
        className="pointer-events-none z-[9999]"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.35) 0%, transparent 70%)',
          willChange: 'transform',
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none z-[9999]"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #60a5fa, #06b6d4)',
          boxShadow: '0 0 10px rgba(37,99,235,0.5), 0 0 20px rgba(6,182,212,0.3)',
          willChange: 'transform',
        }}
      />
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          body { cursor: none !important; }
          a, button, [role="button"] { cursor: none !important; }
        }
      `}</style>
    </>
  )
}
