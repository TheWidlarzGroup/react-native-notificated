import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { createNotifications } from 'react-native-notification'
import { styles } from './styles'

const { useNotifications, NotificationsProvider } = createNotifications({
  defaultStylesSettings: {
    darkMode: true,
    globalConfig: {},
    successConfig: {},
    errorConfig: {},
    warningConfig: {},
    infoConfig: {},
  },
})

export const GlobalConfigExamples = () => {
  const { notify } = useNotifications()

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />
      <Text
        onPress={() =>
          notify('error', {
            description: 'This is where the toast text goes. ',
            title: 'Error',
          })
        }>
        Emit error
      </Text>
      <Text
        onPress={() =>
          notify('success', {
            description: 'This is where the toast text goes. ',
            title: 'Success',
          })
        }>
        Emit success
      </Text>
    </SafeAreaView>
  )
}
