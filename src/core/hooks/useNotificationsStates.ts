import { useWindowDimensions } from 'react-native'
import { useNotificationConfig } from './useNotificationConfig'
import { useReducer, useRef, useState } from 'react'
import { getTopOffset, mergeConfigs } from '../utils/pickers'
import { queueReducer } from '../utils/queueReducer'

export const useNotificationsStates = () => {
  const panHandlerRef = useRef(null)
  const longPressHandlerRef = useRef(null)
  const { height, width } = useWindowDimensions()
  const globalConfig = useNotificationConfig()
  const [notificationsQueue, dispatch] = useReducer(queueReducer, [])
  const [notificationHeight, setNotificationHeight] = useState(0)

  const isPortaitMode = height > width
  const notificationEvent = notificationsQueue[0]
  const config = mergeConfigs(globalConfig, notificationEvent)

  const topOffset = getTopOffset(config, notificationHeight, isPortaitMode)

  return {
    config,
    dispatch,
    topOffset,
    panHandlerRef,
    notificationEvent,
    notificationsQueue,
    longPressHandlerRef,
    setNotificationHeight,
  }
}

export type NotificationState = ReturnType<typeof useNotificationsStates>
