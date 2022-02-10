import React, { ReactNode } from 'react'
import { PanGestureHandler } from 'react-native-gesture-handler'
import type { AnimationAPI } from '../hooks/useAnimationControl/useAnimationControl'
import type { NotificationState } from '../hooks/useNotificationsStates'

type Props = {
  children: ReactNode
  state: Pick<NotificationState, 'longPressHandlerRef' | 'panHandlerRef'>
  animationAPI: Pick<AnimationAPI, 'dragGestureHandler' | 'handleDragStateChange'>
}

export const GestureHandler = ({ children, state, animationAPI }: Props) => {
  return (
    <PanGestureHandler
      ref={state.panHandlerRef}
      simultaneousHandlers={state.longPressHandlerRef}
      onGestureEvent={animationAPI.dragGestureHandler}
      onHandlerStateChange={animationAPI.handleDragStateChange}>
      {children}
    </PanGestureHandler>
  )
}
