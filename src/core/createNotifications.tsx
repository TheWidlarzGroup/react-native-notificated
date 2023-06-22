import React, { ReactNode } from 'react'
import { InAppNotificationsConfig } from '../defaultConfig/defaultConfig'

import { getNotificationEmmiter } from './services/NotificationEmitterApi'
import type { CreateNotificationsReturnType, NotificationsConfig, VariantsMap } from '../types'
import { NotificationsRenderer } from './renderers/NotificationsRenderer'
import { NotificationContext } from './hooks/useNotificationConfig'
import type { DefaultVariants } from '../defaultConfig/types'

export const createNotifications = <V extends VariantsMap = DefaultVariants>(
  config?: Partial<NotificationsConfig<V>>
): CreateNotificationsReturnType<V> => {
  const emitter = getNotificationEmmiter<V>()
  const CustomVariantsTypeHelper = {} as V

  const NotificationsProvider = ({
    children = null,
    providerID,
  }: {
    children?: ReactNode
    providerID?: string
  }) => {
    return (
      <NotificationContext.Provider value={{ ...InAppNotificationsConfig, ...config }}>
        {children}
        <NotificationsRenderer providerID={providerID} />
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
