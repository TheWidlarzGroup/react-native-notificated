import React from 'react'
import { useNotificationEventHandler } from '../hooks/useNotificationEventHandler'
import { useNotificationsStates } from '../hooks/useNotificationsStates'
import { GestureHandler } from './GestureHandler'
import { AnimationRenderer } from './AnimationRenderer'
import { VariantsRenderer } from './VariantsRenderer'
import { useAnimationAPI } from '../hooks/useAnimationAPI'

export const NotificationsRenderer = () => {
  const { config, ...state } = useNotificationsStates()

  const animationAPI = useAnimationAPI(config, state?.notificationEvent?.id)

  useNotificationEventHandler({ ...state, ...animationAPI })

  return (
    <GestureHandler state={state} animationAPI={animationAPI}>
      <AnimationRenderer state={state} animationAPI={animationAPI}>
        <VariantsRenderer config={config} notificationEvent={state.notificationEvent} />
      </AnimationRenderer>
    </GestureHandler>
  )
}
