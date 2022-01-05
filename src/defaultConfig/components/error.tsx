import React from 'react'
import { NotificationBase } from './NotificationBase'
import { useNotificationConfig } from '../../core/useNotificationConfig'
import type { NotificationProps } from '../../types'
import { propsPicker } from '../propsPicker'
import { themeBase } from './theme'

export const ErrorNotification = (props: NotificationProps) => {
  const { defaultGlobalConfig, defaultErrorConfig } = useNotificationConfig()
  const pickedProps = propsPicker(
    props,
    defaultGlobalConfig!,
    defaultErrorConfig!,
    themeBase.color.error
  )

  return <NotificationBase {...pickedProps} />
}
