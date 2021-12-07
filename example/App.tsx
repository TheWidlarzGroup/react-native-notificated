import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { useNotificationEvent, useNotifications } from 'react-native-notification'

interface TimeNotificationPayload {
  time: Date
}

const eventType = 'TIME'
const eventPayload: TimeNotificationPayload = { time: new Date() }
const eventCallback = (p?: TimeNotificationPayload) => console.log('It is here!', p?.time)

const App = () => {
  const removeHelloEvent = useNotificationEvent(eventType, eventCallback)
  const { emit } = useNotifications()

  return (
    <SafeAreaView>
      <Text onPress={() => emit(eventType, eventPayload)}>Time Event</Text>
      <Text onPress={removeHelloEvent}>Remove Event</Text>
    </SafeAreaView>
  )
}

export default App
