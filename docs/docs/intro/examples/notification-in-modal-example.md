---
sidebar_position: 8
---

# 🪶 Notifcation In Modal Example

<br/>

Code has been already described step by step in the [DEFAULT EXAMPLES](./default-examples.md) section, so I think there is no use to do it here again.

Here we have only a few differences I need to mention, and they are minimal:

- we use `modify()` and `remove()` only in the [DEFAULT EXAMPLES](./default-examples.md) because their usage is limited, and the explanation there is all we need to know. We can remove the notification, or modify it, and therefore we will not be using them here and in the other examples as well. For that same reason, we will not be using `useState` and `useNotificationController` here.
- we filled the `style` object in every notification. To read more about the single notification properties please go to the [SINGLE NOTIFICATION CONFIG](../default-variants-config/props-config.md) section.
  <br/>

In fact that's the only differences between Default Examples and Notification In Modal Example.<br/>
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
import { ModifyButton } from '../components/basicExamples/ModifyButton'
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

export const NotificationInModalExample = () => {
  const { notify, modify } = useNotifications()
  const [id, setId] = useState('')
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
```

<br/>

## Conclusion

To display notifications over modal we have to use additional NotificationProvider. But because of how the library is built, it will result with multiple notifications being displayed (each for every NotificationProvider). To address this problem, we need to pass additional props to our NotificationProvider and notify function which are called: **providerID** and **customID**.

What we should remember is that we mustn't pass **customID** without **providerID** and we shouldn't pass any of those if we have only one NotificationProvider in the application.

We also have props called **notificationTopPosition**. In other example we are using **notificationPosition** but because styling in modal isn't so simple and we don't know what your modal looks like you have to pass notificationTopPosition by yourself. Keep in mind that notificationTopPosition={0} will render notification on top of your modal.
