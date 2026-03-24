"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "motion/react"

const fallbackStats = [
  { value: 3, suffix: "+", label: "negocios ya atienden solos" },
  { value: 28, suffix: "+", label: "mensajes respondidos" },
  { value: 24, suffix: "/7", label: "sin parar" },
]

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value, inView])

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "k"
    }
    return num.toString()
  }

  return (
    <span className="text-[#2ecc71]">
      {formatNumber(count)}{suffix}
    </span>
  )
}

export function Metrics() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [stats, setStats] = useState(fallbackStats)

  useEffect(() => {
    fetch("https://51.210.10.187:8000/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats([
          { value: data.businesses_count, suffix: "+", label: "negocios ya atienden solos" },
          { value: data.messages_count, suffix: "+", label: "mensajes respondidos" },
          { value: 24, suffix: "/7", label: "sin parar" },
        ])
      })
      .catch(() => {
        // Keep fallback stats
      })
  }, [])

  return (
    <section ref={ref} className="bg-neutral-900 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-neutral-800">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center px-8"
            >
              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
              </p>
              <p className="text-neutral-400 mt-3 text-sm sm:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
