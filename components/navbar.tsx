"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

function FrelyLogo() {
  return (
    <div className="flex items-center">
      <span className="text-2xl font-bold text-foreground tracking-tight">frely</span>
      <svg
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        className="-mt-3 -ml-0.5"
        aria-hidden="true"
      >
        <rect x="0" y="0" width="14" height="10" rx="2" fill="#2ecc71" />
        <polygon points="3,10 6,10 3,14" fill="#2ecc71" />
      </svg>
    </div>
  )
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: "Cómo funciona", href: "#como-funciona" },
    { label: "Precios", href: "#precios" },
    { label: "Contacto", href: "#contacto" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <FrelyLogo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Empezar gratis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-fit">
                Empezar gratis
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
