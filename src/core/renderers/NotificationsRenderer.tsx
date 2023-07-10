import React from 'react'
import { useNotificationEventHandler } from '../hooks/useNotificationEventHandler'
import { useNotificationsStates } from '../hooks/useNotificationsStates'
import { GestureHandler } from './GestureHandler'
import { AnimationRenderer } from './AnimationRenderer'
import { VariantsRenderer } from './VariantsRenderer'
import { useAnimationAPI } from '../hooks/useAnimationAPI'

type Props = {
  providerID?: string
  notificationTopPosition?: number
  isModalProvider?: boolean
}

export const NotificationsRenderer = ({ isModalProvider, notificationTopPosition }: Props) => {
  const { config, ...state } = useNotificationsStates()

  const animationAPI = useAnimationAPI(config)

  useNotificationEventHandler({
    ...state,
    ...animationAPI,
    isModalProvider,
  })

  return (
    <GestureHandler
      state={state}
      animationAPI={animationAPI}
      notificationTopPosition={notificationTopPosition}>
      <AnimationRenderer state={state} animationAPI={animationAPI}>
        <VariantsRenderer config={config} notificationEvent={state.notificationEvent} />
      </AnimationRenderer>
    </GestureHandler>
  )
}
