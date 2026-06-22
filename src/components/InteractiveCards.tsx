import { useEffect, useRef, type ReactNode } from 'react'

export function SpotlightCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const spot = spotRef.current
    if (!card || !spot) return

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      spot.style.opacity = '1'
      spot.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(37,99,235,0.1), rgba(6,182,212,0.05), transparent 50%)`
    }

    const onLeave = () => {
      spot.style.opacity = '0'
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div ref={cardRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={spotRef}
        className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 pointer-events-none"
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export function TiltCard({ children, className = '', tiltAmount = 8 }: { children: ReactNode; className?: string; tiltAmount?: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      const tiltX = (0.5 - y) * tiltAmount
      const tiltY = (x - 0.5) * tiltAmount
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02,1.02,1.02)`
    }

    const onLeave = () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [tiltAmount])

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}
