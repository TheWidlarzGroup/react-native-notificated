import { useNotificationConfig } from './useNotificationConfig'
import { useRef, useState } from 'react'
import { getTopOffset, mergeConfigs } from '../utils/pickers'
import type { EmitParam } from '../services/types'

export const useNotificationsStates = () => {
  const panHandlerRef = useRef(null)
  const longPressHandlerRef = useRef(null)
  const globalConfig = useNotificationConfig()
  const [notificationsQueue, setNotificationsQueue] = useState<EmitParam[]>([])
  const [notificationHeight, setNotificationHeight] = useState(0)

  const notificationEvent = notificationsQueue[0]
  const config = mergeConfigs(globalConfig, notificationEvent)

  const topOffset = getTopOffset(config, notificationHeight)

  return {
    config,
    topOffset,
    panHandlerRef,
    notificationEvent,
    notificationsQueue,
    longPressHandlerRef,
    setNotificationsQueue,
    setNotificationHeight,
  }
}

export type NotificationState = ReturnType<typeof useNotificationsStates>
