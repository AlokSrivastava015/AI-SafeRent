const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function api(path, options = {}) {
  const token = localStorage.getItem('supabase.access_token')
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
  })
  if (response.status === 204) return null
  const body = await response.json().catch(() => ({ success: false, message: 'Unexpected server response' }))
  if (!response.ok) throw new Error(body.detail || body.message || 'Request failed')
  return body.data
}
