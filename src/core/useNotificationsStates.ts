import { useNotificationConfig } from './useNotificationConfig'
import { useRef, useState } from 'react'
import { getConfigTime, getTopOffset } from './utils'
import type { CustomAnimationConfig } from '../types/animations'
import type { EmitParam } from '../types'

export const useNotificationsStates = () => {
  const panHandlerRef = useRef(null)
  const longPressHandlerRef = useRef(null)
  const globalConfig = useNotificationConfig()
  const notificationsConfigs = useNotificationConfig()
  const [notificationHeight, setNotificationHeight] = useState(0)
  const [notificationsQueue, setNotificationsQueue] = useState<EmitParam[]>([])

  const notificationConfig = notificationsQueue[0]

  const topOffset = getTopOffset(notificationsConfigs, notificationConfig, notificationHeight)

  const duration = getConfigTime(notificationConfig, notificationsConfigs)

  const animationConfig: CustomAnimationConfig =
    notificationConfig?.config?.animationConfig || globalConfig?.animationConfig

  return {
    duration,
    topOffset,
    globalConfig,
    panHandlerRef,
    animationConfig,
    notificationsQueue,
    notificationHeight,
    notificationConfig,
    longPressHandlerRef,
    notificationsConfigs,
    setNotificationsQueue,
    setNotificationHeight,
  }
}

export type NotificationState = ReturnType<typeof useNotificationsStates>
