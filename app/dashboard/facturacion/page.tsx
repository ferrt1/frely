"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  CheckCircle, Download, CreditCard, MessageSquare,
  Users, Bot, Zap, Crown, AlertTriangle, XCircle,
  ExternalLink, QrCode, Copy, Check, Clock, RefreshCw,
  ChevronRight, Shield,
} from "lucide-react"
import { MP_PLANS, formatPrice, getDaysRemaining, getPlanStatus } from "@/lib/mercadopago"

// Simulated subscription data (in production, this comes from your backend)
const mockSubscription = {
  plan: "pro",
  status: "active" as const,
  startDate: "2026-03-01",
  expirationDate: "2026-04-01",
  autoRenew: false,
  messagesUsed: 1247,
  messagesLimit: 5000,
  contactsUsed: 847,
  contactsLimit: 2000,
  channelsUsed: 2,
  channelsLimit: 3,
}

const invoices = [
  { id: "INV-2026-003", date: "01 Mar 2026", amount: "$60.000", status: "paid" as const, plan: "Pro", mpId: "MP-78291" },
  { id: "INV-2026-002", date: "01 Feb 2026", amount: "$60.000", status: "paid" as const, plan: "Pro", mpId: "MP-67182" },
  { id: "INV-2026-001", date: "01 Ene 2026", amount: "$60.000", status: "paid" as const, plan: "Pro", mpId: "MP-56073" },
  { id: "INV-2025-012", date: "01 Dic 2025", amount: "$35.000", status: "paid" as const, plan: "Básico", mpId: "MP-44964" },
  { id: "INV-2025-011", date: "01 Nov 2025", amount: "$35.000", status: "paid" as const, plan: "Básico", mpId: "MP-33855" },
]

const plans = [
  {
    id: "basico",
    name: "Básico",
    price: "$35.000",
    period: "/mes",
    description: "Hasta 30 clientes/día",
    features: ["Bot con IA + agendamiento", "1 canal (WhatsApp)", "Consulta disponibilidad", "Cancelaciones automáticas"],
    current: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$60.000",
    period: "/mes",
    description: "30 a 50 clientes/día",
    features: ["Todo lo del Básico", "Recordatorios de turno", "IA personalizada", "Analytics y reportes", "Soporte prioritario"],
    current: true,
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$80.000+",
    period: "/mes",
    description: "+50 clientes/día",
    features: ["Todo lo del Pro", "Volumen ilimitado", "Integraciones a medida", "Multi-sucursal", "Soporte dedicado 24/7"],
    current: false,
  },
]

const promoLaunch = {
  price: "$35.000",
  months: 6,
  label: "Oferta de lanzamiento: $35.000 por 6 meses",
}

// Simulated MercadoPago payment data
const mockPaymentData = {
  cvu: "0000003100092910000001",
  alias: "frely.pro.mp",
  qrBase64: "", // In production, this would be a real QR image
  checkoutUrl: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=TEST-123456789",
  preferenceId: "TEST-123456789",
}

export default function FacturacionPage() {
  const [showPayment, setShowPayment] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "pending" | "checking" | "success">("idle")
  const [copied, setCopied] = useState<string | null>(null)

  const daysRemaining = getDaysRemaining(mockSubscription.expirationDate)
  const planStatus = getPlanStatus(daysRemaining)
  const currentPlan = MP_PLANS[mockSubscription.plan]

  const handlePayPlan = (planId: string) => {
    setSelectedPlan(planId)
    setShowPayment(true)
    setPaymentStatus("pending")
  }

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleCheckPayment = () => {
    setPaymentStatus("checking")
    // Simulate checking payment status
    setTimeout(() => {
      setPaymentStatus("success")
      setTimeout(() => {
        setShowPayment(false)
        setPaymentStatus("idle")
        setSelectedPlan(null)
      }, 3000)
    }, 2000)
  }

  const handleOpenCheckout = () => {
    // In production, this opens the real MercadoPago checkout URL
    window.open(mockPaymentData.checkoutUrl, "_blank")
  }

  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden">
      <div>
        <h2 className="text-xl font-bold">Facturación</h2>
        <p className="text-sm text-muted-foreground">Gestioná tu plan, pagos y facturas</p>
      </div>

      {/* Plan Expiration Warning */}
      {planStatus === "warning" && (
        <Card className="border-amber-500/50 bg-amber-500/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  Tu plan vence en {daysRemaining} {daysRemaining === 1 ? "día" : "días"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Renová antes del {new Date(mockSubscription.expirationDate).toLocaleDateString("es-AR")} para no perder el servicio.
                </p>
              </div>
              <Button
                size="sm"
                className="text-xs bg-amber-500 text-white hover:bg-amber-600 shrink-0"
                onClick={() => handlePayPlan(mockSubscription.plan)}
              >
                Renovar ahora
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plan Expired */}
      {planStatus === "expired" && (
        <Card className="border-red-500/50 bg-red-500/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">Tu plan expiró</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Tu bot dejó de responder mensajes. Renová tu plan para reactivarlo.
                </p>
              </div>
              <Button
                size="sm"
                className="text-xs bg-red-500 text-white hover:bg-red-600 shrink-0"
                onClick={() => handlePayPlan(mockSubscription.plan)}
              >
                Reactivar plan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* MercadoPago Payment Modal */}
      {showPayment && selectedPlan && (
        <Card className="border-[#009ee3]/50 border-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#009ee3] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MP</span>
                </div>
                <div>
                  <CardTitle className="text-base">Pagar con MercadoPago</CardTitle>
                  <CardDescription>
                    {MP_PLANS[selectedPlan]?.name} — {formatPrice(MP_PLANS[selectedPlan]?.price || 0)}/mes
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => { setShowPayment(false); setPaymentStatus("idle") }}
              >
                Cancelar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentStatus === "success" ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#2ecc71]/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-[#2ecc71]" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">¡Pago confirmado!</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Tu plan {MP_PLANS[selectedPlan]?.name} fue renovado exitosamente.
                </p>
              </div>
            ) : (
              <>
                {/* Option 1: Checkout Link */}
                <div className="rounded-xl border border-border p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-[#009ee3]" />
                    <h4 className="text-sm font-semibold">Opción 1: Link de pago</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Se abre MercadoPago donde podés pagar con tarjeta, transferencia o efectivo.
                  </p>
                  <Button
                    className="w-full bg-[#009ee3] text-white hover:bg-[#0080c7] gap-2"
                    onClick={handleOpenCheckout}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Pagar con MercadoPago
                  </Button>
                </div>

                {/* Option 2: Transfer / CVU */}
                <div className="rounded-xl border border-border p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-[#009ee3]" />
                    <h4 className="text-sm font-semibold">Opción 2: Transferencia</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Transferí el monto exacto de {formatPrice(MP_PLANS[selectedPlan]?.price || 0)} a esta cuenta.
                  </p>

                  <div className="space-y-2">
                    {/* CVU */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">CVU</p>
                        <p className="text-sm font-mono mt-0.5 truncate">{mockPaymentData.cvu}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={() => handleCopy(mockPaymentData.cvu, "cvu")}
                      >
                        {copied === "cvu" ? <Check className="h-3.5 w-3.5 text-[#2ecc71]" /> : <Copy className="h-3.5 w-3.5" />}
                      </Button>
                    </div>

                    {/* Alias */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Alias</p>
                        <p className="text-sm font-mono mt-0.5">{mockPaymentData.alias}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={() => handleCopy(mockPaymentData.alias, "alias")}
                      >
                        {copied === "alias" ? <Check className="h-3.5 w-3.5 text-[#2ecc71]" /> : <Copy className="h-3.5 w-3.5" />}
                      </Button>
                    </div>

                    {/* Amount */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Monto exacto</p>
                        <p className="text-sm font-semibold mt-0.5">{formatPrice(MP_PLANS[selectedPlan]?.price || 0)}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={() => handleCopy(String(MP_PLANS[selectedPlan]?.price || 0), "amount")}
                      >
                        {copied === "amount" ? <Check className="h-3.5 w-3.5 text-[#2ecc71]" /> : <Copy className="h-3.5 w-3.5" />}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Option 3: QR */}
                <div className="rounded-xl border border-border p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <QrCode className="h-4 w-4 text-[#009ee3]" />
                    <h4 className="text-sm font-semibold">Opción 3: Código QR</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Escaneá este código desde la app de MercadoPago.
                  </p>
                  <div className="flex justify-center py-4">
                    <div className="w-48 h-48 rounded-xl bg-white border-2 border-dashed border-border flex items-center justify-center">
                      <div className="text-center">
                        <QrCode className="h-16 w-16 text-muted-foreground/30 mx-auto" />
                        <p className="text-[10px] text-muted-foreground mt-2">QR de prueba</p>
                        <p className="text-[10px] text-muted-foreground">En producción se genera automáticamente</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Verify Payment */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <Button
                    className="w-full sm:flex-1 gap-2 bg-[#2ecc71] text-white hover:bg-[#27ae60]"
                    onClick={handleCheckPayment}
                    disabled={paymentStatus === "checking"}
                  >
                    {paymentStatus === "checking" ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Verificando pago...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Ya pagué, verificar
                      </>
                    )}
                  </Button>
                  <p className="text-[10px] text-muted-foreground text-center sm:text-left">
                    El pago puede tardar unos minutos en acreditarse
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Current Plan */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Plan actual</CardTitle>
              <CardDescription>Tu suscripción y uso actual</CardDescription>
            </div>
            <Badge className={
              planStatus === "active" ? "bg-[#2ecc71]/10 text-[#2ecc71] border-0 gap-1" :
              planStatus === "warning" ? "bg-amber-500/10 text-amber-500 border-0 gap-1" :
              "bg-red-500/10 text-red-500 border-0 gap-1"
            }>
              {planStatus === "active" && <><CheckCircle className="h-3 w-3" />Activo</>}
              {planStatus === "warning" && <><Clock className="h-3 w-3" />Vence pronto</>}
              {planStatus === "expired" && <><XCircle className="h-3 w-3" />Expirado</>}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-foreground flex items-center justify-center shrink-0">
                <Crown className="h-5 w-5 sm:h-6 sm:w-6 text-background" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold">Plan {currentPlan?.name.replace("Frely ", "")}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {formatPrice(currentPlan?.price || 0)}/mes · {daysRemaining > 0 ? `${daysRemaining} días restantes` : "Expirado"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="text-xs flex-1 sm:flex-none">Cancelar</Button>
              {planStatus !== "expired" ? (
                <Button
                  size="sm"
                  className="text-xs gap-1.5 bg-foreground text-background hover:bg-foreground/90 flex-1 sm:flex-none"
                  onClick={() => handlePayPlan("business")}
                >
                  <Zap className="h-3.5 w-3.5" />Upgrade
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="text-xs gap-1.5 bg-[#2ecc71] text-white hover:bg-[#27ae60] flex-1 sm:flex-none"
                  onClick={() => handlePayPlan(mockSubscription.plan)}
                >
                  <RefreshCw className="h-3.5 w-3.5" />Renovar
                </Button>
              )}
            </div>
          </div>

          <Separator />

          {/* Expiration bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Período actual</span>
              </div>
              <span className="font-medium">
                {new Date(mockSubscription.startDate).toLocaleDateString("es-AR")} — {new Date(mockSubscription.expirationDate).toLocaleDateString("es-AR")}
              </span>
            </div>
            <Progress
              value={Math.max(0, Math.min(100, ((30 - daysRemaining) / 30) * 100))}
              className="h-2"
            />
          </div>

          <Separator />

          {/* Usage */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2"><MessageSquare className="h-4 w-4 text-muted-foreground" /><span>Mensajes</span></div>
                <span className="font-medium">{mockSubscription.messagesUsed.toLocaleString()} / {mockSubscription.messagesLimit.toLocaleString()}</span>
              </div>
              <Progress value={(mockSubscription.messagesUsed / mockSubscription.messagesLimit) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {Math.round((mockSubscription.messagesUsed / mockSubscription.messagesLimit) * 100)}% utilizado
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" /><span>Contactos</span></div>
                <span className="font-medium">{mockSubscription.contactsUsed.toLocaleString()} / {mockSubscription.contactsLimit.toLocaleString()}</span>
              </div>
              <Progress value={(mockSubscription.contactsUsed / mockSubscription.contactsLimit) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {Math.round((mockSubscription.contactsUsed / mockSubscription.contactsLimit) * 100)}% utilizado
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2"><Bot className="h-4 w-4 text-muted-foreground" /><span>Canales</span></div>
                <span className="font-medium">{mockSubscription.channelsUsed} / {mockSubscription.channelsLimit}</span>
              </div>
              <Progress value={(mockSubscription.channelsUsed / mockSubscription.channelsLimit) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">WhatsApp + Instagram conectados</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Promo Banner */}
      <Card className="border-2 border-[#2ecc71] bg-[#2ecc71]/5">
        <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Badge className="bg-[#2ecc71] text-white border-0 text-[10px] mb-2">Oferta de lanzamiento</Badge>
            <h3 className="text-lg font-bold">{promoLaunch.price} <span className="text-sm font-normal text-muted-foreground">por {promoLaunch.months} meses</span></h3>
            <p className="text-xs text-muted-foreground mt-1">Comprá ahora y asegurate el servicio completo a precio especial. Después se aplica el plan que elijas.</p>
          </div>
          <Button className="bg-[#2ecc71] text-white hover:bg-[#2ecc71]/90 gap-1.5 shrink-0" size="sm" onClick={() => handlePayPlan("promo")}>
            <CreditCard className="h-3.5 w-3.5" />Quiero la oferta
          </Button>
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
                {plan.current ? (
                  <Button
                    className="w-full text-xs bg-muted text-foreground hover:bg-muted"
                    disabled
                    size="sm"
                  >
                    Plan actual
                  </Button>
                ) : (
                  <Button
                    className="w-full text-xs bg-foreground text-background hover:bg-foreground/90 gap-1.5"
                    size="sm"
                    onClick={() => handlePayPlan(plan.id)}
                  >
                    <CreditCard className="h-3.5 w-3.5" />
                    Pagar con MercadoPago
                  </Button>
                )}
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
              <CardDescription>Pagá con MercadoPago — tarjeta, transferencia o QR</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-lg border border-border">
            <div className="h-10 w-12 sm:w-14 rounded-md bg-[#009ee3] flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">MP</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">MercadoPago</p>
              <p className="text-xs text-muted-foreground">Tarjeta · Transferencia · QR · Efectivo</p>
            </div>
            <Badge className="bg-[#2ecc71]/10 text-[#2ecc71] border-0 text-[10px] shrink-0">Activo</Badge>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5" />
            Pagos seguros procesados por MercadoPago
          </div>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Historial de pagos</CardTitle>
              <CardDescription>Tus últimos pagos y comprobantes</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="text-xs gap-1.5"><Download className="h-3.5 w-3.5" />Exportar</Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Mobile: Card list */}
          <div className="sm:hidden space-y-2">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{inv.id}</p>
                  <p className="text-xs text-muted-foreground">{inv.date} · {inv.plan}</p>
                  <p className="text-[10px] text-muted-foreground/60">{inv.mpId}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-medium">{inv.amount}</span>
                  <Badge className="bg-[#2ecc71]/10 text-[#2ecc71] border-0 text-[10px]">Pagado</Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Table */}
          <div className="hidden sm:block rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs">Factura</TableHead>
                  <TableHead className="text-xs">Fecha</TableHead>
                  <TableHead className="text-xs hidden md:table-cell">Plan</TableHead>
                  <TableHead className="text-xs hidden md:table-cell">ID MercadoPago</TableHead>
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
                    <TableCell className="text-sm hidden md:table-cell">{inv.plan}</TableCell>
                    <TableCell className="text-sm text-muted-foreground hidden md:table-cell font-mono text-xs">{inv.mpId}</TableCell>
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
