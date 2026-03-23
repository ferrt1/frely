"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Search, Plus, Edit3, Trash2, BookOpen, FileText, ShoppingBag,
  HelpCircle, Clock, CheckCircle, ChevronRight, Upload, Globe,
  MessageSquare, Tag, MoreHorizontal,
} from "lucide-react"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const faqs = [
  { id: 1, question: "¿Cuáles son los medios de pago?", answer: "Aceptamos Mercado Pago, transferencia bancaria y efectivo en el local. Para compras online, también podés pagar con tarjeta de crédito o débito a través de Mercado Pago.", category: "Pagos", active: true },
  { id: 2, question: "¿Hacen envíos al interior?", answer: "Sí, hacemos envíos a todo el país a través de Correo Argentino y Andreani. El costo varía según la zona y el peso del paquete. Los envíos a CABA y GBA tardan 2-3 días hábiles, al interior 4-7 días hábiles.", category: "Envíos", active: true },
  { id: 3, question: "¿Cuál es la política de devoluciones?", answer: "Tenés 30 días desde la recepción del producto para hacer una devolución. El producto debe estar sin uso y en su empaque original. Contactanos y te gestionamos el cambio o reembolso.", category: "Políticas", active: true },
  { id: 4, question: "¿Cuál es el horario de atención?", answer: "Nuestro horario de atención humana es de Lunes a Viernes de 9:00 a 18:00hs. Nuestro asistente virtual está disponible 24/7 para responder tus consultas.", category: "General", active: true },
  { id: 5, question: "¿Cómo puedo rastrear mi pedido?", answer: "Una vez despachado tu pedido, te enviaremos por WhatsApp el código de seguimiento. Podés rastrearlo en la web del correo correspondiente o preguntarme directamente con tu número de pedido.", category: "Envíos", active: true },
  { id: 6, question: "¿Tienen local físico?", answer: "Sí, nuestro local está en Av. Corrientes 1234, CABA. Podés visitarnos de Lunes a Sábado de 9:00 a 20:00hs.", category: "General", active: true },
  { id: 7, question: "¿Hacen factura A?", answer: "Sí, emitimos factura A y B. Indicanos tus datos de facturación al momento de la compra y te la enviamos por email.", category: "Pagos", active: false },
  { id: 8, question: "¿Tienen descuentos por cantidad?", answer: "Sí, para compras mayoristas (más de 10 unidades) ofrecemos descuentos especiales. Contactanos para recibir una cotización personalizada.", category: "Ventas", active: true },
]

const products = [
  { id: 1, name: "Café Especial Blend", price: "$8.990", stock: 45, active: true },
  { id: 2, name: "Café Colombia Origen", price: "$12.500", stock: 23, active: true },
  { id: 3, name: "Café Brasil Santos", price: "$7.450", stock: 67, active: true },
  { id: 4, name: "Pack Degustación x3", price: "$24.900", stock: 12, active: true },
  { id: 5, name: "Cafetera Italian Press", price: "$35.000", stock: 8, active: true },
  { id: 6, name: "Molinillo Manual", price: "$18.500", stock: 0, active: false },
  { id: 7, name: "Taza Cerámica Frely", price: "$4.200", stock: 89, active: true },
  { id: 8, name: "Café Ethiopia Yirgacheffe", price: "$15.900", stock: 15, active: true },
]

const categoryColors: Record<string, string> = {
  "Pagos": "bg-blue-500/10 text-blue-500",
  "Envíos": "bg-purple-500/10 text-purple-500",
  "Políticas": "bg-orange-500/10 text-orange-500",
  "General": "bg-muted text-muted-foreground",
  "Ventas": "bg-[#2ecc71]/10 text-[#2ecc71]",
}

export default function ConocimientoPage() {
  const [search, setSearch] = useState("")
  const [editingFaq, setEditingFaq] = useState<number | null>(null)

  const filteredFaqs = faqs.filter((f) =>
    !search || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase())
  )

  const filteredProducts = products.filter((p) =>
    !search || p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Base de conocimiento</h2>
          <p className="text-sm text-muted-foreground">Todo lo que tu asistente IA sabe sobre tu negocio</p>
        </div>
        <Button size="sm" className="gap-2 text-xs bg-foreground text-background hover:bg-foreground/90">
          <Plus className="h-3.5 w-3.5" />Agregar contenido
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="flex items-center gap-2 mb-1"><HelpCircle className="h-4 w-4 text-muted-foreground" /><p className="text-xs text-muted-foreground">Preguntas FAQ</p></div><p className="text-2xl font-bold">{faqs.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2 mb-1"><ShoppingBag className="h-4 w-4 text-muted-foreground" /><p className="text-xs text-muted-foreground">Productos cargados</p></div><p className="text-2xl font-bold">{products.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2 mb-1"><CheckCircle className="h-4 w-4 text-[#2ecc71]" /><p className="text-xs text-muted-foreground">Precisión de respuestas</p></div><p className="text-2xl font-bold text-[#2ecc71]">94.2%</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2 mb-1"><MessageSquare className="h-4 w-4 text-muted-foreground" /><p className="text-xs text-muted-foreground">Consultas resueltas</p></div><p className="text-2xl font-bold">1,847</p></CardContent></Card>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar en la base de conocimiento..." className="pl-9 h-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <Tabs defaultValue="faqs" className="space-y-4">
        <TabsList className="h-9">
          <TabsTrigger value="faqs" className="text-xs gap-1.5"><HelpCircle className="h-3.5 w-3.5" />Preguntas frecuentes</TabsTrigger>
          <TabsTrigger value="products" className="text-xs gap-1.5"><ShoppingBag className="h-3.5 w-3.5" />Productos</TabsTrigger>
          <TabsTrigger value="docs" className="text-xs gap-1.5"><FileText className="h-3.5 w-3.5" />Documentos</TabsTrigger>
        </TabsList>

        {/* FAQs */}
        <TabsContent value="faqs" className="space-y-3">
          {filteredFaqs.map((faq) => (
            <Card key={faq.id} className={!faq.active ? "opacity-50" : ""}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-medium">{faq.question}</h3>
                      <Badge variant="outline" className={`text-[10px] border-0 ${categoryColors[faq.category]}`}>{faq.category}</Badge>
                      {!faq.active && <Badge variant="outline" className="text-[10px]">Inactiva</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7 shrink-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Edit3 className="h-3.5 w-3.5 mr-2" />Editar</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive"><Trash2 className="h-3.5 w-3.5 mr-2" />Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Products */}
        <TabsContent value="products" className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} className={!product.active ? "opacity-50" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium">{product.name}</h3>
                      <p className="text-lg font-bold mt-1">{product.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className={`text-[10px] ${product.stock > 0 ? "text-[#2ecc71] border-[#2ecc71]/20 bg-[#2ecc71]/10" : "text-destructive border-destructive/20 bg-destructive/10"}`}>
                          {product.stock > 0 ? `${product.stock} en stock` : "Sin stock"}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Edit3 className="h-3.5 w-3.5 mr-2" />Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><Trash2 className="h-3.5 w-3.5 mr-2" />Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Docs */}
        <TabsContent value="docs">
          <Card>
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
                  <Upload className="h-7 w-7 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Subí documentos para entrenar a tu IA</h3>
                  <p className="text-xs text-muted-foreground mt-1">PDFs, documentos de Word, o archivos de texto con información de tu negocio</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2 text-xs"><Upload className="h-3.5 w-3.5" />Subir documento</Button>
                <p className="text-[10px] text-muted-foreground">Máximo 10MB por archivo. Formatos: PDF, DOCX, TXT</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
