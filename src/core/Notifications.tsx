import React from 'react'
import { StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { LongPressGestureHandler, PanGestureHandler } from 'react-native-gesture-handler'
import { useTimer } from '../hooks/useTimer'
import { useAnimationControl } from '../hooks/useAnimationControl'
import { VariantsRenderer } from './VariantsRenderer'
import { useNotificationEventHandler } from './useNotificationEventHandler'
import { useNotificationsStates } from './useNotificationsStates'
import Constants from './constants'
import { swipeConfigs } from './config'

// TODO: add fetching animation config from variants to the chain

export const Notifications = () => {
  const state = useNotificationsStates()

  const animationAPI = useAnimationControl({
    duration: state.duration,
    animationConfig: state.animationConfig,
    config: Constants.isAndroid ? swipeConfigs.android : swipeConfigs.ios,
  })
  const { clearTimer, resetTimer } = useTimer()

  useNotificationEventHandler({
    present: animationAPI.present,
    dismiss: animationAPI.dismiss,
    notificationConfig: state.notificationConfig,
    notificationsQueue: state.notificationsQueue,
    setNotificationsQueue: state.setNotificationsQueue,
  })

  return (
    <PanGestureHandler
      ref={state.panHandlerRef}
      simultaneousHandlers={state.longPressHandlerRef}
      onGestureEvent={animationAPI.dragGestureHandler}
      onHandlerStateChange={animationAPI.handleStateChange}>
      <Animated.View
        onLayout={(e) => state.setNotificationHeight(e.nativeEvent.layout.height)}
        testID="notificationsContainer"
        style={[
          animationAPI.animatedStyles,
          styles.container,
          { top: state.topOffset },
          Constants.isAndroid ? styles.containerAndroid : styles.containerIos,
        ]}>
        <Animated.View style={[animationAPI.dragStyles]}>
          {state.notificationConfig && (
            <LongPressGestureHandler
              minDurationMs={0}
              maxDist={Constants.maxLongPressDragDistance}
              ref={state.longPressHandlerRef}
              simultaneousHandlers={state.panHandlerRef}
              onActivated={() => {
                animationAPI.cancelTransitionAnimation()
                clearTimer()
              }}
              onEnded={() => {
                animationAPI.revokeTransitionAnimation()

                if (animationAPI.currentTransitionType.value === 'in') {
                  resetTimer(animationAPI.dismiss, state.duration)
                }

                if (animationAPI.currentTransitionType.value === 'idle_active') {
                  resetTimer(animationAPI.dismiss, state.duration)
                }
              }}>
              <View style={styles.boxWrapper}>
                <VariantsRenderer
                  config={state.notificationsConfigs}
                  notificationConfig={state.notificationConfig}
                />
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
    width: Constants.notificationWidth,
    minHeight: 30,
    left: 0,
    backgroundColor: 'transparent',
    top: 0,
    zIndex: 200,
    justifyContent: 'flex-start',
  },
  containerIos: {
    left: Constants.notificationSideMargin,
    top: 50,
  },
  containerAndroid: {
    left: Constants.notificationSideMargin,
    top: 30,
  },
  boxWrapper: {
    width: '100%',
  },
})
