"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"

function FrelyLogo() {
  return (
    <div className="flex items-center gap-0.5">
      <span className="text-xl font-semibold text-neutral-900 tracking-tight">frely</span>
      <svg
        width="14"
        height="12"
        viewBox="0 0 16 14"
        fill="none"
        className="-mt-2.5"
        aria-hidden="true"
      >
        <rect x="0" y="0" width="13" height="9" rx="2" fill="#2ecc71" />
        <polygon points="2.5,9 5.5,9 2.5,12.5" fill="#2ecc71" />
      </svg>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

function MercadoPagoIcon() {
  return (
    <span className="text-white text-lg font-bold">MP</span>
  )
}

function GoogleCalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
      <path d="M18 2H6a4 4 0 00-4 4v12a4 4 0 004 4h12a4 4 0 004-4V6a4 4 0 00-4-4zM6 4h12a2 2 0 012 2v1H4V6a2 2 0 012-2zm12 16H6a2 2 0 01-2-2V9h16v9a2 2 0 01-2 2zm-7-8h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2zm-8 4h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/>
    </svg>
  )
}

const integrations = [
  { name: "WhatsApp", color: "#25D366", Icon: WhatsAppIcon },
  { name: "Instagram", color: "#E4405F", Icon: InstagramIcon },
  { name: "Telegram", color: "#0088cc", Icon: TelegramIcon },
  { name: "Mercado Pago", color: "#009ee3", Icon: MercadoPagoIcon },
  { name: "Google Calendar", color: "#4285f4", Icon: GoogleCalendarIcon },
]

export function Integrations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-[#2ecc71] uppercase tracking-wider mb-3">
            Integraciones
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 tracking-tight">
            Se conecta con todo lo que ya usás
          </h2>
        </motion.div>

        {/* Orbital layout */}
        <div className="relative h-[400px] sm:h-[450px] max-w-[500px] mx-auto">
          {/* Center - Frely logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            {/* Pulse rings */}
            <motion.div
              className="absolute -inset-5 rounded-full bg-[#2ecc71]/15"
              animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
              className="absolute -inset-5 rounded-full bg-[#2ecc71]/10"
              animate={{ scale: [1, 2.2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
            />
            <div className="w-20 h-20 rounded-2xl bg-white shadow-lg border border-neutral-100 flex items-center justify-center">
              <FrelyLogo />
            </div>
          </motion.div>

          {/* Orbit circle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] rounded-full border border-dashed border-neutral-300"
          />

          {/* Rotating container */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[360px] sm:h-[360px]"
          >
            {integrations.map((integration, index) => {
              const angle = (index * 360) / integrations.length - 90
              const rad = (angle * Math.PI) / 180

              return (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${Math.cos(rad) * 50}% - 28px)`,
                    top: `calc(50% + ${Math.sin(rad) * 50}% - 28px)`,
                  }}
                >
                  {/* Counter-rotate so icons stay upright */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="flex flex-col items-center"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center"
                      style={{ backgroundColor: integration.color }}
                    >
                      <integration.Icon />
                    </div>
                    <p className="text-xs text-neutral-600 font-medium mt-1.5 whitespace-nowrap">
                      {integration.name}
                    </p>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
