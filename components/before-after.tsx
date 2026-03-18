"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { X, Check, Clock, MessageCircleOff, UserX, Headphones, Zap, CalendarCheck } from "lucide-react"

const withoutFrely = [
  { icon: MessageCircleOff, text: "Mensajes sin responder por horas" },
  { icon: Clock, text: "Clientes que se van a la competencia" },
  { icon: UserX, text: "Perdés ventas fuera de horario" },
]

const withFrely = [
  { icon: Zap, text: "Respuesta instantánea, 24/7" },
  { icon: Headphones, text: "Atención personalizada con IA" },
  { icon: CalendarCheck, text: "Reservas y pedidos automáticos" },
]

export function BeforeAfter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-neutral-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 tracking-tight">
            De perder clientes a atender 24/7
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Sin Frely */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-red-200 bg-red-50/60 p-6 sm:p-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-medium mb-6">
              <X className="h-3.5 w-3.5" />
              Sin Frely
            </div>
            <div className="space-y-5">
              {withoutFrely.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                    <item.icon className="h-4 w-4 text-red-500" />
                  </div>
                  <p className="text-neutral-700 text-[15px] leading-snug pt-1.5">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Con Frely */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="rounded-2xl border border-[#2ecc71]/20 bg-[#2ecc71]/5 p-6 sm:p-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2ecc71]/10 text-[#27ae60] text-sm font-medium mb-6">
              <Check className="h-3.5 w-3.5" />
              Con Frely
            </div>
            <div className="space-y-5">
              {withFrely.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-9 h-9 rounded-xl bg-[#2ecc71]/10 flex items-center justify-center shrink-0">
                    <item.icon className="h-4 w-4 text-[#2ecc71]" />
                  </div>
                  <p className="text-neutral-700 text-[15px] leading-snug pt-1.5">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
