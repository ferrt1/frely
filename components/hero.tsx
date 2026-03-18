"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

function PhoneMockup() {
  return (
    <div className="relative w-full max-w-[320px] mx-auto">
      {/* Phone Frame */}
      <div className="relative rounded-[3rem] border-[6px] border-neutral-900 bg-neutral-900 p-1 shadow-2xl shadow-black/30">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 h-7 w-24 -translate-x-1/2 rounded-b-2xl bg-neutral-900 z-10" />

        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2.25rem] bg-white">
          {/* WhatsApp Header */}
          <div className="bg-[#075E54] px-4 py-3 pt-9 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">SS</span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Salón Sofía</p>
              <p className="text-white/70 text-xs">en línea</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="p-3 min-h-[360px] space-y-2.5" style={{ backgroundColor: "#ece5dd" }}>
            {/* Customer Message */}
            <div className="flex justify-end">
              <div className="bg-[#dcf8c6] rounded-lg rounded-tr-none px-3 py-2 max-w-[85%] shadow-sm">
                <p className="text-neutral-800 text-sm">Hola! Quiero sacar turno para mañana</p>
                <p className="text-neutral-500 text-[10px] text-right mt-1">14:32</p>
              </div>
            </div>

            {/* Bot Response */}
            <div className="flex justify-start">
              <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[90%] shadow-sm">
                <p className="text-neutral-800 text-sm">Hola! Gracias por contactarnos</p>
                <p className="text-neutral-800 text-sm mt-1">Tenemos disponibles estos horarios:</p>
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
                <p className="text-neutral-500 text-[10px] text-right mt-2">✓✓ 14:32</p>
              </div>
            </div>

            {/* Customer Reply */}
            <div className="flex justify-end">
              <div className="bg-[#dcf8c6] rounded-lg rounded-tr-none px-3 py-2 max-w-[85%] shadow-sm">
                <p className="text-neutral-800 text-sm">El de las 16:30 por favor!</p>
                <p className="text-neutral-500 text-[10px] text-right mt-1">14:33</p>
              </div>
            </div>

            {/* Bot Confirmation */}
            <div className="flex justify-start">
              <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[90%] shadow-sm">
                <p className="text-neutral-800 text-sm">Perfecto! Turno confirmado para mañana 16:30 - Uñas gel</p>
                <p className="text-neutral-800 text-sm mt-1">Te esperamos! 😊</p>
                <p className="text-neutral-500 text-[10px] text-right mt-2">✓✓ 14:33</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* Subtle grid pattern */}
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
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border/50 text-sm text-muted-foreground mb-6">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span>Automatizacion con IA</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground text-balance leading-[1.1]">
              Tu negocio atiende solo
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
              Automatiza las respuestas de WhatsApp, Instagram y Telegram. Sin contratar a nadie. Sin perder clientes.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 h-12 px-6 text-[15px] gap-2 group">
                Empezar gratis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6 text-[15px] border-border hover:bg-secondary">
                Ver demo
              </Button>
            </div>
            
            {/* Stats */}
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
                <p className="text-sm text-muted-foreground mt-1">Satisfaccion</p>
              </div>
            </div>
          </div>
          
          {/* Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
