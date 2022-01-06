import React from 'react'
import { themeBase } from './theme'
import { NotificationBase } from './NotificationBase'
import type { NotificationProps } from '../../types'
import { useNotificationConfig } from '../../core/useNotificationConfig'
import { propsPicker } from '../propsPicker'

export const SuccessNotification = (props: NotificationProps) => {
  const { defaultGlobalConfig, defaultSuccessConfig } = useNotificationConfig()
  const pickedProps = propsPicker(
    props,
    defaultGlobalConfig,
    defaultSuccessConfig,
    themeBase.color.success
  )

  return <NotificationBase {...pickedProps} />
}
