import React from 'react'
import { SafeAreaView } from 'react-native'
import { createNotifications } from 'react-native-notification'
import { Success } from '../components/singleCustomCases/Success'
import { Error } from '../components/singleCustomCases/Error'
import { Warning } from '../components/singleCustomCases/Warning'
import { Info } from '../components/singleCustomCases/Info'
import { styles } from './styles'

const { NotificationsProvider } = createNotifications()

export const SingleCustomCases = () => {
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
