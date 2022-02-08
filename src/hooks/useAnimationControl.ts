import { useCallback } from 'react'
import {
  PanGestureHandlerEventPayload,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler'
import {
  AnimationCallback,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import type { CustomAnimationConfig } from '../types/animations'
import { useDrag } from './useDrag'

export type SwipeDirection = 'y' | 'x'

export interface SwipeConfig {
  direction: SwipeDirection
  initialOffset: number
  targetOffset: number
  distanceThreshold: number
  velocityThreshold: number
}

interface Props {
  duration: number
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
 * dismiss - used to trigger the transitionOut animation on a notification box. Resets DRAG. Sets transition type to `out`
 * preset - used to trigger the transitionIn animation on a notification box. Sets transition type to `in`
 */
export const useAnimationControl = ({
  config,
  // duration,
  onSwipeFail,
  onSwipeSuccess,
  onTransitionInAnimationFinished,
  onTransitionOutAnimationFinished,
  onTransitionInAnimationNotFinished,
  onTransitionOutAnimationNotFinished,
  animationConfig,
}: Props) => {
  // const { resetTimer } = useTimer()
  const { direction, distanceThreshold, velocityThreshold } = config
  const animationInConfig = animationConfig.animationConfigIn
  const animationOutConfig = animationConfig?.animationConfigOut

  const dragConfig = useDrag(config.direction)
  const { resetDrag } = dragConfig
  const progress = useSharedValue(0)
  const currentTransitionType = useSharedValue<'in' | 'out' | 'idle_active'>('in')

  const onTransitionInAnimationFinishedWrapper = useCallback(() => {
    currentTransitionType.value = 'idle_active'

    onTransitionInAnimationFinished?.()
  }, [onTransitionInAnimationFinished, currentTransitionType])

  const onTransitionOutAnimationFinishedWrapper = useCallback(() => {
    currentTransitionType.value = 'in'

    onTransitionOutAnimationFinished?.()
  }, [onTransitionOutAnimationFinished, currentTransitionType])

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
    currentTransitionType,
    progress,
  ])

  const dismiss = useCallback(() => {
    currentTransitionType.value = 'out'
    resetDrag()

    const dismissConfig = animationOutConfig || animationInConfig

    if (dismissConfig.type === 'spring') {
      progress.value = withSpring(
        0,
        dismissConfig.config,
        withAnimationCallbackJSThread(
          onTransitionOutAnimationFinishedWrapper,
          onTransitionOutAnimationNotFinishedWrapper
        )
      )
    } else {
      progress.value = withTiming(
        0,
        dismissConfig.config,
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
    currentTransitionType,
    progress,
  ])

  const cancelTransitionAnimation = useCallback(() => {
    cancelAnimation(progress)
  }, [progress])

  // Used to revoke transition (progress) value after canceling it with e.g. LongPressGestureHandler
  const revokeTransitionAnimation = useCallback(() => {
    if (currentTransitionType.value === 'out') {
      dismiss()
    } else {
      present()
    }
  }, [dismiss, present, currentTransitionType])

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

  const animatedStyles = useAnimatedStyle(() => {
    const { transitionInStyles, transitionOutStyles } = animationConfig

    if (['out', 'idle_active'].includes(currentTransitionType.value) && transitionOutStyles) {
      return transitionOutStyles(progress)
    }

    return transitionInStyles(progress)
  })

  return {
    ...dragConfig,
    present,
    dismiss,
    handleStateChange,
    progress,
    animatedStyles,
    currentTransitionType,
    cancelTransitionAnimation,
    revokeTransitionAnimation,
  }
}

export type AnimationAPI = ReturnType<typeof useAnimationControl>

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

const getEventKey = (direction: SwipeDirection, key: MappedEventKey) =>
  directionsLookup[direction][key]
