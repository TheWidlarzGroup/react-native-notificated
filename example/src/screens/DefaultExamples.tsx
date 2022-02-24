import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { createNotifications, useNotificationController } from 'react-native-notification'
import { SuccessButton } from '../components/basicExamples/SuccessButton'
import { ErrorButton } from '../components/basicExamples/ErrorButton'
import { WarningButton } from '../components/basicExamples/WarningButton'
import { InfoButton } from '../components/basicExamples/InfoButton'
import { ModifyButton } from '../components/basicExamples/ModifyButton'
import { RemoveButton } from '../components/basicExamples/RemoveButton'
import { styles } from './styles'

const { useNotifications, NotificationsProvider } = createNotifications({
  isNotch: true,
  notificationPosition: 'top',
  defaultStylesSettings: {
    errorConfig: {
      notificationPosition: 'bottom',
    },
  },
})

export const DefaultExamples = () => {
  const [id, setId] = useState('')
  const { notify } = useNotifications()
  const { remove, modify } = useNotificationController()

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />

      <SuccessButton
        onPress={() =>
          setId(
            notify('success', {
              params: {
                description: 'This is where the toast text goes',
                title: 'Success',
              },
            }).id
          )
        }
      />

      <ErrorButton
        onPress={() =>
          notify('error', {
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

      <WarningButton
        onPress={() =>
          notify('warning', {
            params: {
              description: 'This is where the toast text goes',
              title: 'Warning',
            },
          })
        }
      />

      <InfoButton
        onPress={() =>
          notify('info', {
            params: {
              description: 'This is where the toast text goes.',
              title: 'Info',
            },
            config: {
              notificationPosition: 'bottom',
            },
          })
        }
      />

      <ModifyButton
        onPress={() =>
          modify(id, {
            params: {
              params: { id: id, title: 'Modified title', description: 'Modified description' },
            },
          })
        }
      />

      <RemoveButton onPress={() => remove(id)} />
    </SafeAreaView>
  )
}
