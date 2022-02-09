import { useNotificationConfig } from './useNotificationConfig'
import { useRef, useState } from 'react'
import { getConfigTime } from '../utils/pickers'
import type { CustomAnimationConfig } from '../../types/animations'
import type { EmitParam } from '../../types'

export const useNotificationsStates = () => {
  const panHandlerRef = useRef(null)
  const longPressHandlerRef = useRef(null)
  const globalConfig = useNotificationConfig()
  const [notificationsQueue, setNotificationsQueue] = useState<EmitParam[]>([])

  const notificationConfig = notificationsQueue[0]

  const duration = getConfigTime(notificationConfig, globalConfig)

  const animationConfig: CustomAnimationConfig =
    notificationConfig?.config?.animationConfig || globalConfig?.animationConfig

  return {
    duration,
    globalConfig,
    panHandlerRef,
    animationConfig,
    notificationsQueue,
    notificationConfig,
    longPressHandlerRef,
    setNotificationsQueue,
  }
}

export type NotificationState = ReturnType<typeof useNotificationsStates>
