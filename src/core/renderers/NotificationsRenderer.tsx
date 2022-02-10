import React from 'react'
import { useAnimationControl } from '../hooks/useAnimationControl/useAnimationControl'
import { useNotificationEventHandler } from '../hooks/useNotificationEventHandler'
import { useNotificationsStates } from '../hooks/useNotificationsStates'
import { GestureHandler } from './GestureHandler'
import { PositionRenderer } from './PositionRenderer'
import { AnimationRenderer } from './AnimationRenderer'
import { VariantsRenderer } from './VariantsRenderer'

export const NotificationsRenderer = () => {
  const state = useNotificationsStates()

  const animationAPI = useAnimationControl({ ...state })

  useNotificationEventHandler({
    present: animationAPI.present,
    dismiss: animationAPI.dismiss,
    notificationEvent: state.notificationEvent,
    notificationsQueue: state.notificationsQueue,
    setNotificationsQueue: state.setNotificationsQueue,
  })

  return (
    <GestureHandler state={state} animationAPI={animationAPI}>
      <PositionRenderer state={state} animationAPI={animationAPI}>
        <AnimationRenderer state={state} animationAPI={animationAPI}>
          <VariantsRenderer config={state.config} notificationEvent={state.notificationEvent} />
        </AnimationRenderer>
      </PositionRenderer>
    </GestureHandler>
  )
}
