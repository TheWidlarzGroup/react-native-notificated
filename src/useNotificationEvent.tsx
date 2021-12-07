import React from 'react'
import { NotificationsEmitter } from 'react-native-notification'
import type { EventCallback, EventType } from './types'

export const useNotificationEvent = (eventType: EventType, callback: EventCallback) => {
  const remove = NotificationsEmitter.addListener(eventType, callback)
  React.useEffect(() => () => remove(), [remove])
  return remove
}
