import React from 'react'
import { themeBase } from './theme'
import { NotificationBase } from './NotificationBase'
import { useNotificationConfig } from '../../core/useNotificationConfig'
import { mergeProps } from '../propsPicker'
import type { PropsConfig } from '../../types'

export const ErrorNotification = (props: Partial<PropsConfig>) => {
  const { defaultStylesSettings, darkMode } = useNotificationConfig()
  const pickedProps = mergeProps(
    props,
    themeBase.color.error,
    darkMode,
    defaultStylesSettings?.globalConfig,
    defaultStylesSettings?.errorConfig
  )

  return <NotificationBase {...pickedProps} />
}
