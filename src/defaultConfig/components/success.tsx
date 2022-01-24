import React from 'react'
import { NotificationBase } from './NotificationBase'
import { useNotificationConfig } from '../../core/useNotificationConfig'
import { mergeProps } from '../mergeProps'
import type { NotificationProps } from '../../types'

export const SuccessNotification = (props: NotificationProps) => {
  const { defaultStylesSettings, defaultNotificationPosition, variants } = useNotificationConfig()
  const pickedProps = mergeProps(
    props,
    'success',
    Boolean(defaultStylesSettings?.darkMode),
    defaultStylesSettings?.globalConfig,
    defaultStylesSettings?.successConfig,
    props?.notificationPosition ||
      variants?.success?.config?.notificationPosition ||
      defaultNotificationPosition
  )

  return <NotificationBase {...pickedProps} />
}
