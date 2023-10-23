---
sidebar_position: 2
---

# 📏 Notification width

####

## 🎛 Changing width

You can change the width of the notifications displayed on the screen. <br/>

By default, the `notificationWidth` is set to 343 pixels. If you don't specify a value for `notificationWidth`, notifications will default to this width.

If the value you provide for `notificationWidth` exceeds the device's width, the notification's width will be adjusted to the device width minus the margin value.

Depending on whether you want to change the notification width for the whole app or only change it for a certain notification, you can either:

<br/>

### Set the width for all notifications in the global config object:

```jsx
import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { createNotifications } from 'react-native-notificated'
import { styles } from './styles'

const { NotificationsProvider, useNotifications } = createNotifications({
  notificationWidth: 400,
})

export const ExampleNotification = () => {
  const { notify } = useNotifications()

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />
      <Text
        onPress={() =>
          notify('error', {
            params: {
              description: 'This is where the toast text goes. ',
              title: 'Error',
            },
          })
        }>
        Emit error
      </Text>
    </SafeAreaView>
  )
}
```

"Now, all notifications in the application will be 400 pixels wide because we've set the `notificationWidth` value to 400."

<br/>
<br/>

### Set the position locally inside config object in a single notification instance:

```jsx
import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { createNotifications } from 'react-native-notificated'
import { styles } from './styles'

const { NotificationsProvider, useNotifications } = createNotifications({
  notificationWidth: 400,
})

export const ExampleNotification = () => {
  const { notify } = useNotifications()

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />
      <Text
        onPress={() =>
          notify('error', {
            params: {
              description: 'This is where the toast text goes',
              title: 'Error',
            },
            config: {
              notificationWidth: 500,
            },
          })
        }>
        Emit error
      </Text>
    </SafeAreaView>
  )
}
```

Now, all notifications in the app will be displayed with a width of 400 pixels, except for the `error` notification mentioned in the previous example.<br />
That `error` notification will have a width of 500 pixels because local configuration overrides the global setting.<br />
Of course, if you prefer, you can set the width locally without adjusting the global setting.<br/>
(You can read more about props overwriting in the [ORDER OF SETTINGS OVERWRITING](../comprehensive-configuration/order-of-settings-overwriting) section)

<br/>
<br/>

## 🔦 Position config priority

For each subsequent notification, the library looks for a notification width in the following order:

1. First, it looks for a config defined in `notify` payload
2. Secondly, it looks for a global config from `createNotification`
3. At last, when no config is found, it uses the default behavior, which is 343 pixels

<br/>
