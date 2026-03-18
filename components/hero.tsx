"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

interface ChatMessage {
  id: number
  text: string | React.ReactNode
  sender: "customer" | "bot"
  time: string
}

const chatMessages: ChatMessage[] = [
  {
    id: 1,
    text: "Hola! Quiero sacar turno para mañana",
    sender: "customer",
    time: "14:32",
  },
  {
    id: 2,
    text: (
      <>
        <p>Hola! Gracias por contactarnos</p>
        <p className="mt-1">Tenemos disponibles estos horarios:</p>
        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-2 text-sm text-neutral-700">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2ecc71]" />
            10:00 - Manicura
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-700">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2ecc71]" />
            14:00 - Pedicura
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-700">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2ecc71]" />
            16:30 - Uñas gel
          </div>
        </div>
      </>
    ),
    sender: "bot",
    time: "14:32",
  },
  {
    id: 3,
    text: "El de las 16:30 por favor!",
    sender: "customer",
    time: "14:33",
  },
  {
    id: 4,
    text: "Perfecto! Turno confirmado para mañana 16:30 - Uñas gel\nTe esperamos! 😊",
    sender: "bot",
    time: "14:33",
  },
]

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-neutral-400"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function AnimatedChat() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const [showTyping, setShowTyping] = useState(false)

  useEffect(() => {
    const delays = [500, 2200, 4500, 6800]
    const typingDelays = [0, 1200, 3500, 5800]
    const timeouts: ReturnType<typeof setTimeout>[] = []

    typingDelays.forEach((delay, index) => {
      if (chatMessages[index].sender === "bot") {
        timeouts.push(
          setTimeout(() => setShowTyping(true), delay)
        )
      }
    })

    delays.forEach((delay, index) => {
      timeouts.push(
        setTimeout(() => {
          setShowTyping(false)
          setVisibleMessages((prev) => [...prev, chatMessages[index].id])
        }, delay)
      )
    })

    // Reset and loop
    const totalDuration = 10000
    timeouts.push(
      setTimeout(() => {
        setVisibleMessages([])
        setShowTyping(false)
      }, totalDuration)
    )

    const interval = setInterval(() => {
      setVisibleMessages([])
      setShowTyping(false)

      typingDelays.forEach((delay, index) => {
        if (chatMessages[index].sender === "bot") {
          timeouts.push(
            setTimeout(() => setShowTyping(true), delay)
          )
        }
      })

      delays.forEach((delay, index) => {
        timeouts.push(
          setTimeout(() => {
            setShowTyping(false)
            setVisibleMessages((prev) => [...prev, chatMessages[index].id])
          }, delay)
        )
      })
    }, totalDuration)

    return () => {
      timeouts.forEach(clearTimeout)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="p-3 h-[480px] space-y-2.5" style={{ backgroundColor: "#ece5dd" }}>
      <AnimatePresence>
        {chatMessages
          .filter((msg) => visibleMessages.includes(msg.id))
          .map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex ${msg.sender === "customer" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`${
                  msg.sender === "customer"
                    ? "bg-[#dcf8c6] rounded-lg rounded-tr-none max-w-[85%]"
                    : "bg-white rounded-lg rounded-tl-none max-w-[90%]"
                } px-3 py-2 shadow-sm`}
              >
                <div className="text-neutral-800 text-sm whitespace-pre-line">{msg.text}</div>
                <p className="text-neutral-500 text-[10px] text-right mt-1">
                  {msg.sender === "bot" && "✓✓ "}
                  {msg.time}
                </p>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
      {showTyping && <TypingIndicator />}
    </div>
  )
}

function PhoneMockup() {
  return (
    <motion.div
      className="relative w-full max-w-[320px] mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
    >
      <div className="relative rounded-[3rem] border-[6px] border-neutral-900 bg-neutral-900 p-1 shadow-2xl shadow-black/30">
        <div className="absolute left-1/2 top-0 h-7 w-24 -translate-x-1/2 rounded-b-2xl bg-neutral-900 z-10" />
        <div className="relative overflow-hidden rounded-[2.25rem] bg-white">
          <div className="bg-[#075E54] px-4 py-3 pt-9 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">SS</span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Salón Sofía</p>
              <p className="text-white/70 text-xs">en línea</p>
            </div>
          </div>
          <AnimatedChat />
        </div>
      </div>
    </motion.div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%23000' stroke-width='1'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Text Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border/50 text-sm text-muted-foreground mb-6">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span>Automatización con IA</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground text-balance leading-[1.1]">
              Tu negocio atiende{" "}
              <span className="relative inline-block">
                solo
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 100 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M2 8 Q 50 2, 98 8"
                    stroke="#2ecc71"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
              Automatizá las respuestas de WhatsApp, Instagram y Telegram. Sin contratar a nadie. Sin perder clientes.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 h-12 px-6 text-[15px] gap-2 group"
              >
                Empezar gratis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-6 text-[15px] border-border hover:bg-secondary"
              >
                Ver demo
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t border-border/50 grid grid-cols-3 gap-8">
              <div>
                <p className="text-2xl sm:text-3xl font-semibold text-foreground">2.5k+</p>
                <p className="text-sm text-muted-foreground mt-1">Negocios activos</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-semibold text-foreground">1M+</p>
                <p className="text-sm text-muted-foreground mt-1">Mensajes/mes</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-semibold text-foreground">98%</p>
                <p className="text-sm text-muted-foreground mt-1">Satisfacción</p>
              </div>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
