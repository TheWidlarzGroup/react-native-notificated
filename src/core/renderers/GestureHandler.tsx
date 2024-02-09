import React, { ReactNode } from 'react'
import { useWindowDimensions } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import type { AnimationAPI } from '../hooks/useAnimationAPI'
import type { NotificationState } from '../hooks/useNotificationsStates'
import Animated from 'react-native-reanimated'
import { styles } from '../utils/styles'
import { Constants } from '../config'
import { calculateNotificationPositionCoordintates } from '../utils/calculateNotificationPositionCoordintates'

type Props = {
  children: ReactNode
  state: Pick<
    NotificationState,
    | 'longPressHandlerRef'
    | 'panHandlerRef'
    | 'setNotificationHeight'
    | 'notificationOffset'
    | 'isPortrait'
    | 'notificationWidth'
  >
  animationAPI: Pick<AnimationAPI, 'dragGestureHandler' | 'handleDragStateChange' | 'dragStyles'>
  notificationTopPosition?: number
}

export const GestureHandler = ({
  children,
  state,
  animationAPI,
  notificationTopPosition,
}: Props) => {
  const { width } = useWindowDimensions()

  const { calculatedNotificationWidth, top, left, right } =
    calculateNotificationPositionCoordintates({
      screenWidth: width,
      notificationOffset: state.notificationOffset,
      notificationWidth: state.notificationWidth,
      notificationTopPosition,
    })

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
            top,
            left,
            right,
            width: calculatedNotificationWidth,
          },
        ]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  )
}
