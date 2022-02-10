import React, { ReactNode } from 'react'
import Animated from 'react-native-reanimated'
import type { NotificationState } from '../hooks/useNotificationsStates'
import type { AnimationAPI } from '../hooks/useAnimationControl/useAnimationControl'
import { styles } from '../utils/styles'
import { Constants } from '../config'

type Props = {
  children: ReactNode
  state: Pick<NotificationState, 'topOffset' | 'setNotificationHeight'>
  animationAPI: Pick<AnimationAPI, 'animatedStyles'>
}

export const PositionRenderer = ({ children, state, animationAPI }: Props) => {
  return (
    <>
      <Animated.View
        onLayout={(e) => state.setNotificationHeight(e.nativeEvent.layout.height)}
        testID="notificationsContainer"
        style={[
          animationAPI.animatedStyles,
          styles.container,
          { top: state.topOffset },
          Constants.isAndroid ? styles.containerAndroid : styles.containerIos,
        ]}>
        {children}
      </Animated.View>
    </>
  )
}
