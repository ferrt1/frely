"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MessageSquare, TrendingUp, TrendingDown, Users, CheckCircle2, Clock,
  ArrowUpRight, CheckCircle, XCircle, AlertCircle, Bot,
} from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts"
import {
  getDashboardOverview, getMessagesWeekly, getMessagesHourly,
  getRecentConversations, getChannels,
} from "@/lib/api"

const testerNames: Record<string, string> = {
  "67": "Fer",
  "25": "Nahu",
  "23": "Franco",
}

const channelColors: Record<string, string> = {
  WhatsApp: "#25D366",
  Instagram: "#E4405F",
  Telegram: "#0088cc",
}

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

function formatChange(current: number, previous: number): { change: string; type: "up" | "down" } {
  if (previous === 0) return { change: current > 0 ? "+100%" : "0%", type: "up" }
  const diff = ((current - previous) / previous) * 100
  return {
    change: `${diff >= 0 ? "+" : ""}${diff.toFixed(1)}%`,
    type: diff >= 0 ? "up" : "down",
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const [businessName, setBusinessName] = useState("")
  const [overview, setOverview] = useState<{
    messages_today: number; messages_yesterday: number
    resolution_rate: number; resolution_rate_prev_week: number
    new_contacts_week: number; new_contacts_prev_week: number
    avg_response_seconds: number
  } | null>(null)
  const [weeklyData, setWeeklyData] = useState<{ name: string; mensajes: number; resueltos: number }[]>([])
  const [hourlyData, setHourlyData] = useState<{ hour: string; msgs: number }[]>([])
  const [conversations, setConversations] = useState<{
    client_phone: string; client_name: string; last_message: string
    time_ago: string; channel: string; status: string
  }[]>([])
  const [channels, setChannels] = useState<{ name: string; value: number; color: string }[]>([])

  useEffect(() => {
    const session = localStorage.getItem("frely_session")
    if (!session) {
      router.push("/login")
      return
    }

    let parsed
    try {
      parsed = JSON.parse(session)
    } catch {
      router.push("/login")
      return
    }

    const token = parsed.token
    if (!token) {
      router.push("/login")
      return
    }

    setBusinessName(parsed.current_business?.name || parsed.name || "")

    getDashboardOverview(token)
      .then(setOverview)
      .catch(() => {})

    getMessagesWeekly(token)
      .then((data) => {
        setWeeklyData(data.map((d: { day: string; received: number; resolved_by_ai: number }) => ({
          name: d.day,
          mensajes: d.received,
          resueltos: d.resolved_by_ai,
        })))
      })
      .catch(() => {})

    getMessagesHourly(token)
      .then((data) => {
        // Fill all 24 hours, merge with API data
        const hourMap = new Map<string, number>()
        for (let h = 0; h < 24; h++) {
          hourMap.set(String(h).padStart(2, "0"), 0)
        }
        data.forEach((d: { hour: number | string; count: number }) => {
          hourMap.set(String(d.hour).padStart(2, "0"), d.count)
        })
        setHourlyData(Array.from(hourMap.entries()).map(([hour, msgs]) => ({ hour, msgs })))
      })
      .catch(() => {})

    getRecentConversations(token, 5)
      .then(setConversations)
      .catch(() => {})

    getChannels(token)
      .then((data) => {
        setChannels(data.map((d: { name: string; percentage: number }) => ({
          name: d.name,
          value: d.percentage,
          color: channelColors[d.name] || "#666",
        })))
      })
      .catch(() => {})
  }, [router])

  const msgChange = overview
    ? formatChange(overview.messages_today, overview.messages_yesterday)
    : { change: "-", type: "up" as const }
  const resChange = overview
    ? formatChange(overview.resolution_rate, overview.resolution_rate_prev_week)
    : { change: "-", type: "up" as const }
  const contactChange = overview
    ? formatChange(overview.new_contacts_week, overview.new_contacts_prev_week)
    : { change: "-", type: "up" as const }

  const totalToday = overview?.messages_today ?? 0

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="rounded-xl bg-gradient-to-r from-foreground to-foreground/80 text-background p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">¡Hola, {businessName}!</h2>
            <p className="text-background/60 text-sm mt-1">
              Tu asistente atendió <span className="text-[#2ecc71] font-semibold">{totalToday} conversaciones</span> hoy.
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
        <MetricCard
          title="Mensajes hoy"
          value={overview ? overview.messages_today.toLocaleString() : "—"}
          change={msgChange.change}
          changeType={msgChange.type}
          icon={MessageSquare}
          desc="vs ayer"
        />
        <MetricCard
          title="Tasa de resolución"
          value={overview ? `${overview.resolution_rate}%` : "—"}
          change={resChange.change}
          changeType={resChange.type}
          icon={CheckCircle2}
          desc="vs semana pasada"
        />
        <MetricCard
          title="Contactos nuevos"
          value={overview ? overview.new_contacts_week.toLocaleString() : "—"}
          change={contactChange.change}
          changeType={contactChange.type}
          icon={Users}
          desc="esta semana"
        />
        <MetricCard
          title="Tiempo de respuesta"
          value={overview ? `< ${Math.ceil(overview.avg_response_seconds)} seg` : "—"}
          change="-"
          changeType="up"
          icon={Clock}
          desc=""
        />
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
                <AreaChart data={weeklyData}>
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
                  <Pie data={channels} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                    {channels.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, ""]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2.5 mt-2">
              {channels.map((ch) => (
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
              {conversations.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">No hay conversaciones recientes</p>
              )}
              {conversations.map((conv, i) => {
                const st = statusConfig[conv.status] || statusConfig.pending
                const StIcon = st.icon
                const color = channelColors[conv.channel] || "#666"
                const lastTwo = conv.client_phone.slice(-2)
                const testerName = testerNames[lastTwo]
                const displayName = conv.client_name || testerName || conv.client_phone
                const initials = (conv.client_name || testerName || "??")
                  .split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
                return (
                  <Link key={i} href="/dashboard/conversaciones" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarFallback className="text-xs bg-muted">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{displayName}</span>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-normal" style={{ borderColor: color + "40", color }}>{conv.channel}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.last_message}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[10px] text-muted-foreground">{conv.time_ago}</span>
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
