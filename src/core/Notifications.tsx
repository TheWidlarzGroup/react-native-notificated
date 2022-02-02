/** @format */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Dimensions, Platform, StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { LongPressGestureHandler, PanGestureHandler } from 'react-native-gesture-handler'
import { useTimer } from '../hooks/useTimer'
import { SwipeConfig, useSwipe } from '../hooks/useSwipe'
import { themeBase } from '../defaultConfig/components/theme'
import { emitter, useNotificationConfig } from './useNotificationConfig'
import { VariantsRenderer } from './VariantsRenderer'
import { DEVICE_HEIGHT } from '../utils/deviceInfo'
import type { EmitParam, NotificationsConfig, VariantsMap } from '../types'

import type { CustomAnimationConfig } from '../types/animations'

const { width } = Dimensions.get('window')
const notificationWidth = width - themeBase.spacing.s * 2
const notificationSideMargin = themeBase.spacing.s
const initialOffsetX = -(notificationWidth + 2 * notificationSideMargin)
const initialOffsetY = -300
const targetOffsetX = width
const targetOffsetY = true ? 40 : 10

const isAndroid = Platform.OS === 'android'
const maxLongPressDragDistance = 300

type Config = EmitParam<unknown>

// TODO: move animationstyles to useSwipe hook
// TODO: rename useSwipe hook to useAnimationControl
// TODO: add fetching animation config from variants to the chain

export const Notifications = () => {
  const notificationsConfigs = useNotificationConfig()
  const panHandlerRef = useRef(null)
  const longPressHandlerRef = useRef(null)
  const { clearTimer, resetTimer } = useTimer()

  const [notificationsQueue, setNotificationsQueue] = useState<Config[]>([])
  const notificationConfig = notificationsQueue[0]

  const [notificationHeight, setNotificationHeight] = useState<number>()

  const notificationFinalPosition =
    notificationConfig?.config?.notificationPosition ?? notificationsConfigs?.notificationPosition

  const getTopOffset = () => {
    switch (notificationFinalPosition) {
      case 'top':
        return 0
      case 'center':
        return DEVICE_HEIGHT / 2 - (notificationHeight || 75)
      case 'bottom':
        return DEVICE_HEIGHT - (notificationHeight ? notificationHeight * 2 : 150)
      default:
        return 0
    }
  }
  const resetToCurrentTimer = () =>
    resetTimer(dismiss, getConfigTime(notificationConfig, notificationsConfigs))

  const animationConfig: CustomAnimationConfig =
    notificationConfig?.config?.animationConfig || notificationsConfigs?.animationConfig

  const onTransitionInAnimationFinished = useCallback(() => {
    const targetTime = getConfigTime(notificationConfig, notificationsConfigs)
    resetTimer(dismiss, targetTime)
    // eslint-disable-next-line
  }, [resetTimer, notificationConfig])

  const onTransitionOutAnimationFinished = useCallback(() => {
    emitter.emit('pop_notification')
  }, [])

  const {
    progress,
    present,
    dismiss,
    handleGestureEvent,
    handleStateChange,
    cancelTransitionAnimation,
    currentTransitionType,
    revokeTransitionAnimation,
    dragStyles,
  } = useSwipe({
    animationConfig,
    config: isAndroid ? swipeConfigs.android : swipeConfigs.ios,
    onTransitionInAnimationFinished,
    onTransitionOutAnimationFinished,
  })

  const handleNewNotification = useCallback(
    (_config: Config) => {
      present()
    },
    [present]
  )

  useEffect(() => {
    if (notificationConfig) {
      handleNewNotification(notificationConfig)
    }
  }, [notificationConfig, handleNewNotification])

  const popNotification = useCallback(() => {
    setNotificationsQueue((prev) => {
      const updatedNotificationsQueue = prev.filter((_, index: number) => index !== 0)

      return updatedNotificationsQueue
    })
  }, [])

  useEffect(() => {
    emitter.addListener('add_notification', (config: Config) => {
      setNotificationsQueue((prev) => {
        // Check if the unique id already in queue
        // if (config?.id && prev.filter((notification) => notification?.id === config?.id)?.length) {
        //   return prev
        // }
        return [...prev, config]
      })
    })
    emitter.addListener('pop_notification', () => {
      popNotification()
    })

    return () => {
      emitter.removeEvent('add_notification')
      emitter.removeEvent('pop_notification')
    }
  }, [popNotification, dismiss, present, handleNewNotification])

  const modifyNotification = useCallback(
    ({ id, params }) => {
      setNotificationsQueue(
        notificationsQueue.map((notification) => {
          if (notification.id !== id) return notification
          // NASTY ANY TRICK -> FIX IN FUTURE
          return {
            ...notification,
            params: { ...(notification.params as any), ...params },
          }
        })
      )
    },
    [notificationsQueue]
  )

  useEffect(() => {
    const removeListener = emitter.addListener('modify_notification', modifyNotification)
    return removeListener
  }, [modifyNotification])

  const removeNotification = useCallback(
    ({ id }) => {
      const [firstNotification] = notificationsQueue
      // if notification is currently displayed animate it back
      if (firstNotification?.id === id) return dismiss()
      setNotificationsQueue(notificationsQueue.filter((notification) => notification.id !== id))
    },
    [notificationsQueue, dismiss]
  )

  useEffect(() => {
    const removeListener = emitter.addListener('remove_notification', removeNotification)
    return removeListener
  }, [removeNotification])

  const animatedStyles = useAnimatedStyle(() => {
    const { transitionInStyles, transitionOutStyles } = animationConfig

    if (['out', 'idle_active'].includes(currentTransitionType.value) && transitionOutStyles) {
      return transitionOutStyles(progress)
    }

    return transitionInStyles(progress)
  })

  return (
    <PanGestureHandler
      ref={panHandlerRef}
      simultaneousHandlers={longPressHandlerRef}
      onGestureEvent={handleGestureEvent}
      onHandlerStateChange={handleStateChange}>
      <Animated.View
        onLayout={(e) => setNotificationHeight(e.nativeEvent.layout.height)}
        testID="notificationsContainer"
        style={[
          styles.container,
          isAndroid ? styles.containerAndroid : styles.containerIos,
          animatedStyles,
          { top: getTopOffset() },
        ]}>
        <Animated.View style={[dragStyles]}>
          {notificationConfig && (
            <LongPressGestureHandler
              minDurationMs={0}
              maxDist={maxLongPressDragDistance}
              ref={longPressHandlerRef}
              simultaneousHandlers={panHandlerRef}
              onActivated={() => {
                cancelTransitionAnimation()
                clearTimer()
              }}
              onEnded={() => {
                revokeTransitionAnimation()

                if (currentTransitionType.value === 'in') {
                  resetToCurrentTimer()
                }

                if (currentTransitionType.value === 'idle_active') {
                  resetToCurrentTimer()
                }
              }}>
              <View style={styles.boxWrapper}>
                <VariantsRenderer {...{ config: notificationsConfigs, notificationConfig }} />
              </View>
            </LongPressGestureHandler>
          )}
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: notificationWidth,
    minHeight: 30,
    left: 0,
    backgroundColor: 'transparent',
    top: 0,
    zIndex: 200,
    justifyContent: 'flex-start',
  },
  containerIos: {
    left: notificationSideMargin,
    top: 50,
  },
  containerAndroid: {
    left: notificationSideMargin - (notificationWidth + 2 * notificationSideMargin),
    top: 50,
  },
  boxWrapper: {
    width: '100%',
  },
})

const getConfigTime = (
  notificationConfig: Config,
  globalConfig: NotificationsConfig<VariantsMap>
) => {
  return (
    notificationConfig.config?.defaultNotificationTime ??
    globalConfig?.variants[notificationConfig.notificationType as string]?.config
      ?.defaultNotificationTime ??
    globalConfig.defaultNotificationTime
  )
}

type ConfigTypeKey = 'ios' | 'android'

const swipeConfigs: { [key in ConfigTypeKey]: SwipeConfig } = {
  ios: {
    direction: 'y',
    initialOffset: initialOffsetY,
    targetOffset: targetOffsetY,
    distanceThreshold: 50,
    velocityThreshold: 300,
  },
  android: {
    direction: 'x',
    initialOffset: initialOffsetX,
    targetOffset: targetOffsetX,
    distanceThreshold: width * 0.4,
    velocityThreshold: 2000,
  },
}

export default Notifications
