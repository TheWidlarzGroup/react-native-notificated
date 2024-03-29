import { useCallback } from 'react'
import { PanGestureHandlerGestureEvent, State } from 'react-native-gesture-handler'
import {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import type { GestureConfig, DragDirection } from '../../types/gestures'
import { shouldTriggerGesture } from '../gestures/shouldTriggerGesture'

export const useDrag = (config: GestureConfig) => {
  const x = useSharedValue(0)
  const y = useSharedValue(0)
  const directions = getDragDirections(config.direction)

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

  const dragStateHandler = useCallback(
    (onDragSuccess: () => void, onDragFail: () => void) =>
      (event: PanGestureHandlerGestureEvent) => {
        const { nativeEvent } = event
        if (nativeEvent.state !== State.END) return event

        const dragTriggered = shouldTriggerGesture(config, {
          distance: [nativeEvent.translationX, nativeEvent.translationY],
          velocity: [nativeEvent.velocityX, nativeEvent.velocityY],
        })

        if (dragTriggered) onDragSuccess()
        else onDragFail()

        return event
      },
    [config]
  )

  const dragStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }))

  return { dragGestureHandler, dragStateHandler, dragStyles, resetDrag }
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
