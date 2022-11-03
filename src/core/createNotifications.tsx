import React, { FC, ReactNode } from 'react'
import { InAppNotificationsConfig } from '../defaultConfig/defaultConfig'

import { getNotificationEmmiter } from './services/NotificationEmitterApi'
import type {
  Modify,
  NotificationsConfig,
  Notify,
  Remove,
  UseNotification,
  VariantsMap,
} from '../types'
import { NotificationsRenderer } from './renderers/NotificationsRenderer'
import { NotificationContext } from './hooks/useNotificationConfig'
import type { DefaultVariants } from '../defaultConfig/types'

export const createNotifications = <V extends VariantsMap = DefaultVariants>(
  config?: Partial<NotificationsConfig<V>>
): {
  useNotifications: UseNotification<V>
  NotificationsProvider: FC
  modify: Modify
  remove: Remove
  notify: Notify<V>
  CustomVariantsTypeHelper: V
} => {
  const emitter = getNotificationEmmiter<V>()
  const CustomVariantsTypeHelper = {} as V

  const NotificationsProvider = ({ children = null }: { children?: ReactNode }) => {
    return (
      <NotificationContext.Provider value={{ ...InAppNotificationsConfig, ...config }}>
        {children}
        <NotificationsRenderer />
      </NotificationContext.Provider>
    )
  }

  const useNotifications = () => emitter

  return {
    useNotifications,
    NotificationsProvider,
    CustomVariantsTypeHelper,
    ...emitter,
  }
}
