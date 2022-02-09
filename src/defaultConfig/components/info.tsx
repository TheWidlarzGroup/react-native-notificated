import React from 'react'
import { useNotificationConfig } from '../../core/hooks/useNotificationConfig'
import { mergeProps } from '../mergeProps'
import { NotificationBase } from './NotificationBase'
import type { NotificationProps } from '../types'

export const InfoNotification = (props: NotificationProps) => {
  const { defaultStylesSettings } = useNotificationConfig()
  const pickedProps = mergeProps(
    props,
    'info',
    Boolean(defaultStylesSettings?.darkMode),
    defaultStylesSettings?.globalConfig,
    defaultStylesSettings?.infoConfig
  )

  return <NotificationBase {...pickedProps} />
}
