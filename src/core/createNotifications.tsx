import React, { ReactNode } from 'react'
import { _DefaultVariants, InAppNotificationsConfig } from '../defaultConfig/defaultConfig'

import type { DefaultVariants } from '../defaultConfig/types'
import { createEmitterApi } from './services/NotificationEmitterApi'
import type { NotificationsConfig, VariantsMap } from '../types'
import { NotificationsRenderer } from './renderers/NotificationsRenderer'
import { NotificationContext } from './hooks/useNotificationConfig'

export const createNotifications = <Variants extends VariantsMap = DefaultVariants>(
  config: Partial<NotificationsConfig<Variants>> | Partial<NotificationsConfig<_DefaultVariants>>
) => {
  const emitterApi = createEmitterApi<Variants>()

  const NotificationsProvider = ({ children = null }: { children?: ReactNode }) => {
    return (
      <NotificationContext.Provider value={{ ...InAppNotificationsConfig, ...config }}>
        {children}
        <NotificationsRenderer />
      </NotificationContext.Provider>
    )
  }

  const useNotifications = () => emitterApi

  return { useNotifications, NotificationsProvider, ...emitterApi }
}
