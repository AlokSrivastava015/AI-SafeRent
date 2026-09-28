import { api } from './client'
export const createVisit = data => api('/api/visits', { method: 'POST', body: JSON.stringify(data) })
export const getOwnerVisits = () => api('/api/visits/owner')
export const updateVisit = (id, action, data) => api(`/api/visits/${id}/${action}`, { method: 'PATCH', body: data ? JSON.stringify(data) : undefined })
