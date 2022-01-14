import React, { ReactNode } from 'react'
import { InAppNotificationsConfig } from '../defaultConfig/defaultConfig'
import type { DefaultVariants } from '../defaultConfig/types'
import NotificationEmitterApi from '../services/NotificationEmitterApi'
import type { DefaultVariantsConfig, NotificationsConfig, VariantsMap } from '../types'
import { Notifications } from './Notifications'
import { NotificationContext } from './useNotificationConfig'

export const createNotifications = <Variants extends VariantsMap = DefaultVariants>(
  config: Partial<NotificationsConfig<Variants>> | Partial<DefaultVariantsConfig> = {}
) => {
  const NotificationsProvider = ({ children = null }: { children?: ReactNode }) => {
    return (
      <NotificationContext.Provider value={{ ...InAppNotificationsConfig, ...config }}>
        {children}
        <Notifications />
      </NotificationContext.Provider>
    )
  }

  const useNotifications = () => NotificationEmitterApi

  return { useNotifications, NotificationsProvider, ...NotificationEmitterApi }
}
