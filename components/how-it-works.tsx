import { MessageSquare, Settings, Clock } from "lucide-react"

const steps = [
  {
    number: "1",
    title: "Conectás tu canal",
    description: "WhatsApp, Instagram o Telegram. Integrá en minutos sin conocimientos técnicos.",
    icon: MessageSquare,
  },
  {
    number: "2",
    title: "Configurás las respuestas",
    description: "Personalizá los mensajes automáticos según tu negocio y servicios.",
    icon: Settings,
  },
  {
    number: "3",
    title: "Tu negocio atiende solo",
    description: "Las 24 horas del día, los 7 días de la semana. Sin perder ningún cliente.",
    icon: Clock,
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Cómo funciona
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            En solo 3 pasos, tu negocio empieza a responder automáticamente
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-background rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                {step.number}
              </div>

              {/* Icon */}
              <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <step.icon className="h-6 w-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="mt-6 text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
