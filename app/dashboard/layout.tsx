"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Conversaciones", href: "/dashboard/conversaciones", icon: MessageSquare },
  { label: "Contactos", href: "/dashboard/contactos", icon: Users },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Base de conocimiento", href: "/dashboard/conocimiento", icon: BookOpen },
  { label: "Facturación", href: "/dashboard/facturacion", icon: CreditCard },
  { label: "Configuración", href: "/dashboard/configuracion", icon: Settings },
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
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState({ name: "Café Avellaneda", email: "demo@frely.com.ar", plan: "Pro", initials: "CA" })

  useEffect(() => {
    const session = localStorage.getItem("frely_session")
    if (session) {
      try { setUser(JSON.parse(session)) } catch {}
    }
  }, [])

  const toggleDark = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleLogout = () => {
    localStorage.removeItem("frely_session")
    router.push("/login")
  }

  const currentPage = navItems.find((item) => pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href)))

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
              <span>Ayuda y soporte</span>
            </button>
          </div>
        )}

        {/* Plan Badge */}
        {!collapsed && (
          <div className="px-3 pb-3">
            <div className="rounded-lg bg-gradient-to-r from-[#2ecc71]/10 to-[#25D366]/10 border border-[#2ecc71]/20 p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-[#2ecc71]">Plan {user.plan}</span>
                <Link href="/dashboard/facturacion" className="text-[10px] text-[#2ecc71] hover:underline">Upgrade</Link>
              </div>
              <p className="text-xs text-muted-foreground">1,247 / 5,000 mensajes</p>
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
              <DropdownMenuItem><User className="h-4 w-4 mr-2" />Mi perfil</DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/dashboard/configuracion"><Settings className="h-4 w-4 mr-2" />Configuración</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/dashboard/facturacion"><CreditCard className="h-4 w-4 mr-2" />Facturación</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={handleLogout}><LogOut className="h-4 w-4 mr-2" />Cerrar sesión</DropdownMenuItem>
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
      <main className={cn("flex-1 transition-all duration-300", collapsed ? "lg:ml-[68px]" : "lg:ml-64")}>
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div>
              <h1 className="text-sm font-semibold">{currentPage?.label || "Dashboard"}</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {new Date().toLocaleDateString("es-AR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={toggleDark}>
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#2ecc71]" />
            </Button>
            <Avatar className="h-8 w-8 lg:hidden">
              <AvatarFallback className="bg-foreground text-background text-xs font-semibold">{user.initials}</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </div>
  )
}
