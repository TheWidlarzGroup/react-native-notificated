import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { useNotificationEvent, useNotifications } from 'react-native-notification'

const eventType = 'Hello'
const callback = () => console.log('It is here!', Date.now())

const App = () => {
  const removeHelloEvent = useNotificationEvent(eventType, callback)
  const { emit } = useNotifications()

  return (
    <SafeAreaView>
      <Text onPress={() => emit('Hello')}>Hello it is me</Text>
      <Text onPress={removeHelloEvent}>Remove Event</Text>
    </SafeAreaView>
  )
}

export default App
