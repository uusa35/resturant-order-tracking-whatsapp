/**
 * Custom hook for using localStorage with React state
 * Provides a useState-like API with localStorage persistence
 */

'use client'

import { useState, useEffect } from 'react'
import { getItem, setItem, StorageError } from '@/lib/storage'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = getItem<T>(key)
      return item !== null ? item : initialValue
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value

      // Save state
      setStoredValue(valueToStore)

      // Save to local storage
      setItem(key, valueToStore)
    } catch (error) {
      if (error instanceof StorageError) {
        console.error(`Error saving ${key} to localStorage:`, error.message)
      } else {
        console.error(`Unexpected error saving ${key}:`, error)
      }
    }
  }

  // Reset to initial value
  const reset = () => {
    setValue(initialValue)
  }

  // Listen for changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch (error) {
          console.error(`Error parsing storage event for ${key}:`, error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return [storedValue, setValue, reset]
}
