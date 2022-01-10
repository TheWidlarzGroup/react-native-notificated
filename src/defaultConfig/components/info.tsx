import React from 'react'
import { useNotificationConfig } from '../../core/useNotificationConfig'
import { mergeProps } from '../mergeProps'
import { NotificationBase } from './NotificationBase'
import type { PropsConfig } from '../../types'

export const InfoNotification = (props: Partial<PropsConfig>) => {
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
