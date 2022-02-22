import React, { ReactNode } from 'react'
import Animated from 'react-native-reanimated'
import { LongPressGestureHandler } from 'react-native-gesture-handler'
import { View } from 'react-native'
import type { NotificationState } from '../hooks/useNotificationsStates'
import type { AnimationAPI } from '../hooks/useAnimationControl/useAnimationAPI'
import { styles } from '../utils/styles'
import { Constants } from '../config'

type Props = {
  children: ReactNode
  state: Pick<NotificationState, 'notificationEvent' | 'panHandlerRef' | 'longPressHandlerRef'>
  animationAPI: Pick<
    AnimationAPI,
    'animatedStyles' | 'cancelTransitionAnimation' | 'revokeTransitionAnimation'
  >
}

export const AnimationRenderer = ({ children, animationAPI, state }: Props) => {
  return (
    <Animated.View style={[animationAPI.animatedStyles]}>
      {state.notificationEvent && (
        <LongPressGestureHandler
          minDurationMs={0}
          ref={state.longPressHandlerRef}
          simultaneousHandlers={state.panHandlerRef}
          maxDist={Constants.maxLongPressDragDistance}
          onEnded={animationAPI.revokeTransitionAnimation}
          onActivated={animationAPI.cancelTransitionAnimation}>
          <View style={styles.boxWrapper}>{children}</View>
        </LongPressGestureHandler>
      )}
    </Animated.View>
  )
}
