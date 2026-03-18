import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="bg-foreground py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold text-background tracking-tight text-balance">
            Empieza a automatizar tu negocio hoy
          </h2>
          <p className="mt-4 text-lg text-background/70">
            Configura tu asistente en minutos y empieza a recibir reservas automaticas.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90 h-12 px-6 text-[15px] gap-2 group">
              Empezar gratis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-6 text-[15px] border-background/20 text-background hover:bg-background/10 hover:text-background">
              Hablar con ventas
            </Button>
          </div>
          <p className="mt-6 text-sm text-background/50">
            Sin tarjeta de credito. Cancela cuando quieras.
          </p>
        </div>
      </div>
    </section>
  )
}
