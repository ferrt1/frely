"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const seen = sessionStorage.getItem("frely_splash_seen")
    if (seen) {
      setShowSplash(false)
      return
    }
    const timer = setTimeout(() => {
      setShowSplash(false)
      sessionStorage.setItem("frely_splash_seen", "1")
    }, 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-foreground"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center gap-6">
              {/* Logo animation */}
              <div className="flex items-center gap-1">
                <motion.span
                  className="text-5xl sm:text-6xl font-semibold text-background tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  frely
                </motion.span>
                <motion.svg
                  width="22"
                  height="18"
                  viewBox="0 0 16 14"
                  fill="none"
                  className="-mt-4"
                  initial={{ opacity: 0, scale: 0, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.4, ease: "backOut" }}
                >
                  <rect x="0" y="0" width="13" height="9" rx="2" fill="#2ecc71" />
                  <polygon points="2.5,9 5.5,9 2.5,12.5" fill="#2ecc71" />
                </motion.svg>
              </div>

              {/* Tagline */}
              <motion.p
                className="text-background/40 text-sm sm:text-base tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Tu negocio atiende solo
              </motion.p>

              {/* Loading bar */}
              <motion.div
                className="w-32 h-1 rounded-full bg-background/10 overflow-hidden mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.div
                  className="h-full bg-[#2ecc71] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.1, delay: 1, ease: "easeInOut" }}
                />
              </motion.div>
            </div>

            {/* Background glow effects */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#2ecc71]/5 blur-3xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#2ecc71]/3 blur-3xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={showSplash ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: showSplash ? 0.2 : 0 }}
      >
        {children}
      </motion.div>
    </>
  )
}
