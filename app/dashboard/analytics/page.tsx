"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  MessageSquare, TrendingUp, TrendingDown, Bot, ThumbsUp, ThumbsDown, Zap, Calendar, Star, Minus,
} from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
} from "recharts"

const dailyMessages = [
  { day: "Lun", total: 185, ia: 168, humano: 17 },
  { day: "Mar", total: 210, ia: 195, humano: 15 },
  { day: "Mié", total: 178, ia: 160, humano: 18 },
  { day: "Jue", total: 245, ia: 228, humano: 17 },
  { day: "Vie", total: 262, ia: 245, humano: 17 },
  { day: "Sáb", total: 195, ia: 182, humano: 13 },
  { day: "Dom", total: 112, ia: 105, humano: 7 },
]

const channelTrend = [
  { month: "Oct", whatsapp: 420, instagram: 180, telegram: 80 },
  { month: "Nov", whatsapp: 510, instagram: 210, telegram: 95 },
  { month: "Dic", whatsapp: 580, instagram: 240, telegram: 110 },
  { month: "Ene", whatsapp: 650, instagram: 280, telegram: 120 },
  { month: "Feb", whatsapp: 720, instagram: 310, telegram: 135 },
  { month: "Mar", whatsapp: 810, instagram: 350, telegram: 145 },
]

const topQueries = [
  { query: "Precios de productos", count: 342, pct: 27 },
  { query: "Envíos y delivery", count: 256, pct: 21 },
  { query: "Medios de pago", count: 198, pct: 16 },
  { query: "Horarios de atención", count: 156, pct: 13 },
  { query: "Estado de pedido", count: 134, pct: 11 },
  { query: "Devoluciones", count: 89, pct: 7 },
  { query: "Otros", count: 72, pct: 5 },
]

const satisfactionData = [
  { name: "Positiva", value: 78, fill: "#2ecc71" },
  { name: "Neutral", value: 15, fill: "var(--muted-foreground)" },
  { name: "Negativa", value: 7, fill: "var(--destructive)" },
]

const responseTimeData = [
  { hour: "00-04", avg: 1.2 }, { hour: "04-08", avg: 1.1 }, { hour: "08-12", avg: 2.8 },
  { hour: "12-16", avg: 3.1 }, { hour: "16-20", avg: 2.9 }, { hour: "20-24", avg: 1.5 },
]

const recentFeedback = [
  { stars: 5, comment: "Excelente atención, me resolvió todo al toque. Re útil el bot.", name: "Martina G.", date: "22 Mar 2026", channel: "WhatsApp" },
  { stars: 4, comment: "Bastante bien, me contestó rápido lo del envío. Solo tardó un toque en entender mi pregunta.", name: "Facundo R.", date: "21 Mar 2026", channel: "Instagram" },
  { stars: 5, comment: "Genial la atención automática, no tuve que esperar nada. 10 puntos.", name: "Camila S.", date: "20 Mar 2026", channel: "WhatsApp" },
  { stars: 3, comment: "Más o menos, me derivó a un agente cuando le pregunté por devoluciones. Podría mejorar.", name: "Tomás L.", date: "19 Mar 2026", channel: "Telegram" },
  { stars: 5, comment: "Buenísimo, me pasó el link de seguimiento del pedido en segundos. Muy práctico.", name: "Valentina P.", date: "18 Mar 2026", channel: "WhatsApp" },
]

const qualityMetrics = [
  { label: "Tasa de resolución en primer contacto", value: 78, suffix: "%" },
  { label: "Tiempo promedio de resolución", value: 64, suffix: "3.2 min" },
  { label: "Tasa de abandono", value: 5, suffix: "%" },
  { label: "Conversaciones re-abiertas", value: 12, suffix: "%" },
]

const channelColors: Record<string, string> = {
  WhatsApp: "bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20",
  Instagram: "bg-[#E4405F]/10 text-[#E4405F] border-[#E4405F]/20",
  Telegram: "bg-[#0088cc]/10 text-[#0088cc] border-[#0088cc]/20",
}

const tooltipStyle = {
  backgroundColor: "var(--background)",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  color: "var(--foreground)",
  fontSize: "12px",
}

function StatCard({ title, value, change, changeType, icon: Icon, sub }: {
  title: string; value: string; change: string; changeType: "up" | "down"; icon: React.ElementType; sub: string
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <div className="flex items-center gap-1">
              {changeType === "up" ? <TrendingUp className="h-3 w-3 text-[#2ecc71]" /> : <TrendingDown className="h-3 w-3 text-destructive" />}
              <span className={`text-[10px] font-medium ${changeType === "up" ? "text-[#2ecc71]" : "text-destructive"}`}>{change}</span>
              <span className="text-[10px] text-muted-foreground">{sub}</span>
            </div>
          </div>
          <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center"><Icon className="h-4 w-4 text-muted-foreground" /></div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Analytics</h2>
          <p className="text-sm text-muted-foreground">Métricas detalladas del rendimiento de tu asistente IA</p>
        </div>
        <Select defaultValue="month">
          <SelectTrigger className="w-[160px] h-9 text-xs"><Calendar className="h-3.5 w-3.5 mr-2" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Última semana</SelectItem>
            <SelectItem value="month">Último mes</SelectItem>
            <SelectItem value="quarter">Último trimestre</SelectItem>
            <SelectItem value="year">Último año</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total mensajes" value="4,104" change="+18.3%" changeType="up" icon={MessageSquare} sub="vs mes ant." />
        <StatCard title="Resueltos por IA" value="92.3%" change="+3.1%" changeType="up" icon={Bot} sub="vs mes ant." />
        <StatCard title="Satisfacción" value="78%" change="+5.2%" changeType="up" icon={ThumbsUp} sub="positiva" />
        <StatCard title="Tiempo promedio" value="2.4s" change="-22%" changeType="up" icon={Zap} sub="respuesta" />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Mensajes por día</CardTitle>
            <CardDescription>Distribución IA vs agente humano</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyMessages}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="ia" stackId="a" fill="#2ecc71" radius={[0, 0, 0, 0]} name="IA" />
                  <Bar dataKey="humano" stackId="a" fill="var(--foreground)" radius={[4, 4, 0, 0]} name="Humano" opacity={0.6} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2 text-xs">
              <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-[#2ecc71]" /><span className="text-muted-foreground">Resueltos por IA</span></div>
              <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-foreground/60" /><span className="text-muted-foreground">Agente humano</span></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Tendencia por canal</CardTitle>
            <CardDescription>Evolución mensual de mensajes por plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={channelTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="whatsapp" stroke="#25D366" strokeWidth={2} dot={false} name="WhatsApp" />
                  <Line type="monotone" dataKey="instagram" stroke="#E4405F" strokeWidth={2} dot={false} name="Instagram" />
                  <Line type="monotone" dataKey="telegram" stroke="#0088cc" strokeWidth={2} dot={false} name="Telegram" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2 text-xs">
              <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-[#25D366]" /><span className="text-muted-foreground">WhatsApp</span></div>
              <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-[#E4405F]" /><span className="text-muted-foreground">Instagram</span></div>
              <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-[#0088cc]" /><span className="text-muted-foreground">Telegram</span></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Consultas más frecuentes</CardTitle>
            <CardDescription>Lo que más preguntan tus clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topQueries.map((q, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-5 text-right">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{q.query}</span>
                      <span className="text-xs text-muted-foreground">{q.count} consultas</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-[#2ecc71] rounded-full transition-all" style={{ width: `${q.pct}%` }} />
                    </div>
                  </div>
                  <span className="text-xs font-medium w-10 text-right">{q.pct}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Satisfacción</CardTitle>
            <CardDescription>Feedback de conversaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={satisfactionData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                    {satisfactionData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, ""]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              <div className="flex items-center justify-between"><div className="flex items-center gap-2"><ThumbsUp className="h-3.5 w-3.5 text-[#2ecc71]" /><span className="text-sm">Positiva</span></div><span className="text-sm font-medium">78%</span></div>
              <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="h-3.5 w-3.5 rounded-full bg-muted-foreground/30" /><span className="text-sm">Neutral</span></div><span className="text-sm font-medium">15%</span></div>
              <div className="flex items-center justify-between"><div className="flex items-center gap-2"><ThumbsDown className="h-3.5 w-3.5 text-destructive" /><span className="text-sm">Negativa</span></div><span className="text-sm font-medium">7%</span></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Response Time */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Tiempo de respuesta promedio</CardTitle>
          <CardDescription>Segundos promedio por franja horaria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={responseTimeData}>
                <defs>
                  <linearGradient id="gTime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2ecc71" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2ecc71" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="hour" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} unit="s" />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}s`, "Promedio"]} />
                <Area type="monotone" dataKey="avg" stroke="#2ecc71" fill="url(#gTime)" strokeWidth={2} name="Tiempo" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Satisfacción del cliente */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* NPS Score */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Encuestas de satisfacción</CardTitle>
            <CardDescription>Net Promoter Score basado en encuestas post-conversación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <span className="text-5xl font-bold">72</span>
                <span className="absolute -top-1 -right-5 h-3 w-3 rounded-full bg-[#2ecc71]" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-[#2ecc71]">Excelente</p>
                <p className="text-xs text-muted-foreground">NPS Score</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex h-4 w-full overflow-hidden rounded-full">
                <div className="bg-[#2ecc71] h-full" style={{ width: "58%" }} />
                <div className="bg-amber-400 h-full" style={{ width: "24%" }} />
                <div className="bg-destructive h-full" style={{ width: "18%" }} />
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-sm bg-[#2ecc71]" />
                  <span className="text-muted-foreground">Promotores</span>
                  <span className="font-medium">58%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-sm bg-amber-400" />
                  <span className="text-muted-foreground">Pasivos</span>
                  <span className="font-medium">24%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-sm bg-destructive" />
                  <span className="text-muted-foreground">Detractores</span>
                  <span className="font-medium">18%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comentarios recientes */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Comentarios recientes</CardTitle>
            <CardDescription>Feedback directo de tus clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFeedback.map((fb, i) => (
                <div key={i} className="flex gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star
                            key={s}
                            className={`h-3.5 w-3.5 ${s < fb.stars ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
                          />
                        ))}
                      </div>
                      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-4 ${channelColors[fb.channel] || ""}`}>
                        {fb.channel}
                      </Badge>
                    </div>
                    <p className="text-sm">{fb.comment}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium">{fb.name}</span>
                      <span>·</span>
                      <span>{fb.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Métricas de calidad */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Métricas de calidad</CardTitle>
          <CardDescription>Indicadores clave de rendimiento del servicio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {qualityMetrics.map((m, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{m.label}</span>
                  <span className="text-sm font-medium">{m.suffix === "%" ? `${m.value}%` : m.suffix}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${m.value >= 60 ? "bg-[#2ecc71]" : m.value >= 30 ? "bg-amber-400" : "bg-destructive"}`}
                    style={{ width: `${m.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
