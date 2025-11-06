# Views Layer

Views are page-level components that orchestrate the UI.

## Structure

- `frontend/` - Customer-facing views
- `dashboard/` - Admin dashboard views

## Pattern

```typescript
'use client'

import { useEffect } from 'react'
import { useStore } from '@/stores/entity.store'
import { ComponentA } from '@/components/[domain]/component-a'
import { ComponentB } from '@/components/[domain]/component-b'

export function EntityView() {
  const { data, isLoading, error, fetchData } = useStore()

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (error) return <ErrorMessage message={error} />
  if (isLoading) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      <ComponentA data={data} />
      <ComponentB data={data} />
    </div>
  )
}
```

## Rules

- Views are client components (use hooks and state)
- One view per page/route
- Views compose smaller components
- Views connect to Zustand stores
- Views handle data fetching and loading states
- Pages should import and render views
