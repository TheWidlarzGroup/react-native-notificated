import React from 'react'
import { SafeAreaView } from 'react-native'
import { createNotifications } from 'react-native-notification'
import { SuccessButton } from '../components/basicExamples/SuccessButton'
import { ErrorButton } from '../components/basicExamples/ErrorButton'
import { styles } from './styles'
import { CustomSuccess } from '../components/customVariants/CustomSuccess'
import { CustomError } from '../components/customVariants/CustomError'

const { useNotifications, NotificationsProvider } = createNotifications({
  variants: {
    custom_success: {
      component: CustomSuccess,
      config: {
        notificationPosition: 'top',
      },
    },
    custom_error: {
      component: CustomError,
      config: {
        duration: 2000,
      },
    },
  },
  isNotch: true,
})

export const CustomCaseExamples = () => {
  const { notify } = useNotifications()

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />

      <SuccessButton
        onPress={() =>
          notify('custom_success', {
            params: {
              customTitle: 'This props is inferred from variants',
              callback: () => console.log('inferred params'),
            },
          })
        }
      />

      <ErrorButton
        onPress={() =>
          notify('custom_error', {
            params: {
              customTitle: 'custom error component',
              customText: 'infered',
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
