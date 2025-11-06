/**
 * Example Zustand store with localStorage persistence
 * This demonstrates the pattern for creating stores in this project
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ExampleState {
  // State
  count: number
  name: string

  // Actions
  increment: () => void
  decrement: () => void
  setName: (name: string) => void
  reset: () => void
}

const initialState = {
  count: 0,
  name: 'Example',
}

export const useExampleStore = create<ExampleState>()(
  persist(
    (set) => ({
      ...initialState,

      // Actions
      increment: () => set((state) => ({ count: state.count + 1 })),

      decrement: () => set((state) => ({ count: state.count - 1 })),

      setName: (name: string) => set({ name }),

      reset: () => set(initialState),
    }),
    {
      name: 'example-store', // Storage key
      // Optional: custom storage
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
)
