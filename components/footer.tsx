import { Instagram, Twitter, Linkedin } from "lucide-react"

function FrelyLogo() {
  return (
    <div className="flex items-center">
      <span className="text-2xl font-bold text-foreground tracking-tight">frely</span>
      <svg
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        className="-mt-3 -ml-0.5"
        aria-hidden="true"
      >
        <rect x="0" y="0" width="14" height="10" rx="2" fill="#2ecc71" />
        <polygon points="3,10 6,10 3,14" fill="#2ecc71" />
      </svg>
    </div>
  )
}

const footerLinks = {
  producto: [
    { label: "Cómo funciona", href: "#como-funciona" },
    { label: "Precios", href: "#precios" },
    { label: "Integraciones", href: "#" },
  ],
  empresa: [
    { label: "Nosotros", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contacto", href: "#contacto" },
  ],
  legal: [
    { label: "Privacidad", href: "#" },
    { label: "Términos", href: "#" },
  ],
}

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer id="contacto" className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <FrelyLogo />
            <p className="mt-4 text-muted-foreground max-w-xs">
              Tu negocio atiende solo. Automatizá tus respuestas en WhatsApp, Instagram y Telegram.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-foreground">Producto</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.producto.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Empresa</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Frely. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
