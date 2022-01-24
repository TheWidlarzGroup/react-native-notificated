import React from 'react'
import { SafeAreaView } from 'react-native'
import { createNotifications } from 'react-native-notification'
import { Success } from '../components/basicExamples/Success'
import { Error } from '../components/basicExamples/Error'
import { Warning } from '../components/basicExamples/Warning'
import { Info } from '../components/basicExamples/Info'
import { styles } from './styles'

export const { useNotifications, NotificationsProvider } = createNotifications({
  defaultStylesSettings: {
    globalConfig: {
      titleSize: 20,
      titleColor: '#4B0082',
      descriptionSize: 12,
      descriptionColor: '#4B0082',
      bgColor: '#FFFFF0',
      borderRadius: 25,
      accentColor: '#B0E0E6',
      borderWidth: 3,
      multiline: 5,
    },
  },
})

export const GlobalConfigExamples = () => {
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
