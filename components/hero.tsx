import { Button } from "@/components/ui/button"

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[320px]">
      {/* Phone Frame */}
      <div className="relative rounded-[2.5rem] border-8 border-foreground/90 bg-foreground/90 p-1 shadow-2xl">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 h-6 w-24 -translate-x-1/2 rounded-b-xl bg-foreground/90" />
        
        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2rem] bg-background">
          {/* WhatsApp Header */}
          <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-secondary-foreground">
              SS
            </div>
            <div>
              <p className="text-white text-sm font-medium">Salón Sofía</p>
              <p className="text-white/70 text-xs">en línea</p>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="bg-[#ECE5DD] p-3 min-h-[320px] sm:min-h-[380px] space-y-2">
            {/* Customer Message */}
            <div className="flex justify-end">
              <div className="bg-[#DCF8C6] rounded-lg px-3 py-2 max-w-[200px] shadow-sm">
                <p className="text-foreground text-sm">Hola! Quiero sacar turno para mañana</p>
                <p className="text-muted-foreground text-[10px] text-right mt-1">14:32</p>
              </div>
            </div>
            
            {/* Bot Response */}
            <div className="flex justify-start">
              <div className="bg-white rounded-lg px-3 py-2 max-w-[220px] shadow-sm">
                <p className="text-foreground text-sm">¡Hola! Gracias por contactarnos 💅</p>
                <p className="text-foreground text-sm mt-1">Tenemos disponibles estos horarios para mañana:</p>
                <p className="text-foreground text-sm mt-1">• 10:00 - Manicura<br/>• 14:00 - Pedicura<br/>• 16:30 - Uñas gel</p>
                <p className="text-foreground text-sm mt-1">¿Cuál preferís?</p>
                <p className="text-muted-foreground text-[10px] text-right mt-1">14:32</p>
              </div>
            </div>
            
            {/* Typing indicator */}
            <div className="flex justify-end">
              <div className="bg-[#DCF8C6] rounded-lg px-3 py-2 max-w-[200px] shadow-sm">
                <p className="text-foreground text-sm">El de las 16:30 por favor!</p>
                <p className="text-muted-foreground text-[10px] text-right mt-1">14:33</p>
              </div>
            </div>
            
            {/* Bot Confirmation */}
            <div className="flex justify-start">
              <div className="bg-white rounded-lg px-3 py-2 max-w-[220px] shadow-sm">
                <p className="text-foreground text-sm">¡Perfecto! Turno confirmado para mañana a las 16:30 - Uñas gel ✨</p>
                <p className="text-foreground text-sm mt-1">Te esperamos!</p>
                <p className="text-muted-foreground text-[10px] text-right mt-1">14:33</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute -right-4 top-20 h-20 w-20 rounded-full bg-primary/20 blur-2xl" />
      <div className="absolute -left-4 bottom-20 h-16 w-16 rounded-full bg-primary/10 blur-xl" />
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
              Tu negocio atiende solo
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              Automatizá las respuestas de WhatsApp, Instagram y Telegram. Sin contratar a nadie. Sin perder clientes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                Empezar gratis
              </Button>
              <Button size="lg" variant="outline" className="border-foreground/20 text-foreground hover:bg-foreground/5 px-8">
                Ver demo
              </Button>
            </div>
          </div>
          
          {/* Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <PhoneMockup />
          </div>
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>
    </section>
  )
}
