"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "motion/react"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "¿Cuánto tarda configurar Frely?",
    answer: "Menos de 5 minutos. Solo necesitás vincular tu cuenta de WhatsApp, Instagram o Telegram, cargar la información de tu negocio y listo. No se necesitan conocimientos técnicos.",
  },
  {
    question: "¿Los clientes saben que hablan con un bot?",
    answer: "Las respuestas son tan naturales que la mayoría no lo nota. Podés personalizar el tono, las expresiones y hasta los emojis para que suene exactamente como vos.",
  },
  {
    question: "¿Puedo usar Frely en varios canales a la vez?",
    answer: "Sí. Dependiendo de tu plan, podés conectar WhatsApp, Instagram y Telegram simultáneamente. Todas las conversaciones se gestionan desde un solo panel.",
  },
  {
    question: "¿Qué pasa si el bot no sabe responder algo?",
    answer: "Frely detecta cuando una consulta necesita atención humana y te notifica al instante. También podés configurar reglas para que derive automáticamente en ciertos casos.",
  },
  {
    question: "¿Puedo cancelar mi suscripción en cualquier momento?",
    answer: "Sí, sin penalidades ni preguntas. Podés cambiar de plan, hacer upgrade o cancelar cuando quieras desde tu panel de control.",
  },
]

function FAQItem({ faq, index, isInView }: { faq: typeof faqs[0]; index: number; isInView: boolean }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="border-b border-border last:border-b-0"
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.07 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-base font-medium text-foreground pr-4 group-hover:text-[#2ecc71] transition-colors">
          {faq.question}
        </span>
        <motion.div
          className="shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-[#2ecc71]/10 transition-colors"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <Minus className="h-4 w-4 text-[#2ecc71]" />
          ) : (
            <Plus className="h-4 w-4 text-muted-foreground group-hover:text-[#2ecc71] transition-colors" />
          )}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted-foreground leading-relaxed text-sm sm:text-base pr-12">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-16 sm:py-24 bg-background overflow-hidden">
      <div className="mx-auto max-w-3xl px-4 sm:px-6" ref={ref}>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="text-sm font-medium text-[#2ecc71] uppercase tracking-wider mb-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            FAQ
          </motion.p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Todo lo que necesitás saber antes de empezar
          </p>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-border bg-card p-2 sm:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} isInView={isInView} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
