import { useCallback } from 'react'
import {
  PanGestureHandlerEventPayload,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler'
import {
  Easing,
  runOnJS,
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

export type SwipeDirection = 'y' | 'x'

export interface SwipeConfig {
  direction: SwipeDirection
  initialOffset: number
  targetOffset: number
  distanceThreshold: number
  velocityThreshold: number
}

interface Props {
  config: SwipeConfig
  onSwipeIn?: () => void
  onSwipeBack?: () => void
  onSwipeSuccess?: () => void
  onSwipeFail?: () => void
}

const callbackJSThread = (callback?: () => void) => {
  const assignedCallback = () => callback?.()
  return () => {
    'worklet'
    runOnJS(assignedCallback)()
  }
}

/**
 * onSwipe(In|Back) - triggered when animations end.
 * onSwipe(Success|Fail) - triggered when swipe is executed
 */
export const useSwipe = ({
  config,
  onSwipeFail,
  onSwipeSuccess,
  onSwipeIn,
  onSwipeBack,
}: Props) => {
  const { direction, distanceThreshold, velocityThreshold, initialOffset, targetOffset } = config
  const distance = useSharedValue(initialOffset)
  const drag = useSharedValue(0)

  const resetDrag = useCallback(() => {
    drag.value = withSpring(0)
  }, [drag])

  const swipeIn = useCallback(() => {
    distance.value = withSpring(targetOffset, defaultValues.swipeIn, callbackJSThread(onSwipeIn))
  }, [distance, onSwipeIn, targetOffset])

  const swipeBack = useCallback(() => {
    resetDrag()
    distance.value = withTiming(
      initialOffset,
      defaultValues.swipeBack,
      callbackJSThread(onSwipeBack)
    )
  }, [distance, initialOffset, onSwipeBack, resetDrag])

  const swipeSuccess = useCallback(() => {
    swipeBack()
    onSwipeSuccess?.()
  }, [onSwipeSuccess, swipeBack])

  const swipeFail = useCallback(() => {
    resetDrag()
    onSwipeFail?.()
  }, [onSwipeFail, resetDrag])

  const handleStateChange = useCallback(
    ({ nativeEvent }: PanGestureHandlerGestureEvent) => {
      if (nativeEvent.state !== State.END) {
        return
      }

      const swipedEnough =
        Math.abs(nativeEvent[getEventKey(direction, 'translation')]) > distanceThreshold
      const enoughForce =
        Math.abs(nativeEvent[getEventKey(direction, 'velocity')]) > velocityThreshold

      const shouldSwipe = swipedEnough || enoughForce

      return shouldSwipe ? swipeSuccess() : swipeFail()
    },
    [direction, distanceThreshold, swipeFail, swipeSuccess, velocityThreshold]
  )

  const handleGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { drag: number }
  >({
    onStart: (_, ctx) => {
      ctx.drag = drag.value
    },
    onActive: (event, ctx) => {
      const translation = getEventKeyWorklet(direction, 'translation')
      drag.value = ctx.drag + event[translation]
    },
  })

  return {
    distance,
    drag,
    swipeIn,
    swipeBack,
    handleStateChange,
    handleGestureEvent,
  }
}

// This has to be cleaned up - it looks terrible
type DirectionLookup<T> = Record<SwipeDirection, T>
type EventKey = keyof PanGestureHandlerEventPayload
type MappedEventKey = 'translation' | 'velocity'
type EventKeyLookup = DirectionLookup<Record<string, EventKey>>

const directionsLookup: EventKeyLookup = {
  x: {
    translation: 'translationX',
    velocity: 'velocityX',
  },
  y: {
    translation: 'translationY',
    velocity: 'velocityY',
  },
} as const

const getEventKeyWorklet = (direction: SwipeDirection, key: MappedEventKey) => {
  'worklet'
  return directionsLookup[direction][key]
}

const getEventKey = (direction: SwipeDirection, key: MappedEventKey) =>
  directionsLookup[direction][key]

const defaultValues = {
  swipeIn: {
    damping: 15,
    stiffness: 120,
  },
  swipeBack: {
    duration: 100,
    easing: Easing.ease,
  },
}
