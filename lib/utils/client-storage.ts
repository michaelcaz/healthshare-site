const isClient = typeof window !== 'undefined'

export function getClientStorage(key: string): any {
  if (!isClient) return null
  
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.warn(`Error reading from localStorage:`, error)
    return null
  }
}

export function setClientStorage(key: string, value: any): void {
  if (!isClient) return
  
  try {
    const serialized = JSON.stringify(value)
    window.localStorage.setItem(key, serialized)
  } catch (error) {
    console.warn(`Error writing to localStorage:`, error)
  }
}

export function removeClientStorage(key: string): void {
  if (!isClient) return
  
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.warn(`Error removing from localStorage:`, error)
  }
}

export function clearClientStorage(): void {
  if (!isClient) return
  
  try {
    window.localStorage.clear()
  } catch (error) {
    console.warn(`Error clearing localStorage:`, error)
  }
} 