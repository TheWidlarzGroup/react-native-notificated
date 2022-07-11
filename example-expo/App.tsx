import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { DefaultExamples } from './src/screens/DefaultExamples'
import { createNotifications } from '../src/index'

const { NotificationsProvider } = createNotifications({
  duration: 1000,
  notificationPosition: 'top',
})

export default function App() {
  return (
    <>
      <NotificationsProvider>
        <SafeAreaView style={styles.container}>
          <DefaultExamples />
        </SafeAreaView>
      </NotificationsProvider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
