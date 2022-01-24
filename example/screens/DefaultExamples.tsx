import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { createNotifications } from 'react-native-notification'
import { Success } from '../components/basicExamples/Success'
import { Error } from '../components/basicExamples/Error'
import { Warning } from '../components/basicExamples/Warning'
import { Info } from '../components/basicExamples/Info'
import { Modify } from '../components/basicExamples/Modify'
import { Remove } from '../components/basicExamples/Remove'
import { styles } from './styles'

const { NotificationsProvider } = createNotifications({
  defaultStylesSettings: {
    darkMode: true,
  },
})

export const DefaultExamples = () => {
  const [id, setId] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />
      <Success setId={setId} />
      <Error />
      <Warning />
      <Info />
      <Modify id={id} />
      <Remove id={id} />
    </SafeAreaView>
  )
}
