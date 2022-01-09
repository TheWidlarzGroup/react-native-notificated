import React from 'react'
import { NotificationBase } from './NotificationBase'
import { useNotificationConfig } from '../../core/useNotificationConfig'
import { mergeProps } from '../mergeProps'
import type { PropsConfig } from '../../types'

export const ErrorNotification = (props: Partial<PropsConfig>) => {
  const { defaultStylesSettings, darkMode } = useNotificationConfig()
  const pickedProps = mergeProps(
    props,
    'error',
    darkMode,
    defaultStylesSettings?.globalConfig,
    defaultStylesSettings?.errorConfig
  )

  return <NotificationBase {...pickedProps} />
}
