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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotificationsProvider />
      <SafeAreaView style={styles.container}>
        <DefaultExamples />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
