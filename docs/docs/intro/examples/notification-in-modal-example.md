---
sidebar_position: 8
---

# 🪶 Notifcation In Modal Example

<br/>

Code has been already described step by step in the [DEFAULT EXAMPLES](./default-examples.md) section, so I think there is no use to do it here again.

In fact the only differences between Default Examples and Notification In Modal Example are:

1. We are using an additional **ModalNotificationsProvider**.
2. We are passing **isModalNotification** to notify function.
3. We can use **notificationTopPosition** as **ModalNotificationsProvider** props to change position of our notification.

Let's take a look at the code:

## Code

```tsx
import React, { useState } from 'react'
import { SafeAreaView, Text } from 'react-native'
import Modal from 'react-native-modal'
import { createNotifications } from 'react-native-notificated'
import { SuccessButton } from '../components/basicExamples/SuccessButton'
import { ErrorButton } from '../components/basicExamples/ErrorButton'
import { WarningButton } from '../components/basicExamples/WarningButton'
import { InfoButton } from '../components/basicExamples/InfoButton'
import { styles } from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'

const { useNotifications, NotificationsProvider, ModalNotificationsProvider } =
  createNotifications()

export const NotificationInModalExample = () => {
  const { notify } = useNotifications()
  const [isModalOpened, setIsModalOpened] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />

      <TouchableOpacity onPress={() => setIsModalOpened(true)} style={styles.modalButton}>
        <Text style={styles.modalButtonsText}>Open Modal</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalOpened}
        onBackdropPress={() => setIsModalOpened(false)}
        style={styles.modal}>
        <ModalNotificationsProvider notificationTopPosition={0} />

        <TouchableOpacity onPress={() => setIsModalOpened(false)} style={styles.modalButton}>
          <Text style={styles.modalButtonsText}>Close Modal</Text>
        </TouchableOpacity>

        <SuccessButton
          onPress={() =>
            notify('success', {
              params: {
                description: 'This is where the toast text goes',
                title: 'Success',
                isModalNotification: true,
              },
            }).id
          }
        />
        <ErrorButton
          onPress={() =>
            notify('error', {
              params: {
                description: 'This is where the toast text goes. ',
                title: 'Error',
                isModalNotification: true,
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
                isModalNotification: true,
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
                isModalNotification: true,
              },
              config: {
                notificationPosition: 'bottom',
              },
            })
          }
        />
      </Modal>
    </SafeAreaView>
  )
}
```

<br/>

## Conclusion

To display notifications over modal we have to use additional ModalNotificationsProvider. But because of how the library is built, it will result with multiple notifications being displayed (each for every NotificationsProvider or ModalNotificationsProvider). To address this problem, we need to pass additional property to notify function params: **isModalNotification:true**.

You shouldn't pass isModalNotification to notify function if you are not using it with ModalNotificationsProvider as it won't work at all.

We also have props called **notificationTopPosition**. In other examples we are using **notificationPosition** but because styling in modal isn't so simple and we don't know what your modal looks like you have to pass notificationTopPosition by yourself. Keep in mind that notificationTopPosition={0} will render notification on top of your modal.

This is probably a temporary solution until we find something that will work globaly and out of the box.
