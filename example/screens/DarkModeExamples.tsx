import React from 'react'
import { SafeAreaView } from 'react-native'
import { createNotifications } from 'react-native-notification'
import { Success } from '../components/basicExamples/Success'
import { Error } from '../components/basicExamples/Error'
import { Warning } from '../components/basicExamples/Warning'
import { Info } from '../components/basicExamples/Info'
import { styles } from './styles'

const { NotificationsProvider } = createNotifications({
  defaultStylesSettings: {
    darkMode: true,
  },
})

export const DarkModeExamples = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />
      <Success />
      <Error />
      <Warning />
      <Info />
    </SafeAreaView>
  )
}
