const API_BASE = (import.meta.env?.VITE_API_BASE_URL || '').replace(/\/$/, '')

function url(path) {
  if (!API_BASE) return path
  return `${API_BASE}${path}`
}

export async function getServices() {
  const res = await fetch(url('/api/services'), { credentials: 'include' })
  if (!res.ok) throw new Error(`Failed to load services: ${res.status}`)
  return res.json()
}

export async function authMe() {
  const res = await fetch(url('/api/auth/me'), { credentials: 'include' })
  if (!res.ok) throw new Error(`Failed to load session: ${res.status}`)
  return res.json()
}

export async function authLogin({ username, password }) {
  const res = await fetch(url('/api/auth/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password })
  })
  if (!res.ok) throw new Error(`Login failed: ${res.status}`)
  return res.json()
}

export async function authLogout() {
  const res = await fetch(url('/api/auth/logout'), {
    method: 'POST',
    credentials: 'include'
  })
  if (!res.ok && res.status !== 204) throw new Error(`Logout failed: ${res.status}`)
}

export async function adminCreateService(payload) {
  const res = await fetch(url('/api/admin/services'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error(`Failed to create service: ${res.status}`)
  return res.json()
}

export async function adminUpdateService(id, patch) {
  const res = await fetch(url(`/api/admin/services/${id}`), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(patch)
  })
  if (!res.ok) throw new Error(`Failed to update service: ${res.status}`)
  return res.json()
}

export async function adminDeleteService(id) {
  const res = await fetch(url(`/api/admin/services/${id}`), {
    method: 'DELETE',
  credentials: 'include'
  })
  if (!res.ok && res.status !== 204) throw new Error(`Failed to delete service: ${res.status}`)
}
