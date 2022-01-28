import React from 'react'
import { SafeAreaView } from 'react-native'
import { createNotifications } from 'react-native-notification'
import { SuccessButton } from '../components/basicExamples/SuccessButton'
import { ErrorButton } from '../components/basicExamples/ErrorButton'
import { WarningButton } from '../components/basicExamples/WarningButton'
import { InfoButton } from '../components/basicExamples/InfoButton'
import { styles } from './styles'

const { useNotifications, NotificationsProvider } = createNotifications({
  defaultStylesSettings: {
    darkMode: true,
  },
})

export const DarkModeExamples = () => {
  const { notify } = useNotifications()

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />
      <SuccessButton
        onPress={() =>
          notify('success', {
            description: 'This is where the toast text goes',
            title: 'Success',
          })
        }
      />
      <ErrorButton
        onPress={() =>
          notify('error', {
            description: 'This is where the toast text goes. ',
            title: 'Error',
          })
        }
      />
      <WarningButton
        onPress={() =>
          notify('warning', {
            description: 'This is where the toast text goes',
            title: 'Warning',
          })
        }
      />
      <InfoButton
        onPress={() =>
          notify('info', {
            description: 'This is where the toast text goes.',
            title: 'Info',
          })
        }
      />
    </SafeAreaView>
  )
}
