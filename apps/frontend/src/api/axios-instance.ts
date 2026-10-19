const BASE_URL = import.meta.env.VITE_API_URL

export const customInstance = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(`${BASE_URL}${url}`, options)
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return res.json() as Promise<T>
}
