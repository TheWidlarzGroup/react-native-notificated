import React, { ReactNode, useState } from 'react'
import Animated from 'react-native-reanimated'
import type { NotificationState } from '../hooks/useNotificationsStates'
import type { AnimationAPI } from '../hooks/useAnimationControl/useAnimationControl'
import { getTopOffset } from '../utils/pickers'
import { styles } from '../utils/styles'
import { Constants } from '../config'

type Props = {
  children: ReactNode
  state: Pick<NotificationState, 'notificationConfig' | 'globalConfig'>
  animationAPI: Pick<AnimationAPI, 'animatedStyles'>
}

export const PositionRenderer = ({ children, state, animationAPI }: Props) => {
  const [notificationHeight, setNotificationHeight] = useState(0)
  const topOffset = getTopOffset(state.globalConfig, state.notificationConfig, notificationHeight)

  return (
    <>
      <Animated.View
        onLayout={(e) => setNotificationHeight(e.nativeEvent.layout.height)}
        testID="notificationsContainer"
        style={[
          animationAPI.animatedStyles,
          styles.container,
          { top: topOffset },
          Constants.isAndroid ? styles.containerAndroid : styles.containerIos,
        ]}>
        {children}
      </Animated.View>
    </>
  )
}
