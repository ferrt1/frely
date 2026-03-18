import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    price: "$19",
    period: "/mes",
    description: "Ideal para empezar a automatizar",
    features: [
      "1 canal (WhatsApp, IG o Telegram)",
      "Respuestas automáticas básicas",
      "Hasta 500 mensajes/mes",
      "Soporte por email",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mes",
    description: "Para negocios en crecimiento",
    features: [
      "3 canales incluidos",
      "IA para respuestas inteligentes",
      "Mensajes ilimitados",
      "Análisis y reportes",
      "Soporte prioritario",
    ],
    highlighted: true,
  },
  {
    name: "Business",
    price: "$99",
    period: "/mes",
    description: "Para equipos y franquicias",
    features: [
      "Canales ilimitados",
      "IA avanzada personalizada",
      "Integraciones con CRM",
      "API disponible",
      "Soporte dedicado 24/7",
      "Onboarding personalizado",
    ],
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="precios" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Precios simples y transparentes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Elegí el plan que mejor se adapte a tu negocio. Podés cambiar en cualquier momento.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-2xl p-8 transition-all",
                plan.highlighted
                  ? "bg-background border-2 border-primary shadow-lg scale-105"
                  : "bg-secondary border border-border shadow-sm"
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                  Más popular
                </div>
              )}

              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  "mt-8 w-full",
                  plan.highlighted
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "bg-foreground/10 hover:bg-foreground/20 text-foreground"
                )}
              >
                Empezar gratis
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
