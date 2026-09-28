import { api } from './client'
export const getProfile = () => api('/api/users/me')
export const updateProfile = data => api('/api/users/me', { method: 'PATCH', body: JSON.stringify(data) })
