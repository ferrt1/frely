"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MessageSquare, TrendingUp, TrendingDown, Users, CheckCircle2, Clock,
  ArrowUpRight, MoreHorizontal, CheckCircle, XCircle, AlertCircle, Bot,
} from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts"

const messagesData = [
  { name: "Lun", mensajes: 120, resueltos: 98 },
  { name: "Mar", mensajes: 185, resueltos: 160 },
  { name: "Mié", mensajes: 165, resueltos: 142 },
  { name: "Jue", mensajes: 210, resueltos: 195 },
  { name: "Vie", mensajes: 245, resueltos: 220 },
  { name: "Sáb", mensajes: 180, resueltos: 165 },
  { name: "Dom", mensajes: 95, resueltos: 88 },
]

const channelData = [
  { name: "WhatsApp", value: 58, color: "#25D366" },
  { name: "Instagram", value: 28, color: "#E4405F" },
  { name: "Telegram", value: 14, color: "#0088cc" },
]

const hourlyData = [
  { hour: "06", msgs: 8 }, { hour: "08", msgs: 25 }, { hour: "10", msgs: 45 },
  { hour: "12", msgs: 38 }, { hour: "14", msgs: 52 }, { hour: "16", msgs: 48 },
  { hour: "18", msgs: 62 }, { hour: "20", msgs: 35 }, { hour: "22", msgs: 15 },
]

const recentConversations = [
  { name: "María García", message: "Hola, quiero saber el precio del café especial", time: "hace 5 min", channel: "WhatsApp", channelColor: "#25D366", status: "resolved" },
  { name: "Juan Pérez", message: "¿Hacen envíos a Córdoba?", time: "hace 12 min", channel: "Instagram", channelColor: "#E4405F", status: "pending" },
  { name: "Carlos López", message: "Necesito cambiar mi pedido #4521", time: "hace 23 min", channel: "WhatsApp", channelColor: "#25D366", status: "escalated" },
  { name: "Ana Rodríguez", message: "¿Cuál es el horario de atención?", time: "hace 35 min", channel: "Telegram", channelColor: "#0088cc", status: "resolved" },
  { name: "Diego Martínez", message: "Quiero hacer un reclamo", time: "hace 1h", channel: "WhatsApp", channelColor: "#25D366", status: "escalated" },
]

const statusConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  resolved: { label: "Resuelto", icon: CheckCircle, color: "text-[#2ecc71]" },
  pending: { label: "Pendiente", icon: AlertCircle, color: "text-yellow-500" },
  escalated: { label: "Escalado", icon: XCircle, color: "text-destructive" },
}

function MetricCard({ title, value, change, changeType, icon: Icon, desc }: {
  title: string; value: string; change: string; changeType: "up" | "down"; icon: React.ElementType; desc: string
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            <div className="flex items-center gap-1.5">
              {changeType === "up" ? <TrendingUp className="h-3.5 w-3.5 text-[#2ecc71]" /> : <TrendingDown className="h-3.5 w-3.5 text-destructive" />}
              <span className={`text-xs font-medium ${changeType === "up" ? "text-[#2ecc71]" : "text-destructive"}`}>{change}</span>
              <span className="text-xs text-muted-foreground">{desc}</span>
            </div>
          </div>
          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const tooltipStyle = {
  backgroundColor: "hsl(var(--background))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  fontSize: "12px",
}

export default function DashboardPage() {
  const [userName, setUserName] = useState("Café Avellaneda")

  useEffect(() => {
    const session = localStorage.getItem("frely_session")
    if (session) {
      try { setUserName(JSON.parse(session).name) } catch {}
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="rounded-xl bg-gradient-to-r from-foreground to-foreground/80 text-background p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">¡Hola, {userName}!</h2>
            <p className="text-background/60 text-sm mt-1">
              Tu asistente atendió <span className="text-[#2ecc71] font-semibold">47 conversaciones</span> mientras no estabas.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2ecc71]/20 text-[#2ecc71]">
              <Bot className="h-4 w-4" />
              <span className="text-xs font-medium">Bot activo</span>
              <span className="h-2 w-2 rounded-full bg-[#2ecc71] animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Mensajes hoy" value="1,247" change="+12.5%" changeType="up" icon={MessageSquare} desc="vs ayer" />
        <MetricCard title="Tasa de resolución" value="92.3%" change="+3.1%" changeType="up" icon={CheckCircle2} desc="vs semana pasada" />
        <MetricCard title="Contactos nuevos" value="84" change="+8.7%" changeType="up" icon={Users} desc="esta semana" />
        <MetricCard title="Tiempo de respuesta" value="< 3 seg" change="-18%" changeType="up" icon={Clock} desc="más rápido" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Mensajes esta semana</CardTitle>
                <CardDescription>Recibidos vs resueltos por IA</CardDescription>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-foreground/60" /><span className="text-muted-foreground">Recibidos</span></div>
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-[#2ecc71]" /><span className="text-muted-foreground">Resueltos IA</span></div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={messagesData}>
                  <defs>
                    <linearGradient id="gMsgs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--foreground))" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gResolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2ecc71" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2ecc71" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="mensajes" stroke="hsl(var(--foreground))" fillOpacity={1} fill="url(#gMsgs)" strokeWidth={2} name="Recibidos" />
                  <Area type="monotone" dataKey="resueltos" stroke="#2ecc71" fillOpacity={1} fill="url(#gResolved)" strokeWidth={2} name="Resueltos IA" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Canales</CardTitle>
            <CardDescription>Distribución por plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={channelData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                    {channelData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, ""]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2.5 mt-2">
              {channelData.map((ch) => (
                <div key={ch.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ch.color }} />
                    <span className="text-sm">{ch.name}</span>
                  </div>
                  <span className="text-sm font-medium">{ch.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Conversaciones recientes</CardTitle>
                <CardDescription>Últimas interacciones con clientes</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="text-xs gap-1.5" asChild>
                <Link href="/dashboard/conversaciones">Ver todas<ArrowUpRight className="h-3 w-3" /></Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {recentConversations.map((conv, i) => {
                const st = statusConfig[conv.status]
                const StIcon = st.icon
                return (
                  <Link key={i} href="/dashboard/conversaciones" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarFallback className="text-xs bg-muted">{conv.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{conv.name}</span>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-normal" style={{ borderColor: conv.channelColor + "40", color: conv.channelColor }}>{conv.channel}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.message}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[10px] text-muted-foreground">{conv.time}</span>
                      <StIcon className={`h-3.5 w-3.5 ${st.color}`} />
                    </div>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Horarios pico</CardTitle>
            <CardDescription>Mensajes por hora del día</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                  <XAxis dataKey="hour" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v} msgs`, "Mensajes"]} />
                  <Bar dataKey="msgs" fill="hsl(var(--foreground))" radius={[4, 4, 0, 0]} opacity={0.8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
