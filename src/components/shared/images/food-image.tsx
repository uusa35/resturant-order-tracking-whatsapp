/**
 * FoodImage Component
 * Displays food images with automatic fallback to beautiful placeholders
 * Uses Framer Motion for smooth transitions
 */

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export type FoodCategory =
  | 'pizza'
  | 'burger'
  | 'pasta'
  | 'salad'
  | 'dessert'
  | 'drinks'
  | 'sushi'
  | 'sandwich'
  | 'soup'
  | 'seafood'
  | 'chicken'
  | 'steak'
  | 'breakfast'
  | 'food' // Generic fallback

interface FoodImageProps {
  src?: string | null
  alt: string
  category?: FoodCategory
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
}

/**
 * Get placeholder image URL based on food category
 * Uses high-quality Unsplash images
 */
function getPlaceholderImage(category: FoodCategory = 'food'): string {
  const placeholders: Record<FoodCategory, string> = {
    pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop&auto=format',
    burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop&auto=format',
    pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop&auto=format',
    salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop&auto=format',
    dessert: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop&auto=format',
    drinks: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&h=600&fit=crop&auto=format',
    sushi: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop&auto=format',
    sandwich: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&h=600&fit=crop&auto=format',
    soup: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop&auto=format',
    seafood: 'https://images.unsplash.com/photo-1559737558-2f99b8ab6e1c?w=800&h=600&fit=crop&auto=format',
    chicken: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&h=600&fit=crop&auto=format',
    steak: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop&auto=format',
    breakfast: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=600&fit=crop&auto=format',
    food: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&auto=format',
  }

  return placeholders[category] || placeholders.food
}

/**
 * FoodImage component with automatic placeholder fallback
 *
 * @example
 * // Basic usage with fill
 * <div className="relative h-48 w-full">
 *   <FoodImage
 *     src={menuItem.imageUrl}
 *     alt={menuItem.name}
 *     category="pizza"
 *     fill
 *   />
 * </div>
 *
 * @example
 * // With specific dimensions
 * <FoodImage
 *   src={item.image}
 *   alt={item.name}
 *   category="burger"
 *   width={200}
 *   height={200}
 * />
 */
export function FoodImage({
  src,
  alt,
  category = 'food',
  className = '',
  fill = false,
  width,
  height,
  priority = false,
}: FoodImageProps) {
  const [imgError, setImgError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Determine which image to show
  const imageSrc = (!src || imgError)
    ? getPlaceholderImage(category)
    : src

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {fill ? (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onError={() => setImgError(true)}
          onLoad={() => setIsLoading(false)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
      ) : (
        <Image
          src={imageSrc}
          alt={alt}
          width={width || 400}
          height={height || 300}
          className={`object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onError={() => setImgError(true)}
          onLoad={() => setIsLoading(false)}
          priority={priority}
        />
      )}
    </motion.div>
  )
}

/**
 * FoodImage with loading skeleton
 * Shows a skeleton placeholder while image loads
 */
export function FoodImageWithSkeleton({
  src,
  alt,
  category = 'food',
  className = '',
}: Omit<FoodImageProps, 'fill' | 'width' | 'height'>) {
  const [isLoading, setIsLoading] = useState(true)
  const [imgError, setImgError] = useState(false)

  const imageSrc = (!src || imgError)
    ? getPlaceholderImage(category)
    : src

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover rounded-lg"
          onError={() => setImgError(true)}
          onLoadingComplete={() => setIsLoading(false)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>
    </div>
  )
}
