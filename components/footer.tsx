import { Instagram, Twitter, Linkedin } from "lucide-react"

function FrelyLogo() {
  return (
    <div className="flex items-center gap-0.5">
      <span className="text-xl font-semibold text-foreground tracking-tight">frely</span>
      <svg
        width="14"
        height="12"
        viewBox="0 0 16 14"
        fill="none"
        className="-mt-2.5"
        aria-hidden="true"
      >
        <rect x="0" y="0" width="13" height="9" rx="2" className="fill-accent" />
        <polygon points="2.5,9 5.5,9 2.5,12.5" className="fill-accent" />
      </svg>
    </div>
  )
}

const footerLinks = {
  producto: [
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Precios", href: "#precios" },
    { label: "Integraciones", href: "#" },
    { label: "API", href: "#" },
  ],
  empresa: [
    { label: "Nosotros", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Carreras", href: "#" },
    { label: "Contacto", href: "#contacto" },
  ],
  legal: [
    { label: "Privacidad", href: "#" },
    { label: "Terminos", href: "#" },
    { label: "Cookies", href: "#" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
]

export function Footer() {
  return (
    <footer id="contacto" className="bg-background border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <FrelyLogo />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Tu negocio atiende solo. Automatiza tus respuestas en WhatsApp, Instagram y Telegram.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-medium text-foreground">Producto</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.producto.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-foreground">Empresa</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-foreground">Legal</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Frely. Todos los derechos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Hecho con amor en Argentina
          </p>
        </div>
      </div>
    </footer>
  )
}
