import { api } from './client'

// Supabase Auth owns credentials. Store only its short-lived access token after login.
export const setAccessToken = token => localStorage.setItem('supabase.access_token', token)
export const clearAccessToken = () => localStorage.removeItem('supabase.access_token')
export const login = async ({ email, password }) => {
  const result = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
  setAccessToken(result.session.access_token)
  return result
}
export const signUp = async ({ full_name, email, password, role }) => {
  const result = await api('/api/auth/signup', { method: 'POST', body: JSON.stringify({ full_name, email, password, role }) })
  if (result.session?.access_token) setAccessToken(result.session.access_token)
  return result
}
export const requestPasswordReset = email => api('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) })
