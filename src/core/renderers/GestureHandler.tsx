import React, { ReactNode } from 'react'
import { useWindowDimensions } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import type { AnimationAPI } from '../hooks/useAnimationAPI'
import type { NotificationState } from '../hooks/useNotificationsStates'
import Animated from 'react-native-reanimated'
import { styles } from '../utils/styles'
import { Constants } from '../config'
import { useNotificationsStates } from '../hooks/useNotificationsStates'

type Props = {
  children: ReactNode
  state: Pick<
    NotificationState,
    | 'longPressHandlerRef'
    | 'panHandlerRef'
    | 'setNotificationHeight'
    | 'notificationOffset'
    | 'isPortaitMode'
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
  const { config } = useNotificationsStates()

  //Jeżeli ktoś poda za dużą szerokość to czy ma zostać zastosowana cała szerokość ekranu czy może defaultowa szerokość?

  //Kiedy komunikat ma zajmować całą szerokość?

  /*Jak ma się zachowywać komunikat przy:
  1) portrait: cała szerokość domyślnie, chyba że notificationWith (jest różny od undefined) 
  2) landscape: maxNotificationWidth domyślnie chyba że notificationWith (jest różny od undefined)  

*/

  const hasNotificationWidth = config?.notificationWidth
  const isWidthProvided = hasNotificationWidth && config.notificationWidth <= width

  const getDefaultWidth = () => width - Constants.notificationSideMargin * 2

  const getMaxWidth = () => {
    if (hasNotificationWidth && config.notificationWidth > width) {
      return width - Constants.notificationSideMargin * 2
    }
    return hasNotificationWidth ? config.notificationWidth : Constants.maxNotificationWidth
  }

  const notificationWidth = state.isPortraitMode
    ? isWidthProvided
      ? config.notificationWidth
      : getDefaultWidth()
    : getMaxWidth()

  const top =
    notificationTopPosition || notificationTopPosition === 0
      ? notificationTopPosition
      : state.notificationOffset.top

  const left = state.notificationOffset.left

  const right = state.notificationOffset.right

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
            width: notificationWidth,
          },
        ]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  )
}
