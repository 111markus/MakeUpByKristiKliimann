const API_BASE = (import.meta.env?.VITE_API_BASE_URL || '').replace(/\/$/, '')

function url(path) {
  if (!API_BASE) return path
  return `${API_BASE}${path}`
}

export async function getServices() {
  const res = await fetch(url('/api/services'))
  if (!res.ok) throw new Error(`Failed to load services: ${res.status}`)
  return res.json()
}

function getAdminToken() {
  return localStorage.getItem('ADMIN_TOKEN') || ''
}

export async function adminCreateService(payload) {
  const res = await fetch(url('/api/admin/services'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAdminToken()}`
    },
    body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error(`Failed to create service: ${res.status}`)
  return res.json()
}

export async function adminUpdateService(id, patch) {
  const res = await fetch(url(`/api/admin/services/${id}`), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAdminToken()}`
    },
    body: JSON.stringify(patch)
  })
  if (!res.ok) throw new Error(`Failed to update service: ${res.status}`)
  return res.json()
}

export async function adminDeleteService(id) {
  const res = await fetch(url(`/api/admin/services/${id}`), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getAdminToken()}`
    }
  })
  if (!res.ok && res.status !== 204) throw new Error(`Failed to delete service: ${res.status}`)
}
