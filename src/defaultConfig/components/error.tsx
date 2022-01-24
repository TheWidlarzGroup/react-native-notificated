import React from 'react'
import { NotificationBase } from './NotificationBase'
import { useNotificationConfig } from '../../core/useNotificationConfig'
import { mergeProps } from '../mergeProps'
import type { NotificationProps } from '../../types'

export const ErrorNotification = (props: NotificationProps) => {
  const { defaultStylesSettings, defaultNotificationPosition } = useNotificationConfig()
  const pickedProps = mergeProps(
    props,
    'error',
    Boolean(defaultStylesSettings?.darkMode),
    defaultStylesSettings?.globalConfig,
    defaultStylesSettings?.errorConfig,
    defaultNotificationPosition
  )

  return <NotificationBase {...pickedProps} />
}
