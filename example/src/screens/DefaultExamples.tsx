import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { createNotifications } from 'react-native-notificated'
import { SuccessButton } from '../components/basicExamples/SuccessButton'
import { ErrorButton } from '../components/basicExamples/ErrorButton'
import { WarningButton } from '../components/basicExamples/WarningButton'
import { InfoButton } from '../components/basicExamples/InfoButton'
import { ModifyButton } from '../components/basicExamples/ModifyButton'
import { RemoveButton } from '../components/basicExamples/RemoveButton'
import { styles } from './styles'

const { useNotifications, NotificationsProvider } = createNotifications({
  notificationWidth: 300,
  defaultStylesSettings: {
    globalConfig: {
      titleSize: 30,
    },
    successConfig: {
      notificationPosition: 'center',
      titleSize: 20,
    },
    errorConfig: {
      notificationPosition: 'bottom',
      titleSize: 10,
    },
  },
})

export const DefaultExamples = () => {
  const { notify, remove, modify } = useNotifications()
  const [id, setId] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />

      <SuccessButton
        onPress={() =>
          setId(
            notify('success', {
              params: {
                description: 'This is where the toast text goes.',
                title: 'Success',
                style: {
                  titleSize: 10,
                },
              },
              config: {
                duration: 2000,
                notificationPosition: 'top-right',
                notificationWidth: 200,
              },
            }).id
          )
        }
      />

      <ErrorButton
        onPress={() =>
          notify('error', {
            params: {
              description: 'This is where the toast text goes.',
              title: 'Error',
              style: {
                titleSize: 20,
              },
            },
            config: {
              duration: 2000,
              notificationPosition: 'top',
              notificationWidth: 2000,
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
            config: {
              notificationPosition: 'bottom-left',
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
              notificationPosition: 'bottom-right',
            },
          })
        }
      />

      <ModifyButton
        onPress={() =>
          modify(id, {
            params: { title: 'Modified title', description: 'Modified description' },
          })
        }
      />

      <RemoveButton onPress={() => remove(id)} />
    </SafeAreaView>
  )
}
