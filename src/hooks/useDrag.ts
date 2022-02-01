import { useCallback } from 'react'
import type { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import type { DragDirection } from '../types/animations'

export const useDrag = (direction: DragDirection) => {
  const x = useSharedValue(0)
  const y = useSharedValue(0)
  const directions = getDragDirections(direction)

  const resetDrag = useCallback(() => {
    x.value = withSpring(0, { mass: 0.2 })
    y.value = withSpring(0, { mass: 0.2 })
  }, [x, y])

  const dragGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = x.value
      ctx.y = y.value
    },
    onActive: ({ translationX, translationY }, ctx) => {
      x.value = ctx.x + translationX * directions.x
      y.value = ctx.y + translationY * directions.y
    },
    onEnd: () => {
      x.value = withSpring(0, { mass: 0.2 })
      y.value = withSpring(0, { mass: 0.2 })
    },
  })

  const dragStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }))

  return { x, y, dragGestureHandler, dragStyles, resetDrag }
}

const getDragDirections = (direction: DragDirection) => {
  switch (direction) {
    case 'full':
      return { x: 1, y: 1 }
    case 'x':
      return { x: 1, y: 0 }
    case 'y':
      return { x: 0, y: 1 }
    case 'none':
      return { x: 0, y: 0 }
    // What should be correct default value? => Platform specific?
    default:
      return { x: 0, y: 0 }
  }
}
