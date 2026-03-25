"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Search, Bot, CheckCircle, AlertCircle, XCircle, ArrowLeft, Filter, MessageSquare,
  Download, Send, Zap, ChevronUp, ChevronDown,
} from "lucide-react"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { getRecentConversations, getConversationMessages } from "@/lib/api"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import "overlayscrollbars/overlayscrollbars.css"

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

const statusConfig: Record<string, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  resolved: { label: "Resuelto", icon: CheckCircle, color: "text-[#2ecc71]", bg: "bg-[#2ecc71]/10" },
  pending: { label: "Pendiente", icon: AlertCircle, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  escalated: { label: "Escalado", icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
}

interface Conversation {
  client_phone: string
  client_name: string
  last_message: string
  time_ago: string
  channel: string
  status: string
}

function getDisplayName(conv: Conversation) {
  if (conv.client_name) return conv.client_name
  const lastTwo = conv.client_phone.slice(-2)
  return testerNames[lastTwo] || conv.client_phone
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
}

interface Message {
  role: "user" | "assistant"
  message: string
  created_at: string
}

const quickReplies = [
  { label: "Saludo", text: "¡Hola! Gracias por comunicarte. ¿En qué puedo ayudarte?" },
  { label: "Horarios", text: "Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00 hs." },
  { label: "Derivar", text: "Te voy a comunicar con un especialista para resolver tu consulta. Un momento por favor." },
  { label: "Despedida", text: "¡Gracias por comunicarte! Si necesitás algo más, no dudes en escribirnos." },
  { label: "Espera", text: "Dame un momento mientras verifico la información. Ya te respondo." },
  { label: "Disculpa", text: "Lamento la demora. Estamos trabajando para resolver tu consulta lo antes posible." },
]

const scrollbarOptions = {
  scrollbars: {
    theme: "os-theme-frely",
    autoHide: "scroll" as const,
    autoHideDelay: 800,
  },
  overflow: { x: "hidden" as const },
}

export default function ConversacionesPage() {
  const router = useRouter()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selected, setSelected] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [token, setToken] = useState("")
  const [replyText, setReplyText] = useState("")
  const [showQuickReplies, setShowQuickReplies] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const exportConversations = () => {
    const csv = ["Nombre,Teléfono,Canal,Estado,Último mensaje"]
    filtered.forEach((c) => {
      csv.push(`"${getDisplayName(c)}","${c.client_phone}","${c.channel}","${c.status}","${c.last_message.replace(/"/g, '""')}"`)
    })
    const blob = new Blob([csv.join("\n")], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `conversaciones_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    const session = localStorage.getItem("frely_session")
    if (!session) {
      router.push("/login")
      return
    }
    const parsed = JSON.parse(session)
    const t = parsed.token
    if (!t) {
      router.push("/login")
      return
    }
    setToken(t)

    getRecentConversations(t, 50)
      .then(setConversations)
      .catch(() => {})
  }, [router])

  useEffect(() => {
    if (messages.length > 0) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSelectConversation = (clientPhone: string) => {
    setSelected(clientPhone)
    setMessages([])
    setLoadingMessages(true)
    getConversationMessages(token, clientPhone, 50)
      .then(setMessages)
      .catch(() => {})
      .finally(() => setLoadingMessages(false))
  }

  const filtered = conversations.filter((c) => {
    const name = getDisplayName(c).toLowerCase()
    if (search && !name.includes(search.toLowerCase()) && !c.last_message.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter !== "all" && c.status !== statusFilter) return false
    return true
  })

  const activeConv = conversations.find((c) => c.client_phone === selected)

  return (
    <>
      <style jsx global>{`
        .os-theme-frely .os-scrollbar-handle {
          background: rgba(120, 120, 120, 0.35);
          border-radius: 10px;
        }
        .os-theme-frely .os-scrollbar-handle:hover {
          background: rgba(120, 120, 120, 0.55);
        }
        .os-theme-frely .os-scrollbar-handle:active {
          background: rgba(120, 120, 120, 0.7);
        }
        .os-theme-frely .os-scrollbar {
          --os-size: 8px;
          --os-padding-perpendicular: 2px;
          --os-padding-axis: 4px;
          transition: opacity 0.3s;
        }
      `}</style>
      <div className="flex h-[calc(100dvh-6.5rem)] sm:h-[calc(100dvh-8rem)] gap-2 sm:gap-4 overflow-hidden">
        {/* Conversation List */}
        <div className={`${selected ? "hidden md:flex" : "flex"} flex-col w-full md:w-[340px] shrink-0 min-h-0 overflow-hidden`}>
          <div className="space-y-3 mb-3 shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar..." className="pl-9 h-9 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[100px] sm:w-[130px] h-9 text-xs shrink-0"><Filter className="h-3.5 w-3.5 mr-1" /><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="escalated">Escalados</SelectItem>
                  <SelectItem value="resolved">Resueltos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{filtered.length} conversaciones</span>
                <span>·</span>
                <span className="text-yellow-500">{filtered.filter((c) => c.status === "pending").length} pendientes</span>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-[11px] gap-1 text-muted-foreground" onClick={exportConversations}>
                <Download className="h-3 w-3" />CSV
              </Button>
            </div>
          </div>

          <OverlayScrollbarsComponent className="flex-1 min-h-0" options={scrollbarOptions} defer>
            <div className="space-y-1 pr-1">
              {filtered.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">No hay conversaciones</p>
              )}
              {filtered.map((conv) => {
                const st = statusConfig[conv.status] || statusConfig.pending
                const StIcon = st.icon
                const name = getDisplayName(conv)
                const color = channelColors[conv.channel] || "#666"
                return (
                  <button
                    key={conv.client_phone}
                    onClick={() => handleSelectConversation(conv.client_phone)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${selected === conv.client_phone ? "bg-muted" : "hover:bg-muted/50"}`}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="text-xs bg-muted">{getInitials(name)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-background flex items-center justify-center" style={{ backgroundColor: color }}>
                        <span className="text-[6px] text-white font-bold">{conv.channel[0]}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium truncate">{name}</span>
                        <span className="text-[10px] text-muted-foreground shrink-0">{conv.time_ago}</span>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <p className="text-xs text-muted-foreground truncate pr-2">{conv.last_message}</p>
                        <StIcon className={`h-3 w-3 shrink-0 ${st.color}`} />
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </OverlayScrollbarsComponent>
        </div>

        {/* Chat Area */}
        {activeConv ? (
          <Card className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-b border-border shrink-0">
              <button className="md:hidden p-1 shrink-0" onClick={() => setSelected(null)}>
                <ArrowLeft className="h-5 w-5" />
              </button>
              <Avatar className="h-8 w-8 sm:h-9 sm:w-9 shrink-0">
                <AvatarFallback className="text-xs bg-muted">{getInitials(getDisplayName(activeConv))}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium truncate">{getDisplayName(activeConv)}</h3>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-normal shrink-0" style={{ borderColor: (channelColors[activeConv.channel] || "#666") + "40", color: channelColors[activeConv.channel] || "#666" }}>{activeConv.channel}</Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">{activeConv.client_phone}</p>
              </div>
            </div>

            <OverlayScrollbarsComponent className="flex-1 min-h-0" options={scrollbarOptions} defer>
              <div className="space-y-3 max-w-3xl mx-auto p-3 sm:p-4 pb-6">
                {loadingMessages && (
                  <div className="flex justify-center py-8">
                    <div className="h-5 w-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
                  </div>
                )}
                {!loadingMessages && messages.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">No hay mensajes</p>
                )}
                {messages.map((msg, i) => {
                  const time = new Date(msg.created_at).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })
                  return (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}>
                      <div className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 ${
                        msg.role === "user"
                          ? "bg-muted rounded-bl-md"
                          : "bg-foreground text-background rounded-br-md"
                      }`}>
                        {msg.role === "assistant" && (
                          <div className="flex items-center gap-1 mb-1 text-background/60">
                            <Bot className="h-3 w-3" />
                            <span className="text-[10px] font-medium">Frely IA</span>
                          </div>
                        )}
                        <p className="text-sm leading-relaxed whitespace-pre-line">{msg.message}</p>
                        <p className={`text-[10px] mt-1 text-right ${
                          msg.role === "user" ? "text-muted-foreground" : "text-background/40"
                        }`}>{time}</p>
                      </div>
                    </div>
                  )
                })}
                <div ref={chatEndRef} />
              </div>
            </OverlayScrollbarsComponent>

            {/* Quick Replies + Message Input */}
            <div className="shrink-0 border-t border-border">
              {showQuickReplies && (
                <div className="px-3 py-2 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {quickReplies.map((qr) => (
                      <button
                        key={qr.label}
                        onClick={() => { setReplyText(qr.text); setShowQuickReplies(false) }}
                        className="px-2.5 py-1 rounded-full bg-background border border-border text-[11px] hover:bg-muted transition-colors"
                      >
                        {qr.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3">
                <button
                  onClick={() => setShowQuickReplies(!showQuickReplies)}
                  className="shrink-0 h-9 w-9 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  title="Respuestas rápidas"
                >
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </button>
                <Input
                  placeholder="Escribir como agente humano..."
                  className="h-9 text-sm flex-1"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && replyText.trim()) setReplyText("") }}
                />
                <Button
                  size="icon"
                  className="h-9 w-9 bg-foreground text-background hover:bg-foreground/90 shrink-0"
                  disabled={!replyText.trim()}
                  onClick={() => setReplyText("")}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="flex-1 hidden md:flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
                <MessageSquare className="h-7 w-7 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Seleccioná una conversación</h3>
                <p className="text-xs text-muted-foreground mt-1">Elegí una conversación de la lista para ver los mensajes</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </>
  )
}
