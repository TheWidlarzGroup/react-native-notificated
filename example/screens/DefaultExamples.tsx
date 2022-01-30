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

const { useNotifications, NotificationsProvider } = createNotifications()

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
              description: 'This is where the toast text goes',
              title: 'Success',
            }).id
          )
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
      <ModifyButton
        onPress={() =>
          modify(id, {
            params: { id: id, title: 'Modified title', description: 'Modified description' },
          })
        }
      />
      <RemoveButton onPress={() => remove(id)} />
    </SafeAreaView>
  )
}
