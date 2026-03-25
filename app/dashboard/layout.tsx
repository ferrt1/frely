"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Bell,
  Moon,
  Sun,
  Menu,
  X,
  Users,
  BookOpen,
  CreditCard,
  HelpCircle,
  ChevronsUpDown,
  Check,
  Store,
  Search,
  Globe,
  Zap,
  AlertTriangle,
  ShoppingCart,
  UserPlus,
  ArrowUpRight,
} from "lucide-react"
import { switchBusiness } from "@/lib/api"
import { GlobalSearch } from "@/components/global-search"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Conversaciones", href: "/dashboard/conversaciones", icon: MessageSquare },
  { label: "Contactos", href: "/dashboard/contactos", icon: Users },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Base de conocimiento", href: "/dashboard/conocimiento", icon: BookOpen },
  { label: "Facturación", href: "/dashboard/facturacion", icon: CreditCard },
  { label: "Configuración", href: "/dashboard/configuracion", icon: Settings },
]

const mockNotifications = [
  { id: 1, type: "escalation", icon: AlertTriangle, color: "text-yellow-500", title: "Conversación escalada", desc: "Franco necesita atención humana", time: "Hace 5 min", read: false },
  { id: 2, type: "sale", icon: ShoppingCart, color: "text-[#2ecc71]", title: "Nueva venta confirmada", desc: "Corte de pelo agendado por Romeo Santos", time: "Hace 12 min", read: false },
  { id: 3, type: "contact", icon: UserPlus, color: "text-blue-500", title: "Nuevo contacto", desc: "María García se registró via WhatsApp", time: "Hace 30 min", read: false },
  { id: 4, type: "escalation", icon: AlertTriangle, color: "text-yellow-500", title: "Reclamo detectado", desc: "Nahu expresó insatisfacción", time: "Hace 1 hora", read: true },
  { id: 5, type: "bot", icon: Zap, color: "text-purple-500", title: "Bot actualizado", desc: "Se aplicaron nuevas instrucciones al asistente", time: "Hace 2 horas", read: true },
]

function FrelyLogoSmall({ collapsed }: { collapsed: boolean }) {
  return (
    <Link href="/dashboard" className="flex items-center gap-0.5 group">
      {!collapsed ? (
        <>
          <span className="text-xl font-semibold text-foreground tracking-tight">frely</span>
          <svg width="14" height="12" viewBox="0 0 16 14" fill="none" className="-mt-2.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true">
            <rect x="0" y="0" width="13" height="9" rx="2" fill="#2ecc71" />
            <polygon points="2.5,9 5.5,9 2.5,12.5" fill="#2ecc71" />
          </svg>
        </>
      ) : (
        <span className="text-xl font-semibold text-foreground tracking-tight">f</span>
      )}
    </Link>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("frely_darkmode") === "true"
    }
    return false
  })
  const [user, setUser] = useState({ name: "", email: "", plan: "Pro", initials: "" })
  const [businesses, setBusinesses] = useState<{ id: number; name: string; slug: string }[]>([])
  const [currentBusinessId, setCurrentBusinessId] = useState<number | null>(null)
  const [switching, setSwitching] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [locale, setLocale] = useState<"es" | "en">("es")
  const [botOnline, setBotOnline] = useState(true)

  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    const session = localStorage.getItem("frely_session")
    if (!session) {
      router.push("/login")
      return
    }
    try {
      const parsed = JSON.parse(session)
      const name = parsed.current_business?.name || parsed.name || ""
      setUser({
        name,
        email: parsed.email || "",
        plan: parsed.plan || "Pro",
        initials: name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
      })
      setBusinesses(parsed.businesses || [])
      setCurrentBusinessId(parsed.current_business?.id || null)
    } catch {
      router.push("/login")
    }
    const savedLocale = localStorage.getItem("frely_locale") as "es" | "en" | null
    if (savedLocale) setLocale(savedLocale)
  }, [router])

  const handleSwitchBusiness = async (businessId: number) => {
    const session = localStorage.getItem("frely_session")
    if (!session) return
    const parsed = JSON.parse(session)
    setSwitching(true)
    try {
      const data = await switchBusiness(parsed.token, businessId)
      const updated = {
        ...parsed,
        token: data.token,
        current_business: data.current_business,
        name: data.current_business.name,
        initials: data.current_business.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
      }
      localStorage.setItem("frely_session", JSON.stringify(updated))
      window.location.reload()
    } catch {
      // silently fail
    } finally {
      setSwitching(false)
    }
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const toggleDark = () => {
    const next = !darkMode
    setDarkMode(next)
    localStorage.setItem("frely_darkmode", String(next))
  }

  const toggleLocale = () => {
    const next = locale === "es" ? "en" : "es"
    setLocale(next)
    localStorage.setItem("frely_locale", next)
  }

  const handleLogout = () => {
    localStorage.removeItem("frely_session")
    router.push("/login")
  }

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const [dateStr, setDateStr] = useState("")

  useEffect(() => {
    const loc = locale === "es" ? "es-AR" : "en-US"
    setDateStr(new Date().toLocaleDateString(loc, { weekday: "long", year: "numeric", month: "long", day: "numeric" }))
  }, [locale])

  const currentPage = navItems.find((item) => pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href)))

  const t = {
    es: { search: "Buscar...", help: "Ayuda y soporte", upgrade: "Upgrade", messages: "mensajes", profile: "Mi perfil", config: "Configuración", billing: "Facturación", logout: "Cerrar sesión", notifications: "Notificaciones", markAllRead: "Marcar todo leído", noNotifications: "No hay notificaciones nuevas", botOnline: "Bot activo", botOffline: "Bot pausado" },
    en: { search: "Search...", help: "Help & support", upgrade: "Upgrade", messages: "messages", profile: "My profile", config: "Settings", billing: "Billing", logout: "Log out", notifications: "Notifications", markAllRead: "Mark all read", noNotifications: "No new notifications", botOnline: "Bot online", botOffline: "Bot paused" },
  }[locale]

  return (
    <div className="min-h-screen flex bg-muted/30">
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full bg-background border-r border-border z-50 flex flex-col transition-all duration-300",
        collapsed ? "w-[68px]" : "w-64",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className={cn("h-16 flex items-center border-b border-border px-4", collapsed && "justify-center")}>
          <FrelyLogoSmall collapsed={collapsed} />
        </div>

        {/* Business Switcher */}
        {businesses.length > 1 && !collapsed && (
          <div className="px-3 pt-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 w-full rounded-lg border border-border px-3 py-2 hover:bg-muted transition-colors text-left" disabled={switching}>
                  <Store className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm font-medium truncate flex-1">{user.name}</span>
                  <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {businesses.map((biz) => (
                  <DropdownMenuItem
                    key={biz.id}
                    onClick={() => handleSwitchBusiness(biz.id)}
                    className="flex items-center justify-between"
                  >
                    <span>{biz.name}</span>
                    {biz.id === currentBusinessId && <Check className="h-4 w-4 text-[#2ecc71]" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Bot Status */}
        {!collapsed && (
          <div className="px-3 pt-3">
            <button
              onClick={() => setBotOnline(!botOnline)}
              className={cn(
                "flex items-center gap-2 w-full rounded-lg px-3 py-2 text-left transition-colors border",
                botOnline
                  ? "border-[#2ecc71]/30 bg-[#2ecc71]/5 hover:bg-[#2ecc71]/10"
                  : "border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/10"
              )}
            >
              <div className="relative">
                <Zap className={cn("h-4 w-4", botOnline ? "text-[#2ecc71]" : "text-yellow-500")} />
                <span className={cn(
                  "absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full border border-background",
                  botOnline ? "bg-[#2ecc71] animate-pulse" : "bg-yellow-500"
                )} />
              </div>
              <span className={cn("text-xs font-medium", botOnline ? "text-[#2ecc71]" : "text-yellow-500")}>
                {botOnline ? t.botOnline : t.botOffline}
              </span>
            </button>
          </div>
        )}

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  collapsed && "justify-center px-2"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="h-[18px] w-[18px] shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Help */}
        {!collapsed && (
          <div className="px-3 pb-2">
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors w-full">
              <HelpCircle className="h-[18px] w-[18px] shrink-0" />
              <span>{t.help}</span>
            </button>
          </div>
        )}

        {/* Plan Badge */}
        {!collapsed && (
          <div className="px-3 pb-3">
            <div className="rounded-lg bg-gradient-to-r from-[#2ecc71]/10 to-[#25D366]/10 border border-[#2ecc71]/20 p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-[#2ecc71]">Plan {user.plan}</span>
                <Link href="/dashboard/facturacion" className="text-[10px] text-[#2ecc71] hover:underline">{t.upgrade}</Link>
              </div>
              <p className="text-xs text-muted-foreground">1,247 / 5,000 {t.messages}</p>
              <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-[#2ecc71] rounded-full transition-all" style={{ width: "25%" }} />
              </div>
            </div>
          </div>
        )}

        {/* User */}
        <div className={cn("border-t border-border p-3", collapsed && "flex justify-center")}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={cn(
                "flex items-center gap-3 w-full rounded-lg p-2 hover:bg-muted transition-colors text-left",
                collapsed && "justify-center w-auto"
              )}>
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-foreground text-background text-xs font-semibold">{user.initials}</AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild><Link href="/dashboard/perfil"><User className="h-4 w-4 mr-2" />{t.profile}</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/dashboard/configuracion"><Settings className="h-4 w-4 mr-2" />{t.config}</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/dashboard/facturacion"><CreditCard className="h-4 w-4 mr-2" />{t.billing}</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={handleLogout}><LogOut className="h-4 w-4 mr-2" />{t.logout}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground shadow-sm transition-colors"
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </aside>

      {/* Main */}
      <main className={cn("flex-1 min-w-0 w-full transition-all duration-300", collapsed ? "lg:ml-[68px]" : "lg:ml-64")}>
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-3 sm:px-4 lg:px-6">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors shrink-0" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="min-w-0">
              <h1 className="text-sm font-semibold truncate">{currentPage?.label || "Dashboard"}</h1>
              {dateStr && <p className="text-xs text-muted-foreground hidden sm:block">{dateStr}</p>}
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {/* Global Search Trigger */}
            <div className="hidden sm:block">
              <GlobalSearch />
            </div>

            {/* Language Toggle */}
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={toggleLocale} title={locale === "es" ? "Switch to English" : "Cambiar a Español"}>
              <Globe className="h-4 w-4" />
            </Button>

            {/* Dark Mode */}
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={toggleDark}>
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 relative">
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 h-4 w-4 rounded-full bg-[#2ecc71] text-[9px] font-bold text-white flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-[calc(100vw-2rem)] sm:w-80 p-0">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <h3 className="text-sm font-semibold">{t.notifications}</h3>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-[11px] text-[#2ecc71] hover:underline">
                      {t.markAllRead}
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">{t.noNotifications}</p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={cn(
                          "flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border last:border-0",
                          !n.read && "bg-muted/30"
                        )}
                      >
                        <div className={cn("mt-0.5 h-8 w-8 rounded-full flex items-center justify-center shrink-0", !n.read ? "bg-muted" : "bg-transparent")}>
                          <n.icon className={cn("h-4 w-4", n.color)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className={cn("text-xs font-medium truncate", !n.read && "font-semibold")}>{n.title}</p>
                            {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-[#2ecc71] shrink-0" />}
                          </div>
                          <p className="text-[11px] text-muted-foreground truncate">{n.desc}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="border-t border-border px-4 py-2">
                  <Link href="/dashboard/configuracion" className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                    <span>{locale === "es" ? "Configurar notificaciones" : "Notification settings"}</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </PopoverContent>
            </Popover>

            <Avatar className="h-8 w-8 lg:hidden">
              <AvatarFallback className="bg-foreground text-background text-xs font-semibold">{user.initials}</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="p-3 sm:p-4 lg:p-6 w-full max-w-full overflow-x-hidden"
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}
