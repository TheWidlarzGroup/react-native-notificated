import { useNotificationConfig } from './useNotificationConfig'
import { useRef, useState } from 'react'
import { getTopOffset, pickVariant } from '../utils/pickers'
import type { EmitParam } from '../services/types'
import type { NotificationsConfig, VariantsMap } from '../../types'

export const useNotificationsStates = () => {
  const panHandlerRef = useRef(null)
  const longPressHandlerRef = useRef(null)
  const globalConfig = useNotificationConfig()
  const [notificationsQueue, setNotificationsQueue] = useState<EmitParam[]>([])
  const [notificationHeight, setNotificationHeight] = useState(0)

  const notificationEvent = notificationsQueue[0]
  const config = mergeConfigs(globalConfig, notificationEvent)

  const topOffset = getTopOffset(globalConfig, notificationEvent, notificationHeight)

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

const mergeConfigs = (
  globalConfig: NotificationsConfig<VariantsMap>,
  notificationConfig: EmitParam | undefined
): NotificationsConfig<VariantsMap> => {
  const variantConfig = pickVariant(
    globalConfig,
    notificationConfig?.notificationType as string
  )?.config

  return { ...globalConfig, ...variantConfig, ...notificationConfig }
}

export type NotificationState = ReturnType<typeof useNotificationsStates>
