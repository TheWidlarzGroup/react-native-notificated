import { useCallback } from 'react'
import {
  runOnJS,
  withSpring,
  useSharedValue,
  cancelAnimation,
  withTiming,
  AnimationCallback,
} from 'react-native-reanimated'
import type { GestureConfig } from '../types/gestures'
import type { CustomAnimationConfig } from '../types/animations'
import { useDrag } from './useDrag'

export type SwipeConfig = GestureConfig & {
  initialOffset: number
  targetOffset: number
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
  animationConfig,
}: Props) => {
  const animationInConfig = animationConfig.animationConfigIn
  const animationOutConfig = animationConfig?.animationConfigOut

  // const drag = useSharedValue(0)
  const { dragStateHandler, resetDrag, ...dragConfig } = useDrag(config)
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

  const handleDragStateChange = dragStateHandler(swipeSuccess, swipeFail)

  return {
    ...dragConfig,
    handleDragStateChange,
    resetDrag,
    present,
    dismiss,
    progress,
    currentTransitionType,
    cancelTransitionAnimation,
    revokeTransitionAnimation,
  }
}
