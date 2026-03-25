"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  User, Mail, Phone, Shield, Eye, EyeOff, Save, CheckCircle, Key, Bell, Smartphone,
} from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"

export default function PerfilPage() {
  const router = useRouter()
  const [user, setUser] = useState({ name: "", email: "", phone: "", initials: "", plan: "Pro" })
  const [saved, setSaved] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  useEffect(() => {
    const session = localStorage.getItem("frely_session")
    if (!session) {
      router.push("/login")
      return
    }
    try {
      const parsed = JSON.parse(session)
      const name = parsed.current_business?.name || parsed.name || ""
      setUser({
        name,
        email: parsed.email || "info@cafeavellaneda.com.ar",
        phone: parsed.phone || "+54 11 4567-8900",
        initials: name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
        plan: parsed.plan || "Pro",
      })
    } catch {
      router.push("/login")
    }
  }, [router])

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden">
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Mi perfil</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Gestioná tu información personal y seguridad</p>
          </div>
          <Button size="sm" className="gap-1.5 text-xs bg-foreground text-background hover:bg-foreground/90 shrink-0" onClick={handleSave}>
            {saved ? <><CheckCircle className="h-3.5 w-3.5" />Guardado</> : <><Save className="h-3.5 w-3.5" /><span className="hidden sm:inline">Guardar cambios</span><span className="sm:hidden">Guardar</span></>}
          </Button>
        </div>
      </FadeIn>

      <StaggerContainer className="space-y-6" delay={0.1}>
        {/* Profile Header */}
        <StaggerItem>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-foreground text-background text-2xl font-semibold">{user.initials}</AvatarFallback>
                  </Avatar>
                  <Badge className="absolute -bottom-1 -right-1 bg-[#2ecc71] text-white border-2 border-background text-[9px] px-1.5">{user.plan}</Badge>
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <h3 className="text-lg font-bold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2 justify-center sm:justify-start mt-2">
                    <Badge variant="outline" className="text-[10px] gap-1">
                      <Shield className="h-3 w-3" />Administrador
                    </Badge>
                    <Badge variant="outline" className="text-[10px] text-[#2ecc71] border-[#2ecc71]/20 bg-[#2ecc71]/10">
                      Cuenta verificada
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        {/* Personal Info */}
        <StaggerItem>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><User className="h-4 w-4" />Información personal</CardTitle>
              <CardDescription>Datos asociados a tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Nombre completo</Label>
                  <Input defaultValue={user.name} className="h-9 text-sm" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input defaultValue={user.email} className="h-9 text-sm pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input defaultValue={user.phone} className="h-9 text-sm pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Rol</Label>
                  <Input value="Administrador" disabled className="h-9 text-sm bg-muted" />
                </div>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        {/* Security */}
        <StaggerItem>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><Key className="h-4 w-4" />Seguridad</CardTitle>
              <CardDescription>Cambiá tu contraseña y configurá la seguridad de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Contraseña actual</Label>
                  <div className="relative">
                    <Input type={showCurrentPassword ? "text" : "password"} placeholder="••••••••" className="h-9 text-sm pr-10" />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showCurrentPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Nueva contraseña</Label>
                  <div className="relative">
                    <Input type={showNewPassword ? "text" : "password"} placeholder="••••••••" className="h-9 text-sm pr-10" />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showNewPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-1">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <p className="text-sm font-medium">Autenticación en dos pasos (2FA)</p>
                    <p className="text-xs text-muted-foreground">Agregá una capa extra de seguridad con tu teléfono</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">Alertas de inicio de sesión</p>
                    <p className="text-xs text-muted-foreground">Recibí un email cuando alguien inicie sesión en tu cuenta</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        {/* Preferences */}
        <StaggerItem>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4" />Preferencias</CardTitle>
              <CardDescription>Personalizá tu experiencia en frely</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="text-sm font-medium">Notificaciones por email</p>
                  <p className="text-xs text-muted-foreground">Resúmenes diarios y alertas importantes</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="text-sm font-medium">Notificaciones push</p>
                  <p className="text-xs text-muted-foreground">Alertas en tiempo real en el navegador</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium">Sonidos de notificación</p>
                  <p className="text-xs text-muted-foreground">Reproducir sonido al recibir una alerta</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        {/* Sessions */}
        <StaggerItem>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><Smartphone className="h-4 w-4" />Sesiones activas</CardTitle>
              <CardDescription>Dispositivos donde tu cuenta está iniciada</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-[#2ecc71]/20 bg-[#2ecc71]/5">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-[#2ecc71]/10 flex items-center justify-center">
                    <Smartphone className="h-4 w-4 text-[#2ecc71]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Este dispositivo</p>
                    <p className="text-xs text-muted-foreground">Windows · Chrome · Ahora mismo</p>
                  </div>
                </div>
                <Badge className="bg-[#2ecc71]/10 text-[#2ecc71] border-0 text-[10px]">Actual</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">iPhone 15</p>
                    <p className="text-xs text-muted-foreground">iOS · Safari · Hace 2 horas</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-xs h-7">Cerrar</Button>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        {/* Danger Zone */}
        <StaggerItem>
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="text-base text-destructive">Zona de peligro</CardTitle>
              <CardDescription>Acciones irreversibles sobre tu cuenta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                <div>
                  <p className="text-sm font-medium">Eliminar cuenta</p>
                  <p className="text-xs text-muted-foreground">Esta acción es permanente y no se puede deshacer</p>
                </div>
                <Button variant="outline" size="sm" className="text-xs text-destructive border-destructive/30 hover:bg-destructive/10 shrink-0">
                  Eliminar mi cuenta
                </Button>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerContainer>
    </div>
  )
}
