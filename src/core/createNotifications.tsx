import React, { ReactNode } from 'react'
import { Notifications } from './Notifications'

import { NotificationContext } from './useNotificationConfig'
import type { DefaultVariants, NotificationsConfig, VariantsMap } from '../types'
import { InAppNotificationsConfig } from '../defaultConfig/defaultConfig'
import NotificationEmitterApi from '../services/NotificationEmitterApi'

export const createNotifications = <Variants extends VariantsMap = DefaultVariants>(
  config: Partial<NotificationsConfig<Variants>> = {}
) => {
  const NotificationsProvider = ({ children = null }: { children?: ReactNode }) => {
    return (
      <NotificationContext.Provider value={{ ...InAppNotificationsConfig, ...config }}>
        {children}
        <Notifications />
      </NotificationContext.Provider>
    )
  }

  const useNotification = () => NotificationEmitterApi

  return { useNotification, NotificationsProvider, eventEmitter: NotificationEmitterApi }
}
