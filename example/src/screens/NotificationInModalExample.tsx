import React, { useState } from 'react'
import { SafeAreaView, Text } from 'react-native'
import Modal from 'react-native-modal'
import { createNotifications } from 'react-native-notificated'
import { SuccessButton } from '../components/basicExamples/SuccessButton'
import { ErrorButton } from '../components/basicExamples/ErrorButton'
import { WarningButton } from '../components/basicExamples/WarningButton'
import { InfoButton } from '../components/basicExamples/InfoButton'
import { ModifyButton } from '../components/basicExamples/ModifyButton'
import { RemoveButton } from '../components/basicExamples/RemoveButton'
import { styles } from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'

const { useNotifications, NotificationsProvider } = createNotifications({
  notificationPosition: 'top',
  defaultStylesSettings: {
    errorConfig: {
      notificationPosition: 'bottom',
    },
  },
})

const { NotificationsProvider: NotificationsProvider2 } = createNotifications({
  notificationPosition: 'top',
  defaultStylesSettings: {
    errorConfig: {
      notificationPosition: 'bottom',
    },
  },
})

export const NotificationInModalExample = () => {
  const { notify, modify } = useNotifications()
  const [id, setId] = useState('')
  const [isModalOpened, setIsModalOpened] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider2 />

      <TouchableOpacity onPress={() => setIsModalOpened(true)} style={styles.modalButton}>
        <Text style={styles.modalButtonsText}>Open Modal</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalOpened}
        onBackdropPress={() => setIsModalOpened(false)}
        style={styles.modal}>
        <NotificationsProvider providerID="id1" notificationTopPosition={-80} />

        <TouchableOpacity onPress={() => setIsModalOpened(false)} style={styles.modalButton}>
          <Text style={styles.modalButtonsText}>Close Modal</Text>
        </TouchableOpacity>

        <SuccessButton
          onPress={() =>
            setId(
              notify('success', {
                params: {
                  description: 'This is where the toast text goes',
                  title: 'Success',
                  customID: 'id1',
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
                customID: 'id1',
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
                customID: 'id1',
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
                customID: 'id1',
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
              params: { title: 'Modified title', description: 'Modified description' },
            })
          }
        />
      </Modal>
    </SafeAreaView>
  )
}
