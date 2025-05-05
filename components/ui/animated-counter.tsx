'use client'

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  duration?: number
  delay?: number
  formatter?: (value: number) => string
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 1500,
  delay = 0,
  formatter = (val) => val.toString(),
  className = ''
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const startTimeRef = useRef<number | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isInView) return

    const timeout = setTimeout(() => {
      startTimeRef.current = null

      const animate = (timestamp: number) => {
        if (startTimeRef.current === null) {
          startTimeRef.current = timestamp
        }

        const elapsedTime = timestamp - startTimeRef.current
        const progress = Math.min(elapsedTime / duration, 1)
        
        // Easing function for smoother animation
        const easedProgress = easeOutQuart(progress)
        const currentValue = Math.floor(easedProgress * value)
        
        setCount(currentValue)

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate)
        } else {
          setCount(value)
        }
      }

      frameRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      if (timeout) clearTimeout(timeout)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [isInView, value, duration, delay])

  // Easing function for smoother animation
  const easeOutQuart = (x: number): number => {
    return 1 - Math.pow(1 - x, 4)
  }

  return (
    <span ref={ref} className={className}>
      {formatter(count)}
    </span>
  )
} 