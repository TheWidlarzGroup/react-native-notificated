import React from 'react'
import { themeBase } from './theme'
import { NotificationBase } from './NotificationBase'
import { useNotificationConfig } from '../../core/useNotificationConfig'
import { mergeProps } from '../propsPicker'
import type { PropsConfig } from '../../types'

export const SuccessNotification = (props: Partial<PropsConfig>) => {
  const { defaultStylesSettings, darkMode } = useNotificationConfig()
  const pickedProps = mergeProps(
    props,
    themeBase.color.success,
    darkMode,
    defaultStylesSettings?.globalConfig,
    defaultStylesSettings?.successConfig
  )

  return <NotificationBase {...pickedProps} />
}
