import { MessageSquare, Settings, Zap, Bot } from "lucide-react"

const features = [
  {
    icon: MessageSquare,
    label: "Multicanal",
    title: "Conecta todos tus canales",
    description: "WhatsApp, Instagram y Telegram en un solo lugar. Integra en minutos sin conocimientos tecnicos.",
  },
  {
    icon: Bot,
    title: "IA que entiende a tus clientes",
    label: "Inteligencia Artificial",
    description: "Respuestas naturales y personalizadas que se adaptan al tono de tu negocio. Como si fueras vos.",
  },
  {
    icon: Settings,
    label: "Personalizable",
    title: "Configura a tu medida",
    description: "Define horarios, precios, servicios y respuestas. Tu asistente virtual sabe todo sobre tu negocio.",
  },
  {
    icon: Zap,
    label: "Automatico",
    title: "Funciona las 24 horas",
    description: "Nunca mas pierdas un cliente por no responder a tiempo. Tu negocio atiende incluso mientras dormis.",
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent uppercase tracking-wider">
            Producto
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
            Atencion automatica.<br />
            Resultados reales.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Herramientas para que tu equipo (de uno) pueda ofrecer atencion profesional y escalar sin contratar.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-secondary/50 rounded-2xl p-6 sm:p-8 border border-border/50 hover:border-border hover:bg-secondary transition-all duration-300"
            >
              {/* Label */}
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <feature.icon className="h-3.5 w-3.5" />
                {feature.label}
              </span>

              {/* Content */}
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
