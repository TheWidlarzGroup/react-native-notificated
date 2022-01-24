import React from 'react'
import { NotificationBase } from './NotificationBase'
import { useNotificationConfig } from '../../core/useNotificationConfig'
import { mergeProps } from '../mergeProps'
import type { NotificationProps } from '../../types'

export const WarningNotification = (props: NotificationProps) => {
  const { defaultStylesSettings, defaultNotificationPosition } = useNotificationConfig()
  const pickedProps = mergeProps(
    props,
    'warning',
    Boolean(defaultStylesSettings?.darkMode),
    defaultStylesSettings?.globalConfig,
    defaultStylesSettings?.warningConfig,
    defaultNotificationPosition
  )

  return <NotificationBase {...pickedProps} />
}
