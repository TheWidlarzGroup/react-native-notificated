import React from 'react'
import { useNotificationConfig } from '../../core/useNotificationConfig'
import { mergeProps } from '../mergeProps'
import { NotificationBase } from './NotificationBase'
import type { NotificationProps } from '../../types'

export const InfoNotification = (props: NotificationProps) => {
  const { defaultStylesSettings, darkMode } = useNotificationConfig()
  const pickedProps = mergeProps(
    props,
    'info',
    darkMode,
    defaultStylesSettings?.globalConfig,
    defaultStylesSettings?.successConfig
  )

  return <NotificationBase {...pickedProps} />
}
