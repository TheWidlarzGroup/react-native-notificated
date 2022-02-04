import React from 'react'
import { useNotificationConfig } from '../../core/useNotificationConfig'
import { mergeProps } from '../mergeProps'
import { NotificationBase } from './NotificationBase'
import type { NotificationProps } from '../../types'

export const InfoNotification = (props: NotificationProps) => {
  const { defaultStylesSettings, notificationPosition, variants } = useNotificationConfig()
  const pickedProps = mergeProps(
    props,
    'info',
    Boolean(defaultStylesSettings?.darkMode),
    defaultStylesSettings?.globalConfig,
    defaultStylesSettings?.infoConfig,
    props?.notificationPosition ||
      variants?.info?.config?.notificationPosition ||
      notificationPosition
  )

  return <NotificationBase {...pickedProps} />
}
