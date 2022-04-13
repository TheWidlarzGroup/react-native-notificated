import React, { FC, ReactNode } from 'react'
import { InAppNotificationsConfig } from '../defaultConfig/defaultConfig'

import type { DefaultVariants } from '../defaultConfig/types'
import NotificationEmitterApi, { Modify, Notify, Remove } from './services/NotificationEmitterApi'
import type { NotificationsConfig, VariantsMap } from '../types'
import { NotificationsRenderer } from './renderers/NotificationsRenderer'
import { NotificationContext } from './hooks/useNotificationConfig'

export const createNotifications = <Variants extends VariantsMap = DefaultVariants>(
  config: Partial<NotificationsConfig<Variants>>
  // | Partial<NotificationsConfig<_DefaultVariants>> = {}
): {
  useNotifications: () => {
    modify: Modify
    remove: Remove
    notify: Notify<Variants>
  }
  NotificationsProvider: FC
  modify: Modify
  remove: Remove
  notify: Notify<Variants>
} => {
  const NotificationsProvider = ({ children = null }: { children?: ReactNode }) => {
    return (
      <NotificationContext.Provider value={{ ...InAppNotificationsConfig, ...config }}>
        {children}
        <NotificationsRenderer />
      </NotificationContext.Provider>
    )
  }

  const useNotifications = () => NotificationEmitterApi

  return { useNotifications, NotificationsProvider, ...NotificationEmitterApi }
}
