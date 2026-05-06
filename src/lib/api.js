const API_BASE = String(import.meta.env?.VITE_API_BASE_URL || '')
  .trim()
  .replace(/\/$/, '')

function url(path) {
  const p = String(path || '')
  if (!p.startsWith('/')) throw new Error(`Invalid API path: ${p}`)

  // Allow passing a full URL as VITE_API_BASE_URL (e.g. https://...)
  // or leaving it empty for same-origin.
  if (!API_BASE) return p

  // Ensure API_BASE itself is a valid absolute URL.
  // new URL() will throw with "The string did not match the expected pattern." if invalid.
  const base = new URL(API_BASE)
  return new URL(p, base).toString()
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

export async function getCategoryDetails() {
  const res = await fetch(url('/api/categories'), { credentials: 'include' })
  if (!res.ok) throw new Error(`Failed to load categories: ${res.status}`)
  return res.json()
}

export async function getHomeServices() {
  const res = await fetch(url('/api/home-services'), { credentials: 'include' })
  if (!res.ok) throw new Error(`Failed to load home services: ${res.status}`)
  return res.json()
}

export async function adminReorderServices(items) {
  const res = await fetch(url('/api/admin/services/reorder'), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ items })
  })
  if (!res.ok) throw new Error(`Failed to reorder services: ${res.status}`)
  return res.json()
}

export async function adminGetCategories() {
  const res = await fetch(url('/api/admin/categories'), { credentials: 'include' })
  if (!res.ok) throw new Error(`Failed to load categories: ${res.status}`)
  return res.json()
}

export async function adminGetCategoryDetails() {
  const res = await fetch(url('/api/admin/category-details'), { credentials: 'include' })
  if (!res.ok) throw new Error(`Failed to load category details: ${res.status}`)
  return res.json()
}

export async function adminCreateCategory(name) {
  const res = await fetch(url('/api/admin/categories'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ name })
  })
  if (!res.ok) throw new Error(`Failed to create category: ${res.status}`)
  return res.json()
}

export async function adminDeleteCategory(name) {
  const res = await fetch(url(`/api/admin/categories/${encodeURIComponent(name)}`), {
    method: 'DELETE',
    credentials: 'include'
  })
  if (!res.ok && res.status !== 204) throw new Error(`Failed to delete category: ${res.status}`)
}

export async function adminUpdateCategoryNote(name, note) {
  const res = await fetch(url(`/api/admin/categories/${encodeURIComponent(name)}/note`), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ note })
  })
  if (!res.ok) throw new Error(`Failed to update category note: ${res.status}`)
  return res.json()
}

export async function adminCreateHomeService(payload) {
  const res = await fetch(url('/api/admin/home-services'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error(`Failed to create home service: ${res.status}`)
  return res.json()
}

export async function adminUpdateHomeService(id, patch) {
  const res = await fetch(url(`/api/admin/home-services/${id}`), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(patch)
  })
  if (!res.ok) throw new Error(`Failed to update home service: ${res.status}`)
  return res.json()
}

export async function adminDeleteHomeService(id) {
  const res = await fetch(url(`/api/admin/home-services/${id}`), {
    method: 'DELETE',
    credentials: 'include'
  })
  if (!res.ok && res.status !== 204) throw new Error(`Failed to delete home service: ${res.status}`)
}
