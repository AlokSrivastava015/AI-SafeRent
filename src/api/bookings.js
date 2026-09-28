import { api } from './client'
export const createBooking = data => api('/api/bookings', { method: 'POST', body: JSON.stringify(data) })
export const getMyBookings = () => api('/api/bookings/my')
export const getOwnerBookings = () => api('/api/owner/bookings')
