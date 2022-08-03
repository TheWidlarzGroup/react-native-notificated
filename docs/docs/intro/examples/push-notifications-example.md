---
sidebar_position: 7
---

# 📭 Push notifications example

<br/>
    We prepared examples of how to implement push notifications in Your app, using <a href="https://rnfirebase.io/">raect native firebase</a>.<br/>
    Let's go then! 💪 
<br/>

## 💡 Setup

<br/>
    Before we jump into setup proccess, make sure that you have created a new firebase project. We will need it later. 
    If you haven't done it yet, you can do it <a href="https://console.firebase.google.com/">here</a>. 
<br/>
<br/>
    Ok, after we have created a new firebase project, it's time to proceed to installing two packages that will be necessary to handle push notifications:
    <br/>- <a href="https://rnfirebase.io/#prerequisites">@react-native-firebase/app</a>
    <br/>- <a href="https://rnfirebase.io/messaging/usage#installation">@react-native-firebase/messaging</a>
    <br/>
    <br/> 
<br/>

:::info
Documentation clearly describes the whole process of installation, so I will not focus on it here.
Before proceeding to the next step, make sure you have done all previous steps.

:::

### ❗Extra step for IOS

<br/>
    TODO  
<br/>

## 👀 Example Implementation

### App in Foreground

To handle push notifications in foreground we have to create a listener which will listen for incoming calls from firebase.
We can do this by using `messaging().onMessage()` from `@react-native-firebase/messaging`. Method `onMessage()`
takes asynchronous functions as a parameter and pass to it, as a result of promise, object with push notification message.
Now we can use this result object to set our notification with `notify()`. Below You will find basic example how to handle it:

<br/>

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
