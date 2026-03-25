"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Search, Download, Filter, MessageSquare, Phone, Mail, MoreHorizontal, UserPlus, ArrowUpDown } from "lucide-react"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const contacts = [
  { id: 1, name: "María García", phone: "+54 11 2345-6789", email: "maria.garcia@gmail.com", channel: "WhatsApp", channelColor: "#25D366", lastContact: "Hoy, 14:32", messages: 24, status: "active", tag: "Cliente frecuente" },
  { id: 2, name: "Juan Pérez", phone: "+54 351 456-7890", email: "jperez@hotmail.com", channel: "Instagram", channelColor: "#E4405F", lastContact: "Hoy, 14:20", messages: 8, status: "active", tag: "Nuevo" },
  { id: 3, name: "Carlos López", phone: "+54 11 3456-7891", email: "carlos.lopez@yahoo.com", channel: "WhatsApp", channelColor: "#25D366", lastContact: "Hoy, 14:10", messages: 45, status: "active", tag: "Cliente frecuente" },
  { id: 4, name: "Ana Rodríguez", phone: "+54 261 567-8901", email: "ana.rod@gmail.com", channel: "Telegram", channelColor: "#0088cc", lastContact: "Ayer, 18:45", messages: 12, status: "active", tag: "Potencial" },
  { id: 5, name: "Diego Martínez", phone: "+54 11 4567-8902", email: "diego.m@outlook.com", channel: "WhatsApp", channelColor: "#25D366", lastContact: "Ayer, 15:30", messages: 31, status: "inactive", tag: "Reclamo" },
  { id: 6, name: "Lucía Fernández", phone: "+54 341 678-9012", email: "lucia.f@gmail.com", channel: "Instagram", channelColor: "#E4405F", lastContact: "22 Mar, 12:10", messages: 6, status: "active", tag: "Nuevo" },
  { id: 7, name: "Martín Gómez", phone: "+54 11 5678-9013", email: "martin.g@gmail.com", channel: "WhatsApp", channelColor: "#25D366", lastContact: "21 Mar, 09:22", messages: 52, status: "active", tag: "Cliente frecuente" },
  { id: 8, name: "Valentina Sosa", phone: "+54 223 789-0123", email: "val.sosa@hotmail.com", channel: "WhatsApp", channelColor: "#25D366", lastContact: "20 Mar, 16:55", messages: 18, status: "active", tag: "Potencial" },
  { id: 9, name: "Federico Ruiz", phone: "+54 11 8901-2345", email: "fede.ruiz@gmail.com", channel: "Telegram", channelColor: "#0088cc", lastContact: "19 Mar, 11:30", messages: 3, status: "inactive", tag: "Nuevo" },
  { id: 10, name: "Camila Torres", phone: "+54 381 901-2345", email: "camila.t@yahoo.com", channel: "Instagram", channelColor: "#E4405F", lastContact: "18 Mar, 20:15", messages: 27, status: "active", tag: "Cliente frecuente" },
]

const tagColors: Record<string, string> = {
  "Cliente frecuente": "bg-[#2ecc71]/10 text-[#2ecc71] border-[#2ecc71]/20",
  "Nuevo": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "Potencial": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "Reclamo": "bg-destructive/10 text-destructive border-destructive/20",
}

export default function ContactosPage() {
  const [search, setSearch] = useState("")
  const [channelFilter, setChannelFilter] = useState("all")

  const filtered = contacts.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.phone.includes(search) && !c.email.toLowerCase().includes(search.toLowerCase())) return false
    if (channelFilter !== "all" && c.channel !== channelFilter) return false
    return true
  })

  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-xl font-bold">Contactos</h2>
          <p className="text-sm text-muted-foreground">{contacts.length} contactos registrados por el bot</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs"><Download className="h-3.5 w-3.5" /><span className="hidden sm:inline">Exportar</span> CSV</Button>
          <Button size="sm" className="gap-1.5 text-xs bg-foreground text-background hover:bg-foreground/90"><UserPlus className="h-3.5 w-3.5" /><span className="hidden sm:inline">Agregar</span><span className="sm:hidden">Nuevo</span></Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <Card><CardContent className="p-3 sm:p-4"><p className="text-[11px] sm:text-xs text-muted-foreground">Total contactos</p><p className="text-lg sm:text-2xl font-bold mt-1">847</p></CardContent></Card>
        <Card><CardContent className="p-3 sm:p-4"><p className="text-[11px] sm:text-xs text-muted-foreground">Nuevos esta semana</p><p className="text-lg sm:text-2xl font-bold mt-1 text-[#2ecc71]">+84</p></CardContent></Card>
        <Card><CardContent className="p-3 sm:p-4"><p className="text-[11px] sm:text-xs text-muted-foreground">Activos (30d)</p><p className="text-lg sm:text-2xl font-bold mt-1">623</p></CardContent></Card>
        <Card><CardContent className="p-3 sm:p-4"><p className="text-[11px] sm:text-xs text-muted-foreground">Retorno</p><p className="text-lg sm:text-2xl font-bold mt-1">68%</p></CardContent></Card>
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar..." className="pl-9 h-9 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={channelFilter} onValueChange={setChannelFilter}>
              <SelectTrigger className="w-full sm:w-[150px] h-9 text-sm"><Filter className="h-3.5 w-3.5 mr-2" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="Telegram">Telegram</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {/* Mobile: Card list */}
          <div className="sm:hidden space-y-2">
            {filtered.map((contact) => (
              <div key={contact.id} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className="text-xs bg-muted">{contact.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium truncate">{contact.name}</p>
                    <Badge variant="outline" className="text-[10px] font-normal shrink-0" style={{ borderColor: contact.channelColor + "40", color: contact.channelColor }}>{contact.channel}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{contact.phone}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={`text-[10px] font-normal ${tagColors[contact.tag]}`}>{contact.tag}</Badge>
                    <span className="text-[10px] text-muted-foreground">{contact.messages} msgs</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7 shrink-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><MessageSquare className="h-3.5 w-3.5 mr-2" />Ver conversación</DropdownMenuItem>
                    <DropdownMenuItem><Phone className="h-3.5 w-3.5 mr-2" />Llamar</DropdownMenuItem>
                    <DropdownMenuItem><Mail className="h-3.5 w-3.5 mr-2" />Enviar email</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>

          {/* Desktop: Table */}
          <div className="hidden sm:block rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs">Contacto</TableHead>
                  <TableHead className="text-xs hidden md:table-cell">Canal</TableHead>
                  <TableHead className="text-xs hidden lg:table-cell">Último contacto</TableHead>
                  <TableHead className="text-xs">Mensajes</TableHead>
                  <TableHead className="text-xs">Etiqueta</TableHead>
                  <TableHead className="text-xs w-[50px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((contact) => (
                  <TableRow key={contact.id} className="cursor-pointer">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-muted">{contact.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{contact.name}</p>
                          <p className="text-xs text-muted-foreground">{contact.phone}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline" className="text-[10px] font-normal" style={{ borderColor: contact.channelColor + "40", color: contact.channelColor }}>{contact.channel}</Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{contact.lastContact}</TableCell>
                    <TableCell className="text-sm">{contact.messages}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] font-normal ${tagColors[contact.tag]}`}>{contact.tag}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><MessageSquare className="h-3.5 w-3.5 mr-2" />Ver conversación</DropdownMenuItem>
                          <DropdownMenuItem><Phone className="h-3.5 w-3.5 mr-2" />Llamar</DropdownMenuItem>
                          <DropdownMenuItem><Mail className="h-3.5 w-3.5 mr-2" />Enviar email</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-2">
            <p className="text-xs text-muted-foreground">Mostrando {filtered.length} de {contacts.length} contactos</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-xs h-8" disabled>Anterior</Button>
              <Button variant="outline" size="sm" className="text-xs h-8">Siguiente</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
