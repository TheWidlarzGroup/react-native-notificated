import React from 'react'
import { themeBase } from './theme'
import { NotificationBase } from './NotificationBase'
import type { NotificationProps } from '../../types'
import { useNotificationConfig } from '../../core/useNotificationConfig'
import { propsPicker } from '../propsPicker'

export const WarningNotification = (props: NotificationProps) => {
  const { defaultGlobalConfig, defaultWarningConfig } = useNotificationConfig()
  const pickedProps = propsPicker(
    props,
    defaultGlobalConfig,
    defaultWarningConfig,
    themeBase.color.warning
  )

  return <NotificationBase {...pickedProps} />
}
