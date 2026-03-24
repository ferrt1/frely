const BACKEND_URL = "https://evoft.duckdns.org"

// Stats — public endpoint
export async function getStats() {
  const res = await fetch(`${BACKEND_URL}/api/stats`)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

// Auth — login
export async function login(phone: string, password: string) {
  const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, password }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Error de conexión" }))
    throw new Error(err.detail || "Credenciales incorrectas")
  }
  return res.json()
}

// Switch business
export async function switchBusiness(token: string, businessId: number) {
  const res = await fetch(`${BACKEND_URL}/api/auth/switch-business/${businessId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error("Error al cambiar negocio")
  return res.json()
}

// Dashboard — authenticated endpoints
async function fetchDashboard(path: string, token: string) {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export async function getDashboardOverview(token: string) {
  return fetchDashboard("/api/dashboard/overview", token)
}

export async function getMessagesWeekly(token: string) {
  return fetchDashboard("/api/dashboard/messages-weekly", token)
}

export async function getMessagesHourly(token: string) {
  return fetchDashboard("/api/dashboard/messages-hourly", token)
}

export async function getRecentConversations(token: string, limit = 5) {
  return fetchDashboard(`/api/dashboard/recent-conversations?limit=${limit}`, token)
}

export async function getChannels(token: string) {
  return fetchDashboard("/api/dashboard/channels", token)
}

export async function getConversationMessages(token: string, maskedPhone: string, limit = 50) {
  const encoded = encodeURIComponent(maskedPhone)
  return fetchDashboard(`/api/dashboard/conversations/${encoded}/messages?limit=${limit}`, token)
}
