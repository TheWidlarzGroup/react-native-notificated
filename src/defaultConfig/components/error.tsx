import React from 'react'
import { NotificationBase } from './NotificationBase'
import { useNotificationConfig } from '../../core/hooks/useNotificationConfig'
import { mergeProps } from '../mergeProps'
import type { NotificationProps } from '../types'

export const ErrorNotification = (props: NotificationProps) => {
  const { defaultStylesSettings } = useNotificationConfig()
  const pickedProps = mergeProps(
    props,
    'error',
    Boolean(defaultStylesSettings?.darkMode),
    defaultStylesSettings?.globalConfig,
    defaultStylesSettings?.errorConfig
  )

  return <NotificationBase {...pickedProps} />
}
