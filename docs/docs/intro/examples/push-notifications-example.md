---
sidebar_position: 7
---

# 📭 Push notifications example

Here's an example of how you can handle push notifications in your application (when in foreground) using [Firebase](https://rnfirebase.io/)
Let's go then! 💪

## 💡 Setup

Before we jump into setup proccess, make sure that you have created a new firebase project. You will need it later to send push notifications. If you haven't done it yet, you can do it [here](https://console.firebase.google.com/).

With a new firebase project created, it's time to proceed with installation of these two packages that will be necessary to handle push notifications:

- [@react-native-firebase](https://rnfirebase.io/#prerequisites)
- [@react-native-firebase/messaging](https://rnfirebase.io/messaging/usage#installation)

:::info
Documentation clearly describes the whole process of installation, so I will not focus on it here.
Before proceeding to the next step, make sure you have done all previous steps.
:::

## 👀 Example Implementation

### App in Foreground

To handle push notifications in foreground we have to create a listener which will subscribe for all incoming firebase push events.
We can do this by using `messaging().onMessage()` from `@react-native-firebase/messaging`. Method `onMessage()` takes an asynchronous function as a parameter, with an argument which is the push notification payload. Now we can use this data to set our in-app notification with a `notify()`:

```jsx
// ** imports
import messaging from '@react-native-firebase/messaging'
import { useNotifications } from 'react-native-notificated'

export const App = () => {
  const { notify } = useNotifications()

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      notify('info', {
        params: {
          title: remoteMessage.notification?.title || 'defalut title',
          description: remoteMessage.notification?.body,
        },
      })
    })

    return unsubscribe
  }, [notify])

  return // Some JSX
}
```
