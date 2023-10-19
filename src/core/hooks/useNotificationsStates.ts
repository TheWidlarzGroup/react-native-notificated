import { useReducer, useRef, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { useNotificationConfig } from './useNotificationConfig'
import { getNotificationOffset, mergeConfigs } from '../utils/pickers'
import { queueReducer } from '../utils/queueReducer'
import { useStatusBarHeightDetector } from './useStatusBarHeightDetector'

export const useNotificationsStates = () => {
  const panHandlerRef = useRef(null)
  const longPressHandlerRef = useRef(null)
  const { height: windowHeight, width: windowWidth } = useWindowDimensions()
  const isPortraitMode = windowHeight > windowWidth
  const { statusBarHeight } = useStatusBarHeightDetector({ isPortraitMode })
  const globalConfig = useNotificationConfig()
  const [notificationsQueue, dispatch] = useReducer(queueReducer, [])
  const [notificationHeight, setNotificationHeight] = useState(0)

  const notificationEvent = notificationsQueue[0]
  const config = mergeConfigs(globalConfig, notificationEvent)

  const notificationOffset = getNotificationOffset({
    globalConfig: config,
    notificationHeight,
    isPortraitMode,
    windowHeight,
    statusBarHeight,
  })

  return {
    config,
    dispatch,
    notificationOffset,
    panHandlerRef,
    notificationEvent,
    notificationsQueue,
    longPressHandlerRef,
    setNotificationHeight,
    isPortrait: isPortraitMode,
    notificationWidth: config.notificationWidth,
  }
}

export type NotificationState = ReturnType<typeof useNotificationsStates>
