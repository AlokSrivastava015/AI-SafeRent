import { api } from './client'
export const getNotifications = () => api('/api/notifications')
export const markNotificationRead = id => api(`/api/notifications/${id}/read`, { method: 'PATCH' })
