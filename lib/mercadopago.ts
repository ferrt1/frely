// MercadoPago Integration - Test Mode
// Docs: https://www.mercadopago.com.ar/developers

const MP_PUBLIC_KEY = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY || "TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

export interface PaymentPreference {
  id: string
  init_point: string // URL de pago (sandbox en test)
  sandbox_init_point: string
}

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  currency: string
  period: "monthly"
}

// Plans configuration
export const MP_PLANS: Record<string, SubscriptionPlan> = {
  starter: {
    id: "starter",
    name: "Frely Starter",
    price: 14990,
    currency: "ARS",
    period: "monthly",
  },
  pro: {
    id: "pro",
    name: "Frely Pro",
    price: 29990,
    currency: "ARS",
    period: "monthly",
  },
  business: {
    id: "business",
    name: "Frely Business",
    price: 59990,
    currency: "ARS",
    period: "monthly",
  },
}

// Format price for display
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(amount)
}

// Calculate days remaining
export function getDaysRemaining(expirationDate: string): number {
  const now = new Date()
  const exp = new Date(expirationDate)
  const diff = exp.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

// Get plan status
export function getPlanStatus(daysRemaining: number): "active" | "warning" | "expired" {
  if (daysRemaining <= 0) return "expired"
  if (daysRemaining <= 5) return "warning"
  return "active"
}
