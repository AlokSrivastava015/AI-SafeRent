import { api } from './client'
export const getFavorites = () => api('/api/favorites')
export const saveFavorite = id => api(`/api/favorites/${id}`, { method: 'POST' })
export const removeFavorite = id => api(`/api/favorites/${id}`, { method: 'DELETE' })
