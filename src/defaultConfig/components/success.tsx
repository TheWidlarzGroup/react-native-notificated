import React from 'react'
import { NotificationBase } from './NotificationBase'
import { useNotificationConfig } from '../../core/useNotificationConfig'
import { mergeProps } from '../propsPicker'
import type { PropsConfig } from '../../types'

export const SuccessNotification = (props: Partial<PropsConfig>) => {
  const { defaultStylesSettings, darkMode } = useNotificationConfig()
  const pickedProps = mergeProps(
    props,
    'success',
    darkMode,
    defaultStylesSettings?.globalConfig,
    defaultStylesSettings?.successConfig
  )

  return <NotificationBase {...pickedProps} />
}
