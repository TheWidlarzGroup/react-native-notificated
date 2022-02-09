import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler'

export type SwipeDirection = 'y' | 'x'
export type SwipeConfig = {
  direction: SwipeDirection
  initialOffset: number
  targetOffset: number
  distanceThreshold: number
  velocityThreshold: number
}
type DirectionLookup<T> = Record<SwipeDirection, T>
type EventKey = keyof PanGestureHandlerEventPayload
export type MappedEventKey = 'translation' | 'velocity'
export type EventKeyLookup = DirectionLookup<Record<string, EventKey>>
