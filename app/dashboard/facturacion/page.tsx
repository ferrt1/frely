"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  CheckCircle, Download, CreditCard, ArrowUpRight, MessageSquare,
  Users, Bot, Zap, Crown, ChevronRight,
} from "lucide-react"

const invoices = [
  { id: "INV-2026-003", date: "01 Mar 2026", amount: "$29.990", status: "paid", plan: "Pro" },
  { id: "INV-2026-002", date: "01 Feb 2026", amount: "$29.990", status: "paid", plan: "Pro" },
  { id: "INV-2026-001", date: "01 Ene 2026", amount: "$29.990", status: "paid", plan: "Pro" },
  { id: "INV-2025-012", date: "01 Dic 2025", amount: "$14.990", status: "paid", plan: "Starter" },
  { id: "INV-2025-011", date: "01 Nov 2025", amount: "$14.990", status: "paid", plan: "Starter" },
]

const plans = [
  {
    name: "Starter",
    price: "$14.990",
    period: "/mes",
    features: ["1,000 mensajes/mes", "1 canal (WhatsApp)", "Respuestas automáticas", "Dashboard básico"],
    current: false,
  },
  {
    name: "Pro",
    price: "$29.990",
    period: "/mes",
    features: ["5,000 mensajes/mes", "3 canales", "IA personalizada", "Analytics avanzado", "Soporte prioritario", "Base de conocimiento"],
    current: true,
    popular: true,
  },
  {
    name: "Business",
    price: "$59.990",
    period: "/mes",
    features: ["Mensajes ilimitados", "Canales ilimitados", "IA avanzada + GPT-4", "API access", "Soporte dedicado", "Multi-agente", "White label"],
    current: false,
  },
]

export default function FacturacionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Facturación</h2>
        <p className="text-sm text-muted-foreground">Gestioná tu plan, pagos y facturas</p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Plan actual</CardTitle>
              <CardDescription>Tu suscripción y uso actual</CardDescription>
            </div>
            <Badge className="bg-[#2ecc71]/10 text-[#2ecc71] border-0 gap-1">
              <CheckCircle className="h-3 w-3" />Activo
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-foreground flex items-center justify-center">
                <Crown className="h-6 w-6 text-background" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Plan Pro</h3>
                <p className="text-sm text-muted-foreground">$29.990/mes - Próxima facturación: 1 Abr 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="text-xs flex-1 sm:flex-none">Cancelar plan</Button>
              <Button size="sm" className="text-xs gap-1.5 bg-foreground text-background hover:bg-foreground/90 flex-1 sm:flex-none">
                <Zap className="h-3.5 w-3.5" />Upgrade a Business
              </Button>
            </div>
          </div>

          <Separator />

          {/* Usage */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2"><MessageSquare className="h-4 w-4 text-muted-foreground" /><span>Mensajes</span></div>
                <span className="font-medium">1,247 / 5,000</span>
              </div>
              <Progress value={25} className="h-2" />
              <p className="text-xs text-muted-foreground">25% utilizado - Te quedan 3,753 mensajes</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" /><span>Contactos</span></div>
                <span className="font-medium">847 / 2,000</span>
              </div>
              <Progress value={42} className="h-2" />
              <p className="text-xs text-muted-foreground">42% utilizado</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2"><Bot className="h-4 w-4 text-muted-foreground" /><span>Canales</span></div>
                <span className="font-medium">2 / 3</span>
              </div>
              <Progress value={66} className="h-2" />
              <p className="text-xs text-muted-foreground">WhatsApp + Instagram conectados</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plans Comparison */}
      <div>
        <h3 className="text-base font-semibold mb-4">Comparar planes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <Card key={plan.name} className={plan.current ? "border-[#2ecc71] border-2 relative" : ""}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[#2ecc71] text-white border-0 text-[10px]">Más popular</Badge>
                </div>
              )}
              <CardContent className="p-5 space-y-4">
                <div>
                  <h3 className="font-semibold">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-bold">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                </div>
                <Separator />
                <ul className="space-y-2">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3.5 w-3.5 text-[#2ecc71] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full text-xs ${plan.current ? "bg-muted text-foreground hover:bg-muted" : "bg-foreground text-background hover:bg-foreground/90"}`}
                  disabled={plan.current}
                  size="sm"
                >
                  {plan.current ? "Plan actual" : "Cambiar a " + plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Método de pago</CardTitle>
              <CardDescription>Tu tarjeta asociada a la suscripción</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="text-xs">Cambiar</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 rounded-lg border border-border">
            <div className="h-10 w-14 rounded-md bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Visa terminada en •••• 4532</p>
              <p className="text-xs text-muted-foreground">Vence 09/2028</p>
            </div>
            <Badge variant="outline" className="text-[10px]">Predeterminada</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Historial de facturas</CardTitle>
              <CardDescription>Tus últimos pagos y comprobantes</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="text-xs gap-1.5"><Download className="h-3.5 w-3.5" />Exportar todo</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-x-auto -mx-4 sm:mx-0">
            <Table className="min-w-[500px] sm:min-w-0">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs">Factura</TableHead>
                  <TableHead className="text-xs">Fecha</TableHead>
                  <TableHead className="text-xs hidden sm:table-cell">Plan</TableHead>
                  <TableHead className="text-xs">Monto</TableHead>
                  <TableHead className="text-xs">Estado</TableHead>
                  <TableHead className="text-xs w-[50px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="text-sm font-medium">{inv.id}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{inv.date}</TableCell>
                    <TableCell className="text-sm hidden sm:table-cell">{inv.plan}</TableCell>
                    <TableCell className="text-sm font-medium">{inv.amount}</TableCell>
                    <TableCell>
                      <Badge className="bg-[#2ecc71]/10 text-[#2ecc71] border-0 text-[10px]">Pagado</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Download className="h-3.5 w-3.5" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
