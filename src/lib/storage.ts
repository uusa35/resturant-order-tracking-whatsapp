/**
 * Storage utilities for managing localStorage and sessionStorage
 * Provides type-safe storage operations with error handling
 */

export type StorageType = 'local' | 'session'

export class StorageError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message)
    this.name = 'StorageError'
  }
}

/**
 * Get storage instance based on type
 */
function getStorage(type: StorageType = 'local'): Storage {
  if (typeof window === 'undefined') {
    throw new StorageError('Storage is only available in browser environment')
  }
  return type === 'local' ? window.localStorage : window.sessionStorage
}

/**
 * Save data to storage
 * @param key - Storage key
 * @param value - Data to store (will be JSON stringified)
 * @param type - Storage type ('local' or 'session')
 */
export function setItem<T>(
  key: string,
  value: T,
  type: StorageType = 'local'
): void {
  try {
    const storage = getStorage(type)
    const serialized = JSON.stringify(value)
    storage.setItem(key, serialized)
  } catch (error) {
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      throw new StorageError('Storage quota exceeded', error)
    }
    throw new StorageError(`Failed to save item: ${key}`, error)
  }
}

/**
 * Retrieve data from storage
 * @param key - Storage key
 * @param type - Storage type ('local' or 'session')
 * @returns Parsed data or null if not found
 */
export function getItem<T>(
  key: string,
  type: StorageType = 'local'
): T | null {
  try {
    const storage = getStorage(type)
    const item = storage.getItem(key)

    if (item === null) {
      return null
    }

    return JSON.parse(item) as T
  } catch (error) {
    throw new StorageError(`Failed to retrieve item: ${key}`, error)
  }
}

/**
 * Remove item from storage
 * @param key - Storage key
 * @param type - Storage type ('local' or 'session')
 */
export function removeItem(key: string, type: StorageType = 'local'): void {
  try {
    const storage = getStorage(type)
    storage.removeItem(key)
  } catch (error) {
    throw new StorageError(`Failed to remove item: ${key}`, error)
  }
}

/**
 * Clear all items from storage
 * @param type - Storage type ('local' or 'session')
 */
export function clear(type: StorageType = 'local'): void {
  try {
    const storage = getStorage(type)
    storage.clear()
  } catch (error) {
    throw new StorageError('Failed to clear storage', error)
  }
}

/**
 * Get all keys from storage
 * @param type - Storage type ('local' or 'session')
 */
export function getAllKeys(type: StorageType = 'local'): string[] {
  try {
    const storage = getStorage(type)
    return Object.keys(storage)
  } catch (error) {
    throw new StorageError('Failed to get storage keys', error)
  }
}

/**
 * Check if a key exists in storage
 * @param key - Storage key
 * @param type - Storage type ('local' or 'session')
 */
export function hasItem(key: string, type: StorageType = 'local'): boolean {
  try {
    const storage = getStorage(type)
    return storage.getItem(key) !== null
  } catch (error) {
    throw new StorageError(`Failed to check item: ${key}`, error)
  }
}

/**
 * Get storage size in bytes (approximate)
 * @param type - Storage type ('local' or 'session')
 */
export function getStorageSize(type: StorageType = 'local'): number {
  try {
    const storage = getStorage(type)
    let size = 0

    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i)
      if (key) {
        const value = storage.getItem(key)
        if (value) {
          size += key.length + value.length
        }
      }
    }

    // Approximate size in bytes (assuming UTF-16 encoding)
    return size * 2
  } catch (error) {
    throw new StorageError('Failed to calculate storage size', error)
  }
}

/**
 * Check if storage is available and working
 * @param type - Storage type ('local' or 'session')
 */
export function isStorageAvailable(type: StorageType = 'local'): boolean {
  try {
    const storage = getStorage(type)
    const testKey = '__storage_test__'
    storage.setItem(testKey, 'test')
    storage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

/**
 * Storage helper with default values
 * @param key - Storage key
 * @param defaultValue - Default value if key doesn't exist
 * @param type - Storage type ('local' or 'session')
 */
export function getItemWithDefault<T>(
  key: string,
  defaultValue: T,
  type: StorageType = 'local'
): T {
  const value = getItem<T>(key, type)
  return value !== null ? value : defaultValue
}

/**
 * Update existing storage item (merge with existing data)
 * @param key - Storage key
 * @param updateFn - Function to update the existing value
 * @param type - Storage type ('local' or 'session')
 */
export function updateItem<T>(
  key: string,
  updateFn: (current: T | null) => T,
  type: StorageType = 'local'
): void {
  const current = getItem<T>(key, type)
  const updated = updateFn(current)
  setItem(key, updated, type)
}
