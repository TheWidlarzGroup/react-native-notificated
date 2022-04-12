import React from 'react'
import { SafeAreaView } from 'react-native'
import { createNotifications } from 'react-native-notification'
import { SuccessButton } from '../components/basicExamples/SuccessButton'
import { ErrorButton } from '../components/basicExamples/ErrorButton'
import { styles } from './styles'
import { View } from 'react-native'

const { useNotifications, NotificationsProvider } = createNotifications({
  variants: {
    custom_success: {
      component: View,
    },
    custom_error: {
      component: View,
    },
  },
  isNotch: true,
})

export const CustomCase = () => {
  const { notify } = useNotifications()

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />

      <SuccessButton
        onPress={() =>
          notify('custom_success', {
            params: {
              description: 'This is where the toast text goes',
              title: 'Success',
            },
          })
        }
      />

      <ErrorButton
        onPress={() =>
          notify('custom_error', {
            params: {
              description: 'This is where the toast text goes. ',
              title: 'Error',
            },
            config: {
              duration: 2000,
            },
          })
        }
      />
    </SafeAreaView>
  )
}
