import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import {
  createNotifications,
  ZoomInDownZoomOutUp,
  SlideInLeftSlideOutRight,
  ZoomInDownZoomOutDown,
  RotateInRotateOut,
  RotateZIn,
} from 'react-native-notification'

const { NotificationsProvider, notify } = createNotifications({
  animationConfig: SlideInLeftSlideOutRight,
})

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />
      <Text
        onPress={() =>
          notify('success', {
            message: 'success message',
            title: 'success',
            notifyAnimationConfig: ZoomInDownZoomOutUp,
          })
        }>
        ZoomInDown ZoomOutUp
      </Text>

      <Text
        onPress={() =>
          notify('success', {
            message: 'success message',
            title: 'success',
            notifyAnimationConfig: ZoomInDownZoomOutDown,
          })
        }>
        ZoomInDown ZoomOutDown
      </Text>

      <Text
        onPress={() =>
          notify('success', {
            message: 'success message',
            title: 'success',
            notifyAnimationConfig: RotateInRotateOut,
          })
        }>
        Rotate
      </Text>

      <Text
        onPress={() =>
          notify('success', {
            message: 'success message',
            title: 'success',
            notifyAnimationConfig: RotateZIn,
          })
        }>
        Rotate Z
      </Text>

      <Text onPress={() => notify('success', { message: 'success message', title: 'success' })}>
        emit success
      </Text>
      <Text onPress={() => notify('error', { message: 'error message', title: 'error' })}>
        emit error
      </Text>
      <Text onPress={() => notify('warning', { message: 'warning message', title: 'warning' })}>
        emit warning
      </Text>
      <Text
        onPress={() =>
          notify('undo', {
            message: 'undo message',
            title: 'undo',
            onPress: () =>
              notify('success', { message: 'undo action success', title: 'undo action success' }),
          })
        }>
        emit undo
      </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column-reverse',
    marginBottom: 40,
  },
})

export default App
