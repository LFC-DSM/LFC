import { apiRequest } from '../account/auth-api'
import { authenticatedRequest, getAuthSession } from '../account/auth-session'

export const customInstance = async <T>(url: string, options?: RequestInit): Promise<T> => {
  return getAuthSession() ? authenticatedRequest<T>(url, options) : apiRequest<T>(url, options)
}
