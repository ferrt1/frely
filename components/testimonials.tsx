import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Maria Garcia",
    role: "Nail Studio",
    avatar: "MG",
    quote:
      "Antes perdia muchos turnos porque no podia responder los mensajes a tiempo. Ahora Frely atiende las 24 horas y mis clientes pueden reservar incluso a las 3 de la manana.",
  },
  {
    name: "Carlos Mendoza",
    role: "Restaurante La Esquina",
    avatar: "CM",
    quote:
      "Nuestras reservas aumentaron un 40% desde que usamos Frely. Los clientes reciben confirmacion instantanea y ya no se van a la competencia.",
  },
  {
    name: "Luciana Torres",
    role: "Salon de Belleza Brillante",
    avatar: "LT",
    quote:
      "Lo mejor es que puedo personalizar las respuestas para que suenen como yo. Mis clientas ni se dan cuenta que es automatico.",
  },
]

export function Testimonials() {
  return (
    <section id="testimonios" className="bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-accent uppercase tracking-wider">
            Testimonios
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
            Negocios que ya confian en Frely
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Miles de pequenos negocios ya automatizaron su atencion al cliente
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-secondary/50 rounded-2xl p-6 sm:p-8 border border-border/50"
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-accent/20 mb-4" />
              
              {/* Quote */}
              <blockquote className="text-foreground leading-relaxed">
                {testimonial.quote}
              </blockquote>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background text-sm font-medium">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
