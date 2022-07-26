import { useReducer, useRef, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { useNotificationConfig } from './useNotificationConfig'
import { getTopOffset, mergeConfigs } from '../utils/pickers'
import { queueReducer } from '../utils/queueReducer'
import { useStatusBarHeightDetector } from './useStatusBarHeightDetector'

export const useNotificationsStates = () => {
  const panHandlerRef = useRef(null)
  const longPressHandlerRef = useRef(null)
  const { height: windowHeight, width: windowWidth } = useWindowDimensions()
  const isPortaitMode = windowHeight > windowWidth
  const { statusBarHeight } = useStatusBarHeightDetector({ isPortaitMode })
  const globalConfig = useNotificationConfig()
  const [notificationsQueue, dispatch] = useReducer(queueReducer, [])
  const [notificationHeight, setNotificationHeight] = useState(0)

  const notificationEvent = notificationsQueue[0]
  const config = mergeConfigs(globalConfig, notificationEvent)

  const topOffset = getTopOffset({
    globalConfig: config,
    notificationHeight,
    isPortaitMode,
    windowHeight,
    statusBarHeight,
  })

  return {
    config,
    dispatch,
    topOffset,
    panHandlerRef,
    notificationEvent,
    notificationsQueue,
    longPressHandlerRef,
    setNotificationHeight,
    isPortaitMode,
  }
}

export type NotificationState = ReturnType<typeof useNotificationsStates>
