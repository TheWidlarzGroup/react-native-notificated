import React, { ReactNode } from 'react'
import Animated from 'react-native-reanimated'
import { LongPressGestureHandler } from 'react-native-gesture-handler'
import { View } from 'react-native'
import type { NotificationState } from '../hooks/useNotificationsStates'
import type { AnimationAPI } from '../hooks/useAnimationControl'
import { useTimer } from '../hooks/useTimer'
import { styles } from '../utils/styles'
import { Constants } from '../config'

type Props = {
  children: ReactNode
  state: Pick<
    NotificationState,
    'notificationConfig' | 'panHandlerRef' | 'longPressHandlerRef' | 'duration'
  >
  animationAPI: Pick<
    AnimationAPI,
    | 'dismiss'
    | 'dragStyles'
    | 'cancelTransitionAnimation'
    | 'revokeTransitionAnimation'
    | 'currentTransitionType'
  >
}

export const AnimationRenderer = ({ children, animationAPI, state }: Props) => {
  const { clearTimer, resetTimer } = useTimer()

  return (
    <Animated.View style={[animationAPI.dragStyles]}>
      {state.notificationConfig && (
        <LongPressGestureHandler
          minDurationMs={0}
          maxDist={Constants.maxLongPressDragDistance}
          ref={state.longPressHandlerRef}
          simultaneousHandlers={state.panHandlerRef}
          onActivated={() => {
            animationAPI.cancelTransitionAnimation()
            clearTimer()
          }}
          onEnded={() => {
            animationAPI.revokeTransitionAnimation()

            if (animationAPI.currentTransitionType.value === 'in') {
              resetTimer(animationAPI.dismiss, state.duration)
            }

            if (animationAPI.currentTransitionType.value === 'idle_active') {
              resetTimer(animationAPI.dismiss, state.duration)
            }
          }}>
          <View style={styles.boxWrapper}>{children}</View>
        </LongPressGestureHandler>
      )}
    </Animated.View>
  )
}
