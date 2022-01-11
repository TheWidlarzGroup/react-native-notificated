import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { createNotifications } from 'react-native-notification'

const { NotificationsProvider, notify } = createNotifications()

export const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />
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
