import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { DefaultExamples } from './src/screens/DefaultExamples'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { createNotifications } from 'react-native-notificated'

const { NotificationsProvider } = createNotifications({
  isNotch: true,
})

export default function App() {
  return (
    <GestureHandlerRootView style={styles.gestureHandlerWrapper}>
      <NotificationsProvider />
      <SafeAreaView style={styles.container}>
        <DefaultExamples />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  gestureHandlerWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
