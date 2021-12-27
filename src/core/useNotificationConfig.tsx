import { createContext, useContext } from 'react'
import { NotificationsEmitter } from '../services/NotificationEmitter'
import type { NotificationsConfig, VariantsMap } from '../types'

export const NotificationContext = createContext<NotificationsConfig<VariantsMap> | null>(null)

export const emitter = NotificationsEmitter

export const useNotificationConfig = () => {
  const config = useContext(NotificationContext)

  if (config === null) {
    throw new Error('Notification context used out of scope')
  }

  return config
}
