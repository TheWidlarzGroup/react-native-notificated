---
sidebar_position: 6
---

# 🔥 Redux example
<br/>

This example is quite different from the previous ones. <br/>
Our goal here is to show you how we can use RN Notifications library in the real life, with more complicated environment.<br/>
For this reason we built a dummy login screen.<br/>
In this example we use Redux Toolkit library.<br/>
Let's go step by step through it, and check where exactly notifications were triggered.


## Redux Example component

```typescript jsx
import React from 'react'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import { LoginForm } from '../components/loginForm/LoginForm'
import { createNotifications } from 'react-native-notification'

const { NotificationsProvider } = createNotifications()

export const ReduxExample = () => {
  return (
    <Provider store={store}>
      <NotificationsProvider />
      <LoginForm />
    </Provider>
  )
}
```

Redux Example is a main component, where we apply redux `Provider`, `NotificationsProvider` and render our main component - `LoginForm`.<br/>

Let's check what happened here:

- we imported `React` (of course), `store` (previously created), redux `Provider`, `LoginForm` component (previously created) and well known `createNotifications`
- we didn't pick `useNotifications` hook, only `createNotification`, because we're not triggering notifications here
- because `NotificationsProvider` is applied on the same level as `LoginForm` we will have access to the notifications inside the form

<br/>

## Store


