"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  MessageSquare, TrendingUp, TrendingDown, Bot, ThumbsUp, ThumbsDown, Zap, Calendar,
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
  { name: "Neutral", value: 15, fill: "hsl(var(--muted-foreground))" },
  { name: "Negativa", value: 7, fill: "hsl(var(--destructive))" },
]

const responseTimeData = [
  { hour: "00-04", avg: 1.2 }, { hour: "04-08", avg: 1.1 }, { hour: "08-12", avg: 2.8 },
  { hour: "12-16", avg: 3.1 }, { hour: "16-20", avg: 2.9 }, { hour: "20-24", avg: 1.5 },
]

const tooltipStyle = {
  backgroundColor: "hsl(var(--background))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
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
                  <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="ia" stackId="a" fill="#2ecc71" radius={[0, 0, 0, 0]} name="IA" />
                  <Bar dataKey="humano" stackId="a" fill="hsl(var(--foreground))" radius={[4, 4, 0, 0]} name="Humano" opacity={0.6} />
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
                  <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
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
                <XAxis dataKey="hour" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} unit="s" />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}s`, "Promedio"]} />
                <Area type="monotone" dataKey="avg" stroke="#2ecc71" fill="url(#gTime)" strokeWidth={2} name="Tiempo" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
