import { api } from './client'
export const getConversations = () => api('/api/conversations')
export const getMessages = id => api(`/api/conversations/${id}/messages`)
export const sendMessage = (id, data) => api(`/api/conversations/${id}/messages`, { method: 'POST', body: JSON.stringify(data) })
