"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Store, Bot, MessageSquare, Bell, Shield, Globe,
  CheckCircle, AlertCircle, Save,
} from "lucide-react"

export default function ConfiguracionPage() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Configuración</h2>
          <p className="text-sm text-muted-foreground">Ajustá tu negocio, asistente IA y canales</p>
        </div>
        <Button size="sm" className="gap-2 text-xs bg-foreground text-background hover:bg-foreground/90" onClick={handleSave}>
          {saved ? <><CheckCircle className="h-3.5 w-3.5" />Guardado</> : <><Save className="h-3.5 w-3.5" />Guardar cambios</>}
        </Button>
      </div>

      <Tabs defaultValue="negocio" className="space-y-4">
        <TabsList className="h-9 flex-wrap">
          <TabsTrigger value="negocio" className="text-xs gap-1.5"><Store className="h-3.5 w-3.5" />Negocio</TabsTrigger>
          <TabsTrigger value="asistente" className="text-xs gap-1.5"><Bot className="h-3.5 w-3.5" />Asistente IA</TabsTrigger>
          <TabsTrigger value="canales" className="text-xs gap-1.5"><MessageSquare className="h-3.5 w-3.5" />Canales</TabsTrigger>
          <TabsTrigger value="notificaciones" className="text-xs gap-1.5"><Bell className="h-3.5 w-3.5" />Notificaciones</TabsTrigger>
        </TabsList>

        {/* Negocio */}
        <TabsContent value="negocio" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Datos del negocio</CardTitle>
              <CardDescription>Información básica que tu asistente usará</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Nombre del negocio</Label>
                  <Input defaultValue="Café Avellaneda" className="h-9 text-sm" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Industria</Label>
                  <Select defaultValue="gastronomia">
                    <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gastronomia">Gastronomía</SelectItem>
                      <SelectItem value="retail">Retail / Tienda</SelectItem>
                      <SelectItem value="servicios">Servicios</SelectItem>
                      <SelectItem value="salud">Salud</SelectItem>
                      <SelectItem value="educacion">Educación</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Email de contacto</Label>
                  <Input defaultValue="info@cafeavellaneda.com.ar" className="h-9 text-sm" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Teléfono</Label>
                  <Input defaultValue="+54 11 4567-8900" className="h-9 text-sm" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-xs font-medium">Dirección</Label>
                  <Input defaultValue="Av. Corrientes 1234, CABA" className="h-9 text-sm" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Horario y zona horaria</CardTitle>
              <CardDescription>Definí cuándo hay atención humana disponible</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Horario de atención humana</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] text-muted-foreground">Desde</Label>
                    <Input type="time" defaultValue="09:00" className="h-9 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] text-muted-foreground">Hasta</Label>
                    <Input type="time" defaultValue="18:00" className="h-9 text-sm" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium">Zona horaria</Label>
                <Select defaultValue="ar">
                  <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">Argentina (GMT-3)</SelectItem>
                    <SelectItem value="mx">México (GMT-6)</SelectItem>
                    <SelectItem value="co">Colombia (GMT-5)</SelectItem>
                    <SelectItem value="es">España (GMT+1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Asistente IA */}
        <TabsContent value="asistente" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Identidad del asistente</CardTitle>
              <CardDescription>Nombre y tono con el que tu IA se presenta a los clientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Nombre del asistente</Label>
                  <Input defaultValue="Avi" className="h-9 text-sm" />
                  <p className="text-[10px] text-muted-foreground">El nombre que usará tu asistente al presentarse</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Tono de comunicación</Label>
                  <Select defaultValue="friendly">
                    <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly">Amigable y cercano</SelectItem>
                      <SelectItem value="professional">Profesional y formal</SelectItem>
                      <SelectItem value="casual">Casual y relajado</SelectItem>
                      <SelectItem value="enthusiastic">Entusiasta y enérgico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Instrucciones personalizadas</CardTitle>
              <CardDescription>Estas instrucciones guían el comportamiento del asistente en cada conversación</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                defaultValue="Sos Avi, el asistente virtual de Café Avellaneda. Respondé siempre en español rioplatense, usá 'vos' en lugar de 'tú'. Sé amable, ofrecé recomendaciones de productos cuando sea oportuno, y si no sabés algo, derivá a un agente humano."
                className="min-h-[120px] text-sm"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Comportamiento automático</CardTitle>
              <CardDescription>Activá o desactivá funciones automáticas del asistente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="text-sm font-medium">Usar emojis en respuestas</p>
                  <p className="text-xs text-muted-foreground">El asistente incluirá emojis relevantes</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="text-sm font-medium">Ofrecer productos proactivamente</p>
                  <p className="text-xs text-muted-foreground">Sugerir productos cuando sea oportuno</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="text-sm font-medium">Auto-escalar conversaciones difíciles</p>
                  <p className="text-xs text-muted-foreground">Derivar a humano cuando no pueda resolver</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium">Mensaje de bienvenida automático</p>
                  <p className="text-xs text-muted-foreground">Saludar al usuario cuando inicia una conversación</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Canales */}
        <TabsContent value="canales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Canales conectados</CardTitle>
              <CardDescription>Plataformas donde tu asistente está activo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* WhatsApp */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#25D366" + "15" }}>
                    <MessageSquare className="h-5 w-5" style={{ color: "#25D366" }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">WhatsApp Business</h4>
                      <Badge className="bg-[#2ecc71]/10 text-[#2ecc71] border-0 text-[10px]">Conectado</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">+54 11 4567-8900</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked />
                  <Button variant="outline" size="sm" className="text-xs">Configurar</Button>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#E4405F" + "15" }}>
                    <MessageSquare className="h-5 w-5" style={{ color: "#E4405F" }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">Instagram DMs</h4>
                      <Badge className="bg-[#2ecc71]/10 text-[#2ecc71] border-0 text-[10px]">Conectado</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">@cafeavellaneda</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked />
                  <Button variant="outline" size="sm" className="text-xs">Configurar</Button>
                </div>
              </div>

              {/* Telegram */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#0088cc" + "15" }}>
                    <MessageSquare className="h-5 w-5" style={{ color: "#0088cc" }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">Telegram Bot</h4>
                      <Badge variant="outline" className="text-[10px]">Desconectado</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">No configurado</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch />
                  <Button size="sm" className="text-xs bg-foreground text-background hover:bg-foreground/90">Conectar</Button>
                </div>
              </div>

              {/* Mercado Libre */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-border border-dashed">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Web Chat</h4>
                      <Badge variant="outline" className="text-[10px]">Próximamente</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Widget para tu sitio web</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-xs" disabled>Próximamente</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificaciones */}
        <TabsContent value="notificaciones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notificaciones por email</CardTitle>
              <CardDescription>Resúmenes y alertas que llegan a tu casilla</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div><p className="text-sm font-medium">Resumen diario</p><p className="text-xs text-muted-foreground">Recibí un email con las métricas del día</p></div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div><p className="text-sm font-medium">Conversaciones escaladas</p><p className="text-xs text-muted-foreground">Cuando una conversación necesite intervención humana</p></div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3">
                <div><p className="text-sm font-medium">Alertas de uso</p><p className="text-xs text-muted-foreground">Cuando estés por alcanzar el límite de mensajes</p></div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notificaciones en tiempo real</CardTitle>
              <CardDescription>Alertas instantáneas por WhatsApp o push</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div><p className="text-sm font-medium">Conversaciones escaladas</p><p className="text-xs text-muted-foreground">Notificación inmediata por WhatsApp</p></div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div><p className="text-sm font-medium">Reclamos de clientes</p><p className="text-xs text-muted-foreground">Alerta cuando un cliente muestra insatisfacción</p></div>
                <Switch />
              </div>
              <div className="flex items-center justify-between py-3">
                <div><p className="text-sm font-medium">Nuevas ventas</p><p className="text-xs text-muted-foreground">Cuando el bot concrete una venta</p></div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Número de WhatsApp para alertas</CardTitle>
              <CardDescription>A dónde enviar las notificaciones en tiempo real</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Input defaultValue="+54 11 4567-8900" className="h-9 text-sm max-w-xs" />
                <Button variant="outline" size="sm" className="text-xs">Verificar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
