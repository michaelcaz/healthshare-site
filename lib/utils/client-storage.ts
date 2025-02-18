const isClient = typeof window !== 'undefined'

type StorageType = 'local' | 'session'

export function getClientStorage(key: string, type: StorageType = 'local'): any {
  if (!isClient) return null
  
  try {
    const storage = type === 'local' ? window.localStorage : window.sessionStorage
    const item = storage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.warn(`Error reading from ${type}Storage:`, error)
    return null
  }
}

export function setClientStorage(key: string, value: any, type: StorageType = 'local'): void {
  if (!isClient) return
  
  try {
    const serialized = JSON.stringify(value)
    const storage = type === 'local' ? window.localStorage : window.sessionStorage
    storage.setItem(key, serialized)
  } catch (error) {
    console.warn(`Error writing to ${type}Storage:`, error)
  }
}

export function removeClientStorage(key: string, type: StorageType = 'local'): void {
  if (!isClient) return
  
  try {
    const storage = type === 'local' ? window.localStorage : window.sessionStorage
    storage.removeItem(key)
  } catch (error) {
    console.warn(`Error removing from ${type}Storage:`, error)
  }
}

export function clearClientStorage(type: StorageType = 'local'): void {
  if (!isClient) return
  
  try {
    const storage = type === 'local' ? window.localStorage : window.sessionStorage
    storage.clear()
  } catch (error) {
    console.warn(`Error clearing ${type}Storage:`, error)
  }
} 