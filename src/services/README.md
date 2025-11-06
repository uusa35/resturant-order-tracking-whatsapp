# Services Layer

This directory contains all business logic and data operations.

## Structure

Each entity should have its own service file:
- `orders.service.ts` - Order management operations
- `customers.service.ts` - Customer management operations
- `menu.service.ts` - Menu and inventory operations
- `whatsapp.service.ts` - WhatsApp integration logic
- `analytics.service.ts` - Analytics and reporting calculations

## Pattern

```typescript
export class EntityService {
  private static STORAGE_KEY = 'entity-key'

  static async getAll(): Promise<Entity[]> { }
  static async getById(id: string): Promise<Entity | null> { }
  static async create(data: Omit<Entity, 'id'>): Promise<Entity> { }
  static async update(id: string, updates: Partial<Entity>): Promise<Entity> { }
  static async delete(id: string): Promise<void> { }

  // Business logic methods
  static async customOperation(): Promise<void> { }
}
```

## Rules

- All localStorage operations must go through services
- Services use static methods
- Return typed data
- Handle errors appropriately
- Keep business logic here, not in components
