/**
 * Example Zustand store with localStorage persistence
 * This demonstrates the complete pattern for creating stores in this project
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

/**
 * Example entity type
 */
interface ExampleEntity {
  id: string
  name: string
  value: number
  createdAt: string
}

/**
 * Store state interface
 */
interface ExampleState {
  // Data
  items: ExampleEntity[]
  selectedItem: ExampleEntity | null

  // UI State
  isLoading: boolean
  error: string | null

  // Actions - Data operations
  fetchAll: () => Promise<void>
  getById: (id: string) => ExampleEntity | null
  create: (name: string, value: number) => Promise<ExampleEntity>
  update: (id: string, updates: Partial<ExampleEntity>) => Promise<ExampleEntity>
  delete: (id: string) => Promise<void>

  // Actions - UI operations
  setSelected: (item: ExampleEntity | null) => void
  clearError: () => void
  reset: () => void
}

/**
 * Initial state
 */
const initialState = {
  items: [],
  selectedItem: null,
  isLoading: false,
  error: null,
}

/**
 * Example store with full CRUD operations and persistence
 */
export const useExampleStore = create<ExampleState>()(
  persist(
    (set, get) => ({
      // Initial state
      ...initialState,

      // Fetch all items
      fetchAll: async () => {
        set({ isLoading: true, error: null })
        try {
          // Simulate async operation
          await new Promise((resolve) => setTimeout(resolve, 100))
          // In real implementation, would call a service
          set({ isLoading: false })
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
        }
      },

      // Get single item by ID
      getById: (id: string) => {
        return get().items.find((item) => item.id === id) ?? null
      },

      // Create new item
      create: async (name: string, value: number) => {
        set({ isLoading: true, error: null })
        try {
          const newItem: ExampleEntity = {
            id: crypto.randomUUID(),
            name,
            value,
            createdAt: new Date().toISOString(),
          }

          set((state) => ({
            items: [...state.items, newItem],
            isLoading: false,
          }))

          return newItem
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
          throw error
        }
      },

      // Update existing item
      update: async (id: string, updates: Partial<ExampleEntity>) => {
        set({ isLoading: true, error: null })
        try {
          const items = get().items
          const index = items.findIndex((item) => item.id === id)

          if (index === -1) {
            throw new Error(`Item with id ${id} not found`)
          }

          const updatedItem = { ...items[index], ...updates }

          set((state) => ({
            items: state.items.map((item) =>
              item.id === id ? updatedItem : item
            ),
            isLoading: false,
          }))

          return updatedItem
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
          throw error
        }
      },

      // Delete item
      delete: async (id: string) => {
        set({ isLoading: true, error: null })
        try {
          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
            selectedItem:
              state.selectedItem?.id === id ? null : state.selectedItem,
            isLoading: false,
          }))
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
          throw error
        }
      },

      // Set selected item
      setSelected: (item) => set({ selectedItem: item }),

      // Clear error
      clearError: () => set({ error: null }),

      // Reset to initial state
      reset: () => set(initialState),
    }),
    {
      name: 'example-store', // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Partialize to exclude temporary state
      partialize: (state) => ({
        items: state.items,
        selectedItem: state.selectedItem,
        // Don't persist loading/error states
      }),
    }
  )
)

