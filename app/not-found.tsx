"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="text-center space-y-8 max-w-md">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "backOut" }}
        >
          <div className="relative inline-block">
            <span className="text-[120px] sm:text-[160px] font-bold text-foreground/5 leading-none select-none">
              404
            </span>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex items-center gap-1">
                <span className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">frely</span>
                <svg width="18" height="16" viewBox="0 0 16 14" fill="none" className="-mt-3">
                  <rect x="0" y="0" width="13" height="9" rx="2" fill="#2ecc71" />
                  <polygon points="2.5,9 5.5,9 2.5,12.5" fill="#2ecc71" />
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h1 className="text-xl sm:text-2xl font-bold">Página no encontrada</h1>
          <p className="text-sm text-muted-foreground">
            Parece que esta página no existe o fue movida. Volvé al inicio o al panel de control.
          </p>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button variant="outline" asChild>
            <Link href="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
          <Button className="bg-foreground text-background hover:bg-foreground/90 gap-2" asChild>
            <Link href="/dashboard">
              <Home className="h-4 w-4" />
              Ir al panel
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
