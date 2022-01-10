import React, { ReactNode } from 'react'
import { Notifications } from './Notifications'

import { emitter, NotificationContext } from './useNotificationConfig'
import type { DefaultVariants, NotificationsConfig, RequiredProps, VariantsMap } from '../types'
import { InAppNotificationsConfig } from '../defaultConfig/defaultConfig'
import { generateNotificationId } from '../utils/uuid'
import { useNotificationController } from '../hooks/useNotificationController'

export type EmitParam<T> = {
  notificationType: unknown
  params: T
  id: string
}

export const createNotifications = <Variants extends VariantsMap = DefaultVariants>(
  config: Partial<NotificationsConfig<Variants>> = {}
) => {
  const notify = <Variant extends keyof Variants>(
    notificationType: Variant,
    params: RequiredProps<Variants[Variant]>
  ) => {
    const id = generateNotificationId(notificationType.toString())
    emitter.emit<EmitParam<typeof params>>('add_notification', {
      notificationType,
      params,
      id,
    })
    return {
      id,
    }
  }

  const NotificationsProvider = ({ children = null }: { children?: ReactNode }) => {
    return (
      <NotificationContext.Provider value={{ ...InAppNotificationsConfig, ...config }}>
        {children}
        <Notifications />
      </NotificationContext.Provider>
    )
  }
  const useNotification = () => ({ notify })

  return { notify, useNotification, NotificationsProvider, useNotificationController }
}
