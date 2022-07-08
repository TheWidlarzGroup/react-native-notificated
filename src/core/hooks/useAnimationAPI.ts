import { useCallback } from 'react'
import {
  cancelAnimation,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { useDrag } from './useDrag'
import type { NotificationState } from './useNotificationsStates'
import { emitter } from '../services/NotificationEmitter'
import { withAnimationCallbackJSThread } from '../utils/animation'
import { AnimationRange, TransitionStylesConfigFunction } from '../../types/animations'
import { useTimer } from './useTimer'
import type { AnimationBuilder } from '../utils/generateAnimationConfig'

const mergeStylesObjects = (styles: any, newStyles: any) => {
  // const oldTransform = [...(styles?.transform || [])]
  // const newTransform = [...(newStyles?.transform || [])]

  // console.log({ oldTransform, newTransform })

  return { ...styles, ...newStyles }
}

const mergeStylesFunctions = (
  stylesFunctions: TransitionStylesConfigFunction[],
  progress: SharedValue<number>
) => {
  'worklet'

  return stylesFunctions.reduce(
    (accumulatedStyles, styleFunction) => {
      // return { ...accumulatedStyles, ...(styleFunction(progress) as unknown as {}) }
      return mergeStylesObjects(accumulatedStyles, styleFunction(progress) as unknown as {})
    },
    { opacity: 1 } // it has to have the default opacity value
  )
}

export const useAnimationAPI = ({
  gestureConfig,
  animationConfig,
  duration,
  onClose,
}: NotificationState['config']) => {
  const progress = useSharedValue(0)
  const { resetTimer, clearTimer } = useTimer()
  const animationInConfig = animationConfig.animationConfigIn
  const animationOutConfig = animationConfig?.animationConfigOut
  const { dragStateHandler, resetDrag, ...dragConfig } = useDrag(gestureConfig)
  const currentTransitionType = useSharedValue<'in' | 'out' | 'idle_active'>('in')

  const dismiss = useCallback(
    (id?: string) => {
      currentTransitionType.value = 'out'
      clearTimer()
      resetDrag()

      const dismissConfig = animationOutConfig || animationInConfig
      const animateWith = dismissConfig.type === 'spring' ? withSpring : withTiming

      const handleSuccess = () => {
        currentTransitionType.value = 'in'
        emitter.emit('pop_notification', id)
        onClose?.()
      }

      const handleError = () => {}

      progress.value = animateWith(
        AnimationRange.END,
        dismissConfig.config,
        withAnimationCallbackJSThread(handleSuccess, handleError)
      )
    },
    [
      currentTransitionType,
      clearTimer,
      resetDrag,
      animationOutConfig,
      animationInConfig,
      progress,
      onClose,
    ]
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
    const test: AnimationBuilder = animationConfig as AnimationBuilder
    const { transitionInStyles, transitionOutStyles } = animationConfig

    if (['out', 'idle_active'].includes(currentTransitionType.value) && transitionOutStyles) {
      return { opacity: 1, ...(transitionOutStyles(progress) as unknown as {}) }
    }

    if (test?.transitionInStylesQueue?.length > 0) {
      return mergeStylesFunctions(test.transitionInStylesQueue, progress)
    }

    return { opacity: 1, ...(transitionInStyles(progress) as unknown as {}) }
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
