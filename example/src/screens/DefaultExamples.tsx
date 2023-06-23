import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
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

const { useNotifications: useNotifications2, NotificationsProvider: NotificationsProvider2 } =
  createNotifications({
    notificationPosition: 'top',
    defaultStylesSettings: {
      errorConfig: {
        notificationPosition: 'bottom',
      },
    },
  })

export const DefaultExamples = () => {
  const { notify, remove, modify } = useNotifications()
  const { notify: notify2, remove: remove2, modify: modify2 } = useNotifications2()
  const [id, setId] = useState('')
  const [isModalOpened, setIsModalOpened] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider2 />
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
            params: { title: 'Modified title', description: 'Modified description' },
          })
        }
      />

      <RemoveButton onPress={() => remove(id)} />
      <TouchableOpacity onPress={() => setIsModalOpened(true)} style={styles.modalButton}>
        <Text>Open Modal</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalOpened}
        onBackdropPress={() => setIsModalOpened(false)}
        style={styles.modal}>
        <NotificationsProvider providerID="id1" />

        <TouchableOpacity onPress={() => setIsModalOpened(false)} style={styles.modalButton}>
          <Text>Close Modal</Text>
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
                config: {
                  notificationPosition: 'center',
                },
              }).id
            )
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
