import { useCallback } from 'react'
import {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { useDrag } from './useDrag'
import type { NotificationState } from './useNotificationsStates'
import { emitter } from '../services/NotificationEmitter'
import { withAnimationCallbackJSThread } from '../utils/animation'
import { AnimationRange } from '../../types/animations'
import { useTimer } from './useTimer'

export const useAnimationAPI = (
  { gestureConfig, animationConfig, duration }: NotificationState['config'],
  id: string
) => {
  const progress = useSharedValue(0)
  const { resetTimer, clearTimer } = useTimer()
  const animationInConfig = animationConfig.animationConfigIn
  const animationOutConfig = animationConfig?.animationConfigOut
  const { dragStateHandler, resetDrag, ...dragConfig } = useDrag(gestureConfig)
  const currentTransitionType = useSharedValue<'in' | 'out' | 'idle_active'>('in')

  const dismiss = useCallback(
    (optionalId?: string) => {
      currentTransitionType.value = 'out'
      resetDrag()

      const dismissConfig = animationOutConfig || animationInConfig
      const animateWith = dismissConfig.type === 'spring' ? withSpring : withTiming

      const handleSuccess = () => {
        currentTransitionType.value = 'in'
        emitter.emit('pop_notification', optionalId ?? id)
      }

      const handleError = () => {}

      progress.value = animateWith(
        AnimationRange.END,
        dismissConfig.config,
        withAnimationCallbackJSThread(handleSuccess, handleError)
      )
    },
    [currentTransitionType, resetDrag, animationOutConfig, animationInConfig, progress, id]
  )

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
  }, [currentTransitionType.value, dismiss, resetTimer, duration])

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
