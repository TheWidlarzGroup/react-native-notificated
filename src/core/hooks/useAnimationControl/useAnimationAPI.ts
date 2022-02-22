import { useCallback } from 'react'
import {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { useDrag } from '../useDrag'
import type { NotificationState } from '../useNotificationsStates'
import { emitter } from '../../services/NotificationEmitter'
import { useTimer } from '../useTimer'
import { withAnimationCallbackJSThread } from '../../utils/animation'
import { AnimationRange } from '../../../types/animations'

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
export const useAnimationAPI = ({
  gestureConfig,
  animationConfig,
  duration,
}: NotificationState['config']) => {
  const progress = useSharedValue(0)
  const { resetTimer, clearTimer } = useTimer()
  const animationInConfig = animationConfig.animationConfigIn
  const animationOutConfig = animationConfig?.animationConfigOut
  const { dragStateHandler, resetDrag, ...dragConfig } = useDrag(gestureConfig)
  const currentTransitionType = useSharedValue<'in' | 'out' | 'idle_active'>('in')

  const dismiss = useCallback(() => {
    currentTransitionType.value = 'out'
    resetDrag()

    const dismissConfig = animationOutConfig || animationInConfig
    const animateWith = dismissConfig.type === 'spring' ? withSpring : withTiming

    const handleSuccess = () => {
      currentTransitionType.value = 'in'
      emitter.emit('pop_notification')
    }

    const handleError = () => {}

    progress.value = animateWith(
      AnimationRange.END,
      dismissConfig.config,
      withAnimationCallbackJSThread(handleSuccess, handleError)
    )
  }, [currentTransitionType, resetDrag, animationOutConfig, animationInConfig, progress])

  const present = useCallback(() => {
    currentTransitionType.value = 'in'

    const animateWith = animationInConfig.type === 'spring' ? withSpring : withTiming

    const handleSuccess = () => {
      currentTransitionType.value = 'idle_active'
      resetTimer(dismiss, duration)
    }

    const handleError = () => {}

    progress.value = animateWith(
      AnimationRange.START,
      animationInConfig.config,
      withAnimationCallbackJSThread(handleSuccess, handleError)
    )
  }, [animationInConfig, currentTransitionType, dismiss, duration, progress, resetTimer])

  const cancelTransitionAnimation = useCallback(() => {
    clearTimer()
    cancelAnimation(progress)
  }, [clearTimer, progress])

  // Used to revoke transition (progress) value after canceling it with e.g. LongPressGestureHandler
  const revokeTransitionAnimation = useCallback(() => {
    switch (currentTransitionType.value) {
      case 'out':
        return dismiss()
      case 'in':
      case 'idle_active':
        return resetTimer(dismiss, duration)
    }
  }, [currentTransitionType, dismiss, resetTimer, duration])

  const handleDragStateChange = dragStateHandler(dismiss, resetDrag)

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
    animatedStyles,
    handleDragStateChange,
    cancelTransitionAnimation,
    revokeTransitionAnimation,
  }
}

export type AnimationAPI = ReturnType<typeof useAnimationAPI>
