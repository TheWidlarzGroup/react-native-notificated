import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging'
import { AppNavigator } from './src/navigation'
import { useNotifications } from 'react-native-notificated'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
  const { notify } = useNotifications()

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      notify('info', {
        params: {
          title: remoteMessage.notification?.title || '',
          description: remoteMessage.notification?.body,
        },
      })
    })

    return unsubscribe
  }, [notify])

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  )
}

export default App
