import React from 'react'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import { LoginForm } from '../components/loginForm/LoginForm'
import { createNotifications } from 'react-native-notification'

export const { NotificationsProvider, notify } = createNotifications({
  isNotch: true,
})

export const ReduxExample = () => {
  return (
    <Provider store={store}>
      <NotificationsProvider />
      <LoginForm />
    </Provider>
  )
}
