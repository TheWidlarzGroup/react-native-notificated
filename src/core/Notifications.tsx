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

import type { CustomAnimationConfig } from '../types/animations'
import type { EmitParam } from './createNotifications'

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
  const resetToCurrentTimer = () => resetTimer(dismiss, getConfigTime(notificationConfig))

  const [notificationsQueue, setNotificationsQueue] = useState<Config[]>([])
  const notificationConfig = notificationsQueue[0]

  const animationConfig: CustomAnimationConfig =
    notificationConfig?.animationConfig || notificationsConfigs?.animationConfig

  const onTransitionInAnimationFinished = useCallback(() => {
    const targetTime = getConfigTime(notificationConfig)
    resetTimer(dismiss, targetTime)
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
    [present, dismiss, resetTimer, animationConfig]
  )

  useEffect(() => {
    if (notificationConfig) {
      handleNewNotification(notificationConfig)
    }
  }, [notificationConfig])

  const popNotification = useCallback(() => {
    setNotificationsQueue((prev) => {
      const updatedNotificationsQueue = prev.filter((_, index: number) => index !== 0)

      return updatedNotificationsQueue
    })
  }, [handleNewNotification])

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
        testID="notificationsContainer"
        style={[
          styles.container,
          isAndroid ? styles.containerAndroid : styles.containerIos,
          animatedStyles,
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
                {/*<Pressable onPress={onNotificationPress(notificationConfig.onPress)}>*/}
                {/*<InAppNotification {...{ notificationConfig }} />*/}
                {/*</Pressable>*/}
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
    top: 100,
  },
  containerAndroid: {
    left: notificationSideMargin - (notificationWidth + 2 * notificationSideMargin),
    top: true ? 10 : 0,
  },
  boxWrapper: {
    width: '100%',
  },
})

const getConfigTime = (_: any) => {
  return 3000
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
