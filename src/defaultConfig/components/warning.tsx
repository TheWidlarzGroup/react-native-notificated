import React from 'react'
import { NotificationBase } from './notificationBase'
import { useNotificationConfig } from '../../core/hooks/useNotificationConfig'
import { mergeProps } from '../mergeProps'
import type { NotificationProps } from '../types'

export const WarningNotification = (props: NotificationProps) => {
  const { defaultStylesSettings } = useNotificationConfig()
  const pickedProps = mergeProps(
    props,
    'warning',
    Boolean(defaultStylesSettings?.darkMode),
    defaultStylesSettings?.globalConfig,
    defaultStylesSettings?.warningConfig
  )

  return <NotificationBase {...pickedProps} />
}
