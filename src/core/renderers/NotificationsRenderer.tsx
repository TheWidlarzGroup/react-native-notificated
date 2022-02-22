import React from 'react'
import { useAnimationAPI } from '../hooks/useAnimationControl/useAnimationAPI'
import { useNotificationEventHandler } from '../hooks/useNotificationEventHandler'
import { useNotificationsStates } from '../hooks/useNotificationsStates'
import { GestureHandler } from './GestureHandler'
import { AnimationRenderer } from './AnimationRenderer'
import { VariantsRenderer } from './VariantsRenderer'

export const NotificationsRenderer = () => {
  const { config, ...state } = useNotificationsStates()

  const animationAPI = useAnimationAPI(config)

  useNotificationEventHandler({ ...state, ...animationAPI })

  return (
    <GestureHandler state={state} animationAPI={animationAPI}>
      <AnimationRenderer state={state} animationAPI={animationAPI}>
        <VariantsRenderer config={config} notificationEvent={state.notificationEvent} />
      </AnimationRenderer>
    </GestureHandler>
  )
}
