import React from 'react'
import { NotificationsEmitter } from 'react-native-notification'
import type { ArgsFunc, EventType } from './types'

export const useNotificationEvent = (eventType: EventType, callback: ArgsFunc) => {
  const remove = NotificationsEmitter.addListener(eventType, callback)
  React.useEffect(() => () => remove(), [remove])
  return remove
}
