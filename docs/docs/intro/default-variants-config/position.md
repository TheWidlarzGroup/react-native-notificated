---
sidebar_position: 2
---

# 🪄 Notification position
####

## 🎛 Changing position

You can change the position of the notifications displayed on the screen. <br/>
There are three possible options to choose from:

- `top` - at the top of the screen
- `center` - at the middle of the screen (y-axis)
- `bottom`- at the bottom of the screen

The default setting for the `notificationPosition` is the `top` value.

Depending on whether you want to change the notification position for the whole app or only change it for a certain notification, you can either:

<br/>

### Set the position for all notifications in the global config object:

```jsx
import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { createNotifications } from 'react-native-notificated'
import { styles } from './styles'

const { NotificationsProvider, useNotifications } = createNotifications({
  notificationPosition: 'center',
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

Now all the notifications in the app will be displayed in the middle of the screen (y-axis) because we have set the `notificationPosition` value for the `center`.

<br/>
<br/>


### Set the position locally inside config object in a single notification instance:

```jsx
import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { createNotifications } from 'react-native-notificated'
import { styles } from './styles'

const { NotificationsProvider, useNotifications } = createNotifications({
  notificationPosition: 'center',
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
              notificationPosition: 'bottom',
            },
          })
        }>
        Emit error
      </Text>
    </SafeAreaView>
  )
}
```

Now, all the notifications in the app (instead of this one `error` notification in the example above) will be displayed in the middle of the screen (y-axis).<br />
But the `error` notification from the example above will be displayed at the bottom of the screen because the local config overwrites the global config.<br/>
Of course, we can just set it locally, there is no need to set it globally if we don't need to. <br/>
(You can read more about props overwriting in the [ORDER OF SETTINGS OVERWRITING](../comprehensive-configuration/order-of-settings-overwriting) section)

<br/>
<br/>

## 🔦 Position config priority

For each subsequent notification, the library looks for a notification position in the following order:

1. First, it looks for a config defined in `notify` payload
2. Secondly, it looks for a global config from `createNotification`
3. At last, when no config is found, it uses the default behavior, which is `top`

<br/>
