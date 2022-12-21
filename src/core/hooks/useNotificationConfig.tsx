import { createContext, useContext } from 'react'
import type { NotificationsConfig, VariantsMap } from '../../types'
import type { DefaultVariants } from '../../defaultConfig/types'

export const NotificationContext = createContext<NotificationsConfig<VariantsMap> | null>(null)

export const useNotificationConfig = () => {
  const config = useContext(NotificationContext)

  if (config === null) {
    throw new Error('Notification context used out of scope')
  }

  return config as NotificationsConfig<DefaultVariants>
}
