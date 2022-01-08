import React from 'react'
import { NotificationBase } from './NotificationBase'
import { useNotificationConfig } from '../../core/useNotificationConfig'
import { mergeProps } from '../propsPicker'
import type { PropsConfig } from '../../types'

export const WarningNotification = (props: Partial<PropsConfig>) => {
  const { defaultStylesSettings, darkMode } = useNotificationConfig()
  const pickedProps = mergeProps(
    props,
    'warning',
    darkMode,
    defaultStylesSettings?.globalConfig,
    defaultStylesSettings?.warningConfig
  )

  return <NotificationBase {...pickedProps} />
}
