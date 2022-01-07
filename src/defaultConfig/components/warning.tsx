import React from 'react'
import { themeBase } from './theme'
import { NotificationBase } from './NotificationBase'
import { useNotificationConfig } from '../../core/useNotificationConfig'
import { mergeProps } from '../propsPicker'
import type { PropsConfig } from '../../types'

export const WarningNotification = (props: Partial<PropsConfig>) => {
  const { defaultStylesSettings, darkMode } = useNotificationConfig()
  const pickedProps = mergeProps(
    props,
    themeBase.color.warning,
    darkMode,
    defaultStylesSettings?.globalConfig,
    defaultStylesSettings?.warningConfig
  )

  return <NotificationBase {...pickedProps} />
}
