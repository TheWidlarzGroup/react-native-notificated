import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import {
  createNotifications,
  RotateZIn,
  ZoomInDownZoomOutUp,
  ZoomInDownZoomOutDown,
  RotateInRotateOut,
  SlideInLeftSlideOutRight,
} from 'react-native-notification'

const { NotificationsProvider, useNotifications } = createNotifications()

export const Home = () => {
  const { notify, modify, remove } = useNotifications()
  const [id, setId] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />

      <Text style={styles.title}>Animations showcase:</Text>
      <Text
        onPress={() =>
          notify('success', {
            ...baseNotifyConfig,
            notifyAnimationConfig: SlideInLeftSlideOutRight,
          })
        }>
        Slide In
      </Text>
      <Text
        onPress={() =>
          notify('success', {
            ...baseNotifyConfig,
            notifyAnimationConfig: ZoomInDownZoomOutUp,
          })
        }>
        Zoom In (opposite directions)
      </Text>
      <Text
        onPress={() =>
          notify('success', {
            ...baseNotifyConfig,
            notifyAnimationConfig: ZoomInDownZoomOutDown,
          })
        }>
        Zoom In
      </Text>
      <Text
        onPress={() =>
          notify('success', {
            ...baseNotifyConfig,
            notifyAnimationConfig: RotateInRotateOut,
          })
        }>
        Rotate In
      </Text>
      <Text
        onPress={() =>
          notify('success', {
            ...baseNotifyConfig,
            notifyAnimationConfig: RotateZIn,
          })
        }>
        Rotate with 3D
      </Text>

      <View style={styles.divider} />
      <Text
        onPress={() =>
          setId(
            notify('success', {
              description: 'This is where the toast text goes',
              title: 'Success',
            }).id
          )
        }>
        emit success
      </Text>
      <Text
        onPress={() =>
          notify('error', {
            description:
              'This is where the toast text goes. This is where the toast text goes. This is where the toast text goes. This is where the toast text goes. This is where the toast text goes. This is where the toast text goes. ',
            title: 'Neutral title',
          })
        }>
        emit error
      </Text>
      <Text
        onPress={() =>
          notify('warning', {
            description: 'This is where the toast text goes',
            title: 'Warning',
          })
        }>
        emit warning
      </Text>
      <Text
        onPress={() =>
          notify('info', {
            description: 'This is where the toast text goes',
            title: 'Info',
          })
        }>
        emit info
      </Text>
      <Text onPress={() => remove(id)}>Remove {id}</Text>
      <Text onPress={() => modify({ id, params: { title: 'New title' } })}>Modify {id}</Text>
    </SafeAreaView>
  )
}

const baseNotifyConfig = {
  description: 'Placeholder text',
  title: 'Showcase them animations!',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  divider: {
    marginTop: 8,
    marginBottom: 8,
    width: '70%',
    borderBottomWidth: 2,
    borderBottomColor: '#fefefe',
  },
})
