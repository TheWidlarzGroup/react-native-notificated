import React, { ReactNode } from 'react'
import Animated from 'react-native-reanimated'
import { LongPressGestureHandler } from 'react-native-gesture-handler'
import { View } from 'react-native'
import type { NotificationState } from '../hooks/useNotificationsStates'
import type { AnimationAPI } from '../hooks/useAnimationControl/useAnimationControl'
import { useTimer } from '../hooks/useTimer'
import { styles } from '../utils/styles'
import { Constants } from '../config'

type Props = {
  children: ReactNode
  state: Pick<
    NotificationState,
    'notificationEvent' | 'panHandlerRef' | 'longPressHandlerRef' | 'config'
  >
  animationAPI: Pick<
    AnimationAPI,
    | 'dismiss'
    | 'animatedStyles'
    | 'cancelTransitionAnimation'
    | 'revokeTransitionAnimation'
    | 'currentTransitionType'
  >
}

export const AnimationRenderer = ({ children, animationAPI, state }: Props) => {
  const { clearTimer, resetTimer } = useTimer()

  return (
    <Animated.View style={[animationAPI.animatedStyles]}>
      {state.notificationEvent && (
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
              resetTimer(animationAPI.dismiss, state.config.duration)
            }

            if (animationAPI.currentTransitionType.value === 'idle_active') {
              resetTimer(animationAPI.dismiss, state.config.duration)
            }
          }}>
          <View style={styles.boxWrapper}>{children}</View>
        </LongPressGestureHandler>
      )}
    </Animated.View>
  )
}
