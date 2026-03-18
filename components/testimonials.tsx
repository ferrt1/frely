const testimonials = [
  {
    name: "María García",
    role: "Dueña de Nail Studio",
    avatar: "MG",
    quote:
      "Antes perdía muchos turnos porque no podía responder los mensajes a tiempo. Ahora Frely atiende las 24 horas y mis clientes pueden reservar incluso a las 3 de la mañana.",
  },
  {
    name: "Carlos Mendoza",
    role: "Restaurante La Esquina",
    avatar: "CM",
    quote:
      "Nuestras reservas aumentaron un 40% desde que usamos Frely. Los clientes reciben confirmación instantánea y ya no se van a la competencia por falta de respuesta.",
  },
  {
    name: "Luciana Torres",
    role: "Salón de Belleza Brillante",
    avatar: "LT",
    quote:
      "Lo mejor es que puedo personalizar las respuestas para que suenen como yo. Mis clientas ni se dan cuenta que es automático. ¡Y puedo descansar tranquila!",
  },
]

export function Testimonials() {
  return (
    <section className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Miles de pequeños negocios ya confían en Frely para automatizar su atención
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-background rounded-2xl p-8 shadow-sm border border-border"
            >
              {/* Quote */}
              <blockquote className="text-foreground leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
