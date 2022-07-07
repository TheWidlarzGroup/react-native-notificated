import { useEffect, useReducer, useRef, useState } from 'react'
import { useWindowDimensions, NativeModules, Platform, StatusBar } from 'react-native'
import { useNotificationConfig } from './useNotificationConfig'
import { getTopOffset, mergeConfigs } from '../utils/pickers'
import { queueReducer } from '../utils/queueReducer'

export const useNotificationsStates = () => {
  const { StatusBarManager } = NativeModules
  const panHandlerRef = useRef(null)
  const longPressHandlerRef = useRef(null)
  const { height: windowHeight, width: windowWidth } = useWindowDimensions()
  const globalConfig = useNotificationConfig()
  const [notificationsQueue, dispatch] = useReducer(queueReducer, [])
  const [notificationHeight, setNotificationHeight] = useState(0)
  const [barHeight, setBarHeight] = useState(0)

  const isPortaitMode = windowHeight > windowWidth
  const notificationEvent = notificationsQueue[0]
  const config = mergeConfigs(globalConfig, notificationEvent)

  useEffect(() => {
    if (Platform.OS !== 'ios') return setBarHeight(StatusBar.currentHeight ?? 0)
    // handling edge case when app is opened in landscape mode and barHeight = 0
    StatusBarManager.getHeight(({ height }: { height: number }) =>
      setBarHeight(isPortaitMode && height !== 0 ? height : 50)
    )
  }, [StatusBarManager, isPortaitMode])

  const topOffset = getTopOffset({
    globalConfig: config,
    notificationHeight,
    isPortaitMode,
    windowHeight,
    statusBarHeight: barHeight,
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
