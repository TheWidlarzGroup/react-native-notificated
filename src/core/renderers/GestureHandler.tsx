import React, { ReactNode } from 'react'
import { useWindowDimensions } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import type { AnimationAPI } from '../hooks/useAnimationAPI'
import type { NotificationState } from '../hooks/useNotificationsStates'
import Animated from 'react-native-reanimated'
import { styles } from '../utils/styles'
import { Constants } from '../config'

type Props = {
  children: ReactNode
  state: Pick<
    NotificationState,
    | 'longPressHandlerRef'
    | 'panHandlerRef'
    | 'setNotificationHeight'
    | 'topOffset'
    | 'isPortaitMode'
  >
  animationAPI: Pick<AnimationAPI, 'dragGestureHandler' | 'handleDragStateChange' | 'dragStyles'>
}

export const GestureHandler = ({ children, state, animationAPI }: Props) => {
  const { width } = useWindowDimensions()
  const notificationWidth = state.isPortaitMode
    ? width - Constants.notificationSideMargin * 2
    : Constants.maxNotificationWidth
  return (
    <PanGestureHandler
      ref={state.panHandlerRef}
      simultaneousHandlers={state.longPressHandlerRef}
      onGestureEvent={animationAPI.dragGestureHandler}
      onHandlerStateChange={animationAPI.handleDragStateChange}>
      <Animated.View
        onLayout={(e) => state.setNotificationHeight(e.nativeEvent.layout.height)}
        style={[
          animationAPI.dragStyles,
          styles.container,
          Constants.isAndroid ? styles.containerAndroid : styles.containerIos,
          {
            top: state.topOffset,
            width: notificationWidth,
          },
        ]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  )
}
