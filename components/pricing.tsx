import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Básico",
    afterPrice: "$100.000/mes",
    price: "$35.000",
    period: "/mes",
    description: "0-30 clientes por día",
    features: [
      "Bot con IA + agendamiento automático",
      "Consulta de disponibilidad y cancelaciones",
      "Soporte por email",
    ],
    highlighted: false,
    cta: "Comenzar",
  },
  {
    name: "Pro",
    afterPrice: "$125.000/mes",
    price: "$60.000",
    period: "/mes",
    description: "30-50 clientes por día",
    features: [
      "Todo lo del plan Básico",
      "Recordatorios de turno opcionales",
      "IA personalizada para tu negocio",
      "Soporte prioritario",
    ],
    highlighted: true,
    cta: "Comenzar",
  },
  {
    name: "Premium",
    afterPrice: "$150.000+/mes",
    price: "$80.000+",
    period: "/mes",
    description: "50+ clientes por día",
    features: [
      "Todo lo del plan Pro",
      "Integraciones a medida",
      "Multi-sucursal",
      "Soporte dedicado 24/7",
      "Onboarding personalizado",
    ],
    highlighted: false,
    cta: "Contactar ventas",
  },
]

export function Pricing() {
  return (
    <section id="precios" className="bg-secondary/30 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-accent uppercase tracking-wider">
            Precios
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
            Planes simples, sin sorpresas
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Elegi el plan que mejor se adapte a tu negocio. Podes cambiar en cualquier momento.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-2xl p-6 sm:p-8 transition-all",
                plan.highlighted
                  ? "bg-foreground text-background ring-1 ring-foreground"
                  : "bg-card border border-border"
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                  Mas popular
                </div>
              )}

              <div>
                <h3 className={cn(
                  "text-lg font-semibold",
                  plan.highlighted ? "text-background" : "text-foreground"
                )}>
                  {plan.name}
                </h3>
                <p className={cn(
                  "mt-1 text-sm",
                  plan.highlighted ? "text-background/70" : "text-muted-foreground"
                )}>
                  {plan.description}
                </p>
                <div className="mt-6">
                  <span className={cn(
                    "text-4xl font-semibold tracking-tight",
                    plan.highlighted ? "text-background" : "text-foreground"
                  )}>
                    {plan.price}
                  </span>
                  <span className={cn(
                    plan.highlighted ? "text-background/70" : "text-muted-foreground"
                  )}>
                    {plan.period}
                  </span>
                  <p className={cn(
                    "mt-2 text-sm line-through",
                    plan.highlighted ? "text-background/40" : "text-muted-foreground/50"
                  )}>
                    Después: {plan.afterPrice}
                  </p>
                  <p className="mt-1 text-xs font-medium text-accent">
                    Primer mes gratis
                  </p>
                </div>
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={cn(
                      "h-4 w-4 shrink-0 mt-0.5",
                      plan.highlighted ? "text-accent" : "text-accent"
                    )} />
                    <span className={cn(
                      "text-sm",
                      plan.highlighted ? "text-background/90" : "text-foreground"
                    )}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  "mt-8 w-full gap-2 group",
                  plan.highlighted
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "bg-foreground text-background hover:bg-foreground/90"
                )}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
