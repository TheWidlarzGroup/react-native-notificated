import React from 'react'
import { NotificationBase } from './NotificationBase'
import { useNotificationConfig } from '../../core/hooks/useNotificationConfig'
import { mergeProps } from '../mergeProps'
import type { NotificationProps } from '../types'

export const SuccessNotification = (props: NotificationProps) => {
  const { defaultStylesSettings } = useNotificationConfig()
  const pickedProps = mergeProps(
    props,
    'success',
    Boolean(defaultStylesSettings?.darkMode),
    defaultStylesSettings?.globalConfig,
    defaultStylesSettings?.successConfig
  )

  return <NotificationBase {...pickedProps} />
}
