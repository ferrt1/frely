"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  MessageSquare,
  Users,
  LayoutDashboard,
  BarChart3,
  BookOpen,
  CreditCard,
  Settings,
  Webhook,
  Download,
  Palette,
  LogOut,
  FileText,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

const conversaciones = [
  { name: "Franco - WhatsApp", icon: MessageSquare },
  { name: "Nahu - WhatsApp", icon: MessageSquare },
  { name: "Fer - WhatsApp", icon: MessageSquare },
  { name: "Sofi - WhatsApp", icon: MessageSquare },
  { name: "Mati - WhatsApp", icon: MessageSquare },
]

const contactos = [
  { name: "Franco García", icon: Users },
  { name: "Nahuel López", icon: Users },
  { name: "Fernando Ruiz", icon: Users },
  { name: "Sofía Martínez", icon: Users },
  { name: "Matías Pérez", icon: Users },
]

const paginas = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Conversaciones", icon: MessageSquare, path: "/dashboard/conversaciones" },
  { name: "Contactos", icon: Users, path: "/dashboard/contactos" },
  { name: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
  { name: "Base de conocimiento", icon: BookOpen, path: "/dashboard/conocimiento" },
  { name: "Facturación", icon: CreditCard, path: "/dashboard/facturacion" },
  { name: "Configuración", icon: Settings, path: "/dashboard/configuracion" },
  { name: "Webhook Logs", icon: Webhook, path: "/dashboard/webhooks" },
]

const acciones = [
  { name: "Exportar conversaciones", icon: Download, action: "export" },
  { name: "Cambiar tema", icon: Palette, action: "toggle-theme" },
  { name: "Cerrar sesión", icon: LogOut, action: "logout" },
]

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSelect = React.useCallback(
    (callback: () => void) => {
      setOpen(false)
      callback()
    },
    [],
  )

  function handlePageSelect(path: string) {
    handleSelect(() => router.push(path))
  }

  function handleActionSelect(action: string) {
    handleSelect(() => {
      switch (action) {
        case "export": {
          // Placeholder for export functionality
          break
        }
        case "toggle-theme": {
          const isDark = document.documentElement.classList.toggle("dark")
          localStorage.setItem("frely_darkmode", isDark ? "true" : "false")
          break
        }
        case "logout": {
          localStorage.removeItem("frely_session")
          router.push("/login")
          break
        }
      }
    })
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Búsqueda global"
      description="Buscá conversaciones, contactos, páginas y acciones"
      showCloseButton={false}
    >
      <CommandInput placeholder="Buscar..." />
      <CommandList>
        <CommandEmpty>No se encontraron resultados.</CommandEmpty>

        <CommandGroup heading="Conversaciones">
          {conversaciones.map((item) => (
            <CommandItem
              key={item.name}
              onSelect={() => handlePageSelect("/dashboard/conversaciones")}
            >
              <item.icon />
              <span>{item.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Contactos">
          {contactos.map((item) => (
            <CommandItem
              key={item.name}
              onSelect={() => handlePageSelect("/dashboard/contactos")}
            >
              <item.icon />
              <span>{item.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Páginas">
          {paginas.map((item) => (
            <CommandItem
              key={item.name}
              onSelect={() => handlePageSelect(item.path)}
            >
              <item.icon />
              <span>{item.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Acciones">
          {acciones.map((item) => (
            <CommandItem
              key={item.name}
              onSelect={() => handleActionSelect(item.action)}
            >
              <item.icon />
              <span>{item.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
