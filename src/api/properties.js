import { api } from './client'
export const listProperties = (params = {}) => api(`/api/properties?${new URLSearchParams(params)}`)
export const searchProperties = (params = {}) => api(`/api/properties/search?${new URLSearchParams(params)}`)
export const getProperty = id => api(`/api/properties/${id}`)
export const createProperty = data => api('/api/properties', { method: 'POST', body: JSON.stringify(data) })
export const updateProperty = (id, data) => api(`/api/properties/${id}`, { method: 'PATCH', body: JSON.stringify(data) })
