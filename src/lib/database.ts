/**
 * localStorage Database Abstraction Layer
 * Provides a structured database-like interface for localStorage
 */

import { getItem, setItem, removeItem, clear, StorageError } from './storage'

/**
 * Database schema version for migrations
 */
const DB_VERSION = 1
const DB_VERSION_KEY = '__db_version__'

/**
 * Database collection names (localStorage keys)
 */
export const Collections = {
  ORDERS: 'orders',
  CUSTOMERS: 'customers',
  MENU_ITEMS: 'menu_items',
  MENU_CATEGORIES: 'menu_categories',
  WHATSAPP_MESSAGES: 'whatsapp_messages',
  SETTINGS: 'settings',
} as const

export type CollectionName = (typeof Collections)[keyof typeof Collections]

/**
 * Base entity interface - all entities should extend this
 */
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

/**
 * Database statistics
 */
export interface DatabaseStats {
  version: number
  collections: Record<string, number>
  totalSize: number
  sizeByCollection: Record<string, number>
}

/**
 * Database class - provides CRUD operations for collections
 */
export class Database {
  /**
   * Initialize database with default data if empty
   */
  static async initialize(): Promise<void> {
    try {
      // Check if database is already initialized
      const version = getItem<number>(DB_VERSION_KEY)

      if (version === null) {
        console.log('🗄️ Initializing database...')

        // Create empty collections
        Object.values(Collections).forEach((collection) => {
          if (getItem(collection) === null) {
            setItem(collection, [])
          }
        })

        // Set database version
        setItem(DB_VERSION_KEY, DB_VERSION)

        console.log('✅ Database initialized successfully')
      } else if (version < DB_VERSION) {
        console.log(`🔄 Migrating database from v${version} to v${DB_VERSION}...`)
        await this.migrate(version, DB_VERSION)
        console.log('✅ Database migration completed')
      }
    } catch (error) {
      console.error('❌ Database initialization failed:', error)
      throw new StorageError('Failed to initialize database', error)
    }
  }

  /**
   * Get all items from a collection
   */
  static async getAll<T extends BaseEntity>(
    collection: CollectionName
  ): Promise<T[]> {
    try {
      return getItem<T[]>(collection) ?? []
    } catch (error) {
      throw new StorageError(
        `Failed to get items from collection: ${collection}`,
        error
      )
    }
  }

  /**
   * Get single item by ID
   */
  static async getById<T extends BaseEntity>(
    collection: CollectionName,
    id: string
  ): Promise<T | null> {
    const items = await this.getAll<T>(collection)
    return items.find((item) => item.id === id) ?? null
  }

  /**
   * Query collection with filter function
   */
  static async query<T extends BaseEntity>(
    collection: CollectionName,
    predicate: (item: T) => boolean
  ): Promise<T[]> {
    const items = await this.getAll<T>(collection)
    return items.filter(predicate)
  }

  /**
   * Insert new item into collection
   */
  static async insert<T extends BaseEntity>(
    collection: CollectionName,
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<T> {
    try {
      const items = await this.getAll<T>(collection)

      const newItem: T = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as T

      items.push(newItem)
      setItem(collection, items)

      return newItem
    } catch (error) {
      throw new StorageError(
        `Failed to insert item into collection: ${collection}`,
        error
      )
    }
  }

  /**
   * Insert multiple items into collection
   */
  static async insertMany<T extends BaseEntity>(
    collection: CollectionName,
    dataArray: Omit<T, 'id' | 'createdAt' | 'updatedAt'>[]
  ): Promise<T[]> {
    try {
      const items = await this.getAll<T>(collection)
      const now = new Date().toISOString()

      const newItems: T[] = dataArray.map((data) => ({
        ...data,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      })) as T[]

      items.push(...newItems)
      setItem(collection, items)

      return newItems
    } catch (error) {
      throw new StorageError(
        `Failed to insert items into collection: ${collection}`,
        error
      )
    }
  }

  /**
   * Update item by ID
   */
  static async update<T extends BaseEntity>(
    collection: CollectionName,
    id: string,
    updates: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<T> {
    try {
      const items = await this.getAll<T>(collection)
      const index = items.findIndex((item) => item.id === id)

      if (index === -1) {
        throw new Error(`Item with id ${id} not found in ${collection}`)
      }

      items[index] = {
        ...items[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      }

      setItem(collection, items)
      return items[index]
    } catch (error) {
      throw new StorageError(
        `Failed to update item in collection: ${collection}`,
        error
      )
    }
  }

  /**
   * Delete item by ID
   */
  static async delete(
    collection: CollectionName,
    id: string
  ): Promise<void> {
    try {
      const items = await this.getAll(collection)
      const filtered = items.filter((item) => item.id !== id)

      if (filtered.length === items.length) {
        throw new Error(`Item with id ${id} not found in ${collection}`)
      }

      setItem(collection, filtered)
    } catch (error) {
      throw new StorageError(
        `Failed to delete item from collection: ${collection}`,
        error
      )
    }
  }

  /**
   * Delete multiple items by IDs
   */
  static async deleteMany(
    collection: CollectionName,
    ids: string[]
  ): Promise<void> {
    try {
      const items = await this.getAll(collection)
      const filtered = items.filter((item) => !ids.includes(item.id))
      setItem(collection, filtered)
    } catch (error) {
      throw new StorageError(
        `Failed to delete items from collection: ${collection}`,
        error
      )
    }
  }

  /**
   * Clear all items from a collection
   */
  static async clearCollection(collection: CollectionName): Promise<void> {
    try {
      setItem(collection, [])
    } catch (error) {
      throw new StorageError(
        `Failed to clear collection: ${collection}`,
        error
      )
    }
  }

  /**
   * Count items in collection
   */
  static async count(collection: CollectionName): Promise<number> {
    const items = await this.getAll(collection)
    return items.length
  }

  /**
   * Check if item exists
   */
  static async exists(collection: CollectionName, id: string): Promise<boolean> {
    const item = await this.getById(collection, id)
    return item !== null
  }

  /**
   * Get database statistics
   */
  static async getStats(): Promise<DatabaseStats> {
    const collections: Record<string, number> = {}
    const sizeByCollection: Record<string, number> = {}
    let totalSize = 0

    for (const collection of Object.values(Collections)) {
      const items = await this.getAll(collection)
      const size = new Blob([JSON.stringify(items)]).size

      collections[collection] = items.length
      sizeByCollection[collection] = size
      totalSize += size
    }

    return {
      version: getItem<number>(DB_VERSION_KEY) ?? 0,
      collections,
      totalSize,
      sizeByCollection,
    }
  }

  /**
   * Export entire database as JSON
   */
  static async export(): Promise<string> {
    const data: Record<string, unknown> = {
      version: getItem(DB_VERSION_KEY),
    }

    for (const collection of Object.values(Collections)) {
      data[collection] = await this.getAll(collection)
    }

    return JSON.stringify(data, null, 2)
  }

  /**
   * Import database from JSON
   */
  static async import(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData)

      // Clear existing data
      await this.clearAll()

      // Import each collection
      for (const collection of Object.values(Collections)) {
        if (data[collection]) {
          setItem(collection, data[collection])
        }
      }

      // Set version
      if (data.version) {
        setItem(DB_VERSION_KEY, data.version)
      }

      console.log('✅ Database imported successfully')
    } catch (error) {
      throw new StorageError('Failed to import database', error)
    }
  }

  /**
   * Clear all data (use with caution!)
   */
  static async clearAll(): Promise<void> {
    try {
      clear('local')
      console.log('🗑️ Database cleared')
    } catch (error) {
      throw new StorageError('Failed to clear database', error)
    }
  }

  /**
   * Database migration handler
   */
  private static async migrate(fromVersion: number, toVersion: number): Promise<void> {
    // Add migration logic here when schema changes
    // For now, just update version
    setItem(DB_VERSION_KEY, toVersion)
  }

  /**
   * Seed database with sample data (for development/testing)
   */
  static async seed(): Promise<void> {
    console.log('🌱 Seeding database with sample data...')

    // Only seed if collections are empty
    const ordersCount = await this.count(Collections.ORDERS)
    if (ordersCount > 0) {
      console.log('ℹ️ Database already contains data, skipping seed')
      return
    }

    // Add seed data here based on your needs
    // Example:
    // await this.insertMany(Collections.ORDERS, sampleOrders)
    // await this.insertMany(Collections.CUSTOMERS, sampleCustomers)

    console.log('✅ Database seeded successfully')
  }
}

/**
 * Utility function to initialize database on app start
 */
export async function initializeDatabase(): Promise<void> {
  if (typeof window === 'undefined') {
    return // Skip on server-side
  }

  try {
    await Database.initialize()
  } catch (error) {
    console.error('Failed to initialize database:', error)
    // Don't throw - allow app to continue even if database fails
  }
}
