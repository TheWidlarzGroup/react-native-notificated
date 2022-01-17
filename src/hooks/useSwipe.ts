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
  withSpring,
  useSharedValue,
  cancelAnimation,
  withTiming,
  AnimationCallback,
  useAnimatedStyle,
} from 'react-native-reanimated'
import type { CustomAnimationConfig } from '../types/animations'

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
  onTransitionInAnimationFinished?: () => void
  onTransitionOutAnimationFinished?: () => void
  onTransitionInAnimationNotFinished?: () => void
  onTransitionOutAnimationNotFinished?: () => void
  onSwipeSuccess?: () => void
  onSwipeFail?: () => void
  animationConfig: CustomAnimationConfig
}

const withAnimationCallbackJSThread = (
  finishedAnimationCallback?: () => void,
  notFinishedAnimationCallback?: () => void
): AnimationCallback => {
  const fcb = () => finishedAnimationCallback?.()
  const nfcb = () => notFinishedAnimationCallback?.()

  return (finished) => {
    'worklet'

    if (finished) {
      runOnJS(fcb)()
    } else {
      runOnJS(nfcb)()
    }
  }
}

/**
 * onTransitionInAnimationFinished - triggered when animation for in-transition ends.
 * onTransitionOutAnimationFinished - triggered when animation for out-transition ends.
 * onTransitionInAnimationNotFinished - triggered when animation for in-transition is cancelled.
 * onTransitionOutAnimationNotFinished - triggered when animation for out-transition is cancelled.
 * onSwipe(Success|Fail) - triggered when swipe is executed
 * onSwipeFail - triggered when swipe gesture invoked on a notification box DID NOT exceed set of defined thresholds
 * onSwipeSuccess - triggered when swipe gesture invoked on a notification box DID exceed set of defined thresholds
 * dismiss - used to trigger the transitionOut animation on a nitofication box. Resets DRAG. Sets transition type to `out`
 * preset - used to trigger the transitionIn animation on a notification box. Sets transition type to `in`
 */
export const useSwipe = ({
  config,
  onSwipeFail,
  onSwipeSuccess,
  onTransitionInAnimationFinished,
  onTransitionOutAnimationFinished,
  onTransitionInAnimationNotFinished,
  onTransitionOutAnimationNotFinished,
  animationConfig
}: Props) => {
  const { direction, distanceThreshold, velocityThreshold } = config
  const animationInConfig = animationConfig.animationConfigIn
  const animationOutConfig = animationConfig?.animationConfigOut

  const drag = useSharedValue(0)
  const progress = useSharedValue(0)
  const currentTransitionType = useSharedValue<'in' | 'out' | 'idle_active'>('in')

  const resetDrag = useCallback(() => {
    drag.value = withSpring(0, { mass: 0.2 })
  }, [drag])

  const onTransitionInAnimationFinishedWrapper = useCallback(() => {
    currentTransitionType.value = 'idle_active'

    onTransitionInAnimationFinished?.()
  }, [onTransitionInAnimationFinished])

  const onTransitionOutAnimationFinishedWrapper = useCallback(() => {
    currentTransitionType.value = 'in'

    onTransitionOutAnimationFinished?.()
  }, [onTransitionOutAnimationFinished])

  const onTransitionInAnimationNotFinishedWrapper = useCallback(() => {
    onTransitionInAnimationNotFinished?.()
  }, [onTransitionInAnimationNotFinished])

  const onTransitionOutAnimationNotFinishedWrapper = useCallback(() => {
    onTransitionOutAnimationNotFinished?.()
  }, [onTransitionOutAnimationNotFinished])

  // Function which triggers animation for TRANSITION IN
  // it also invokes callback after animation is completed
  const present = useCallback(() => {
    currentTransitionType.value = 'in'

    if (animationInConfig.type === 'spring') {
      progress.value = withSpring(
        1,
        animationInConfig.config,
        withAnimationCallbackJSThread(
          onTransitionInAnimationFinishedWrapper,
          onTransitionInAnimationNotFinishedWrapper
        )
      )
    } else {
      progress.value = withTiming(
        1,
        animationInConfig.config,
        withAnimationCallbackJSThread(
          onTransitionInAnimationFinishedWrapper,
          onTransitionInAnimationNotFinishedWrapper
        )
      )
    }
  }, [
    onTransitionInAnimationFinishedWrapper,
    animationInConfig,
    onTransitionInAnimationNotFinishedWrapper,
  ])

  const dismiss = useCallback(() => {
    currentTransitionType.value = 'out'
    resetDrag()

    const config = animationOutConfig || animationInConfig

    if (config.type === 'spring') {
      progress.value = withSpring(
        0,
        config.config,
        withAnimationCallbackJSThread(
          onTransitionOutAnimationFinishedWrapper,
          onTransitionOutAnimationNotFinishedWrapper
        )
      )
    } else {
      progress.value = withTiming(
        0,
        config.config,
        withAnimationCallbackJSThread(
          onTransitionOutAnimationFinishedWrapper,
          onTransitionOutAnimationNotFinishedWrapper
        )
      )
    }
  }, [
    onTransitionOutAnimationFinishedWrapper,
    resetDrag,
    animationInConfig,
    animationOutConfig,
    onTransitionOutAnimationNotFinishedWrapper,
  ])

  const cancelTransitionAnimation = useCallback(() => {
    cancelAnimation(progress)
  }, [])

  // Used to revoke transition (progress) value after canceling it with e.g. LongPressGestureHandler
  const revokeTransitionAnimation = useCallback(() => {
    if (currentTransitionType.value === 'out') {
      dismiss()
    } else {
      present()
    }
  }, [dismiss, present])

  const swipeSuccess = useCallback(() => {
    dismiss()
    onSwipeSuccess?.()
  }, [onSwipeSuccess, dismiss])

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
    onEnd: () => {
      runOnJS(resetDrag)()
    },
  })

  const dragStyles = useAnimatedStyle(() => {
    if (direction === 'x') {
      return {
        transform: [{ translateX: drag.value }],
      }
    }

    return {
      transform: [{ translateY: drag.value }],
    }
  })

  return {
    drag,
    present,
    dismiss,
    handleStateChange,
    handleGestureEvent,
    progress,
    currentTransitionType,
    cancelTransitionAnimation,
    revokeTransitionAnimation,
    dragStyles,
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

console.log(defaultValues)
