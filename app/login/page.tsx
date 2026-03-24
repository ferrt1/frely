"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { login } from "@/lib/api"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const data = await login(phone, password)

      localStorage.setItem("frely_session", JSON.stringify({
        token: data.token,
        businesses: data.businesses,
        current_business: data.current_business,
        name: data.current_business.name,
        initials: data.current_business.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
        plan: "Pro",
      }))

      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-[#2ecc71]/5 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#25D366]/5 blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-0.5">
            <span className="text-2xl font-semibold tracking-tight">frely</span>
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" className="-mt-3" aria-hidden="true">
              <rect x="0" y="0" width="13" height="9" rx="2" fill="#2ecc71" />
              <polygon points="2.5,9 5.5,9 2.5,12.5" fill="#2ecc71" />
            </svg>
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              Controlá tu negocio<br />
              <span className="text-[#2ecc71]">desde un solo lugar.</span>
            </h1>
            <p className="text-lg text-background/60 max-w-md">
              Métricas en tiempo real de tu asistente de IA. Conversaciones, ventas, contactos y más.
            </p>
          </div>
          <div className="flex items-center gap-8 text-sm text-background/40">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-background">200+</span>
              <span>Negocios activos</span>
            </div>
            <div className="w-px h-10 bg-background/10" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-background">50K+</span>
              <span>Mensajes/mes</span>
            </div>
            <div className="w-px h-10 bg-background/10" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-background">24/7</span>
              <span>Disponibilidad</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-sm space-y-8">
          <div className="lg:hidden flex justify-center">
            <Link href="/" className="flex items-center gap-0.5">
              <span className="text-2xl font-semibold text-foreground tracking-tight">frely</span>
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none" className="-mt-3">
                <rect x="0" y="0" width="13" height="9" rx="2" fill="#2ecc71" />
                <polygon points="2.5,9 5.5,9 2.5,12.5" fill="#2ecc71" />
              </svg>
            </Link>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight">Iniciá sesión</h2>
            <p className="text-sm text-muted-foreground">
              Ingresá tus credenciales para acceder al panel
            </p>
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3">
              <p className="text-xs text-destructive font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Usuario</Label>
              <Input
                id="phone"
                type="text"
                placeholder="Tu usuario"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <button type="button" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-foreground text-background hover:bg-foreground/90 gap-2 group"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
              ) : (
                <>
                  Acceder al panel
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            ¿No tenés cuenta?{" "}
            <Link href="/#precios" className="text-foreground font-medium hover:underline">
              Empezar gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
