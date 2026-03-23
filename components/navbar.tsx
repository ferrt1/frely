"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowRight } from "lucide-react"

function FrelyLogo() {
  return (
    <a href="/" className="flex items-center gap-0.5 group">
      <span className="text-xl font-semibold text-foreground tracking-tight">frely</span>
      <svg
        width="14"
        height="12"
        viewBox="0 0 16 14"
        fill="none"
        className="-mt-2.5 transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      >
        <rect x="0" y="0" width="13" height="9" rx="2" fill="#2ecc71" />
        <polygon points="2.5,9 5.5,9 2.5,12.5" fill="#2ecc71" />
      </svg>
    </a>
  )
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: "Producto", href: "#como-funciona" },
    { label: "Precios", href: "#precios" },
    { label: "Testimonios", href: "#testimonios" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          <FrelyLogo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:gap-3">
            <a
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Iniciar sesion
            </a>
            <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 gap-1.5 group">
              Empezar gratis
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-border/50 flex flex-col gap-2">
                <a
                  href="/login"
                  className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Iniciar sesion
                </a>
                <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 gap-1.5">
                  Empezar gratis
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
