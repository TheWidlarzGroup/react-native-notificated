import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { notify, Notifications } from 'react-native-notification'

const App = () => {
  return (
    <SafeAreaView>
      <Notifications/>
      <Text onPress={() => notify({ type: undefined })}>Time Event</Text>
      {/*<Text onPress={removeHelloEvent}>Remove Event</Text>*/}
    </SafeAreaView>
  )
}

export default App
