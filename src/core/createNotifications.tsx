import React, { ReactNode } from 'react'
import { Notifications } from './Notifications'

import { emitter, NotificationContext } from './useNotificationConfig'
import type { NotificationsConfig, RequiredProps, VariantsMap } from '../types'
import { InAppNotificationsConfig } from '../defaultConfig/defaultConfig'
import type {DefaultVariants} from "../defaultConfig/types";

export type EmitParam<T> = {
  notificationType: unknown
  params: T
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
