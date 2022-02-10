import { useNotificationConfig } from './useNotificationConfig'
import { useRef, useState } from 'react'
import { getConfigTime, getTopOffset, pickVariant } from '../utils/pickers'
import type { CustomAnimationConfig } from '../../types/animations'
import type { EmitParam } from '../services/types'
import type { GestureConfig } from '../../types/gestures'
import { InAppNotificationsConfig } from '../../defaultConfig/defaultConfig'

export const useNotificationsStates = () => {
  const panHandlerRef = useRef(null)
  const longPressHandlerRef = useRef(null)
  const globalConfig = useNotificationConfig()
  const [notificationsQueue, setNotificationsQueue] = useState<EmitParam[]>([])
  const [notificationHeight, setNotificationHeight] = useState(0)

  const notificationConfig = notificationsQueue[0]

  const variantConfig = pickVariant(
    InAppNotificationsConfig,
    notificationConfig.notificationType as string
  ).config

  const duration = getConfigTime(notificationConfig, globalConfig)

  const animationConfig: CustomAnimationConfig =
    notificationConfig?.config?.animationConfig ??
    variantConfig?.animationConfig ??
    globalConfig?.animationConfig

  const gestureConfig: GestureConfig =
    notificationConfig?.config?.gestureConfig ??
    variantConfig?.gestureConfig ??
    globalConfig?.gestureConfig

  const topOffset = getTopOffset(globalConfig, notificationConfig, notificationHeight)

  return {
    duration,
    topOffset,
    globalConfig,
    gestureConfig,
    panHandlerRef,
    animationConfig,
    notificationsQueue,
    notificationConfig,
    longPressHandlerRef,
    setNotificationsQueue,
    setNotificationHeight,
  }
}

export type NotificationState = ReturnType<typeof useNotificationsStates>
