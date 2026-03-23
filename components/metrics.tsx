"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "motion/react"

const stats = [
  { value: 200, suffix: "+", label: "negocios ya atienden solos" },
  { value: 50000, suffix: "+", label: "mensajes respondidos" },
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
