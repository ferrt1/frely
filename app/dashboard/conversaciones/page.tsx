"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search, Send, Paperclip, MoreVertical, Bot,
  CheckCircle, AlertCircle, XCircle, ArrowLeft, Filter, Star,
  ImageIcon, Smile, MessageSquare,
} from "lucide-react"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Message {
  id: number
  from: string
  text: string
  time: string
  escalated?: boolean
}

const conversations = [
  {
    id: 1, name: "María García", phone: "+54 11 2345-6789", channel: "WhatsApp", channelColor: "#25D366",
    lastMessage: "Perfecto, gracias por la info!", time: "14:32", unread: 0, status: "resolved", starred: false,
    messages: [
      { id: 1, from: "client", text: "Hola! Quiero saber el precio del café especial blend", time: "14:20" },
      { id: 2, from: "bot", text: "¡Hola María! 👋 El Café Especial Blend tiene un precio de $8.990. Es nuestro blend más vendido, con notas de chocolate y frutos secos. ¿Te gustaría saber más detalles o hacer un pedido?", time: "14:20" },
      { id: 3, from: "client", text: "Qué bueno! Tienen envío a Palermo?", time: "14:25" },
      { id: 4, from: "bot", text: "¡Sí! Hacemos envíos a toda CABA, incluido Palermo. El envío tiene un costo de $1.500 y llega en 24-48hs hábiles. Para compras superiores a $15.000, el envío es gratis 🚚", time: "14:25" },
      { id: 5, from: "client", text: "Ah genial, y aceptan Mercado Pago?", time: "14:28" },
      { id: 6, from: "bot", text: "¡Por supuesto! Aceptamos Mercado Pago, transferencia bancaria y efectivo en el local. Con Mercado Pago podés pagar con tarjeta de crédito hasta en 6 cuotas sin interés 💳", time: "14:28" },
      { id: 7, from: "client", text: "Perfecto, gracias por la info!", time: "14:32" },
      { id: 8, from: "bot", text: "¡De nada María! Si necesitás algo más, acá estoy. ¡Que tengas un excelente día! 😊", time: "14:32" },
    ],
  },
  {
    id: 2, name: "Juan Pérez", phone: "+54 351 456-7890", channel: "Instagram", channelColor: "#E4405F",
    lastMessage: "¿Hacen envíos a Córdoba?", time: "14:20", unread: 1, status: "pending", starred: true,
    messages: [
      { id: 1, from: "client", text: "Hola buenas tardes", time: "14:15" },
      { id: 2, from: "bot", text: "¡Hola! Bienvenido a Café Avellaneda ☕ ¿En qué puedo ayudarte?", time: "14:15" },
      { id: 3, from: "client", text: "¿Hacen envíos a Córdoba?", time: "14:20" },
    ],
  },
  {
    id: 3, name: "Carlos López", phone: "+54 11 3456-7891", channel: "WhatsApp", channelColor: "#25D366",
    lastMessage: "Necesito cambiar mi pedido #4521", time: "14:10", unread: 2, status: "escalated", starred: false,
    messages: [
      { id: 1, from: "client", text: "Hola, hice un pedido hace un rato y necesito cambiarlo", time: "13:55" },
      { id: 2, from: "bot", text: "¡Hola Carlos! Claro, puedo ayudarte. ¿Me pasás el número de pedido?", time: "13:55" },
      { id: 3, from: "client", text: "Es el pedido #4521", time: "13:58" },
      { id: 4, from: "bot", text: "Encontré tu pedido #4521. Veo que incluye 2x Café Colombia Origen. ¿Qué cambio necesitás hacer?", time: "13:58" },
      { id: 5, from: "client", text: "Necesito cambiar mi pedido #4521", time: "14:10" },
      { id: 6, from: "bot", text: "⚠️ Este caso fue escalado a un agente humano. Carlos necesita modificar el pedido #4521 que ya está en preparación.", time: "14:10", escalated: true },
    ],
  },
  {
    id: 4, name: "Ana Rodríguez", phone: "+54 261 567-8901", channel: "Telegram", channelColor: "#0088cc",
    lastMessage: "Gracias, muy amable!", time: "13:45", unread: 0, status: "resolved", starred: false,
    messages: [
      { id: 1, from: "client", text: "Hola, ¿cuál es el horario de atención?", time: "13:40" },
      { id: 2, from: "bot", text: "¡Hola Ana! Nuestro horario de atención en el local es de Lunes a Sábado de 9:00 a 20:00hs. Y nuestro asistente virtual (¡yo! 🤖) está disponible las 24 horas, los 7 días de la semana.", time: "13:40" },
      { id: 3, from: "client", text: "Gracias, muy amable!", time: "13:45" },
    ],
  },
  {
    id: 5, name: "Diego Martínez", phone: "+54 11 4567-8902", channel: "WhatsApp", channelColor: "#25D366",
    lastMessage: "Quiero hacer un reclamo sobre mi compra", time: "13:30", unread: 3, status: "escalated", starred: true,
    messages: [
      { id: 1, from: "client", text: "Quiero hacer un reclamo sobre mi compra", time: "13:25" },
      { id: 2, from: "bot", text: "Lamento escuchar eso, Diego. Quiero ayudarte a resolver esto lo antes posible. ¿Podés contarme qué pasó con tu compra?", time: "13:25" },
      { id: 3, from: "client", text: "Me llegó el café equivocado, pedí Colombia y me mandaron Brasil", time: "13:28" },
      { id: 4, from: "bot", text: "⚠️ Escalado a agente humano. El cliente recibió un producto incorrecto (pidió Colombia, recibió Brasil). Requiere gestión de cambio/reenvío.", time: "13:30", escalated: true },
    ],
  },
  {
    id: 6, name: "Lucía Fernández", phone: "+54 341 678-9012", channel: "Instagram", channelColor: "#E4405F",
    lastMessage: "Me encanta! Lo quiero", time: "12:10", unread: 0, status: "resolved", starred: false,
    messages: [
      { id: 1, from: "client", text: "Vi en el feed la cafetera nueva, cuánto sale?", time: "12:00" },
      { id: 2, from: "bot", text: "¡Hola Lucía! La Cafetera Italian Press está a $35.000. Es de acero inoxidable, tiene capacidad para 6 tazas y viene con filtro de repuesto incluido ☕✨", time: "12:00" },
      { id: 3, from: "client", text: "Me encanta! Lo quiero", time: "12:10" },
      { id: 4, from: "bot", text: "¡Excelente elección! Te paso el link de compra por DM. También podés acercarte al local en Av. Corrientes 1234. ¿Preferís compra online o presencial?", time: "12:10" },
    ],
  },
]

const statusConfig: Record<string, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  resolved: { label: "Resuelto", icon: CheckCircle, color: "text-[#2ecc71]", bg: "bg-[#2ecc71]/10" },
  pending: { label: "Pendiente", icon: AlertCircle, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  escalated: { label: "Escalado", icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
}

export default function ConversacionesPage() {
  const [selected, setSelected] = useState<number | null>(null)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [messageInput, setMessageInput] = useState("")

  const filtered = conversations.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter !== "all" && c.status !== statusFilter) return false
    return true
  })

  const activeConv = conversations.find((c) => c.id === selected)

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Conversation List */}
      <div className={`${selected ? "hidden md:flex" : "flex"} flex-col w-full md:w-[380px] shrink-0`}>
        <div className="space-y-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar conversación..." className="pl-9 h-9 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px] h-9 text-xs"><Filter className="h-3.5 w-3.5 mr-1" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="escalated">Escalados</SelectItem>
                <SelectItem value="resolved">Resueltos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{filtered.length} conversaciones</span>
            <span>·</span>
            <span className="text-yellow-500">{filtered.filter((c) => c.status === "pending").length} pendientes</span>
            <span>·</span>
            <span className="text-destructive">{filtered.filter((c) => c.status === "escalated").length} escalados</span>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-1 pr-2">
            {filtered.map((conv) => {
              const st = statusConfig[conv.status]
              const StIcon = st.icon
              return (
                <button
                  key={conv.id}
                  onClick={() => setSelected(conv.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${selected === conv.id ? "bg-muted" : "hover:bg-muted/50"}`}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="text-xs bg-muted">{conv.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-background flex items-center justify-center" style={{ backgroundColor: conv.channelColor }}>
                      <span className="text-[6px] text-white font-bold">{conv.channel[0]}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {conv.starred && <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />}
                        <span className="text-sm font-medium truncate">{conv.name}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground shrink-0">{conv.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-xs text-muted-foreground truncate pr-2">{conv.lastMessage}</p>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <StIcon className={`h-3 w-3 ${st.color}`} />
                        {conv.unread > 0 && (
                          <span className="h-4 min-w-4 px-1 rounded-full bg-[#2ecc71] text-[10px] text-white font-medium flex items-center justify-center">{conv.unread}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      {activeConv ? (
        <Card className="flex-1 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <button className="md:hidden p-1" onClick={() => setSelected(null)}>
                <ArrowLeft className="h-5 w-5" />
              </button>
              <Avatar className="h-9 w-9">
                <AvatarFallback className="text-xs bg-muted">{activeConv.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">{activeConv.name}</h3>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-normal" style={{ borderColor: activeConv.channelColor + "40", color: activeConv.channelColor }}>{activeConv.channel}</Badge>
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-4 font-normal border-0 ${statusConfig[activeConv.status].bg} ${statusConfig[activeConv.status].color}`}>{statusConfig[activeConv.status].label}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{activeConv.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8"><Star className={`h-4 w-4 ${activeConv.starred ? "fill-yellow-500 text-yellow-500" : ""}`} /></Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Ver contacto</DropdownMenuItem>
                  <DropdownMenuItem>Marcar como resuelto</DropdownMenuItem>
                  <DropdownMenuItem>Escalar a humano</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Cerrar conversación</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="text-center">
                <span className="text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded-full">Hoy</span>
              </div>
              {activeConv.messages.map((msg: Message) => (
                <div key={msg.id} className={`flex ${msg.from === "client" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    msg.from === "client"
                      ? "bg-muted rounded-bl-md"
                      : msg.escalated
                        ? "bg-destructive/10 border border-destructive/20 rounded-br-md"
                        : "bg-foreground text-background rounded-br-md"
                  }`}>
                    {msg.from === "bot" && (
                      <div className={`flex items-center gap-1 mb-1 ${msg.escalated ? "text-destructive" : "text-background/60"}`}>
                        <Bot className="h-3 w-3" />
                        <span className="text-[10px] font-medium">{msg.escalated ? "Sistema" : "Frely IA"}</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={`text-[10px] mt-1 text-right ${
                      msg.from === "client" ? "text-muted-foreground" : msg.escalated ? "text-destructive/60" : "text-background/40"
                    }`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2 max-w-3xl mx-auto">
              <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0"><Paperclip className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0"><ImageIcon className="h-4 w-4" /></Button>
              <Input
                placeholder="Escribí un mensaje como agente humano..."
                className="h-10 text-sm"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && messageInput.trim()) setMessageInput("") }}
              />
              <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0"><Smile className="h-4 w-4" /></Button>
              <Button size="icon" className="h-9 w-9 shrink-0 bg-foreground text-background hover:bg-foreground/90" disabled={!messageInput.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2">Los mensajes enviados aquí son como agente humano, no como bot</p>
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
  )
}
