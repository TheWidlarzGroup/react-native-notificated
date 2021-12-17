/** @format */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Dimensions, Platform, StyleSheet, View, Pressable } from 'react-native'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { SwipeConfig, useSwipe } from '../hooks/useSwipe'
import { LongPressGestureHandler, PanGestureHandler } from 'react-native-gesture-handler'
import { InAppNotificationsConfig } from '../defaultConfig/defaultConfig'
import { InAppNotification } from './InAppNotification'
import { NotificationsEmitter } from 'react-native-notification'
import { themeBase } from '../defaultConfig/components/theme'
import type {NotificationConfig} from "../types/config";
import {useTimer} from "../hooks/useTimer";

const { width } = Dimensions.get('window')
const notificationWidth = width - themeBase.spacing.s * 2
const notificationSideMargin = themeBase.spacing.s
const initialOffsetX = -(notificationWidth + 2 * notificationSideMargin)
const initialOffsetY = -300
const targetOffsetX = width
const targetOffsetY = true ? 40 : 10
const isAndroid = Platform.OS === 'android'
const maxLongPressDragDistance = 300

const emitter = NotificationsEmitter

export const notify = (config: NotificationConfig) => {
  emitter.emit('add_notification', config)
}

export const Notifications = () => {
  const [notificationsQueue, setNotificationsQueue] = useState<NotificationConfig[]>([])
  const notificationConfig = notificationsQueue[0]

  const panHandlerRef = useRef(null)
  const longPressHandlerRef = useRef(null)

  const onSwipeBack = useCallback(() => {
    emitter.emit('pop_notification')
  }, [])

  const { distance, drag, swipeIn, swipeBack, handleGestureEvent, handleStateChange } = useSwipe({
    config: isAndroid ? swipeConfigs.android : swipeConfigs.ios,
    onSwipeBack,
  })

  const { clearTimer, resetTimer } = useTimer()

  const resetToCurrentTimer = () => resetTimer(swipeBack, getConfigTime(notificationConfig))

  const handleNewNotification = useCallback(
    (config: NotificationConfig) => {
      const targetTime = getConfigTime(config)
      resetTimer(swipeBack, targetTime)

      swipeIn()
    },
    [swipeIn, swipeBack, resetTimer]
  )

  const popNotification = useCallback(() => {
    setNotificationsQueue((prev) => {
      const updatedNotificationsQueue = prev.filter(
        (_: NotificationConfig, index: number) => index !== 0
      )

      if (updatedNotificationsQueue.length > 0) {
        const currentNotification = updatedNotificationsQueue[0]

        handleNewNotification(currentNotification)
      }

      return updatedNotificationsQueue
    })
  }, [handleNewNotification])

  useEffect(() => {
    emitter.addListener('add_notification', (config: NotificationConfig) => {
      setNotificationsQueue((prev) => {
        // Check if the unique id already in queue
        if (config?.id && prev.filter((notification) => notification?.id === config?.id)?.length) {
          return prev
        }

        if (prev.length === 0) {
          handleNewNotification(config)
        }
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
  }, [popNotification, swipeBack, swipeIn, handleNewNotification])

  const onNotificationPress = (clickAction?: () => void | undefined) => {
    if (clickAction) {
      return () => {
        swipeBack()
        clickAction()
      }
    }

    return undefined
  }

  const animatedStyles = useAnimatedStyle(() => {
    return isAndroid
      ? {
          transform: [{ translateX: distance.value + drag.value }],
        }
      : {
          transform: [
            {
              translateY:
                distance.value +
                interpolate(drag.value, [-10, 100], [-10, 0.05], {
                  extrapolateLeft: Extrapolate.IDENTITY,
                  extrapolateRight: Extrapolate.EXTEND,
                }),
            },
          ],
        }
  })

  return (
    <PanGestureHandler
      ref={panHandlerRef}
      simultaneousHandlers={longPressHandlerRef}
      onGestureEvent={handleGestureEvent}
      onHandlerStateChange={handleStateChange}>
      <Animated.View
        testID="notificationsContainer"
        style={[
          styles.container,
          isAndroid ? styles.containerAndroid : styles.containerIos,
          animatedStyles,
        ]}>
        {notificationConfig && (
          <LongPressGestureHandler
            maxDist={maxLongPressDragDistance}
            ref={longPressHandlerRef}
            simultaneousHandlers={panHandlerRef}
            onActivated={clearTimer}
            onEnded={resetToCurrentTimer}>
            <View style={styles.boxWrapper}>
              <Pressable onPress={onNotificationPress(notificationConfig.onPress)}>
                <InAppNotification {...{ notificationConfig }} />
              </Pressable>
            </View>
          </LongPressGestureHandler>
        )}
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
    top: 0,
  },
  containerAndroid: {
    left: notificationSideMargin - (notificationWidth + 2 * notificationSideMargin),
    top: true ? 10 : 0,
  },
  boxWrapper: {
    width: '100%',
  },
})

const getConfigTime = ({ time, msg }: NotificationConfig) => {
  if (time) {
    return time
  }
  return (msg ?? '').length > InAppNotificationsConfig.notificationMsgLengthTimerThreshold
    ? InAppNotificationsConfig.defaultNotificationTimeLong
    : InAppNotificationsConfig.defaultNotificationTime
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
