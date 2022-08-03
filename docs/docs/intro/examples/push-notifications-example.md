---
sidebar_position: 7
---

# 📭 Push notifications example

<br/>
    We prepared examples of how to implement push notifications in Your app, using <a href="https://rnfirebase.io/">Raect native firebase</a>.<br/>
    Let's go then! 💪 
<br/>

## Installation

<br/>
    Zanim przejdziemy do instalacji upewnij sie ze masz utworzony nowy projekt firbase, 
    który połaczymy z nasza aplikacją. Jezeli jeszcze tego nie zrobiłeś, mozesz to zrobic <a href="https://console.firebase.google.com/">tutaj</a>. 
<br/>
<br/>
    Po tym jak utworzylismy nowy projekt czas przejsc do instalacji dwwoch paczek ktore beda niezbedne do obslugi push notifikacji: 
    <br/>- <a href="https://rnfirebase.io/#prerequisites">@react-native-firebase/app</a>
    <br/>- <a href="https://rnfirebase.io/messaging/usage#installation">@react-native-firebase/messaging</a>
    <br/>
    <br/>
    💡 Dokumentacja swietnie opisuje caly proces ich instalacji dlatego nie bede sie nad tym skupial tutaj.
<br/>

#### Dodatkowy krok dla IOS

<br/>
    Żeby korzystac z push notifikacji na IOS musisz uzyskac zgody. 
<br/>

## Example Implementation

### App in Foreground

<br/>
    Ponizej znajdziesz przykladowy, podstawowy, sposob na obsluge push notifikacji kiedy aplikacja znajduje sie w stanie Foreground. 
    
<br/>
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
