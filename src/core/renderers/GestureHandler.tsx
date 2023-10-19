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

  //Jeżeli ktoś poda za dużą szerokość to czy ma zostać zastosowana cała szerokość ekranu czy może defaultowa szerokość?

  //Kiedy komunikat ma zajmować całą szerokość?

  /*Jak ma się zachowywać komunikat przy:
  1) portrait: cała szerokość domyślnie, chyba że notificationWith (jest różny od undefined) 
  2) landscape: maxNotificationWidth domyślnie chyba że notificationWith (jest różny od undefined)  

*/

  // fixme: TS krzyczy jak uzywa sie hasNotificationWidth, trzeba to jakos ograc sensownie
  const hasNotificationWidth = !!state?.notificationWidth
  const isWidthProvided = !!state?.notificationWidth && state.notificationWidth <= width

  const getDefaultWidth = () => width - Constants.notificationSideMargin * 2

  const getMaxWidth = () => {
    if (!!state?.notificationWidth && state.notificationWidth > width) {
      return width - Constants.notificationSideMargin * 2
    }
    return hasNotificationWidth ? state.notificationWidth : Constants.maxNotificationWidth
  }

  const notificationWidth = state.isPortrait
    ? isWidthProvided
      ? state.notificationWidth
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
