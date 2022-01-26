import { createContext, useContext } from 'react'
import { createNotificationsEmitter } from '../services/NotificationEmitter'
import type { DefaultVariantsConfig, NotificationsConfig, VariantsMap } from '../types'

export const NotificationContext = createContext<NotificationsConfig<VariantsMap> | null>(null)

export const emitter = createNotificationsEmitter()

export const useNotificationConfig = () => {
  const config = useContext(NotificationContext) as DefaultVariantsConfig

  if (config === null) {
    throw new Error('Notification context used out of scope')
  }

  return config
}
