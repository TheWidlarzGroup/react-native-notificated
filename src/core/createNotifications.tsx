import React, { ReactNode } from 'react'
import { Notifications } from './Notifications'

import { emitter, NotificationContext } from './useNotificationConfig'
import type { DefaultVariants, NotificationsConfig, RequiredProps, VariantsMap } from '../types'
import { InAppNotificationsConfig } from '../defaultConfig/defaultConfig'
import { generateNotificationId } from 'src/utils/uuid'

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
    emitter.emit<EmitParam<typeof params>>('add_notification', {
      notificationType,
      params,
      id: generateNotificationId(notificationType.toString()),
    })
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

  return { notify, useNotification, NotificationsProvider }
}
