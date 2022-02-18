import { useCallback } from 'react'
import {
  AnimationCallback,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { useDrag } from '../useDrag'
import type { NotificationState } from '../useNotificationsStates'
import { emitter } from '../../services/NotificationEmitter'
import { useTimer } from '../useTimer'

type Props = {
  config: NotificationState['config']
  onTransitionInAnimationFinished?: () => void
  onTransitionOutAnimationFinished?: () => void
  onTransitionInAnimationNotFinished?: () => void
  onTransitionOutAnimationNotFinished?: () => void
  onSwipeSuccess?: () => void
  onSwipeFail?: () => void
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
  config: { gestureConfig, animationConfig, duration },
  onSwipeFail,
  onSwipeSuccess,
  onTransitionInAnimationFinished,
  onTransitionInAnimationNotFinished,
}: Props) => {
  const { resetTimer } = useTimer()
  const animationInConfig = animationConfig.animationConfigIn
  const animationOutConfig = animationConfig?.animationConfigOut

  const { dragStateHandler, resetDrag, ...dragConfig } = useDrag(gestureConfig)
  const progress = useSharedValue(0)
  const currentTransitionType = useSharedValue<'in' | 'out' | 'idle_active'>('in')

  const onTransitionInAnimationFinishedWrapper = useCallback(() => {
    currentTransitionType.value = 'idle_active'

    onTransitionInAnimationFinished?.()
  }, [onTransitionInAnimationFinished, currentTransitionType])

  const onTransitionOutAnimationFinishedWrapper = useCallback(() => {
    currentTransitionType.value = 'in'

    emitter.emit('pop_notification')
  }, [currentTransitionType])

  const onTransitionInAnimationNotFinishedWrapper = useCallback(() => {
    onTransitionInAnimationNotFinished?.()
  }, [onTransitionInAnimationNotFinished])

  // Function which triggers animation for TRANSITION IN
  // it also invokes callback after animation is completed
  const present = useCallback(() => {
    currentTransitionType.value = 'in'

    const pickedWith = animationInConfig.type === 'spring' ? withSpring : withTiming

    progress.value = pickedWith(
      1,
      animationInConfig.config,
      withAnimationCallbackJSThread(
        onTransitionInAnimationFinishedWrapper,
        onTransitionInAnimationNotFinishedWrapper
      )
    )
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

    const pickedWith = dismissConfig.type === 'spring' ? withSpring : withTiming

    progress.value = pickedWith(
      0,
      dismissConfig.config,
      withAnimationCallbackJSThread(onTransitionOutAnimationFinishedWrapper, () =>
        resetTimer(dismiss, duration)
      )
    )
  }, [
    currentTransitionType,
    resetDrag,
    animationOutConfig,
    animationInConfig,
    progress,
    onTransitionOutAnimationFinishedWrapper,
    resetTimer,
    duration,
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

  const animatedStyles = useAnimatedStyle(() => {
    const { transitionInStyles, transitionOutStyles } = animationConfig

    if (['out', 'idle_active'].includes(currentTransitionType.value) && transitionOutStyles) {
      return transitionOutStyles(progress)
    }

    return transitionInStyles(progress)
  })

  return {
    ...dragConfig,
    animatedStyles,
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

export type AnimationAPI = ReturnType<typeof useAnimationControl>
