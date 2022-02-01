import React from 'react'
import { NotificationBase } from './NotificationBase'
import { useNotificationConfig } from '../../core/useNotificationConfig'
import { mergeProps } from '../mergeProps'
import type { NotificationProps } from '../../types'

export const ErrorNotification = (props: NotificationProps) => {
  const { defaultStylesSettings, notificationPosition, variants } = useNotificationConfig()
  const pickedProps = mergeProps(
    props,
    'error',
    Boolean(defaultStylesSettings?.darkMode),
    defaultStylesSettings?.globalConfig,
    defaultStylesSettings?.errorConfig,
    props?.notificationPosition ||
      variants?.error?.config?.notificationPosition ||
      notificationPosition
  )

  return <NotificationBase {...pickedProps} />
}
